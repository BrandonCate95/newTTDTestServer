console.log("Start FB");

 window.fbAsyncInit = function() {
    FB.init({
		appId      : '155766638377698',
		cookie     : true,
		xfbml      : true,
		version    : 'v2.11'
    });

    FB.AppEvents.logPageView();

    FB.getLoginStatus(function(response) {
		document.getElementById("textarea").innerHTML = JSON.stringify(response.name);
    });

    this.getFbStatus = function(){
		FB.getLoginStatus(function(response) {
			document.getElementById("textarea").innerHTML = JSON.stringify(response.name);

			if (response.authResponse) {

				console.log('You are now logged in.');

				// Add the Facebook access token to the Cognito credentials login map.
				AWS.config.region = 'us-east-2';
				AWS.config.credentials = new AWS.CognitoIdentityCredentials({
					IdentityPoolId: 'us-east-2:33b51ce1-f0fd-4e76-bd9d-ff782327bf2d',
					Logins: {
						'graph.facebook.com': response.authResponse.accessToken
					}
				});
			
				//get fb data from current user, fields list at https://developers.facebook.com/docs/graph-api/reference/user/
				FB.api('/me',{fields: 'name,email,gender,about,last_name'}, function(data){
					console.log(data);
				});

				// Obtain AWS credentials
				AWS.config.credentials.get(function(){
				// Access AWS resources here.
					console.log("Successfully loaded AWS creds");
				});

			}else{
				console.log('There was a problem logging you in.');
			}

		});
    };
};

(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
