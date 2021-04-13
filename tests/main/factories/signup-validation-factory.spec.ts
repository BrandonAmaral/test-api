import {
  CompareFieldsValidation,
  RequiredFieldValidation,
  ValidationComposite,
} from '@/validation/validators';
import { Validation } from '@/presentation/protocols';
import { makeSignUpValidation } from '@/main/factories/controllers';
import { EmailValidation } from '@/validation/validators/email-validation';
import { EmailValidatorAdapter } from '@/infra/validators';

jest.mock('@/validation/validators/validation-composite');

describe('SignUpValidation Factory', () => {
  it('Should call ValidationComposite with all validations', () => {
    makeSignUpValidation();
    const validations: Validation[] = [];
    for (const field of [
      'username',
      'email',
      'password',
      'passwordConfirmation',
    ]) {
      validations.push(new RequiredFieldValidation(field));
    }
    validations.push(
      new CompareFieldsValidation('password', 'passwordConfirmation'),
    );
    validations.push(new EmailValidation('email', new EmailValidatorAdapter()));
    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
