from django.shortcuts import render, redirect
from django.contrib import messages
from .models import User
from .forms import UserUpdateForm, PartyUpdateForm


def profile(request):
    if request.method == 'POST':
        form = UserUpdateForm(request.POST, instance=request.user)
        if form.is_valid():
            form.save()
            messages.success(request, f'Your account has been updated.')
            return redirect('profile')
    else:
        form = UserUpdateForm(instance=request.user)

    context = {
        'user': request.user,
        'form': form
    }

    return render(request, 'users/profile.html', context)


def select_party(request):
    # TODO: add permission to redirect existing party to homepage.
    if request.method == 'POST':
        form = PartyUpdateForm(request.POST, instance=request.user)
        if form.is_valid():
            form.save()
            messages.success(request, f'You selected your party!')
            return redirect('profile')
    else:
        form = PartyUpdateForm(instance=request.user)
    context = {
        'user': request.user,
        'form': form,
    }

    return render(request, 'users/party.html', context)