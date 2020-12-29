import { Environment } from '../app/util/types';
import { envDefaults } from './environment.defaults';

export const envOverwrites: Environment = {
  production: true,
  envid: 'usesoprdo',
  backend: {
    categories: {
      api: {
        grsgql: {
          esIndex: "unknown"
        }
      },
      storage: {
        inspectionimages: {
          region: 'us-east-1',
          bucket: 'unknown',
        }
      }
    }
  }
};

export const env: Environment = {
  ...envDefaults,
  ...envOverwrites
};
