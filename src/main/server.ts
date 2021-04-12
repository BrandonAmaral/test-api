import 'module-alias/register';
import chalk from 'chalk';

import { MongoHelper } from '@/infra/db';
import env from '@/main/config/env';

MongoHelper.connect(env.mongoURL)
  .then(async () => {
    const app = (await import('./config/app')).default;
    app.listen(env.port, () =>
      console.log(chalk.green(`Server running on port ${env.port}`)),
    );
  })
  .catch((err) => console.log(chalk.red(`ERROR: ${err}`)));
