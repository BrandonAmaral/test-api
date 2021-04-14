import { SignInController } from '@/presentation/controllers';
import { ValidationSpy, AuthenticationSpy } from '@/tests/presentation/mocks';
import { MissingParamError } from '@/presentation/errors';
import {
  badRequest,
  serverError,
  unauthorized,
  ok,
} from '@/presentation/helpers';
import { throwError } from '@/tests/domain/mocks';

import faker from 'faker';

const mockRequest = (): SignInController.Request => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
});

type SutTypes = {
  sut: SignInController;
  validationSpy: ValidationSpy;
  authenticationSpy: AuthenticationSpy;
};

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy();
  const authenticationSpy = new AuthenticationSpy();
  const sut = new SignInController(validationSpy, authenticationSpy);
  return { sut, validationSpy, authenticationSpy };
};

describe('SignIn Controller', () => {
  it('Should return 200 if valid credentials are provided', async () => {
    const { sut, authenticationSpy } = makeSut();
    const request = mockRequest();
    const response = await sut.handle(request);
    expect(response).toEqual(ok(authenticationSpy.result));
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

  it('Should call Authentication with correct values', async () => {
    const { sut, authenticationSpy } = makeSut();
    const request = mockRequest();
    await sut.handle(request);
    expect(authenticationSpy.params).toEqual({
      email: request.email,
      password: request.password,
    });
  });

  it('Should return 500 if Authentication throws', async () => {
    const { sut, authenticationSpy } = makeSut();
    jest.spyOn(authenticationSpy, 'auth').mockImplementationOnce(throwError);
    const request = mockRequest();
    const response = await sut.handle(request);
    expect(response).toEqual(serverError(new Error()));
  });

  it('Should return 401 if invalid credentials are provided', async () => {
    const { sut, authenticationSpy } = makeSut();
    authenticationSpy.result = null!;
    const request = mockRequest();
    const response = await sut.handle(request);
    expect(response).toEqual(unauthorized());
  });
});
