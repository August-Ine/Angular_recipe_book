import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  recipeIndex: number;

  constructor(
    private slService: ShoppingListService,
    private rpService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.recipeIndex = +params['id'];
      this.recipe = this.rpService.getRecipeById(this.recipeIndex);
    });
  }

  sendToSl() {
    this.slService.addIngredientsToList(this.recipe.ingredients);
  }

  onDeleteRecipe() {
    this.rpService.deleteRecipe(this.recipeIndex);
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
