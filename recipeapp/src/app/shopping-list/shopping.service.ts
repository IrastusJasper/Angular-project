import { Injectable } from '@angular/core'; 
import { Subject } from 'rxjs';
import { Ingredient } from '../Shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  ingredientsChanges = new Subject<Ingredient[]>();
  staredEditing = new Subject<number>();

  constructor() { }
  private ingredients : Ingredient []=[
    new Ingredient('Apple', 5),
    new Ingredient('Tomatoes', 10)
  ]
  getIngredient(){
    return this.ingredients.slice()
  }
  getIngredients(index: number){
    return this.ingredients[index];
  }
  addIngredient(ingredient: Ingredient){
    this.ingredients.push(ingredient)
    this.ingredientsChanges.next(this.ingredients.slice())
  }
  addIngredients(ingredients: Ingredient[]){
    // for(let ingredient of ingredients){
    //   this.addIngredient(ingredient)
    // }
    this.ingredients.push(...ingredients)
    this.ingredientsChanges.next(this.ingredients.slice())
  }
  updateIngredint(index: number, newIngrdient: Ingredient){
    this.ingredients[index] = newIngrdient;
    this.ingredientsChanges.next(this.ingredients.slice());
    
  }
  deleteIngredient(index: number){
    this.ingredients.splice(index,1);
    this.ingredientsChanges.next(this.ingredients.slice());
  }
}
