// Gets the district drop down
function StateThisValue(State_ID_Value) {
	var xmlhttp;    
	if (State_ID_Value=="")	{
		document.getElementById("districtplaceholder").innerHTML="";
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
				document.getElementById("districtplaceholder").innerHTML=xmlhttp.responseText;
			}
	}
	xmlhttp.open("GET","getdistrict.php?stateid=" + State_ID_Value,true);
	xmlhttp.send();
}

// Gets the school drop down
function DistrictThisValue(District_ID_Value) {
    var xmlhttp;    
	if (District_ID_Value=="")	{
		document.getElementById("schoolplaceholder").innerHTML="";
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
				document.getElementById("schoolplaceholder").innerHTML=xmlhttp.responseText;
			}
	}
	xmlhttp.open("GET","getschool.php?districtid=" + District_ID_Value,true);
	xmlhttp.send();
}

// Gets the bus drop down
function SchoolThisValue(School_ID_Value) {
    var xmlhttp;    
	if (School_ID_Value=="")	{
		document.getElementById("busstopplaceholder").innerHTML="";
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
				document.getElementById("busstopplaceholder").innerHTML=xmlhttp.responseText;
			}
	}
	xmlhttp.open("GET","getbusstop.php?schoolid=" + School_ID_Value,true);
	xmlhttp.send();
}

// Deletes the school
function DeleteSchoolThisValue(Delete_School_ID_Value) {
	var xmlhttp;
	if (DeleteSchoolThisValue=="")	{
		document.getElementById("deleteplaceholder").innerHTML="";
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
				document.getElementById("deleteplaceholder").innerHTML=xmlhttp.responseText;
			}
	}
	xmlhttp.open("GET","deleteschool.php?schoolid=" + Delete_School_ID_Value,true);
	xmlhttp.send();
}