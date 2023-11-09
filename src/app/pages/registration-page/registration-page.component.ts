import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss'],
})
export class RegistrationPageComponent {
  userForm: FormGroup;

  constructor(private toastr: ToastrService, private fb: FormBuilder, private authService: AuthService,
              private router: Router) {
    this.userForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.userForm.invalid) {
      if (this.userForm.get('username')?.hasError('required')) {
        this.toastr.error('Ім\'я користувача - обов\'язкове поле', 'Помилка');
      }

      if (this.userForm.get('username')?.hasError('minlength')) {
        this.toastr.error('Ім\'я користувача має бути мінімум з 5 символів', 'Помилка');
      }

      if (this.userForm.get('password')?.hasError('required')) {
        this.toastr.error('Пароль - обов\'язкове поле', 'Помилка');
      }

      if (this.userForm.get('password')?.hasError('minlength')) {
        this.toastr.error('Пароль має бути мінімум з 6 символів', 'Помилка');
      }

      return;
    }

    this.authService.register({
      username: this.userForm.get('username')?.value,
      password: this.userForm.get('password')?.value,
    })
      .pipe(
        catchError((error) => {
          this.toastr.error(error.error.message)
          return throwError(error)
        })
      )
      .subscribe(() => {
      this.toastr.success('Реєстрація успішна');
      this.router.navigate(['/login']);
    });
  }
}
