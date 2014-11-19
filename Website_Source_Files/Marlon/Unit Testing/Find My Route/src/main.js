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

    Read_States();
});

function Read_States(){
    var action = "Read_States";
    var Read_States_Data = {action: action};
    States_Data = $.ajax({data: Read_States_Data}).responseText;
    States_Data = jQuery.parseJSON(States_Data);
    Select_States(States_Data);
}

function Select_States(States_Data){
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
    Select_Districts(Districts_Data);
}

function Select_Districts(Districts_Data){
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
    Select_Schools(Schools_Data);
}

function Select_Schools(Schools_Data){
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
    //Bus_Stops_Data[i].BUS_NUMBER;
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




function Initialize_Google_Maps_API() {

    //-----------load SQL values here--------------
    var School_District_Lat= 41.117744;
    var School_District_Lng = -73.4081575;
    var Bus_Stops = Get_Bus_Stops();
    //Map_Address(School_District_Lat, School_District_Lng, null);
   // Display_Stops_Pannel(Bus_Stops);

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


function Validate_Bus_Stop_Object(Bus_Stop_Object){

    if(typeof Bus_Stop_Object != 'undefined' && Bus_Stop_Object.Stop_Time != null && Bus_Stop_Object.Stop_Address != null){
        return true;
    }
    else {
        console.log("Bus Stop Object is invalid");
        return false;
    }
}


function Get_Bus_Stops_for_School(School_ID){
    //Bus_Stops = QueryDBfor(School_ID)
    var Bus_Stop_Objects = [];
    Bus_Stops = Get_Bus_Stops();
   // alert(typeof Bus_Stops);
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

   // this.Get_Bus_Stop_Array = function(){    return Bus_Stops; };
   // this.Get_Number_of_Bus_Stops = function(){    return Bus_Stops.length; };
    return Bus_Stops;

}

/*
function Map_Address(latitude, longitude, address){
    var Display_Map;
    var map;
    Display_Map = new google.maps.DirectionsRenderer();
    var address = new google.maps.LatLng(latitude, longitude);
    var mapOptions = {
        zoom:13,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        center: address
    };

    map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
    //alert(typeof map);
    Display_Map.setMap(map);

}
*/
/*
function Display_Stops_Pannel(Bus_Stops){
    var AddressPanel = document.getElementById('addresses_panel');
    AddressPanel.innerHTML = '';
    for (var Stop_Address = 0; Stop_Address < Bus_Stops.length; Stop_Address++) {
        AddressPanel.innerHTML += Bus_Stops[Stop_Address].Stop_Address + '</b><br>';
    }
}
*/


function Process_Bus_Stops(User_Address){
    Bus_Stops = Get_Bus_Stops();
    var User_Coordinates = Convert_Coordinates_to_String(User_Address);
    Bus_Stops = Calculate_Distance_To_Stops(User_Coordinates, Bus_Stops);
    Closest_Bus_Stop = Get_Shortest_Distance_To_Stops(Bus_Stops);
    alert("The Closest Bus_Stop is " + Closest_Bus_Stop.Address + " which is " + Closest_Bus_Stop.Distance +" miles away");
    Map_Shortest_Bus_Stop(User_Coordinates, Closest_Bus_Stop.Address);
}



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




function Process_Coordinates(Address){
    var Location = Get_Coordinates(Address);
    return Location;
}








function Process_Bus_Stops_Haversine(User_Address){
    Bus_Stops = Get_Bus_Stops();
    var User_Coordinates = Get_Coordinates(User_Address);
    Bus_Stops = Calculate_Distance_To_Stops_Haversine(User_Coordinates, Bus_Stops);
    Closest_Bus_Stop = Get_Shortest_Distance_To_Stops(Bus_Stops);
    alert("The Closets Bus_Stop is " + Closest_Bus_Stop.Address + " which is " + Closest_Bus_Stop.Distance +" mi away");
    Map_Shortest_Bus_Stop(User_Address, Closest_Bus_Stop.Address);
}







function Calculate_Distance_To_Stops(User_Address, Bus_Stops) {
    for (var Bus_Stop = 0; Bus_Stop < Bus_Stops.length; Bus_Stop++) {
         var action = "Cal_Distance_PHP";
         var Read_Bus_Stops_Data = {User_Address: User_Address, Bus_Stop_Address: Bus_Stops[Bus_Stop].Stop_Address, action: action};
         var Distance = $.ajax({data: Read_Bus_Stops_Data}).responseText;
        console.log("Distance to Bus Stop " + Bus_Stops[Bus_Stop].Stop_Address + " is " + Distance);
        Bus_Stops[Bus_Stop].Distance_to_Stop = Distance;
    }
    return Bus_Stops;
}

function Get_Shortest_Distance_To_Stops(Bus_Stops){
    var Shortest_distance = Bus_Stops[0].Distance_to_Stop;
    var Stop_Address = Bus_Stops[0].Stop_Address;
    for (var stop = 0; stop < Bus_Stops.length; stop++) {
        if (Bus_Stops[stop].Distance_to_Stop < Shortest_distance && typeof Bus_Stops[stop].Distance_to_Stop != 'undefined') {
            Shortest_distance = Bus_Stops[stop].Distance_to_Stop;
            Stop_Address = Bus_Stops[stop].Stop_Address;
        }
        if (typeof Bus_Stops[stop].Distance_to_Stop == 'undefined'){
            console.log("Distance to Bus Stop is undefined")//alert
        }
    }
    var Bus_Stop = {Address: Stop_Address, Distance: Shortest_distance};
    return Bus_Stop;
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
    var EarthRadius = 3959; // Radius of the earth in mi
    var Delta_Lat_Rads = Degrees_to_Radians(Bus_Stop.Latitude-User_Coordinates.Latitude);  // Degrees_to_Radians below
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


function Process_Location(){
   Find_My_Location();
   //console.log("Gelocation results: " + Location.Latitude);
}


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


function Use_My_Location(){

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var User_Coordinates = { Latitude:position.coords.latitude, Longitude:position.coords.longitude };
            //alert(typeof  User_Coordinates);
            Process_Bus_Stops(User_Coordinates);

        }, function() {
            alert('Error: The Geolocation service failed.')
        });
    } else {
        alert('Error: Your browser doesn\'t support geolocation.')
    }
}


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

function Map_Shortest_Bus_Stop(User_Address, Stop_Address){
    var latitude= 41.117744;
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
    var end = Stop_Address;
    var request = {
        origin:start,
        destination:end,
        travelMode: google.maps.TravelMode.DRIVING
    };
    directionsService.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
        }
        else{
            alert("Something went wrong, could not map the address")
        }
    });
}


function Map_Bus_Stops() {
    var map = new google.maps.Map(document.getElementById('map-canvas'));
    var bounds = new google.maps.LatLngBounds();
    var infowindow = new google.maps.InfoWindow();
    Bus_Stops = Get_Bus_Stops();

    for (var Bus_Stop = 0; Bus_Stop < Bus_Stops.length; Bus_Stop++) {
        var latlng = new google.maps.LatLng(Bus_Stops[Bus_Stop].Latitude, Bus_Stops[Bus_Stop].Longitude);
        bounds.extend(latlng);
        var marker = new google.maps.Marker({
            position: latlng,
            map: map,
            title: Bus_Stops[Bus_Stop].Stop_Address
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
