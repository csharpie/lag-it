import { DrinkService } from './../../../core/drink.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Component } from '@angular/core';

@Component({
  selector: 'app-drink-list',
  templateUrl: './drink-list.component.html',
  styleUrls: ['./drink-list.component.scss']
})
export class DrinkListComponent {
  constructor(
    public drinkService: DrinkService,
    public afAuth: AngularFireAuth,
  ) {
  }
}
