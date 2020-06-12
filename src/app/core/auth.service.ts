import { Observable, of } from 'rxjs';
import { UserProfile } from './models/user-profile';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { map, switchMap } from 'rxjs/operators';
import { auth } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<any>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router) {
      this.user$ = this.afAuth.authState.pipe(
        switchMap(user => {
          if (user) {
            return this.afs.doc<UserProfile>(`users/${user.uid}`).valueChanges();
          } else {
            return of(null);
          }
        })
      );
    }

  async signUp(email, password, firstName, lastName) {
    const credential = await this.afAuth.createUserWithEmailAndPassword(email, password);
    await credential.user.updateProfile({ displayName: `${firstName} ${lastName}`});
    this.createUserDocument(credential.user);
  }

  async logIn(email, password) {
    const credential = await this.afAuth.signInWithEmailAndPassword(email, password);
    await this.routeOnLogin(credential.user);
  }

  async signInByGoogleAuth() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    this.updateUserDocument(credential.user);
    await this.routeOnLogin(credential.user);
  }

  async logout() {
    await this.afAuth.signOut();
    this.router.navigate(['/']);
  }

  async routeOnLogin(user: firebase.User) {
    this.router.navigate([`users/${user.uid}/drinks`]);
  }

  private createUserDocument(user: firebase.User) {
    const userProfile: UserProfile = {
      uid: user.uid,
      displayName: user.displayName
    };

    return this.afs.doc(`users/${user.uid}`)
      .set(userProfile);
  }

  private updateUserDocument(user: firebase.User) {
    const userProfile: UserProfile = {
      uid: user.uid,
      displayName: user.displayName,
      photoUrl: user.photoURL
    };

    return this.afs.doc(`users/${user.uid}`)
      .set(userProfile, {merge: true});
  }
}
