import { Validation } from '@/presentation/protocols';
import { ValidationComposite } from '@/validation/validators';
import { RequiredFieldValidation } from '@/validation/validators';

export const makeSignUpValidation = (): ValidationComposite => {
  const validations: Validation[] = [];
  for (const field of [
    'username',
    'email',
    'password',
    'passwordConfirmation',
  ]) {
    validations.push(new RequiredFieldValidation(field));
  }
  return new ValidationComposite(validations);
};
