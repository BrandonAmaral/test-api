import { MissingParamError } from '@/presentation/errors';
import { RequiredFieldValidation } from '@/validation/validators';

import faker from 'faker';

const field = faker.random.word();

const makeSut = (): RequiredFieldValidation => {
  return new RequiredFieldValidation(field);
};

describe('RequiredField Validation', () => {
  it('Should return a MissingParamError if validation fails', () => {
    const sut = makeSut();
    const error = sut.validate({ invalid: faker.random.word() });
    expect(error).toEqual(new MissingParamError(field));
  });

  it('Should not return if validation succeeds', () => {
    const sut = makeSut();
    const error = sut.validate({ [field]: faker.random.word() });
    expect(error).toBeFalsy();
  });
});
