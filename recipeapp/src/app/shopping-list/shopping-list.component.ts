import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../Shared/ingredient.model';
import { ShoppingService } from './shopping.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
 
  ingredients!: Ingredient[];
  private igChangeSub!: Subscription;

  constructor(private shoppingServices: ShoppingService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingServices.getIngredient()
    this.igChangeSub = this.shoppingServices.ingredientsChanges
      .subscribe(
        (ingredients: Ingredient[]) =>
          this.ingredients = ingredients
      )
  }
  onEditItem(index: number){
    this.shoppingServices.staredEditing.next(index);
  }
  ngOnDestroy(): void {
      this.igChangeSub.unsubscribe();
  }
}
