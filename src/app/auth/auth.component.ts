import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  isLogin = true;
  isLoading = false;
  error = null;
  authObs: Observable<any>;

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    this.isLoading = true;
    if (!form.valid) {
      return;
    }
    if (this.isLogin) {
      this.authObs = this.authService.logIn(
        form.value.email,
        form.value.password
      );
    } else {
      this.authObs = this.authService.signUp(
        form.value.email,
        form.value.password
      );
    }
    //subscribe to observable
    this.authObs.subscribe({
      next: (resData) => {
        this.isLoading = false;
        form.reset();
        this.router.navigate(['/recipes']);
      },
      error: (error) => {
        this.isLoading = false;
        this.error = error.message;
      },
    });
  }
}
