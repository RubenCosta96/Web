import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-registo',
  standalone: true,
  imports: [NgIf, RouterLink, RouterOutlet, ReactiveFormsModule],
  templateUrl: './registo.component.html',
  styleUrl: './registo.component.scss',
})
export class RegistoComponent {
  registerForm: FormGroup;
  user: User;

  constructor(private service: AuthService, private router: Router) {
    this.registerForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/
        ),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/
        ),
      ]),
    });
    this.user = {
      username: '',
      email: '',
      password: '',
    };
  }

  //verify if input was touched
  isFieldTouched(fieldName: string) {
    let isTouched: boolean = true;
    const control = this.registerForm.get(fieldName);
    if (control != null) isTouched = control.touched;
    return isTouched;
  }

  //verify if input value is valid
  isFieldInvalid(fieldName: string) {
    let isInvalid: boolean = true;
    const control = this.registerForm.get(fieldName);
    console.log(control);
    if (control != null) {
      isInvalid = control.invalid && (control.touched || control.dirty);
      if (fieldName == 'confirmPassword')
        isInvalid =
          isInvalid &&
          this.registerForm.get('password')?.value == control?.value;
    }
    console.log('testeX' + ' ' + isInvalid);
    return isInvalid;
  }

  onFormSubmit() {
    if (this.registerForm.valid) {
      this.user = {
        username: this.registerForm.get('username')?.value ?? '',
        email: this.registerForm.get('email')?.value ?? '',
        password: this.registerForm.get('password')?.value ?? '',
      };

      console.log(this.user.email);
      console.log(this.user.password);

      //call service
      this.service
        .register(
          this.user.username as string,
          this.user.email,
          this.user.password
        )
        .then((credential) => {
          let email =
            credential.user.email != null ? credential.user.email.trim() : '';

          localStorage.setItem('userEmail', email);

          this.router.navigate(['/home']);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      // Handle invalid form
      this.registerForm.markAllAsTouched();
      console.error('Form is invalid');
    }
  }

  clearForm() {
    this.registerForm.reset();
  }
}
