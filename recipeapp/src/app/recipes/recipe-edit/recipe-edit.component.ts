import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id!: number;
  editMode = false;
  recipeForm!: FormGroup;
  recipeService: any;

  constructor(private route: ActivatedRoute, private recipe: RecipeService, private router: Router) { }

  ngOnInit(): void {
   
    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    )
  }
  onSubmit(){
    // const newRecipe = new Recipe(
    //   this.recipeForm.value['name'],
    //   this.recipeForm.value['imagePath'],
    //   this.recipeForm.value['description'],
    //   this.recipeForm.value['ingredient']
    // )
    if(this.editMode){
      this.recipe.updateRecipe(this.id, this.recipeForm.value)
    }
    else{
      this.recipe.addRecipe(  this.recipeForm.value);
    }
    this.onCancel();
  }
  get controls() { // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }
  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null,[Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    )
  }
  private initForm(){

    let recipeName = "";
    let recipeimagepath = "";
    let recipedescription = "";
    let recipeIngredients = new FormArray([]);

    if(this.editMode){
      const recipe = this.recipe.getRecipe(this.id);
      recipeName = recipe.name;
      recipeimagepath = recipe.imagePath;
      recipedescription = recipe.description;
      if(recipe['ingredients']){
        for(let ingredient of recipe.ingredients ){
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount,
                [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          )
        }
      }
    } 
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName,Validators.required),
      'imagePath': new FormControl(recipeimagepath,Validators.required),
      'description': new FormControl(recipedescription,Validators.required),
      'ingredients': recipeIngredients 
    })
  }
  onCancel(){
    this.router.navigate(['../'],{relativeTo: this.route})
  }
  onDeleteIngredent(index: number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }
}