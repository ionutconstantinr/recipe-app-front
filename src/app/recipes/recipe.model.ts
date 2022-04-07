export interface RecipeAPI {
  id: string;
  title: string;
  body: string;
  difficulty: string;
  preparation_time: string;
  user: {
    first_name: string;
    last_name: string;
    email: string;
    id: string;
  };
}

export class Recipe {
  constructor(
    public id: string,
    public title: string,
    public body: string,
    public difficulty: string,
    public preparationTime: string,
    public user: {
      firstName: string;
      lastName: string;
      email: string;
      id: string;
    }
  ) {}

  static fromAPI(model?: any): Recipe {
    return new Recipe(
      model.email,
      model.title,
      model.body,
      model.difficulty,
      model.preparation_time,
      {
        firstName: model.user.first_name,
        lastName: model.user.last_name,
        email: model.user.email,
        id: model.user.id,
      }
    );
  }
}
