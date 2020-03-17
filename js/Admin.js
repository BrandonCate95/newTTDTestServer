//adds post form to be filled out
var postNum = 1;
function add_post()
{

	//tabbing indicates what elements are inside what other elements for easier viewing
	var rowContainer = document.createElement("div");
	rowContainer.id = "row" + postNum;
	rowContainer.className = "row container-fluid";
	
		var div1 = document.createElement("div");
		div1.id = "left" + postNum;
		div1.className = "col-sm-2 post";
		
		var div2 = document.createElement("div");
		div2.id = "post" + postNum;
		div2.className = "col-sm-8 post";
	
			var pic = document.createElement("div");
			pic.className = "post pic";
			pic.style.backgroundImage = "url('#')";
			pic.title = "Click to Add Picture";
			pic.id = "pic" + postNum;
	
				var p = document.createElement("p");
				p.innerHTML = "Add Picture";
				p.className = "picText";
				p.id = "picText" + postNum;
	
				var picForm = document.createElement("form");
				picForm.id = "picForm" + postNum;
				picForm.className = "picForm";
				
					var picInput = document.createElement("input");
					picInput.type = "file";
					picInput.id = "picInput" + postNum;
					picInput.className = "picInput";
					
					var img = document.createElement("img");
					img.id = "img" + postNum;
					img.src = "#";
					img.className = "postImg";
	
			var desc = document.createElement("div");
			desc.className = "post desc";
			desc.id = "desc" + postNum;
	
				var descForm = document.createElement("form");
				descForm.id = "descForm" + postNum;
				descForm.className = "descForm";
				
					var title = document.createElement("input");
					title.type = "text";
					title.placeholder = "Title here...";
					title.className = "title input top";
					title.id = "title" + postNum;
					
					var price = document.createElement("input");
					price.type = "text";
					price.placeholder = "Price...";
					price.className = "price top";
					price.id = "price" + postNum;
					
					var info = document.createElement("textarea");
					info.placeholder = "Description and info here...";
					info.className = "info input";
					info.id = "info" + postNum;
					
					var link = document.createElement("input");
					link.type = "text";
					link.placeholder = "Link to website here...";
					link.className = "link input";
					link.id = "link" + postNum;
					
					var loc = document.createElement("i");
					loc.className = "fa fa-map-marker fa-fw fa-lg location";
					loc.setAttribute("aria-hidden", "true");
					loc.id = "location" + postNum;
					
						var locLink = document.createElement("input");
						locLink.type = "field";
						locLink.name = "field";
						locLink.className = "locationLink hidden";
						locLink.placeholder = "Location Link...";
						locLink.id = "locationLink" + postNum;
						
						var locLinkArrow = document.createElement("div");
						locLinkArrow.className = "arrow hidden";
						locLinkArrow.id = "locationLinkArrow" + postNum;
	
				//additional info section very liable to change with additional or removal of certain sections
				var addInfo = document.createElement("div");
				addInfo.className = "additionalInfo";
				addInfo.id = "additionalInfo" + postNum;
				
					var addForm = document.createElement("form");
					addForm.className = "additionalForm";
					addForm.id = "additionalForm" + postNum;
					
						var tags = document.createElement("input");
						tags.type = "text";
						tags.className = "tags addFormInput";
						tags.placeholder = "Comma seperated tags...";
						tags.name = "tags" + postNum;
						tags.id = "tags" + postNum;
						
						var email = document.createElement("input");
						email.type = "text";
						email.className = "email addFormInput";
						email.placeholder = "Valid email...";
						email.name = "email" + postNum;
						email.id = "email" + postNum;
						
						var busName = document.createElement("input");
						busName.type = "text";
						busName.className = "businessName addFormInput";
						busName.placeholder = "Legal Name of business...";
						busName.name = "businessName" + postNum;
						busName.id = "businessName" + postNum;
						
						var rating = document.createElement("input");
						rating.type = "text";
						rating.className = "rating addFormInput";
						rating.placeholder = "rating 0-5...";
						rating.name = "rating" + postNum;
						rating.id = "rating" + postNum;
						
		var div3 = document.createElement("div");
		div3.id = "right" + postNum;
		div3.className = "col-sm-2 post";
		
			var add = document.createElement("input");
			add.type = "button";
			add.name = "add" + postNum;
			add.id = "add" + postNum;
			add.className = "add";
			add.value = "Add Post";
	
	//BEGIN DIV2 APPENDS
	//additional info section layout
	addInfo.append("Tags: ");
	addInfo.append(document.createElement("br"));
	addInfo.append(tags);
	addInfo.append(document.createElement("br"));
	addInfo.append("Email: ");
	addInfo.append(document.createElement("br"));
	addInfo.append(email);
	addInfo.append(document.createElement("br"));
	addInfo.append("Business Name: ");
	addInfo.append(document.createElement("br"));
	addInfo.append(busName);
	addInfo.append(document.createElement("br"));
	addInfo.append("Rating: ");
	addInfo.append(document.createElement("br"));
	addInfo.append(rating);
	
	
	picForm.append(picInput);
	picForm.append(img);
	
	document.getElementById("blog_post").append(picForm);
	
	pic.append(p);
	
	div2.append(pic);
	
	
	loc.append(locLinkArrow);
	
	descForm.append(locLink);
	descForm.append(title);
	descForm.append(price);
	descForm.append(info);
	descForm.append(link);
	descForm.append(loc);

	desc.append(descForm);
	
	div2.append(desc);
	
	div2.append(addInfo);
	//END DIV2 APPENDS
	
	//BEGIN DIV3 APPENDS
	div3.append(add);
	
	rowContainer.append(div1);
	rowContainer.append(div2);
	rowContainer.append(div3);
	
	document.getElementById("blog_post").append(rowContainer);
	
	postNum++;
}


//These three sets of functions are used to upload user image to html page. **Note this is not a permament upload only for user display purposes, to be permament must be added to s3**

//This makes it so click pic div element it fires off function
$(document).on("click", ".pic", function(){
	var num = this.id[this.id.length-1];
	uploadFile(num);
});

//This first clicks img input element, then waits for user to specify what image they want to upload
function uploadFile(num){

	document.getElementById("picInput" + num).click();
	$(document).on("change", "#picInput" + num, function(){
		readURL(num);
	});
}

//Now after user adds image this reads file and adds as html background, while removeing text
function readURL(num){
    var file = document.getElementById("picInput" + num).files[0];
	
    var reader = new FileReader();
    reader.onloadend = function(){
		
        document.getElementById('pic' + num).style.backgroundImage = "url(" + reader.result + ")";
		document.getElementById('picText' + num).className += " hidden";
        
    }	
    if(file){
        reader.readAsDataURL(file);
    }else{
    }
}
