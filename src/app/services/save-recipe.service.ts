import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { RecipeService } from './recipe.service';
import { Recipe } from '../Recipe/recipe.model';

interface putResponse {
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class SaveRecipeService {
  fbUrl =
    'https://food-order-app-ac388-default-rtdb.firebaseio.com/recipes.json';

  fbDataId: string;

  constructor(private recipeService: RecipeService, private http: HttpClient) {}

  sendRecipe() {
    const recipeList = this.recipeService.getRecipesList();

    this.http.put<putResponse>(this.fbUrl, recipeList).subscribe((resData) => {
      this.fbDataId = resData['name'];
    });
  }

  getRecipe() {
    this.http
      .get<Recipe[]>(this.fbUrl)
      .pipe(
        map((resData: Recipe[]) => {
          return resData.map((recipe) => {
            //ensure all recipes have ingredients[]
            if (recipe['ingredients'] === undefined) {
              return { ...recipe, ingredients: [] };
            }
            return recipe;
          });
        })
      )
      .subscribe((resData) => {
        this.recipeService.setRecipes(resData);
      });
  }
}
