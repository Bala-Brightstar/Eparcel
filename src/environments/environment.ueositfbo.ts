import { Environment } from '../app/util/types';
import { envDefaults } from './environment.defaults';

export const envOverwrites: Environment = {
  envid: 'ueositfbo',
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
  "aws_cognito_identity_pool_id": "us-east-1:7302f799-e1a1-41a7-b1bf-a35c262cc366",
  "aws_cognito_region": "us-east-1",
  "aws_user_pools_id": "us-east-1_Jdf6CXO4b",
  "aws_user_pools_web_client_id": "2av8df2pdmkvbkko15ku1vgajd",
  "oauth": {
      "domain": "grs-ueositco.auth.us-east-1.amazoncognito.com",
      "scope": [
          "phone",
          "email",
          "openid",
          "profile",
          "aws.cognito.signin.user.admin"
      ],
      "redirectSignIn": "https://sit-grs.brightstar.com/",
      "redirectSignOut": "https://sit-grs.brightstar.com/",
      "responseType": "code"
  },
  "federationTarget": "COGNITO_USER_POOLS",
  "aws_appsync_graphqlEndpoint": "https://tqgg3iqe4rcavjpuwedysdtvo4.appsync-api.us-east-1.amazonaws.com/graphql",
  "aws_appsync_region": "us-east-1",
  "aws_appsync_authenticationType": "AMAZON_COGNITO_USER_POOLS",
  "aws_cloud_logic_custom": [
      {
          "name": "grsrest",
          "endpoint": "https://sit-grs.brightstar.com/api/rest",
          "region": "us-east-1"
      }
  ]
};
export default awsmobile;

import 'zone.js/dist/zone-error';
