import { HttpResponse, Controller, Validation } from '@/presentation/protocols';
import { ok, badRequest } from '@/presentation/helpers';

export class SignUpController implements Controller {
  constructor(private readonly validation: Validation) {}

  async handle(account: SignUpController.Request): Promise<HttpResponse> {
    const error = this.validation.validate(account);

    if (error) {
      return badRequest(error);
    }

    return ok(account);
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
