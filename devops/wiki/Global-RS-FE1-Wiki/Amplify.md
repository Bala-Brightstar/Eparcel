# Amplify

## Update Amplify CLI to lastest version
`npm i -g @aws-amplify/cli`

## amplify publish / ng build customization
Please note that `amplify publish` calls the _BuildCommand_ as found in `amplify/.config/project-config.json`. The _BuildCommand_ is `npm run-script build` which then executes the _build_ script as specified in package.json.

The usual _build_ script is `ng build`; however, we want to have an option to pass the ng build configuration id as a parameter. It is assumed that the amplify environment id and ng build configuration ids use same ids. Therefore, instead of executing `ng build` we execute `node ng-build.js` which reads `amplify/.config/local-env-info.json`. 
The current amplify environment id (field _envName_) is then passed as a parameter to ng build command line `ng build --configuration={envid}`.
