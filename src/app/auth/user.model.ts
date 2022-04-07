export class User {
  constructor(
    public email: string,
    private _token: string,
    public id: string
  ) {}

  public get token(): string {
    return this._token;
  }
}
