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
     DB_Unit_Test_Get_From_DB()
     DB_Unit_Test_Write_To_DB()
     DB_Unit_Test_Update_DB()
     DB_Unit_Test_Delete_From_DB()
     */
	Get_States();
});

function Clear() {
	document.getElementById("Create_State_Name").value = "";
	document.getElementById("Create_District_Name").value = "";
	document.getElementById("Create_School_Name").value = "";
	document.getElementById("Create_School_Address").value = "";
	document.getElementById("Create_Bus_Stop_Number").value = "";
	document.getElementById("Create_Bus_Stop_Time").value = "";
	document.getElementById("Create_Bus_Stop_Address").value = "";
	document.getElementById("Update_State_Name").value = "";
	document.getElementById("Update_District_Name").value = "";
	document.getElementById("Update_School_Name").value = "";
	document.getElementById("Update_School_Address").value = "";
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

function Grab_Selected_Bus_Stop_Number_ID() {
	var Bus_Stop_Number_ID = document.getElementById("Select_Bus_Stops").value;
	return Bus_Stop_Number_ID;
}

function Check_Update_Response(Update_Response_Data, Modal) {
	if (Update_Response_Data !== false) {
		$(Modal).modal('hide');
		Get_States();
	}
	else {
		alert("Cannot update, contact your system administrator");
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

function Get_Login(Email, Encrypted_Password) {
	var action = "Get_Login";
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

function Get_States() {
	document.getElementById('Select_States').options.length = 1;
	document.getElementById('Select_Districts').options.length = 1;
	document.getElementById('Select_Schools').options.length = 1;
	document.getElementById('Select_Bus_Stops').options.length = 1;
	document.getElementById('Select_Bus_Stops_Address').options.length = 1;
	var action = "Get_States";
	var Ajax_Data = {
		action: action
	};
	Outgoing_Ajax(Ajax_Data);
	var States_Data = jQuery.parseJSON(Incoming_Ajax_Data);
	Select_States(States_Data);
}

function Get_Districts(State_ID) {
	document.getElementById('Select_Districts').options.length = 1;
	document.getElementById('Select_Schools').options.length = 1;
	document.getElementById('Select_Bus_Stops').options.length = 1;
	document.getElementById('Select_Bus_Stops_Address').options.length = 1;
	var action = "Get_Districts";
	var Ajax_Data = {
		State_ID: State_ID,
		action: action
	};
	Outgoing_Ajax(Ajax_Data);
	var Districts_Data = jQuery.parseJSON(Incoming_Ajax_Data);
	Select_Districts(Districts_Data);
}

function Get_Schools(District_ID) {
	document.getElementById('Select_Schools').options.length = 1;
	document.getElementById('Select_Bus_Stops').options.length = 1;
	document.getElementById('Select_Bus_Stops_Address').options.length = 1;
	var action = "Get_Schools";
	var Ajax_Data = {
		District_ID: District_ID,
		action: action
	};
	Outgoing_Ajax(Ajax_Data);
	var Schools_Data = jQuery.parseJSON(Incoming_Ajax_Data);
	Select_Schools(Schools_Data);
}

function Get_Bus_Stop_Numbers(School_ID) {
	document.getElementById('Select_Bus_Stops').options.length = 1;
	document.getElementById('Select_Bus_Stops_Address').options.length = 1;
	var action = "Get_Bus_Stop_Numbers";
	var Ajax_Data = {
		School_ID: School_ID,
		action: action
	};
	Outgoing_Ajax(Ajax_Data);
	var Bus_Stops_Number_Data = jQuery.parseJSON(Incoming_Ajax_Data);
	Select_Bus_Stops(Bus_Stops_Number_Data);
	Get_Bus_Stop_Details(School_ID);
}

function Get_Bus_Stop_Details(Bus_Stop_Number_ID) {
	document.getElementById('Select_Bus_Stops_Address').options.length = 1;
	var action = "Get_Bus_Stop_Details";
	var Ajax_Data = {
		Bus_Stop_Number_ID: Bus_Stop_Number_ID,
		action: action
	};
	Outgoing_Ajax(Ajax_Data);
	var Bus_Stop_Details_Data = jQuery.parseJSON(Incoming_Ajax_Data);
	Select_Bus_Stops_Details(Bus_Stop_Details_Data)
	//Get_View_All_Bus_Stops(Bus_Stop_Number_ID)
}

function Get_View_All_Bus_Stops(Bus_Stop_Number_ID){
	var action = "Get_View_All_Bus_Stops";
	var Ajax_Data = {
		Bus_Stop_Number_ID: Bus_Stop_Number_ID,
		action: action
	};
	Outgoing_Ajax(Ajax_Data);
	var Bus_Stop_Details_Data = jQuery.parseJSON(Incoming_Ajax_Data);
	View_All_Bus_Stops(Bus_Stops_Number_And_Detail_Data)
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

function Select_Bus_Stops(Bus_Stops_Number_Data) {
	var select = document.getElementById("Select_Bus_Stops");
	var i;
	for (i = 0; i < Bus_Stops_Number_Data.length; i++) {
		select.options[select.options.length] = new Option(Bus_Stops_Number_Data[i].BUS_STOP_NUMBER, Bus_Stops_Number_Data[i].BUS_STOP_NUMBER_ID);
	}
}

function Select_Bus_Stops_Details(Bus_Stop_Details_Data) {
	var select = document.getElementById("Select_Bus_Stops_Address");
	var i;
	for (i = 0; i < Bus_Stop_Details_Data.length; i++) {
		select.options[select.options.length] = new Option(Bus_Stop_Details_Data[i].BUS_STOP_ADDRESS, Bus_Stop_Details_Data[i].BUS_STOP_DETAIL_ID);
	}
}

function View_All_Bus_Stops(Bus_Stops_Number_And_Detail_Data) {
	var View_All_Bus_Stops = '<thead><tr><th>Bus #</th><th>Stop Time</th><th>Stop Address</th></tr></thead><tbody>';
	var i;
	for (i = 0; i < Bus_Stop_Details_Data.length; i++) {
		j = Bus_Stop_Details_Data[i].BUS_STOP_NUMBER;
		View_All_Bus_Stops += '<tr>';
		var Row_Span = 0;
		var j;
		for (j = i; Bus_Stop_Details_Data[i].BUS_STOP_NUMBER !== Last_Bus && j < Bus_Stop_Details_Data.length && Bus_Stop_Details_Data[j].BUS_STOP_NUMBER == Bus_Stop_Details_Data[i].BUS_STOP_NUMBER; j++) {
			Row_Span++;
		}
		if (Row_Span > 0) {
			var Last_Bus = Bus_Stop_Details_Data[i].BUS_STOP_NUMBER;
			View_All_Bus_Stops += '<td rowspan="' + Row_Span + '">' + Last_Bus + '</td>';
		}
		View_All_Bus_Stops += '<td>' + Bus_Stop_Details_Data[i].BUS_STOP_TIME + '</td><td>' + Bus_Stop_Details_Data[i].BUS_STOP_ADDRESS + '</td></tr>';
	}
	View_All_Bus_Stops += '</tbody>';
	document.getElementById("View_All_Bus_Stops").innerHTML = View_All_Bus_Stops;
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
		State_Response(Create_Response_Data, Modal);
	}
}

function State_Response(Create_Response_Data, Modal) {
	if (Create_Response_Data !== false) {
		$(Modal).modal('hide');
		Get_States();
	}
	else {
		alert('state creation failed, please try again');
	}
}

function Create_District() {
	var State_ID = Grab_Selected_State_ID();
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
		District_Response(Create_Response_Data, Modal, State_ID);
	}
}

function District_Response(Create_Response_Data, Modal, State_ID) {
	if (Create_Response_Data !== false) {
		$(Modal).modal('hide');
		Get_Districts(State_ID);
	}
	else {
		alert('district creation failed, please try again');
	}
}

function Create_School() {
	var District_ID = Grab_Selected_District_ID();
	School_Name = document.getElementById("Create_School_Name").value;
	School_Address = document.getElementById("Create_School_Address").value;
	var Names = ["School Name", "School Address"];
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
		School_Response(Create_Response_Data, Modal, District_ID);
	}
}

function School_Response(Create_Response_Data, Modal, District_ID) {
	if (Create_Response_Data !== false) {
		$(Modal).modal('hide');
		Get_Schools(District_ID);
	}
	else {
		alert('district creation failed, please try again');
	}
}

function Create_Bus_Stop_Number() {
	var School_ID = Grab_Selected_School_ID();
	Bus_Stop_Number = document.getElementById("Create_Bus_Stop_Number").value;
	var Names = ["Bus Stop Number"];
	var Values = [Bus_Stop_Number];
	if (Validate_Text_Fields(Names, Values) != false) {
		var action = "Create_Bus_Stop_Number";
		var Ajax_Data = {
			School_ID: School_ID,
			Bus_Stop_Number: Bus_Stop_Number,
			action: action
		};
		Outgoing_Ajax(Ajax_Data);
		Create_Response_Data = jQuery.parseJSON(Incoming_Ajax_Data);
		var Modal = '#CreateBusStopNumberModal';
		Bus_Stop_Number_Response(Create_Response_Data, Modal, School_ID);
	}
}

function Bus_Stop_Number_Response(Create_Response_Data, Modal, School_ID) {
	if (Create_Response_Data !== false) {
		$(Modal).modal('hide');
		Get_Bus_Stop_Numbers(School_ID);
	}
	else {
		alert('bus stop number creation failed, please try again');
	}
}

function Create_Bus_Stop_Detail() {
	var Bus_Stop_Number_ID = Grab_Selected_Bus_Stop_Number_ID();
	Bus_Stop_Time = document.getElementById("Create_Bus_Stop_Time").value;
	Bus_Stop_Address = document.getElementById("Create_Bus_Stop_Address").value;
	Bus_Stop_Latitude = "22"; //temp
	Bus_Stop_Longitude = "11"; //temp
	var Names = ["Bus Stop Time", "Bus Stop Address", "Bus Stop Latitude", "Bus Stop Longitude"];
	var Values = [Bus_Stop_Time, Bus_Stop_Address, Bus_Stop_Latitude, Bus_Stop_Longitude];
	if (Validate_Text_Fields(Names, Values) != false) {
		var action = "Create_Bus_Stop_Detail";
		var Ajax_Data = {
			Bus_Stop_Number_ID: Bus_Stop_Number_ID,
			Bus_Stop_Time: Bus_Stop_Time,
			Bus_Stop_Address: Bus_Stop_Address,
			Bus_Stop_Latitude: Bus_Stop_Latitude,
			Bus_Stop_Longitude: Bus_Stop_Longitude,
			action: action
		};
		Outgoing_Ajax(Ajax_Data);
		Create_Response_Data = jQuery.parseJSON(Incoming_Ajax_Data);
		var Modal = '#CreateBusStopDetailsModal';
		Bus_Stop_Stop_Details_Response(Create_Response_Data, Modal, Bus_Stop_Number_ID);
	}
}

function Bus_Stop_Stop_Details_Response(Create_Response_Data, Modal, Bus_Stop_Number_ID) {
	if (Create_Response_Data !== false) {
		$(Modal).modal('hide');
		Get_Bus_Stop_Details(Bus_Stop_Number_ID);
	}
	else {
		alert('bus stop time and address creation failed, please try again');
	}
}

function Display_Update_State() {
	var State_ID = Grab_Selected_State_ID();
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
	var District_ID = Grab_Selected_District_ID();
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
	var School_ID = Grab_Selected_School_ID();
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

function Display_Update_Bus_Stop_Number() {
	var Bus_Stop_Number_ID = Grab_Selected_Bus_Stop_Number_ID();
	var action = "Display_Update_Bus_Stop_Number";
	var Ajax_Data = {
		Bus_Stop_Number_ID: Bus_Stop_Number_ID,
		action: action
	};
	Outgoing_Ajax(Ajax_Data);
	Bus_Stop_Data = jQuery.parseJSON(Incoming_Ajax_Data);
	document.getElementById("Update_Bus_Stop_Number").value = Bus_Stop_Data[0].BUS_STOP_NUMBER;
	document.getElementById("Update_Bus_Stop_Time").value = Bus_Stop_Data[0].BUS_STOP_TIME;
	document.getElementById("Update_Bus_Stop_Address").value = Bus_Stop_Data[0].BUS_STOP_ADDRESS;
}

function Display_Update_Bus_Stop_Details() {
	var Bus_Stop_Number_ID = Grab_Selected_Bus_Stop_Number_ID();
	var action = "Display_Update_Bus_Stop_Details";
	var Ajax_Data = {
		Bus_Stop_Number_ID: Bus_Stop_Number_ID,
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
	var State_ID = Grab_Selected_State_ID();
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
	var District_ID = Grab_Selected_District_ID();
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
	var School_ID = Grab_Selected_School_ID();
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

function Validate_Text_Fields(Names, Values) {
	var i;
	for (i = 0; i < Values.length; i++) {
		if (Values[i] == null || Values[i] == "") {
			alert("Invalid " + Names[i]);
			return false;
		}
	}
}

function Login() {
	var Email = document.getElementById("Email").value;
	var Password = document.getElementById("Password").value;
	Encryption(Email, Password);
}

function Encryption(Email, Password) {
	var Encrypted_Password = Password;
	Get_Login(Email, Encrypted_Password);
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