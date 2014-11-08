$(document).ready(function(){
	var AD = "park ave";
	var LA = "1111";
	var LO = "2222";
	var action = "WriteCoordinates";
	//var myData = " address is: " + AD + " latitude is: " + LA + " longitude is: " + LO + " action is: " + action;
	var myData = {AD: "park ave"};
	
	$('#gogo').click(function(){
		$.ajax({data: myData});
	});
	
	$.ajaxSetup({
		url: 'db.php',
		type: 'POST',
		cache: 'false',
		data: myData,
		success: function(data){
			alert('data');
			console.log(data);
		},
		error: function(){
			alert('failure');
		}
	});
});

function WriteCoordinates(Address, Latitude, Longitude) {

}

function ReadCoordinates(Address, Latitude, Longitude) {

}

function ReadCoordinates(Address, Latitude, Longitude) {

}