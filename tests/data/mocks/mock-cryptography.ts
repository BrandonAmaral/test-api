import { Encrypter, Hasher, HasherComparer } from '@/data/protocols';

import faker from 'faker';

export class HasherSpy implements Hasher {
  digest = faker.datatype.uuid();
  plaintext: string | undefined;

  async hash(plaintext: string): Promise<string> {
    this.plaintext = plaintext;
    return this.digest;
  }
}

export class HasherComparerSpy implements HasherComparer {
  plaintext: string | undefined;
  digest: string | undefined;
  isValid = true;

  async compare(plaintext: string, digest: string): Promise<boolean> {
    this.plaintext = plaintext;
    this.digest = digest;
    return this.isValid;
  }
}

export class EncrypterSpy implements Encrypter {
  plaintext: string | undefined;
  ciphertext = faker.datatype.uuid();

  async encrypt(plaintext: string): Promise<string> {
    this.plaintext = plaintext;
    return this.ciphertext;
  }
}
