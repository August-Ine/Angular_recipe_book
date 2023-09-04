import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ShoppingComponent } from './shopping.component';
import { ShoppingListComponent } from './ShoppingList/shopping-list.component';
import { ShoppingListEditComponent } from './ShoppingListEdit/shopping-list-edit.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ShoppingComponent,
    ShoppingListComponent,
    ShoppingListEditComponent,
  ],
  imports: [
    RouterModule.forChild([{ path: '', component: ShoppingComponent }]),
    SharedModule,
  ],
  exports: [RouterModule],
  providers: [],
})
export class ShoppingModule {}
