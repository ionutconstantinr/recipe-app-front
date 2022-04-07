import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService implements OnInit {
  recipesChanged = new Subject<Recipe[]>();
  recipes!: Recipe[];
  // [
  // new Recipe('Ciorba de burta cu smantana', 'Body 1', 'EASY', '00:30:00', {
  //   firstName: 'Ionut',
  //   lastName: 'Constantin',
  //   email: 'ionutgconstantin@gmail.com',
  //   id: '12',
  // }),
  // new Recipe('Ardei umpluti cu carne', 'Body 2', 'HARD', '1:30:00', {
  //   firstName: 'Ionut',
  //   lastName: 'Constantin',
  //   email: 'ionutgconstantin@gmail.com',
  //   id: '12',
  // }),
  // ];

  constructor() {}
  ngOnInit(): void {}

  getRecipes(): Recipe[] {
    if (this.recipes) {
      return this.recipes.slice();
    } else return [];
  }

  getRecipe(id: number): Recipe {
    return this.recipes.slice()[id];
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }
}
