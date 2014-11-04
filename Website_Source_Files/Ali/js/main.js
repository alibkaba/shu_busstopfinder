$(document).ready(function(){
	var State_ID_For_District = "";
	

	$.ajaxSetup({
		url: "db.php",
		type: "POST",
		cache: "false"
	});
	
	$("#state_form_id").change(function(){
		State_ID_For_District = $("#state_form_id :selected").val();
		return State_ID_For_District;
	});
	
	$("#state_form_id").click(function(State_ID_For_District){
	alert("State_ID_For_District is=" + State_ID_For_District);
	});
});
