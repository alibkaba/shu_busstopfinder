
// ------------------------------------------Marlon coded items BELOW --------------------------------//

describe("Validate User Address and School ID combination", function() {
    it("fails unless both User Address and School ID are both Valid", function () {
        expect(Validate_User_Address_and_School_ID("", "")).toBeFalsy();
        expect(Validate_User_Address_and_School_ID("2 main st norwalk ct", "")).toBeFalsy();
        expect(Validate_User_Address_and_School_ID("", "5")).toBeFalsy();
        expect(Validate_User_Address_and_School_ID("2 main st norwalk", "5")).toBe("Element is null only during Jasmine Testing");
    });
});

describe("Validate School ID", function() {
    it("checks for School ID value not to be empty", function () {
        expect(isSchoolIDValid("0")).toBeTruthy();
        expect(isSchoolIDValid("1")).toBeTruthy();
        expect(isSchoolIDValid("20")).toBeTruthy();
        expect(isSchoolIDValid("")).toBeFalsy();
    });
});

describe("Validate user Address", function() {
    it("test for User address to be more than 5 elements", function () {
        expect(isUserAddressValid("06855")).toBeFalsy();
        expect(isUserAddressValid("2 main st")).toBeFalsy();
        expect(isUserAddressValid("norwalk ct")).toBeFalsy();
        expect(isUserAddressValid("@#@#$%")).toBeFalsy();
        expect(isUserAddressValid("")).toBeFalsy();
        expect(isUserAddressValid("2 ma")).toBeFalsy();
        expect(isUserAddressValid("main")).toBeFalsy();
        expect(isUserAddressValid("2 main st norwalk ct")).toBeTruthy();
        expect(isUserAddressValid("2 main st 06855")).toBeTruthy();
    });
});

describe("Test Change Element", function() {
    var User_Address_Field;
    beforeEach(function() {  User_Address_Field = new Change_Element("User_Address")});
    it("calls SetColor", function() {
        spyOn(User_Address_Field, "SetColor");
        User_Address_Field.SetColor("#FF0000");
        expect(User_Address_Field.SetColor).toHaveBeenCalled();
    });
    it("calls Select", function() {
        spyOn(User_Address_Field, "Select");
        User_Address_Field.Select();
        expect(User_Address_Field.Select).toHaveBeenCalled();
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
        User_Address.Set_Latitude(40.123);
        expect(User_Address.Latitude).toBe(40.123);
        User_Address.Set_Longitude(40.00123);
        expect(User_Address.Longitude).toBe(40.00123);
        User_Address.Set_Lat_Long_Location();
        expect(User_Address.Lat_Long_Location).toBe("40.123,40.00123");
        expect(User_Address.Set_Lat_Long_Location).toBeTruthy();
    });
    it("alerts user if cannot set Lat_Long_Location from Latitude and Longitude", function () {
        User_Address.Latitude;
        User_Address.Longitude = 41.001;
        User_Address.Set_Lat_Long_Location();
        expect(User_Address.Set_Lat_Long_Location()).toBeFalsy();
        expect(User_Address.Lat_Long_Location).toBeUndefined();
    });
    it("fails to set Lat Long Location with Invalid Lat and Long", function() {
        User_Address.Set_Latitude();
        expect(User_Address.Set_Lat_Long_Location()).toBeFalsy();
        User_Address.Set_Latitude("asdf");
        expect(User_Address.Set_Lat_Long_Location()).toBeFalsy();
    });
});

describe("Test Format User Address with Mock Object", function() {
    var Format_User_Address;
    var User_Address = "20 main St Norwalk ct";
    beforeEach(function() {
        Format_User_Address = jasmine.createSpyObj('Format_User_Address', ['Set_Location', 'Get_LatLong','Set_Lat_Long_Location']);
        Format_User_Address.Set_Location(User_Address );
        Format_User_Address.Get_LatLong();
        Format_User_Address.Set_Lat_Long_Location();
    });
    it("creates spies for each requested function", function() {
        expect(Format_User_Address.Set_Location).toBeDefined();
        expect(Format_User_Address.Get_LatLong).toBeDefined();
        expect(Format_User_Address.Set_Lat_Long_Location).toBeDefined();
    });

    it("tracks that the spies were called", function() {
        expect(Format_User_Address.Set_Location).toHaveBeenCalled();
        expect(Format_User_Address.Get_LatLong).toHaveBeenCalled();
        expect(Format_User_Address.Set_Lat_Long_Location).toHaveBeenCalled();
    });

    it("tracks all the arguments of its calls", function() {
        expect(Format_User_Address.Set_Location).toHaveBeenCalledWith("20 main St Norwalk ct");
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

describe("Test Get Distance Haversine", function(){
    var Bus_Stops =[];
    Bus_Stops[0]= {Stop_Time: "9:00", Stop_Address:"RIVERSIDE AV & HILL ST norwalk ct", Distance_to_Stop: null, Latitude: 41.1215386, Longitude: -73.4238011};
    Bus_Stops[1]= {Stop_Time:null, Stop_Address:"PONUS AV & ELLS ST norwalk ct", Distance_to_Stop: null, Latitude: 41.1257694, Longitude: -73.4373563};
    Bus_Stops[2]= {Stop_Time:null, Stop_Address:"PONUS AV & CORNWALL RD norwalk ct", Distance_to_Stop: null, Latitude: 41.1258702, Longitude: -73.44233};
    Bus_Stops[3]= {Stop_Time:null, Stop_Address:"GLEN AV & SHORT ST norwalk ct", Distance_to_Stop: null, Latitude: 41.1305955, Longitude: -73.449364};
    Bus_Stops[4]= {Stop_Time:null, Stop_Address:"LEDGEWOOD DR & STYLES LA norwalk ct", Distance_to_Stop: null, Latitude: 41.1277236, Longitude: -73.4464775};
    Bus_Stops[5]= {Stop_Time:null, Stop_Address:"STYLES AV & PENNY LA norwalk ct", Distance_to_Stop: null, Latitude: 41.126766, Longitude: -73.4504417};
    Bus_Stops[6]= {Stop_Time:null, Stop_Address:"PONUS AV & LANCASTER DR norwalk ct", Distance_to_Stop: null, Latitude: 41.1249925, Longitude: -73.4469242};
    Bus_Stops[7]= {Stop_Time:null, Stop_Address:"MAHER DR & STEPPINGSTONE PL norwalk ct", Distance_to_Stop: null, Latitude: 41.120276, Longitude: -73.438289};
    var User_Address = new Address_Object();
    User_Address.Set_Location("2 June St Norwalk ct");
    User_Address.Set_Latitude(41.123113);
    User_Address.Set_Longitude(-73.431174);
    it("calculates the distance from the Bus Stops to User Coordinates", function () {
        Bus_Stops = Calculate_Distance_To_Stops_Haversine(User_Address, Bus_Stops);
        expect(Bus_Stops[0].Distance_to_Stop).toBe(0.39889301256398413);
        expect(Bus_Stops[1].Distance_to_Stop).toBe(0.37045782368034125);
        expect(Bus_Stops[2].Distance_to_Stop).toBe(0.611124841388092);
    });

});

describe("Test Convert Degrees to Radians", function(){
    it("converts Degrees to Radians", function () {
        expect(Degrees_to_Radians(90)).toBe(1.5707963267948966);
        expect(Degrees_to_Radians(35)).toBe(0.6108652381980153);
        expect(Degrees_to_Radians(44)).toBe(0.767944870877505);
        expect(Degrees_to_Radians(120)).toBe(2.0943951023931953);
        expect(Degrees_to_Radians(0)).toBe(0);
    });
});

describe("Test Calculate Walking Distance to Stops", function() {
    var Distance;
    var User_Address = "20 main st norwalk ct";
    var Bus_Stops = {Stop_Time: "9:00", Stop_Address:"RIVERSIDE AV & HILL ST norwalk ct", Distance_to_Stop: null, Latitude: 41.1215386, Longitude: -73.4238011};
    beforeEach(function() {Distance = new Walking_Distance_To_Stops()});
    it("calls Calculate Distance", function() {
        spyOn(Distance, "Calculate");
        Distance.Calculate(User_Address, Bus_Stops);
        expect(Distance.Calculate).toHaveBeenCalled();
    });
    it("keeps track of what parameters where used for the call", function() {
        spyOn(Distance, "Calculate");
        Distance.Calculate(User_Address, Bus_Stops);
        expect(Distance.Calculate).toHaveBeenCalledWith(User_Address, Bus_Stops);
    });
});

describe("Test Sorting Distance to Stop", function(){
    var Bus_Stops =[];
    Bus_Stops[0]= {Stop_Time: "9:00", Stop_Address:"RIVERSIDE AV & HILL ST norwalk ct", Distance_to_Stop: null, Latitude: 41.1215386, Longitude: -73.4238011};
    Bus_Stops[1]= {Stop_Time:null, Stop_Address:"PONUS AV & ELLS ST norwalk ct", Distance_to_Stop: null, Latitude: 41.1257694, Longitude: -73.4373563};
    Bus_Stops[2]= {Stop_Time:null, Stop_Address:"PONUS AV & CORNWALL RD norwalk ct", Distance_to_Stop: null, Latitude: 41.1258702, Longitude: -73.44233};
    Bus_Stops[3]= {Stop_Time:null, Stop_Address:"GLEN AV & SHORT ST norwalk ct", Distance_to_Stop: null, Latitude: 41.1305955, Longitude: -73.449364};
    Bus_Stops[4]= {Stop_Time:null, Stop_Address:"LEDGEWOOD DR & STYLES LA norwalk ct", Distance_to_Stop: null, Latitude: 41.1277236, Longitude: -73.4464775};
    Bus_Stops[5]= {Stop_Time:null, Stop_Address:"STYLES AV & PENNY LA norwalk ct", Distance_to_Stop: null, Latitude: 41.126766, Longitude: -73.4504417};
    Bus_Stops[6]= {Stop_Time:null, Stop_Address:"PONUS AV & LANCASTER DR norwalk ct", Distance_to_Stop: null, Latitude: 41.1249925, Longitude: -73.4469242};
    Bus_Stops[7]= {Stop_Time:null, Stop_Address:"MAHER DR & STEPPINGSTONE PL norwalk ct", Distance_to_Stop: null, Latitude: 41.120276, Longitude: -73.438289};
    var User_Address = new Address_Object();
    User_Address.Set_Location("2 June St Norwalk ct");
    User_Address.Set_Latitude(41.123113);
    User_Address.Set_Longitude(-73.431174);
    it("sorts the array by Distance to Stop starting by lowest distance", function () {
        Bus_Stops = Calculate_Distance_To_Stops_Haversine(User_Address, Bus_Stops);
        Bus_Stops = Sort_Distance_To_Stops(Bus_Stops);
        expect(Bus_Stops[0].Distance_to_Stop <= Bus_Stops[1].Distance_to_Stop).toBeTruthy();
        expect(Bus_Stops[1].Distance_to_Stop <= Bus_Stops[2].Distance_to_Stop).toBeTruthy();
        expect(Bus_Stops[2].Distance_to_Stop <= Bus_Stops[3].Distance_to_Stop).toBeTruthy();
        expect(Bus_Stops[3].Distance_to_Stop <= Bus_Stops[4].Distance_to_Stop).toBeTruthy();
        expect(Bus_Stops[4].Distance_to_Stop <= Bus_Stops[5].Distance_to_Stop).toBeTruthy();
        expect(Bus_Stops[5].Distance_to_Stop <= Bus_Stops[6].Distance_to_Stop).toBeTruthy();
        expect(Bus_Stops[6].Distance_to_Stop <= Bus_Stops[7].Distance_to_Stop).toBeTruthy();
        expect(Bus_Stops[1].Distance_to_Stop <= Bus_Stops[7].Distance_to_Stop).toBeTruthy();
        expect(Bus_Stops[0].Distance_to_Stop).toBe(0.37045782368034125);
        expect(Bus_Stops[0].Stop_Address).toBe('PONUS AV & ELLS ST norwalk ct');
        expect(Bus_Stops[7].Distance_to_Stop).toBe(1.0787297565138665);
        expect(Bus_Stops[7].Stop_Address).toBe('GLEN AV & SHORT ST norwalk ct');
    });
});

describe("Test calling Bus Stops Map function", function() {
    var New_Bus_Stops_Group;
    var User_Address = "20 main st norwalk ct";
    var Bus_Stops = {Stop_Time: "9:00", Stop_Address:"RIVERSIDE AV & HILL ST norwalk ct", Distance_to_Stop: null, Latitude: 41.1215386, Longitude: -73.4238011};
    beforeEach(function() {New_Bus_Stops_Group = new Bus_Stops_Group()});
    it("calls Calculate Distance", function() {
        spyOn(New_Bus_Stops_Group, "Map");
        New_Bus_Stops_Group.Map(User_Address, Bus_Stops);
        expect(New_Bus_Stops_Group.Map).toHaveBeenCalled();
    });
    it("keeps track of what parameters where used for the call", function() {
        spyOn(New_Bus_Stops_Group, "Map");
        New_Bus_Stops_Group.Map(User_Address, Bus_Stops);
        expect(New_Bus_Stops_Group.Map).toHaveBeenCalledWith(User_Address, Bus_Stops);
    });
});

describe("Test Adding Marker", function() {
    var New_Marker;
    var icon = "http://maps.google.com/mapfiles/kml/pal2/icon2.png";
    var map = document.getElementById('map-canvas');
    var Bus_Stops = {Stop_Time: "9:00", Stop_Address:"RIVERSIDE AV & HILL ST norwalk ct", Distance_to_Stop: null, Latitude: 41.1215386, Longitude: -73.4238011};
    beforeEach(function() {New_Marker = new Marker()});
    it("calls Marker.Add to add new marker", function() {
        spyOn(New_Marker, "Add");
        New_Marker.Add(Bus_Stops, icon, map);
        expect(New_Marker.Add).toHaveBeenCalled();
    });
    it("keeps track of what parameters where used for the call", function() {
        spyOn(New_Marker, "Add");
        New_Marker.Add(Bus_Stops, icon, map);
        expect(New_Marker.Add).toHaveBeenCalledWith(Bus_Stops, icon, map);
    });
});

describe("Test calling Map Shortest Bus Stop function", function() {
    var New_Shortest_Bus_Stop;
    var User_Address = "20 main st norwalk ct";
    var Bus_Stops = {Stop_Time: "9:00", Stop_Address:"RIVERSIDE AV & HILL ST norwalk ct", Distance_to_Stop: null, Latitude: 41.1215386, Longitude: -73.4238011};
    beforeEach(function() {New_Shortest_Bus_Stop = new Shortest_Bus_Stop()});
    it("calls Calculate Distance", function() {
        spyOn(New_Shortest_Bus_Stop, "Map");
        New_Shortest_Bus_Stop.Map(User_Address, Bus_Stops);
        expect(New_Shortest_Bus_Stop.Map).toHaveBeenCalled();
    });
    it("keeps track of what parameters where used for the call", function() {
        spyOn(New_Shortest_Bus_Stop, "Map");
        New_Shortest_Bus_Stop.Map(User_Address, Bus_Stops);
        expect(New_Shortest_Bus_Stop.Map).toHaveBeenCalledWith(User_Address, Bus_Stops);
    });
});



describe("------Boundary for Marlon's Good Unit tests above------------", function() {

    it("creates a new object when passed parameters", function () {

    });
});

//Create_Bus_Stops_Array(JSON_Array)
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



// ------------------------------------------Marlon coded items ABOVE--------------------------------//

// ------------------------------------------Ali coded items BELOW--------------------------------//


describe("Unit Test Database", function() {
    it("Action name test", function () {
        var action = "1";
        expect(action).toBe("1");
        action = "";
        expect(action).toBe("");
    });

});

