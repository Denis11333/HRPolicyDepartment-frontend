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
      username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
    });
  }

  onSubmit() {
    if (this.userForm.invalid) {
      this.toastr.clear()

      this.displayErrorIfPresent('username', 'required', 'Ім\'я користувача - обов\'язкове поле')
      this.displayErrorIfPresent('username', 'minlength', 'Ім\'я користувача має бути мінімум з 5 символів')
      this.displayErrorIfPresent('username', 'maxlength', 'Ім\'я користувача має бути не більше 20 символів')

      this.displayErrorIfPresent('password', 'required', 'Пароль - обов\'язкове поле')
      this.displayErrorIfPresent('password', 'minlength', 'Пароль має бути мінімум з 5 символів')
      this.displayErrorIfPresent('password', 'maxlength', 'Пароль має бути не більше 20 символів')

      return;
    }

    this.authService.register({
      username: this.userForm.get('username')?.value,
      password: this.userForm.get('password')?.value,
    })
      .pipe(
        catchError((error) => {
          this.toastr.clear()

          const errorMessages = Array.isArray(error.error.message)
            ? error.error.message
            : [error.error.message];

          errorMessages.forEach((message: string) => {
            this.toastr.error(message);
          });
          return throwError(error)
        })
      )
      .subscribe(() => {
      this.toastr.success('Реєстрація успішна');
      this.router.navigate(['/login']);
    });
  }

  private displayErrorIfPresent(controlName: string, errorType: string, errorMessage: string): void {
    const control = this.userForm.get(controlName);

    if (control?.hasError(errorType)) {
      this.toastr.error(errorMessage, 'Помилка');
    }
  }
}
