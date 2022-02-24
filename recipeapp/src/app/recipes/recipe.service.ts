import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { EventEmitter } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipeSelected = new EventEmitter<Recipe>();
  constructor() { }

  private recipes: Recipe[] = [
    new Recipe(
      'A test recipe',
      'This sample test',
      'https://scontent.fixm3-1.fna.fbcdn.net/v/t1.6435-9/48389878_332151957387099_1453138404337254400_n.png?_nc_cat=103&ccb=1-5&_nc_sid=924451&_nc_ohc=7WmRYsYXU0EAX--DHLE&_nc_ht=scontent.fixm3-1.fna&oh=00_AT_wbEfZRNPQ3eg4fY-wsPeXVinh21W4BKQ8y-a4nuD7mA&oe=622B9610'
    ),
  ];
  getRecipes(){
    return this.recipes.slice();
  }
}
