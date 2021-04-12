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
  it('Should call hasher with correct plaintext', async () => {
    const { sut, hasherSpy } = makeSut();
    const addAccountParams = mockAddAccountParams();
    await sut.add(addAccountParams);
    expect(hasherSpy.plaintext).toBe(addAccountParams.password);
  });
});
