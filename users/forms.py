from allauth.account.forms import LoginForm, PasswordField, SignupForm

from django import forms
from django.contrib.auth.models import User

"""
    Overriding Allauth login/signup forms to modify form labels.
"""

class CustomLoginForm(LoginForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        self.fields['login'].label = ''
        self.fields['password'].label = ''


class CustomSignupForm(SignupForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        self.fields['email'].label = ''
        self.fields['password1'].label = ''
        self.fields['password2'].label = ''


class UserUpdateForm(forms.ModelForm):
    first_name = forms.CharField(label='',
        widget=forms.TextInput(attrs={'placeholder': 'First Name'})
    )
    last_name = forms.CharField(label='',
        widget=forms.TextInput(attrs={'placeholder': 'Last Name'})
    )

    class Meta:
        model = User
        fields = ['email', 'first_name', 'last_name']
        labels = {
            'email': '',
        }
        widgets = {
            'email': forms.TextInput(attrs={'placeholder': 'Email'})
        }