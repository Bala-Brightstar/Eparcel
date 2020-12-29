import { Environment } from '../app/util/types';
import { envDefaults } from './environment.defaults';

export const envOverwrites: Environment = {
  envid: 'ueodevfgo',
  oktaBstarClient: 'BstarOktaEMEAPreview',
  backend: {
    categories: {
      api: {
        grsgql: {
          esIndex: "gsra_ueodevfbo"
        }
      },
      storage: {
        inspectionimages: {
          region: 'us-east-1',
          bucket: 'temp-gsra-ueosbxbxo-113446-inspectionimages'
        }
      }
    }
  }
}

export const env: Environment = {
  ...envDefaults,
  ...envOverwrites
};

const awsmobile = {
  "aws_project_region": "us-east-1",
  "aws_cognito_identity_pool_id": "us-east-1:0fdedd8a-efb3-40b4-a15d-aae8109b8149",
  "aws_cognito_region": "us-east-1",
  "aws_user_pools_id": "us-east-1_iW7pnZZP4",
  "aws_user_pools_web_client_id": "1ln5r5uubmc8si3fflv3lbn9j8",
  "oauth": {
      "domain": "grs-ueodevco.auth.us-east-1.amazoncognito.com",
      "scope": [
          "phone",
          "email",
          "openid",
          "profile",
          "aws.cognito.signin.user.admin"
      ],
      "redirectSignIn": "https://dev-grs.brightstar.com/",
      "redirectSignOut": "https://dev-grs.brightstar.com/",
      "responseType": "code"
  },
  "federationTarget": "COGNITO_USER_POOLS",
  "aws_appsync_graphqlEndpoint": "https://kkbuxvf7rrcovkq3zbab3tzkr4.appsync-api.us-east-1.amazonaws.com/graphql",
  "aws_appsync_region": "us-east-1",
  "aws_appsync_authenticationType": "AMAZON_COGNITO_USER_POOLS",
  "aws_cloud_logic_custom": [
      {
          "name": "grsrest",
          "endpoint": "https://dev-grs.brightstar.com/api/rest",
          "region": "us-east-1"
      }
  ]
};
export default awsmobile;

import 'zone.js/dist/zone-error';
