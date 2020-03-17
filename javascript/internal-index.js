
//GLOBAL VARIABLES START
AWS.config.update({
  region: 'us-west-1',
  accessKeyId: 'AKIAJZH5MFCWDXTY7HHA',
  secretAccessKey: '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'
});

var docClient = new AWS.DynamoDB.DocumentClient();

var currURL = "http://localhost/newTTDTestServer/index.html";
//GLOBAL VARIABLES END

//ON USER INPUT FUNCTIONS START
$(function() {
	$(document).on("click", "#Search", function(){
	
	var query = document.getElementById("searchText").value;
	searchReq(query,true);
	
	});
});

//called on forward or backwards button
window.onpopstate = function(e){
	
    if(e.state){
		console.log("getting state data");
		
		//fill in search text box with search query
		if(e.state.search){
			document.getElementById("searchText").value = e.state.search;
		}else{
			document.getElementById("searchText").value = "";
		}
		
		//fill in search results
		if(e.state.searchData){
			document.getElementById("searchResults").innerHTML = "";
			formatData(e.state.searchData);
		}else{
			document.getElementById("searchResults").innerHTML = "";
		}
		
		//not yet implemented
		if(e.state.pageTitle){
			document.getElementById("pageText").value = e.state.pageTitle;
		}else{
			//document.getElementById("pageText").value = "";		
		}
		
		if(e.state.pageData){//have to check if page is up or not as well
			if(document.getElementById('wrapper')){
				document.getElementById("wrapper").innerHTML = e.state.pageData;
			}else{
				var div = document.createElement("div");
				div.id = "wrapper";
				div.className = "wrapper";
	
				div.append(e.state.pageData);
	
				$('body').append(div);
			}
		}else if(document.getElementById('wrapper')){
			$('#wrapper').remove();
		}
		
    }
};
//ON USER INPUT FUNCTIONS END

//CALL FUNCTIONS START

//called in onLoad-index.js script
function getcurrURLParams() {

	var currURLParams;

    var match,
       pl     = /\+/g,  // Regex for replacing addition symbol with a space
       search = /([^&=]+)=?([^&]*)/g,
       decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
       query  = window.location.search.substring(1);

    currURLParams = {};
    while (match = search.exec(query)){
       currURLParams[decode(match[1])] = decode(match[2]);
	}
	return currURLParams;
}

//function loadPage(pg,onPageInput){

//	var table = "ttdTest3";
//    var title = pg;

//    var params = {
//        TableName: table,
//        Key:{
//            "title": title
//        }
//    };
//    docClient.get(params, function(err, data) {
//        if (err) {
//			console.log(err);
//        } else {
//			createPage(data.Item,onPageInput);
//        }
//    });
//}

//called on external-index.js script in searchReq(query,onPageInput)
function processAjaxData(searchData, onPageInput){
	
	//setting all parameters
	if(params.q){
		var search = params.q;
		params.q = "";//set to null or messes shit up
		
	}else{
		var search = document.getElementById("searchText").value;
	}
	
	if(search){
		var currURL = currURL + "?q=" + search;
		console.log(currURL);
	}	
	
	if(onPageInput){//search or page click on website, need to pushstack to create new history
		window.history.pushState({"search":search,"searchData":searchData,"pageTitle":"","pageData":""},"", currURL);
	}else{
		window.history.replaceState({"search":search,"searchData":searchData,"pageTitle":"","pageData":""},"", currURL);
	}
	
}

function formatData(data){

	for(var k in data){

	console.log(data[k]["fields"].location);
	
	var title = data[k]["fields"].title;
	var location = data[k]["fields"].place;
	var price = data[k]["fields"].price;
	var img_path = data[k]["fields"].img_path;
	var date = data[k]["fields"].date;
		
	var col = document.createElement("div");
	col.className = "col-xl-3 col-lg-4 col-md-6 col-6 portfolio-item";
	
	var card = document.createElement("div");
	card.className = "card h-100";
	
	var imgCon = document.createElement("div");
	imgCon.className = "imgContainer";
	
	var img = document.createElement("img");
	img.id = "image1";
	img.className = "card-img-top";
	img.src = img_path;
	
	var cardBd = document.createElement("div");
	cardBd.className = "card-body";
	
	var cardTxTop = document.createElement("div");
	cardTxTop.className = "card-text-top";
	
	var locEl = document.createElement("p");
	locEl.className = "card-info card-location";
	locEl.innerHTML = location;
	
	var cardDivider = document.createElement("div");
	cardDivider.className = "card-divider";
	cardDivider.innerHTML = "&#8729;"
	
	var cardDate = document.createElement("p");
	cardDate.className = "card-info card-date";
	cardDate.innerHTML = date;
	
	var cardTitle = document.createElement("h4");
	cardTitle.className = "card-info card-title";
	cardTitle.innerHTML = title;
	
	var cardPrice = document.createElement("p");
	cardPrice.className = "card-info card-text";
	
	var usdIcon = document.createElement("i");
	usdIcon.className = "fa fa-usd";
	
	cardPrice.append(usdIcon);
	cardPrice.append(price + " per person");
	
	cardTxTop.append(locEl);
	cardTxTop.append(cardDivider);
	cardTxTop.append(cardDate);
	
	cardBd.append(cardTxTop);
	cardBd.append(cardTitle);
	cardBd.append(cardPrice);
	
	imgCon.append(img);
	
	card.append(imgCon);
	card.append(cardBd);
	
	col.append(card);
	
	$('#searchResults').append(col);
	
	}
}
//CALL FUNCTIONS END