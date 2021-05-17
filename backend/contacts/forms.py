from django import forms
from django.forms.widgets import DateInput
from django.forms.models import inlineformset_factory
from .models import *


class BaseEntityForm(forms.Form):
    TYPE = [
        ('Agreed Medical Evaluator', 'Agreed Medical Evaluator'),
        ('Applicant', 'Applicant'),
        ('Applicant Attorney', 'Applicant Attorney'),
        ('Attorney', 'Attorney'),
        ('Claims Adjuster', 'Claims Adjuster'),
        ('Co-Defendant', 'Co-Defendant'),
        ('Defendant', 'Defendant'),
        ('Defense Attorney', 'Defense Attorney'),
        ('Doctor', 'Doctor'),
        ('Employee', 'Employee'),
        ('Employer', 'Employer'),
        ('Lien Claimant', 'Lien Claimant'),
        ('Nurse Case Manager', 'Nurse Case Manager'),
        ('Primary Treating Physician', 'Primary Treating Physician'),
        ('Qualified Medical Evaluator', 'Qualified Medical Evaluator'),
        ('Third Party Administrator', 'Third Party Administrator'),
        ('Other', 'Other'),
    ]

    type = forms.ChoiceField(choices=TYPE)
    notes = forms.CharField()

    class Meta:
        abstract = True

class PersonForm(BaseEntityForm):

    PREFIX = [
        ('Mr.', 'Mr.'),
        ('Mrs.', 'Mrs.'),
        ('Ms.', 'Ms.'),
        ('Miss', 'Miss'),
        ('Dr.', 'Dr.'),
        ('Hon.', 'Hon.'),
    ]

    SUFFIX = [
        ('Jr.', 'Jr.'),
        ('Sr.', 'Sr.'),
        ('Esq.', 'Esq.'),
        ('J.D.', 'J.D.'),
        ('M.D.', 'M.D.'),
        ('Ph.D.', 'Ph.D.'),
        ('Psy.D.', 'Psy.D.'),
        ('D.D.S.', 'D.D.S.'),
        ('D.P.M.', 'D.P.M.'),
        ('D.O.', 'D.O.'),
        ('D.M.D.', 'D.M.D.'),
        ('N.P.', 'N.P.'),
        ('O.D.', 'O.D.'),
        ('P.A.', 'P.A.'),
    ]

    prefix = forms.ChoiceField(choices=PREFIX)
    first_name = forms.CharField(max_length=50)
    middle_name = forms.CharField(max_length=50)
    last_name = forms.CharField(max_length=50)
    suffix = forms.ChoiceField(choices=SUFFIX)

    birth_date = forms.DateField()
    ssn = forms.IntegerField(max_value=9)


class CompanyForm(BaseEntityForm):
    name = forms.CharField(max_length=200)


class BaseContactform(forms.Form):
    primary = forms.BooleanField()


class AddressForm(BaseContactform):

    ADDRESS_TYPE = [
        ('Physical', 'Physical'),
        ('Mailing', 'Mailing'),
    ]

    UNIT_TYPE = [
        ('APT', 'Apartment'),
        ('STE', 'Suite'),
        ('BLDG', 'Building'),
        ('RM', 'Room'),
        ('SPC', 'Space'),
        ('UNIT', 'Unit'),
        ('FL', 'Floor'),
    ]

    address_type = forms.ChoiceField(choices=ADDRESS_TYPE)
    address1 = forms.CharField(max_length=250)
    unit_type = forms.ChoiceField(choices=UNIT_TYPE)
    address2 = forms.CharField(max_length=100)
    city = forms.CharField(max_length=50)
    state = forms.CharField(max_length=2)
    zipcode = forms.IntegerField(max_value=9)


class TelephoneForm(BaseContactform):

    TYPE = [
        ('Main', 'Main'),        
        ('Home', 'Home'),
        ('Work', 'Work'),
        ('Cell', 'Cell'),
        ('Fax', 'Fax'),
        ('Other', 'Other'),
    ]

    type = forms.ChoiceField(choices=TYPE)
    number = forms.IntegerField(max_value=11)
    extension = forms.IntegerField(max_value=10)


class EmailForm(BaseContactform):
    email = forms.EmailField(max_length=50)


class PersonModelForm(forms.ModelForm):
    birth_date = forms.DateField(
        input_formats = ['%Y-%m-%d'],
        widget = forms.DateInput(
            attrs={
                'type': 'date'
            },
            format='%Y-%m-%d'
        )
    )

    class Meta:
        model = Person
        fields = [
            'type', 'prefix', 'first_name',
            'middle_name', 'last_name', 'suffix',
            'birth_date', 'ssn', 'notes',
        ]

class AddressModelForm(forms.ModelForm):

    class Meta:
        model = Address
        fields = [
            'primary', 'address_type', 'address1',
            'unit_type', 'address2', 'city',
            'state', 'zipcode',
        ]


class TelephoneModelForm(forms.ModelForm):

    class Meta:
        model = Telephone
        fields = [
            'primary', 'type', 'number', 'extension',
        ]


class EmailModelForm(forms.ModelForm):

    class Meta:
        model = Email
        fields = [
            'primary', 'email',
        ]

