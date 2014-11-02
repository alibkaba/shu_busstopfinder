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
	xmlhttp.onreadystatechange=function(){
		if (xmlhttp.readyState==4 && xmlhttp.status==200) {
				document.getElementById("select_district_id").innerHTML=xmlhttp.responseText;
			}
	}
	xmlhttp.open("GET","db.php?State_ID_For_District=" + State_ID_For_District,true);
	xmlhttp.send();
}