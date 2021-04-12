import { HttpResponse, Controller, Validation } from '@/presentation/protocols';
import { AddAccount } from '@/domain/usecases';
import { ok, badRequest, serverError } from '@/presentation/helpers';

export class SignUpController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly addAccount: AddAccount,
  ) {}

  async handle(request: SignUpController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request);
      if (error) {
        return badRequest(error);
      }
      const { username, email, password } = request;
      const account = this.addAccount.add({
        username,
        email,
        password,
      });
      return ok(account);
    } catch (err) {
      return serverError(err);
    }
  }
}

export namespace SignUpController {
  export type Request = {
    username: string;
    email: string;
    password: string;
    passwordConfirmation: string;
  };
}
