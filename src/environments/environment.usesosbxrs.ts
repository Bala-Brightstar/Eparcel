import { Environment } from '../app/util/types';
import { envDefaults } from './environment.defaults';

export const envOverwrites: Environment = {
  envid: 'usesosbxrs',
  backend: {
    categories: {
      api: {
        grsgql: {
          esIndex: "grs_usesosbxrs"
        }
      },
      storage: {
        inspectionimages: {
          region: 'us-east-1',
          bucket: 'temp-gsra-usesosbxjf-113446-inspectionimages'
        }
      }
    }
  }
}

export const env: Environment = {
  ...envDefaults,
  ...envOverwrites
};

import 'zone.js/dist/zone-error';