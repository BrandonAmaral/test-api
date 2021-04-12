import { Controller } from '@/presentation/protocols';
import { SignUpController } from '@/presentation/controllers';
import { makeDbAddAccount } from '@/main/factories/usecases';
import { makeSignUpValidation } from '@/main/factories/controllers';

export const makeSignUpController = (): Controller => {
  return new SignUpController(makeSignUpValidation(), makeDbAddAccount());
};
