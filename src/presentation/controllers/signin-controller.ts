import { Authentication } from '@/domain/usecases';
import { Controller, HttpResponse, Validation } from '@/presentation/protocols';
import {
  badRequest,
  ok,
  serverError,
  unauthorized,
} from '@/presentation/helpers';

export class SignInController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly authentication: Authentication,
  ) {}

  async handle(request: SignInController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request);
      if (error) {
        return badRequest(error);
      }
      const authentication = await this.authentication.auth(request);
      if (!authentication) {
        return unauthorized();
      }
      return ok(authentication);
    } catch (err) {
      return serverError(err);
    }
  }
}

export namespace SignInController {
  export type Request = {
    email: string;
    password: string;
  };
}
