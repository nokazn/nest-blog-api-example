import { Provider } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';

import { IDatabaseConfigAttributes } from './interfaces/dbConfig.interface';
import { databaseConfig } from './database.config';
import { User } from 'src/modules/users/user.entity';
import { SEQUELIZE, DEVELOPMENT, TEST, PRODUCTION } from '../constants';

export const databaseProviders: Provider[] = [
  {
    provide: SEQUELIZE,
    useFactory: async (): Promise<Sequelize> => {
      let config: IDatabaseConfigAttributes;
      switch (process.env.NODE_ENV) {
        case DEVELOPMENT:
          config = databaseConfig.development;
        case TEST:
          config = databaseConfig.test;
        case PRODUCTION:
          config = databaseConfig.production;
        default:
          config = databaseConfig.development;
      }

      const sequelize = new Sequelize(config);
      sequelize.addModels([User]);
      await sequelize.sync();

      return sequelize;
    },
  },
];
