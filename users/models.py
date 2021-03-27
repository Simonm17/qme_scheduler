from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from .managers import Manager

class User(AbstractBaseUser):

    """ Main User fields """
    email = models.EmailField(
        verbose_name='Email Address', max_length=120, unique=True
    )
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    date_of_birth = models.DateField(null=True, blank=True)
    date_joined = models.DateTimeField(verbose_name='date joined', auto_now_add=True)
    last_login = models.DateTimeField(verbose_name='last login', auto_now=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    """ Firm settings """
    APPLICANT = 'AA'
    DEFENDANT = 'DA'
    PARTY = [
        (APPLICANT, 'Applicant Attorney'),
        (DEFENDANT, 'Defense Attorney'),
    ]

    party = models.CharField(
        max_length=2,
        choices=PARTY,
        null=True
    )
    is_firm_admin = models.BooleanField(default=False)


    USERNAME_FIELD = 'email'
    # Required fields when running createsuperuser command
    REQUIRED_FIELDS = []

    objects = Manager()

    def __str__(self):
        return self.email
    
    def get_full_name(self):
        return f'{self.first_name} {self.last_name}'

    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self, app_label):
        return True