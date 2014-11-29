// ------------------------------------------Ali coded items BELOW --------------------------------//
$(document).ready(function() {
	//
	// put variables back into their functions. keep global at a min
	// after create/update/delete, just reload the currently selected drop down and close the modal. no need to refresh the page.
	var i, j, y, x;
	var message;
	var Create_State_Name;
	var Response;
	var Login_Data;
	var Validate_Login_Data;
	var Email;
	var Password;
	var Encrypted_Password;
	var Button_ID;
	var Button_Class;
	var Button_Decision;
	var Old_Value; //
	var New_Value; //
	Check_Web_Storage();
	console.log("ready!");
	$.ajaxSetup({
		url: 'db.php',
		type: 'post',
		cache: 'false',
		async: false,
		success: function(data) {
			//alert('Ajax sent');
			console.log(data);
		},
		complete: function() {},
		error: function() {
			alert('Ajax failed');
		}
	});
	Read_States();
	$("#Select_States").change(function() {
		Index_Or_Dashboard_For_State();
		Reset_Districts();
		Reset_Schools();
		Reset_Bus_Stops();
		Reset_VAB_Button();
		Read_Districts();
		Select_Districts(Districts_Data);
	});
	$("#Select_Districts").change(function() {
		Index_Or_Dashboard_For_District();
		Reset_Schools();
		Reset_Bus_Stops();
		Reset_VAB_Button();
		Read_Schools();
		Select_Schools(Schools_Data);
	});
	$("#Select_Schools").change(function() {
		Index_Or_Dashboard_For_School();
		VAB_Button();
		Read_Bus_Stops();
		Table_Bus_Stops(Bus_Stops_Data);
		Select_Bus_Stop(Bus_Stops_Data);
	});
	$("#Select_Bus_Stop").change(function() {
		Bus_Stop_Number_UDC_Buttons();
	});
	$("#Login").click(function(e) {
		e.preventDefault();
		Login();
	});
	$("#Logout").click(function() {
		Logout();
	});
	$("#Create_State_Modal_Button").click(function(e) {
		Old_Value = "";
		New_Value = "";
		document.getElementById("Create_State_Name").value = "";
		Blur_Button(Old_Value, New_Value, Button_ID);
	});
	$("#Create_District_Modal_Button").click(function(e) {
		Old_Value = "";
		New_Value = "";
		document.getElementById("Create_District_Name").value = "";
		Blur_Button(Old_Value, New_Value, Button_ID);
	});
	$("#Create_School_Modal_Button").click(function(e) {
		Old_Value = "";
		New_Value = "";
		document.getElementById("Create_School_Name").value = "";
		document.getElementById("Create_School_Address").value = "";
		Blur_Button(Old_Value, New_Value, Button_ID);
	});
	$("#Create_Bus_Stop_Modal_Button").click(function(e) {
		Old_Value = "";
		New_Value = "";
		document.getElementById("Create_Bus_Stop_Number").value = "";
		document.getElementById("Create_Bus_Stop_Time").value = "";
		document.getElementById("Create_Bus_Stop_Address").value = "";
		Blur_Button(Old_Value, New_Value, Button_ID);
	});
	$("#Create_State_Name").change(function() {
		Old_Value = "";
		New_Value = document.getElementById("Create_State_Name").value;
		Button_ID = "Create_State";
		Blur_Button(Old_Value, New_Value, Button_ID);
	});
	$("#Create_District_Name").change(function() {
		Old_Value = "";
		New_Value = document.getElementById("Create_District_Name").value;
		Button_ID = "Create_District";
		Blur_Button(Old_Value, New_Value, Button_ID);
	});
	$("#Create_School_Name").change(function() {
		if (document.getElementById("Create_School_Address").value !== "") {
			Old_Value = "";
			New_Value = document.getElementById("Create_School_Name").value;
			Button_ID = "Create_School";
			Blur_Button(Old_Value, New_Value, Button_ID);
		}
	});
	$("#Create_School_Address").change(function() {
		if (document.getElementById("Create_School_Name").value !== "") {
			Old_Value = "";
			New_Value = document.getElementById("Create_School_Address").value;
			Button_ID = "Create_School";
			Blur_Button(Old_Value, New_Value, Button_ID);
		}
	});
	$("#Create_Bus_Stop_Number").change(function() {
		if (document.getElementById("Create_Bus_Stop_Time").value !== "" && document.getElementById("Create_Bus_Stop_Address").value !== "") {
			Old_Value = "";
			New_Value = document.getElementById("Create_Bus_Stop_Number").value;
			Button_ID = "Create_Bus_Stop";
			Blur_Button(Old_Value, New_Value, Button_ID);
		}
	});
	$("#Create_Bus_Stop_Time").change(function() {
		if (document.getElementById("Create_Bus_Stop_Number").value !== "" && document.getElementById("Create_Bus_Stop_Address").value !== "") {
			Old_Value = "";
			New_Value = document.getElementById("Create_Bus_Stop_Time").value;
			Button_ID = "Create_Bus_Stop";
			Blur_Button(Old_Value, New_Value, Button_ID);
		}
	});
	$("#Create_Bus_Stop_Address").change(function() {
		if (document.getElementById("Create_Bus_Stop_Time").value !== "" && document.getElementById("Create_Bus_Stop_Number").value !== "") {
			Old_Value = "";
			New_Value = document.getElementById("Create_Bus_Stop_Address").value;
			Button_ID = "Create_Bus_Stop";
			Blur_Button(Old_Value, New_Value, Button_ID);
		}
	});
	$("#Create_State").click(function(e) {
		e.preventDefault();
		Create_State();
	});
	$("#Create_District").click(function(e) {
		e.preventDefault();
		Create_District();
	});
	$("#Create_School").click(function(e) {
		e.preventDefault();
		Create_School();
	});
	$("#Create_Bus_Stop").click(function(e) {
		e.preventDefault();
		Create_Bus_Stop();
	});
	$("#Update_State_Modal_Button").click(function(e) {
		Display_Update_State();
	});
	$("#Update_District_Modal_Button").click(function(e) {
		Display_Update_District();
	});
	$("#Update_School_Modal_Button").click(function(e) {
		Display_Update_School();
	});
	$("#Update_Bus_Stop_Modal_Button").click(function(e) {
		Display_Update_Bus_Stop();
	});
	$("#Update_State_Name").change(function() {
		if (document.getElementById("Update_State_Name").value !== ""){
			Old_Value = State_Data[0].STATE_NAME;
			New_Value = document.getElementById("Update_State_Name").value;
			Button_ID = "Update_State";
			Blur_Button(Old_Value, New_Value, Button_ID);
		}
		else{
			Old_Value = "";
			New_Value = "";
			Button_ID = "Update_State";
			Blur_Button(Old_Value, New_Value, Button_ID);
		}
	});
	$("#Update_District_Name").change(function() {
		if (document.getElementById("Update_District_Name").value !== ""){
			Old_Value = District_Data[0].DISTRICT_NAME;
			New_Value = document.getElementById("Update_District_Name").value;
			Button_ID = "Update_District";
			Blur_Button(Old_Value, New_Value, Button_ID);
		}
		else{
			Old_Value = "";
			New_Value = "";
			Button_ID = "Update_District";
			Blur_Button(Old_Value, New_Value, Button_ID);
		}
	});
	$("#Update_School_Name").change(function() {
		if(document.getElementById("Update_School_Name").value !== ""){
			Old_Value = School_Data[0].SCHOOL_NAME;
			New_Value = document.getElementById("Update_School_Name").value;
			Button_ID = "Update_School";
			Blur_Button(Old_Value, New_Value, Button_ID);
		}
		else{
			Old_Value = "";
			New_Value = "";
			Button_ID = "Update_School";
			Blur_Button(Old_Value, New_Value, Button_ID);
		}
	});
	$("#Update_School_Address").change(function() {
		if(document.getElementById("Update_School_Address").value !== ""){
			Old_Value = School_Data[0].SCHOOL_NAME;
			New_Value = document.getElementById("Update_School_Address").value;
			Button_ID = "Update_School";
			Blur_Button(Old_Value, New_Value, Button_ID);
		}
		else{
			Old_Value = "";
			New_Value = "";
			Button_ID = "Update_School";
			Blur_Button(Old_Value, New_Value, Button_ID);
		}
	});
	$("#Update_Bus_Stop_Number").change(function() {
		if(document.getElementById("Update_Bus_Stop_Number").value !== ""){
			Old_Value = Bus_Stop_Data[0].BUS_STOP_NUMBER;
			New_Value = document.getElementById("Update_Bus_Stop_Number").value;
			var New_Bus_Stop_Number = New_Value;
			Button_ID = "Update_Bus_Stop";
			Blur_Button(Old_Value, New_Value, Button_ID);
		}
		else{
			Old_Value = "";
			New_Value = "";
			Button_ID = "Update_Bus_Stop";
			Blur_Button(Old_Value, New_Value, Button_ID);
		}
	});
	$("#Update_Bus_Stop_Time").change(function() {
		if(document.getElementById("Update_Bus_Stop_Time").value !== ""){
			Old_Value = Bus_Stop_Data[0].BUS_STOP_TIME;
			New_Value = document.getElementById("Update_Bus_Stop_Time").value;
			var New_Bus_Stop_Time = New_Value;
			Button_ID = "Update_Bus_Stop";
			Blur_Button(Old_Value, New_Value, Button_ID);
		}
		else{
			Old_Value = "";
			New_Value = "";
			Button_ID = "Update_Bus_Stop";
			Blur_Button(Old_Value, New_Value, Button_ID);
		}
	});
	$("#Update_Bus_Stop_Address").change(function() {
		if(document.getElementById("Update_Bus_Stop_Address").value !== ""){
			Old_Value = Bus_Stop_Data[0].BUS_STOP_ADDRESS;
			New_Value = document.getElementById("Update_Bus_Stop_Address").value;
			var New_Bus_Stop_Address = New_Value;
			Button_ID = "Update_Bus_Stop";
			Blur_Button(Old_Value, New_Value, Button_ID);
		}
		else{
			Old_Value = "";
			New_Value = "";
			Button_ID = "Update_Bus_Stop";
			Blur_Button(Old_Value, New_Value, Button_ID);
		}
	});
	$("#Update_State").click(function(e) {
		e.preventDefault();
		var New_State_Name = document.getElementById("Update_State_Name").value;
		Update_State(New_State_Name);
	});
	$("#Update_District").click(function(e) {
		e.preventDefault();
		var New_District_Name = document.getElementById("Update_District_Name").value;
		Update_District(New_District_Name);
	});
	$("#Update_School").click(function(e) {
		e.preventDefault();
		var New_School_Name = document.getElementById("Update_School_Name").value;
		var New_School_Address = document.getElementById("Update_School_Address").value;
		Update_School(New_School_Name, New_School_Address);
	});
	$("#Update_Bus_Stop").click(function(e) {
		e.preventDefault();
		var New_Bus_Stop_Number = document.getElementById("Update_Bus_Stop_Number").value;
		var New_Bus_Stop_Time = document.getElementById("Update_Bus_Stop_Time").value;
		var New_Bus_Stop_Address = document.getElementById("Update_Bus_Stop_Address").value;
		Update_Bus_Stop(New_Bus_Stop_Number, New_Bus_Stop_Time, New_Bus_Stop_Address);
	});
	$("#Delete_State_Modal_Button").click(function(e) {
		e.preventDefault();
		x = document.getElementById("Select_States").selectedIndex;
		y = document.getElementById("Select_States").options;
		var State_Name = y[x].text;
		message = "Are you sure you want to delete <b>" + State_Name + "</b> state?";
		document.getElementById("Delete_State_Place_Holder").innerHTML = message;
	});
	$("#Delete_District_Modal_Button").click(function(e) {
		e.preventDefault();
		x = document.getElementById("Select_Districts").selectedIndex;
		y = document.getElementById("Select_Districts").options;
		var State_Name = y[x].text;
		message = "Are you sure you want to delete <b>" + State_Name + "</b> district?";
		document.getElementById("Delete_District_Place_Holder").innerHTML = message;
	});
	$("#Delete_School_Modal_Button").click(function(e) {
		e.preventDefault();
		x = document.getElementById("Select_Schools").selectedIndex;
		y = document.getElementById("Select_Schools").options;
		var State_Name = y[x].text;
		message = "Are you sure you want to delete <b>" + State_Name + "</b>?";
		document.getElementById("Delete_School_Place_Holder").innerHTML = message;
	});
	$("#Delete_Bus_Stop_Modal_Button").click(function(e) {
		e.preventDefault();
		x = document.getElementById("Select_Bus_Stop").selectedIndex;
		y = document.getElementById("Select_Bus_Stop").options;
		var State_Name = y[x].text;
		message = "Are you sure you want to delete bus number: <b>" + State_Name + "</b>?";
		document.getElementById("Delete_Bus_Stop_Place_Holder").innerHTML = message;
	});
	$("#Delete_State").click(function(e) {
		e.preventDefault();
		Read_Districts();
		if (!$.trim(Districts_Data)){
			Delete_State();
		}
		else{
			alert("This state has districts, please remove them first");
		}
	});
	$("#Delete_District").click(function(e) {
		e.preventDefault();
		Read_Schools();
		if (!$.trim(Schools_Data)){
			Delete_District();
		}
		else{
			alert("This district has schools, please remove them first");
		}
	});
	$("#Delete_School").click(function(e) {
		e.preventDefault();
		Read_Bus_Stops();
		if (!$.trim(Bus_Stops_Data)){
			Delete_School();
		}
		else{
			alert("This school has bus stops, please remove them first");
		}
	});
	$("#Delete_Bus_Stop").click(function(e) {
		e.preventDefault();
		Delete_Bus_Stop();
	});
	$('#Delete_Account_Alert').on('click', function() {
		message = 'Your text goes here';
		Delete_Alert(message);
	});

	function Grab_Selected_State_ID() {
		var State_ID = document.getElementById("Select_States").value;
		return State_ID;
	}

	function Grab_Selected_District_ID() {
		var District_ID = document.getElementById("Select_Districts").value;
		return District_ID;
	}

	function Grab_Selected_School_ID() {
		var School_ID = document.getElementById("Select_Schools").value;
		return School_ID;
	}

	function Grab_Selected_Bus_Stop_ID() {
		var Bus_Stop_ID = document.getElementById("Select_Bus_Stop").value;
		return Bus_Stop_ID;
	}

	function Outgoing_Ajax(Ajax_Data) {
		Incoming_Ajax_Data = $.ajax({
			data: Ajax_Data
		}).responseText;
		return Incoming_Ajax_Data;
	}

	function Disable_Or_Enable_Button(Button_ID, Button_Decision) {
		document.getElementById(Button_ID).disabled = Button_Decision;
	}

	function Change_Button_Class(Button_ID, Button_Class) {
		document.getElementById(Button_ID).className = Button_Class;
	}

	function Blur_Button(Old_Value, New_Value, Button_ID, Button_Class) {
		if (Old_Value != New_Value) {
			Button_Decision = false;
			Button_Class = "btn btn-success"
			Disable_Or_Enable_Button(Button_ID, Button_Decision);
			Change_Button_Class(Button_ID, Button_Class);
		}
		else {
			Button_Decision = true;
			Button_Class = "btn btn-default";
			Disable_Or_Enable_Button(Button_ID, Button_Decision);
			Change_Button_Class(Button_ID, Button_Class);
		}
	}

	function Check_Create_Response(Create_Response_Data) {
		if (Create_Response_Data !== false) {
			window.location.href = 'dashboard.html';
		}
		else {
			alert('Create failed, please try again');
		}
	}

	function Check_Update_Response(Update_Response_Data) {
		if (Update_Response_Data !== false) {
			window.location.href = 'dashboard.html';
		}
		else {
			alert("Cannot update, contact your system administrator");
		}
	}

	function Check_Delete_Response(Delete_Response_Data) {
		if (Delete_Response_Data !== false) {
			window.location.href = 'dashboard.html';
		}
		else {
			alert("Cannot delete because blah blah created under it");
			window.location.href = 'dashboard.html';
		}
	}

	function Index_Or_Dashboard_For_State() {
		URL = document.URL;
		if (URL !== "http://alibkaba.com/cs604/Ali/Unit%20Testing/Find%20My%20Route/index1.html") {
			State_UDC_Buttons();
			Reset_District_UDC_Buttons();
			Reset_School_UDC_Buttons();
			Reset_Bus_Stop_UDC_Buttons();
			Reset_Bus_Stop();
		}
	}

	function Index_Or_Dashboard_For_District() {
		URL = document.URL;
		if (URL !== "http://alibkaba.com/cs604/Ali/Unit%20Testing/Find%20My%20Route/index1.html") {
			District_UDC_Buttons();
			Reset_School_UDC_Buttons();
			Reset_Bus_Stop_UDC_Buttons();
			Reset_Bus_Stop();
		}
	}

	function Index_Or_Dashboard_For_School() {
		URL = document.URL;
		if (URL !== "http://alibkaba.com/cs604/Ali/Unit%20Testing/Find%20My%20Route/index1.html") {
			School_UDC_Buttons();
			Reset_Bus_Stop_UDC_Buttons();
			Reset_Bus_Stop();
		}
	}

	function State_UDC_Buttons() {
		Button_Decision = false;
		Button_Class = "btn btn-info";
		Button_ID = "Update_State_Modal_Button";
		Disable_Or_Enable_Button(Button_ID, Button_Decision);
		Change_Button_Class(Button_ID, Button_Class);
		Button_ID = "Delete_State_Modal_Button";
		Button_Class = "btn btn-danger";
		Disable_Or_Enable_Button(Button_ID, Button_Decision);
		Change_Button_Class(Button_ID, Button_Class);
		Button_ID = "Create_District_Modal_Button";
		Button_Class = "btn btn-success";
		Disable_Or_Enable_Button(Button_ID, Button_Decision);
		Change_Button_Class(Button_ID, Button_Class);
	}

	function District_UDC_Buttons() {
		Button_Decision = false;
		Button_Class = "btn btn-info";
		Button_ID = "Update_District_Modal_Button";
		Disable_Or_Enable_Button(Button_ID, Button_Decision);
		Change_Button_Class(Button_ID, Button_Class);
		Button_ID = "Delete_District_Modal_Button";
		Button_Class = "btn btn-danger";
		Disable_Or_Enable_Button(Button_ID, Button_Decision);
		Change_Button_Class(Button_ID, Button_Class);
		Button_ID = "Create_School_Modal_Button";
		Button_Class = "btn btn-success";
		Disable_Or_Enable_Button(Button_ID, Button_Decision);
		Change_Button_Class(Button_ID, Button_Class);
	}

	function Reset_District_UDC_Buttons() {
		Button_Decision = true;
		Button_Class = "btn btn-default";
		Button_ID = "Update_District_Modal_Button";
		Disable_Or_Enable_Button(Button_ID, Button_Decision);
		Change_Button_Class(Button_ID, Button_Class);
		Button_ID = "Delete_District_Modal_Button";
		Button_Class = "btn btn-default";
		Disable_Or_Enable_Button(Button_ID, Button_Decision);
		Change_Button_Class(Button_ID, Button_Class);
		Button_ID = "Create_School_Modal_Button";
		Button_Class = "btn btn-default";
		Disable_Or_Enable_Button(Button_ID, Button_Decision);
		Change_Button_Class(Button_ID, Button_Class);
	}

	function School_UDC_Buttons() {
		Button_Decision = false;
		Button_Class = "btn btn-info";
		Button_ID = "Update_School_Modal_Button";
		Disable_Or_Enable_Button(Button_ID, Button_Decision);
		Change_Button_Class(Button_ID, Button_Class);
		Button_ID = "Delete_School_Modal_Button";
		Button_Class = "btn btn-danger";
		Disable_Or_Enable_Button(Button_ID, Button_Decision);
		Change_Button_Class(Button_ID, Button_Class);
		Button_ID = "Create_Bus_Stop_Modal_Button";
		Button_Class = "btn btn-success";
		Disable_Or_Enable_Button(Button_ID, Button_Decision);
		Change_Button_Class(Button_ID, Button_Class);
	}

	function Reset_School_UDC_Buttons() {
		Button_Decision = true;
		Button_Class = "btn btn-default";
		Button_ID = "Update_School_Modal_Button";
		Disable_Or_Enable_Button(Button_ID, Button_Decision);
		Change_Button_Class(Button_ID, Button_Class);
		Button_ID = "Delete_School_Modal_Button";
		Button_Class = "btn btn-default";
		Disable_Or_Enable_Button(Button_ID, Button_Decision);
		Change_Button_Class(Button_ID, Button_Class);
		Button_ID = "Create_Bus_Stop_Modal_Button";
		Button_Class = "btn btn-default";
		Disable_Or_Enable_Button(Button_ID, Button_Decision);
		Change_Button_Class(Button_ID, Button_Class);
	}

	function Bus_Stop_Number_UDC_Buttons() {
		Button_Decision = false;
		Button_Class = "btn btn-info";
		Button_ID = "Update_Bus_Stop_Modal_Button";
		Disable_Or_Enable_Button(Button_ID, Button_Decision);
		Change_Button_Class(Button_ID, Button_Class);
		Button_ID = "Delete_Bus_Stop_Modal_Button";
		Button_Class = "btn btn-danger";
		Disable_Or_Enable_Button(Button_ID, Button_Decision);
		Change_Button_Class(Button_ID, Button_Class);
	}

	function Reset_Bus_Stop_UDC_Buttons() {
		Button_Decision = true;
		Button_Class = "btn btn-default";
		Button_ID = "Update_Bus_Stop_Modal_Button";
		Disable_Or_Enable_Button(Button_ID, Button_Decision);
		Change_Button_Class(Button_ID, Button_Class);
		Button_ID = "Delete_Bus_Stop_Modal_Button";
		Button_Class = "btn btn-default";
		Disable_Or_Enable_Button(Button_ID, Button_Decision);
		Change_Button_Class(Button_ID, Button_Class);
	}

	function VAB_Button() {
		Button_Decision = false;
		Button_ID = "View_All_Buses_Button";
		Button_Class = "btn btn-success";
		Disable_Or_Enable_Button(Button_ID, Button_Decision);
		Change_Button_Class(Button_ID, Button_Class);
	}

	function Reset_VAB_Button() {
		Button_Decision = true;
		Button_Class = "btn btn-default";
		Button_ID = "View_All_Buses_Button";
		Disable_Or_Enable_Button(Button_ID, Button_Decision);
		Change_Button_Class(Button_ID, Button_Class);
		Reset_Bus_Stops();
	}

	function Read_States() {
		var action = "Read_States";
		var Ajax_Data = {
			action: action
		};
		Outgoing_Ajax(Ajax_Data);
		var States_Data = jQuery.parseJSON(Incoming_Ajax_Data);
		Select_States(States_Data);
	}

	function Read_Districts() {
		Grab_Selected_State_ID();
		var action = "Read_Districts";
		var Ajax_Data = {
			State_ID: State_ID,
			action: action
		};
		Outgoing_Ajax(Ajax_Data);
		var Districts_Data = jQuery.parseJSON(Incoming_Ajax_Data);
		return Districts_Data;
	}
	
	function Read_Schools() {
		Grab_Selected_District_ID();
		var action = "Read_Schools";
		var Ajax_Data = {
			District_ID: District_ID,
			action: action
		};
		Outgoing_Ajax(Ajax_Data);
		var Schools_Data = jQuery.parseJSON(Incoming_Ajax_Data);
		return Schools_Data;
	}
	
	function Read_Bus_Stops() {
		Grab_Selected_School_ID();
		var action = "Read_Bus_Stops";
		var Ajax_Data = {
			School_ID: School_ID,
			action: action
		};
		Outgoing_Ajax(Ajax_Data);
		var Bus_Stops_Data = jQuery.parseJSON(Incoming_Ajax_Data);
		return Bus_Stops_Data;
	}
	
	function Select_States(States_Data) {
		var select = document.getElementById("Select_States");
		for (i = 0; i < States_Data.length; i++) {
			select.options[select.options.length] = new Option(States_Data[i].STATE_NAME, States_Data[i].STATE_ID);
		}
	}
	
	function Select_Districts(Districts_Data) {
		var select = document.getElementById("Select_Districts");
		for (i = 0; i < Districts_Data.length; i++) {
			select.options[select.options.length] = new Option(Districts_Data[i].DISTRICT_NAME, Districts_Data[i].DISTRICT_ID);
		}
	}
	
	function Select_Schools(Schools_Data) {
		var select = document.getElementById("Select_Schools");
		for (i = 0; i < Schools_Data.length; i++) {
			select.options[select.options.length] = new Option(Schools_Data[i].SCHOOL_NAME, Schools_Data[i].SCHOOL_ID);
		}
	}

	function Select_Schools(Schools_Data) {
		var select = document.getElementById("Select_Schools");
		for (i = 0; i < Schools_Data.length; i++) {
			select.options[select.options.length] = new Option(Schools_Data[i].SCHOOL_NAME, Schools_Data[i].SCHOOL_ID);
		}
	}
	
	function Select_Bus_Stop(Bus_Stops_Data){
		var select = document.getElementById("Select_Bus_Stop");
		for (i = 0; i < Bus_Stops_Data.length; i++) {
			select.options[select.options.length] = new Option(Bus_Stops_Data[i].BUS_STOP_NUMBER, Bus_Stops_Data[i].BUS_STOP_ID);
		}
	}
	
	function Table_Bus_Stops(Bus_Stops_Data) {
		var Bus_Stops_Table = '<thead><tr><th>Bus #</th><th>Stop Time</th><th>Stop Address</th></tr></thead><tbody>';
		for (i = 0; i < Bus_Stops_Data.length; i++) {
			j = Bus_Stops_Data[i].BUS_STOP_NUMBER;
			Bus_Stops_Table += '<tr>';
			var Row_Span = 0;
			for (j = i; Bus_Stops_Data[i].BUS_STOP_NUMBER !== Last_Bus && j < Bus_Stops_Data.length && Bus_Stops_Data[j].BUS_STOP_NUMBER == Bus_Stops_Data[i].BUS_STOP_NUMBER; j++) {
				Row_Span++;
			}
			if (Row_Span > 0) {
				var Last_Bus = Bus_Stops_Data[i].BUS_STOP_NUMBER;
				Bus_Stops_Table += '<td rowspan="' + Row_Span + '">' + Last_Bus + '</td>';
			}
			Bus_Stops_Table += '<td>' + Bus_Stops_Data[i].BUS_STOP_TIME + '</td><td>' + Bus_Stops_Data[i].BUS_STOP_ADDRESS + '</td></tr>';
		}
		Bus_Stops_Table += '</tbody>';
		document.getElementById("Bus_Stops_Table").innerHTML = Bus_Stops_Table;
	}
	
	function Reset_Districts() {
		document.getElementById('Select_Districts').options.length = 1;
	}
	
	function Reset_Schools() {
		document.getElementById('Select_Schools').options.length = 1;
	}
	
	function Reset_Bus_Stop() {
		document.getElementById('Select_Bus_Stop').options.length = 1;
	}
	
	function Reset_Bus_Stops() {
		var Bus_Stops_Table = '<thead><tr><th>Bus #</th><th>Stop Time</th><th>Stop Address</th></tr></thead>';
		//document.getElementById("Bus_Stops_Table").innerHTML = Bus_Stops_Table;
	}

	function Delete_Alert() {
		message = 'Are you sure you want to delete your account?';
		document.getElementById("delete_alert_placeholder").innerHTML = '<div class="alert alert-danger" role="alert"><span>' + message + '</span><div class="form-group"><button type="button" class="btn btn-danger" id="Delete_Account">Yes, delete my account</button><button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button></div></div>';
	}

	function Login() {
		Email = document.forms["Login_Form"]["Email"].value;
		Password = document.forms["Login_Form"]["Password"].value;
		Encryption(Email, Password);
	}

	function Encryption(Email, Password) {
		//temporary using clear text
		Encrypted_Password = Password;
		Validate_Login(Email, Encrypted_Password);
	}

	function Validate_Login(Email, Encrypted_Password) {
		var action = "Validate_Login";
		Validate_Login_Data = {
			Email: Email,
			Encrypted_Password: Encrypted_Password,
			action: action
		};
		Login_Data = $.ajax({
			data: Validate_Login_Data
		}).responseText;
		Login_Status(Email, Login_Data);
	}

	function Login_Status(Email, Login_Data) {
		if (Login_Data !== '0') {
			localStorage.setItem("email", Email);
			window.location.href = 'dashboard.html';
		}
		else {
			alert('Incorrect login credentials');
		}
	}

	function Check_Web_Storage() {
		if (typeof(Storage) !== "undefined") {
			Start_Web_Storage();
		}
		else {
			alert('Sorry, your browser does not support Web Storage...');
		}
	}

	function Start_Web_Storage() {
		Storage_Email = localStorage.getItem("email");
		if (Storage_Email !== null) {
			Logged_In();
			document.getElementById("login_placeholder").innerHTML = '<p class="navbar-text">Signed in as ' + Storage_Email + '</p>';
		}
		else {
			Navigation_Right_Logged_Out();
		}
	}

	function Logout() {
		End_Web_Storage(Email);
		window.location.href = "index1.html";
	}

	function End_Web_Storage(Email) {
		localStorage.removeItem("email");
	}

	function Logged_In() {
		Navigation_Right_Logged_In();
	}

	function Navigation_Right_Logged_In() {
		document.getElementById("navbar_right_placeholder").innerHTML = '<li> <a data-target="#AccountModal" data-toggle="modal" href="#"><span class="glyphicon glyphicon-user"></span>Account</a> </li><li> <a data-target="#LogoutModal" data-toggle="modal" href="#" id="Logout"><span class="glyphicon glyphicon-log-out"></span>Logout</a> </li>';
	}

	function Navigation_Right_Logged_Out() {
		document.getElementById("navbar_right_placeholder").innerHTML = '<li><a data-target="#LoginModal" data-toggle="modal" href="#"><span class="glyphicon glyphicon-log-in"></span>Login</a> </li>';
	}

	function Create_State() {
		var State_Name = document.getElementById("Create_State_Name").value;
		var action = "Create_State";
		var Ajax_Data = {
			State_Name: State_Name,
			action: action
		};
		Outgoing_Ajax(Ajax_Data);
		Create_Response_Data = jQuery.parseJSON(Incoming_Ajax_Data);
		Check_Create_Response(Create_Response_Data);
	}

	function Create_District() {
		Grab_Selected_State_ID();
		District_Name = document.getElementById("Create_District_Name").value;
		var action = "Create_District";
		var Ajax_Data = {
			State_ID: State_ID,
			District_Name: District_Name,
			action: action
		};
		Outgoing_Ajax(Ajax_Data);
		Create_Response_Data = jQuery.parseJSON(Incoming_Ajax_Data);
		Check_Create_Response(Create_Response_Data);
	}

	function Create_School() {
		Grab_Selected_District_ID();
		School_Name = document.getElementById("Create_School_Name").value;
		School_Address = document.getElementById("Create_School_Address").value;
		var action = "Create_School";
		var Ajax_Data = {
			District_ID: District_ID,
			School_Name: School_Name,
			School_Address: School_Address,
			action: action
		};
		Outgoing_Ajax(Ajax_Data);
		Create_Response_Data = jQuery.parseJSON(Incoming_Ajax_Data);
		Check_Create_Response(Create_Response_Data);
	}

	function Create_Bus_Stop() {
		Grab_Selected_School_ID();
		Bus_Stop_Number = document.getElementById("Create_Bus_Stop_Number").value;
		Bus_Stop_Time = document.getElementById("Create_Bus_Stop_Time").value;
		Bus_Stop_Address = document.getElementById("Create_Bus_Stop_Address").value;
		Bus_Stop_Latitude = "22"; //temp
		Bus_Stop_Longitude = "11"; //temp
		var action = "Create_Bus_Stop";
		var Ajax_Data = {
			School_ID: School_ID,
			Bus_Stop_Number: Bus_Stop_Number,
			Bus_Stop_Time: Bus_Stop_Time,
			Bus_Stop_Address: Bus_Stop_Address,
			Bus_Stop_Latitude: Bus_Stop_Latitude,
			Bus_Stop_Longitude: Bus_Stop_Longitude,
			action: action
		};
		Outgoing_Ajax(Ajax_Data);
		Create_Response_Data = jQuery.parseJSON(Incoming_Ajax_Data);
		Check_Create_Response(Create_Response_Data);
	}

	function Display_Update_State() {
		Grab_Selected_State_ID();
		var action = "Get_State_Data";
		var Ajax_Data = {
			State_ID: State_ID,
			action: action
		};
		Outgoing_Ajax(Ajax_Data);
		State_Data = jQuery.parseJSON(Incoming_Ajax_Data);
		document.getElementById("Update_State_Name").value = State_Data[0].STATE_NAME;
	}

	function Display_Update_District() {
		Grab_Selected_District_ID();
		var action = "Get_District_Data";
		var Ajax_Data = {
			District_ID: District_ID,
			action: action
		};
		Outgoing_Ajax(Ajax_Data);
		District_Data = jQuery.parseJSON(Incoming_Ajax_Data);
		document.getElementById("Update_District_Name").value = District_Data[0].DISTRICT_NAME;
	}
	
	function Display_Update_School() {
		Grab_Selected_School_ID();
		var action = "Get_School_Data";
		var Ajax_Data = {
			School_ID: School_ID,
			action: action
		};
		Outgoing_Ajax(Ajax_Data);
		School_Data = jQuery.parseJSON(Incoming_Ajax_Data);
		document.getElementById("Update_School_Name").value = School_Data[0].SCHOOL_NAME;
		document.getElementById("Update_School_Address").value = School_Data[0].SCHOOL_ADDRESS;
	}
	
	function Display_Update_Bus_Stop(){
		Grab_Selected_Bus_Stop_ID();
		var action = "Get_Bus_Stop_Data";
		var Ajax_Data = {
			Bus_Stop_ID: Bus_Stop_ID,
			action: action
		};
		Outgoing_Ajax(Ajax_Data);
		Bus_Stop_Data = jQuery.parseJSON(Incoming_Ajax_Data);
		document.getElementById("Update_Bus_Stop_Number").value = Bus_Stop_Data[0].BUS_STOP_NUMBER;
		document.getElementById("Update_Bus_Stop_Time").value = Bus_Stop_Data[0].BUS_STOP_TIME;
		document.getElementById("Update_Bus_Stop_Address").value = Bus_Stop_Data[0].BUS_STOP_ADDRESS;
	}
	
	function Update_State(New_State_Name) {
		Grab_Selected_State_ID();
		var action = "Update_State";
		var Ajax_Data = {
			State_ID: State_ID,
			New_State_Name: New_State_Name,
			action: action
		};
		Outgoing_Ajax(Ajax_Data);
		Update_Response_Data = jQuery.parseJSON(Incoming_Ajax_Data);
		Check_Update_Response(Update_Response_Data);
	}

	function Update_District(New_District_Name) {
		Grab_Selected_District_ID();
		var action = "Update_District";
		var Ajax_Data = {
			District_ID: District_ID,
			New_District_Name: New_District_Name,
			action: action
		};
		Outgoing_Ajax(Ajax_Data);
		Update_Response_Data = jQuery.parseJSON(Incoming_Ajax_Data);
		Check_Update_Response(Update_Response_Data);
	}
	
	function Update_School(New_School_Name, New_School_Address){
		Grab_Selected_School_ID();
		var action = "Update_School";
		var Ajax_Data = {
			School_ID: School_ID,
			New_School_Name: New_School_Name,
			New_School_Address: New_School_Address,
			action: action
		};
		Outgoing_Ajax(Ajax_Data);
		Update_Response_Data = jQuery.parseJSON(Incoming_Ajax_Data);
		Check_Update_Response(Update_Response_Data);
	}
	
	function Update_Bus_Stop(Bus_Stop_ID, New_Bus_Stop_Number, New_Bus_Stop_Time, New_Bus_Stop_Address){
		Grab_Selected_Bus_Stop_ID();
		var action = "Update_Bus_Stop";
		New_Bus_Stop_Latitude = "22"; //temp
		New_Bus_Stop_Longitude = "11"; //temp
		var Ajax_Data = {
			Bus_Stop_ID: Bus_Stop_ID,
			New_Bus_Stop_Number: New_Bus_Stop_Number,
			New_Bus_Stop_Time: New_Bus_Stop_Time,
			New_Bus_Stop_Address: New_Bus_Stop_Address,
			New_Bus_Stop_Latitude: New_Bus_Stop_Latitude,
			New_Bus_Stop_Longitude: New_Bus_Stop_Longitude,
			action: action
		};
		Outgoing_Ajax(Ajax_Data);
		Update_Response_Data = jQuery.parseJSON(Incoming_Ajax_Data);
		Check_Update_Response(Update_Response_Data);
	}
	
	function Delete_State() {
		Grab_Selected_State_ID();
		var action = "Delete_State";
		var Ajax_Data = {
			State_ID: State_ID,
			action: action
		};
		Outgoing_Ajax(Ajax_Data);
		Delete_Response_Data = jQuery.parseJSON(Incoming_Ajax_Data);
		Check_Delete_Response(Delete_Response_Data);
	}
	
	function Delete_District() {
		Grab_Selected_District_ID();
		var action = "Delete_District";
		var Ajax_Data = {
			District_ID: District_ID,
			action: action
		};
		Outgoing_Ajax(Ajax_Data);
		Delete_Response_Data = jQuery.parseJSON(Incoming_Ajax_Data);
		Check_Delete_Response(Delete_Response_Data);
	}
	
	function Delete_School() {
		Grab_Selected_School_ID();
		var action = "Delete_School";
		var Ajax_Data = {
			School_ID: School_ID,
			action: action
		};
		Outgoing_Ajax(Ajax_Data);
		Delete_Response_Data = jQuery.parseJSON(Incoming_Ajax_Data);
		Check_Delete_Response(Delete_Response_Data);
	}
	
	function Delete_Bus_Stop() {
		Grab_Selected_Bus_Stop_ID();
		var action = "Delete_Bus_Stop";
		var Ajax_Data = {
			Bus_Stop_ID: Bus_Stop_ID,
			action: action
		};
		Outgoing_Ajax(Ajax_Data);
		Delete_Response_Data = jQuery.parseJSON(Incoming_Ajax_Data);
		Check_Delete_Response(Delete_Response_Data);
	}

});
// ------------------------------------------Ali coded items ABOVE --------------------------------//