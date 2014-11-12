//------------------------Source Code----By Marlon Bermudez-------------------------------//
function initialize() {

    //-----------load SQL values here--------------
    var state = "CT";
    var School_District= "Norwalk Public School";
    var School_District_Lat= 41.117744;
    var School_District_Lng = -73.4081575;

    Bus_Stops = Get_Bus_Stops();
    Master = Bus_Stops;
    Map_Address(School_District_Lat, School_District_Lng, null);
    Display_Stops_Pannel(Bus_Stops);
    return true;
}


function Create_Bus_Stop_Object( Stop_Time, Stop_Address){
    if(typeof Stop_Time != 'undefined' && typeof Stop_Address != 'undefined'){
        this.Stop_Time = Stop_Time;
        this.Stop_Address = Stop_Address;
        this.Distance_to_Stop = null;
        this.Latitude = null;
        this.Longitude = null;
        this.Stop_ID = null;
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
    Bus_Stop_Objects = Get_Bus_Stops();
    return Bus_Stop_Objects;
}


function Get_Bus_Stops(){
    var Bus_Stops =[];
    Bus_Stops[0]= {Stop_Time: "9:00", Stop_Address:"RIVERSIDE AV & HILL ST norwalk ct", Distance_to_Stop: 1, Latitude: 41.117744, Longitude: 41.117744};
    Bus_Stops[1]= {Stop_Time:null, Stop_Address:"PONUS AV & ELLS ST norwalk ct", Distance_to_Stop: 1.5, Latitude: null, Longitude: null};
    Bus_Stops[2]= {Stop_Time:null, Stop_Address:"PONUS AV & CORNWALL RD norwalk ct", Distance_to_Stop: 2.5, Latitude: null, Longitude: null};
    Bus_Stops[3]= {Stop_Time:null, Stop_Address:"GLEN AV & SHORT ST norwalk ct", Distance_to_Stop: 0.5, Latitude: null, Longitude: null}
    Bus_Stops[4]= {Stop_Time:null, Stop_Address:"LEDGEWOOD DR & STYLES LA norwalk ct", Distance_to_Stop: 2.5, Latitude: null, Longitude: null}
    Bus_Stops[5]= {Stop_Time:null, Stop_Address:"STYLES AV & PENNY LA norwalk ct", Distance_to_Stop: 0.65, Latitude: null, Longitude: null}
    Bus_Stops[6]= {Stop_Time:null, Stop_Address:"PONUS AV & LANCASTER DR norwalk ct", Distance_to_Stop: 6, Latitude: null, Longitude: null}
    Bus_Stops[7]= {Stop_Time:null, Stop_Address:"MAHER DR & STEPPINGSTONE PL norwalk ct", Distance_to_Stop: 1.2, Latitude: null, Longitude: null}
    return Bus_Stops;

}

function Map_Address(latitude, longitude, address){
    var directionsDisplay;
    var map;
    directionsDisplay = new google.maps.DirectionsRenderer();
    var New_Map = new google.maps.LatLng(latitude, longitude);
    var mapOptions = {
        zoom:13,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        center: New_Map
    };

    map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
    directionsDisplay.setMap(map);
    return map;
}


function Display_Stops_Pannel(Bus_Stops){
    var AddressPanel = document.getElementById('addresses_panel');
    AddressPanel.innerHTML = '';
    for (var Bus_Stop_Address = 0; Bus_Stop_Address < Bus_Stops.length; Bus_Stop_Address++) {
        AddressPanel.innerHTML += Bus_Stops[Bus_Stop_Address].Stop_Address + '</b><br>';
    }
}

function Get_Shortest_Distance_To_Stops(User_Address,Bus_Stops){
    var Shortest_distance = Bus_Stops[0].Distance_to_Stop;
    var Bus_Stop_Address;
    for (var stop = 1; stop < Bus_Stops.length; stop++) {
        if (Bus_Stops[stop].Distance_to_Stop < Shortest_distance && typeof Bus_Stops[stop].Distance_to_Stop != 'undefined') {
            Shortest_distance = Bus_Stops[stop].Distance_to_Stop;
            Bus_Stop_Address = Bus_Stops[stop].Stop_Address;
        }

    }
   // alert(Bus_Stop_Address);
    //alert(Shortest_distance);
    var Bus_Stop = {Address: Bus_Stop_Address, Distance: Shortest_distance};
    return Bus_Stop;
    //Map_Shortest_Bus_Stop(User_Address, Bus_Stop_Address)
}


function Calculate_Distance_To_Stops(User_Address) {
    var latitude= 41.117744;
    var longitude = -73.4081575;
    var summaryPanel = document.getElementById('directions_panel');
    var Array_position=0;
    var directionsDisplay;
    var directionsService = new google.maps.DirectionsService();
    var map;
    var lat, lon;
    directionsDisplay = new google.maps.DirectionsRenderer();
    var New_Map = new google.maps.LatLng(latitude, longitude);
    var mapOptions = {
        zoom: 15,
        center: New_Map
    };

    map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
    directionsDisplay.setMap(map);

    Bus_Stops = Get_Bus_Stops();

    for (var Bus_Stop = 0; Bus_Stop < Bus_Stops.length; Bus_Stop++) {
        var request = {
            origin:User_Address,
            destination:Bus_Stops[Bus_Stop].Stop_Address,
            travelMode: google.maps.TravelMode.DRIVING
        };

        directionsService.route(request, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                var route = response.routes[0];
                var summaryPanel = document.getElementById('directions_panel');
                for (var route_leg = 0; route_leg < route.legs.length; route_leg++) { //should be one only
                    summaryPanel.innerHTML += ' Distance From: ' + route.legs[route_leg].start_address + '   ';
                    summaryPanel.innerHTML += 'To: ' + route.legs[route_leg].end_address + '     ';
                    var distance = parseFloat(route.legs[route_leg].distance.text)
                    summaryPanel.innerHTML += ' is : ' + distance + '<br>';
                    Bus_Stops[Array_position].Distance_to_Stop =  distance;
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
}

function Get_Coordinates(Address){
    var latitude, longitude;
    var Bus_Stops = Get_Bus_Stops();
    var geocoder = new google.maps.Geocoder();
    var Address_Coordinates =[]
    Address_Coordinates[0]= {Latitude:null, Longitude: null, Address: Address};
    geocoder.geocode( { 'address': Address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            Address_Coordinates[0].Latitude = results[0].geometry.location.lat();
            Address_Coordinates[0].Longitude = results[0].geometry.location.lng();
            alert(Address_Coordinates[0].Latitude );
            alert(Address_Coordinates[0].Longitude);
            Add_Marker(Address_Coordinates[0].Latitude,Address_Coordinates[0].Longitude)
        }
        else{
            alert("could not map address: " + status)
        }
    });
    return Address_Coordinates;
}

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

function Map_Shortest_Bus_Stop(User_Address, Bus_Stop_Address){
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
            for (var route_leg = 0; route_leg < route.legs.length; route_leg++) { //should be one only
                var routeSegment = route_leg + 1;
                summaryPanel.innerHTML += ' Distance From: ' + route.legs[route_leg].start_address + '   ';
                summaryPanel.innerHTML += 'To: ' + route.legs[route_leg].end_address + '     ';
                var distance = parseFloat(route.legs[route_leg].distance.text);
                summaryPanel.innerHTML += ' is : ' + distance + '<br>';
            }
        }
        else{
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
        geocoder.geocode( { 'address': Bus_Stops[Bus_Stop].Stop_Address}, function(results, status) {

            if (status == google.maps.GeocoderStatus.OK) {
                Bus_Stops[Bus_Stop].latitude = results[0].geometry.location.lat();
                Bus_Stops[Bus_Stop].longitude = results[0].geometry.location.lng();
            }
            else{
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

google.maps.event.addDomListener(window, 'load', initialize);
//----------------------------By Marlon Bermudez-------------------------------//