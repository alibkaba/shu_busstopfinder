
// ------------------------------------------Marlon coded items BELOW --------------------------------//

describe("Test time input", function(){
    it("validates Bus Stop time", function() {
        var Time = "12:45am";
        expect(isTimeValid(Time)).toBeTruthy();
        var Time = "12:45Am";
        expect(isTimeValid(Time)).toBeTruthy();
        var Time = "02:45pm";
        expect(isTimeValid(Time)).toBeTruthy();
        var Time = "05:45Pm";
        expect(isTimeValid(Time)).toBeTruthy();
        var Time = "12:61am";
        expect(isTimeValid(Time)).toBeFalsy();
        var Time = "13:45am";
        expect(isTimeValid(Time)).toBeFalsy();
        var Time = "03:45bm";
        expect(isTimeValid(Time)).toBeFalsy();
        var Time = "02:40";
        expect(isTimeValid(Time)).toBeFalsy();
        var Time = "asdf";
        expect(isTimeValid(Time)).toBeFalsy();
        var Time = "";
        expect(isTimeValid(Time)).toBeFalsy();
    });
});


describe("Test creating new Bus objects", function() {
    var Bus_Stop;
    beforeEach(function() {  Bus_Stop = new Bus_Stop_Object; });
    it("creates a new object when passed parameters", function() {
        spyOn(Bus_Stop, "New");
        Bus_Stop.New("9:20", "2 scofield place norwalk ct");
        expect(Bus_Stop.New).toHaveBeenCalled();
    });
    it("can read data from object", function() {
        Bus_Stop.New("9:10", "2 scofield place norwalk ct");
        expect(Bus_Stop.Stop_Time).toBe("9:10");
    });
    it("can update data on object", function() {
        Bus_Stop.New("8:00", "30 main st norwalk ct");
        expect(Bus_Stop.Stop_Time).toBe("8:00");
        expect(Bus_Stop.Stop_Address).toBe("30 main st norwalk ct");
        Bus_Stop.Set_Stop_Time("8:15");
        Bus_Stop.Set_Stop_Address("60 main st norwalk ct");
        expect(Bus_Stop.Stop_Time).toBe("8:15");
        expect(Bus_Stop.Stop_Address).toBe("60 main st norwalk ct");
    });
    it("fails to create an object unless time and address are both defined", function() {
        Bus_Stop.New();
        expect(Bus_Stop.Stop_Time).toBeUndefined();
        expect(Bus_Stop.Stop_Address).toBeUndefined();
        Bus_Stop.New("8:00");
        expect(Bus_Stop.Stop_Time).toBeUndefined();
        expect(Bus_Stop.Stop_Address).toBeUndefined();
        Bus_Stop.New(undefined, "30 main st norwalk ct");
        expect(Bus_Stop.Stop_Time).toBeUndefined();
        expect(Bus_Stop.Stop_Address).toBeUndefined();


    });
});

describe("Test isBusStopValid", function(){
    var Bus_Stop;
    beforeEach(function() {  Bus_Stop = new Bus_Stop_Object; });
    it("can test a valid Bus_Stop_Object", function(){
        Bus_Stop.New("8:00", "30 main st norwalk ct");
        var Validated_Bus_Stop = isBusStopValid(Bus_Stop);
        expect(Validated_Bus_Stop).toBeTruthy();
    });
    it("can test an Invalid Bus_Stop_Object", function(){
        Bus_Stop.New();
        var Validated_Bus_Stop = isBusStopValid(Bus_Stop);
        expect(Validated_Bus_Stop).toBeFalsy();
    });

});



describe("Test Create Array of Bus Stops Objects", function(){
    var Bus_Stop;
    var New_Bus_Array = [];
    beforeEach(function() {  Bus_Stop = new Bus_Stop_Object; });
    it("can validate a Bus_Stop_Object", function(){
        Bus_Stop.New("9:00", "20 Main St Norwalk CT");
        expect(isBusStopValid(Bus_Stop)).toBeTruthy();
    });
    it("can add Bus Objects to Array", function(){
        Bus_Stop.New("9:00", "20 Main St Norwalk CT");
        expect(isBusStopValid(Bus_Stop)).toBeTruthy();
        New_Bus_Array.push(Bus_Stop);
        expect(New_Bus_Array.length).toBe(1);
        Bus_Stop.New("9:10", "60 Main St Norwalk CT");
        New_Bus_Array.push(Bus_Stop);
        expect(New_Bus_Array.length).toBe(2);
    });
});


describe("Test Get Bus Stops for School ID", function(){
    var School_ID = '1';
    it("should return array with valid data", function () {
        var New_Bus_Array = Get_Bus_Stops_for_School(School_ID);
        expect(New_Bus_Array[0].Stop_Time).toContain('9:00');
        expect(New_Bus_Array[0].Stop_Address).toContain('RIVERSIDE AV & HILL ST norwalk ct');
        // expect(New_Bus_Array[0].Distance_to_Stop).toBeNull();
        expect(New_Bus_Array[0].Latitude).not.toBeNull();
        expect(New_Bus_Array[0].Longitude).not.toBeNull();
        expect(isBusStopValid(New_Bus_Array[0])).toBeTruthy();
    });
    it("returns an array of objects from Get Bus Stops", function (){
        var Bus_Stops = Get_Bus_Stops();
        expect(typeof Bus_Stops).toBe('object');
        expect(typeof Bus_Stops[0]).toBe('object');
    });
});



describe("Test Address object and Geocoding", function(){
    var User_Address;
    beforeEach(function() {  User_Address = new Address_Object(); });
    it("creates a new address", function () {
        User_Address.Set_Location("20 main st norwalk ct");
        expect(User_Address.Location).toBe("20 main st norwalk ct");
    });
    it("calls Get_LatLong to get Geolocation for Address", function () {
        spyOn(User_Address, "Get_LatLong");
        User_Address.Get_LatLong("20 main st norwalk ct");
        expect(User_Address.Get_LatLong).toHaveBeenCalled();
     });
    it("creates Lat_Long_Location from Latitude and Longitude", function () {
        User_Address.Latitude = 40.25;
        User_Address.Longitude = 41.001;
        User_Address.Set_Lat_Long_Location();
        expect(User_Address.Lat_Long_Location).toBe("40.25,41.001");
        expect(User_Address.Set_Lat_Long_Location).toBeTruthy();
    });
    it("alerts user if cannot set Lat_Long_Location from Latitude and Longitude", function () {
        User_Address.Latitude;
        User_Address.Longitude = 41.001;
        User_Address.Set_Lat_Long_Location();
        expect(User_Address.Set_Lat_Long_Location()).toBeFalsy();
        expect(User_Address.Lat_Long_Location).toBeUndefined();
    });
});


describe("Test Convert Coordinates to String", function(){
    var User_Address = "20 main st norwalk ct";
    // var User_Coordinates  = Convert_Coordinates_to_String(User_Address);
    //alert(typeof Coordinates);
    it("Find the lowest Distance To Stop", function () {
        //expect(Coordinates.Latitude).toContain(41.11912100000001);
        // expect(Coordinates.Latitude).toBeFalsy(); //Async issue
    });
});

















/*
describe("Test Creating New Bus Stop Objects", function(){
    it("creates a new Bus Stop Object by passing Stop Time and Stop Address", function () {
        var New_Bus_Stop = Create_Bus_Stop_Object( "9:00", "20 Main St Norwalk CT")
        expect(New_Bus_Stop.Stop_Address).toContain('20 Main St Norwalk CT');
        expect(New_Bus_Stop.Distance_to_Stop).toBe(0);
    });
    it("a new Bus Stop Object will not be created if missing Stop time and address parameters", function () {
        var New_Bus_Stop = Create_Bus_Stop_Object();
        expect(New_Bus_Stop).toBeFalsy();
    });
    it("a new Bus Stop Object will not be created if missing address parameter", function () {
        var New_Bus_Stop = Create_Bus_Stop_Object("9:00");
        expect(New_Bus_Stop).toBeFalsy();
    });
});
*/







describe("Calculate Distance to Stops", function(){
    var User_Address = "20 main st norwalk ct";
    // var User_Coordinates  = Convert_Coordinates_to_String(User_Address);
    //alert(typeof Coordinates);
    it("should find the distance from User address to Bus Stop", function () {
        //expect(Coordinates.Latitude).toContain(41.11912100000001);
        // expect(Coordinates.Latitude).toBeFalsy(); //Async issue
    });
});


describe("Get Shortest Distance to Stops", function(){
    var User_Address = "20 main st norwalk ct";
    // var User_Coordinates  = Convert_Coordinates_to_String(User_Address);
    //alert(typeof Coordinates);
    it("should find the shortest distance from User address to Bus Stops", function () {
        //expect(Coordinates.Latitude).toContain(41.11912100000001);
        // expect(Coordinates.Latitude).toBeFalsy(); //Async issue
    });
});

describe("Calculate Distance to Stops using Haversine Formula", function(){
    var User_Address = "20 main st norwalk ct";
    // var User_Coordinates  = Convert_Coordinates_to_String(User_Address);
    //alert(typeof Coordinates);
    it("should calclualte the Distance between 2 Coordinate points", function () {
        //expect(Coordinates.Latitude).toContain(41.11912100000001);
        // expect(Coordinates.Latitude).toBeFalsy(); //Async issue
    });
    it("return the distance between the 2 coordinate points", function () {
        //expect(Coordinates.Latitude).toContain(41.11912100000001);
        // expect(Coordinates.Latitude).toBeFalsy(); //Async issue
    });
});


describe("Test Convert Degrees to Radians", function(){
    var User_Address = "20 main st norwalk ct";
    // var User_Coordinates  = Convert_Coordinates_to_String(User_Address);
    //alert(typeof Coordinates);
    it("should convert Degrees to Radians", function () {
        //expect(Coordinates.Latitude).toContain(41.11912100000001);
        // expect(Coordinates.Latitude).toBeFalsy(); //Async issue
    });
});



describe("TestFind My location", function(){
    var User_Address = "20 main st norwalk ct";
    // var User_Coordinates  = Convert_Coordinates_to_String(User_Address);
    //alert(typeof Coordinates);
    it("should find my location", function () {
        //expect(Coordinates.Latitude).toContain(41.11912100000001);
        // expect(Coordinates.Latitude).toBeFalsy(); //Async issue
    });
});




describe("Spy on Map Address to ensure it is called with parameters", function() {
    var Map_Address, map = null;
    var latitude =  -42.32;
    var longitude = 42.245;

    beforeEach(function() {
        Map_Address = {
            setAddress: function(value) {
                map = value;
            }
        };
        spyOn(Map_Address, 'setAddress');
        Map_Address.setAddress(latitude, longitude);
    });
    it("tracks that the Map Address spy was called and address set", function() {
        expect(Map_Address.setAddress).toHaveBeenCalled();
    });
    it("tracks latitude and longitude parameters were passed", function() {
        expect(Map_Address.setAddress).toHaveBeenCalledWith(latitude, longitude);
    });
});


describe("Test Map Bus Stops", function(){
    var User_Address = "20 main st norwalk ct";
    // var User_Coordinates  = Convert_Coordinates_to_String(User_Address);
    //alert(typeof Coordinates);
    it("should Map Bus Stops on a Map", function(){


    });

});







describe("Test Get Shortest Distance between User Address and all Bus Stops", function(){
    //var Bus_Stops = [];
    var Bus_Stops =[];
    Bus_Stops[0]= {Stop_Time: "9:00", Stop_Address:"RIVERSIDE AV & HILL ST norwalk ct", Distance_to_Stop: 1, Latitude: 41.117744, Longitude: 41.117744};
    Bus_Stops[1]= {Stop_Time: "9:10", Stop_Address:"PONUS AV & ELLS ST norwalk ct", Distance_to_Stop: 1.5, Latitude: 0, Longitude: 0};
    Bus_Stops[2]= {Stop_Time: "9:15", Stop_Address:"PONUS AV & CORNWALL RD norwalk ct", Distance_to_Stop: 2.5, Latitude: 0, Longitude: 0};
    Bus_Stops[3]= {Stop_Time: "9:20", Stop_Address:"GLEN AV & SHORT ST norwalk ct", Distance_to_Stop: 0.5, Latitude: 0, Longitude: 0};
    Bus_Stops[4]= {Stop_Time: "9:24", Stop_Address:"LEDGEWOOD DR & STYLES LA norwalk ct", Distance_to_Stop: 2.5, Latitude: 0, Longitude: 0};
    Bus_Stops[5]= {Stop_Time: "9:30", Stop_Address:"STYLES AV & PENNY LA norwalk ct", Distance_to_Stop: 0.65, Latitude: 0, Longitude: 0};
    Bus_Stops[6]= {Stop_Time: "9:35", Stop_Address:"PONUS AV & LANCASTER DR norwalk ct", Distance_to_Stop: 6, Latitude: 0, Longitude: 0};
    Bus_Stops[7]= {Stop_Time: "9:40", Stop_Address:"MAHER DR & STEPPINGSTONE PL norwalk ct", Distance_to_Stop: 1.2, Latitude: 0, Longitude: 0};

    var User_Address = "20 main st norwalk ct"
    var Bus_Stop = Sort_Distance_To_Stops(User_Address,Bus_Stops);
    it("Find the lowest Distance To Stop", function () {
        // expect(Bus_Stop.Distance).toBe(0.5);
        //expect(Bus_Stop.Address).toContain('GLEN AV & SHORT ST norwalk ct');
    });
});



describe("Test Calculate Shortest Distance to Stops", function(){
    //var Bus_Stops = [];
    var Bus_Stops =[];
    Bus_Stops[0]= {Stop_Time: "9:00", Stop_Address:"RIVERSIDE AV & HILL ST norwalk ct", Distance_to_Stop: 1, Latitude: 41.117744, Longitude: 41.117744};
    Bus_Stops[1]= {Stop_Time: "9:10", Stop_Address:"PONUS AV & ELLS ST norwalk ct", Distance_to_Stop: 1.5, Latitude: 0, Longitude: 0};
    Bus_Stops[2]= {Stop_Time: "9:15", Stop_Address:"PONUS AV & CORNWALL RD norwalk ct", Distance_to_Stop: 2.5, Latitude: 0, Longitude: 0};
    Bus_Stops[3]= {Stop_Time: "9:20", Stop_Address:"GLEN AV & SHORT ST norwalk ct", Distance_to_Stop: 0.5, Latitude: 0, Longitude: 0};
    Bus_Stops[4]= {Stop_Time: "9:24", Stop_Address:"LEDGEWOOD DR & STYLES LA norwalk ct", Distance_to_Stop: 2.5, Latitude: 0, Longitude: 0};
    Bus_Stops[5]= {Stop_Time: "9:30", Stop_Address:"STYLES AV & PENNY LA norwalk ct", Distance_to_Stop: 0.65, Latitude: 0, Longitude: 0};
    Bus_Stops[6]= {Stop_Time: "9:35", Stop_Address:"PONUS AV & LANCASTER DR norwalk ct", Distance_to_Stop: 6, Latitude: 0, Longitude: 0};
    Bus_Stops[7]= {Stop_Time: "9:40", Stop_Address:"MAHER DR & STEPPINGSTONE PL norwalk ct", Distance_to_Stop: 1.2, Latitude: 0, Longitude: 0};

    var User_Address = "20 main st norwalk ct"
    var Bus_Stop = Sort_Distance_To_Stops(User_Address,Bus_Stops);
    it("Find the lowest Distance To Stop", function () {
       // expect(Bus_Stop.Distance).toBe(0.5);
        //expect(Bus_Stop.Address).toContain('GLEN AV & SHORT ST norwalk ct');
    });
});

describe("Test Get Coordinates Function on GeoCoder", function(){
    var googleMapMock = {
        geoCode: function(code, fn) {
            var geocoder = new google.maps.Geocoder();
            geocoder.geocode({
                'address': code
            }, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    fn(results[0].geometry.location);
                } else {
                    alert("Error with Geocoder");
                }
            })
        },
        render: function(LatLng) {
            var mapOptions = {
                zoom: 8,
                center: LatLng
            }
            map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
            var marker = new google.maps.Marker({
                map: map,
                position: LatLng
            });
        }
    };

    window.google = {
        maps: {
            Geocoder: function() {
                this.geocode = function(input, fn) {
                    setTimeout(function() {
                        fn([{geometry: {location: 1}}], window.google.maps.GeocoderStatus.OK);
                    }, 1000);
                }
            },
            GeocoderStatus: {OK: 1             }
        }
    };

    it("Test GeoCode Mock object by calling function", function(done) {
        var address = "20 main st norwalk ct";
        googleMapMock.geoCode(address, function() { done(); });
    });
    it("Test GeoCode Mock function by using spy", function(done) {
        var address = "20 main st norwalk ct";
        var callbackSpy = jasmine.createSpy("callback").and.callFake(function() { done(); });
        googleMapMock.geoCode(address, callbackSpy);
    });
});





describe("Test Add Marker function by using spy on mock", function() {
    var Add_Marker, map = null;
    var latitude =  -42.32;
    var longitude = 42.245;

    beforeEach(function() {
        Add_Marker = {
            setAddress: function(value) {
                map = value;
            }
        };
        spyOn(Add_Marker, 'setAddress');
        Add_Marker.setAddress(latitude, longitude);
    });

    it("tracks that the Map Address spy was called and address set", function() {
        expect(Add_Marker.setAddress).toHaveBeenCalled();
    });
    it("tracks latitude and longitude parameters were passed", function() {
        expect(Add_Marker.setAddress).toHaveBeenCalledWith(latitude, longitude);
    });
});


// ------------------------------------------Marlon coded items ABOVE--------------------------------//
