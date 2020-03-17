
//Known problems: Whenever searching for items that do not have all required fields then will throw 404 error, because one of the fields is not defined (ex:img_path) this can be fixed with some try and catch statements


//This sends url request data to php script which sends curl request to AWS cloudsearch and retrieves JSON data
$(function() {
	$(document).on("click", "#Search", function(){

		var http = new XMLHttpRequest();
		
		var query = document.getElementById("searchText").value;
		
		var formData = new FormData();
		formData.append("URL", userSearchDomain + "search?q=" + query + "&return=title,description,link,location,price,img_path");
		
		http.open("POST", "/ttdTestServer/info.php", true);
		http.send(formData);

		http.onreadystatechange = function() {//Call a function when the state changes.
			if(http.readyState == 4 && http.status == 200) {
				var JSONString = http.responseText;
				var JSONObject = JSON.parse(JSON.parse(JSONString)); //There are two parses here as the first strips outer quotes and forward slashes while the second converts now readable JSON string into JSON object
				
				if(document.getElementById("textarea")){ //added for debugging purposes on addItem page
					document.getElementById("textarea").innerHTML = JSON.stringify(JSONObject["hits"]["hit"]);
				}
				formatData(JSONObject["hits"]["hit"]);
			}
		}		
	});
});

function formatData(obj)//basically add_post w/o additional info section and obj data inside thier respective element values
{

	document.getElementById("search_results").innerHTML = "";
	
	for(var k in obj)
	{
	//tabbing indicates what elements are inside what other elements for easier viewing
	console.log(obj[k]["fields"]);
	var rowContainer = document.createElement("div");
	rowContainer.id = "searchRow" + k;
	rowContainer.className = "row container-fluid";
	
		var div1 = document.createElement("div");
		div1.id = "searchLeft" + k;
		div1.className = "col-sm-2 searchResult";
		
		var div2 = document.createElement("div");
		div2.id = "searchPost" + k;
		div2.className = "col-sm-8 searchResult";
	
			var pic = document.createElement("div");
			pic.className = "searchResult searchPic";
			pic.style.backgroundImage = "url('" + obj[k]["fields"]["img_path"] + "')";
			pic.id = "searchPic" + k;	
	
				//leaving as may use for img element is better setting background of pic element
				
				//var picForm = document.createElement("form");
				//picForm.id = "picForm" + searchNum;
				//picForm.className = "picForm";
				
					//var picInput = document.createElement("input");
					//picInput.type = "file";
					//picInput.id = "picInput" + searchNum;
					//picInput.className = "picInput";
					
					//var img = document.createElement("img");
					//img.id = "img" + searchNum;
					//img.src = "#";
					//img.className = "postImg";
	
			var desc = document.createElement("div");
			desc.className = "searchResult searchDesc";
			desc.id = "searchDesc" + k;
				
					var title = document.createElement("div");
					title.innerHTML = obj[k]["fields"]["title"];
					title.className = "title input top";
					title.id = "searchTitle" + k;
					
					var price = document.createElement("div");
					price.innerHTML = obj[k]["fields"]["price"];
					price.className = "price top";
					price.id = "searchPrice" + k;
					
					var info = document.createElement("div");
					info.innerHTML = obj[k]["fields"]["description"];
					info.className = "info input";
					info.id = "searchInfo" + k;
					
					var link = document.createElement("div");
					link.innerHTML = obj[k]["fields"]["link"];
					link.className = "searchLink input";
					link.id = "searchLink" + k;
					
					var loc = document.createElement("i");
					loc.className = "fa fa-map-marker fa-fw fa-lg location";
					loc.setAttribute("aria-hidden", "true");
					loc.id = "searchLocation" + k;
					
						var locLink = document.createElement("div");
						locLink.className = "searchLocationLink hidden";
						locLink.innerHTML = obj[k]["fields"]["location"];
						locLink.id = "searchLocationLink" + k;
						
						var locLinkArrow = document.createElement("div");
						locLinkArrow.className = "arrow hidden";
						locLinkArrow.id = "searchLocationLinkArrow" + k;
						
		var div3 = document.createElement("div");
		div3.id = "searchRight" + k;
		div3.className = "col-sm-2 searchResult";
		
		
	//BEGIN DIV2 APPENDS
	
	div2.append(pic);
	
	
	loc.append(locLinkArrow);
	
	desc.append(locLink);
	desc.append(title);
	desc.append(price);
	desc.append(info);
	desc.append(link);
	desc.append(loc);
	
	div2.append(desc);

	//END DIV2 APPENDS
	
	//BEGIN DIV3 APPENDS
	
	rowContainer.append(div1);
	rowContainer.append(div2);
	rowContainer.append(div3);
	
	document.getElementById("search_results").append(rowContainer);
		
	
	}
	
	
	
}