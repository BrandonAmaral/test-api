import { SignUpController } from '@/presentation/controllers';

type SutTypes = {
  sut: SignUpController;
};

const makeSut = (): SutTypes => {
  const sut = new SignUpController();
  return { sut };
};

describe('SignUp Controller', () => {
  it('Should return 200 if valid data is provided', async () => {
    const { sut } = makeSut();
    const response = await sut.handle('any_data');
    expect(response).toHaveBeenCalledWith(200);
  });
});
