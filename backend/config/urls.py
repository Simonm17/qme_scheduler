import debug_toolbar
from rest_framework import routers

from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from .views import home


urlpatterns = [
    
    # https://stackoverflow.com/questions/44676880/error-reverse-for-password-reset-done-not-found-password-reset-done-is-not
    path('', include('django.contrib.auth.urls')),

    path('admin/', admin.site.urls),
    path('users/', include('users.urls')),  # includes dj-rest-auth routes
]


if settings.DEBUG:
    urlpatterns += [
        path('__debug__/', include(debug_toolbar.urls)),
    ]
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
