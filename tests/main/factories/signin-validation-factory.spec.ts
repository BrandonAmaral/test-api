import {
  RequiredFieldValidation,
  ValidationComposite,
  EmailValidation,
} from '@/validation/validators';
import { Validation } from '@/presentation/protocols';
import { makeSignInValidation } from '@/main/factories/controllers';
import { EmailValidatorAdapter } from '@/infra/validators';

jest.mock('@/validation/validators/validation-composite');

describe('SignInValidation Factory', () => {
  it('Should call ValidationComposite with all validations', () => {
    makeSignInValidation();
    const validations: Validation[] = [];
    for (const field of ['email', 'password']) {
      validations.push(new RequiredFieldValidation(field));
    }
    validations.push(new EmailValidation('email', new EmailValidatorAdapter()));
    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
