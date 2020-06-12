import { Rating } from './models/rating';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor(private afs: AngularFirestore) { }

  getUserRatings(userId) {
    const ratingRefs = this.afs.collection('ratings', ref => ref.where('userId', '==', userId));
    return ratingRefs.valueChanges();
  }

  getDrinkRatings(drinkId) {
    const ratingRefs = this.afs.collection('ratings', ref => ref.where('drinkId', '==', drinkId));
    return ratingRefs.valueChanges();
  }

  getUserDrinkRating(userId, drinkId) {
    return this.afs.doc<Rating>(`ratings/${userId}_${drinkId}`);
  }

  setRating(userId, drinkId, value) {
    const rating: Rating = { userId, drinkId, value};

    const ratingPath = `ratings/${rating.userId}_${rating.drinkId}`;

    return this.afs.doc(ratingPath).set(rating);
  }
}
