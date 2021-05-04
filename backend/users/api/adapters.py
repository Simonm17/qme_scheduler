from allauth.account.adapter import DefaultAccountAdapter
from allauth.account.utils import user_field


class CustomUserAccountAdapter(DefaultAccountAdapter):

    def save_user(self, request, user, form, commit=True):
        """
        Saves a new `User` instance using information provided in the
        signup form.
        """

        user = super().save_user(request, user, form, False)

        data = form.cleaned_data

        user_field(user, 'email', request.data.get('email', ''))
        user_field(user, 'first_name', request.data.get('first_name', ''))
        user_field(user, 'last_name', request.data.get('last_name', ''))
        user_field(user, 'party', request.data.get('party', ''))

        """ NOTE: Can't use allauth's utils' user_field() method on booleans because
        the method will get do the following:
            v = v[0:max_length] <-- causes TypeError on booleans.
        Use the traditional shell query methods instead: user.<field> = <field_value>
        """
        # user_field(user, 'is_requesting_admin', request.data.get('is_requesting_admin', ''))
        user.is_requesting_admin = request.data.get('is_requesting_admin', '')
        user.save()
        return user
