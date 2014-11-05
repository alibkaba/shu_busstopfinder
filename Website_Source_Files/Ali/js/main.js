// Start: District Down Drop
// Start: Ajax
function Get_District() {
	var xmlhttp;
	alert(x);
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
				// JSON Parse it into District_Data
				var District_Data = JSON.parse(xmlhttp.responseText);
				// Send it for process
				GOT_District(District_Data);
			}
	}
	// Send it to that URL
	xmlhttp.open("GET","db.php?State_ID_For_District=" + State_ID_For_District,true);
	xmlhttp.send();
}
// End: Ajax

// Start: Create the <Select>
function GOT_District(District_Data) {
		var out = "";
		var i;
		for(i = 0; i < District_Data.length; i++) {
			out += '<a href="' + District_Data[i].DISTRICT_ID + '">' + 
			District_Data[i].DISTRICT_NAME+ '</a><br>';
		}
		document.getElementById("DistrictPlaceHolder").innerHTML = out;
}
// End: Create the <Select>
// End: District Down Drop