import { Environment } from '../app/util/types';
import { envDefaults } from './environment.defaults';

export const envOverwrites: Environment = {
  envid: 'ueosbxfbjf',
  oktaBstarClient: 'BstarOktaEMEAPreview',
  backend: {
    categories: {
      api: {
        grsgql: {
          esIndex: "gsra_ueosbxbxo"
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
  "aws_cognito_identity_pool_id": "us-east-1:5b552957-1473-4706-86b3-94b043352a85",
  "aws_cognito_region": "us-east-1",
  "aws_user_pools_id": "us-east-1_i6IBDutIm",
  "aws_user_pools_web_client_id": "21n2lutbceld6sd3nv5ln2avog",
  "oauth": {
      "domain": "grs-ueosbxco.auth.us-east-1.amazoncognito.com",
      "scope": [
          "phone",
          "email",
          "openid",
          "profile",
          "aws.cognito.signin.user.admin"
      ],
      "redirectSignIn": "http://localhost:4200/",
      "redirectSignOut": "http://localhost:4200/",
      "responseType": "code"
  },
  "federationTarget": "COGNITO_USER_POOLS",
  "aws_appsync_graphqlEndpoint": "https://aitmwmwu3e.execute-api.us-east-1.amazonaws.com/api/grs/graphql",
  "aws_appsync_region": "us-east-1",
  "aws_appsync_authenticationType": "AMAZON_COGNITO_USER_POOLS",
  "aws_cloud_logic_custom": [
      {
          "name": "gsrarest",
          "endpoint": "https://aitmwmwu3e.execute-api.us-east-1.amazonaws.com/api/grs/rest",
          "region": "us-east-1"
      }
  ]
};

export default awsmobile;

import 'zone.js/dist/zone-error';
