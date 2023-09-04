import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipeList: Recipe[];
  recipesSubscription: Subscription;

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.recipesSubscription = this.recipeService
      .getRecipesSubject()
      .subscribe((recipes: Recipe[]) => {
        this.recipeList = recipes;
      });
  }

  ngOnDestroy(): void {
    this.recipesSubscription.unsubscribe();
  }
}
