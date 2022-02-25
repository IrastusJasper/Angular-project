import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { EventEmitter } from '@angular/core';
import { Ingredient } from '../Shared/ingredient.model';
@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipeSelected = new EventEmitter<Recipe>();
  constructor() { }

  private recipes: Recipe[] = [
    new Recipe(
      'Big Burger',
      'What else need to say ?',
      'https://upload.wikimedia.org/wikipedia/commons/4/47/Hamburger_%28black_bg%29.jpg',
      [
        new Ingredient('Buns', 2),
        new Ingredient('Meat', 1)
      ]
    ),
  ];
  getRecipes(){
    return this.recipes.slice();
  }
}
