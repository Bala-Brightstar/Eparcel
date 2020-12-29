import { Environment } from '../app/util/types';
import { envDefaults } from './environment.defaults';

export const envOverwrites: Environment = {
  envid: 'usesosbxo',
  backend: {
    categories: {
      api: {
        grsgql: {
          esIndex: "grs_usesosbxo"
        }
      },
      storage: {
        inspectionimages: {
          region: 'us-east-1',
          bucket: 'temp-gsra-usesosbxo-113446-inspectionimages'
        }
      }
    }
  }
};

export const env: Environment = {
  ...envDefaults,
  ...envOverwrites
};
