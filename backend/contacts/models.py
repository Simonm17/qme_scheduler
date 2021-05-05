from django.db import models
from django.urls import reverse
from django.utils import timezone


class Contact(models.Model):
    primary = models.BooleanField(default=False)

    created_by = models.ForeignKey("users.User", on_delete=models.PROTECT, related_name="%(class)s_created_by")
    created_date = models.DateTimeField(auto_now_add=True)

    updated_by = models.ForeignKey("users.User", on_delete=models.PROTECT, related_name="%(class)s_updated_by", blank=True, null=True)
    updated_date = models.DateTimeField(auto_now=True)  

    class Meta:
        abstract = True

    def make_primary(self):
        """ 
            If new or updating Contact.primary=True,
            if Entity owning the Contact has another Contact object that has primary=True,
            turn the latter.primary=False (so that new/updated Contact is now the new primary).
        """
        pass


class Address(Contact):

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

    address_type = models.CharField(max_length=8, choices=ADDRESS_TYPE, default='PHYSICAL')
    address1 = models.CharField(max_length=250)
    unit_type = models.CharField(max_length=20, choices=UNIT_TYPE, blank=True, null=True)
    address2 = models.CharField(max_length=100, blank=True, null=True)
    city = models.CharField(max_length=50)
    state = models.CharField(max_length=2)
    zipcode = models.IntegerField(verbose_name='Postal Code')

    def __str__(self):
        return f'{self.address1}, {self.city}, {self.state} {self.zipcode}'
    
    def get_absolute_url(self):
        return reverse('address_detail', kwargs={'pk': self.pk})


class Telephone(Contact):

    TYPE = [
        ('Main', 'Main'),        
        ('Home', 'Home'),
        ('Work', 'Work'),
        ('Cell', 'Cell'),
        ('Fax', 'Fax'),
        ('Other', 'Other'),
    ]

    type = models.CharField(max_length=5, choices=TYPE, default='Main')
    number = models.IntegerField()
    extension = models.IntegerField(blank=True, null=True)

    def __str__(self):
        num = str(self.number)
        if len(num) == 10:
            return f'({num[:3]}) {num[3:6]}-{num[6:]}'
        elif len(num) == 11:
            return f'{num[0]} ({num[1:4]})-{num[4:7]}-{num[7:]}'
        else:
            return num


class Email(Contact):
    email = models.EmailField(max_length=250)

    def __str__(self):
        return self.email


class Entity(models.Model):

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
    type = models.CharField(choices=TYPE, max_length=200, default='Other')
    # Null has no effect on ManyToManyField
    address = models.ManyToManyField(Address, blank=True)
    telephone = models.ManyToManyField(Telephone, blank=True)
    email = models.ManyToManyField(Email, blank=True)
    notes = models.TextField(blank=True)

    created_by = models.ForeignKey("users.User", on_delete=models.PROTECT, related_name="%(class)s_created_by")
    created_date = models.DateTimeField(auto_now_add=True)

    updated_by = models.ForeignKey("users.User", on_delete=models.PROTECT, related_name="%(class)s_updated_by", blank=True, null=True)
    updated_date = models.DateTimeField(auto_now=True)  

    class Meta:
        abstract = True


class Company(Entity):
    name = models.CharField(max_length=200)


class Person(Entity):

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

    prefix = models.CharField(max_length=10, choices=PREFIX, blank=True)
    first_name = models.CharField(max_length=50)
    middle_name = models.CharField(max_length=50, blank=True)
    last_name = models.CharField(max_length=50)
    suffix = models.CharField(max_length=10, choices=SUFFIX, blank=True)
    birth_date = models.DateField(blank=True, null=True)
    ssn = models.IntegerField(verbose_name="Social Security Number", unique=True, blank=True, null=True)
    company = models.ForeignKey(Company, blank=True, null=True, on_delete=models.PROTECT)
