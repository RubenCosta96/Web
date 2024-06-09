import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgIf, RouterLink, RouterOutlet, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;
  user: User;

  constructor(
    private service: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/
          ),
        ],
      ],
      //password: ['', [Validators.required]]
    });
    this.user = {
      email: '',
      password: '',
    };
  }

  //verify if input was touched
  isFieldTouched(fieldName: string) {
    let isTouched: boolean = true;
    const control = this.loginForm.get(fieldName);
    if (control != null) isTouched = control.touched;
    return isTouched;
  }

  //verify if input value is valid
  isFieldInvalid(fieldName: string) {
    let isInvalid: boolean = true;
    const control = this.loginForm.get(fieldName);
    if (control != null)
      isInvalid = control.invalid && (control.touched || control.dirty);

    return isInvalid;
  }
  onFormSubmit() {
    if (this.loginForm.valid) {
      this.user = {
        email: this.loginForm.get('email')?.value,
        password: this.loginForm.get('password')?.value,
      };
      //call service
      this.service
        .login(this.user.email, this.user.password)
        .then((credential) => {
          let email =
            credential.user.email != null ? credential.user.email.trim() : '';

          console.log(credential);
          localStorage.setItem('userEmail', email);
          // window.location.href = '/home';
          this.router.navigate(['/home']);
        })
        .catch((error) => {
          console.log(error);
          alert('Usuário ou senha inválidos');
        });
    } else {
      // Handle invalid form
      this.loginForm.markAllAsTouched();
      console.error('Form is invalid');
    }
  }

  clearForm() {
    this.loginForm.reset();
  }

  showPassword() {
    var password = <HTMLInputElement>document.getElementById('password'); // damos cast ao <HTMLInputElement> porque o typescrit é typesafe e dava erros
    if (password.type === 'password') {
      password.type = 'text';
    } else {
      password.type = 'password';
    }
  }
}
