import { AuthService } from './../../core/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loading = false;
  error = null;
  action: 'login' | 'signup' = 'login';

  constructor(
    private auth: AuthService) {
   }

  ngOnInit(): void {
  }

  async onSubmit(form: NgForm) {
    this.loading = true;
    this.error = null;
    const { email, password, firstName, lastName } = form.value;

    try {
      if (this.action === 'signup') {
        this.auth.signUp(email, password, firstName, lastName);
        form.reset();
      } else {
       await this.auth.logIn(email, password);
      }
    } catch (error) {
      console.error(error.message);
      this.error = error.message;
    }

    this.loading = false;
  }

  async signInByGoogleAuthOnClick() {
    try {
      this.auth.signInByGoogleAuth();
    } catch (error) {
      console.error(error.message);
      this.error = error.message;
    }
  }

  get isLogin() {
    return this.action === 'login';
  }

  get isSignUp() {
    return this.action === 'signup';
  }
}
