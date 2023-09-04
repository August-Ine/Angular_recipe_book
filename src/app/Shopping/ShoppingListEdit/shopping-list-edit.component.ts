import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
})
export class ShoppingListEditComponent implements OnInit {
  editIngredient: Ingredient;
  editIndex: number;
  editMode = false;
  @ViewChild('f') ingForm: NgForm;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.shoppingListService
      .getEditIngredientSubject()
      .subscribe(({ index, ingredient }) => {
        this.editMode = true;
        this.editIndex = index;
        this.editIngredient = ingredient;
        this.ingForm.setValue({
          name: this.editIngredient.name,
          amount: this.editIngredient.amount,
        });
      });
  }

  onClear() {
    this.ingForm.reset();
    this.editIndex = undefined;
    this.editMode = false;
  }

  onDelete() {
    this.shoppingListService.deleteIngredientByIndex(this.editIndex);
    this.onClear();
  }

  onSubmit(form: NgForm) {
    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editIndex, {
        name: form.value.name,
        amount: form.value.amount,
      });
    } else {
      this.shoppingListService.addIngredientToList({
        name: form.value.name,
        amount: form.value.amount,
      });
    }
    form.reset();
    this.editMode = false;
  }
}
