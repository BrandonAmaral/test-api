import { EmailValidatorAdapter } from '@/infra/validators';
import { Validation } from '@/presentation/protocols';
import {
  ValidationComposite,
  RequiredFieldValidation,
} from '@/validation/validators';
import { EmailValidation } from '@/validation/validators/email-validation';

export const makeSignInValidation = (): ValidationComposite => {
  const validations: Validation[] = [];
  for (const field of ['email', 'password']) {
    validations.push(new RequiredFieldValidation(field));
  }
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()));
  return new ValidationComposite(validations);
};
