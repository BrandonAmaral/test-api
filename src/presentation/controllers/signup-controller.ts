import { HttpResponse } from '@/presentation/protocols';

export class SignUpController {
  async handle(data: string): Promise<HttpResponse> {
    return {
      body: data,
      statusCode: 200,
    };
  }
}
