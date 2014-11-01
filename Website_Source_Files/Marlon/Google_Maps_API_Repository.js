function initialize() {

    //-----------load SQL values here------------

    var state = "CT"
    var School_District= "Norwalk Public School";
    var School_District_Lat= 41.117744;
    var School_District_Lng = -73.4081575;

    Bus_Stops = Get_Bus_Stops()
    Map_Address(School_District_Lat, School_District_Lng, null)
    Display_Stops_Pannel(Bus_Stops)

};

function Get_Bus_Stops(){

    //Query number of bus stops for School

    var Bus_Stops =[]
    Bus_Stops[0]= {Stop_Time:null, Stop_Address:"RIVERSIDE AV & HILL ST norwalk ct", Distance_to_Stop:null, latitude: null, longitude: null}
    Bus_Stops[1]= {Stop_Time:null, Stop_Address:"PONUS AV & ELLS ST norwalk ct", Distance_to_Stop:null, latitude: null, longitude: null}
    Bus_Stops[2]= {Stop_Time:null, Stop_Address:"PONUS AV & CORNWALL RD norwalk ct", Distance_to_Stop:null, latitude: null, longitude: null}
    Bus_Stops[3]= {Stop_Time:null, Stop_Address:"GLEN AV & SHORT ST norwalk ct", Distance_to_Stop:null, latitude: null, longitude: null}
    Bus_Stops[4]= {Stop_Time:null, Stop_Address:"LEDGEWOOD DR & STYLES LA norwalk ct", Distance_to_Stop:null, latitude: null, longitude: null}
    Bus_Stops[5]= {Stop_Time:null, Stop_Address:"STYLES AV & PENNY LA norwalk ct", Distance_to_Stop:null, latitude: null, longitude: null}
    Bus_Stops[6]= {Stop_Time:null, Stop_Address:"PONUS AV & LANCASTER DR norwalk ct", Distance_to_Stop:null, latitude: null, longitude: null}
    Bus_Stops[7]= {Stop_Time:null, Stop_Address:"MAHER DR & STEPPINGSTONE PL norwalk ct", Distance_to_Stop:null, latitude: null, longitude: null}

    return Bus_Stops;

};

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
    var Bus_Stop_Address;
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

    directionsDisplay = new google.maps.DirectionsRenderer();
    var New_Map = new google.maps.LatLng(latitude, longitude);

    var mapOptions = {
        zoom: 15,
        center: New_Map
    }

    map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
    directionsDisplay.setMap(map);


    // var flag;
    Bus_Stops = Get_Bus_Stops();

    for (var Bus_Stop = 0; Bus_Stop < Bus_Stops.length; Bus_Stop++) {
        var start = User_Address;
        var end = Bus_Stops[Bus_Stop].Stop_Address;

        var request = {
            origin:start,
            destination:end,
            travelMode: google.maps.TravelMode.DRIVING
        };

        directionsService.route(request, function(response, status) {

            if (status == google.maps.DirectionsStatus.OK) {

                var distance = response.routes[0].legs[0].distance.text;
                var directions = response.routes[0];

                // directionsDisplay.setDirections(response);

                var route = response.routes[0];
                var summaryPanel = document.getElementById('directions_panel');

                // For each route, display summary information.
                for (var route_leg = 0; route_leg < route.legs.length; route_leg++) { //should be one only

                    var routeSegment = route_leg + 1;
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
};



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