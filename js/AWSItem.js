//authenticate user through identity pool to get access to AWS resources
function accessAWS(result){	
	
	AWS.config.update({
		region: regionUserPool
	});

	
	//make sure to change Logins if userpool changes
	AWS.config.credentials = new AWS.CognitoIdentityCredentials({
		IdentityPoolId: identityPoolId,
		Logins: {
			'cognito-idp.us-east-2.amazonaws.com/us-east-2_ZX9XT03Iz' : result.getIdToken().getJwtToken()
		}
	});
			
	AWS.config.credentials.get(function(err){
		if (err) {
			console.log(err);
			//recursive as, I BELIEVE, when user does inital sign up, federate identity sometimes does not synch up quickly enough and requires multiple tries
			//this solution is not ideal and if a better one can be found need to use that instead
			//interestingly it always takes two tries (so one extra recursive call) for the access to work
			accessAWS(result);
		}
		else{
		//call function to use AWS resources
		console.log("Successful AWS access");

		
//******************************************BEGIN OF SUCCESSFUL AWS ACCESS**********************************************
//******************************************BEGIN OF SUCCESSFUL AWS ACCESS**********************************************
//******************************************BEGIN OF SUCCESSFUL AWS ACCESS**********************************************

//USER CAN NOW ADD POSTS TO DYNAMO, AND PICS TO S3

//needs update b/c resources in N cal server
AWS.config.update({
  region: regionDBS3,
});

var S3 = new AWS.S3({params: {Bucket: userImgBucket}});
var dynamodb = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();

//This function is the most complex so here is a list off steps that happen
// 1) gets image data and sends to s3 for file hosting
// 2) Retrives all form data and sends to dynamo table
// 3) This step is not added yet but needs to be: Using google ads API will update dynamo Item will keyword volume and catagoreis data. Also at this phase updating item with any API
//    that takes time to load will be done in this step or else an asynchoronous error will occur. This means keyword trends, volume, catagories etc will be added in this step.
// 4) **Important step: AWS Lambda function watches dynamoDB table (ttdTest1) for any upload and on item upload updates AWS cloudsearch domain with new item.
//      This is not scripted in here b/c Lambda is serverless function**
$(function() {
	$(document).on("click", ".add", function(){
  
		var num = this.id[this.id.length-1];
		
		//first upload img to s3 for later retrival
		var imgFile = document.getElementById("picInput" + num).files[0];
		
		var params3 = {
			Key: "ttd/" + imgFile.name,
			ContentType: imgFile.type,
			Body: imgFile,
			ACL: 'public-read'
		};

  // Upload the file to s3
		S3.upload(params3, function(err, data) {
			if (err) {
				alert(err);
			} else {
				//alert("Image uploaded to s3 successfully!");
			}
		});
		
		postDynamo(num);
		

    });
		
});

function postDynamo(num)
{
	
	var imgFile = document.getElementById("picInput" + num).files[0];
	var location = document.getElementById("locationLink" + num).value;
	var title = document.getElementById("title" + num).value;
	var price = document.getElementById("price" + num).value;
	var description = document.getElementById("info" + num).value;
	var link = document.getElementById("link" + num).value;
	var tags = document.getElementById("tags" + num).value;
	var email = document.getElementById("email" + num).value;
	var businessName = document.getElementById("businessName" + num).value;
	var rating = parseInt(document.getElementById("rating" + num).value); //change to parse double when feel like
	
	//var searchVolume = parseInt(googleObj["SearchVolume"]);
	
	//var categories = googleObj["CategoryIds"]; //this is put in dynamo as a List->number which is not indexable in cloudsearch so might consider reworking somehow, but can do later

	var params = {
		TableName : dynamoDBPostTableName,
		Item:{
			"title": title,
			"description": description,
				
			"img_path":s3ImgHostPath + imgFile.name,
				
			"location": location,
			"price": price,
			"link": link,
			"tags": tags,
			"email": email,
			"businessname": businessName,
			"ratingnum": rating,
			
			//"searchvolume": searchVolume,
			//"categoryids": categories
			
		}
	};
		
	docClient.put(params, function(err, data) {
		if (err) {
			document.getElementById('textarea').innerHTML = "Unable to add item: " + "\n" + JSON.stringify(err, undefined, 2);
		}else {
			document.getElementById('textarea').innerHTML = "PutItem succeeded: " + "\n" + JSON.stringify(data, undefined, 2);
		}
	});
}


//This is the basics of how to grab keyword volume data using google api, not in use untill request actual developer token
function returnVolumeAndCategories(num, keywordList)
{

	var http = new XMLHttpRequest();
		
	var formData = new FormData();
	formData.append("keywords", keywordList);
		
	http.open("POST", "http://localhost/googleads-php-lib/examples/AdWords/v201710/Optimization/GetKeywordIdeas.php", true);
	http.send(formData);

	http.onreadystatechange = function() {//Call a function when the state changes.
		if(http.readyState == 4 && http.status == 200) {
			console.log("State Change");
			var JSONString = http.responseText;
			console.log(JSONString);
			var JSONObject = JSON.parse(JSON.parse(JSONString)); //There are two parses here as the first strips outer quotes and forward slashes while the second converts now readable JSON string into JSON object
			//document.getElementById("textarea").innerHTML = JSONString;
			document.getElementById("textarea").innerHTML += JSONObject;
			console.log(JSONObject);
			postDynamo(num, JSONObject);
		}
	}
}

//******************************************END OF SUCCESSFUL AWS ACCESS**********************************************
//******************************************END OF SUCCESSFUL AWS ACCESS**********************************************
//******************************************END OF SUCCESSFUL AWS ACCESS**********************************************


		}
	});

}