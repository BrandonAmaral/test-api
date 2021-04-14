import { SignInController } from '@/presentation/controllers';
import { Controller } from '@/presentation/protocols';
import { makeSignInValidation, makeDbAuthentication } from '@/main/factories';

export const makeSignInController = (): Controller => {
  return new SignInController(makeSignInValidation(), makeDbAuthentication());
};
