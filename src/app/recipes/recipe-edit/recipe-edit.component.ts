import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  difficulty = ['EASY', 'MEDIUM', 'HARD'];
  id!: number;
  editMode = false;
  recipeForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  private initForm() {
    let recipeTitle = '';
    let recipeDifficulty = '';
    let recipePreparationTime = '00:00:00';
    let recipeBody = '';

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeTitle = recipe.title;
      recipeDifficulty = recipe.difficulty;
      recipePreparationTime = recipe.preparationTime;
      recipeBody = recipe.body;
    }

    this.recipeForm = new FormGroup({
      title: new FormControl(recipeTitle, Validators.required),
      difficulty: new FormControl(recipeDifficulty, Validators.required),
      preparationTime: new FormControl(
        recipePreparationTime,
        Validators.pattern(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/)
      ),
      body: new FormControl(recipeBody, Validators.required),
    });
  }

  onSubmitRecipeForm() {
    console.log(this.recipeForm.value);
  }
}
