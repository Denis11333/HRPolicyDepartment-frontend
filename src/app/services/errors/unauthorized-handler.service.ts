import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class UnauthorizedHandlerService implements ErrorHandler {
  private toastr: ToastrService;

  constructor(private router: Router,
              private zone: NgZone,
              private injector: Injector) {
  }

  private getToastr(): ToastrService {
    if (!this.toastr) {
      this.toastr = this.injector.get(ToastrService);
    }
    return this.toastr;
  }

  handleError(error: HttpErrorResponse): void {
    if (error.status === 401) {
      localStorage.removeItem('token');
      this.zone.run(() => this.router.navigate(['/login']));
      const toastr = this.getToastr();
      if(toastr.toasts.length === 0) {
        toastr.error(
          'Для виконнаня минулої дії потрібно авторизувтись.',
          'Помилка авторизації',
        );
      }
    }
  }
}
