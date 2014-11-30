// ------------------------------------------Ali coded items BELOW --------------------------------//

$( document ).ready(function() {
    console.log( "ready!" );
    $.ajaxSetup({
        url: 'db.php',
        type: 'post',
        cache: 'false',
        async: false,
        success: function(data){
            //alert('Ajax sent');
           // console.log(data);
        },
        complete: function(){
        },
        error: function(){
            alert('Ajax failed');
        }
    });


});




function Read_States(){
    var action = "Read_States";
    var Read_States_Data = {action: action};
    States_Data = $.ajax({data: Read_States_Data}).responseText;
    States_Data = jQuery.parseJSON(States_Data);
    Update_States(States_Data);

}

function Update_States(States_Data){
    var select = document.getElementById("Select_States");
    var i;
    for(i = 0; i < States_Data.length; i++) {
        select.options[select.options.length] = new Option(States_Data[i].STATE_NAME, States_Data[i].STATE_ID);
    }
}


function Read_Districts(State_ID){
    Reset_Districts();
    Reset_Schools();
    Reset_Bus_Stops();
    var action = "Read_Districts";
    var Read_Districts_Data = {State_ID: State_ID, action: action};
    Districts_Data = $.ajax({data: Read_Districts_Data}).responseText;
    Districts_Data = jQuery.parseJSON(Districts_Data);
    Update_Districts(Districts_Data);
}

function Update_Districts(Districts_Data){
    var select = document.getElementById("Select_Districts");
    var i;
    for(i = 0; i < Districts_Data.length; i++) {
        select.options[select.options.length] = new Option(Districts_Data[i].DISTRICT_NAME, Districts_Data[i].DISTRICT_ID);
    }
}

function Reset_Districts(){
    document.getElementById('Select_Districts').options.length = 1;
}

function Read_Schools(District_ID){
    Reset_Schools();
    Reset_Bus_Stops();
    var action = "Read_Schools";
    var Read_Schools_Data = {District_ID: District_ID, action: action};
    Schools_Data = $.ajax({data: Read_Schools_Data}).responseText;
    Schools_Data = jQuery.parseJSON(Schools_Data);
    Update_Schools(Schools_Data);
}

function Update_Schools(Schools_Data){
    var select = document.getElementById("Select_Schools");
    var i;
    for(i = 0; i < Schools_Data.length; i++) {
        select.options[select.options.length] = new Option(Schools_Data[i].SCHOOL_NAME, Schools_Data[i].SCHOOL_ID);
    }
}

function Reset_Schools(){
    document.getElementById('Select_Schools').options.length = 1;
}

function Read_Bus_Stops(School_ID){
    var action = "Read_Bus_Stops";
    var Read_Bus_Stops_Data = {School_ID: School_ID, action: action};
    Bus_Stops_Data = $.ajax({data: Read_Bus_Stops_Data}).responseText;
    Bus_Stops_Data = jQuery.parseJSON(Bus_Stops_Data);
   Table_Bus_Stops(Bus_Stops_Data);

    //Bus_Stops_Data[i].BUS_ID;
    //Bus_Stops_Data[i].BUS_STOP_NUMBER;
    //Bus_Stops_Data[i].BUS_STOP_TIME;
    //Bus_Stops_Data[i].BUS_STOP_ADDRESS;
    //Bus_Stops_Data[i].BUS_STOP_LATITUDE;
    //Bus_Stops_Data[i].BUS_STOP_LONGITUDE;
};

function Table_Bus_Stops(Bus_Stops_Data){
    var Last_Bus;
    var Bus_Stops_Table = '<thead><tr><th>Bus #</th><th>Stop Time</th><th>Stop Address</th></tr></thead><tbody>';
    var i;
    var j;
    var Row_Span;
    for(i = 0; i < Bus_Stops_Data.length; i++) {
        j = Bus_Stops_Data[i].BUS_NUMBER;
        Bus_Stops_Table += '<tr>';
        Row_Span = 0;
        for(j = i; Bus_Stops_Data[i].BUS_NUMBER != Last_Bus && j < Bus_Stops_Data.length && Bus_Stops_Data[j].BUS_NUMBER == Bus_Stops_Data[i].BUS_NUMBER; j++) {
            Row_Span++;
        }
        if (Row_Span > 0){
            Last_Bus = Bus_Stops_Data[i].BUS_NUMBER;
            Bus_Stops_Table += '<td rowspan="' + Row_Span +'">' + j +'</td>';
        }
        Bus_Stops_Table += '<td>' + Bus_Stops_Data[i].BUS_STOP_TIME + '</td><td>' + Bus_Stops_Data[i].BUS_STOP_ADDRESS + '</td></tr>';
    }
    Bus_Stops_Table += '</tbody>';
    document.getElementById("Bus_Stops_Table").innerHTML = Bus_Stops_Table;
}

function Reset_Bus_Stops(){
    var Bus_Stops_Table = '<thead><tr><th>Bus #</th><th>Stop Time</th><th>Stop Address</th></tr></thead>';
    document.getElementById("Bus_Stops_Table").innerHTML = Bus_Stops_Table;
}
/*
function Read_Coordinates(Address){
    var action = "Read_Coordinates";
    var Read_Coordinates_Data = {Address: Address, action: action};
    Coordinates_Data = $.ajax({data: Read_Coordinates_Data}).responseText;
    Coordinates_Data = jQuery.parseJSON(Coordinates_Data);
    return Coordinates_Data;
}


function Get_CoordinatesDEL(Address){
    var latitude, longitude;
    var Bus_Stops = Read_Bus_Stops();
    var geocoder = new google.maps.Geocoder();

    var Address_Coordinates =[]
    Address_Coordinates[0]= {Latitude:null, Longitude: null, Address: Address}


    geocoder.geocode( { 'address': Address}, function(results, status) {

        if (status == google.maps.GeocoderStatus.OK) {
            Address_Coordinates[0].Latitude = results[0].geometry.location.lat();
            Address_Coordinates[0].Longitude = results[0].geometry.location.lng();
            alert(Address_Coordinates[0].Latitude );
            alert(Address_Coordinates[0].Longitude);

            // START ALI ||  START ALI ||  START ALI ||  START ALI ||  START ALI ||  START ALI ||  START ALI ||  START ALI ||
            Write_Coordinates(Address, Address_Coordinates[0].Latitude, Address_Coordinates[0].Longitude);
            // END ALI || END ALI || END ALI || END ALI || END ALI || END ALI || END ALI || END ALI || END ALI || END ALI ||

            Add_Marker(Address_Coordinates[0].Latitude,Address_Coordinates[0].Longitude)

        }
        else{
            alert("could not map address: " + status)
        }
    });
    //return Address_Coordinates;
}

// When someone wants to add a bus stop, they call this:function Get_Coordinates(Address)
//that gets the Latitude and longitude which writes it in the DB
//

function Write_Coordinates(Address, Latitude, Longitude){
    var action = "Write_Coordinates";
    var Write_Coordinates_Data = {Address: Address, Latitude: Latitude, Longitude: Longitude, action: action};
    $.ajax({data: Write_Coordinates_Data});
}*/
/*
 function Write_Coordinates(Write_Coordinates_Data)){
 var action = "Write_Coordinates";
 var Coordinates_Data = {Address: Write_Coordinates_Data.Address, Latitude: Write_Coordinates_Data.Latitude, Longitude: Write_Coordinates_Data.Longitude, action: action};
 $.ajax({data: Coordinates_Data});
 }
 *//**
function Read_Coordinates(Address){
    var action = "Read_Coordinates";
    var Read_Coordinates_Data = {Address: Address, action: action};
    Coordinates_Data = $.ajax({data: Read_Coordinates_Data}).responseText;
    Coordinates_Data = jQuery.parseJSON(Coordinates_Data);
    return Coordinates_Data;
}

function Delete_Coordinates(Coordinates_ID){
    var action = "Delete_Coordinates";
    var Delete_Coordinates_Data = {Coordinates_ID: Coordinates_ID, action: action};
    $.ajax({data: Delete_Coordinates_Data});
}

function Write_Distances(Bus_Number, Bus_Stop_Time, Stop_Address, User_Address, Distances){
    var action = "Write_Distances";
    var Write_Distances_Data = {Bus_Number: Bus_Number, Bus_Stop_Time: Bus_Stop_Time, Stop_Address: Stop_Address, User_Address: User_Address, Distances: Distances, action: action};
    $.ajax({data: Write_Distances_Data});
}

function Read_Distances(User_Address){
    var action = "Read_Distances";
    var Read_Distances_Data = {User_Address: User_Address, action: action};
    Distances_Data = $.ajax({data: Read_Distances_Data}).responseText;
    Distances_Data = jQuery.parseJSON(Distances_Data);
    return Distances_Data;
}

function Delete_Distances(Distances_ID){
    var action = "Delete_Distances";
    var Delete_Distances_Data = {Distances_ID: Distances_ID, action: action};
    $.ajax({data: Delete_Distances_Data});
}
*/

// ------------------------------------------Ali coded items ABOVE --------------------------------//




// ------------------------------------------Marlon coded items BELOW --------------------------------//

window.onload = function(){
    /*   Call PHP DB Unit test
     DB_Unit_Test_Read_From_DB()
     DB_Unit_Test_Write_To_DB()
     DB_Unit_Test_Update_DB()
     DB_Unit_Test_Delete_From_DB()
     */
    Read_States()

};


function Process_User_Address(User_Address){
    var School_ID = Get_School_ID();
    var Validated_User_Address = Validate_User_Address_and_School_ID(User_Address, School_ID);
    if(Validated_User_Address != false)
        Find_Closest_Bus_Stop(Validated_User_Address, School_ID);
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
    if (School_ID == "") {
        return false;
    }
    else {
        return true;
    }
}
//UT
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
    Validated_User_Address.Set_Location(User_Address);
    Validated_User_Address.Get_LatLong();
    Validated_User_Address.Set_Lat_Long_Location();
    return Validated_User_Address;
}


function Get_School_ID() {
    var School_Drop_Down = document.getElementById("Select_Schools");
    var School_ID = School_Drop_Down.options[School_Drop_Down.selectedIndex].value;
    return School_ID;
}


function Find_Closest_Bus_Stop(User_Address, School_ID){
    alert("Will Call DB for School_ID " +School_ID);
    var Bus_Stops = Get_Bus_Stops();
    Bus_Stops = Calculate_Distance_To_Stops_Haversine(User_Address, Bus_Stops);
    Bus_Stops = Sort_Distance_To_Stops(Bus_Stops);
    Bus_Stops =  Calculate_Walking_Distance_To_Stops(User_Address, Bus_Stops);
    Bus_Stops = Sort_Distance_To_Stops(Bus_Stops);
    Map_Shortest_Bus_Stop(User_Address.Lat_Long_Location, Bus_Stops[0]);
    Show_Button_Map_5_Closest_Stops(Bus_Stops);
}

function Show_Button_Map_5_Closest_Stops(Bus_Stops){
    var Map_Closest_5_Stops_Btn = document.getElementById("Map_Closest_5_Stops");
    Map_Closest_5_Stops_Btn.style.visibility="visible";
    Map_Closest_5_Stops_Btn.addEventListener("click", function () {Map_Bus_Stops(User_Address, Bus_Stops)});
}

function Process_User_Location(){
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var Validated_User_Address = new Address_Object();
            var Latitude = position.coords.latitude;
            var Longitude = position.coords.longitude;
            Validated_User_Address.Set_Latitude(Latitude);
            Validated_User_Address.Set_Longitude(Longitude);
            Validated_User_Address.Set_Lat_Long_Location();
            Find_Closest_Bus_Stop(Validated_User_Address);
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


//UT
function isTimeValid(Time){
    var regex = /^([0]\d|[1][0-2]):([0-5]\d)\s?(?:AM|PM)$/i;
    var valid_flag = regex.test(Time);
    return valid_flag;
}

//UT
function Bus_Stop_Object (){
    this.Stop_Time;
    this.Stop_Address;
    this.Distance_to_Stop;
    this.Latitude;
    this.Longitude;
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
    this.Get_Stop_ID = function () {return this.Stop_ID};
    this.Get_Stop_Time = function() {return this.Stop_Time};
    this.Get_Stop_Address = function () {return this.Stop_Address};
    this.Get_Distance_to_User = function() {return this.Distance_to_User};
    this.Get_Latitude = function () {return this.Latitude};
    this.Get_Longitude = function (){return this.Longitude};
}

//UT
function isBusStopValid(Bus_Stop_Object){
    if(typeof Bus_Stop_Object != 'undefined' && Bus_Stop_Object.Stop_Time != null && Bus_Stop_Object.Stop_Address != null){
        return true;
    }
    else {
        console.log("Bus Stop Object is invalid");
        return false;
    }
}

function Bus_Stops_Array () {
    this.Bus_Stops;
    this.Save = function(Bus_Stops) {this.Bus_Stops = Bus_Stops};
    this.Get = function () {return this.Bus_Stops};

}

function Convert_JSON_to_Bus_Stops(){





}





function Get_Bus_Stops_for_School(School_ID){
    //Bus_Stops = QueryDBfor(School_ID)
    var Bus_Stop_Objects = [];
    Bus_Stops = Get_Bus_Stops();
    console.log(Bus_Stops);
    return Bus_Stops;
}


function Get_Bus_Stops(){
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










function Calculate_Distance_To_Stops_Haversine(User_Coordinates, Bus_Stops) {
    for (var Bus_Stop = 0; Bus_Stop < Bus_Stops.length; Bus_Stop++) {
        var Distance = Get_Distance_Haversine(User_Coordinates, Bus_Stops[Bus_Stop]);
        console.log("Distance to Bus Stop " + Bus_Stops[Bus_Stop].Stop_Address + " is " + Distance);
        Bus_Stops[Bus_Stop].Distance_to_Stop = Distance;
    }
    return Bus_Stops;
}


function Get_Distance_Haversine(User_Coordinates, Bus_Stop) {
    var EarthRadius = 3959;
    var Delta_Lat_Rads = Degrees_to_Radians(Bus_Stop.Latitude-User_Coordinates.Latitude);
    var Delta_Lon_Rads = Degrees_to_Radians(Bus_Stop.Longitude-User_Coordinates.Longitude);
    var a =
        Math.sin(Delta_Lat_Rads/2) * Math.sin(Delta_Lat_Rads/2) +
        Math.cos(Degrees_to_Radians(User_Coordinates.Latitude)) *
        Math.cos(Degrees_to_Radians(Bus_Stop.Latitude)) *
        Math.sin(Delta_Lon_Rads/2) * Math.sin(Delta_Lon_Rads/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var Haversine_Distance = EarthRadius * c;
    return Haversine_Distance;
}

function Degrees_to_Radians(deg) {
    return deg * (Math.PI/180)
}


function Calculate_Walking_Distance_To_Stops(User_Address, Bus_Stops) {
    var Number_of_Stops = 5;
    for (var Bus_Stop = 0; Bus_Stop < Number_of_Stops; Bus_Stop++) {
        var action = "Cal_Distance_PHP";
        var Read_Bus_Stops_Data = {User_Address: User_Address.Lat_Long_Location, Bus_Stop_Address: Bus_Stops[Bus_Stop].Stop_Address, action: action};
        var Distance = $.ajax({data: Read_Bus_Stops_Data}).responseText;
        console.log("Distance to Bus Stop " + Bus_Stops[Bus_Stop].Stop_Address + " is " + Distance);
        Bus_Stops[Bus_Stop].Distance_to_Stop = Distance;
    }
    return Bus_Stops;
}

function Sort_Distance_To_Stops(Bus_Stops){
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

function Map_Bus_Stops(User_Address, Bus_Stops) {
    alert(Bus_Stops.length);
    var map = new google.maps.Map(document.getElementById('map-canvas'));
    var bounds = new google.maps.LatLngBounds();
    var infowindow = new google.maps.InfoWindow();

/*
    var latlng = new google.maps.LatLng(User_Address.Latitude, User_Address.Longitude);
    var icon = "http://maps.google.com/mapfiles/kml/pal2/icon2.png";

    bounds.extend(latlng);
    var marker = new google.maps.Marker({
        position: latlng,
        map: map,
        title: User_Address.Location,
        icon: new google.maps.MarkerImage(icon)
    });
    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(this.title);
        infowindow.open(map, this);
    });
    map.fitBounds(bounds);

*/

    for (var Bus_Stop = 0; Bus_Stop < 5; Bus_Stop++) {
        var latlng = new google.maps.LatLng(Bus_Stops[Bus_Stop].Latitude, Bus_Stops[Bus_Stop].Longitude);
        var icon_number = Bus_Stop+1;
        var icon = "http://maps.google.com/mapfiles/kml/paddle/" + icon_number + ".png";
        bounds.extend(latlng);
        var marker = new google.maps.Marker({
            position: latlng,
            map: map,
            title: Bus_Stops[Bus_Stop].Stop_Address,
            icon: new google.maps.MarkerImage(icon)
        });
        google.maps.event.addListener(marker, 'click', function() {
            infowindow.setContent(this.title);
            infowindow.open(map, this);
        });

        map.fitBounds(bounds);
    }
}

function Map_Shortest_Bus_Stop(User_Address, Bus_Stop){
    alert("The Closest Bus_Stop is " + Bus_Stop.Stop_Address + " which is " + Bus_Stop.Distance_to_Stop +" miles away");

    var latitude= 41.117744;
    var longitude = -73.4081575;
    var directionsDisplay;
    var directionsService = new google.maps.DirectionsService();
    var map;
    directionsDisplay = new google.maps.DirectionsRenderer();
    var New_Map = new google.maps.LatLng(latitude, longitude);
    var mapOptions = {
        center: New_Map,
        draggable: false,
        zoomControl: false,
        scrollwheel: false,
        disableDoubleClickZoom: true
    };
    var request = {
        origin: User_Address,
        destination: Bus_Stop.Stop_Address,
        travelMode: google.maps.TravelMode.DRIVING
    };
    directionsService.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
            directionsDisplay.setMap(map);
            directionsDisplay.setDirections(response);
        }
        else{
            alert("Something went wrong, could not map the address")
        }
    });
}






/*
function Get_Coordinates(User_Address){
    var action = "Geocode_PHP";
    var Read_Geocode_Data = {Address: User_Address, action: action};
    var Coordinates = $.ajax({data: Read_Geocode_Data}).responseText;
    Coordinates = jQuery.parseJSON(Coordinates);
    console.log("After calling php");
    console.log(Coordinates);

    return Coordinates;

}


function Convert_Coordinates_to_String(User_Address){
    if (typeof User_Address === 'object') {
        var User_Coordinates = User_Address.Latitude + "," + User_Address.Longitude;
        return User_Coordinates;
    }
    if (typeof User_Address === 'string') {
        var User_Coordinates = Get_Coordinates(User_Address);
        User_Coordinates = User_Coordinates.Latitude + "," + User_Coordinates.Longitude;
        return User_Coordinates; }

    else {
        alert ("Error, User Address is of incorrect type: " + typeof User_Address);
    }

}
*/















/*
function Test_Object(){
    var Bus_Stop = new Parada;
    Bus_Stop.Create_New("9:20", "20 scofield place norwalk ct");
    //alert(Bus_Stop.Stop_Time);
    Bus_Stop.Set_Stop_Address("933 Hope st stamford ct");
   // alert(Bus_Stop.Get_Stop_Address());
    Bus_Stop.Set_Stop_Time("10:00");
   // alert(Bus_Stop.Stop_Time);

}


function Create_Bus_Stop_Object( Stop_Time, Stop_Address){
    if(typeof Stop_Time != 'undefined' && typeof Stop_Address != 'undefined'){
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
*/












/*
function Process_Coordinates(Address){
    var Location = Get_Coordinates(Address);
    return Location;
}
*/






/*
function Process_Bus_Stops_Haversine(User_Address){
    Bus_Stops = Get_Bus_Stops();
    var User_Coordinates = Get_Coordinates(User_Address);
    Bus_Stops = Calculate_Distance_To_Stops_Haversine(User_Coordinates, Bus_Stops);
    Closest_Bus_Stop = Get_Shortest_Distance_To_Stops(Bus_Stops);
    alert("The Closets Bus_Stop is " + Closest_Bus_Stop.Address + " which is " + Closest_Bus_Stop.Distance +" mi away");
    Map_Shortest_Bus_Stop(User_Address, Closest_Bus_Stop.Address);
}

*/











/*
//----------Remove--------------
function Get_Coordinates_OLD(Address){
    var Location = {Latitude: 0, Longitude: 0, Address: Address};
     Convert_Address_to_LatLng(Address, function(Location) {
        alert("Finally: " + Location.Latitude + ", " + Location.Longitude);
        //need to extrac info from here
    });
  //to here
    //return Location object back to Get_XY function
}

function Convert_Address_to_LatLng(Address, Return_callback){
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode( { 'address': Address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            var Location = {Latitude: 0, Longitude: 0, Address: Address};
            Location.Latitude = results[0].geometry.location.lat();
            Location.Longitude = results[0].geometry.location.lng();
            Return_callback(Location);
        } else {
            alert('Geocode could not convert addresses, Error: : ' + status);
        }
    });
}
//----------Remove--------------*/


/*
function Find_My_Location(){

    if (!navigator.geolocation){
        console.log("Geolocation is not supported by your browser");
        return ("Geolocation is not supported by your browser");
    }

    function success(position) {
        var User_Coordinates = { Latitude:position.coords.latitude, Longitude:position.coords.longitude };
       // alert(typeof  User_Coordinates);
        Process_Bus_Stops(User_Coordinates);

    };

    function error() {
        alert("Unable to retrieve your location");
    };

    var Coordinates = navigator.geolocation.getCurrentPosition(success, error);
    console.log(Coordinates);
}

*/


/*
function Add_Marker(latitude, longitude){
    var myLatlng = new google.maps.LatLng(latitude,longitude);
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
        infowindow.open(map,marker);
    });
}
*/





//google.maps.event.addDomListener(window, 'load', Initialize_Google_Maps_API);
// ------------------------------------------Marlon coded items ABOVE--------------------------------//
