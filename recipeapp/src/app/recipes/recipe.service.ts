import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { EventEmitter } from '@angular/core';
import { Ingredient } from '../Shared/ingredient.model';
import { ShoppingService } from '../shopping-list/shopping.service';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipeSelected = new EventEmitter<Recipe>();
  recipeChange = new Subject<Recipe[]>();  
  constructor(private shoppingService: ShoppingService) { }

  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'Big Burger',
  //     'What else need to say ?',
  //     'https://upload.wikimedia.org/wikipedia/commons/4/47/Hamburger_%28black_bg%29.jpg',
  //     [
  //       new Ingredient('Buns', 2),
  //       new Ingredient('Meat', 1)
  //     ],
  //   ),
  //    new Recipe(
  //     'Big Pizza',
  //     'What else need to say ?',
  //     'https://upload.wikimedia.org/wikipedia/commons/4/47/Hamburger_%28black_bg%29.jpg',
  //     [
  //       new Ingredient('Flow', 2),
  //       new Ingredient('Meat', 1)
  //     ],
  //   )
  // ];
  private recipes: Recipe[] = [];

  setRecipe(recipes: Recipe[]){
    this.recipes = recipes;
    this.recipeChange.next(this.recipes.slice());
  }

  getRecipes(){ 
    return this.recipes.slice();
  }
  getRecipe(index: number){
    return this.recipes[index]; 
  }
  addIngredientsToShoppingList(ingredients: Ingredient[]){
    this.shoppingService.addIngredients(ingredients)
  }
  addRecipe(recipe:Recipe){
    this.recipes.push(recipe);
    return this.recipeChange.next(this.recipes.slice());
  }
  updateRecipe(index: number, newRecipe: Recipe ){
    this.recipes[index] = newRecipe;
    return this.recipeChange.next(this.recipes.slice());
  }
  deleteRecipe(index: number){
    this.recipes.splice(index, 1);
    this.recipeChange.next(this.recipes.slice());
  }
  
}
