import {
  RequiredFieldValidation,
  ValidationComposite,
} from '@/validation/validators';
import { Validation } from '@/presentation/protocols';
import { makeSignUpValidation } from '@/main/factories/controllers';

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
    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
