import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css'],
})
export class EditRecipeComponent implements OnInit {
  id: number;
  editMode: boolean = false;
  recipeForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private rpService: RecipeService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] !== undefined;
      this.initForm();
    });
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = this.fb.array([]);

    if (this.editMode) {
      const recipe = this.rpService.getRecipeById(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;

      if (recipe['ingredients']) {
        recipe.ingredients.forEach((ingredient) => {
          (<FormArray>recipeIngredients).push(
            this.fb.group({
              name: [ingredient.name, Validators.required],
              amount: [
                ingredient.amount,
                [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)],
              ],
            })
          );
        });
      }
    }
    this.recipeForm = this.fb.group({
      rpName: [recipeName, Validators.required],
      rpDescription: [recipeDescription, Validators.required],
      rpImagePath: [recipeImagePath, Validators.required],
      rpIngredients: recipeIngredients,
    });
  }

  get controls() {
    //alternative type-casting syntax: (<FormArray>this.recipeForm.get('rpIngredients')).controls
    return (this.recipeForm.get('rpIngredients') as FormArray).controls;
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('rpIngredients')).push(
      this.fb.group({
        name: [null, Validators.required],
        amount: [
          null,
          [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)],
        ],
      })
    );
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('rpIngredients')).removeAt(index);
  }

  onSubmit() {
    const newRecipe: Recipe = new Recipe(
      this.recipeForm.value['rpName'],
      this.recipeForm.value['rpDescription'],
      this.recipeForm.value['rpImagePath'],
      this.recipeForm.value.rpIngredients
    );
    if (this.editMode) {
      this.rpService.updateRecipe(this.id, newRecipe);
    } else {
      this.rpService.addRecipe(newRecipe);
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
