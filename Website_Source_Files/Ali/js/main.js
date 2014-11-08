$(document).ready(function(){
	// ajax setup
	$.ajaxSetup({
		url: 'db.php',
		type: 'POST',
		cache: 'false',
		success: function(){
			alert('success');
		},
		error: function(){
			alert('failure');
		}
	});

	// any voting button (up/down) clicked event
	$('#gogo').click(function(){
		var AD = "Address";
		var LA = "latitude";
		var LO = "longitude";
		var action = "WriteCoordinates";
		var data = {'AD' : AD, 'LA' : LA, 'LO' : LO,'action' : action };
		
		$.ajax({data: {'AD' : AD, 'LA' : LA, 'LO' : LO,'action' : action }});
		alert('AD= ' + AD + ' LA= ' + LA  + ' LO= ' + LO + ' action= ' + action);
	});
});

function WriteCoordinates(Address, Latitude, Longitude) {

}

function ReadCoordinates(Address, Latitude, Longitude) {

}

function ReadCoordinates(Address, Latitude, Longitude) {

}