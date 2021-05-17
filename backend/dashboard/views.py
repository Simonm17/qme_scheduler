from django.shortcuts import render
from django.contrib.auth.decorators import login_required


@login_required
def dashboard(request):
    return render(request, 'dashboard/dashboard.html')


@login_required
def create_appointment(request):

    context = {

    }
    return render(request, 'dashboard/new_appointment.html', context)