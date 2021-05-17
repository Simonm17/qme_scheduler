from datetime import timedelta

from django.urls import reverse
from django.db import models
from contacts.models import (
    Address,
    Person,
    Telephone,
    Email,
    Company
)
from users.models import User


class TimeStampModel(models.Model):
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    created_date = models.DateTimeField(auto_now_add=True)
    updated_by = models.ForeignKey(User, on_delete=models.CASCADE)
    updated_date = models.DateTimeField(auto_now=True)


class Appointment(TimeStampModel):
    INITIAL = 'Initial'
    RE_EVAL = 'Re-evaluation'
    RESCHEDULED = 'Reschedued'
    APPOINTMENT_TYPE = [
        (INITIAL, 'Initial'),
        (RE_EVAL, 'Re-evaluation'),
        (RESCHEDULED, 'Rescheduled')
    ]

    AME = 'AME'
    PQME = 'PQME'
    EXAM_TYPE = [
        (PQME, 'PQME'),
        (AME, 'AME'),
    ]
    appointment_type = models.CharField(max_length=20, choices=APPOINTMENT_TYPE, default=INITIAL)
    exam_type = models.CharField(max_length=4, choices=EXAM_TYPE, default=PQME)
    panel_number = models.CharField(max_length=120, blank=True, null=True)
    appointment_date = models.DateTimeField()
    appointment_duration = models.DurationField(default=timedelta(hours=3))
    applicant = models.ForeignKey(Person, on_delete=models.CASCADE)
    doctor = models.ForeignKey(Person, on_delete=models.PROTECT)
    appointment_address = models.ForeignKey(Address, on_delete=models.PROTECT, blank=True, null=True)
    mailing_address = models.ForeignKey(Address, on_delete=models.PROTECT, blank=True, null=True)
    telephone = models.ForeignKey(Telephone, on_delete=models.PROTECT, blank=True, null=True)
    email = models.ForeignKey(Email, on_delete=models.PROTECT, blank=True, null=True)
    note = models.TextField(blank=True)

    def __str__(self):
        return f'{self.applicant}, {self.doctor}'

    def get_absolute_url(self):
        return reverse("appointments:appointment", kwargs={"pk": self.pk})
