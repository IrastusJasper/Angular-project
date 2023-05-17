import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/Shared/ingredient.model';
import { ShoppingService } from '../shopping.service';
import { NgForm } from "@angular/forms"
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('f', { static: false })
  slForm!: NgForm;
  subscription!: Subscription;
  editMode = false;
  editedItem!: Ingredient;
  editItemIndex!: number;
  constructor(private shoppingService: ShoppingService) { }

  ngOnInit(): void {  
    this.subscription = this.shoppingService.staredEditing.subscribe(
      (index:number)=>{
        this.editItemIndex = index;
        this.editMode = true; 
        this.editedItem = this.shoppingService.getIngredients(index);
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      }
    ); 
  }
  onSubmit(forms: NgForm){
    const value = forms.value;
    const newIngrident = new Ingredient(value.name,value.amount);
    if(this.editMode){
      this.shoppingService.updateIngredint(this.editItemIndex, newIngrident);
    }
    else{
      this.shoppingService.addIngredient(newIngrident)
    }
    console.log(value);
    this.editMode = false;
    this.slForm.reset();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  onClear(){
    this.slForm.reset();
    this.editMode = false;
  }
  onDelete(){
    this.shoppingService.deleteIngredient(this.editItemIndex);
    this.onClear();
  }
}
