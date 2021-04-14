import { DbAuthentication } from '@/data/usecases';
import {
  LoadAccountByEmailRepositorySpy,
  HasherComparerSpy,
  EncrypterSpy,
  UpdateTokenRepositorySpy,
} from '@/tests/data/mocks';
import { mockAuthenticationParams, throwError } from '@/tests/domain/mocks';

type SutTypes = {
  sut: DbAuthentication;
  loadAccountByEmailRepositorySpy: LoadAccountByEmailRepositorySpy;
  hasherComparerSpy: HasherComparerSpy;
  encrypterSpy: EncrypterSpy;
  updateTokenRepositorySpy: UpdateTokenRepositorySpy;
};

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositorySpy = new LoadAccountByEmailRepositorySpy();
  const hasherComparerSpy = new HasherComparerSpy();
  const encrypterSpy = new EncrypterSpy();
  const updateTokenRepositorySpy = new UpdateTokenRepositorySpy();
  const sut = new DbAuthentication(
    loadAccountByEmailRepositorySpy,
    hasherComparerSpy,
    encrypterSpy,
    updateTokenRepositorySpy,
  );
  return {
    sut,
    loadAccountByEmailRepositorySpy,
    hasherComparerSpy,
    encrypterSpy,
    updateTokenRepositorySpy,
  };
};

describe('DbAuthentication Usecase', () => {
  it('Should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositorySpy } = makeSut();
    const request = mockAuthenticationParams();
    await sut.auth(request);
    expect(loadAccountByEmailRepositorySpy.email).toBe(request.email);
  });

  it('Should throw if LoadAccountByEmailRepository throws', async () => {
    const { sut, loadAccountByEmailRepositorySpy } = makeSut();
    jest
      .spyOn(loadAccountByEmailRepositorySpy, 'loadByEmail')
      .mockImplementationOnce(throwError);
    const request = mockAuthenticationParams();
    const promise = sut.auth(request);
    await expect(promise).rejects.toThrow();
  });

  it('Should return null if LoadAccountByEmailRepository returns null', async () => {
    const { sut, loadAccountByEmailRepositorySpy } = makeSut();
    loadAccountByEmailRepositorySpy.result = null!;
    const request = mockAuthenticationParams();
    const response = await sut.auth(request);
    expect(response).toBeNull();
  });

  it('Should return null if LoadAccountByEmailRepository returns null', async () => {
    const { sut, loadAccountByEmailRepositorySpy } = makeSut();
    loadAccountByEmailRepositorySpy.result = null!;
    const request = mockAuthenticationParams();
    const response = await sut.auth(request);
    expect(response).toBeNull();
  });

  it('Should call HasherComparer with correct password', async () => {
    const {
      sut,
      hasherComparerSpy,
      loadAccountByEmailRepositorySpy,
    } = makeSut();
    const request = mockAuthenticationParams();
    await sut.auth(request);
    expect(hasherComparerSpy.plaintext).toBe(request.password);
    expect(hasherComparerSpy.digest).toBe(
      loadAccountByEmailRepositorySpy.result.password,
    );
  });

  it('Should throw if HasherComparer throws', async () => {
    const { sut, hasherComparerSpy } = makeSut();
    jest.spyOn(hasherComparerSpy, 'compare').mockImplementationOnce(throwError);
    const request = mockAuthenticationParams();
    const promise = sut.auth(request);
    await expect(promise).rejects.toThrow();
  });

  it('Should return null if HasherComparer returns false', async () => {
    const { sut, hasherComparerSpy } = makeSut();
    hasherComparerSpy.isValid = false;
    const request = mockAuthenticationParams();
    const response = await sut.auth(request);
    expect(response).toBeNull();
  });

  it('Should call Encrypter with correct plaintext', async () => {
    const { sut, encrypterSpy, loadAccountByEmailRepositorySpy } = makeSut();
    const request = mockAuthenticationParams();
    await sut.auth(request);
    expect(encrypterSpy.plaintext).toBe(
      loadAccountByEmailRepositorySpy.result.id,
    );
  });

  it('Should throw if Encrypter throws', async () => {
    const { sut, encrypterSpy } = makeSut();
    jest.spyOn(encrypterSpy, 'encrypt').mockImplementationOnce(throwError);
    const request = mockAuthenticationParams();
    const promise = sut.auth(request);
    await expect(promise).rejects.toThrow();
  });

  it('Should return data on success', async () => {
    const { sut, encrypterSpy, loadAccountByEmailRepositorySpy } = makeSut();
    const request = mockAuthenticationParams();
    const { token, username } = await sut.auth(request);
    expect(token).toBe(encrypterSpy.ciphertext);
    expect(username).toBe(loadAccountByEmailRepositorySpy.result.username);
  });

  it('Should call UpdateTokenRepository with correct values', async () => {
    const {
      sut,
      updateTokenRepositorySpy,
      loadAccountByEmailRepositorySpy,
      encrypterSpy,
    } = makeSut();
    const request = mockAuthenticationParams();
    await sut.auth(request);
    expect(updateTokenRepositorySpy.id).toBe(
      loadAccountByEmailRepositorySpy.result.id,
    );
    expect(updateTokenRepositorySpy.token).toBe(encrypterSpy.ciphertext);
  });

  it('Should throw if UpdateTokenRepository throws', async () => {
    const { sut, updateTokenRepositorySpy } = makeSut();
    jest
      .spyOn(updateTokenRepositorySpy, 'updateToken')
      .mockImplementationOnce(throwError);
    const request = mockAuthenticationParams();
    const promise = sut.auth(request);
    await expect(promise).rejects.toThrow();
  });
});
