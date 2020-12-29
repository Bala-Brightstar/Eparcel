import { Environment } from '../app/util/types';
import { envDefaults } from './environment.defaults';

export const env: Environment = {
  ...envDefaults
};

const awsmobile = {
};

export default awsmobile;

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
