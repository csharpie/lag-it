import { RatingService } from './../../../core/rating.service';
import { DrinkService } from './../../../core/drink.service';
import { Drink } from './../../../core/models/drink';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-drink-edit',
  templateUrl: './drink-edit.component.html',
  styleUrls: ['./drink-edit.component.scss']
})
export class DrinkEditComponent implements OnInit {
  loading = false;
  error = null;
  editDrinkForm: FormGroup;
  drinkId: string;
  userId: string;

  constructor(
    private drinkService: DrinkService,
    private ratingService: RatingService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.userId = this.route.parent.snapshot.paramMap.get('uid');
    this.drinkId = this.route.snapshot.paramMap.get('id');

    this.editDrinkForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(1)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      brand: ['', [Validators.required, Validators.minLength(10)]],
      abv: [0, [Validators.required, Validators.min(1)]],
      url: ['']
    });

    if (this.drinkId !== null) {
      this.drinkService.getDrinkByDrinkId(this.drinkId)
      .valueChanges()
      .subscribe(drink => {
        this.editDrinkForm.patchValue(drink);
      });

      this.ratingService.getUserDrinkRating(this.userId, this.drinkId)
        .valueChanges()
        .subscribe(drinkRating => {
          if (drinkRating) {
            $('.ui.rating')
              .rating({
                initialRating: drinkRating.value,
                maxRating: 5
              });
          } else {
            this.initializeRating();
          }
        }, err => {
         this.initializeRating();
        });
    } else {
      this.initializeRating();
    }
  }

  onSubmit() {
    if (!this.editDrinkForm.valid) { return; }
    const { name, brand, description, abv, url } = this.editDrinkForm.getRawValue();
    const rating = $('.ui.rating > i.active').length;

    const drink: Drink = {
      name, brand, description, abv, url
    };

    if (this.drinkId === null) {
      this.drinkService.addDrink(drink);
    } else {
      this.drinkService.updateDrinkByDrinkId(this.drinkId, drink);
    }

    this.ratingService.setRating(this.userId, this.drinkId, rating);

    this.router.navigate(['/']);
  }

  get name() {
    return this.editDrinkForm.get('name');
  }

  get description() {
    return this.editDrinkForm.get('description');
  }

  get brand() {
    return this.editDrinkForm.get('brand');
  }

  get abv() {
    return this.editDrinkForm.get('abv');
  }

  private initializeRating() {
    $('.ui.rating')
            .rating({
              initialRating: 0,
              maxRating: 5
            });
  }
}
