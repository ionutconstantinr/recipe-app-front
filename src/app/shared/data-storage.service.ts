import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { Recipe, RecipeAPI } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private recipeService: RecipeService
  ) {}

  getRecipes() {
    return this.http.get<Recipe[]>('http://localhost:8080/user/recipes').pipe(
      map((recipes) => {
        console.log(recipes);
        return recipes.map((recipe) => {
          console.log(recipe);
          return {
            ...recipe,
          };
        });
      }),
      tap((recipes) => {
        let finalRecipes: Recipe[] = [];
        recipes.forEach((element) => {
          finalRecipes.push(Recipe.fromAPI(element));
        });
        this.recipeService.setRecipes(finalRecipes);
      })
    );
  }
}
