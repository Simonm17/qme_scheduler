from django.contrib import admin
from .models import (
    Address,
    Email,
    Telephone,
    Person,
    Company,
)


admin.site.register(Address)
admin.site.register(Email)
admin.site.register(Telephone)
admin.site.register(Person)
admin.site.register(Company)