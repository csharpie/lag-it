import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Drink } from './models/drink';

@Injectable({
  providedIn: 'root'
})
export class DrinkService {
  private drinksCollection: AngularFirestoreCollection<Drink>;
  drinks$: Observable<any>;

  constructor(
    private afs: AngularFirestore
  ) {
    this.drinksCollection =
      this.afs.collection<Drink>('drinks');
    this.drinks$ =
      this.drinksCollection.valueChanges({idField: 'drinkId'});
  }

  getDrinkByDrinkId(drinkId: string) {
    return this.drinksCollection.doc<Drink>(drinkId);
  }

  addDrink(drink: Drink) {
    this.drinksCollection.add(drink);
  }

  updateDrinkByDrinkId(drinkId: string, drink: Drink) {
    this.drinksCollection.doc(drinkId)
    .update(drink);
  }
}
