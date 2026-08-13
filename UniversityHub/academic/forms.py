from django import forms
from .models import Student

class StudentForm(forms.ModelForm):

    class Meta:
        model = Student
        # We specify exactly which fields to show for security
        fields = ['first_name', 'last_name', 'email', 'courses']

        # We can add custom styling (Bootstrap classes) here 
        widgets = {
            'first_name': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Enter Name'
            }),

            'email': forms.EmailInput(attrs={
                'class': 'form-control',
            }),

            'courses': forms.CheckboxSelectMultiple()
        }
    def clean_email(self):
        email = self.cleaned_data.get('email')

        if not email.endswith('university.edu'):
            raise forms.ValidationError(
                "Email must be a university email address."
            )
        
        return email