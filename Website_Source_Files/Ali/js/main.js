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
	// When it responds
	xmlhttp.onreadystatechange=function(){
		if (xmlhttp.readyState==4 && xmlhttp.status==200) {
				var District_Data = JSON.parse(xmlhttp.responseText);
				GOT_District(District_Data);
			}
	}
	xmlhttp.open("GET","db.php?State_ID_For_District=" + State_ID_For_District,true);
	xmlhttp.send();
	
return xmlhttp;
}

function test (state){
var test1 = [];
test1 = GET_District(state);
alert(test1[0]);

}