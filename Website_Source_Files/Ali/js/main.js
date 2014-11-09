$(document).ready(function(){

	var Address = "park ave"; // PUT google's variables in this
	var Latitude = "1111"; // PUT google's variables in this
	var Longitude = "2222"; // PUT google's variables in this
	var action = "WriteCoordinates";
	var myData = {Address: Address, Latitude: Latitude, Longitude: Longitude, action: action};
	
	$('#gogo').click(function(){
		$.ajax({data: myData});
	});
	
	$.ajaxSetup({
		url: 'db.php',
		type: 'post',
		cache: 'false',
		success: function(data){
			console.log(data);
		},
		error: function(){
			alert('failure');
		}
	});
	
});