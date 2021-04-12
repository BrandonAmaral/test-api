import { SignUpController } from '@/presentation/controllers';

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
};

const makeSut = (): SutTypes => {
  const sut = new SignUpController();
  return { sut };
};

describe('SignUp Controller', () => {
  it('Should return 200 if valid data is provided', async () => {
    const { sut } = makeSut();
    const request = mockRequest();
    const response = await sut.handle(request);
    expect(response.statusCode).toBe(200);
  });
});
