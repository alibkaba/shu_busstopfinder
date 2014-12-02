// ------------------------------------------Ali coded items BELOW --------------------------------//

$(document).ready(function() {
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
    var Test = new DB_Unit_Test();
    Test.Create();

});

function DB_Unit_Test(){
    this.Create = function(){
        var action = "Create";
        var Ajax_Data = {
            action: action
        };
        Outgoing_Ajax(Ajax_Data);
        var Districts_Data = jQuery.parseJSON(Incoming_Ajax_Data);
        this.Validate_Create(Districts_Data);
    };
    this.Validate_Create = function(Districts_Data){
        if (Districts_Data !== false){
            this.Write();
        }
        else{
            alert("Create failed");
        }
    };
    this.Write = function(){
        var action = "Write";
        var New_Season = "Summer";
        var Ajax_Data = {
            New_Season: New_Season,
            action: action
        };
        Outgoing_Ajax(Ajax_Data);
        var Districts_Data = jQuery.parseJSON(Incoming_Ajax_Data);
        this.Validate_Write(Districts_Data);
    };
    this.Validate_Write = function(Districts_Data){
        if (Districts_Data !== false){
            this.Update();
        }
        else{
            alert("Write failed");
        }
    };
    this.Update = function(){
        var action = "Update";
        var Old_Season = "Summer";
        var New_Season = "Winter";
        var Ajax_Data = {
            Old_Season: Old_Season,
            New_Season: New_Season,
            action: action
        };
        Outgoing_Ajax(Ajax_Data);
        var Districts_Data = jQuery.parseJSON(Incoming_Ajax_Data);
        this.Validate_Update(Districts_Data);
    };
    this.Validate_Update = function(Districts_Data){
        if (Districts_Data !== false){
            this.Delete();
        }
        else{
            alert("Update failed");
        }
    };
    this.Delete = function(){
        var action = "Delete";
        var Ajax_Data = {
            action: action
        };
        Outgoing_Ajax(Ajax_Data);
        var Districts_Data = jQuery.parseJSON(Incoming_Ajax_Data);
        this.Validate_Delete(Districts_Data);
    };
    this.Validate_Delete = function(Districts_Data){
        if (Districts_Data !== false){
            Check_Web_Storage();
            Main();
        }
        else{
            alert("Delete failed");
        }
    };
}

function Outgoing_Ajax(Ajax_Data) {
    Incoming_Ajax_Data = $.ajax({
        data: Ajax_Data
    }).responseText;
    return Incoming_Ajax_Data;
}

/**
 * @return {boolean}
 */
function Validate_Text_Fields(Names, Values) {
    var i;
    for (i = 0; i < Values.length; i++) {
        if (Values[i] == null || Values[i] == "") {
            alert("Invalid " + Names[i]);
            return false;
        }
    }
}

function Main(){
    var State_Handler = new States_Manager();
    State_Handler.Get_Drop_Down_Data();
    //var Listen_For_State = State_Handler.Start_User_Listener();
}

function States_Manager(){
    this.Grab_Selected_State_ID = function (){
        var State_ID = document.getElementById("Select_States").value;
        return State_ID;
    };
    this.Get_Drop_Down_Data = function(){
        var action = "Get_States";
        var Ajax_Data = {
            action: action
        };
        Outgoing_Ajax(Ajax_Data);
        var States_Data = jQuery.parseJSON(Incoming_Ajax_Data);
        if (document.location.pathname != "/cs604/Ali/Unit%20Testing/Integrated_Find%20My%20Route/user.html"){
            this.Clear_Form();
            this.Create_Listener();
            this.Update_Listener();
            this.Delete_Listener();
        }
        this.Update_Drop_Down(States_Data);
        this.Select_Listener();
    };
    this.Get_Update_Data = function(){
        var State_ID = this.Grab_Selected_State_ID();
        var action = "Get_State_Data";
        var Ajax_Data = {
            State_ID: State_ID,
            action: action
        };
        Outgoing_Ajax(Ajax_Data);
        var State_Data = jQuery.parseJSON(Incoming_Ajax_Data);
        document.getElementById("Update_State_Name").value = State_Data[0].STATE_NAME;
    };
    this.Update_Drop_Down = function(States_Data){
        document.getElementById('Select_States').options.length = 1;
        var select = document.getElementById("Select_States");
        var i;
        for (i = 0; i < States_Data.length; i++) {
            select.options[select.options.length] = new Option(States_Data[i].STATE_NAME, States_Data[i].STATE_ID);
        }
    };
    this.Clear_Form = function(){
        document.getElementById("Create_State_Name").value = "";
        Hide_State_GUI();
        Hide_District_GUI();
        Hide_School_GUI();
        Hide_Bus_Stop_Number_GUI();
        Hide_Bus_Stop_Detail_GUI();
    };
    this.Select_Listener = function(){
        var Select_Drop_Down = document.getElementById("Select_States");
        Select_Drop_Down.addEventListener("change", function () {
            var State_ID = Select_Drop_Down.options[Select_Drop_Down.selectedIndex].value;
            if (State_ID != ""){
                var District_Handler = new District_Manager();
                District_Handler.Get_Drop_Down_Data(State_ID);
                Display_State_GUI();
            }
            else{
                Hide_State_GUI();
                Hide_District_GUI();
                Hide_School_GUI();
                Hide_Bus_Stop_Number_GUI();
                Hide_Bus_Stop_Detail_GUI();
            }
        });
    };
    this.Create_Listener = function(){
        var Create_Button = document.getElementById("Create_State");
        Create_Button.addEventListener("click", function () {
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
                var Response_Data = jQuery.parseJSON(Incoming_Ajax_Data);
                var Modal = '#Display_Create_State_Form';
                var Message = 'state creation failed, please try again';
                var State_Handler = new States_Manager();
                State_Handler.Validate_Response(Response_Data, Modal, Message);
            }
        });
    };
    this.Update_Listener = function(){
        var Update_Button = document.getElementById("Update_State");
        Update_Button.addEventListener("click", function () {
            var New_State_Name = document.getElementById("Update_State_Name").value;
            var action = "Update_State";
            var Names = ["State Name"];
            var Values = [New_State_Name];
            if (Validate_Text_Fields(Names, Values) != false) {
                var State_Handler = new States_Manager();
                State_Handler.Grab_Selected_State_ID();
                var State_ID = State_Handler.Grab_Selected_State_ID();
                var Ajax_Data = {
                    State_ID: State_ID,
                    New_State_Name: New_State_Name,
                    action: action
                };
                Outgoing_Ajax(Ajax_Data);
                var Response_Data = jQuery.parseJSON(Incoming_Ajax_Data);
                var Modal = '#Display_Update_State_Form';
                var Message = 'state update failed, please try again';
                State_Handler.Validate_Response(Response_Data, Modal, Message);
            }
        });
    };
    this.Delete_Listener = function(){
        var Delete_Button = document.getElementById("Delete_State");
        Delete_Button.addEventListener("click", function () {
            var State_Handler = new States_Manager();
            State_Handler.Grab_Selected_State_ID();
            var State_ID = State_Handler.Grab_Selected_State_ID();
            var action = "Delete_State";
            var Ajax_Data = {
                State_ID: State_ID,
                action: action
            };
            Outgoing_Ajax(Ajax_Data);
            var Response_Data = jQuery.parseJSON(Incoming_Ajax_Data);
            var Modal = '#Display_Delete_State_Form';
            var Message = 'delete failed because this state has districts';
            State_Handler.Validate_Response(Response_Data, Modal, Message);
        });
    };
    this.Validate_Response = function(Response_Data, Modal, Message){
        if (Response_Data !== false) {
            $(Modal).modal('hide');
            var State_Handler = new States_Manager();
            State_Handler.Get_Drop_Down_Data();
        }
        else {
            alert(Message);
        }
    };
}

function District_Manager(){
    this.Grab_Selected_District_ID = function (){
        var District_ID = document.getElementById("Select_Districts").value;
        return District_ID;
    };
    this.Get_Drop_Down_Data = function(State_ID){
        var action = "Get_Districts";
        var Ajax_Data = {
            State_ID: State_ID,
            action: action
        };
        Outgoing_Ajax(Ajax_Data);
        var Districts_Data = jQuery.parseJSON(Incoming_Ajax_Data);
        if (document.location.pathname != "/cs604/Ali/Unit%20Testing/Integrated_Find%20My%20Route/user.html"){
            this.Clear_Form();
            this.Create_Listener();
            this.Update_Listener();
            this.Delete_Listener();
        }
        this.Update_Drop_Down(Districts_Data);
        this.Select_Listener();
    };
    this.Get_Update_Data = function(){
        var District_Handler = new District_Manager();
        var District_ID = District_Handler.Grab_Selected_District_ID;
        var action = "Get_District_Data";
        var Ajax_Data = {
            District_ID: District_ID,
            action: action
        };
        Outgoing_Ajax(Ajax_Data);
        var District_Data = jQuery.parseJSON(Incoming_Ajax_Data);
        document.getElementById("Update_District_Name").value = District_Data[0].DISTRICT_NAME;
    };
    this.Update_Drop_Down = function(Districts_Data){
        document.getElementById('Select_Districts').options.length = 1;
        var select = document.getElementById("Select_Districts");
        var i;
        for (i = 0; i < Districts_Data.length; i++) {
            select.options[select.options.length] = new Option(Districts_Data[i].DISTRICT_NAME, Districts_Data[i].DISTRICT_ID);
        }

    };
    this.Clear_Form = function(){
        document.getElementById("Create_District_Name").value = "";
        Hide_District_GUI();
        Hide_School_GUI();
        Hide_Bus_Stop_Number_GUI();
        Hide_Bus_Stop_Detail_GUI();
    };
    this.Select_Listener = function(){
        var Select_Drop_Down = document.getElementById("Select_Districts");
        Select_Drop_Down.addEventListener("change", function () {
            var District_ID = Select_Drop_Down.options[Select_Drop_Down.selectedIndex].value;
            if (District_ID != "") {
                var School_Handler = new School_Manager();
                School_Handler.Get_Drop_Down_Data(District_ID);
                Display_District_GUI();
            }
            else{
                Hide_District_GUI();
                Hide_School_GUI();
                Hide_Bus_Stop_Number_GUI();
                Hide_Bus_Stop_Detail_GUI();
            }
        });
    };
    this.Create_Listener = function(){
        var Create_Button = document.getElementById("Create_District");
        Create_Button.addEventListener("click", function () {
            var State_Handler = new States_Manager();
            State_Handler.Grab_Selected_State_ID();
            var State_ID = State_Handler.Grab_Selected_State_ID();
            var District_Name = document.getElementById("Create_District_Name").value;
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
                var Response_Data = jQuery.parseJSON(Incoming_Ajax_Data);
                var Modal = '#Display_Create_District_Form';
                var Message = 'district creation failed, please try again';
                var District_Handler = new District_Manager();
                District_Handler.Validate_Response(Response_Data, Modal, Message);
            }
        });
    };
    this.Update_Listener = function(){
        var Update_Button = document.getElementById("Update_District");
        Update_Button.addEventListener("click", function () {
            var New_District_Name = document.getElementById("Update_District_Name").value;
            var Names = ["District Name"];
            var Values = [New_District_Name];
            if (Validate_Text_Fields(Names, Values) != false) {
                var District_Handler = new District_Manager();
                var District_ID = District_Handler.Grab_Selected_District_ID;
                var action = "Update_District";
                var Ajax_Data = {
                    District_ID: District_ID,
                    New_District_Name: New_District_Name,
                    action: action
                };
                Outgoing_Ajax(Ajax_Data);
                var Response_Data = jQuery.parseJSON(Incoming_Ajax_Data);
                var Modal = '#Display_Update_District_Form';
                var Message = 'district update failed, please try again';
                District_Handler.Validate_Response(Response_Data, Modal, Message);
            }
        });
    };
    this.Delete_Listener = function(){
        var Delete_Button = document.getElementById("Delete_District");
        Delete_Button.addEventListener("click", function () {
            var District_Handler = new District_Manager();
            var District_ID = District_Handler.Grab_Selected_District_ID;
            var action = "Delete_District";
            var Ajax_Data = {
                District_ID: District_ID,
                action: action
            };
            Outgoing_Ajax(Ajax_Data);
            var Response_Data = jQuery.parseJSON(Incoming_Ajax_Data);
            var Modal = '#Display_Delete_District_Form';
            var Message = 'delete failed because this district has schools';
            District_Handler.Validate_Response(Response_Data, Modal, Message);
        });
    };
    this.Validate_Response = function(Response_Data, Modal, Message){
        var State_Handler = new States_Manager();
        State_Handler.Grab_Selected_State_ID();
        var State_ID = State_Handler.Grab_Selected_State_ID();
        if (Response_Data !== false) {
            $(Modal).modal('hide');
            var District_Handler = new District_Manager();
            District_Handler.Get_Drop_Down_Data(State_ID);
        }
        else {
            alert(Message);
        }
    };
}

function School_Manager(){
    this.Grab_Selected_School_ID = function (){
        var School_ID = document.getElementById("Select_Schools").value;
        return School_ID;
    };
    this.Get_Drop_Down_Data = function(District_ID){
        var action = "Get_Schools";
        var Ajax_Data = {
            District_ID: District_ID,
            action: action
        };
        Outgoing_Ajax(Ajax_Data);
        var Schools_Data = jQuery.parseJSON(Incoming_Ajax_Data);
        if (document.location.pathname != "/cs604/Ali/Unit%20Testing/Integrated_Find%20My%20Route/user.html"){
            this.Clear_Form();
            this.Create_Listener();
            this.Update_Listener();
            this.Delete_Listener();
        }
        this.Update_Drop_Down(Schools_Data);
        this.Select_Listener();
    };
    this.Get_Update_Data = function(){
        var School_ID = this.Grab_Selected_School_ID();
        var action = "Get_School_Data";
        var Ajax_Data = {
            School_ID: School_ID,
            action: action
        };
        Outgoing_Ajax(Ajax_Data);
        var School_Data = jQuery.parseJSON(Incoming_Ajax_Data);
        document.getElementById("Update_School_Name").value = School_Data[0].SCHOOL_NAME;
        document.getElementById("Update_School_Address").value = School_Data[0].SCHOOL_ADDRESS;
    };
    this.Update_Drop_Down = function(Schools_Data){
        document.getElementById('Select_Schools').options.length = 1;
        var select = document.getElementById("Select_Schools");
        var i;
        for (i = 0; i < Schools_Data.length; i++) {
            select.options[select.options.length] = new Option(Schools_Data[i].SCHOOL_NAME, Schools_Data[i].SCHOOL_ID);
        }
    };
    this.Clear_Form = function(){
        document.getElementById("Create_School_Name").value = "";
        document.getElementById("Create_School_Address").value = "";
        Hide_School_GUI();
        Hide_Bus_Stop_Number_GUI();
        Hide_Bus_Stop_Detail_GUI();
    };
    this.Select_Listener = function(){
        var Select_Drop_Down = document.getElementById("Select_Schools");
        Select_Drop_Down.addEventListener("change", function () {
            var School_ID = Select_Drop_Down.options[Select_Drop_Down.selectedIndex].value;
            if (School_ID != ""){
                var View_All_Buses_Handler = new View_All_Buses_Manager();
                View_All_Buses_Handler.Get_Drop_Down_Data(School_ID);
                if (document.location.pathname != "/cs604/Ali/Unit%20Testing/Integrated_Find%20My%20Route/user.html") {
                    var Bus_Stop_Number_Handler = new Bus_Stop_Number_Manager();
                    Bus_Stop_Number_Handler.Get_Drop_Down_Data(School_ID);
                }
                Display_School_GUI();
            }
            else{
                Hide_School_GUI();
                Hide_Bus_Stop_Number_GUI();
                Hide_Bus_Stop_Detail_GUI();
            }
        });
    };
    this.Create_Listener = function(){
        var Create_Button = document.getElementById("Create_School");
        Create_Button.addEventListener("click", function () {
            var District_ID = this.Grab_Selected_District_ID();
            var School_Name = document.getElementById("Create_School_Name").value;
            var School_Address = document.getElementById("Create_School_Address").value;
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
                var Response_Data = jQuery.parseJSON(Incoming_Ajax_Data);
                var Modal = '#Display_Create_School_Form';
                var Message = 'district creation failed, please try again';
                var School_Handler = new School_Manager();
                School_Handler.Validate_Response(Response_Data, Modal, Message);
            }
        });
    };
    this.Update_Listener = function(){
        var Update_Button = document.getElementById("Update_School");
        Update_Button.addEventListener("click", function () {
            var New_School_Name = document.getElementById("Update_School_Name").value;
            var New_School_Address = document.getElementById("Update_School_Address").value;
            var Names = ["School Name", "School Address"];
            var Values = [New_School_Name, New_School_Address];
            if (Validate_Text_Fields(Names, Values) != false) {
                var District_Handler = new District_Manager();
                var School_ID = District_Handler.Grab_Selected_District_ID;
                var action = "Update_School";
                var Ajax_Data = {
                    School_ID: School_ID,
                    New_School_Name: New_School_Name,
                    New_School_Address: New_School_Address,
                    action: action
                };
                Outgoing_Ajax(Ajax_Data);
                var Response_Data = jQuery.parseJSON(Incoming_Ajax_Data);
                var Modal = '#Display_Update_School_Form';
                var Message = 'district update failed, please try again';
                var School_Handler = new School_Manager();
                School_Handler.Validate_Response(Response_Data, Modal, Message);
            }
        });
    };
    this.Delete_Listener = function(){
        var Delete_Button = document.getElementById("Delete_School");
        Delete_Button.addEventListener("click", function () {
            var School_Handler = new School_Manager();
            var School_ID = School_Handler.Grab_Selected_School_ID();
            var action = "Delete_School";
            var Ajax_Data = {
                School_ID: School_ID,
                action: action
            };
            Outgoing_Ajax(Ajax_Data);
            var Response_Data = jQuery.parseJSON(Incoming_Ajax_Data);
            var Modal = '#Display_Delete_School_Form';
            var Message = 'delete failed because this school has bus numbers';
            School_Handler.Validate_Response(Response_Data, Modal, Message);
        });
    };
    this.Validate_Response = function(Response_Data, Modal, Message){
        var District_ID = this.Grab_Selected_District_ID();
        if (Response_Data !== false) {
            $(Modal).modal('hide');
            var School_Handler = new School_Manager();
            School_Handler.Get_Drop_Down_Data(District_ID);
        }
        else {
            alert(Message);
        }
    };
}

function View_All_Buses_Manager(){
    this.Get_Drop_Down_Data = function(School_ID){
        var action = "Get_View_All_Buses";
        var Ajax_Data = {
            School_ID: School_ID,
            action: action
        };
        Outgoing_Ajax(Ajax_Data);
        var Bus_Stop_Data = jQuery.parseJSON(Incoming_Ajax_Data);
        this.Update_Table(Bus_Stop_Data);
    };
    this.Update_Table = function(Bus_Stop_Data){
        var View_All_Bus_Stops = '<thead><tr><th>Bus #</th><th>Stop Time</th><th>Stop Address</th></tr></thead><tbody>';
        var i;
        for (i = 0; i < Bus_Stop_Data.length; i++) {
            j = Bus_Stop_Data[i].BUS_STOP_NUMBER;
            View_All_Bus_Stops += '<tr>';
            var Row_Span = 0;
            var j;
            for (j = i; Bus_Stop_Data[i].BUS_STOP_NUMBER !== Last_Bus && j < Bus_Stop_Data.length && Bus_Stop_Data[j].BUS_STOP_NUMBER == Bus_Stop_Data[i].BUS_STOP_NUMBER; j++) {
                Row_Span++;
            }
            if (Row_Span > 0) {
                var Last_Bus = Bus_Stop_Data[i].BUS_STOP_NUMBER;
                View_All_Bus_Stops += '<td rowspan="' + Row_Span + '">' + Last_Bus + '</td>';
            }
            View_All_Bus_Stops += '<td>' + Bus_Stop_Data[i].BUS_STOP_TIME + '</td><td>' + Bus_Stop_Data[i].BUS_STOP_ADDRESS + '</td></tr>';
        }
        View_All_Bus_Stops += '</tbody>';
        document.getElementById("View_All_Bus_Stops").innerHTML = View_All_Bus_Stops;
    };
}

function Bus_Stop_Number_Manager(){
    this.Grab_Selected_Bus_Stop_Number_ID = function (){
        var Bus_Stop_Number_ID = document.getElementById("Select_Bus_Stop_Numbers").value;
        return Bus_Stop_Number_ID;
    };
    this.Get_Drop_Down_Data = function(School_ID){
        var action = "Get_Bus_Stop_Numbers";
        var Ajax_Data = {
            School_ID: School_ID,
            action: action
        };
        Outgoing_Ajax(Ajax_Data);
        var Bus_Stops_Number_Data = jQuery.parseJSON(Incoming_Ajax_Data);
        if (document.location.pathname != "/cs604/Ali/Unit%20Testing/Integrated_Find%20My%20Route/user.html"){
            this.Clear_Form();
            this.Create_Listener();
            this.Update_Listener();
            this.Delete_Listener();
        }
        this.Update_Drop_Down(Bus_Stops_Number_Data);
        this.Select_Listener();
    };
    this.Get_Update_Data = function(){
        var Bus_Stop_Number_ID = this.Grab_Selected_Bus_Stop_Number_ID();
        var action = "Get_Bus_Stop_Number_Data";
        var Ajax_Data = {
            Bus_Stop_Number_ID: Bus_Stop_Number_ID,
            action: action
        };
        Outgoing_Ajax(Ajax_Data);
        var Bus_Stop_Data = jQuery.parseJSON(Incoming_Ajax_Data);
        document.getElementById("Update_Bus_Number").value = Bus_Stop_Data[0].BUS_STOP_NUMBER;
    };
    this.Update_Drop_Down = function(Bus_Stops_Number_Data){
        document.getElementById('Select_Bus_Stop_Numbers').options.length = 1;
        var select = document.getElementById("Select_Bus_Stop_Numbers");
        var i;
        for (i = 0; i < Bus_Stops_Number_Data.length; i++) {
            select.options[select.options.length] = new Option(Bus_Stops_Number_Data[i].BUS_STOP_NUMBER, Bus_Stops_Number_Data[i].BUS_STOP_NUMBER_ID);
        }
    };
    this.Clear_Form = function(){
        document.getElementById("Create_Bus_Number").value = "";
        Hide_Bus_Stop_Number_GUI();
        Hide_Bus_Stop_Detail_GUI();
    };
    this.Select_Listener = function(){
        var Select_Drop_Down = document.getElementById("Select_Bus_Stop_Numbers");
        Select_Drop_Down.addEventListener("change", function () {
            var Bus_Stop_Number_ID = Select_Drop_Down.options[Select_Drop_Down.selectedIndex].value;
            if (Bus_Stop_Number_ID != ""){
                var Bus_Stop_Detail_Handler = new Bus_Stop_Detail_Manager();
                Bus_Stop_Detail_Handler.Get_Drop_Down_Data(Bus_Stop_Number_ID);
                Display_Bus_Stop_Number_GUI();
            }
            else{
                Hide_Bus_Stop_Number_GUI();
                Hide_Bus_Stop_Detail_GUI();
            }
        });
    };
    this.Create_Listener = function(){
        var Create_Button = document.getElementById("Create_Bus_Stop_Number");
        Create_Button.addEventListener("click", function () {
            var School_Handler = new School_Manager();
            var School_ID = School_Handler.Grab_Selected_School_ID();
            var Bus_Stop_Number = document.getElementById("Create_Bus_Number").value;
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
                var Response_Data = jQuery.parseJSON(Incoming_Ajax_Data);
                var Modal = '#Display_Create_Bus_Stop_Number_Form';
                var Message = 'bus number creation failed, please try again';
                var Bus_Stop_Number_Handler = new Bus_Stop_Number_Manager();
                Bus_Stop_Number_Handler.Validate_Response(Response_Data, Modal, Message);
            }
        });
    };
    this.Update_Listener = function(){
        var Update_Button = document.getElementById("Update_Bus_Stop_Number");
        Update_Button.addEventListener("click", function () {
            var New_Bus_Stop_Number= document.getElementById("Update_Bus_Number").value;
            var Names = ["Bus Stop Number"];
            var Values = [New_Bus_Stop_Number];
            if (Validate_Text_Fields(Names, Values) != false) {
                var Bus_Stop_Number_Handler = new Bus_Stop_Number_Manager();
                var Bus_Stop_Number_ID = Bus_Stop_Number_Handler.Grab_Selected_Bus_Stop_Number_ID();
                var action = "Update_Bus_Stop_Number";
                var Ajax_Data = {
                    Bus_Stop_Number_ID: Bus_Stop_Number_ID,
                    New_Bus_Stop_Number: New_Bus_Stop_Number,
                    action: action
                };
                Outgoing_Ajax(Ajax_Data);
                var Response_Data = jQuery.parseJSON(Incoming_Ajax_Data);
                var Modal = '#Display_Update_Bus_Stop_Number_Form';
                var Message = 'bus number update failed, please try again';
                Bus_Stop_Number_Handler.Validate_Response(Response_Data, Modal, Message);
            }
        });
    };
    this.Delete_Listener = function(){
        var Delete_Button = document.getElementById("Delete_Bus_Stop_Number");
        Delete_Button.addEventListener("click", function () {
            var Bus_Stop_Number_Handler = new Bus_Stop_Number_Manager();
            var Bus_Stop_Number_ID = Bus_Stop_Number_Handler.Grab_Selected_Bus_Stop_Number_ID();
            var action = "Delete_Bus_Stop_Number";
            var Ajax_Data = {
                Bus_Stop_Number_ID: Bus_Stop_Number_ID,
                action: action
            };
            Outgoing_Ajax(Ajax_Data);
            var Response_Data = jQuery.parseJSON(Incoming_Ajax_Data);
            var Modal = '#Display_Delete_Bus_Stop_Number_Form';
            var Message = 'delete failed because this bus number has bus addresses';
            Bus_Stop_Number_Handler.Validate_Response(Response_Data, Modal, Message);
        });
    };
    this.Validate_Response = function(Response_Data, Modal, Message){
        var School_Handler = new School_Manager();
        var School_ID = School_Handler.Grab_Selected_School_ID();
        if (Response_Data !== false) {
            $(Modal).modal('hide');
            var View_All_Buses_Handler = new View_All_Buses_Manager();
            var Bus_Stop_Number_Handler = new Bus_Stop_Number_Manager();
            View_All_Buses_Handler.Get_Drop_Down_Data(School_ID);
            Bus_Stop_Number_Handler.Get_Drop_Down_Data(School_ID);
        }
        else {
            alert(Message);
        }
    };
}

function Bus_Stop_Detail_Manager(){
    this.Grab_Selected_Bus_Stop_Detail_ID = function (){
        var Bus_Stop_Detail_ID = document.getElementById("Select_Bus_Stops_Details").value;
        return Bus_Stop_Detail_ID;
    };
    this.Get_Drop_Down_Data = function(Bus_Stop_Number_ID){
        var action = "Get_Bus_Stop_Details";
        var Ajax_Data = {
            Bus_Stop_Detail_ID: Bus_Stop_Detail_ID,
            action: action
        };
        Outgoing_Ajax(Ajax_Data);
        var Bus_Stop_Details_Data = jQuery.parseJSON(Incoming_Ajax_Data);
        if (document.location.pathname != "/cs604/Ali/Unit%20Testing/Integrated_Find%20My%20Route/user.html"){
            this.Clear_Form();
            this.Create_Listener();
            this.Update_Listener();
            this.Delete_Listener();
        }
        this.Update_Drop_Down(Bus_Stop_Details_Data);
        this.Select_Listener();
    };
    this.Get_Update_Data = function(){
        var Bus_Stop_Detail_ID = this.Grab_Selected_Bus_Stop_Detail_ID();
        var action = "Get_Bus_Stop_Detail_Data";
        var Ajax_Data = {
            Bus_Stop_Detail_ID: Bus_Stop_Detail_ID,
            action: action
        };
        Outgoing_Ajax(Ajax_Data);
        var Bus_Stop_Data = jQuery.parseJSON(Incoming_Ajax_Data);
        document.getElementById("Update_Bus_Stop_Time").value = Bus_Stop_Data[0].BUS_STOP_TIME;
        document.getElementById("Update_Bus_Stop_Address").value = Bus_Stop_Data[0].BUS_STOP_ADDRESS;
    };
    this.Update_Drop_Down = function(Bus_Stop_Details_Data){
        document.getElementById('Select_Bus_Stops_Details').options.length = 1;
        var select = document.getElementById("Select_Bus_Stops_Details");
        var i;
        for (i = 0; i < Bus_Stop_Details_Data.length; i++) {
            select.options[select.options.length] = new Option(Bus_Stop_Details_Data[i].BUS_STOP_ADDRESS, Bus_Stop_Details_Data[i].BUS_STOP_DETAIL_ID);
        }
    };
    this.Clear_Form = function(){
        document.getElementById("Create_Bus_Stop_Time").value = "";
        document.getElementById("Create_Bus_Stop_Address").value = "";
        Hide_Bus_Stop_Detail_GUI();
    };
    this.Select_Listener = function(){
        var Select_Drop_Down = document.getElementById("Select_Bus_Stops_Details");
        Select_Drop_Down.addEventListener("change", function () {
            var Bus_Stop_Number_ID = Select_Drop_Down.options[Select_Drop_Down.selectedIndex].value;
            if (Bus_Stop_Number_ID != ""){

                Display_Bus_Stop_Detail_GUI();
            }
            else{
                Hide_Bus_Stop_Detail_GUI();
            }
        });
    };
    this.Create_Listener = function(){
        var Create_Button = document.getElementById("Create_Bus_Stop_Details");
        Create_Button.addEventListener("click", function () {
            var Bus_Stop_Time = document.getElementById("Create_Bus_Stop_Time").value;
            var Bus_Stop_Address = document.getElementById("Create_Bus_Stop_Address").value;
            var Bus_Stop_Latitude = "22"; //temp
            var Bus_Stop_Longitude = "11"; //temp
            var Names = ["Bus Stop Time", "Bus Stop Address", "Bus Stop Latitude", "Bus Stop Longitude"];
            var Values = [Bus_Stop_Time, Bus_Stop_Address, Bus_Stop_Latitude, Bus_Stop_Longitude];
            if (Validate_Text_Fields(Names, Values) != false) {
                var Bus_Stop_Detail_ID = this.Grab_Selected_Bus_Stop_Detail_ID();
                var action = "Create_Bus_Stop_Detail";
                var Ajax_Data = {
                    Bus_Stop_Detail_ID: Bus_Stop_Detail_ID,
                    Bus_Stop_Time: Bus_Stop_Time,
                    Bus_Stop_Address: Bus_Stop_Address,
                    Bus_Stop_Latitude: Bus_Stop_Latitude,
                    Bus_Stop_Longitude: Bus_Stop_Longitude,
                    action: action
                };
                Outgoing_Ajax(Ajax_Data);
                var Response_Data = jQuery.parseJSON(Incoming_Ajax_Data);
                var Modal = '#Display_Create_Bus_Stop_Details_Form';
                var Message = 'bus stop time and address creation failed, please try again';
                var Bus_Stop_Number_Handler = new Bus_Stop_Number_Manager();
                Bus_Stop_Number_Handler.Validate_Response(Response_Data, Modal, Message);
            }
        });
    };
    this.Update_Listener = function(){
        var Update_Button = document.getElementById("Update_Bus_Stop_Details");
        Update_Button.addEventListener("click", function () {
            var Update_Button = document.getElementById("Update_Bus_Stop_Number");
            Update_Button.addEventListener("click", function () {
                var Bus_Stop_Detail_Handler = new Bus_Stop_Detail_Manager();
                var Bus_Stop_Detail_ID = Bus_Stop_Detail_Handler.Grab_Selected_Bus_Stop_Detail_ID();
                var New_Bus_Stop_Time = document.getElementById("Update_Bus_Stop_Time").value;
                var New_Bus_Stop_Address = document.getElementById("Update_Bus_Stop_Address").value;
                var New_Bus_Stop_Latitude = "22"; //temp
                var New_Bus_Stop_Longitude = "11"; //temp
                var Names = ["Bus Stop Time", "Bus Stop Address", "Bus Stop Latitude", "Bus Stop Longitude"];
                var Values = [New_Bus_Stop_Time, New_Bus_Stop_Address, New_Bus_Stop_Latitude, New_Bus_Stop_Longitude];
                if (Validate_Text_Fields(Names, Values) != false) {
                    var action = "Update_Bus_Stop_Detail";
                    var Ajax_Data = {
                        Bus_Stop_Detail_ID: Bus_Stop_Detail_ID,
                        New_Bus_Stop_Time: New_Bus_Stop_Time,
                        New_Bus_Stop_Address: New_Bus_Stop_Address,
                        New_Bus_Stop_Latitude: New_Bus_Stop_Latitude,
                        New_Bus_Stop_Longitude: New_Bus_Stop_Longitude,
                        action: action
                    };
                    Outgoing_Ajax(Ajax_Data);
                    var Response_Data = jQuery.parseJSON(Incoming_Ajax_Data);
                    var Modal = '#Display_Update_Bus_Stop_Details_Form';
                    var Message = 'bus number update failed, please try again';
                    Bus_Stop_Detail_Handler.Validate_Response(Response_Data, Modal, Message);
                }
            });
        });
    };
    this.Delete_Listener = function(){
        var Delete_Button = document.getElementById("Delete_Bus_Stop_Detail");
        Delete_Button.addEventListener("click", function () {
            var Bus_Stop_Detail_Handler = new Bus_Stop_Detail_Manager();
            var Bus_Stop_Detail_ID = Bus_Stop_Detail_Handler.Grab_Selected_Bus_Stop_Detail_ID();
            var action = "Delete_Bus_Stop_Detail";
            var Ajax_Data = {
                Bus_Stop_Detail_ID: Bus_Stop_Detail_ID,
                action: action
            };
            Outgoing_Ajax(Ajax_Data);
            var Response_Data = jQuery.parseJSON(Incoming_Ajax_Data);
            var Modal = '#Display_Delete_Bus_Stop_Details_Form';
            var Message = 'delete failed';
            var Bus_Stop_Number_Handler = new Bus_Stop_Number_Manager();
            Bus_Stop_Number_Handler.Validate_Response(Response_Data, Modal, Message);
        });
    };
    this.Validate_Response = function(Response_Data, Modal, Message){
        var Bus_Stop_Detail_ID = this.Grab_Selected_Bus_Stop_Detail_ID();
        if (Response_Data !== false) {
            $(Modal).modal('hide');
            var Bus_Stop_Detail_Handler = new Bus_Stop_Detail_Manager();
            Bus_Stop_Detail_Handler.Get_Drop_Down_Data(Bus_Stop_Detail_ID);
        }
        else {
            alert(Message);
        }
    };
}

function Clear_Display_Create_State_Form(){
    document.getElementById("Create_State_Name").value = "";
}

function Clear_Display_Create_District_Form(){
    document.getElementById("Create_District_Name").value = "";
}

function Clear_Display_Create_School_Form(){
    document.getElementById("Create_School_Name").value = "";
    document.getElementById("Create_School_Address").value = "";
}

function Clear_Display_Create_Bus_Number_Form(){
    document.getElementById("Create_Bus_Number").value = "";
}

function Clear_Display_Create_Bus_Stop_Details_Form(){
    document.getElementById("Create_Bus_Stop_Time").value = "";
    document.getElementById("Create_Bus_Stop_Address").value = "";
}

function Populate_Display_Update_State_Form(){
    var State_Handler = new States_Manager();
    State_Handler.Get_Update_Data();
}

function Populate_Display_Update_District_Form(){
    var District_Handler = new District_Manager();
    District_Handler.Get_Update_Data();
}

function Populate_Display_Update_School_Form(){
    var School_Handler = new School_Manager();
    School_Handler.Get_Update_Data();
}

function Populate_Display_Update_Bus_Number_Form(){
    var Bus_Stop_Number_Handler = new Bus_Stop_Number_Manager();
    Bus_Stop_Number_Handler.Get_Update_Data();
}

function Populate_Display_Update_Bus_Stop_Details_Form(){
    var Bus_Stop_Detail_Handler = new Bus_Stop_Detail_Manager();
    Bus_Stop_Detail_Handler.Get_Update_Data();
}

function Display_Delete_State_Form(){
    x = document.getElementById("Select_States").selectedIndex;
    y = document.getElementById("Select_States").options;
    State_Name = y[x].text;
    message = "Are you sure you want to delete <b>" + State_Name + "</b> state?";
    document.getElementById("Delete_State_Place_Holder").innerHTML = message;
}

function Display_Delete_District_Form(){
    x = document.getElementById("Select_Districts").selectedIndex;
    y = document.getElementById("Select_Districts").options;
    State_Name = y[x].text;
    message = "Are you sure you want to delete <b>" + State_Name + "</b> state?";
    document.getElementById("Delete_District_Place_Holder").innerHTML = message;
}

function Display_Delete_School_Form(){
    x = document.getElementById("Select_Schools").selectedIndex;
    y = document.getElementById("Select_Schools").options;
    State_Name = y[x].text;
    message = "Are you sure you want to delete <b>" + State_Name + "</b> state?";
    document.getElementById("Delete_School_Place_Holder").innerHTML = message;
}

function Display_Delete_Bus_Number_Form(){
    x = document.getElementById("Select_Bus_Stop_Numbers").selectedIndex;
    y = document.getElementById("Select_Bus_Stop_Numbers").options;
    State_Name = y[x].text;
    message = "Are you sure you want to delete <b>" + State_Name + "</b> state?";
    document.getElementById("Delete_Bus_Stop_Number_Place_Holder").innerHTML = message;
}

function Display_Delete_Bus_Stop_Details_Form(){
    x = document.getElementById("Select_Bus_Stops_Details").selectedIndex;
    y = document.getElementById("Select_Bus_Stops_Details").options;
    State_Name = y[x].text;
    message = "Are you sure you want to delete <b>" + State_Name + "</b> state?";
    document.getElementById("Delete_Bus_Stop_Detail_Place_Holder").innerHTML = message;
}

function Display_State_GUI(){
    document.getElementById("Select_Districts").style.visibility="visible";
    if (document.location.pathname != "/cs604/Ali/Unit%20Testing/Integrated_Find%20My%20Route/user.html") {
        document.getElementById("Update_State_Form_Button").style.visibility="visible";
        document.getElementById("Delete_State_Form_Button").style.visibility="visible";
        document.getElementById("Create_District_Form_Button").style.visibility="visible";
    }
}

function Display_District_GUI(){
    document.getElementById("Select_Schools").style.visibility="visible";
    if (document.location.pathname != "/cs604/Ali/Unit%20Testing/Integrated_Find%20My%20Route/user.html") {
        document.getElementById("Update_District_Form_Button").style.visibility="visible";
        document.getElementById("Delete_District_Form_Button").style.visibility="visible";
        document.getElementById("Create_School_Form_Button").style.visibility="visible";
    }
}

function Display_School_GUI(){
    document.getElementById("View_All_Buses_Button").style.visibility="visible";
    if (document.location.pathname != "/cs604/Ali/Unit%20Testing/Integrated_Find%20My%20Route/user.html") {
        document.getElementById("Select_Bus_Stop_Numbers").style.visibility="visible";
        document.getElementById("Update_School_Form_Button").style.visibility="visible";
        document.getElementById("Delete_School_Form_Button").style.visibility="visible";
        document.getElementById("Create_Bus_Stop_Number_Form_Button").style.visibility="visible";
    }
}

function Display_Bus_Stop_Number_GUI(){
    if (document.location.pathname != "/cs604/Ali/Unit%20Testing/Integrated_Find%20My%20Route/user.html") {
        document.getElementById("Select_Bus_Stops_Details").style.visibility="visible";
        document.getElementById("Update_Bus_Stop_Number_Form_Button").style.visibility="visible";
        document.getElementById("Delete_Bus_Stop_Number_Form_Button").style.visibility="visible";
        document.getElementById("Create_Bus_Stop_Details_Form_Button").style.visibility="visible";
    }
}

function Display_Bus_Stop_Detail_GUI(){
    if (document.location.pathname != "/cs604/Ali/Unit%20Testing/Integrated_Find%20My%20Route/user.html") {
        document.getElementById("Update_Bus_Stop_Details_Form_Button").style.visibility="visible";
        document.getElementById("Delete_Bus_Stop_Details_Form_Button").style.visibility="visible";
    }
}

function Hide_State_GUI(){
    document.getElementById("Select_Districts").style.visibility="hidden";
    if (document.location.pathname != "/cs604/Ali/Unit%20Testing/Integrated_Find%20My%20Route/user.html") {
        document.getElementById("Update_State_Form_Button").style.visibility="hidden";
        document.getElementById("Delete_State_Form_Button").style.visibility="hidden";
        document.getElementById("Create_District_Form_Button").style.visibility="hidden";
    }
}

function Hide_District_GUI(){
    document.getElementById("Select_Schools").style.visibility="hidden";
    if (document.location.pathname != "/cs604/Ali/Unit%20Testing/Integrated_Find%20My%20Route/user.html") {
        document.getElementById("Update_District_Form_Button").style.visibility="hidden";
        document.getElementById("Delete_District_Form_Button").style.visibility="hidden";
        document.getElementById("Create_School_Form_Button").style.visibility="hidden";
    }
}

function Hide_School_GUI(){
    document.getElementById("View_All_Buses_Button").style.visibility="hidden";
    if (document.location.pathname != "/cs604/Ali/Unit%20Testing/Integrated_Find%20My%20Route/user.html") {
        document.getElementById("Select_Bus_Stop_Numbers").style.visibility="hidden";
        document.getElementById("Update_School_Form_Button").style.visibility="hidden";
        document.getElementById("Delete_School_Form_Button").style.visibility="hidden";
        document.getElementById("Create_Bus_Stop_Number_Form_Button").style.visibility="hidden";
    }
}

function Hide_Bus_Stop_Number_GUI(){
    if (document.location.pathname != "/cs604/Ali/Unit%20Testing/Integrated_Find%20My%20Route/user.html") {
        document.getElementById("Select_Bus_Stops_Details").style.visibility="hidden";
        document.getElementById("Update_Bus_Stop_Number_Form_Button").style.visibility="hidden";
        document.getElementById("Delete_Bus_Stop_Number_Form_Button").style.visibility="hidden";
        document.getElementById("Create_Bus_Stop_Details_Form_Button").style.visibility="hidden";
    }
}

function Hide_Bus_Stop_Detail_GUI(){
    if (document.location.pathname != "/cs604/Ali/Unit%20Testing/Integrated_Find%20My%20Route/user.html") {
        document.getElementById("Update_Bus_Stop_Details_Form_Button").style.visibility = "hidden";
        document.getElementById("Delete_Bus_Stop_Details_Form_Button").style.visibility = "hidden";
    }
}

//Below codes need to be refactored.
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
        //return the person back to user and tell them to login
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

function Login() {
    var Email = document.getElementById("Email").value;
    var Password = document.getElementById("Password").value;
    Encryption(Email, Password);
}

function Encryption(Email, Password) {
    var Encrypted_Password = Password;
    Get_Login(Email, Encrypted_Password);
}

function Logout() {
    End_Web_Storage(Email);
    window.location.href = "user.html";
    localStorage.removeItem("email");
}
//Above code needs to be refactored