import { DbAddAccount } from '@/data/usecases';
import { HasherSpy, AddAccountRepositorySpy } from '@/tests/data/mocks';
import { throwError, mockAddAccountParams } from '@/tests/domain/mocks';

type SutTypes = {
  sut: DbAddAccount;
  hasherSpy: HasherSpy;
  addAccountRepositorySpy: AddAccountRepositorySpy;
};

const makeSut = (): SutTypes => {
  const hasherSpy = new HasherSpy();
  const addAccountRepositorySpy = new AddAccountRepositorySpy();
  const sut = new DbAddAccount(hasherSpy, addAccountRepositorySpy);
  return { sut, hasherSpy, addAccountRepositorySpy };
};

describe('DbAddAccount Usecase', () => {
  it('Should call Hasher with correct plaintext', async () => {
    const { sut, hasherSpy } = makeSut();
    const addAccountParams = mockAddAccountParams();
    await sut.add(addAccountParams);
    expect(hasherSpy.plaintext).toBe(addAccountParams.password);
  });

  it('Should throw if Hasher throws', async () => {
    const { sut, hasherSpy } = makeSut();
    const addAccountParams = mockAddAccountParams();
    jest.spyOn(hasherSpy, 'hash').mockImplementationOnce(throwError);
    const promise = sut.add(addAccountParams);
    await expect(promise).rejects.toThrow();
  });

  it('Should return true on success', async () => {
    const { sut } = makeSut();
    const addAccountParams = mockAddAccountParams();
    const response = await sut.add(addAccountParams);
    expect(response).toBe(true);
  });

  it('Should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositorySpy, hasherSpy } = makeSut();
    const addAccountParams = mockAddAccountParams();
    await sut.add(addAccountParams);
    expect(addAccountRepositorySpy.params).toEqual({
      username: addAccountParams.username,
      email: addAccountParams.email,
      password: hasherSpy.digest,
    });
  });

  it('Should throw if AddAccountRepository throws', async () => {
    const { sut, addAccountRepositorySpy } = makeSut();
    const addAccountParams = mockAddAccountParams();
    jest
      .spyOn(addAccountRepositorySpy, 'add')
      .mockImplementationOnce(throwError);
    const promise = sut.add(addAccountParams);
    await expect(promise).rejects.toThrow();
  });
});
