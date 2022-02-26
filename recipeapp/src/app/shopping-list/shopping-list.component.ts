import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../Shared/ingredient.model';
import { ShoppingService } from './shopping.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  addIngredients(ingredients: Ingredient[]) {
    throw new Error('Method not implemented.');
  }
  ingredients!: Ingredient[];

  constructor(private shoppingServices: ShoppingService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingServices.getIngredient()
    this.shoppingServices.ingredientsChanges
      .subscribe(
        (ingredients: Ingredient[]) =>
          this.ingredients = ingredients
      )
  }
}
