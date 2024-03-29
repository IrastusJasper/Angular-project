import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";
import { RecipeStartComponent } from "./recipes/recipe-start/recipe-start.component";
import { RecipesComponent } from "./recipes/recipes.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { RecipeResolverService } from "./recipes/recipe-detail/recipe-resolver.service";
import { AuthComponent } from "./auth/auth.component";
import { AuthGuard } from "./auth/auth.guard";

const appRoute: Routes = [
    {path: '',redirectTo: '/recipe', pathMatch : 'full'},
    {path: 'recipe',component : RecipesComponent, canActivate: [AuthGuard],
    children: [
        {path: '',component: RecipeStartComponent},
        {path: 'new',component: RecipeEditComponent},
        {path: ':id',component: RecipeDetailComponent, resolve: [RecipeResolverService]},
        {path: ':id/edit',component: RecipeEditComponent, resolve: [RecipeResolverService]},
    ]},
    {path: 'shopping-list',component: ShoppingListComponent},
    {path: 'auth', component: AuthComponent}
];
@NgModule({
    imports: [RouterModule.forRoot(appRoute)],
    exports:[RouterModule]
})
export class AppRoutingModule{

}