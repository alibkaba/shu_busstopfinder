// START ALI ||  START ALI ||  START ALI ||  START ALI ||  START ALI ||  START ALI ||  START ALI ||  START ALI ||	
function start() {
	$.ajaxSetup({
        url: 'db.php',
        type: 'post',
        cache: 'false',
        async: false,
        success: function(data){
            alert('success');
            console.log(data);
        },
        complete: function(){
        },
        error: function(){
            alert('failure');
        }
    });
	
	function Read_States(){
		var action = "Read_States";
		var Read_Coordinates_Data = {action: action};
		States_Data = $.ajax({data: Read_Coordinates_Data}).responseText;
		States_Data = jQuery.parseJSON(States_Data);
		Select_State(States_Data);
	}
}
/*
function Select_State(States_Data){
	var select = document.getElementById("Select_State");
	var i;
	for(i = 0; i < States_Data.length; i++) {
		select.options[select.options.length] = new Option(States_Data[i]STATE_ID., States_Data[i].STATE_NAME);
	}
}
*/
// END ALI || END ALI || END ALI || END ALI || END ALI || END ALI || END ALI || END ALI || END ALI || END ALI ||
//----------------------------By Marlon Bermudez-------------------------------//
function initialize() {
    //-----------load SQL values here--------------
	
    var state = "CT";
    var School_District= "Norwalk Public School";
    var School_District_Lat= 41.117744;
    var School_District_Lng = -73.4081575;

    Bus_Stops = Read_Bus_Stops();
    Map_Address(School_District_Lat, School_District_Lng, null);
    Display_Stops_Pannel(Bus_Stops);
    return true;
}

function Create_Bus_Stop_Object(Stop_ID, Stop_Time, Stop_Address, Distance_to_Stop, Latitude, Longitude){
    this.Stop_ID = Stop_ID;
    this.Stop_Time = Stop_Time;
    this.Stop_Address = Stop_Address;
    this.Distance_to_Stop = Distance_to_Stop;
    this.Latitude = Latitude;
    this.Longitude = Longitude;

    return this;
}


function Create_Array_of_Bus_Stop_Objects(Bus_Stops_Array, Bus_Stop_Object){
    this.Bus_Stops_Array = Bus_Stops_Array;

    if (Bus_Stop_Object != null){
        Bus_Stops_Array.push(Bus_Stop_Object);
    }

    return Bus_Stops_Array;
}

function Get_Bus_Stops_for_School(School_ID){
    //Bus_Stops = QueryDBfor(School_ID)
    var Bus_Stop_Objects = [];
    Bus_Stop_Objects = Read_Bus_Stops();

    return Bus_Stop_Objects;
}


// START ALI ||  START ALI ||  START ALI ||  START ALI ||  START ALI ||  START ALI ||  START ALI ||  START ALI ||
function Get_Bus_Stops_From_DB(School_ID){
    var action = "Read_Bus_Stops";
    var Bus_Stops = [];
    var Read_Bus_Stops = {School_ID: School_ID, action: action};
    var Bus_Stops_Data = $.ajax({data: Read_Bus_Stops}).responseText;
    //Bus_Stops = Parse_Bus_Stop_into_Array(Bus_Stops_Data);
    return Bus_Stops_Data;
};

 function Read_Coordinates(Address){
    var action = "Read_Coordinates";
    var Read_Coordinates_Data = {Address: Address, action: action};
    Coordinates_Data = $.ajax({data: Read_Coordinates_Data}).responseText;
    Coordinates_Data = jQuery.parseJSON(Coordinates_Data);
    return Coordinates_Data;
}
function Read_Bus_Stops(School_ID){
	var action = "Read_Bus_Stops";
	var Read_Bus_Stops_Data = {School_ID: School_ID, action: action};
	Bus_Stops_Data = $.ajax({data: Read_Bus_Stops_Data}).responseText;
	Bus_Stops = jQuery.parseJSON(Bus_Stops_Data);

    return Bus_Stops;
	//Bus_Stops[i].BUS_ID;
	//Bus_Stops[i].BUS_NUMBER;
	//Bus_Stops[i].BUS_STOP_TIME;
	//Bus_Stops[i].BUS_STOP_ADDRESS;
	//Bus_Stops[i].BUS_STOP_LATITUDE;
	//Bus_Stops[i].BUS_STOP_LONGITUDE;
};

// END ALI || END ALI || END ALI || END ALI || END ALI || END ALI || END ALI || END ALI || END ALI || END ALI ||

function Map_Address(latitude, longitude, address){
    var directionsDisplay;
    var map;
    directionsDisplay = new google.maps.DirectionsRenderer();
    var New_Map = new google.maps.LatLng(latitude, longitude);
    var mapOptions = {
        zoom:13,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        center: New_Map
    }

    map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
    directionsDisplay.setMap(map);
    return map;

};


function Display_Stops_Pannel(Bus_Stops){

    var AddressPanel = document.getElementById('addresses_panel');
    AddressPanel.innerHTML = '';
    // For each address, display summary information.
    for (var Bus_Stop_Address = 0; Bus_Stop_Address < Bus_Stops.length; Bus_Stop_Address++) {
        AddressPanel.innerHTML += Bus_Stops[Bus_Stop_Address].Stop_Address + '</b><br>';
    }

};

function Get_Shortest_Distance_To_Stops(User_Address,Bus_Stops){
    var Shortest_distance;
    var Bus_Stop_Address; // = Read_Distance_To_User()
    for (var stop = 0; stop < Bus_Stops.length; stop++) {
        if (stop == 0){
            Shortest_distance = Bus_Stops[stop].Distance_to_Stop
            Bus_Stop_Address = Bus_Stops[stop].Stop_Address;
        }
        else if (Bus_Stops[stop].Distance_to_Stop < Shortest_distance) {
            Shortest_distance = Bus_Stops[stop].Distance_to_Stop;
            Bus_Stop_Address = Bus_Stops[stop].Stop_Address;
        }

    }
    alert(Bus_Stop_Address)
    alert(Shortest_distance)
    Map_Shortest_Bus_Stop(User_Address, Bus_Stop_Address)

}


function Calculate_Distance_To_Stops(User_Address) {
    var latitude= 41.117744;
    var longitude = -73.4081575;
    var summaryPanel = document.getElementById('directions_panel');
    var Array_position=0
    var directionsDisplay;
    var directionsService = new google.maps.DirectionsService();
    var map;
    var lat, lon;


    directionsDisplay = new google.maps.DirectionsRenderer();
    var New_Map = new google.maps.LatLng(latitude, longitude);

    var mapOptions = {
        zoom: 15,
        center: New_Map
    }

    map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
    directionsDisplay.setMap(map);

    Bus_Stops = Read_Bus_Stops();

    for (var Bus_Stop = 0; Bus_Stop < Bus_Stops.length; Bus_Stop++) {
        var request = {
            origin:User_Address,
            destination:Bus_Stops[Bus_Stop].Stop_Address,
            travelMode: google.maps.TravelMode.DRIVING
        };

        directionsService.route(request, function(response, status) {

            if (status == google.maps.DirectionsStatus.OK) {
                //var distance = response.routes[0].legs[0].distance.text;
                //var directions = response.routes[0];
                var route = response.routes[0];
                var summaryPanel = document.getElementById('directions_panel');

                // For each route, display summary information.
                for (var route_leg = 0; route_leg < route.legs.length; route_leg++) { //should be one only
                    summaryPanel.innerHTML += ' Distance From: ' + route.legs[route_leg].start_address + '   ';
                    summaryPanel.innerHTML += 'To: ' + route.legs[route_leg].end_address + '     ';
                    var distance = parseFloat(route.legs[route_leg].distance.text)
                    summaryPanel.innerHTML += ' is : ' + distance + '<br>';
                    Bus_Stops[Array_position].Distance_to_Stop =  distance;

                    // START ALI ||  START ALI ||  START ALI ||  START ALI ||  START ALI ||  START ALI ||  START ALI ||  START ALI ||
                    Distance_To_User( Bus-Stop_Address, Distance_to_user, User_Address);
                    //Add_New_Distance_To_user (Bus-Stop_Address, Distance_to_user,User_Address)
                    // END ALI || END ALI || END ALI || END ALI || END ALI || END ALI || END ALI || END ALI || END ALI || END ALI ||


                }

                Array_position = Array_position + 1;

                if (Array_position == Bus_Stops.length) { //Must pass array at this point
                    Get_Shortest_Distance_To_Stops(User_Address,Bus_Stops)

                }
            }
            else{
                alert("Address not found via Geocoder will need to use Geolocation for iteration 2")


            }
        });
    }

    return true;
};

function Add_Bus_Stop(){
//get bus number input from user

// loop array?
// Get Bus stop info from user (Stop time, stop address) then users clicks add and new row shows inputed data
//Latitude, longitude =Get_Coordinates(Stop address)
//bustop.latitude = latitude
//bustop.long = long
//Delete_Coordinates(stop address)
// loop array?

//write bus stop sto DB, calls Alis function
}

// START ALI ||  START ALI ||  START ALI ||  START ALI ||  START ALI ||  START ALI ||  START ALI ||  START ALI ||
function Get_Coordinates(Address){
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
}

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

function Write_Distances(Bus_Number, Bus_Stop_Time, Bus_Stop_Address, User_Address, Distances){
    var action = "Write_Distances";
    var Write_Distances_Data = {Bus_Number: Bus_Number, Bus_Stop_Time: Bus_Stop_Time, Bus_Stop_Address: Bus_Stop_Address, User_Address: User_Address, Distances: Distances, action: action};
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
    var action = "Delete_Coordinates";
    var Delete_Distances_Data = {Distances_ID: Distances_ID, action: action};
    $.ajax({data: Delete_Distances_Data});
}

// END ALI || END ALI || END ALI || END ALI || END ALI || END ALI || END ALI || END ALI || END ALI || END ALI ||

function Use_My_Location(){
    var map;

    var mapOptions = {
        zoom: 15
    };
    map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);

    // Try HTML5 geolocation
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = new google.maps.LatLng(position.coords.latitude,
                position.coords.longitude);

            alert(position.coords.latitude)
            alert(position.coords.longitude)

            var infowindow = new google.maps.InfoWindow({
                map: map,
                position: pos,
                content: 'Location found using HTML5.'
            });

            map.setCenter(pos);
        }, function() {
            alert('Error: The Geolocation service failed.')
        });
    } else {
        alert('Error: Your browser doesn\'t support geolocation.')
    }
};




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

function Map_Shortest_Bus_Stop(User_Address, Bus_Stop_Address){
    var latitude= 41.117744;
    var longitude = -73.4081575;
    var shortest_route_distance = 9999999999;
    var shortest_route_value;
    var summaryPanel = document.getElementById('directions_panel');
    var Array_position=0
    var directionsDisplay;
    var directionsService = new google.maps.DirectionsService();
    var map;


    directionsDisplay = new google.maps.DirectionsRenderer();

    var New_Map = new google.maps.LatLng(latitude, longitude);

    var mapOptions = {
        zoom: 15,
        center: New_Map
    }


    map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
    directionsDisplay.setMap(map);


    var start = User_Address;
    var end = Bus_Stop_Address;

    var request = {
        origin:start,
        destination:end,
        travelMode: google.maps.TravelMode.DRIVING
    };

    directionsService.route(request, function(response, status) {

        if (status == google.maps.DirectionsStatus.OK) {

            var distance = response.routes[0].legs[0].distance.text;
            var directions = response.routes[0];
            directionsDisplay.setDirections(response);

            var route = response.routes[0];
            var summaryPanel = document.getElementById('directions_panel');

            // For each route, display summary information.
            for (var route_leg = 0; route_leg < route.legs.length; route_leg++) { //should be one only

                var routeSegment = route_leg + 1;
                summaryPanel.innerHTML += ' Distance From: ' + route.legs[route_leg].start_address + '   ';
                summaryPanel.innerHTML += 'To: ' + route.legs[route_leg].end_address + '     ';
                var distance = parseFloat(route.legs[route_leg].distance.text)
                summaryPanel.innerHTML += ' is : ' + distance + '<br>';

            }

        }
        else{
            alert("Something went wrong, could not map the address")
        }

    });



}


function Show_Bus_Stops() { //limit is 5 addresses, need to look for alternative to get lat and lng from addresses 
    var Bus_Stops = Read_Bus_Stops();






    var map = new google.maps.Map(document.getElementById('map-canvas'));
    var bounds = new google.maps.LatLngBounds();
    var infowindow = new google.maps.InfoWindow();

    for (var Bus_Stop = 0; Bus_Stop < Bus_Stops.length; Bus_Stop++) {

        var geocoder = new google.maps.Geocoder();


        geocoder.geocode( { 'address': Bus_Stops[Bus_Stop].Stop_Address}, function(results, status) {

            if (status == google.maps.GeocoderStatus.OK) {
                Bus_Stops[Bus_Stop].latitude = results[0].geometry.location.lat();
                Bus_Stops[Bus_Stop].longitude = results[0].geometry.location.lng();
                //  alert(Bus_Stops[Bus_Stop].latitude)
                //  alert(Bus_Stops[Bus_Stop].latitude)

            }
            else{
                alert("could not map address: " + status)
            }
        })

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

google.maps.event.addDomListener(window, 'load', initialize);

//----------------------------By Marlon Bermudez-------------------------------//