import { SignUpController } from '@/presentation/controllers';
import { ValidationSpy, AddAccountSpy } from '@/tests/presentation/mocks';
import { MissingParamError, ServerError } from '@/presentation/errors';
import { badRequest, serverError } from '@/presentation/helpers';
import { throwError } from '@/tests/domain/mocks';

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
  addAccountSpy: AddAccountSpy;
};

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy();
  const addAccountSpy = new AddAccountSpy();
  const sut = new SignUpController(validationSpy, addAccountSpy);
  return { sut, validationSpy, addAccountSpy };
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

  it('Should call AddAccount with correct values', async () => {
    const { sut, addAccountSpy } = makeSut();
    const request = mockRequest();
    await sut.handle(request);
    expect(addAccountSpy.params).toEqual({
      username: request.username,
      email: request.email,
      password: request.password,
    });
  });

  it('Should return 500 if AddAccount throws', async () => {
    const { sut, addAccountSpy } = makeSut();
    jest.spyOn(addAccountSpy, 'add').mockImplementationOnce(throwError);
    const request = mockRequest();
    const response = await sut.handle(request);
    expect(response).toEqual(serverError(new ServerError(null!)));
  });
});
