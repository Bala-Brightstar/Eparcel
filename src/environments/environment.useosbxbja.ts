import { Environment } from '../app/util/types';
import { envDefaults } from './environment.defaults';

export const envOverwrites: Environment = {
  envid: 'useosbxbja',
  backend: {
    categories: {
      api: {
        grsgql: {
          esIndex: "grs_useosbxxja"
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

// https://tcoaap56nc.execute-api.us-east-1.amazonaws.com/dev/graphql
// https://2tap7ofn4be7bl57pqknaiejuy.appsync-api.us-east-1.amazonaws.com/graphql

const awsmobile = {
  "aws_project_region": "us-east-1",
  "aws_cognito_identity_pool_id": "us-east-1:17bd9f57-8b7f-4767-ac34-96db49c84c55",
  "aws_cognito_region": "us-east-1",
  "aws_user_pools_id": "us-east-1_bckN5qDRF",
  "aws_user_pools_web_client_id": "2u5566ceje0frveo85apfis3a",
  "oauth": {
      "domain": "gsraf484a4c8-f484a4c8-useosbxbja.auth.us-east-1.amazoncognito.com",
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
  "aws_appsync_graphqlEndpoint": "https://b7otjycigi.execute-api.us-east-1.amazonaws.com/api/grs/graphql",
  "aws_appsync_region": "us-east-1",
  "aws_appsync_authenticationType": "AMAZON_COGNITO_USER_POOLS",
  "aws_cloud_logic_custom": [
      {
          "name": "grsrest",
          "endpoint": "https://b7otjycigi.execute-api.us-east-1.amazonaws.com/api/grs/rest",
          "region": "us-east-1"
      }
  ],
  "aws_content_delivery_bucket": "gsra-20200812114335-hostingbucket-useosbxbjf",
  "aws_content_delivery_bucket_region": "us-east-1",
  "aws_content_delivery_url": "https://d2wrbnqza9zvwm.cloudfront.net"
};

export default awsmobile;

import 'zone.js/dist/zone-error';