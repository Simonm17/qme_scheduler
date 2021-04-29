@csrf_exempt
def stripe_webhook(request):
    endpoint_secret = settings.STRIPE_WEBHOOK_SECRET
    payload = request.body
    sig_header = request.META['HTTP_STRIPE_SIGNATURE']
    event = None

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, endpoint_secret
        )
        print(f'RETRIEVD STRIPE EVENT WEBHOOK..')
    except ValueError as e:
        # Invalid payload
        return HttpResponse(status=400)
    except stripe.error.SignatureVerificationError as e:
        # Invalid signature
        return HttpResponse(status=400)

    """
    SUBSCRIPTION MODEL FIELDS (for reference):
        - customer (foreign key)
        - subscription_id
        - status (choices)
        - cancel_at_period_end (boolean)
        - cancel_at (datetime)
    """


    if event['type'] == 'checkout.session.completed':
        session = event['data']['object']

        stripe_customer_id = session.get('customer') # returns customer id 
        stripe_subscription_id = session.get('subscription') # returns subscription id

        # Get the customer model object and create a new StripeCustomer
        customer = StripeCustomer.objects.get(stripe_customer_id=stripe_customer_id)
        try:
            Subscription.objects.create(
                customer=customer,
                subscription_id=stripe_subscription_id
            )
            print(f'{customer} just subscribed.')
        except Exception as e:
            print(e)

    """ NOTE: Initial subscription triggers checkout.session.completed, invoice.paid,
                and customer.subscription.updated on successful transaction.
                Hence use if blocks and no elif's for all event triggers.
    """

    if event['type'] == 'invoice.paid':
        # if reoccuring subscription triggers, do nothing to models and keep them active.
        pass

    if event['type'] == 'invoice.payment_failed':
        """ if automatic payment fails, delete subscription. """
        session = event['data']['object']
        try:
            subscription = Subscription.objects.get(customer=session['customer'])
            subscription.status = INCOMPLETE_EXPIRED
            subscription.delete()
        except Exception as e:
            print(e)

    if event['type'] == 'customer.subscription.updated':
        session = event['data']['object']
        customer = StripeCustomer.objects.get(stripe_customer_id=session['customer'])
        subscription = Subscription.objects.get(customer=customer)
        if session['cancel_at_period_end'] == True:
            try:
                print(f'DELETING SUB AT PERIOD END')
                subscription.cancel_at_period_end=True
                subscription.cancel_at=datetime.fromtimestamp(session['cancel_at'])
                subscription.save()
                print(f'SUBSCRIPTION MODEL UPDATED')
            except Exception as e:
                print(e)
        try:
            """ When stripe object is updated, set model's status as stripe's status. """
            stripe_subscription_status = session['status']
            subscription.status == stripe_subscription_status.upper()
            subscription.save()
        except Exception as e: print(e)


    if event['type'] == 'customer.subscription.deleted':
        session = event['data']['object']
        try:
            stripe_customer_id = session.get('customer') # returns customer id 
            stripe_subscription_id = session.get('id') # returns subscription id
            print(stripe_customer_id, stripe_subscription_id)
            customer = StripeCustomer.objects.get(stripe_customer_id=stripe_customer_id)
            sub = Subscription.objects.get(customer=customer, subscription_id=stripe_subscription_id)
            print(customer, sub)
            sub.delete()
        except Exception as e:
            print(e)

    return HttpResponse(status=200)