import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Ingredient } from '../Shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  ingredientsChanges = new EventEmitter<Ingredient[]>()

  constructor() { }
  private ingredients : Ingredient []=[
    new Ingredient('Apple', 5),
    new Ingredient('Tomatoes', 10)
  ]
  getIngredient(){
    return this.ingredients.slice()
  }
  addIngredient(ingredient: Ingredient){
    this.ingredients.push(ingredient)
    this.ingredientsChanges.emit(this.ingredients.slice())
  }

}
