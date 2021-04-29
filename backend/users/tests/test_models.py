from django.test import TestCase, Client

from ..models import User


class UserTestCase(TestCase):
    
    def test_create(self):
        User.objects.get_or_create(
            email='test_user@c.com',
            first_name='tester',
            last_name='lester',
            party='AA'
        )

