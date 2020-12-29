const exec = require('child_process').exec;
const fs = require('fs');

const amplify_envinfo_rawdata = fs.readFileSync('amplify/.config/local-env-info.json');
const amplify_envinfo = JSON.parse(amplify_envinfo_rawdata);

const envid = amplify_envinfo.envName;
console.log("ng build configuration id:", envid)

const ngbuildcmd = "ng build --configuration=" + envid;
var child_process = exec(ngbuildcmd); 
child_process.stdout.pipe(process.stdout);
