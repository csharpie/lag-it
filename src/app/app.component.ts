import { AuthService } from './core/auth.service';
import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'lag-it';
  defaultAvatarSrc: string;
  showUserMenu: boolean = false;

  constructor(
    public afAuth: AngularFireAuth,
    public auth: AuthService) { }

  logout() {
    this.auth.logout();
  }

  setDefaultAvatar() {
    this.defaultAvatarSrc = 'assets/missing-avatar.jpg';
  }
}
