import {Component} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  userForm: FormGroup;

  constructor(private toastr: ToastrService, private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.userForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    this.authService.login({
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
        this.toastr.success('Вхід виконаний успішно');
        this.router.navigate(['/']);
      });
  }
}
