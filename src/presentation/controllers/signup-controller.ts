import { HttpResponse, Controller } from '@/presentation/protocols';

export class SignUpController implements Controller {
  async handle(data: SignUpController.Request): Promise<HttpResponse> {
    return {
      body: data,
      statusCode: 200,
    };
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
