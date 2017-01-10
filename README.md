## EventIN - NodeJS - Cloudant - A Mobile Browser application

Download & Install CloudFoundry(CF) Command Line Interface(CLI) tools which provides you a set of commands to manage your apps on Bluemix. 

### Login 

```
cf login -a https://api.ng.bluemix.net -u user_name -o org_name -s space_name
```
**Note:** If you see 'Permission Denied' use sudo. Try avoiding this by setting proper admin permissions
### Clone the repo to your machine
```
git clone https://github.com/VidyasagarMSC/eventin-node-cloudant.git
```

### Cloudant Service on Bluemix
* Create a Cloudant NoSQL DB server on Bluemix via CF cli.
```
cf create-service cloudantNoSQLDB Lite EventIN-cloudantNoSQLDB
```
* Open manifest.yml file and check the name of CloudantNOSQLDB service.

```
applications:
- services:
  - EventIN-cloudantNoSQLDB
  disk_quota: 512M
  host: EventIN
  name: EventIN
  command: node app.js
  path: .
  domain: mybluemix.net
  instances: 1
  memory: 512M
```

* To check whether Cloudant Service is properly binded to our CF application or not, run the below command
```
cf env EventIN
```
Response with VCAP_SERVICES details 
```

System-Provided:
{
 "VCAP_SERVICES": {
  "cloudantNoSQLDB": [
   {
    "credentials": {
     "host": ".cloudant.com",
     "password": "",
     "port": 443,
     "url": "",
     "username": ""
    },
    "label": "cloudantNoSQLDB",
    "name": "EventIN-cloudantNoSQLDB",
    "plan": "Lite",
    "provider": null,
    "syslog_drain_url": null,
    "tags": [
     "data_management",
     "ibm_created",
     "ibm_dedicated_public"
    ]
   }
  ]
 }
}

{
 "VCAP_APPLICATION": {
  "application_id": "5",
  "application_name": "EventIN",
  "application_uris": [
   "EventIN.mybluemix.net"
  ],
  "application_version": "",
  "limits": {
   "disk": 512,
   "fds": 16384,
   "mem": 512
  },
  "name": "EventIN",
  "space_id": "cdf6b219-3839-4fbb-a276-eeb5266277e2",
  "space_name": "Demo",
  "uris": [
   "EventIN.mybluemix.net"
  ],
  "users": null,
  "version": "9691df58-5c33-40f9-a5d1-55d9681baeb4"
 }
}

No user-defined env variables have been set

Running Environment Variable Groups:
BLUEMIX_REGION: ibm:yp:us-south

Staging Environment Variable Groups:
BLUEMIX_REGION: ibm:yp:us-south
```
### To manually bind or unbind a service to an application 

Here are the commands 
```
cf bind-service <app-name> <service-name>
```

To UNbind,
```
cf unbind-service <app-name> <service-name>
```
## Push the code to Bluemix 

```
cd eventin-node-cloudant
```
Install node packages

```
npm install
```
To push the modified code to Bluemix, run the below command 

```
cf push
```
Repeat this step when the code is modified

### To test Locally 
In app.js, update the lines 58-62 with the cloudant service credentials 

```
  dbCredentials.host = "<Cloudant_Host>";
			dbCredentials.port = 443;
			dbCredentials.user = "<Cloudant_Username";
			dbCredentials.password = "<Cloudant_Password>";
			dbCredentials.url = "<Cloudant_Url_with_https>";
```
and then run 

```
npm start
```
