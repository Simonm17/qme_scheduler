from allauth.account.forms import LoginForm, PasswordField, SignupForm

from django import forms
from .models import User

class CustomSignupForm(SignupForm):

    APPLICANT = 'AA'
    DEFENDANT = 'DA'
    PARTY = [
        (APPLICANT, 'Applicant'),
        (DEFENDANT, 'Defense'),
    ]

    party = forms.ChoiceField(
        choices=PARTY,
        widget=forms.RadioSelect
    )

    first_name = forms.CharField(
        label=(""),
        max_length=50,
        widget=forms.TextInput(attrs={'placeholder': 'First Name'})
    )

    last_name = forms.CharField(
        label=(""),
        max_length=50,
        widget=forms.TextInput(attrs={'placeholder': 'Last Name'})
    )

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        self.fields['email'].label = ''
        self.fields['password1'].label = ''
        self.fields['password2'].label = ''

    field_order = ['party', 'email', 'first_name', 'last_name', 'password1', 'password2']


class UserUpdateForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', ]


class PartyUpdateForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ['party']
        widgets = {
            'party': forms.RadioSelect()
        }