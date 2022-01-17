import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  @Output() recipeWasSelector = new EventEmitter<Recipe>();
  recipes: Recipe[] = [
    new Recipe(
      'A test recipe',
      'This sample test',
      'https://imgr.search.brave.com/HvDF-7FK2coohlFAWny92lRKL62_6xSnWF3tq6FQg8E/fit/1200/1200/ce/1/aHR0cHM6Ly9jZG4y/LnRtYmkuY29tL1RP/SC9JbWFnZXMvUGhv/dG9zLzM3LzEyMDB4/MTIwMC9leHBzMTMw/NDc3X0hDMTYzNzA4/QTA4XzE5XzViLmpw/Zw'
    ),
  ];
  constructor() {}

  ngOnInit(): void {}
  onRecipeSelected(recipe: Recipe){
    this.recipeWasSelector.emit(recipe);
  }
}