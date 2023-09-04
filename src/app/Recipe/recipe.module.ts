import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { RecipeComponent } from './recipe.component';
import { RecipeDetailComponent } from './RecipeDetail/recipe-detail.component';
import { RecipeItemComponent } from './RecipeItem/recipe-item.component';
import { RecipeListComponent } from './RecipeList/recipe-list.component';
import { EditRecipeComponent } from './edit-recipe/edit-recipe.component';
import { RecipeRoutingModule } from './recipe-routing.module';
import { SelectRecipeComponent } from './select-recipe/select-recipe.component';

@NgModule({
  declarations: [
    RecipeComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    RecipeListComponent,
    EditRecipeComponent,
    SelectRecipeComponent,
  ],
  imports: [SharedModule, RecipeRoutingModule],
  exports: [],
  providers: [],
})
export class RecipeModule {}
