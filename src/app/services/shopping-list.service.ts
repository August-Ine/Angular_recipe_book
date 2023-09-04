import { Ingredient } from '../shared/ingredient.model';
import { BehaviorSubject, Subject } from 'rxjs';

export class ShoppingListService {
  private ingredients: Ingredient[] = [
    new Ingredient('apple', 4),
    new Ingredient('banana', 2),
  ];

  private ingredientsSubject = new BehaviorSubject<Ingredient[]>(
    this.ingredients
  );

  private editIngredientSubject = new Subject<{
    index: number;
    ingredient: Ingredient;
  }>();

  getIngredientsSubject() {
    return this.ingredientsSubject;
  }

  getEditIngredientSubject() {
    return this.editIngredientSubject;
  }

  getIngredientByIndex(i: number) {
    return this.ingredients[i];
  }

  addIngredientToList(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsSubject.next(this.ingredients);
  }

  deleteIngredientByIndex(i: number) {
    this.ingredients.splice(i, 1);
    this.ingredientsSubject.next(this.ingredients);
  }

  updateIngredient(i: number, newIngredient: Ingredient) {
    this.ingredients[i] = newIngredient;
    this.ingredientsSubject.next(this.ingredients);
  }

  addIngredientsToList(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients); //only emit event once
    this.ingredientsSubject.next(this.ingredients);
  }
}
