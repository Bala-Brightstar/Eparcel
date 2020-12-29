# Front-end URLs

| Environment | Primary URLs | Additional URLs | Notes |  
|:----------|:------------|:-----------|:----------|
| SBX - Web App  | https://sbx-grs.brightstar.com          | https://sbx-grs.brightstar.com/?ForceTS=B<br/>https://sbx-grs.brightstar.com/?ForceTS=G<br/>https://dbgpgkdey33x2.cloudfront.net |  |
| SBX - Api Docs | https://sbx-grs.brightstar.com/api/docs | https://sbx-grs.brightstar.com/api/docs?ForceTS=B<br/>https://sbx-grs.brightstar.com/api/docs?ForceTS=G<br/>https://dbgpgkdey33x2.cloudfront.net/api/docs |  |
| DEV - Web App  | https://dev-grs.brightstar.com          | https://dev-grs.brightstar.com/?ForceTS=B<br/>https://dev-grs.brightstar.com/?ForceTS=G<br/>https://d1cbjkub7w219z.cloudfront.net           |  |
| DEV - Api Docs | https://dev-grs.brightstar.com/api/docs | https://dev-grs.brightstar.com/api/docs?ForceTS=B<br/>https://dev-grs.brightstar.com/api/docs?ForceTS=G<br/>https://d1cbjkub7w219z.cloudfront.net/api/docs |  |           |  |
| SIT - Web App  | https://sit-grs.brightstar.com          | https://sit-grs.brightstar.com/?ForceTS=B<br/>https://sit-grs.brightstar.com/?ForceTS=G<br/>https://d1iq1g1yb70qi9.cloudfront.net |  |
| SIT - Api Docs | https://sit-grs.brightstar.com/api/docs | https://sit-grs.brightstar.com/api/docs?ForceTS=B<br/>https://sit-grs.brightstar.com/api/docs?ForceTS=G<br/>https://d1iq1g1yb70qi9.cloudfront.net/api/docs |  |
| UAT - Web App  | TBA          |            |  |
| UAT - Api Docs | TBA          |            |  |
| PRD - Web App  | TBA          |            |  |
| PRD - Api Docs | TBA          |            |  |


# Active Directory Security Groups (used by Okta)
- AWS_Global_GRS_Developers
- AWS_Global_GRS_QA

# Environment IDs

## ueosbxfbo / ueosbxfgo - Sandbox API (Blue / Green)
- use for GRS only
- environment id explained
```
ueo == us-east-1
sbx == sandbox
f   == frontend
b/g == blue/green
o   == one
```

## ueositfbo / ueositfgo - SIT API (Blue / Green)
- use for GRS only
- environment id explained
```
ueo == us-east-1
sit == system integration testing
f   == frontend
b/g == blue/green
o   == one
```

## ueouatfbo / ueouatfgo - UAT API (Blue / Green)
- use for GRS only
- environment id explained
```
ueo == us-east-1
uat == user acceptance testing
f   == frontend
b/g == blue/green
o   == one
```

## ueoprdfbo / ueoprdfgo - PRD API (Blue / Green)
- use for GRS only
- environment id explained
```
ueo == us-east-1
prd == production
f   == frontend
b/g == blue/green
o   == one
```

# Environments for Developers 

## ueosbxfbjf / ueosbxfgjf - Development API (Blue / Green) for JF (Example)
- use for GRS only
- environment id explained
```
ueo == us-east-1
sbx == sandbox
f   == frontend
b/g == blue/green
jf  == developer id
```

## Create a dev environment for a developer (Example)
- amplify init
```
joergfbs@AU-L1179:/mnt/c/aws/Global-RS-FE1$ amplify init
Note: It is recommended to run this command from the root of your app directory
? Do you want to use an existing environment? No
? Enter a name for the environment ueosbxfbjf
Using default provider  awscloudformation

For more information on AWS Profiles, see:
https://docs.aws.amazon.com/cli/latest/userguide/cli-multiple-profiles.html

? Do you want to use an AWS profile? Yes
? Please choose the profile you want to use amplify-jf
Adding backend environment ueosbxfbjf to AWS Amplify Console app: d2tmho0a5n4jtz
```
- update category section for your env in team-provider-info.json
- amplify status
```
joergfbs@AU-L1179:/mnt/c/aws/Global-RS-FE1$ amplify status

Current Environment: ueosbxfbjf

| Category | Resource name   | Operation | Provider plugin   |
| -------- | --------------- | --------- | ----------------- |
| Hosting  | S3AndCloudFront | Create    | awscloudformation |
| Hosting  | webappbucket    | Create    | awscloudformation |
```
- create and configure app environment file src/environments/environment.ueosbxfbjf.ts
  - copy environment.ueosbxfbo.ts to environment.ueosbxfbjf.ts
  - edit environment.ueosbxfbjf.ts
  - update envid with your env id (e.g. ueosbxfbjf)
  - update redirectSignIn to http://localhost:4200/ (do not forgot the forward slash at the end)
  - update redirectSignOut to http://localhost:4200/ (do not forgot the forward slash at the end)
  - if you work only UI, you do not need to change the API URLs
  - if you work UI and API, you do not need to change the API URLs to your dev backend API URLs
    - update aws_appsync_graphqlEndpoint to point to your API backend URL
    - update aws_cloud_logic_custom to point to your API backend URL
- update angular.json
  - copy configuration for ueosbxfbo and rename the copy to your env id
    - at projects.grsfe1.architect.build.configurations
    - at projects.grsfe1.architect.build.configurations
- ng serve --configuration=ueosbxfbjf
- open browser at http://localhost:4200/

Optional Steps:
- amplify push -yes
  - optional
  - only required if you want to publish to S3 and Cloudfront
- amplify publish
  - optional
  - only required if you want to publish to S3 and Cloudfront
  - if you want to test on Cloudfront, make sure to update redirectSignIn and redirectSignOut with the cloudfront distribution URL (do not forgot the forward slash at the end)
