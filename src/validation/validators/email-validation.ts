import { InvalidParamError } from '@/presentation/errors';
import { Validation } from '@/presentation/protocols';
import { EmailValidator } from '@/validation/protocols';

export class EmailValidation implements Validation {
  constructor(
    private readonly field: string,
    private readonly emailValidator: EmailValidator,
  ) {}

  validate(input: any): Error | void {
    const isValid = this.emailValidator.isValid(input[this.field]);
    if (!isValid) {
      return new InvalidParamError(this.field);
    }
  }
}
