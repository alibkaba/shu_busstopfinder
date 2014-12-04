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

    Main();


});


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

function Get_Page_Name(){
    var Page_Name = window.location.pathname.substring(window.location.pathname.lastIndexOf('/')+1);
    return Page_Name;
}


function Main(){

    //UT DB
    var States = new Manage_States();
    var Districts = new Manage_Districts();
    var Schools = new Manage_Schools();
    var List_of_States = States.Read_From_DB();
    States.Set_GUI("hidden");
    Districts.Set_GUI("hidden");
    Schools.Set_GUI("hidden");
    //UT List of States
    States.Update_Drop_Down(List_of_States);
    States.Set_List("visible");



}


function Get_States(){

    var States = new Manage_States();
    var Districts = new Manage_Districts();
    var Schools = new Manage_Schools();
    var List_of_States = States.Read_From_DB();
    States.Set_GUI("hidden");
    Districts.Set_GUI("hidden");
    Schools.Set_GUI("hidden");
    //UT List of States
    States.Update_Drop_Down(List_of_States);
    States.Set_List("visible");
}

function Add_State(State_Name){
    var State = new Manage_States();
    //validate here
    State.Add(State_Name);
}
function Update_State(State_Name){
    var State = new Manage_States();
    //validate here
    State.Update(State_Name);
}

function Delete_State(){
    var State = new Manage_States();
    var State_ID = State.Get_ID();
    //validate here
    State.Delete(State_ID);
}


function Get_Districts(State_ID){

    var States = new Manage_States();
    var Districts = new Manage_Districts();
    var Schools = new Manage_Schools();
    States.Set_GUI("hidden");
    Districts.Set_GUI("hidden");
    States.Set_GUI("visible");
    var List_of_Districts = Districts.Read_From_DB(State_ID);
    //validate districts
    Districts.Update_Drop_Down(List_of_Districts);
    Districts.Set_GUI("visible");
    Schools.Set_List("visible");


}

function Add_District(District_Name){
    var District = new Manage_Districts();
    //validate here
    District.Add(District_Name);
}
function Update_District(District_Name){
    var District = new Manage_Districts();
    //validate here
    District.Update(District_Name);
}

function Delete_District(){
    var District = new Manage_Districts();
    var District_ID = District.Get_ID();
    //validate here
    District.Delete(District_ID);
}



function Get_Schools(District_ID){
    var State = new Manage_States();
    var District = new Manage_Districts();
    var Schools = new Manage_Schools();
    var State_ID = State.Get_ID();
    var List_of_Schools = Schools.Read_From_DB(District_ID);
    //Validate list of schools
    Schools.Update_Drop_Down(List_of_Schools);
    Schools.Set_GUI("visible");

}

function Add_School(School_Name){
    var School = new Manage_Schools();
    //validate here
    School.Add(School_Name);
}
function Update_School(School_Name){
    var School = new Manage_Schools();
    //validate here
    School.Update(School_Name);
}

function Delete_School(){
    var School = new Manage_Schools();
    var School_ID = School.Get_ID();
    //validate here
    School.Delete(School_ID);
}



function Manage_Buses(School_ID){
    var Bus_Manager = new Manage_Bus_Stops();
    var List_of_Buses = Bus_Manager.Read_From_DB(School_ID);
    Bus_Manager.Update_Drop_Down(List_of_Buses);
    Bus_Manager.Set_List("visible");

}

function Add_Bus_Number(Bus_Numbere){
    var Bus_Number = new Manage_Bus_Stops();
    //validate here
    Bus_Number.Add(Bus_Number);
}
function Update_Bus_Number(Bus_Number){
    var Bus_Number = new Manage_Bus_Stops();
    //validate here
    Bus_Number.Update(Bus_Number);
}

function Delete_Bus_Number(){
    var Bus_Number = new Manage_Bus_Stops();
    var Bus_Number_ID = Bus_Number.Get_ID();
    //validate here
    Bus_Number.Delete(Bus_Number_ID);
}



function Manage_States(){
    this.Get_ID = function (){
        var State_ID = document.getElementById("Select_States").value;
        return State_ID;
    };
    this.Read_From_DB = function(){
        var action = "Get_States";
        var Ajax_Data = {
            action: action
        };
        Outgoing_Ajax(Ajax_Data);
        var List_of_States = jQuery.parseJSON(Incoming_Ajax_Data);
        return List_of_States;
    };
    this.Update_Drop_Down = function(States_Data){
        document.getElementById('Select_States').options.length = 1;
        var select = document.getElementById("Select_States");
        var i;
        if (typeof States_Data != 'undefined')
            for (i = 0; i < States_Data.length; i++) {
                select.options[select.options.length] = new Option(States_Data[i].STATE_NAME, States_Data[i].STATE_ID);
            }
    };
    this.Set_GUI = function(action){
        document.getElementById("Select_Districts").style.visibility=action;
        if (window.location.pathname.substring(window.location.pathname.lastIndexOf('/')+1) == 'admin.html') {
            document.getElementById("Update_State_Form_Button").style.visibility=action;
            document.getElementById("Delete_State_Form_Button").style.visibility=action;
            document.getElementById("Create_District_Form_Button").style.visibility=action;
        }
    };
    this.Set_List = function(action){
        document.getElementById("Select_States").style.visibility=action;
    };

    this.Clear_Form = function(){ //DEL
        if (window.location.pathname.substring(window.location.pathname.lastIndexOf('/')+1) == 'admin.html') {
            document.getElementById("Create_State_Name").value = "";
        }
        Hide_State_GUI();
        Hide_District_GUI();
        Hide_School_GUI();
        Hide_Bus_Stop_Number_GUI();
        Hide_Bus_Stop_Detail_GUI();
    };

    this.Add = function(){
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
            var State_Handler = new Manage_States();
            State_Handler.Validate_Response(Response_Data, Modal, Message);
        }

    };
    this.Update = function(New_State_Name){
        var action = "Update_State";
        var Names = ["State Name"];
        var Values = [New_State_Name];
        if (Validate_Text_Fields(Names, Values) != false) {
            var State_Handler = new Manage_States();
            State_Handler.Get_ID();
            var State_ID = State_Handler.Get_ID();
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


    };
    this.Delete = function(State_ID){
        var State_Handler = new Manage_States();
        var action = "Get_Districts";
        var Ajax_Data = {
            State_ID: State_ID,
            action: action
        };
        Outgoing_Ajax(Ajax_Data);
        var Districts_Data = jQuery.parseJSON(Incoming_Ajax_Data);
        if (!$.trim(Districts_Data)){
            State_Handler.Delete_Data(State_ID);
        } else {
            alert("This state has districts, please remove them first");
        }

    };
    this.Delete_Data = function(State_ID){
        var action = "Delete_State";
        var Ajax_Data = {
            State_ID: State_ID,
            action: action
        };
        Outgoing_Ajax(Ajax_Data);
        var Response_Data = jQuery.parseJSON(Incoming_Ajax_Data);
        var Modal = '#Display_Delete_State_Form';
        var Message = 'delete failed because this state has districts';
        var State_Handler = new Manage_States();
        State_Handler.Validate_Response(Response_Data, Modal, Message);
    };
    this.Validate_Response = function(Response_Data, Modal, Message){
        if (Response_Data !== false) {
            $(Modal).modal('hide');
            Get_States();

        }
        else {
            alert(Message);
        }
    };
}





function Manage_Districts(){
    this.Get_ID = function (){
        var State_ID = document.getElementById("Select_Districts").value;
        return State_ID;
    };
    this.Read_From_DB = function(State_ID){
        var action = "Get_Districts";
        var Ajax_Data = {
            State_ID: State_ID,
            action: action
        };
        Outgoing_Ajax(Ajax_Data);
        var Districts_Data = jQuery.parseJSON(Incoming_Ajax_Data);
        return Districts_Data;

    };
    this.Read_From_DB = function(){
        var District_Handler = new Manage_Districts();
        var District_ID = District_Handler.Get_ID;
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
        var select = document.getElementById("Select_Districts");
        var i;
        if (typeof Districts_Data != 'undefined')
            for (i = 0; i < Districts_Data.length; i++) {
                select.options[select.options.length] = new Option(Districts_Data[i].DISTRICT_NAME, Districts_Data[i].DISTRICT_ID);
            }

    };
    this.Set_GUI = function(action){
        document.getElementById("Select_Schools").style.visibility=action;
        if (window.location.pathname.substring(window.location.pathname.lastIndexOf('/')+1) == 'admin.html') {
            document.getElementById("Update_District_Form_Button").style.visibility=action;
            document.getElementById("Delete_District_Form_Button").style.visibility=action;
            document.getElementById("Create_School_Form_Button").style.visibility=action;
        }
    };
    this.Set_List = function(action){
        document.getElementById("Select_Districts").style.visibility=action;

    };
    this.Clear_Form = function(){
        if (window.location.pathname.substring(window.location.pathname.lastIndexOf('/')+1) == 'admin.html') {
            document.getElementById("Create_District_Name").value = "";
        }
        Hide_District_GUI();
        Hide_School_GUI();
        Hide_Bus_Stop_Number_GUI();
        Hide_Bus_Stop_Detail_GUI();
    };

    this.Add = function(){
        var State_Handler = new Manage_States();
        State_Handler.Get_ID();
        var State_ID = State_Handler.Get_ID();
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
            var District_Handler = new Manage_Districts();
            District_Handler.Validate_Response(Response_Data, Modal, Message);
        }

    };
    this.Update = function(New_District_Name){
        //var New_District_Name = document.getElementById("Update_District_Name").value;
        var Names = ["District Name"];
        var Values = [New_District_Name];
        if (Validate_Text_Fields(Names, Values) != false) {
            var District_Handler = new Manage_Districts();
            var District_ID = District_Handler.Get_ID;
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
    };
    this.Delete = function(District_ID){
        var District_Handler = new Manage_Districts();
        //var District_ID = District_Handler.Get_ID();
        var action = "Get_Schools";
        var Ajax_Data = {
            District_ID: District_ID,
            action: action
        };
        Outgoing_Ajax(Ajax_Data);
        var Schools_Data = jQuery.parseJSON(Incoming_Ajax_Data);
        if (!$.trim(Schools_Data)){
            District_Handler.Delete_Data(District_ID);
        } else {
            alert("This district has schools, please remove them first");
        }
    };
    this.Delete_Data = function(District_ID){
        var action = "Delete_District";
        var Ajax_Data = {
            District_ID: District_ID,
            action: action
        };
        Outgoing_Ajax(Ajax_Data);
        var Response_Data = jQuery.parseJSON(Incoming_Ajax_Data);
        var Modal = '#Display_Delete_District_Form';
        var Message = 'delete failed because this district has schools';
        var District_Handler = new Manage_Districts();
        District_Handler.Validate_Response(Response_Data, Modal, Message);
    };
    this.Validate_Response = function(Response_Data, Modal, Message){
        var State_Handler = new Manage_States();
        var State_ID = State_Handler.Get_ID();
        if (Response_Data !== false) {
            $(Modal).modal('hide');
            var District_Handler = new Manage_Districts();
            District_Handler.Read_From_DB(State_ID);
        }
        else {
            alert(Message);
        }
    };
}






function Manage_Schools(){
    this.Get_ID = function (){
        var State_ID = document.getElementById("Select_Schools").value;
        return State_ID;
    };
    this.Read_From_DB = function(District_ID){
        var action = "Get_Schools";
        var Ajax_Data = {
            District_ID: District_ID,
            action: action
        };
        Outgoing_Ajax(Ajax_Data);
        var Schools_Data = jQuery.parseJSON(Incoming_Ajax_Data);
        return Schools_Data;
    };
    this.Read_From_DB = function(){
        var School_ID = this.Get_ID();
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
        if (typeof Schools_Data != 'undefined')
            for (i = 0; i < Schools_Data.length; i++) {
                select.options[select.options.length] = new Option(Schools_Data[i].SCHOOL_NAME, Schools_Data[i].SCHOOL_ID);
            }
    };
    this.Set_GUI = function (action){
        document.getElementById("View_All_Buses_Button").style.visibility=action;
        if (window.location.pathname.substring(window.location.pathname.lastIndexOf('/')+1) == 'admin.html') {
            document.getElementById("Select_Bus_Stop_Numbers").style.visibility=action;
            document.getElementById("Update_School_Form_Button").style.visibility=action;
            document.getElementById("Delete_School_Form_Button").style.visibility=action;
            document.getElementById("Create_Bus_Stop_Number_Form_Button").style.visibility=action;
        }
        if (window.location.pathname.substring(window.location.pathname.lastIndexOf('/')+1) == 'user.html') {
            document.getElementById("User_Address_Label").style.visibility=action;
            document.getElementById("User_Address").style.visibility=action;
            document.getElementById("Find_Closest_Bus_Stop").style.visibility=action;
            document.getElementById("Use_My_Location").style.visibility=action;
        }
    };
    this.Set_List = function(action){
        document.getElementById("Select_Schools").style.visibility=action;
    };
    this.Clear_Form = function(){
        if (window.location.pathname.substring(window.location.pathname.lastIndexOf('/')+1) == 'admin.html') {
            document.getElementById("Create_School_Name").value = "";
            document.getElementById("Create_School_Address").value = "";
        }

        Hide_School_GUI();
        Hide_Bus_Stop_Number_GUI();
        Hide_Bus_Stop_Detail_GUI();
    };

    this.Add = function(){
        var District_Handler = new Manage_Districts();
        var District_ID = District_Handler.Get_ID();
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
            var School_Handler = new Manage_Schools();
            School_Handler.Validate_Response(Response_Data, Modal, Message);
        }

    };
    this.Update = function(){
        var New_School_Name = document.getElementById("Update_School_Name").value;
        var New_School_Address = document.getElementById("Update_School_Address").value;
        var Names = ["School Name", "School Address"];
        var Values = [New_School_Name, New_School_Address];
        if (Validate_Text_Fields(Names, Values) != false) {
            var School_Handler = new Manage_Schools();
            var School_ID = School_Handler.Get_ID;
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
            School_Handler.Validate_Response(Response_Data, Modal, Message);
        }

    };
    this.Delete = function(){
        var School_Handler = new Manage_Schools();
        var School_ID = School_Handler.Get_ID();
        var action = "Get_Bus_Stop_Numbers";
        var Ajax_Data = {
            School_ID: School_ID,
            action: action
        };
        Outgoing_Ajax(Ajax_Data);
        var Bus_Stops_Number_Data = jQuery.parseJSON(Incoming_Ajax_Data);
        if (!$.trim(Bus_Stops_Number_Data)){
            School_Handler.Delete_Data(School_ID);
        } else {
            alert("This school has bus numbers, please remove them first");
        }

    };
    this.Delete_Data = function(School_ID){
        var action = "Delete_School";
        var Ajax_Data = {
            School_ID: School_ID,
            action: action
        };
        Outgoing_Ajax(Ajax_Data);
        var Response_Data = jQuery.parseJSON(Incoming_Ajax_Data);
        var Modal = '#Display_Delete_School_Form';
        var Message = 'delete failed because this school has bus numbers';
        var School_Handler = new Manage_Schools();
        School_Handler.Validate_Response(Response_Data, Modal, Message);
    };
    this.Validate_Response = function(Response_Data, Modal, Message){
        var District_Handler = new Manage_Districts();
        var District_ID = District_Handler.Get_ID();
        if (Response_Data !== false) {
            $(Modal).modal('hide');
            var School_Handler = new Manage_Schools();
            School_Handler.Read_From_DB(District_ID);
        }
        else {
            alert(Message);
        }
    };
}




















function View_All_Buses_Manager(){
    this.Read_From_DB = function(School_ID){
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

function Manage_Bus_Stops(){
    this.Get_ID = function (){
        var Bus_Stop_Number_ID = document.getElementById("Select_Bus_Stop_Numbers").value;
        return Bus_Stop_Number_ID;
    };
    this.Read_From_DB = function(School_ID){
        var action = "Get_Bus_Stop_Numbers";
        var Ajax_Data = {
            School_ID: School_ID,
            action: action
        };
        Outgoing_Ajax(Ajax_Data);
        var Bus_Stops_Number_Data = jQuery.parseJSON(Incoming_Ajax_Data);
        this.Clear_Form();
        this.Update_Drop_Down(Bus_Stops_Number_Data);
        this.Select_Listener();
    };
    this.Read_From_DB = function(){
        var Bus_Stop_Number_ID = this.Get_ID();
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
                Bus_Stop_Detail_Handler.Read_From_DB(Bus_Stop_Number_ID);
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
            var School_Handler = new Manage_Schools();
            var School_ID = School_Handler.Get_ID();
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
                var Bus_Stop_Number_Handler = new Manage_Bus_Stops();
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
                var Bus_Stop_Number_Handler = new Manage_Bus_Stops();
                var Bus_Stop_Number_ID = Bus_Stop_Number_Handler.Get_ID();
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
            var Bus_Stop_Number_Handler = new Manage_Bus_Stops();
            var Bus_Stop_Number_ID = Bus_Stop_Number_Handler.Get_ID();
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
        var School_Handler = new Manage_Schools();
        var School_ID = School_Handler.Get_ID();
        if (Response_Data !== false) {
            $(Modal).modal('hide');
            var View_All_Buses_Handler = new View_All_Buses_Manager();
            var Bus_Stop_Number_Handler = new Manage_Bus_Stops();
            View_All_Buses_Handler.Read_From_DB(School_ID);
            Bus_Stop_Number_Handler.Read_From_DB(School_ID);
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
    this.Read_From_DB = function(Bus_Stop_Number_ID){
        var action = "Get_Bus_Stop_Details";
        var Ajax_Data = {
            Bus_Stop_Number_ID: Bus_Stop_Number_ID,
            action: action
        };
        Outgoing_Ajax(Ajax_Data);
        var Bus_Stop_Details_Data = jQuery.parseJSON(Incoming_Ajax_Data);
        this.Clear_Form();
        this.Update_Drop_Down(Bus_Stop_Details_Data);
        this.Select_Listener();
    };
    this.Read_From_DB = function(){
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
            var action = "Geocode_PHP";
            var Read_Geocode_Data = {Address: Bus_Stop_Address, action: action};
            var Address_Coordinates = $.ajax({data: Read_Geocode_Data}).responseText;
            Address_Coordinates = jQuery.parseJSON(Address_Coordinates);
            console.log(Address_Coordinates);
            var New_Bus_Stop_Latitude = Address_Coordinates.Latitude;
            var New_Bus_Stop_Longitude = Address_Coordinates.Longitude;
            var Names = ["Bus Stop Time", "Bus Stop Address", "Bus Stop Latitude", "Bus Stop Longitude"];
            var Values = [Bus_Stop_Time, Bus_Stop_Address, New_Bus_Stop_Latitude, New_Bus_Stop_Longitude];
            if (Validate_Text_Fields(Names, Values) != false) {
                var Bus_Stop_Number_Handler = new Manage_Bus_Stops();
                var Bus_Stop_Number_ID = Bus_Stop_Number_Handler.Get_ID();
                var action = "Create_Bus_Stop_Detail";
                var Ajax_Data = {
                    Bus_Stop_Number_ID: Bus_Stop_Number_ID,
                    Bus_Stop_Time: Bus_Stop_Time,
                    Bus_Stop_Address: Bus_Stop_Address,
                    Bus_Stop_Latitude: New_Bus_Stop_Latitude,
                    Bus_Stop_Longitude: New_Bus_Stop_Longitude,
                    action: action
                };
                Outgoing_Ajax(Ajax_Data);
                var Response_Data = jQuery.parseJSON(Incoming_Ajax_Data);
                var Modal = '#Display_Create_Bus_Stop_Details_Form';
                var Message = 'bus stop time and address creation failed, please try again';
                Bus_Stop_Number_Handler.Validate_Response(Response_Data, Modal, Message);
            }
        });
    };
    this.Update_Listener = function(){
        var Update_Button = document.getElementById("Update_Bus_Stop_Details");
        Update_Button.addEventListener("click", function () {
            var Bus_Stop_Detail_Handler = new Bus_Stop_Detail_Manager();
            var New_Bus_Stop_Time = document.getElementById("Update_Bus_Stop_Time").value;
            var New_Bus_Stop_Address = document.getElementById("Update_Bus_Stop_Address").value;
            var action = "Geocode_PHP";
            var Read_Geocode_Data = {Address: New_Bus_Stop_Address, action: action};
            var Address_Coordinates = $.ajax({data: Read_Geocode_Data}).responseText;
            Address_Coordinates = jQuery.parseJSON(Address_Coordinates);
            console.log(Address_Coordinates);
            var New_Bus_Stop_Latitude = Address_Coordinates.Latitude;
            var New_Bus_Stop_Longitude = Address_Coordinates.Longitude;
            var Names = ["Bus Stop Time", "Bus Stop Address", "Bus Stop Latitude", "Bus Stop Longitude"];
            var Values = [New_Bus_Stop_Time, New_Bus_Stop_Address, New_Bus_Stop_Latitude, New_Bus_Stop_Longitude];
            if (Validate_Text_Fields(Names, Values) != false) {
                var Bus_Stop_Detail_Handler = new Bus_Stop_Detail_Manager();
                var Bus_Stop_Detail_ID = Bus_Stop_Detail_Handler.Grab_Selected_Bus_Stop_Detail_ID();
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
            var Bus_Stop_Number_Handler = new Manage_Bus_Stops();
            Bus_Stop_Number_Handler.Validate_Response(Response_Data, Modal, Message);
        });
    };
    this.Validate_Response = function(Response_Data, Modal, Message){
        var Bus_Stop_Number_Handler = new Manage_Bus_Stops();
        var Bus_Stop_Number_ID = Bus_Stop_Number_Handler.Get_ID();
        if (Response_Data !== false) {
            $(Modal).modal('hide');
            var Bus_Stop_Detail_Handler = new Bus_Stop_Detail_Manager();
            Bus_Stop_Detail_Handler.Read_From_DB(Bus_Stop_Number_ID);
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
    var State_Handler = new Manage_States();
    State_Handler.Read_From_DB();
}

function Populate_Display_Update_District_Form(){
    var District_Handler = new Manage_Districts();
    District_Handler.Read_From_DB();
}

function Populate_Display_Update_School_Form(){
    var School_Handler = new Manage_Schools();
    School_Handler.Read_From_DB();
}

function Populate_Display_Update_Bus_Number_Form(){
    var Bus_Stop_Number_Handler = new Manage_Bus_Stops();
    Bus_Stop_Number_Handler.Read_From_DB();
}

function Populate_Display_Update_Bus_Stop_Details_Form(){
    var Bus_Stop_Detail_Handler = new Bus_Stop_Detail_Manager();
    Bus_Stop_Detail_Handler.Read_From_DB();
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
    if (window.location.pathname.substring(window.location.pathname.lastIndexOf('/')+1) == 'admin.html') {
        document.getElementById("Update_State_Form_Button").style.visibility="visible";
        document.getElementById("Delete_State_Form_Button").style.visibility="visible";
        document.getElementById("Create_District_Form_Button").style.visibility="visible";
    }
}

function Display_District_GUI(){
    document.getElementById("Select_Schools").style.visibility="visible";
    if (window.location.pathname.substring(window.location.pathname.lastIndexOf('/')+1) == 'admin.html') {
        document.getElementById("Update_District_Form_Button").style.visibility="visible";
        document.getElementById("Delete_District_Form_Button").style.visibility="visible";
        document.getElementById("Create_School_Form_Button").style.visibility="visible";
    }
}

function Display_School_GUI(){
    document.getElementById("View_All_Buses_Button").style.visibility="visible";
    if (window.location.pathname.substring(window.location.pathname.lastIndexOf('/')+1) == 'admin.html') {
        document.getElementById("Select_Bus_Stop_Numbers").style.visibility="visible";
        document.getElementById("Update_School_Form_Button").style.visibility="visible";
        document.getElementById("Delete_School_Form_Button").style.visibility="visible";
        document.getElementById("Create_Bus_Stop_Number_Form_Button").style.visibility="visible";
    }
    if (window.location.pathname.substring(window.location.pathname.lastIndexOf('/')+1) == 'user.html') {
        document.getElementById("User_Address_Label").style.visibility="visible";
        document.getElementById("User_Address").style.visibility="visible";
        document.getElementById("Find_Closest_Bus_Stop").style.visibility="visible";
        document.getElementById("Use_My_Location").style.visibility="visible";
    }
}

function Display_Bus_Stop_Number_GUI(){
    if (window.location.pathname.substring(window.location.pathname.lastIndexOf('/')+1) == 'admin.html') {
        document.getElementById("Select_Bus_Stops_Details").style.visibility="visible";
        document.getElementById("Update_Bus_Stop_Number_Form_Button").style.visibility="visible";
        document.getElementById("Delete_Bus_Stop_Number_Form_Button").style.visibility="visible";
        document.getElementById("Create_Bus_Stop_Details_Form_Button").style.visibility="visible";
    }
}

function Display_Bus_Stop_Detail_GUI(){
    if (window.location.pathname.substring(window.location.pathname.lastIndexOf('/')+1) == 'admin.html') {
        document.getElementById("Update_Bus_Stop_Details_Form_Button").style.visibility="visible";
        document.getElementById("Delete_Bus_Stop_Details_Form_Button").style.visibility="visible";
    }
}

function Hide_State_GUI(){
    document.getElementById("Select_Districts").style.visibility="hidden";
    if (window.location.pathname.substring(window.location.pathname.lastIndexOf('/')+1) == 'admin.html') {
        document.getElementById("Update_State_Form_Button").style.visibility="hidden";
        document.getElementById("Delete_State_Form_Button").style.visibility="hidden";
        document.getElementById("Create_District_Form_Button").style.visibility="hidden";
    }
}

function Hide_District_GUI(){
    document.getElementById("Select_Schools").style.visibility="hidden";
    if (window.location.pathname.substring(window.location.pathname.lastIndexOf('/')+1) == 'admin.html') {
        document.getElementById("Update_District_Form_Button").style.visibility="hidden";
        document.getElementById("Delete_District_Form_Button").style.visibility="hidden";
        document.getElementById("Create_School_Form_Button").style.visibility="hidden";
    }
}

function Hide_School_GUI(){
    document.getElementById("View_All_Buses_Button").style.visibility="hidden";
    if (window.location.pathname.substring(window.location.pathname.lastIndexOf('/')+1) == 'admin.html') {
        document.getElementById("Select_Bus_Stop_Numbers").style.visibility="hidden";
        document.getElementById("Update_School_Form_Button").style.visibility="hidden";
        document.getElementById("Delete_School_Form_Button").style.visibility="hidden";
        document.getElementById("Create_Bus_Stop_Number_Form_Button").style.visibility="hidden";
    }
    if (window.location.pathname.substring(window.location.pathname.lastIndexOf('/')+1) == 'user.html') {
        document.getElementById("User_Address_Label").style.visibility="hidden";
        document.getElementById("User_Address").style.visibility="hidden";
        document.getElementById("Find_Closest_Bus_Stop").style.visibility="hidden";
        document.getElementById("Use_My_Location").style.visibility="hidden";
    }
}

function Hide_Bus_Stop_Number_GUI(){
    if (window.location.pathname.substring(window.location.pathname.lastIndexOf('/')+1) == 'admin.html') {
        document.getElementById("Select_Bus_Stops_Details").style.visibility="hidden";
        document.getElementById("Update_Bus_Stop_Number_Form_Button").style.visibility="hidden";
        document.getElementById("Delete_Bus_Stop_Number_Form_Button").style.visibility="hidden";
        document.getElementById("Create_Bus_Stop_Details_Form_Button").style.visibility="hidden";
    }
}

function Hide_Bus_Stop_Detail_GUI(){
    if (window.location.pathname.substring(window.location.pathname.lastIndexOf('/')+1) == 'admin.html') {
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



function Process_User_Address(User_Address){
    var School_ID = Get_School_ID();
    var Validated_User_Address = Validate_User_Address_and_School_ID(User_Address, School_ID);
    if(Validated_User_Address != false)
        Find_Closest_Bus_Stop(Validated_User_Address, School_ID);
}

function Process_User_Location(){
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var User_Address = new Address_Object();
            var Latitude = position.coords.latitude;
            var Longitude = position.coords.longitude;
            User_Address.Set_Latitude(Latitude);
            User_Address.Set_Longitude(Longitude);
            User_Address.Set_Lat_Long_Location();
            var School_ID = Get_School_ID();
            if(isSchoolIDValid(School_ID) == true)
                Find_Closest_Bus_Stop(User_Address, School_ID);
        }, function() {
            alert('Error: The Geolocation service failed. Please enter an address to find the closest Bus Stop');
            document.getElementById("User_Address").focus();
            document.getElementById("User_Address").style.backgroundColor="#FFFF85";
        });
    } else {
        alert('Error: Your browser doesn\'t support geolocation. Please enter an address to find the closest Bus Stop');
        document.getElementById("User_Address").focus();
        document.getElementById("User_Address").style.backgroundColor="#FFFF85";
    }
}

function Validate_User_Address_and_School_ID(User_Address, School_ID){ //UT
    var Attention_Field_Color = "#FF0000";
    var Valid_Field_Color = "#FFFFFF";
    var User_Address_Field = new Change_Element("User_Address");
    var School_Drop_Down = new Change_Element("Select_Schools");
    if (isUserAddressValid(User_Address) == false){
        alert("Please Enter a valid address!");
        User_Address_Field.SetColor(Attention_Field_Color);
        User_Address_Field.Select();
    }
    if (isUserAddressValid(User_Address) == true){
        User_Address_Field.SetColor(Valid_Field_Color);
    }
    if (isSchoolIDValid(School_ID) == false){
        alert("Please Select your School");
        School_Drop_Down.SetColor(Attention_Field_Color);
        School_Drop_Down.Select();
    }
    if (isSchoolIDValid(School_ID) == true){
        School_Drop_Down.SetColor(Valid_Field_Color);
    }
    if(isUserAddressValid(User_Address) == true && isSchoolIDValid(School_ID) == true && User_Address_Field.Element != null){
        var Validated_User_Address = Format_User_Address(User_Address);
        User_Address_Field.SetColor(Valid_Field_Color);
        School_Drop_Down.SetColor(Valid_Field_Color);
        return Validated_User_Address;
    }
    if(isUserAddressValid(User_Address) == true && isSchoolIDValid(School_ID) == true && User_Address_Field.Element == null){
        return "Element is null only during Jasmine Testing";
    }
    else
        return false;
}

function isSchoolIDValid(School_ID){ //UT
    if (School_ID == "")
        return false;
    else
        return true;
}

function isUserAddressValid(User_Address){ //UT
    var elements = 10;
    if((User_Address.length >= elements)&& typeof User_Address == 'string' ){
        var regex = /\d{1,3}.?\d{0,3}\s[a-zA-Z]{2,30}\s[a-zA-Z]{2,15}/;
        var valid_flag = regex.test(User_Address);
        return valid_flag;
    }
    else{
        return false;
    }
}

function Change_Element(Element_ID){ //UT
    this.Element = document.getElementById(Element_ID);
    this.SetColor = function(Color){
        if(this.Element != null)
            this.Element.style.backgroundColor = Color;
    };
    this.Select = function() {
        if(this.Element != null)
            this.Element.focus();}
}

function Address_Object (){ //UT
    this.Latitude;
    this.Longitude;
    this.Location;
    this.Lat_Long_Location;
    this.Set_Location = function(User_Address) {
        if(typeof User_Address != 'undefined' && User_Address != ""){
            this.Location = User_Address;
        }
        else {
            console.log("Cannot create Address location due to invalid input");
            alert("Cannot create Address location due to invalid input");
        }
    };
    this.Get_LatLong = function () {
        var action = "Geocode_PHP";
        var Read_Geocode_Data = {Address: this.Location, action: action};
        var Address_Coordinates = $.ajax({data: Read_Geocode_Data}).responseText;
        Address_Coordinates = jQuery.parseJSON(Address_Coordinates);
        console.log(Address_Coordinates);
        this.Latitude = Address_Coordinates.Latitude;
        this.Longitude = Address_Coordinates.Longitude;
    };
    this.Set_Lat_Long_Location = function(){
        if (typeof this.Latitude != 'number')
            alert("Error: Latitude is invalid, it is of type " + typeof this.Latitude);
        if (typeof this.Longitude != 'number')
            alert("Error: Longitude is invalid, it is of type " + typeof this.Longitude);
        if ( typeof this.Latitude == 'number' && typeof this.Longitude == 'number'){
            this.Lat_Long_Location = this.Latitude + "," + this.Longitude;
            return true;
        }
        else{
            return false;
        }
    };
    this.Set_Latitude = function (Latitude) {this.Latitude = Latitude};
    this.Set_Longitude = function (Longitude){this.Longitude = Longitude};
}

function Format_User_Address(User_Address){//UT
    var Validated_User_Address = new Address_Object();
    if (Validated_User_Address.Lat_Long_Location == null ){
        Validated_User_Address.Set_Location(User_Address);
        Validated_User_Address.Get_LatLong();
        Validated_User_Address.Set_Lat_Long_Location();
        return Validated_User_Address;
    }
    else
        return User_Address;
}


function Get_School_ID() {
    var School_Drop_Down = document.getElementById("Select_Schools");
    var School_ID = School_Drop_Down.options[School_Drop_Down.selectedIndex].value;
    return School_ID;
}


function Find_Closest_Bus_Stop(User_Address, School_ID){
    alert("Will Call DB for School_ID " +School_ID);
    var Bus_Stops = Get_Bus_Stops();
    var Walking_Distance = new Walking_Distance_To_Stops();
    var New_Shortest_Bus_Stop = new Shortest_Bus_Stop();
    Bus_Stops = Calculate_Distance_To_Stops_Haversine(User_Address, Bus_Stops);
    Bus_Stops = Sort_Distance_To_Stops(Bus_Stops);
    Bus_Stops =  Walking_Distance.Calculate(User_Address, Bus_Stops);
    Bus_Stops = Sort_Distance_To_Stops(Bus_Stops);
    New_Shortest_Bus_Stop.Map(User_Address, Bus_Stops[0]);
    Show_Button_Map_5_Closest_Stops(User_Address, Bus_Stops);
}

function Show_Button_Map_5_Closest_Stops(User_Address, Bus_Stops){
    var Map_Closest_5_Stops_Btn = document.getElementById("Map_Closest_5_Stops");
    var New_Bus_Stops_Group = new Bus_Stops_Group();
    Map_Closest_5_Stops_Btn.style.visibility="visible";
    Map_Closest_5_Stops_Btn.addEventListener("click", function () {New_Bus_Stops_Group.Map(User_Address, Bus_Stops)});
}

function Bus_Stop_Object (){ //UT
    this.Stop_Time;
    this.Stop_Address;
    this.Distance_to_Stop;
    this.Latitude;
    this.Longitude;
    this.Bus_Stop_Number;
    this.Stop_ID;
    this.New = function(Stop_Time, Stop_Address) {
        if(typeof Stop_Time != 'undefined' && typeof Stop_Address != 'undefined'){
            this.Stop_Time = Stop_Time;
            this.Stop_Address = Stop_Address;
        }
        else {
            console.log("Cannot create Bus Stop Object because it is missing data");
            alert("Cannot create Bus Stop Object because it is missing data");
        }
    };
    this.Get_Coor = function() {alert("Hi")};
    this.Set_Stop_ID = function (Stop_ID) { this.Stop_ID = Stop_ID};
    this.Set_Stop_Time = function (Stop_Time) {this.Stop_Time = Stop_Time};
    this.Set_Stop_Address = function (Stop_Address) {this.Stop_Address = Stop_Address};
    this.Set_Distance_to_User = function (Distance_to_User) {this.Distance_to_User = Distance_to_User};
    this.Set_Latitude = function (Latitude) {this.Latitude = Latitude};
    this.Set_Longitude = function (Longitude){this.Longitude = Longitude};
    this.Set_Bus_Stop_Number = function (Bus_Stop_Number){this.Bus_Stop_Number = Bus_Stop_Number};
    this.Get_Stop_ID = function () {return this.Stop_ID};
    this.Get_Stop_Time = function() {return this.Stop_Time};
    this.Get_Stop_Address = function () {return this.Stop_Address};
    this.Get_Distance_to_User = function() {return this.Distance_to_User};
    this.Get_Latitude = function () {return this.Latitude};
    this.Get_Longitude = function (){return this.Longitude};
    this.Get_Bus_Stop_Number = function (){return this.Bus_Stop_Number};
    this.Get_LatLong = function () {
        var action = "Geocode_PHP";
        var Read_Geocode_Data = {Address: Address, action: action};
        var Address_Coordinates = $.ajax({data: Read_Geocode_Data}).responseText;
        Address_Coordinates = jQuery.parseJSON(Address_Coordinates);
        console.log(Address_Coordinates);
        this.Latitude = Address_Coordinates.Latitude;
        this.Longitude = Address_Coordinates.Longitude;
    };
}

function isBusStopValid(Bus_Stop_Object){//UT
    if(typeof Bus_Stop_Object != 'undefined' && Bus_Stop_Object.Stop_Time != null && Bus_Stop_Object.Stop_Address != null){
        return true;
    }
    else {
        console.log("Bus Stop Object is invalid");
        return false;
    }
}

function Create_Bus_Stops_Array(JSON_Array){


}

function Get_Bus_Stops_for_School(School_ID){ //REPLACE
    //Bus_Stops = QueryDBfor(School_ID)
    var Bus_Stop_Objects = [];
    Bus_Stops = Get_Bus_Stops();
    console.log(Bus_Stops);
    return Bus_Stops;
}


function Get_Bus_Stops(){ //REPLACE
    var Bus_Stops =[];
    Bus_Stops[0]= {Stop_Time: "9:00", Stop_Address:"RIVERSIDE AV & HILL ST norwalk ct", Distance_to_Stop: 1, Latitude: 41.1215386, Longitude: -73.4238011};
    Bus_Stops[1]= {Stop_Time:null, Stop_Address:"PONUS AV & ELLS ST norwalk ct", Distance_to_Stop: 1.5, Latitude: 41.1257694, Longitude: -73.4373563};
    Bus_Stops[2]= {Stop_Time:null, Stop_Address:"PONUS AV & CORNWALL RD norwalk ct", Distance_to_Stop: 2.5, Latitude: 41.1258702, Longitude: -73.44233};
    Bus_Stops[3]= {Stop_Time:null, Stop_Address:"GLEN AV & SHORT ST norwalk ct", Distance_to_Stop: 0.5, Latitude: 41.1305955, Longitude: -73.449364};
    Bus_Stops[4]= {Stop_Time:null, Stop_Address:"LEDGEWOOD DR & STYLES LA norwalk ct", Distance_to_Stop: 2.5, Latitude: 41.1277236, Longitude: -73.4464775};
    Bus_Stops[5]= {Stop_Time:null, Stop_Address:"STYLES AV & PENNY LA norwalk ct", Distance_to_Stop: 0.65, Latitude: 41.126766, Longitude: -73.4504417};
    Bus_Stops[6]= {Stop_Time:null, Stop_Address:"PONUS AV & LANCASTER DR norwalk ct", Distance_to_Stop: 6, Latitude: 41.1249925, Longitude: -73.4469242};
    Bus_Stops[7]= {Stop_Time:null, Stop_Address:"MAHER DR & STEPPINGSTONE PL norwalk ct", Distance_to_Stop: 1.2, Latitude: 41.120276, Longitude: -73.438289};
    return Bus_Stops;
}

function Calculate_Distance_To_Stops_Haversine(User_Address, Bus_Stops) {
    for (var Bus_Stop = 0; Bus_Stop < Bus_Stops.length; Bus_Stop++) {
        var Distance = Get_Distance_Haversine(User_Address, Bus_Stops[Bus_Stop]);
        console.log("Distance to Bus Stop " + Bus_Stops[Bus_Stop].Stop_Address + " is " + Distance);
        Bus_Stops[Bus_Stop].Distance_to_Stop = Distance;
    }
    return Bus_Stops;
}

function Get_Distance_Haversine(User_Address, Bus_Stop) { //UT
    var EarthRadius = 3959;
    var Delta_Lat_Rads = Degrees_to_Radians(Bus_Stop.Latitude-User_Address.Latitude);
    var Delta_Lon_Rads = Degrees_to_Radians(Bus_Stop.Longitude-User_Address.Longitude);
    var a =
        Math.sin(Delta_Lat_Rads/2) * Math.sin(Delta_Lat_Rads/2) +
        Math.cos(Degrees_to_Radians(User_Address.Latitude)) *
        Math.cos(Degrees_to_Radians(Bus_Stop.Latitude)) *
        Math.sin(Delta_Lon_Rads/2) * Math.sin(Delta_Lon_Rads/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var Haversine_Distance = EarthRadius * c;
    return Haversine_Distance;
}

function Degrees_to_Radians(deg) { //UT
    return deg * (Math.PI/180)
}


function Walking_Distance_To_Stops() { //UT
    this.Calculate = function (User_Address, Bus_Stops) {
        var Number_of_Stops = 5;
        for (var Bus_Stop = 0; Bus_Stop < Number_of_Stops; Bus_Stop++) {
            var action = "Cal_Distance_PHP";
            var Read_Bus_Stops_Data = {User_Address: User_Address.Lat_Long_Location, Bus_Stop_Address: Bus_Stops[Bus_Stop].Stop_Address, action: action};
            var Raw_Distance = $.ajax({data: Read_Bus_Stops_Data}).responseText;
            var Distance =[];
            Distance = Raw_Distance.split();
            var Distance_to_User = Distance[0];
            if(Distance[1] == 'mi')
                Bus_Stops[Bus_Stop].Distance_to_Stop = Distance_to_User;
            if(Distance[1] == 'ft'){
                var feet_in_a_mile = 5280;
                var miles = Distance_to_User * (1/feet_in_a_mile);
                Bus_Stops[Bus_Stop].Distance_to_Stop = miles;
            }
            console.log("Distance to Bus Stop " + Bus_Stops[Bus_Stop].Stop_Address + " is " + Distance);
        }
        return Bus_Stops;
    };
}

function Sort_Distance_To_Stops(Bus_Stops){ //UT
    var swapped;
    var n = Bus_Stops.length-1;
    do {
        swapped = false;
        for (var Stop=0; Stop < n; Stop++) {
            if (Bus_Stops[Stop].Distance_to_Stop > Bus_Stops[Stop+1].Distance_to_Stop) {
                var temp = Bus_Stops[Stop];
                Bus_Stops[Stop] = Bus_Stops[Stop+1];
                Bus_Stops[Stop+1] = temp;
                swapped = true;
            }
        }
        n--;
    } while (swapped);
    return Bus_Stops;
}

function Bus_Stops_Group() { //UT
    this.Map = function (User_Address, Bus_Stops){
        var Max_Number_of_Stops = 5;
        var map = new google.maps.Map(document.getElementById('map-canvas'));
        var bounds = new google.maps.LatLngBounds();
        var New_Marker = new Marker();
        var latlng = new google.maps.LatLng(User_Address.Latitude, User_Address.Longitude);
        var icon = "http://maps.google.com/mapfiles/kml/pal2/icon2.png";
        New_Marker.Add(User_Address, icon, map);
        bounds.extend(latlng);
        map.fitBounds(bounds);
        for (var Bus_Stop = 0; Bus_Stop < Max_Number_of_Stops ; Bus_Stop++) {
            var icon_number = Bus_Stop+1;
            icon = "http://maps.google.com/mapfiles/kml/paddle/" + icon_number + ".png";
            New_Marker.Add(Bus_Stops[Bus_Stop], icon, map);
            latlng = new google.maps.LatLng(Bus_Stops[Bus_Stop].Latitude, Bus_Stops[Bus_Stop].Longitude);
            bounds.extend(latlng);
            map.fitBounds(bounds);
        }
    }
}

function Marker(){ //UT
    this.Add = function (Address, icon,  map){
        var title = Address.Stop_Address;
        var infowindow = new google.maps.InfoWindow();
        var latlng = new google.maps.LatLng(Address.Latitude, Address.Longitude);
        var marker = new google.maps.Marker({
            position: latlng,
            map: map,
            title: title,
            icon: new google.maps.MarkerImage(icon)
        });
        google.maps.event.addListener(marker, 'click', function() {
            infowindow.setContent(this.title);
            infowindow.open(map, this);
        });
    };
}

function Shortest_Bus_Stop(){ //UT
    this.Map = function (User_Address, Bus_Stop){
        alert("The Closest Bus_Stop is " + Bus_Stop.Stop_Address + " which is " + Bus_Stop.Distance_to_Stop +" miles away");
        var latitude= 41.117744;
        var longitude = -73.4081575;
        var directionsDisplay;
        var directionsService = new google.maps.DirectionsService();
        var map;
        directionsDisplay = new google.maps.DirectionsRenderer();
        var New_Map = new google.maps.LatLng(latitude, longitude);
        var element = document.getElementById("map-canvas");
        var mapOptions = {
            center: New_Map,
            draggable: false,
            zoomControl: false,
            scrollwheel: false,
            disableDoubleClickZoom: true
        };
        var request = {
            origin: User_Address.Lat_Long_Location,
            destination: Bus_Stop.Stop_Address,
            travelMode: google.maps.TravelMode.WALKING
        };
        directionsService.route(request, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                map = new google.maps.Map(element, mapOptions);
                directionsDisplay.setMap(map);
                directionsDisplay.setDirections(response);
            }
            else{
                alert("Something went wrong, could not map the address")
            }
        });
    }

}

function isTimeValid(Time){//UT
    var regex = /^([0]\d|[1][0-2]):([0-5]\d)\s?(?:AM|PM)$/i;
    var valid_flag = regex.test(Time);
    return valid_flag;
}
function Process_User_Address(User_Address){
    var School_ID = Get_School_ID();
    var Validated_User_Address = Validate_User_Address_and_School_ID(User_Address, School_ID);
    if(Validated_User_Address != false)
        Find_Closest_Bus_Stop(Validated_User_Address, School_ID);
}

function Process_User_Location(){
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var User_Address = new Address_Object();
            var Latitude = position.coords.latitude;
            var Longitude = position.coords.longitude;
            User_Address.Set_Latitude(Latitude);
            User_Address.Set_Longitude(Longitude);
            User_Address.Set_Lat_Long_Location();
            var School_ID = Get_School_ID();
            if(isSchoolIDValid(School_ID) == true)
                Find_Closest_Bus_Stop(User_Address, School_ID);
        }, function() {
            alert('Error: The Geolocation service failed. Please enter an address to find the closest Bus Stop');
            document.getElementById("User_Address").focus();
            document.getElementById("User_Address").style.backgroundColor="#FFFF85";
        });
    } else {
        alert('Error: Your browser doesn\'t support geolocation. Please enter an address to find the closest Bus Stop');
        document.getElementById("User_Address").focus();
        document.getElementById("User_Address").style.backgroundColor="#FFFF85";
    }
}

function Validate_User_Address_and_School_ID(User_Address, School_ID){ //UT
    var Attention_Field_Color = "#FF0000";
    var Valid_Field_Color = "#FFFFFF";
    var User_Address_Field = new Change_Element("User_Address");
    var School_Drop_Down = new Change_Element("Select_Schools");
    if (isUserAddressValid(User_Address) == false){
        alert("Please Enter a valid address!");
        User_Address_Field.SetColor(Attention_Field_Color);
        User_Address_Field.Select();
    }
    if (isUserAddressValid(User_Address) == true){
        User_Address_Field.SetColor(Valid_Field_Color);
    }
    if (isSchoolIDValid(School_ID) == false){
        alert("Please Select your School");
        School_Drop_Down.SetColor(Attention_Field_Color);
        School_Drop_Down.Select();
    }
    if (isSchoolIDValid(School_ID) == true){
        School_Drop_Down.SetColor(Valid_Field_Color);
    }
    if(isUserAddressValid(User_Address) == true && isSchoolIDValid(School_ID) == true && User_Address_Field.Element != null){
        var Validated_User_Address = Format_User_Address(User_Address);
        User_Address_Field.SetColor(Valid_Field_Color);
        School_Drop_Down.SetColor(Valid_Field_Color);
        return Validated_User_Address;
    }
    if(isUserAddressValid(User_Address) == true && isSchoolIDValid(School_ID) == true && User_Address_Field.Element == null){
        return "Element is null only during Jasmine Testing";
    }
    else
        return false;
}

function isSchoolIDValid(School_ID){ //UT
    if (School_ID == "")
        return false;
    else
        return true;
}

function isUserAddressValid(User_Address){ //UT
    var elements = 10;
    if((User_Address.length >= elements)&& typeof User_Address == 'string' ){
        var regex = /\d{1,3}.?\d{0,3}\s[a-zA-Z]{2,30}\s[a-zA-Z]{2,15}/;
        var valid_flag = regex.test(User_Address);
        return valid_flag;
    }
    else{
        return false;
    }
}

function Change_Element(Element_ID){ //UT
    this.Element = document.getElementById(Element_ID);
    this.SetColor = function(Color){
        if(this.Element != null)
            this.Element.style.backgroundColor = Color;
    };
    this.Select = function() {
        if(this.Element != null)
            this.Element.focus();}
}

function Address_Object (){ //UT
    this.Latitude;
    this.Longitude;
    this.Location;
    this.Lat_Long_Location;
    this.Set_Location = function(User_Address) {
        if(typeof User_Address != 'undefined' && User_Address != ""){
            this.Location = User_Address;
        }
        else {
            console.log("Cannot create Address location due to invalid input");
            alert("Cannot create Address location due to invalid input");
        }
    };
    this.Get_LatLong = function () {
        var action = "Geocode_PHP";
        var Read_Geocode_Data = {Address: this.Location, action: action};
        var Address_Coordinates = $.ajax({data: Read_Geocode_Data}).responseText;
        Address_Coordinates = jQuery.parseJSON(Address_Coordinates);
        console.log(Address_Coordinates);
        this.Latitude = Address_Coordinates.Latitude;
        this.Longitude = Address_Coordinates.Longitude;
    };
    this.Set_Lat_Long_Location = function(){
        if (typeof this.Latitude != 'number')
            alert("Error: Latitude is invalid, it is of type " + typeof this.Latitude);
        if (typeof this.Longitude != 'number')
            alert("Error: Longitude is invalid, it is of type " + typeof this.Longitude);
        if ( typeof this.Latitude == 'number' && typeof this.Longitude == 'number'){
            this.Lat_Long_Location = this.Latitude + "," + this.Longitude;
            return true;
        }
        else{
            return false;
        }
    };
    this.Set_Latitude = function (Latitude) {this.Latitude = Latitude};
    this.Set_Longitude = function (Longitude){this.Longitude = Longitude};
}

function Format_User_Address(User_Address){//UT
    var Validated_User_Address = new Address_Object();
    if (Validated_User_Address.Lat_Long_Location == null ){
        Validated_User_Address.Set_Location(User_Address);
        Validated_User_Address.Get_LatLong();
        Validated_User_Address.Set_Lat_Long_Location();
        return Validated_User_Address;
    }
    else
        return User_Address;
}


function Get_School_ID() {
    var School_Drop_Down = document.getElementById("Select_Schools");
    var School_ID = School_Drop_Down.options[School_Drop_Down.selectedIndex].value;
    return School_ID;
}


function Find_Closest_Bus_Stop(User_Address, School_ID){
    alert("Will Call DB for School_ID " +School_ID);
    var Bus_Stops = Get_Bus_Stops();
    var Walking_Distance = new Walking_Distance_To_Stops();
    var New_Shortest_Bus_Stop = new Shortest_Bus_Stop();
    Bus_Stops = Calculate_Distance_To_Stops_Haversine(User_Address, Bus_Stops);
    Bus_Stops = Sort_Distance_To_Stops(Bus_Stops);
    Bus_Stops =  Walking_Distance.Calculate(User_Address, Bus_Stops);
    Bus_Stops = Sort_Distance_To_Stops(Bus_Stops);
    New_Shortest_Bus_Stop.Map(User_Address, Bus_Stops[0]);
    Show_Button_Map_5_Closest_Stops(User_Address, Bus_Stops);
}

function Show_Button_Map_5_Closest_Stops(User_Address, Bus_Stops){
    var Map_Closest_5_Stops_Btn = document.getElementById("Map_Closest_5_Stops");
    var New_Bus_Stops_Group = new Bus_Stops_Group();
    Map_Closest_5_Stops_Btn.style.visibility="visible";
    Map_Closest_5_Stops_Btn.addEventListener("click", function () {New_Bus_Stops_Group.Map(User_Address, Bus_Stops)});
}

function Bus_Stop_Object (){ //UT
    this.Stop_Time;
    this.Stop_Address;
    this.Distance_to_Stop;
    this.Latitude;
    this.Longitude;
    this.Bus_Stop_Number;
    this.Stop_ID;
    this.New = function(Stop_Time, Stop_Address) {
        if(typeof Stop_Time != 'undefined' && typeof Stop_Address != 'undefined'){
            this.Stop_Time = Stop_Time;
            this.Stop_Address = Stop_Address;
        }
        else {
            console.log("Cannot create Bus Stop Object because it is missing data");
            alert("Cannot create Bus Stop Object because it is missing data");
        }
    };
    this.Set_Stop_ID = function (Stop_ID) { this.Stop_ID = Stop_ID};
    this.Set_Stop_Time = function (Stop_Time) {this.Stop_Time = Stop_Time};
    this.Set_Stop_Address = function (Stop_Address) {this.Stop_Address = Stop_Address};
    this.Set_Distance_to_User = function (Distance_to_User) {this.Distance_to_User = Distance_to_User};
    this.Set_Latitude = function (Latitude) {this.Latitude = Latitude};
    this.Set_Longitude = function (Longitude){this.Longitude = Longitude};
    this.Set_Bus_Stop_Number = function (Bus_Stop_Number){this.Bus_Stop_Number = Bus_Stop_Number};
    this.Get_Stop_ID = function () {return this.Stop_ID};
    this.Get_Stop_Time = function() {return this.Stop_Time};
    this.Get_Stop_Address = function () {return this.Stop_Address};
    this.Get_Distance_to_User = function() {return this.Distance_to_User};
    this.Get_Latitude = function () {return this.Latitude};
    this.Get_Longitude = function (){return this.Longitude};
    this.Get_Bus_Stop_Number = function (){return this.Bus_Stop_Number};
}

function isBusStopValid(Bus_Stop_Object){//UT
    if(typeof Bus_Stop_Object != 'undefined' && Bus_Stop_Object.Stop_Time != null && Bus_Stop_Object.Stop_Address != null){
        return true;
    }
    else {
        console.log("Bus Stop Object is invalid");
        return false;
    }
}

function Create_Bus_Stops_Array(JSON_Array){


}

function Get_Bus_Stops_for_School(School_ID){ //REPLACE
    //Bus_Stops = QueryDBfor(School_ID)
    var Bus_Stop_Objects = [];
    Bus_Stops = Get_Bus_Stops();
    console.log(Bus_Stops);
    return Bus_Stops;
}


function Get_Bus_Stops(){ //REPLACE
    var Bus_Stops =[];
    Bus_Stops[0]= {Stop_Time: "9:00", Stop_Address:"RIVERSIDE AV & HILL ST norwalk ct", Distance_to_Stop: 1, Latitude: 41.1215386, Longitude: -73.4238011};
    Bus_Stops[1]= {Stop_Time:null, Stop_Address:"PONUS AV & ELLS ST norwalk ct", Distance_to_Stop: 1.5, Latitude: 41.1257694, Longitude: -73.4373563};
    Bus_Stops[2]= {Stop_Time:null, Stop_Address:"PONUS AV & CORNWALL RD norwalk ct", Distance_to_Stop: 2.5, Latitude: 41.1258702, Longitude: -73.44233};
    Bus_Stops[3]= {Stop_Time:null, Stop_Address:"GLEN AV & SHORT ST norwalk ct", Distance_to_Stop: 0.5, Latitude: 41.1305955, Longitude: -73.449364};
    Bus_Stops[4]= {Stop_Time:null, Stop_Address:"LEDGEWOOD DR & STYLES LA norwalk ct", Distance_to_Stop: 2.5, Latitude: 41.1277236, Longitude: -73.4464775};
    Bus_Stops[5]= {Stop_Time:null, Stop_Address:"STYLES AV & PENNY LA norwalk ct", Distance_to_Stop: 0.65, Latitude: 41.126766, Longitude: -73.4504417};
    Bus_Stops[6]= {Stop_Time:null, Stop_Address:"PONUS AV & LANCASTER DR norwalk ct", Distance_to_Stop: 6, Latitude: 41.1249925, Longitude: -73.4469242};
    Bus_Stops[7]= {Stop_Time:null, Stop_Address:"MAHER DR & STEPPINGSTONE PL norwalk ct", Distance_to_Stop: 1.2, Latitude: 41.120276, Longitude: -73.438289};
    return Bus_Stops;
}

function Calculate_Distance_To_Stops_Haversine(User_Address, Bus_Stops) {
    for (var Bus_Stop = 0; Bus_Stop < Bus_Stops.length; Bus_Stop++) {
        var Distance = Get_Distance_Haversine(User_Address, Bus_Stops[Bus_Stop]);
        console.log("Distance to Bus Stop " + Bus_Stops[Bus_Stop].Stop_Address + " is " + Distance);
        Bus_Stops[Bus_Stop].Distance_to_Stop = Distance;
    }
    return Bus_Stops;
}

function Get_Distance_Haversine(User_Address, Bus_Stop) { //UT
    var EarthRadius = 3959;
    var Delta_Lat_Rads = Degrees_to_Radians(Bus_Stop.Latitude-User_Address.Latitude);
    var Delta_Lon_Rads = Degrees_to_Radians(Bus_Stop.Longitude-User_Address.Longitude);
    var a =
        Math.sin(Delta_Lat_Rads/2) * Math.sin(Delta_Lat_Rads/2) +
        Math.cos(Degrees_to_Radians(User_Address.Latitude)) *
        Math.cos(Degrees_to_Radians(Bus_Stop.Latitude)) *
        Math.sin(Delta_Lon_Rads/2) * Math.sin(Delta_Lon_Rads/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var Haversine_Distance = EarthRadius * c;
    return Haversine_Distance;
}

function Degrees_to_Radians(deg) { //UT
    return deg * (Math.PI/180)
}


function Walking_Distance_To_Stops() { //UT
    this.Calculate = function (User_Address, Bus_Stops) {
        var Number_of_Stops = 5;
        for (var Bus_Stop = 0; Bus_Stop < Number_of_Stops; Bus_Stop++) {
            var action = "Cal_Distance_PHP";
            var Read_Bus_Stops_Data = {User_Address: User_Address.Lat_Long_Location, Bus_Stop_Address: Bus_Stops[Bus_Stop].Stop_Address, action: action};
            var Raw_Distance = $.ajax({data: Read_Bus_Stops_Data}).responseText;
            var Distance =[];
            Distance = Raw_Distance.split();
            var Distance_to_User = Distance[0];
            if(Distance[1] == 'mi')
                Bus_Stops[Bus_Stop].Distance_to_Stop = Distance_to_User;
            if(Distance[1] == 'ft'){
                var feet_in_a_mile = 5280;
                var miles = Distance_to_User * (1/feet_in_a_mile);
                Bus_Stops[Bus_Stop].Distance_to_Stop = miles;
            }
            console.log("Distance to Bus Stop " + Bus_Stops[Bus_Stop].Stop_Address + " is " + Distance);
        }
        return Bus_Stops;
    };
}

function Sort_Distance_To_Stops(Bus_Stops){ //UT
    var swapped;
    var n = Bus_Stops.length-1;
    do {
        swapped = false;
        for (var Stop=0; Stop < n; Stop++) {
            if (Bus_Stops[Stop].Distance_to_Stop > Bus_Stops[Stop+1].Distance_to_Stop) {
                var temp = Bus_Stops[Stop];
                Bus_Stops[Stop] = Bus_Stops[Stop+1];
                Bus_Stops[Stop+1] = temp;
                swapped = true;
            }
        }
        n--;
    } while (swapped);
    return Bus_Stops;
}

function Bus_Stops_Group() { //UT
    this.Map = function (User_Address, Bus_Stops){
        var Max_Number_of_Stops = 5;
        var map = new google.maps.Map(document.getElementById('map-canvas'));
        var bounds = new google.maps.LatLngBounds();
        var New_Marker = new Marker();
        var latlng = new google.maps.LatLng(User_Address.Latitude, User_Address.Longitude);
        var icon = "http://maps.google.com/mapfiles/kml/pal2/icon2.png";
        New_Marker.Add(User_Address, icon, map);
        bounds.extend(latlng);
        map.fitBounds(bounds);
        for (var Bus_Stop = 0; Bus_Stop < Max_Number_of_Stops ; Bus_Stop++) {
            var icon_number = Bus_Stop+1;
            icon = "http://maps.google.com/mapfiles/kml/paddle/" + icon_number + ".png";
            New_Marker.Add(Bus_Stops[Bus_Stop], icon, map);
            latlng = new google.maps.LatLng(Bus_Stops[Bus_Stop].Latitude, Bus_Stops[Bus_Stop].Longitude);
            bounds.extend(latlng);
            map.fitBounds(bounds);
        }
    }
}

function Marker(){ //UT
    this.Add = function (Address, icon,  map){
        var title = Address.Stop_Address;
        var infowindow = new google.maps.InfoWindow();
        var latlng = new google.maps.LatLng(Address.Latitude, Address.Longitude);
        var marker = new google.maps.Marker({
            position: latlng,
            map: map,
            title: title,
            icon: new google.maps.MarkerImage(icon)
        });
        google.maps.event.addListener(marker, 'click', function() {
            infowindow.setContent(this.title);
            infowindow.open(map, this);
        });
    };
}

function Shortest_Bus_Stop(){ //UT
    this.Map = function (User_Address, Bus_Stop){
        alert("The Closest Bus_Stop is " + Bus_Stop.Stop_Address + " which is " + Bus_Stop.Distance_to_Stop +" miles away");
        var latitude= 41.117744;
        var longitude = -73.4081575;
        var directionsDisplay;
        var directionsService = new google.maps.DirectionsService();
        var map;
        directionsDisplay = new google.maps.DirectionsRenderer();
        var New_Map = new google.maps.LatLng(latitude, longitude);
        var element = document.getElementById("map-canvas");
        var mapOptions = {
            center: New_Map,
            draggable: false,
            zoomControl: false,
            scrollwheel: false,
            disableDoubleClickZoom: true
        };
        var request = {
            origin: User_Address.Lat_Long_Location,
            destination: Bus_Stop.Stop_Address,
            travelMode: google.maps.TravelMode.WALKING
        };
        directionsService.route(request, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                map = new google.maps.Map(element, mapOptions);
                directionsDisplay.setMap(map);
                directionsDisplay.setDirections(response);
            }
            else{
                alert("Something went wrong, could not map the address")
            }
        });
    }

}

function isTimeValid(Time) {//UT
    var regex = /^([0]\d|[1][0-2]):([0-5]\d)\s?(?:AM|PM)$/i;
    var valid_flag = regex.test(Time);
    return valid_flag;
}