import { SignUpController } from '@/presentation/controllers';
import { ValidationSpy } from '@/tests/presentation/mocks';
import { MissingParamError } from '@/presentation/errors';
import { badRequest } from '@/presentation/helpers';

import faker from 'faker';

const mockRequest = (): SignUpController.Request => {
  const password = faker.internet.password();
  return {
    username: faker.name.findName(),
    email: faker.internet.email(),
    password,
    passwordConfirmation: password,
  };
};

type SutTypes = {
  sut: SignUpController;
  validationSpy: ValidationSpy;
};

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy();
  const sut = new SignUpController(validationSpy);
  return { sut, validationSpy };
};

describe('SignUp Controller', () => {
  it('Should return 200 if valid data is provided', async () => {
    const { sut } = makeSut();
    const request = mockRequest();
    const response = await sut.handle(request);
    expect(response.statusCode).toBe(200);
  });

  it('Should call Validation with correct value', async () => {
    const { sut, validationSpy } = makeSut();
    const request = mockRequest();
    await sut.handle(request);
    expect(validationSpy.input).toEqual(request);
  });

  it('Should return 400 if Validation returns an error', async () => {
    const { sut, validationSpy } = makeSut();
    validationSpy.error = new MissingParamError(faker.random.word());
    const request = mockRequest();
    const response = await sut.handle(request);
    expect(response).toEqual(badRequest(validationSpy.error));
  });
});
