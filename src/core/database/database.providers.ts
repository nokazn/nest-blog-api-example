import { Provider } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';

import { SEQUELIZE, DEVELOPMENT, TEST, PRODUCTION } from '../constants';
import { IDatabaseConfigAttributes } from './interfaces/dbConfig.interface';
import { databaseConfig } from './database.config';

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
      sequelize.addModels(['modules go here.']);
      await sequelize.sync();

      return sequelize;
    },
  },
];
