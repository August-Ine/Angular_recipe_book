import { BehaviorSubject } from 'rxjs';
import { Recipe } from '../Recipe/recipe.model';
import { Ingredient } from '../shared/ingredient.model';

export class RecipeService {
  private recipes: Recipe[] = [
    // new Recipe(
    //   'Githeri',
    //   'Beans and corn',
    //   '../../../assets/images/sushi.jpg',
    //   [new Ingredient('Beans', 20), new Ingredient('Corn', 30)]
    // ),
    // new Recipe(
    //   'Toast bread',
    //   'Power breakfast',
    //   '../../../assets/images/sushi.jpg',
    //   [new Ingredient('Bread', 2), new Ingredient('Butter', 1)]
    // ),
  ];

  private recipesSubject: BehaviorSubject<Recipe[]> = new BehaviorSubject<
    Recipe[]
  >(this.recipes);

  getRecipesList() {
    return this.recipes.slice();
  }

  getRecipesSubject() {
    return this.recipesSubject;
  }

  getRecipeById(index: number) {
    return this.recipes[index];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesSubject.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesSubject.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesSubject.next(this.recipes.slice());
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesSubject.next(this.recipes.slice());
  }
}
