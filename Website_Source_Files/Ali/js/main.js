// Event Listeners
function GET_District(State_ID_For_District) {
	var xmlhttp;    
	if (State_ID_For_District=="")	{
		document.getElementById("select_district_id").innerHTML="";
	return;
	}
	if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
	}
	else {// code for IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	// When it responses
	xmlhttp.onreadystatechange=function(){
		if (xmlhttp.readyState==4 && xmlhttp.status==200) {
				var District_Data = JSON.parse(xmlhttp.responseText);
				GOT_District(District_Data);
			}
	}
	xmlhttp.open("GET","db.php?State_ID_For_District=" + State_ID_For_District,true);
	xmlhttp.send();
	
	var District_Data_test = [{"DISTRICT_ID":"1","0":"1","DISTRICT_NAME":"Norwalk","1":"Norwalk"},{"DISTRICT_ID":"4","0":"4","DISTRICT_NAME":"New Haven","1":"New Haven"},{"DISTRICT_ID":"5","0":"5","DISTRICT_NAME":"Stratford","1":"Stratford"}];
	
	function GOT_District(District_Data) {
    var out = "";
    var i;
    for(i = 0; i < District_Data.length; i++) {
        out += '<a href="' + District_Data[i].DISTRICT_ID + '">' + 
        District_Data[i].DISTRICT_NAME+ '</a><br>';
    }
    document.getElementById("DistrictPlaceHolder").innerHTML = out;
}
}