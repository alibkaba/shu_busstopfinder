$(document).ready(function() {
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
	/*   Call PHP DB Unit test
     DB_Unit_Test_Read_From_DB()
     DB_Unit_Test_Write_To_DB()
     DB_Unit_Test_Update_DB()
     DB_Unit_Test_Delete_From_DB()
     */
	Read_States();
});

function Clear() {
	document.getElementById("Create_State_Name").value = "";
	document.getElementById("Create_District_Name").value = "";
	document.getElementById("Create_School_Name").value = "";
	document.getElementById("Create_School_Address").value = "";
	document.getElementById("Create_Bus_Stop_Number").value = "";
	document.getElementById("Create_Bus_Stop_Time").value = "";
	document.getElementById("Create_Bus_Stop_Address").value = "";
}
$("#Delete_State").click(function(e) {
	e.preventDefault();
	Read_Districts();
	if (!$.trim(Districts_Data)) {
		Delete_State();
	}
	else {
		alert("This state has districts, please remove them first");
	}
});
$("#Delete_District").click(function(e) {
	e.preventDefault();
	Read_Schools();
	if (!$.trim(Schools_Data)) {
		Delete_District();
	}
	else {
		alert("This district has schools, please remove them first");
	}
});
$("#Delete_School").click(function(e) {
	e.preventDefault();
	Read_Bus_Stops();
	if (!$.trim(Bus_Stops_Data)) {
		Delete_School();
	}
	else {
		alert("This school has bus stops, please remove them first");
	}
});
$("#Delete_Bus_Stop").click(function(e) {
	e.preventDefault();
	Delete_Bus_Stop();
});


function Validate_Text_Fields(Names, Values) {
	var i;
	for (i = 0; i < Values.length; i++) {
		if (Values[i] == null || Values[i] == "") {
			alert("Invalid " + Names[i]);
			return false;
		}
	}
}

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

function Check_Create_Response(Create_Response_Data, Modal) {
	if (Create_Response_Data !== false) {
		$(Modal).modal('hide');
		Read_States();
	}
	else {
		alert('Create failed, please try again');
	}
}

function Check_Update_Response(Update_Response_Data, Modal) {
	if (Update_Response_Data !== false) {
		$(Modal).modal('hide');
		Read_States();
	}
	else {
		alert("Cannot update, contact your system administrator");
	}
}

function Check_Delete_Response(Delete_Response_Data, Modal) {
	if (Delete_Response_Data !== false) {
		$(Modal).modal('hide');
		Read_States();
	}
	else {
		alert("Cannot delete because blah blah created under it");
		window.location.href = 'dashboard.html';
	}
}

function Check_Login_Response(Email, Login_Data) {
	if (Login_Data !== '0') {
		localStorage.setItem("email", Email);
		window.location.href = 'dashboard.html';
	}
	else {
		alert('Incorrect login credentials');
	}
}

function Read_States() {
	document.getElementById("Update_State_Modal_Button").style.visibility = "hidden";
	document.getElementById("Delete_State_Modal_Button").style.visibility = "hidden";
	document.getElementById("Select_Districts").style.visibility = "hidden";
	document.getElementById("Create_District_Modal_Button").style.visibility = "hidden";
	
	document.getElementById("Update_District_Modal_Button").style.visibility = "hidden";
	document.getElementById("Delete_District_Modal_Button").style.visibility = "hidden";
	document.getElementById("Select_Schools").style.visibility = "hidden";
	document.getElementById("Create_School_Modal_Button").style.visibility = "hidden";
	
	document.getElementById("Update_School_Modal_Button").style.visibility = "hidden";
	document.getElementById("Delete_School_Modal_Button").style.visibility = "hidden";
	document.getElementById("Select_Bus_Stop").style.visibility = "hidden";
	document.getElementById("View_All_Buses_Button").style.visibility = "hidden";
	document.getElementById("Create_Bus_Stop_Modal_Button").style.visibility = "hidden";
	
	document.getElementById("Update_Bus_Stop_Modal_Button").style.visibility = "hidden";
	document.getElementById("Delete_Bus_Stop_Modal_Button").style.visibility = "hidden";
	var action = "Read_States";
	var Ajax_Data = {
		action: action
	};
	Outgoing_Ajax(Ajax_Data);
	var States_Data = jQuery.parseJSON(Incoming_Ajax_Data);
	Select_States(States_Data);
}

function Read_Districts(State_ID) {
	document.getElementById("Update_District_Modal_Button").style.visibility = "hidden";
	document.getElementById("Delete_District_Modal_Button").style.visibility = "hidden";
	document.getElementById("Select_Schools").style.visibility = "hidden";
	document.getElementById("Create_School_Modal_Button").style.visibility = "hidden";
	
	document.getElementById("Update_School_Modal_Button").style.visibility = "hidden";
	document.getElementById("Delete_School_Modal_Button").style.visibility = "hidden";
	document.getElementById("Select_Bus_Stop").style.visibility = "hidden";
	document.getElementById("View_All_Buses_Button").style.visibility = "hidden";
	document.getElementById("Create_Bus_Stop_Modal_Button").style.visibility = "hidden";
	
	document.getElementById("Update_Bus_Stop_Modal_Button").style.visibility = "hidden";
	document.getElementById("Delete_Bus_Stop_Modal_Button").style.visibility = "hidden";
	
	if (State_ID != false){
	document.getElementById('Select_Districts').options.length = 1;
	document.getElementById("Update_State_Modal_Button").style.visibility = "visible";
	document.getElementById("Delete_State_Modal_Button").style.visibility = "visible";
	document.getElementById("Select_Districts").style.visibility = "visible";
	document.getElementById("Create_District_Modal_Button").style.visibility = "visible";
		var action = "Read_Districts";
		var Ajax_Data = {
			State_ID: State_ID,
			action: action
		};
		Outgoing_Ajax(Ajax_Data);
		var Districts_Data = jQuery.parseJSON(Incoming_Ajax_Data);
		Select_Districts(Districts_Data);
	}
	else{
	document.getElementById("Update_State_Modal_Button").style.visibility = "hidden";
	document.getElementById("Delete_State_Modal_Button").style.visibility = "hidden";
	document.getElementById("Select_Districts").style.visibility = "hidden";
	document.getElementById("Create_District_Modal_Button").style.visibility = "hidden";
	}
}

function Read_Schools(District_ID) {
	document.getElementById("Update_School_Modal_Button").style.visibility = "hidden";
	document.getElementById("Delete_School_Modal_Button").style.visibility = "hidden";
	document.getElementById("Select_Bus_Stop").style.visibility = "hidden";
	document.getElementById("View_All_Buses_Button").style.visibility = "hidden";
	document.getElementById("Create_Bus_Stop_Modal_Button").style.visibility = "hidden";
	
	document.getElementById("Update_Bus_Stop_Modal_Button").style.visibility = "hidden";
	document.getElementById("Delete_Bus_Stop_Modal_Button").style.visibility = "hidden";
	if (District_ID != false){
	document.getElementById('Select_Schools').options.length = 1;
	document.getElementById("Update_District_Modal_Button").style.visibility = "visible";
	document.getElementById("Delete_District_Modal_Button").style.visibility = "visible";
	document.getElementById("Select_Schools").style.visibility = "visible";
	document.getElementById("Create_School_Modal_Button").style.visibility = "visible";
	
		var action = "Read_Schools";
		var Ajax_Data = {
			District_ID: District_ID,
			action: action
		};
		Outgoing_Ajax(Ajax_Data);
		var Schools_Data = jQuery.parseJSON(Incoming_Ajax_Data);
		Select_Schools(Schools_Data);
	}
	else{
	document.getElementById("Update_School_Modal_Button").style.visibility = "hidden";
	document.getElementById("Delete_School_Modal_Button").style.visibility = "hidden";
	document.getElementById("Select_Bus_Stop").style.visibility = "hidden";
	document.getElementById("View_All_Buses_Button").style.visibility = "hidden";
	document.getElementById("Create_Bus_Stop_Modal_Button").style.visibility = "hidden";
	}
}

function Read_Bus_Stops(School_ID) {
	document.getElementById("Update_School_Modal_Button").style.visibility = "hidden";
	document.getElementById("Delete_School_Modal_Button").style.visibility = "hidden";
	document.getElementById("Select_Bus_Stop").style.visibility = "hidden";
	document.getElementById("View_All_Buses_Button").style.visibility = "hidden";
	document.getElementById("Create_Bus_Stop_Modal_Button").style.visibility = "hidden";
	
	document.getElementById("Update_Bus_Stop_Modal_Button").style.visibility = "hidden";
	document.getElementById("Delete_Bus_Stop_Modal_Button").style.visibility = "hidden";
	if (School_ID != false){
	document.getElementById('Select_Schools').options.length = 1;
	document.getElementById("Update_District_Modal_Button").style.visibility = "visible";
	document.getElementById("Delete_District_Modal_Button").style.visibility = "visible";
	document.getElementById("Select_Schools").style.visibility = "visible";
	document.getElementById("Create_School_Modal_Button").style.visibility = "visible";
	
	var Bus_Stops_Table = '<thead><tr><th>Bus #</th><th>Stop Time</th><th>Stop Address</th></tr></thead>';
	document.getElementById("Update_Bus_Stop_Modal_Button").style.visibility = "visible";
	document.getElementById("Delete_Bus_Stop_Modal_Button").style.visibility = "visible";
		var action = "Read_Bus_Stops";
		var Ajax_Data = {
			School_ID: School_ID,
			action: action
		};
		Outgoing_Ajax(Ajax_Data);
		var Bus_Stops_Data = jQuery.parseJSON(Incoming_Ajax_Data);
		Select_Bus_Stop(Bus_Stops_Data);
		Table_Bus_Stops(Bus_Stops_Data);
	}
	else{
	document.getElementById("Update_Bus_Stop_Modal_Button").style.visibility = "hidden";
	document.getElementById("Delete_Bus_Stop_Modal_Button").style.visibility = "hidden";
	}
}

function Read_Login(Email, Encrypted_Password) {
	var action = "Read_Login";
	var Ajax_Data = {
		Email: Email,
		Encrypted_Password: Encrypted_Password,
		action: action
	};
	Outgoing_Ajax(Ajax_Data);
	var Login_Data = jQuery.parseJSON(Incoming_Ajax_Data);
	Check_Login_Response(Email, Login_Data);
}

function Outgoing_Ajax(Ajax_Data) {
	Incoming_Ajax_Data = $.ajax({
		data: Ajax_Data
	}).responseText;
	return Incoming_Ajax_Data;
}

function Select_States(States_Data) {
	var select = document.getElementById("Select_States");
	var i;
	for (i = 0; i < States_Data.length; i++) {
		select.options[select.options.length] = new Option(States_Data[i].STATE_NAME, States_Data[i].STATE_ID);
	}
}

function Select_Districts(Districts_Data) {
	var select = document.getElementById("Select_Districts");
	var i;
	for (i = 0; i < Districts_Data.length; i++) {
		select.options[select.options.length] = new Option(Districts_Data[i].DISTRICT_NAME, Districts_Data[i].DISTRICT_ID);
	}
}

function Select_Schools(Schools_Data) {
	var select = document.getElementById("Select_Schools");
	var i;
	for (i = 0; i < Schools_Data.length; i++) {
		select.options[select.options.length] = new Option(Schools_Data[i].SCHOOL_NAME, Schools_Data[i].SCHOOL_ID);
	}
}

function Select_Schools(Schools_Data) {
	var select = document.getElementById("Select_Schools");
	var i;
	for (i = 0; i < Schools_Data.length; i++) {
		select.options[select.options.length] = new Option(Schools_Data[i].SCHOOL_NAME, Schools_Data[i].SCHOOL_ID);
	}
}

function Select_Bus_Stop(Bus_Stops_Data) {
	var select = document.getElementById("Select_Bus_Stop");
	var i;
	for (i = 0; i < Bus_Stops_Data.length; i++) {
		select.options[select.options.length] = new Option(Bus_Stops_Data[i].BUS_STOP_NUMBER, Bus_Stops_Data[i].BUS_STOP_ID);
	}
}

function Table_Bus_Stops(Bus_Stops_Data) {
	var Bus_Stops_Table = '<thead><tr><th>Bus #</th><th>Stop Time</th><th>Stop Address</th></tr></thead><tbody>';
	var i;
	for (i = 0; i < Bus_Stops_Data.length; i++) {
		j = Bus_Stops_Data[i].BUS_STOP_NUMBER;
		Bus_Stops_Table += '<tr>';
		var Row_Span = 0;
		var j;
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

function Login() {
	var Email = document.getElementById("Email").value;
	var Password = document.getElementById("Password").value;
	Encryption(Email, Password);
}

function Encryption(Email, Password) {
	var Encrypted_Password = Password;
	Read_Login(Email, Encrypted_Password);
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
	document.getElementById("Account").style.display = "block";
	document.getElementById("Logout").style.display = "block";
}

function Navigation_Right_Logged_Out() {
	document.getElementById("Login").style.display = "block";
}

function Create_State() {
	var State_Name = document.getElementById("Create_State_Name").value;
	var Names = ["State Name"];
	var Values = [State_Name];
	if (Validate_Text_Fields(Names, Values) != false) {
		var action = "Create_State";
		var Ajax_Data = {
			State_Name: State_Name,
			action: action
		};
		Outgoing_Ajax(Ajax_Data);
		Create_Response_Data = jQuery.parseJSON(Incoming_Ajax_Data);
		var Modal = '#CreateStateModal';
		Check_Create_Response(Create_Response_Data, Modal);
	}
}

function Create_District() {
	Grab_Selected_State_ID();
	District_Name = document.getElementById("Create_District_Name").value;
	var Names = ["District Name"];
	var Values = [District_Name];
	if (Validate_Text_Fields(Names, Values) != false) {
		var action = "Create_District";
		var Ajax_Data = {
			State_ID: State_ID,
			District_Name: District_Name,
			action: action
		};
		Outgoing_Ajax(Ajax_Data);
		Create_Response_Data = jQuery.parseJSON(Incoming_Ajax_Data);
		var Modal = '#CreateDistrictModal';
		Check_Create_Response(Create_Response_Data, Modal);
	}
}

function Create_School() {
	Grab_Selected_District_ID();
	School_Name = document.getElementById("Create_School_Name").value;
	School_Address = document.getElementById("Create_School_Address").value;
	var Values = [School_Name, School_Address];
	if (Validate_Text_Fields(Names, Values) != false) {
		var action = "Create_School";
		var Ajax_Data = {
			District_ID: District_ID,
			School_Name: School_Name,
			School_Address: School_Address,
			action: action
		};
		Outgoing_Ajax(Ajax_Data);
		Create_Response_Data = jQuery.parseJSON(Incoming_Ajax_Data);
		var Modal = '#CreateSchoolModal';
		Check_Create_Response(Create_Response_Data, Modal);
	}
}

function Create_Bus_Stop() {
	Grab_Selected_School_ID();
	Bus_Stop_Number = document.getElementById("Create_Bus_Stop_Number").value;
	Bus_Stop_Time = document.getElementById("Create_Bus_Stop_Time").value;
	Bus_Stop_Address = document.getElementById("Create_Bus_Stop_Address").value;
	Bus_Stop_Latitude = "22"; //temp
	Bus_Stop_Longitude = "11"; //temp
	var Names = [];
	var Values = [Bus_Stop_Number, Bus_Stop_Time, Bus_Stop_Address, Bus_Stop_Latitude, Bus_Stop_Longitude];
	if (Validate_Text_Fields(Names, Values) != false) {
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
		var Modal = '#CreateBusStopModal';
		Check_Create_Response(Create_Response_Data, Modal);
	}
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

function Display_Update_Bus_Stop() {
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

function Update_State() {
	var New_State_Name = document.getElementById("Update_State_Name").value;
	Grab_Selected_State_ID();
	var action = "Update_State";
	var Ajax_Data = {
		State_ID: State_ID,
		New_State_Name: New_State_Name,
		action: action
	};
	Outgoing_Ajax(Ajax_Data);
	Update_Response_Data = jQuery.parseJSON(Incoming_Ajax_Data);
	var Modal = '#UpdateStateModal';
	Check_Update_Response(Update_Response_Data, Modal);
}

function Update_District() {
	var New_District_Name = document.getElementById("Update_District_Name").value;
	Grab_Selected_District_ID();
	var action = "Update_District";
	var Ajax_Data = {
		District_ID: District_ID,
		New_District_Name: New_District_Name,
		action: action
	};
	Outgoing_Ajax(Ajax_Data);
	Update_Response_Data = jQuery.parseJSON(Incoming_Ajax_Data);
	var Modal = '#UpdateDistrictModal';
	Check_Update_Response(Update_Response_Data, Modal);
}

function Update_School() {
	var New_School_Name = document.getElementById("Update_School_Name").value;
	var New_School_Address = document.getElementById("Update_School_Address").value;
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
	var Modal = '#UpdateSchoolModal';
	Check_Update_Response(Update_Response_Data, Modal);
}

function Update_Bus_Stop() {
	var New_Bus_Stop_Number = document.getElementById("Update_Bus_Stop_Number").value;
	var New_Bus_Stop_Time = document.getElementById("Update_Bus_Stop_Time").value;
	var New_Bus_Stop_Address = document.getElementById("Update_Bus_Stop_Address").value;
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
	var Modal = '#UpdateBusStopModal';
	Check_Update_Response(Update_Response_Data, Modal);
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
	var Modal = '#DeleteStateModal';
	Check_Delete_Response(Delete_Response_Data, Modal);
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
	var Modal = '#DeleteDistrictModal';
	Check_Delete_Response(Delete_Response_Data, Modal);
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
	var Modal = '#DeleteSchoolModal';
	Check_Delete_Response(Delete_Response_Data, Modal);
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
	var Modal = '#DeleteBusStopModal';
	Check_Delete_Response(Delete_Response_Data, Modal);
}