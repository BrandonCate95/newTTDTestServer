//script runs whenever user enters in URL
params = getcurrURLParams();

if(params.q){//run search load script
	searchReq(params.q,false);
}else{//either a refresh or connect to homepage
	processAjaxData(false);
}