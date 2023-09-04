import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  ingredientsSubscription: Subscription;
  editIngredient: Ingredient;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.ingredientsSubscription = this.shoppingListService
      .getIngredientsSubject()
      .subscribe((ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      });
  }

  onClick(i: number) {
    this.editIngredient = this.shoppingListService.getIngredientByIndex(i);
    this.shoppingListService
      .getEditIngredientSubject()
      .next({ index: i, ingredient: this.editIngredient });
  }

  ngOnDestroy(): void {
    this.ingredientsSubscription.unsubscribe();
  }
}
