import { Hasher } from '@/data/protocols';

import faker from 'faker';

export class HasherSpy implements Hasher {
  digest = faker.datatype.uuid();
  plaintext!: string;

  async hash(plaintext: string): Promise<string> {
    this.plaintext = plaintext;
    return this.digest;
  }
}
