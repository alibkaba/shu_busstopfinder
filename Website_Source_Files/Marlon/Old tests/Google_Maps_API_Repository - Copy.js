

		   function initialize() {
			
				var state = "CT"
				var School_District= "Norwalk Public School";
				var latitude= 41.117744;
				var logitude = -73.4081575;
							
				var directionsDisplay;
			var directionsService = new google.maps.DirectionsService();
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
	
				
				
				
				//-----------load SQL values here--------------
								
				
				
				BUS_Stops = Get_Bus_Stops()
				
				Map_Address(latitude, logitude, null)
				Display_Stops_Pannel(BUS_Stops)
				
				/*
				var browserSupportFlag =  new Boolean();
				//Check to see if geolocation can be detected
				  if(navigator.geolocation) {
					browserSupportFlag = true;
					navigator.geolocation.getCurrentPosition(function(position) {
					  initialLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
					  map.setCenter(initialLocation);
					}, function() {
					  handleNoGeolocation(browserSupportFlag);
					});
				  }
				  // Browser doesn't support Geolocation
				  else {
					browserSupportFlag = false;
					handleNoGeolocation(browserSupportFlag);
				  }

				  function handleNoGeolocation(errorFlag) {
					if (errorFlag == true) {
					  alert("Geolocation service failed.");
					  initialLocation = newyork;
					} else {
					  alert("Your browser doesn't support geolocation. We've placed you in New York.");
					  initialLocation = newyork;
					}
					map.setCenter(initialLocation);
				  }
				*/
				
				
				
				//DISPLAY ADDRESSES
				
	

            }
			
			function Get_Bus_Stops(){
			
			//Query number of bus stops for School
			// Will use a linked list for second iteration
			

				BUS_Stops = Array(8);
				BUS_Stops[0]= "RIVERSIDE AV & HILL ST norwalk ct";
				BUS_Stops[1]= "PONUS AV & ELLS ST norwalk ct";			
				BUS_Stops[2]= "PONUS AV & CORNWALL RD norwalk ct";
				BUS_Stops[3]= "GLEN AV & SHORT ST norwalk ct";		
				BUS_Stops[4]= "LEDGEWOOD DR & STYLES LA norwalk ct";
				BUS_Stops[5]= "STYLES AV & PENNY LA norwalk ct";
				BUS_Stops[6]= "PONUS AV & LANCASTER DR norwalk ct";
				BUS_Stops[7]= "MAHER DR & STEPPINGSTONE PL norwalk ct";
				
				return BUS_Stops;
			
			
			
			}
			
			function Map_Address(latitude, longitude, address){
								
				
				alert(latitude);
				alert(longitude);
				//var newyork = new google.maps.LatLng(41.650440, -72.684001);
				
			
				var directionsDisplay;
				var directionsService = new google.maps.DirectionsService();
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
				
			}
			
			function Map_Address_Mark_Bus_Stops(){
			
			
			
			
			}
			
			function Display_Stops_Pannel(BUS_Stops){
			
			
				var AddressPanel = document.getElementById('addresses_panel');
				AddressPanel.innerHTML = '';
				// For each address, display summary information.
				for (var i = 0; i < 8; i++) {
					AddressPanel.innerHTML += BUS_Stops[i] + '</b><br>';
                  }
			
			}

            function calcRoute(User_Address) {
				alert(User_Address);
				var directionsService = new google.maps.DirectionsService();
				var directionsDisplay;
				//for loop
				var min = 9999999;
				var flag;
				BUS_Stops = BUS_Stops= Get_Bus_Stops();
				//initialize();
				 
				 
				
				for (var x = 0; x < BUS_Stops.length; x++) {
					var start = User_Address;
					//var start = document.getElementById("User_Address").value;
				   // var end = document.getElementById("end").value;
					// var start = "12 dover st norwalk ct"
					var end = BUS_Stops[x]
					alert(BUS_Stops[x]);



					var request = {
					origin:start,
					destination:end,
					travelMode: google.maps.TravelMode.DRIVING
					};
					
					
					  directionsService.route(request, function(response, status) {
						if (status == google.maps.DirectionsStatus.OK) {
						  directionsDisplay.setDirections(response);
						  
						  
						  
						  
						  
						  	/*
					//directionsService.route(request, function(response, status) {
					//if (status == google.maps.DirectionsStatus.OK) {
					directionsDisplay.setDirections(response);
					var route = response.routes[0];
					var summaryPanel = document.getElementById('directions_panel');
					//summaryPanel.innerHTML = '';
					// For each route, display summary information.
					for (var i = 0; i < route.legs.length; i++) {
						var routeSegment = i + 1;
					   // summaryPanel.innerHTML += '<b>Route ' + x + '</b><br>';
						summaryPanel.innerHTML += ' From: ' + route.legs[i].start_address + '<br>';
						summaryPanel.innerHTML += 'To: ' + route.legs[i].end_address + '<br>';
						summaryPanel.innerHTML += 'Duration: ' + route.legs[i].duration.text + '<br>';
						var distance = parseFloat(route.legs[i].distance.text)
						summaryPanel.innerHTML += 'Distance: ' + distance + '<br><br>';
					
						if (distance < min){
							min = distance;
							flag = x;	
							summaryPanel.innerHTML += 'Lowest distance: ' + min + ' <br><br>';				
							}
					}

				//	}
					//});
				*/
				
				
				
						  
						}
					  });
					  
				
				
				}
				//for loop
				//var summaryPanel = document.getElementById('directions_panel');
				//summaryPanel.innerHTML += '<b>the mininum distance is ' + min + ' miles to ' + BUS_Stops[flag] + '</b><br>';
            }
			
			function Calc(start) {
				alert(start);
				
			}
			
			function Map_Address2(address){
				alert(address);
				var geocoder;
				var map;
				
				function initialize() {
				  geocoder = new google.maps.Geocoder();
				  var latlng = new google.maps.LatLng(-34.397, 150.644);
				  var mapOptions = {
					zoom: 15,
					center: latlng
				  }
				  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
				}

				function codeAddress() {
				  //var address = document.getElementById('address').value;
				  geocoder.geocode( { 'address': address}, function(results, status) {
					if (status == google.maps.GeocoderStatus.OK) {
					  map.setCenter(results[0].geometry.location);
					  var marker = new google.maps.Marker({
						  map: map,
						  position: results[0].geometry.location
					  });
					} else {
					  alert('Geocode was not successful for the following reason: ' + status);
					}
				  });
				}
					
	
			
			}
			
			function LinkedList() {
				this._length = 0;
				this._head = null;
			}
						
			
			
			
			
			
			
			
			
			
			
			
			
			
			
            google.maps.event.addDomListener(window, 'load', initialize);