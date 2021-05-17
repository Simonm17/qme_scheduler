from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin
from django.contrib.messages.views import SuccessMessageMixin
from django.views.generic.edit import CreateView, DeleteView
from django.views.generic import ListView, DetailView, UpdateView
from django.views import View
from django.forms import formset_factory

from .models import Person
from .forms import *


class InitialPersonCreateView(LoginRequiredMixin, CreateView):
    model = Person
    fields = ['type', 'first_name', 'last_name']
    template_name = 'contacts/initial_person_create.html'

    def form_valid(self, form):
        form.instance.created_by = self.request.user
        form.instance.updated_by = self.request.user
        return super().form_valid(form)
    
    def get_success_url(self):
        return redirect('finish_create_person', obj_id=self.object.id)


# class EditPersonView(LoginRequiredMixin, UpdateView):
#     model = Person
#     template_name = 'contacts/person_detail.html'
#     sucess_message = 'Contact updated successfully!'

#     def get_context_data(self, **kwargs):
#         context = super().get_context_data(**kwargs)
#         if self.request.POST:
#             context['p_form'] = PersonModelForm(self.request.POST, instance=self.object)
#             context["a_form"] = AddressFormSet()
#             context['t_form'] = TelephoneFormSet()
#             context['e_form'] = EmailFormSet()
#         else:
#             context['p_form'] = PersonModelForm(self.request.POST, instance=self.object)
#             context["a_form"] = AddressFormSet()
#             context['t_form'] = TelephoneFormSet()
#             context['e_form'] = EmailFormSet()
#         return context
    
#     def form_valid(self, form):
#         context = self.get_context_data()
#         address_form = context['a_form']
#         telephone_form = context['t_form']
#         email_form = context['e_form']
#         form_list = [address_form, telephone_form, email_form]
#         for form in form_list:
#             if form.is_valid():
#                 form.instance = self.object
#                 form.save()
#         return redirect('contacts:person_detail', self.object.id)


class PersonDetailView(DetailView):
    model = Person
    template_name = 'contacts/finish_create_person.html'


@login_required
def create_person(request, obj_id):
    if request.method == 'POST':
        # change instance query to get_object_or_404 search
        p_form = PersonModelForm(request.POST, instance=Person.objects.get(id=obj_id), prefix='person')
        if p_form.is_valid:
            # sub forms for: Address, Telephone, Email
            p_form.save()
            messages.success(request, f'Contact saved!')
            return redirect('home')
    else:
        p_form = PersonModelForm(prefix='person', instance=Person.objects.get(id=obj_id))
    return render(request, 'contacts/create_person.html',
        context={
            'form': p_form
        }
    )


