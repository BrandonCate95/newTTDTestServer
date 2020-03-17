//this function either shows or hides the location link. May use this may not use this
$(function() {
  $(document).on("click", ".location", function(){
	var num = this.id[this.id.length-1];
	if(this.id[0] == "s")//for search result case
	{
		var el1 = document.getElementById("searchLocationLink" + num);
		var el2 = document.getElementById("searchLocationLinkArrow" + num);
	}else //for posting case
	{
		var el1 = document.getElementById("locationLink" + num);
		var el2 = document.getElementById("locationLinkArrow" + num);
	}

    if($(el1).hasClass('visible')) {
	  el1.classList.remove("visible");
	  el1.className += " hidden";
	  
	  el2.classList.remove("visible");
	  el2.className += " hidden";
    } else {
	  el1.classList.remove("hidden");
	  el1.className += " visible";
	  
	  el2.classList.remove("hidden");
	  el2.className += " visible";
	  
    }
    return false;
  });

});