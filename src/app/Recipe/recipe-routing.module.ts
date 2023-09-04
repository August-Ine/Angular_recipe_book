import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthGuardService } from '../auth/auth-guard.service';
import { RecipeDetailComponent } from './RecipeDetail/recipe-detail.component';
import { EditRecipeComponent } from './edit-recipe/edit-recipe.component';
import { RecipeResolverService } from './recipe-resolver.service';
import { RecipeComponent } from './recipe.component';
import { SelectRecipeComponent } from './select-recipe/select-recipe.component';

@NgModule({
  providers: [],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        canActivate: [AuthGuardService],
        component: RecipeComponent,
        resolve: { recipes: RecipeResolverService },
        children: [
          { path: '', component: SelectRecipeComponent, pathMatch: 'full' },
          { path: 'new', component: EditRecipeComponent },
          { path: ':id', component: RecipeDetailComponent },
          { path: ':id/edit', component: EditRecipeComponent },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class RecipeRoutingModule {}
