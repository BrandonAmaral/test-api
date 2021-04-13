import { Validation } from '@/presentation/protocols';
import { InvalidParamError } from '@/presentation/errors';

export class CompareFieldsValidation implements Validation {
  constructor(
    private readonly field: string,
    private readonly fieldToCompare: string,
  ) {}

  validate(input: any): Error | void {
    if (input[this.field] !== input[this.fieldToCompare]) {
      return new InvalidParamError(this.fieldToCompare);
    }
  }
}
