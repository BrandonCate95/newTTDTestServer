//client id only actual senstive data here rest of for ease of use whenever they are/if changed
var userPoolId = 'us-east-2_ZX9XT03Iz';
var clientId = '48o24i7hd9stp18lh24hc3tdfb';
var identityPoolId = 'us-east-2:33b51ce1-f0fd-4e76-bd9d-ff782327bf2d';
var userImgBucket = 'ttd-service-image-storage';
var regionDBS3 = 'us-west-1';
var regionUserPool = 'us-east-2';
var dynamoDBPostTableName = 'ttdTest1';
var s3ImgHostPath = 'https://s3-' + regionDBS3 + '.amazonaws.com/' + userImgBucket + '/ttd/'; //change /ttd if want new folder
var userSearchDomain = 'http://search-ttd-domain-test2-gsolgnte4fhaxqyyhm7cy6mgje.us-west-1.cloudsearch.amazonaws.com/2013-01-01/';
var identityLogin = 'cognito-idp.' + regionUserPool + '.amazonaws.com/' + userPoolId;


//these are for declaration purposes
password = "";
username = "";
email = "";

var poolData = { UserPoolId : userPoolId,
    ClientId : clientId
};

var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData)