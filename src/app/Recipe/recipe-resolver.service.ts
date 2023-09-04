import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { SaveRecipeService } from '../services/save-recipe.service';
import { RecipeService } from '../services/recipe.service';

@Injectable({
  providedIn: 'root',
})
export class RecipeResolverService implements Resolve<any> {
  constructor(
    private saveRpService: SaveRecipeService,
    private recipeService: RecipeService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): void {
    //only fetch if we don't have recipes
    if (this.recipeService.getRecipesList().length === 0) {
      this.saveRpService.getRecipe();
    }
  }
}
