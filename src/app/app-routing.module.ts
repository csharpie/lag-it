import { DrinkEditComponent } from './components/drinks/drink-edit/drink-edit.component';
import { DrinkListComponent } from './components/drinks/drink-list/drink-list.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { map } from 'rxjs/operators';

const redirectLoggedInToDrinks = () =>
  map(user => user ? ['users', (user as any).uid, 'drinks'] : true);

const onlyAllowSelf = next =>
  map(user => (!!user && next.params.uid === (user as any).uid) || ['']);

const routes: Routes = [
  {
    path: 'users/:uid',
    children: [
      {
        path: 'drinks',
        children: [
          {
            path: '',
            component: DrinkListComponent,
            canActivate: [AngularFireAuthGuard],
            data: { authGuardPipe : onlyAllowSelf },
          },
          {
            path: 'new',
            component: DrinkEditComponent,
            canActivate: [AngularFireAuthGuard],
            data: { authGuardPipe : onlyAllowSelf }
          },
          {
            path: 'edit/:id',
            component: DrinkEditComponent,
            canActivate: [AngularFireAuthGuard],
            data: { authGuardPipe : onlyAllowSelf }
          }
        ]
      }
    ]
  },
  {
    path: '',
    component: LoginComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe : redirectLoggedInToDrinks }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
