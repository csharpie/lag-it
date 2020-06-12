# Läg It

There are apps to socalize where you are, what you are drinking, and with whom you are drinking. Sometimes, you just want to keep this information to yourself. Enter Läg It (*laa·g it*), the anti-social drink log.

## Intentions of this App
Users log into the system and have access to a list of drinks, of which they may contribute to or modify.
A drink comprises of the name of the drink, the brand, a description of the drink, a link to the brand's page with more information on this drink, and the ABV. 

Finally, users may personally rate the drink, from 1 to 5 stars. The rating is only shown to the user whom entered it.

## Technologies Used
* Angular
* Firebase
* Semantic UI

## Getting Started:Locally
```bash
# install dependencies
yarn install

# serve on localhost:4200
yarn start

# build for production with minification
yarn build:prod
```

## Architecture
### Firebase
There are three collections:
1. drinks
2. ratings
3. users

### Models
#### Drink
./core/models/drink.ts
| **Property**
| --------------------
| `name`
| `brand`
| `description`
| `abv`
| `url`

#### Rating
./core/models/rating.ts
| **Property**
| --------------------
| `userId`
| `drinkId`
| `value`

#### User Profile
./core/models/user-profile.ts
| **Property**
| --------------------
| `uid`
| `displayName`
| `photoUrl`


## Deploying to Firebase
```bash
# deploy for firebase hosting
yarn deploy:firebase:hosting

# deploy for firebase rules
yarn deploy:firebase:rules
```

## Sources of Reference
* Victor Mejia's Lynda Course - [Angular: Cloud-Powered Apps with Firebase](https://www.lynda.com/Firebase-tutorials/Angular-Cloud-Powered-Apps-Firebase/2810170-2.html)
* Jeff Delaney of Fireship.io  - [Star Ratings System With Firestore](https://fireship.io/lessons/star-ratings-system-with-firestore/)
* Jeff Delaney of Fireship.io - [Google OAuth with @angular/fire](https://fireship.io/lessons/angularfire-google-oauth/)
* Blog Post by Jorge Vergara - [How to get the document ID with AngularFire](https://javebratt.com/angularfire-idfield/)

## Asset Reference
* [Beer image](http://clipart-library.com/clip-art/79-796091_beer-png-transparent-image-pint-of-beer-png.htm)
