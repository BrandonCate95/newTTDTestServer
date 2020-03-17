//start of on click functions, these require user interactivity
$(function() {
	$(document).on("click", "#callSignIn", function(){
		
		console.log("Called");
		
		$(".col-fixed-300").css("height", "485px");
		$("#bottom").css("height", "310px");
		$("#bottom").load("userAccessHTML/signInForm.html");
		$("#overlay").css("height", "100%");
		$("#overlay-back").css("height", "100%");
		$('#overlay, #overlay-back').fadeIn(500);
		$("#loadSignIn").fadeIn(150);
	
	
	});
	
});	

$(function() {
	$(document).on("click", "#callSignUp", function(){
		
		console.log("Called");
		
		$(".col-fixed-300").css("height", "550px");
		$("#bottom").css("height", "375px");
		$("#bottom").load("userAccessHTML/signUpForm.html");
		$("#overlay").css("height", "100%");
		$("#overlay-back").css("height", "100%");
		$('#overlay, #overlay-back').fadeIn(500);
		$("#loadSignIn").fadeIn(150);
	
	});
	
});

$(function() {
	$(document).on("click", "#signInLink", function(){
	
		animateUserBox(485,"signInForm");		
	
	});
	
});

$(function() {
	$(document).on("click", "#signUpLink", function(){
	
		animateUserBox(550,"signUpForm");		
	
	});
	
});

$(function() {
	$(document).on("click", "#overlay", function(){
		hideSignBox();		
	});
});

function hideSignBox(){
	console.log("clicked");
	$("#overlay").css("height", "100%");
	$("#overlay-back").css("height", "100%");
	$('#overlay, #overlay-back').fadeOut(300);
	$('#loadSignIn').fadeOut(150);
	document.getElementById("bottom").innerHTML = "";
}	

$(function() {
	$(document).on("click", "#signUpBtn", function(){
	
		signUpSend();
	
	});
	
});

//user sign out
$(function() {
	$(document).on("click", "#signOutBtn", function(){	
	
		var cognitoUser = userPool.getCurrentUser();
		
		if (cognitoUser != null) {
          cognitoUser.signOut();
        }
		
		signInUpBtns();

	});
	
});

//user sign in
$(function() {
	$(document).on("click", "#signInBtn", function(){		
		signInUser();
	});
	
});

$(function() {
	$(document).on("click", "#confirmAccount", function(){	
	
		//get confirmation code
		var confirmationCode = document.getElementById("verifyCode").value;

		var userData = {
			Username : username,
			Pool : userPool
		};

		var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);
		cognitoUser.confirmRegistration(confirmationCode, true, function(err, result) {
			if (err) {
				console.log(err);
				addErrMessage(err.message);
				return;
			}else{
				//
				console.log(result);
				signInUser();
				
			}
		});
	
	});
	
});

$(function() {
	$(document).on("click", "#forgot", function(){	
	
		animateUserBox(455,"forgotPassword");
		
	});
});

$(function() {
	$(document).on("click", "#forgotPasswordBtn", function(){	

		getUserData();
		
		AWSCognito.config.region = regionUserPool; //This is required to derive the endpoint
	
		var poolData = {
			UserPoolId : userPoolId,
			ClientId : clientId
		};

		var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
		var userData = {
			Username : username,
			Pool : userPool
		};

		var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);
		cognitoUser.forgotPassword({
			onSuccess: function (result) {
				console.log(result);
				console.log(this);
				
				animateUserBox(485,"getNewPassword");

			},
			onFailure: function(err) {
				console.log(err);
				addErrMessage(err.message);
			}
		});
	});
});

$(function() {
	$(document).on("click", "#changePasswordBtn", function(){

		var code = document.getElementById("code").value;
		password = document.getElementById("newPassword").value;
		
		AWSCognito.config.region = regionUserPool; //This is required to derive the endpoint
	
		var poolData = {
			UserPoolId : userPoolId,
			ClientId : clientId
		};

		var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
		var userData = {
			Username : username,
			Pool : userPool
		};

		var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);
		cognitoUser.confirmPassword(code, password, {
            onFailure(err) {
                console.log(err);
				addErrMessage(err.message);
            },
            onSuccess() {
                console.log("success");
				signInUser();
            }
		});

		
	});
});	

$(function() {
	$(document).on("click", "#resendSignUpCode", function(){

		var userData = {
			Username : username,
			Pool : userPool
		};

		var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);
	
		cognitoUser.resendConfirmationCode(function(err, result) {
            if (err) {
                console.log(err);
				addErrMessage(err.message);
                return;
            }else{
				console.log(result);
			}
        });
	
	});
});	
//end of on click functions







//start of called functions, these are used as specific functions normally needed to load async 

function getUserData(){
	if(document.getElementById("username")){
		username = document.getElementById("username").value;
	}
	if(document.getElementById("password")){
		password = document.getElementById("password").value;
	}
	if(document.getElementById("email")){
		email = document.getElementById("email").value;
	}

}

function animateUserBox(boxSize, htmlPage){
	var bottomSize = boxSize - 175;
	
	$(".col-fixed-300").animate({
		height: boxSize + "px"
	});
	$("#bottom").css("height", bottomSize + "px");
	document.getElementById("bottom").innerHTML = "";
	$("#bottom").load("userAccessHTML/" + htmlPage + ".html");
}

function signOutBtn(){//create user welcome and dropdown with ability to add more choices later
	
	var usrText = document.createElement("a");
	
	usrText.className = "nav-link dropdown-toggle";
	usrText.setAttribute("href","#");
	usrText.id = "navbarDropdown";
	usrText.setAttribute("role","button");
	usrText.setAttribute("data-toggle","dropdown");
	usrText.setAttribute("aria-aspopup","true");
	usrText.setAttribute("aria-expanded","false");
	usrText.innerHTML = "Welcome";
	
	var dropdownDiv = document.createElement("div");
	
	dropdownDiv.className = "dropdown-menu";
	dropdownDiv.setAttribute("aria-labelledby", "navbarDropdown");
	
	var dropdownItem = document.createElement("a");
	
	dropdownItem.className = "dropdown-item";
	dropdownItem.setAttribute("href","addItem.html");
	dropdownItem.innerHTML = "Add Post";
			
	var signOutBtn = document.createElement("button");
	signOutBtn.id = "signOutBtn";
	signOutBtn.className = "btn btn-outline-success my-2 my-sm-0 mr-sm-2";
	signOutBtn.type = "submit";
	signOutBtn.innerHTML = "Sign Out";
	
	var user1 = document.getElementById("user1");
	var user2 = document.getElementById("user2");
				
	user1.innerHTML = "";
	user2.innerHTML = "";
	
	dropdownDiv.append(dropdownItem);

	user1.append(usrText);
	user1.append(dropdownDiv);
	
	user2.append(signOutBtn);
}

function signInUpBtns(){

	var callSignIn = document.createElement("button");
	callSignIn.id = "callSignIn";
	callSignIn.className = "btn btn-outline-success my-2 my-sm-0 mr-sm-2";
	callSignIn.type = "submit";	
	callSignIn.innerHTML = "Sign In";
	
	var callSignUp = document.createElement("button");
	callSignUp.id = "callSignUp";
	callSignUp.className = "btn btn-outline-success my-2 my-sm-0 mr-sm-2";
	callSignUp.type = "submit";	
	callSignUp.innerHTML = "Sign Up";
		
	var user1 = document.getElementById("user1");
	var user2 = document.getElementById("user2");

	user1.innerHTML = "";
	user2.innerHTML = "";
	
	user1.append(callSignIn);
	user2.append(callSignUp);
	
}


function currentUserAccess(){

	var cognitoUser = userPool.getCurrentUser();
	if (cognitoUser != null) {
		cognitoUser.getSession(function(err, result) {
			if (err) {
				console.log(err);
				return;
			}else{
				signOutBtn();
				accessAWS(result);
			}
		});
	}
}

function signInUser(){

	getUserData();

	console.log("Username: " + username + "  Password: " + password);
	
	var userData = {
		Username : username, // your username here
		Pool : userPool
	};
	
    var authenticationData = {
        Username : username, // your username here
        Password : password, // your password here
    };
    var authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData);
 
    var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
			//user signed in so we can now access AWS with tokens
			
			//this takes a decent amount of time to sign in so...
			//1)we need to try to minimize this time
			//2)add a loading sprite to let user know we are working on sign in
			signOutBtn();
			hideSignBox();
			accessAWS(result);
				
        },
        onFailure: function(err) {//error handling for events like unathenticated, incorrect usrname/pass, etc...
			console.log(typeof err.name);
			console.log(err.name);
			console.log(err.message);
			if(err.name == "UserNotConfirmedException"){//if user not confirmed want to resend confirmation code and then go to verify page
				
				cognitoUser.resendConfirmationCode(function(confirmErr, confirmResult) {
					if (confirmErr) {
						console.log(confirmErr);
						addErrMessage(confirmErr.message);
						return;
					}else{
						console.log(confirmResult);
						console.log(err)
						//need deffered for verifyCode html page to load first
						let errPromise = new Promise((resolve, reject) => {
							animateUserBox(445,"verifyCode");
					
					//*******************************************************************************
					//*******************************************************************************
					//This is possibly the worst code ever written so try to change as quickly as possible
					//*******************************************************************************
					//*******************************************************************************
					
							setTimeout(function(){//ugh...
								resolve("Success");
							},250);			
						});				
				
						errPromise.then((successMessage) => {
							addErrMessage(err.message);
							console.log("yay!" + successMessage);
						});
					}
				});
			}else{
				addErrMessage(err.message);
			}
        },
        mfaRequired: function(codeDeliveryDetails) {
            var verificationCode = prompt('Please input verification code' ,'');
            cognitoUser.sendMFACode(verificationCode, this);
        }
    });

}

function addErrMessage(message){
	
	//this removes and adjusts for previous err message if applicable
	if(document.getElementById("errMessage")){
		var prevErrBoxHeight = document.getElementById("errMessage").offsetHeight;
		$("#errMessage").remove();	
	}else{
		var prevErrBoxHeight = 0;
	}
	
	var errBox = document.createElement("div");
	errBox.id = "errMessage";
	errBox.className = "err";
	errBox.innerHTML = message;	
	
	var below = document.getElementsByClassName("errAbove");
	var box = document.getElementById("bottom");
		
	box.insertBefore(errBox, below[0]);
	
	var errBoxHeight = errBox.offsetHeight;
	var bottomSize = document.getElementById("bottom").offsetHeight + errBoxHeight - prevErrBoxHeight;
	var boxSize = bottomSize + 175;
	
	
	console.log(below);
	console.log(errBoxHeight);
	
	$(".col-fixed-300").animate({
		height: boxSize + "px"
	});
	$("#bottom").css("height", bottomSize + "px");
	
	box.insertBefore(errBox, below[0]);
	
}

//user sign up    
function signUpSend(){
	
	//get Form data
	getUserData();

    var attributeList = [];
    
    var dataEmail = {
        Name : 'email',
        Value : email
    };

    var attributeEmail = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataEmail);

    attributeList.push(attributeEmail);

	//sign up new user with info
    userPool.signUp(username, password, attributeList, null, function(err, result){
        if (err) {
			console.log(err);
			addErrMessage(err.message);
            return;
        }else{//if success
			animateUserBox(445,"verifyCode");
		}
	//it is important to note that signup does not sign in a user, must do this seperatly	
    });
		
}