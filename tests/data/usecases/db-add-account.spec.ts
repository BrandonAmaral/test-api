import { DbAddAccount } from '@/data/usecases';
import { HasherSpy } from '@/tests/data/mocks';
import { throwError, mockAddAccountParams } from '@/tests/domain/mocks';

type SutTypes = {
  sut: DbAddAccount;
  hasherSpy: HasherSpy;
};

const makeSut = (): SutTypes => {
  const hasherSpy = new HasherSpy();
  const sut = new DbAddAccount(hasherSpy);
  return { sut, hasherSpy };
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
});
