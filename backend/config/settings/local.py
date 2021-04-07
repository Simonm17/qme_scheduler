from .base import *


DEBUG = True

INSTALLED_APPS += [
    'debug_toolbar',
]

MIDDLEWARE.insert(0, 'debug_toolbar.middleware.DebugToolbarMiddleware')

INTERNAL_IPS = [
    '127.0.0.1',
]


DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.environ['QME_DB_NAME'],  
        'USER': 'postgres',
        'PASSWORD': os.environ['QME_DB_PASSWORD'],  
        'HOST': 'localhost',
        'PORT': '5432'
    }
}


STATICFILES_DIRS = [
    BASE_DIR / 'static',
]

EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

