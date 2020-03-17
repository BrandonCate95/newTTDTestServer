function searchReq(query,onPageInput){
	//clear search results
	document.getElementById("searchResults").innerHTML = "";
	
	var http = new XMLHttpRequest();
		
	var userSearchDomain = "search-ttd-domain-test4-dyydkif3glfylufhmtvfcfmhfe.us-west-1.cloudsearch.amazonaws.com/2013-01-01/";
		
	var formData = new FormData();
	formData.append("URL", userSearchDomain + "search?q=" + query + "&return=title,location,place,date,price,img_path");
		
	http.open("POST", "/ttdTestServer/info.php", true);
	http.send(formData);

	http.onreadystatechange = function() {//Call a function when the state changes.
		if(http.readyState == 4 && http.status == 200) {
			var JSONString = http.responseText;
			var JSONObject = JSON.parse(JSON.parse(JSONString)); //There are two parses here as the first strips outer quotes and forward slashes while the second converts now readable JSON string into JSON object
				
			if(document.getElementById("textarea")){ //added for debugging purposes on addItem page
				document.getElementById("textarea").innerHTML = JSON.stringify(JSONObject["hits"]["hit"]);
			}
			//console.log(JSONObject["hits"]["hit"])
			formatData(JSONObject["hits"]["hit"]);
			processAjaxData(JSONObject["hits"]["hit"],onPageInput);
		}
	}
}