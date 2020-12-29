#!/bin/bash
#!/usr/bin/jq

UserHome=${HOME}
AwsDirectory=$UserHome/.aws
AwsConfigFile=$UserHome/.aws/config
AwsCredentialsFile=$UserHome/.aws/credentials

REGION=$1
[ -z "${REGION}" ] && { echo "Deployment Region is missing."; exit 101; }
echo "Deployment Region: ${REGION}"

echo "Current Working Directory: ${PWD}"
echo "Home directory: ${HOME}"
echo "AWS Directory: $(ls -la ${AwsDirectory})" 
echo "AWS Config File: $(ls -la ${AwsConfigFile})"

DEPLOYMENT_ROLE_ARN=$2
[ -z "${DEPLOYMENT_ROLE_ARN}" ] && { echo "Deployment Role ARN is missing."; exit 102; }
echo "Deployment Role: ${DEPLOYMENT_ROLE_ARN}"

if [ ! -d $AwsDirectory ]
then
   echo "Aws Directory doesn't exist creating new"
   mkdir $AwsDirectory
   echo "New Aws Directory Created: ${AwsDirectory}"
fi

# Info: https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-role.html
echo "[default]"                                 >  $AwsConfigFile
echo "region = ${REGION}"                        >> $AwsConfigFile
echo "output = json"                             >> $AwsConfigFile
echo "role_arn=${DEPLOYMENT_ROLE_ARN}"           >> $AwsConfigFile
echo "role_session_name=${BUILD_DEFINITIONNAME},${BUILD_BUILDNUMBER},${AGENT_NAME}" >> $AwsConfigFile
echo "credential_source=Ec2InstanceMetadata"     >> $AwsConfigFile
chmod 600 $AwsConfigFile

echo "Aws config file re-created: ${AwsConfigFile}"
echo "--- Aws config file content: "
cat ${AwsConfigFile}
echo
echo "---"

echo "Checking AWS CLI identity (sts get-caller-identity):"
aws sts get-caller-identity --profile default

export
exit 0
