import { Environment } from '../app/util/types';
import { envDefaults } from './environment.defaults';

export const envOverwrites: Environment = {
  envid: 'ueosbxfgo',
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
  "aws_cognito_identity_pool_id": "us-east-1:cd717816-02de-4f86-9726-e68090830830",
  "aws_cognito_region": "us-east-1",
  "aws_user_pools_id": "us-east-1_rFxFGtX2U",
  "aws_user_pools_web_client_id": "56bh2d719acru66233ni4r84sg",
  "oauth": {
      "domain": "grs-ueosbxco.auth.us-east-1.amazoncognito.com",
      "scope": [
          "phone",
          "email",
          "openid",
          "profile",
          "aws.cognito.signin.user.admin"
      ],
      "redirectSignIn": "https://sbx-grs.brightstar.com/",
      "redirectSignOut": "https://sbx-grs.brightstar.com/",
      "responseType": "code"
  },
  "federationTarget": "COGNITO_USER_POOLS",
  "aws_appsync_graphqlEndpoint": "https://yqp6ajizgrbwzfx6olwf3f27gi.appsync-api.us-east-1.amazonaws.com/graphql",
  "aws_appsync_region": "us-east-1",
  "aws_appsync_authenticationType": "AMAZON_COGNITO_USER_POOLS",
  "aws_cloud_logic_custom": [
      {
          "name": "grsrest",
          "endpoint": "https://sbx-grs.brightstar.com/api/rest",
          "region": "us-east-1"
      }
  ]
};

export default awsmobile;

import 'zone.js/dist/zone-error';
