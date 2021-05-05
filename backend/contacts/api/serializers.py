from rest_framework import serializers
from ..models import *


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        exclude = ['id']
        read_only_fields = ['created_by', 'created_date', 'updated_by', 'updated_date']


class EmailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Email
        exclude = ['id']
        read_only_fields = ['created_by', 'created_date', 'updated_by', 'updated_date']


class TelephoneSerializer(serializers.ModelSerializer):
    class Meta:
        model = Telephone
        exclude = ['id']
        read_only_fields = ['created_by', 'created_date', 'updated_by', 'updated_date']

class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        exclude = ['id']
        read_only_fields = ['created_by', 'created_date', 'updated_by', 'updated_date']


class PersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        exclude = ['id']
        read_only_fields = ['created_by', 'created_date', 'updated_by', 'updated_date']