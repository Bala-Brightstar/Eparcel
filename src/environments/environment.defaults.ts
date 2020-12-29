import { Environment } from '../app/util/types';

export const envDefaults: Environment = {
  production: false,
  buildid: '##BUILD_BUILDID',
  envid: 'unknown',
  oktaBstarClient: 'BstarOktaEMEAPreview',
  frontend: {
    i18n: {
      timezoneDefault: 'America/New_York',
      localeIDDefault: 'en-us',
      localesSupported: [
          { id: 'en-us', displayName: 'English/United States'}, 
          { id: 'en-au', displayName: 'English/Australia'}, 
          { id: 'de-de', displayName: 'German/Germany'}
      ]
    },
    placeholderImage: 'assets/placeholders/phone.svg'
  },
  backend : {
    categories: {
      api: {
        grsgql: {
          esIndex: "unknown"
        }
      },
      storage: {
        inspectionimages: {
          region: 'unknown',
          bucket: 'unknown',
          listObjectsV2MaxKeys: 50,
          signedUrlPromiseExpiry: 60          
        }
      }
    }
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
