#!/bin/bash

NVMVERSION=0.35.3
NODEJSVERSION=10.22.1
ANGULARVERSION=8.3.29

echo "Current directory: ${PWD}"
echo "Home directory: ${HOME}"

if [ ! -f $HOME/.nvm/nvm.sh ]
then
   echo "NVM: Node Version Manager not found."
   echo "NVM: Node Version Manager installing: ${NVMVERSION}"
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v${NVMVERSION}/install.sh | bash
   echo "NVM: Node Version Manager installed."
fi

. $HOME/.nvm/nvm.sh

NVMCURRENTVERSION=`nvm --version`
echo "NVM: Node Version Manager version installed: ${NVMCURRENTVERSION}"
echo "NVM: Node Version Manager version expected: ${NVMVERSION}"

if [ ! "${NVMCURRENTVERSION}" = "${NVMVERSION}" ]
then
    echo "NVM: Node Version Manager updating: ${NVMVERSION}"
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v${NVMVERSION}/install.sh | bash
    . $HOME/.nvm/nvm.sh
    echo "NVM: Node Version Manager updated."
    echo "NVM: Node Version Manager version installed: ${NVMCURRENTVERSION}"
fi

echo "NodeJS: install/update node version: ${NODEJSVERSION}"
nvm install $NODEJSVERSION
nvm use $NODEJSVERSION
NODEJSCURRENTVERSION=`node --version`
echo "NodeJS: node version installed: ${NODEJSCURRENTVERSION}"
nvm list

ENVID=$1
if [ -z "$1" ]
then
  echo "Environment id missing."
  exit 101
fi
echo "Enviroment id: ${ENVID}"

AWSPROFILEID=$2
if [ -z "$2" ]
then
  echo "AWS profile id missing."
  exit 102
fi
echo "AWS profile id: ${AWSPROFILEID}"

WEBAPPS3BUCKETNAME=$3
if [ -z "$3" ]
then
  echo "WebApp S3 bucket name is missing."
  exit 103
fi
echo "WebApp S3 bucket name: ${WEBAPPS3BUCKETNAME}"

WEBAPPNAME=$4
if [ -z "$4" ]
then
  echo "WebApp name is missing."
  exit 104
fi
echo "WebApp name: ${WEBAPPNAME}"

CFDISTRIBUTIONID=$5
if [ -z "$5" ]
then
  echo "CloudFront distribution id is missing."
  exit 105
fi
echo "CloudFront distribution id: ${CFDISTRIBUTIONID}"

echo "Angular CLI version installed: "
npm -g list @angular/cli

echo "Angular CLI version expected: ${ANGULARVERSION}"
npm -g list @angular/cli@$ANGULARVERSION || npm install -g @angular/cli@$ANGULARVERSION

echo "npm install"
npm install 

echo "Replace ##BUILD_BUILDID with ${BUILD_BUILDID} in src/environments/environment.defaults.ts"
sed -i s/##BUILD_BUILDID/${BUILD_BUILDID}/g src/environments/environment.defaults.ts
SED1EC=$?
if [ "$SED1EC" -ne "0" ]
then
  exit $SED1EC
fi

echo "ng build"
set -x
ng build --outputHashing=all --configuration=${ENVID}
set +x

if [ ! -d dist/${WEBAPPNAME} ]
then
  echo "WebApp directory missing: dist/${WEBAPPNAME}"
  exit 105
fi

echo "Start compression ..."
webappfiles=($(find ./dist/${WEBAPPNAME} -type f ))
for webappfile in "${webappfiles[@]}"; do
  gzip -v9f ${webappfile}
  mv -v ${webappfile}.gz ${webappfile}
done
echo "Compression completed."

if [[ "$ENVID" =~ ^.*fb.$ ]]
then
  S3WEBAPPPATH="/webapp/blue"
elif [[ "$ENVID" =~ ^.*fg.$ ]]
then
  S3WEBAPPPATH="/webapp/green"
else
  echo "Cannot determine S3WEBAPPPATH."
  exit 201
fi

echo -e "Sync WebApp to S3 Bucket: $WEBAPPS3BUCKETNAME"
set -x
aws s3 sync ./dist/${WEBAPPNAME} s3://${WEBAPPS3BUCKETNAME}${S3WEBAPPPATH} --delete --exclude index.html --metadata-directive REPLACE --content-encoding gzip --cache-control "public, max-age=31536000, immutable" --metadata '{"Content-Encoding":"gzip","Cache-Control":"public, max-age=31536000, immutable"}'
S3CMD1EXITCODE=$?
set +x
echo "AWS S3 CLI command exit code: ${S3CMD1EXITCODE}"

if [ "$S3CMD1EXITCODE" -ne "0" ]
then
  exit $S3CMD1EXITCODE
fi

echo -e "Copy index.html to S3 Bucket: $WEBAPPS3BUCKETNAME"
set -x
aws s3 cp ./dist/${WEBAPPNAME}/index.html s3://${WEBAPPS3BUCKETNAME}${S3WEBAPPPATH}/index.html --metadata-directive REPLACE --content-encoding gzip --cache-control "no-cache" --metadata '{"Content-Encoding":"gzip","Cache-Control":"no-cache"}'
S3CMD2EXITCODE=$?
set +x
echo "AWS S3 CLI command exit code: ${S3CMD2EXITCODE}"

if [ "$S3CMD2EXITCODE" -ne "0" ]
then
  exit $S3CMD2EXITCODE
fi

echo -e "Create CloudFront cache invalidation event ${CFDISTRIBUTIONID}"
aws cloudfront create-invalidation \
    --distribution-id ${CFDISTRIBUTIONID} \
    --paths "/*"
CFCMD1EXITCODE=$?

if [ "$CFCMD1EXITCODE" -ne "0" ]
then
  exit $CFCMD1EXITCODE
fi

exit 0
