// ------------------------------------------Ali coded items BELOW --------------------------------//
$(document).ready(function() {
	var action; //
	var Ajax_Data; //
	var State_ID;
	var District_ID;
	var School_ID;
	var States_Data;
	var Districts_Data;
	var Schools_Data;
	var Read_States_Data;
	var Read_Districts_Data;
	var Read_Schools_Data;
	var Bus_Stops_Data;
	var Read_Bus_Stops_Data
	var select;
	var i, j, y, x;
	var Last_Bus;
	var Bus_Stops_Table;
	var Row_Span;
	var message;
	var State_Name;
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
	});
	$("#Login").click(function(e) {
		e.preventDefault();
		Login();
	});
	$("#Logout").click(function() {
		Logout();
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
		Old_Value = "";
		New_Value = document.getElementById("Create_School_Name").value;
		Button_ID = "Create_School";
		Blur_Button(Old_Value, New_Value, Button_ID);
	});
	$("#Create_School_Address").change(function() {
		Old_Value = "";
		New_Value = document.getElementById("Create_School_Address").value;
		Button_ID = "Create_School";
		Blur_Button(Old_Value, New_Value, Button_ID);
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
		Grab_Selected_State_ID();
		Display_Update_State(State_ID);
	});
	$("#Update_District_Modal_Button").click(function(e) {
		Grab_Selected_District_ID();
		Display_Update_District(District_ID);
	});
	$("#Update_State_Name").change(function() {
		Old_Value = State_Data[0].STATE_NAME;
		New_Value = document.getElementById("Update_State_Name").value;
		Button_ID = "Update_State";
		Blur_Button(Old_Value, New_Value, Button_ID);
	});
	$("#Update_State").click(function(e) {
		e.preventDefault();
		State_ID = Display_Update_State(State_ID);
		New_State_Name = New_Value;
		document.getElementById("Update_State_Name").value = New_State_Name;
		Update_State(State_ID, New_State_Name);
	});
	$("#Update_District_Name").change(function() {
		Old_Value = District_Data[0].DISTRICT_NAME;
		New_Value = document.getElementById("Update_District_Name").value;
		Button_ID = "Update_District";
		Blur_Button(Old_Value, New_Value, Button_ID);
	});
	$("#Update_District").click(function(e) {
		e.preventDefault();
		District_ID = Display_Update_District(District_ID);
		New_State_Name = New_Value;
		document.getElementById("Update_District_Name").value = New_District_Name;
		Update_District(District_ID, New_District_Name);
	});
	$("#Delete_State_Modal_Button").click(function(e) {
		e.preventDefault();
		x = document.getElementById("Select_States").selectedIndex;
		y = document.getElementById("Select_States").options;
		State_Name = y[x].text;
		message = "Are you sure you want to delete <b>" + State_Name + "</b>";
		document.getElementById("Delete_State_Place_Holder").innerHTML = message;
	});
	$("#Delete_State").click(function(e) {
		e.preventDefault();
		Grab_Selected_State_ID();
		Delete_State(State_ID);
	});
	$('#Delete_Account_Alert').on('click', function() {
		message = 'Your text goes here';
		Delete_Alert(message);
	});
	//Reused
	function Grab_Selected_State_ID() {
		State_ID = document.getElementById("Select_States").value;
		return State_ID;
	}

	function Grab_Selected_District_ID() {
		District_ID = document.getElementById("Select_Districts").value;
		return District_ID;
	}

	function Grab_Selected_School_ID() {
		School_ID = document.getElementById("Select_Schools").value;
		return School_ID;
	}

	function Grab_Selected_Bus_Stop_ID() {}

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
			Reset_Bus_Number_UDC_Buttons();
		}
	}

	function Index_Or_Dashboard_For_District() {
		URL = document.URL;
		if (URL !== "http://alibkaba.com/cs604/Ali/Unit%20Testing/Find%20My%20Route/index1.html") {
			District_UDC_Buttons();
			Reset_School_UDC_Buttons();
			Reset_Bus_Number_UDC_Buttons();
		}
	}

	function Index_Or_Dashboard_For_School() {
			URL = document.URL;
			if (URL !== "http://alibkaba.com/cs604/Ali/Unit%20Testing/Find%20My%20Route/index1.html") {
				School_UDC_Buttons();
				Reset_Bus_Number_UDC_Buttons();
			}
		}
		//End Reused
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
		Button_ID = "Create_Bus_Number_Modal_Button";
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
		Button_ID = "Create_Bus_Number_Modal_Button";
		Button_Class = "btn btn-default";
		Disable_Or_Enable_Button(Button_ID, Button_Decision);
		Change_Button_Class(Button_ID, Button_Class);
	}

	function Bus_Number_UDC_Buttons() {
		Button_Decision = false;
		Button_Class = "btn btn-info";
		Button_ID = "Update_Bus_Number_Modal_Button";
		Disable_Or_Enable_Button(Button_ID, Button_Decision);
		Change_Button_Class(Button_ID, Button_Class);
		Button_ID = "Delete_Bus_Number_Modal_Button";
		Button_Class = "btn btn-danger";
		Disable_Or_Enable_Button(Button_ID, Button_Decision);
		Change_Button_Class(Button_ID, Button_Class);
	}

	function Reset_Bus_Number_UDC_Buttons() {
		Button_Decision = true;
		Button_Class = "btn btn-default";
		Button_ID = "Update_Bus_Number_Modal_Button";
		Disable_Or_Enable_Button(Button_ID, Button_Decision);
		Change_Button_Class(Button_ID, Button_Class);
		Button_ID = "Delete_Bus_Number_Modal_Button";
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

	function Reset_Bus_Stops() {
		Bus_Stops_Table = '<thead><tr><th>Bus #</th><th>Stop Time</th><th>Stop Address</th></tr></thead>';
		//document.getElementById("Bus_Stops_Table").innerHTML = Bus_Stops_Table;
	}

	function Read_States() {
		action = "Read_States";
		Ajax_Data = {
			action: action
		};
		Outgoing_Ajax(Ajax_Data);
		States_Data = jQuery.parseJSON(Incoming_Ajax_Data);
		Select_States(States_Data);
	}

	function Select_States(States_Data) {
		select = document.getElementById("Select_States");
		for (i = 0; i < States_Data.length; i++) {
			select.options[select.options.length] = new Option(States_Data[i].STATE_NAME, States_Data[i].STATE_ID);
		}
	}

	function Read_Districts() {
		Grab_Selected_State_ID();
		action = "Read_Districts";
		Ajax_Data = {
			State_ID: State_ID,
			action: action
		};
		Outgoing_Ajax(Ajax_Data);
		Districts_Data = jQuery.parseJSON(Incoming_Ajax_Data);
		return Districts_Data;
	}

	function Select_Districts(Districts_Data) {
		select = document.getElementById("Select_Districts");
		for (i = 0; i < Districts_Data.length; i++) {
			select.options[select.options.length] = new Option(Districts_Data[i].DISTRICT_NAME, Districts_Data[i].DISTRICT_ID);
		}
	}

	function Reset_Districts() {
		document.getElementById('Select_Districts').options.length = 1;
	}

	function Read_Schools() {
		Grab_Selected_District_ID();
		action = "Read_Schools";
		Ajax_Data = {
			District_ID: District_ID,
			action: action
		};
		Outgoing_Ajax(Ajax_Data);
		Schools_Data = jQuery.parseJSON(Incoming_Ajax_Data);
		return Schools_Data;
	}

	function Select_Schools(Schools_Data) {
		select = document.getElementById("Select_Schools");
		for (i = 0; i < Schools_Data.length; i++) {
			select.options[select.options.length] = new Option(Schools_Data[i].SCHOOL_NAME, Schools_Data[i].SCHOOL_ID);
		}
	}

	function Reset_Schools() {
		document.getElementById('Select_Schools').options.length = 1;
	}

	function Read_Bus_Stops() {
		Grab_Selected_School_ID();
		action = "Read_Bus_Stops";
		Ajax_Data = {
			School_ID: School_ID,
			action: action
		};
		Outgoing_Ajax(Ajax_Data);
		Bus_Stops_Data = jQuery.parseJSON(Incoming_Ajax_Data);
		return Bus_Stops_Data;
	}

	function Table_Bus_Stops(Bus_Stops_Data) {
		Bus_Stops_Table = '<thead><tr><th>Bus #</th><th>Stop Time</th><th>Stop Address</th></tr></thead><tbody>';
		for (i = 0; i < Bus_Stops_Data.length; i++) {
			j = Bus_Stops_Data[i].BUS_NUMBER;
			Bus_Stops_Table += '<tr>';
			Row_Span = 0;
			for (j = i; Bus_Stops_Data[i].BUS_NUMBER !== Last_Bus && j < Bus_Stops_Data.length && Bus_Stops_Data[j].BUS_NUMBER == Bus_Stops_Data[i].BUS_NUMBER; j++) {
				Row_Span++;
			}
			if (Row_Span > 0) {
				Last_Bus = Bus_Stops_Data[i].BUS_NUMBER;
				Bus_Stops_Table += '<td rowspan="' + Row_Span + '">' + j + '</td>';
			}
			Bus_Stops_Table += '<td>' + Bus_Stops_Data[i].BUS_STOP_TIME + '</td><td>' + Bus_Stops_Data[i].BUS_STOP_ADDRESS + '</td></tr>';
		}
		Bus_Stops_Table += '</tbody>';
		document.getElementById("Bus_Stops_Table").innerHTML = Bus_Stops_Table;
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
		action = "Validate_Login";
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
		State_Name = document.getElementById("Create_State_Name").value;
		action = "Create_State";
		Ajax_Data = {
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
		action = "Create_District";
		Ajax_Data = {
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
		action = "Create_School";
		Ajax_Data = {
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
		Bus_Number = document.getElementById("Create_Bus_Number").value;
		Bus_Stop_Time = document.getElementById("Create_Bus_Stop_Time").value;
		Bus_Stop_Address = document.getElementById("Create_Bus_Stop_Address").value;
		action = "Create_Bus_Stop";
		Ajax_Data = {
			School_ID: School_ID,
			Bus_Number: Bus_Number,
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

	function Display_Update_State(State_ID) {
		action = "Get_State_Data";
		Ajax_Data = {
			State_ID: State_ID,
			action: action
		};
		Outgoing_Ajax(Ajax_Data);
		State_Data = jQuery.parseJSON(Incoming_Ajax_Data);
		document.getElementById("Update_State_Name").value = State_Data[0].STATE_NAME;
		return State_ID;
	}
	
	function Display_Update_District(District_ID) {
		action = "Get_District_Data";
		Ajax_Data = {
			District_ID: District_ID,
			action: action
		};
		Outgoing_Ajax(Ajax_Data);
		State_Data = jQuery.parseJSON(Incoming_Ajax_Data);
		document.getElementById("Update_District_Name").value = District_Data[0].DISTRICT_NAME;
		return District_ID;
	}

	function Update_State(State_ID, New_State_Name) {
		action = "Update_State";
		Ajax_Data = {
			State_ID: State_ID,
			New_State_Name: New_State_Name,
			action: action
		};
		Outgoing_Ajax(Ajax_Data);
		Update_Response_Data = jQuery.parseJSON(Incoming_Ajax_Data);
		Check_Update_Response(Update_Response_Data);
	}
	
	function Update_District(District_ID, New_District_Name) {
		action = "Update_District";
		Ajax_Data = {
			District_ID: District_ID,
			New_District_Name: New_District_Name,
			action: action
		};
		Outgoing_Ajax(Ajax_Data);
		Update_Response_Data = jQuery.parseJSON(Incoming_Ajax_Data);
		Check_Update_Response(Update_Response_Data);
	}

	function Delete_State(State_ID) {
		action = "Delete_State";
		Ajax_Data = {
			State_ID: State_ID,
			action: action
		};
		Outgoing_Ajax(Ajax_Data);
		Delete_Response_Data = jQuery.parseJSON(Incoming_Ajax_Data);
		Check_Delete_Response(Delete_Response_Data);
	}
});
// ------------------------------------------Ali coded items ABOVE --------------------------------//
// ------------------------------------------Marlon coded items BELOW --------------------------------//
function Initialize_Google_Maps_API() {
	//-----------load SQL values here--------------
	var School_District_Lat = 41.117744;
	var School_District_Lng = -73.4081575;
	var Bus_Stops = Get_Bus_Stops();
	Map_Address(School_District_Lat, School_District_Lng, null);
	Display_Stops_Pannel(Bus_Stops);
	//return true;
}

function Create_Bus_Stop_Object(Stop_Time, Stop_Address) {
	if (typeof Stop_Time != 'undefined' && typeof Stop_Address != 'undefined') {
		this.Stop_Time = Stop_Time;
		this.Stop_Address = Stop_Address;
		this.Distance_to_Stop = 0;
		this.Latitude = 0;
		this.Longitude = 0;
		this.Stop_ID = 0;
		return this;
	}
	else {
		console.log("Cannot create Bus Stop Object because it is missing data");
		return false;
	}
}

function Validate_Bus_Stop_Object(Bus_Stop_Object) {
	if (typeof Bus_Stop_Object != 'undefined' && Bus_Stop_Object.Stop_Time != null && Bus_Stop_Object.Stop_Address != null) {
		return true;
	}
	else {
		console.log("Bus Stop Object is invalid");
		return false;
	}
}

function Get_Bus_Stops_for_School(School_ID) {
	//Bus_Stops = QueryDBfor(School_ID)
	var Bus_Stop_Objects = [];
	Bus_Stop_Objects = Get_Bus_Stops();
	return Bus_Stop_Objects;
}

function Get_Bus_Stops() {
	var Bus_Stops = [];
	Bus_Stops[0] = {
		Stop_Time: "9:00",
		Stop_Address: "RIVERSIDE AV & HILL ST norwalk ct",
		Distance_to_Stop: 1,
		Latitude: 41.117744,
		Longitude: 41.117744
	};
	Bus_Stops[1] = {
		Stop_Time: null,
		Stop_Address: "PONUS AV & ELLS ST norwalk ct",
		Distance_to_Stop: 1.5,
		Latitude: null,
		Longitude: null
	};
	Bus_Stops[2] = {
		Stop_Time: null,
		Stop_Address: "PONUS AV & CORNWALL RD norwalk ct",
		Distance_to_Stop: 2.5,
		Latitude: null,
		Longitude: null
	};
	Bus_Stops[3] = {
		Stop_Time: null,
		Stop_Address: "GLEN AV & SHORT ST norwalk ct",
		Distance_to_Stop: 0.5,
		Latitude: null,
		Longitude: null
	}
	Bus_Stops[4] = {
		Stop_Time: null,
		Stop_Address: "LEDGEWOOD DR & STYLES LA norwalk ct",
		Distance_to_Stop: 2.5,
		Latitude: null,
		Longitude: null
	}
	Bus_Stops[5] = {
		Stop_Time: null,
		Stop_Address: "STYLES AV & PENNY LA norwalk ct",
		Distance_to_Stop: 0.65,
		Latitude: null,
		Longitude: null
	}
	Bus_Stops[6] = {
		Stop_Time: null,
		Stop_Address: "PONUS AV & LANCASTER DR norwalk ct",
		Distance_to_Stop: 6,
		Latitude: null,
		Longitude: null
	}
	Bus_Stops[7] = {
		Stop_Time: null,
		Stop_Address: "MAHER DR & STEPPINGSTONE PL norwalk ct",
		Distance_to_Stop: 1.2,
		Latitude: null,
		Longitude: null
	}
	return Bus_Stops;
}

function Map_Address(latitude, longitude, address) {
	var Display_Map;
	var map;
	Display_Map = new google.maps.DirectionsRenderer();
	var address = new google.maps.LatLng(latitude, longitude);
	var mapOptions = {
		zoom: 13,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		center: address
	};
	map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
	//alert(typeof map);
	Display_Map.setMap(map);
}

function Display_Stops_Pannel(Bus_Stops) {
	var AddressPanel = document.getElementById('addresses_panel');
	AddressPanel.innerHTML = '';
	for (var Bus_Stop_Address = 0; Bus_Stop_Address < Bus_Stops.length; Bus_Stop_Address++) {
		AddressPanel.innerHTML += Bus_Stops[Bus_Stop_Address].Stop_Address + '</b><br>';
	}
}

function Get_Shortest_Distance_To_Stops(User_Address, Bus_Stops) {
	var Shortest_distance = Bus_Stops[0].Distance_to_Stop;
	var Bus_Stop_Address;
	for (var stop = 1; stop < Bus_Stops.length; stop++) {
		if (Bus_Stops[stop].Distance_to_Stop < Shortest_distance && typeof Bus_Stops[stop].Distance_to_Stop != 'undefined') {
			Shortest_distance = Bus_Stops[stop].Distance_to_Stop;
			Bus_Stop_Address = Bus_Stops[stop].Stop_Address;
		}
		if (typeof Bus_Stops[stop].Distance_to_Stop == 'undefined') {
			alert("Distance to Bus Stop is undefined")
		}
	}
	var Bus_Stop = {
		Address: Bus_Stop_Address,
		Distance: Shortest_distance
	};
	return Bus_Stop;
	//Map_Shortest_Bus_Stop(User_Address, Bus_Stop_Address)
}

function Calculate_Distance_To_Stops(User_Address) {
	var latitude = 41.117744,
		longitude = -73.4081575;
	var Array_position = 0;
	var Google_Directions_Service = new google.maps.DirectionsService();
	var New_Map = new google.maps.LatLng(latitude, longitude);
	var Map_Options = {
		zoom: 15,
		center: New_Map
	};
	var map = new google.maps.Map(document.getElementById("map-canvas"), Map_Options);
	var Bus_Stops = Get_Bus_Stops();
	for (var Bus_Stop = 0; Bus_Stop < Bus_Stops.length; Bus_Stop++) {
		var Directions_Request = {
			origin: User_Address,
			destination: Bus_Stops[Bus_Stop].Stop_Address,
			travelMode: google.maps.TravelMode.DRIVING
		};
		Google_Directions_Service.route(Directions_Request, function(response, status) {
			if (status == google.maps.DirectionsStatus.OK) {
				var route = response.routes[0];
				for (var route_leg = 0; route_leg < route.legs.length; route_leg++) { //should be one only
					var distance = parseFloat(route.legs[route_leg].distance.text)
					Bus_Stops[Array_position].Distance_to_Stop = distance;
				}
				Array_position = Array_position + 1;
				if (Array_position == Bus_Stops.length) { //Must pass array at this point
					Get_Shortest_Distance_To_Stops(User_Address, Bus_Stops)
				}
			}
			else {
				alert("Address not found via Geocoder will need to use Geolocation for iteration 2")
			}
		});
	}
}

function Process_Coordinates(Address) {
	var Location = Get_PHPCoordinates(Address);
	alert("Process Coordinates from PHP results are: " + Location.Latitude + ", " + Location.Longitude);
}

function Get_PHPCoordinates(Address) {
		var action = "Geocode_PHP";
		var Read_Geocode_Data = {
			Address: Address,
			action: action
		};
		var Coordinates = $.ajax({
			data: Read_Geocode_Data
		}).responseText;
		Coordinates = jQuery.parseJSON(Coordinates);
		//Coordinates = jQuery.parseJSON(Coordinates);
		console.log("After calling php")
		console.log(Coordinates);
		//alert(Coordinates.Latitude);
		return Coordinates;
	}
	//----------Remove--------------
function Get_Coordinates(Address) {
	var Location = {
		Latitude: 0,
		Longitude: 0,
		Address: Address
	};
	Convert_Address_to_LatLng(Address, function(Location) {
		alert("Finally: " + Location.Latitude + ", " + Location.Longitude);
		//need to extrac info from here
	});
	//to here
	//return Location object back to Get_XY function
}

function Convert_Address_to_LatLng(Address, Return_callback) {
		var geocoder = new google.maps.Geocoder();
		geocoder.geocode({
			'address': Address
		}, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				var Location = {
					Latitude: 0,
					Longitude: 0,
					Address: Address
				};
				Location.Latitude = results[0].geometry.location.lat();
				Location.Longitude = results[0].geometry.location.lng();
				Return_callback(Location);
			}
			else {
				alert('Geocode could not convert addresses, Error: : ' + status);
			}
		});
	}
	//----------Remove--------------
function Use_My_Location() {
	var map;
	var mapOptions = {
		zoom: 15
	};
	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
			alert(position.coords.latitude);
			alert(position.coords.longitude);
			var infowindow = new google.maps.InfoWindow({
				map: map,
				position: pos,
				content: 'Location found using HTML5.'
			});
			map.setCenter(pos);
		}, function() {
			alert('Error: The Geolocation service failed.')
		});
	}
	else {
		alert('Error: Your browser doesn\'t support geolocation.')
	}
}

function Add_Marker(latitude, longitude) {
	var myLatlng = new google.maps.LatLng(latitude, longitude);
	var mapOptions = {
		zoom: 15,
		center: myLatlng
	};
	var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
	var contentString = 'Latitude: ' + latitude + ' Longitude: ' + longitude;
	var infowindow = new google.maps.InfoWindow({
		content: contentString
	});
	var marker = new google.maps.Marker({
		position: myLatlng,
		map: map,
		title: 'Marker'
	});
	google.maps.event.addListener(marker, 'click', function() {
		infowindow.open(map, marker);
	});
}

function Map_Shortest_Bus_Stop(User_Address, Bus_Stop_Address) {
	var latitude = 41.117744;
	var longitude = -73.4081575;
	var directionsDisplay;
	var directionsService = new google.maps.DirectionsService();
	var map;
	directionsDisplay = new google.maps.DirectionsRenderer();
	var New_Map = new google.maps.LatLng(latitude, longitude);
	var mapOptions = {
		zoom: 15,
		center: New_Map
	};
	map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
	directionsDisplay.setMap(map);
	var start = User_Address;
	var end = Bus_Stop_Address;
	var request = {
		origin: start,
		destination: end,
		travelMode: google.maps.TravelMode.DRIVING
	};
	directionsService.route(request, function(response, status) {
		if (status == google.maps.DirectionsStatus.OK) {
			var distance = response.routes[0].legs[0].distance.text;
			var directions = response.routes[0];
			directionsDisplay.setDirections(response);
			var route = response.routes[0];
			var summaryPanel = document.getElementById('directions_panel');
			for (var route_leg = 0; route_leg < route.legs.length; route_leg++) { //should be one only
				var routeSegment = route_leg + 1;
				summaryPanel.innerHTML += ' Distance From: ' + route.legs[route_leg].start_address + '   ';
				summaryPanel.innerHTML += 'To: ' + route.legs[route_leg].end_address + '     ';
				var distance = parseFloat(route.legs[route_leg].distance.text);
				summaryPanel.innerHTML += ' is : ' + distance + '<br>';
			}
		}
		else {
			alert("Something went wrong, could not map the address")
		}
	});
}

function Show_Bus_Stops() { //limit is 5 addresses, need to look for alternative to get lat and lng from addresses 
	var Bus_Stops = Get_Bus_Stops();
	var map = new google.maps.Map(document.getElementById('map-canvas'));
	var bounds = new google.maps.LatLngBounds();
	var infowindow = new google.maps.InfoWindow();
	for (var Bus_Stop = 0; Bus_Stop < Bus_Stops.length; Bus_Stop++) {
		var geocoder = new google.maps.Geocoder();
		geocoder.geocode({
			'address': Bus_Stops[Bus_Stop].Stop_Address
		}, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				Bus_Stops[Bus_Stop].latitude = results[0].geometry.location.lat();
				Bus_Stops[Bus_Stop].longitude = results[0].geometry.location.lng();
			}
			else {
				alert("could not map address: " + status)
			}
		});
		var latlng = new google.maps.LatLng(Bus_Stops[Bus_Stop].latitude, Bus_Stops[Bus_Stop].longitude);
		bounds.extend(latlng);
		var marker = new google.maps.Marker({
			position: latlng,
			map: map,
			title: Bus_Stops[Bus_Stop].Bus_Stop_Address
		});
		google.maps.event.addListener(marker, 'click', function() {
			infowindow.setContent(this.title);
			infowindow.open(map, this);
		});
		map.fitBounds(bounds);
	}
}
google.maps.event.addDomListener(window, 'load', Initialize_Google_Maps_API);
// ------------------------------------------Marlon coded items ABOVE--------------------------------//