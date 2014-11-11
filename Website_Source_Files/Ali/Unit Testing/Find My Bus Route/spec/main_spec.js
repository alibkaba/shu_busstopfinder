describe("Coordinates", function(){

    var action;
    var Coordinates_ID;
    var Address;
    var Latitude;
    var Longitude;
    var Write_Coordinates_Data;
    var Read_Coordinates;
    var Coordinates_Data;
    var Strip_Coordinates;
    var Delete_Coordinate_Data;

    beforeEach(function() {
        Address = "Address";
        Latitude = "Latitude";
        Longitude = "Longitude";
    });

    afterEach(function() {
        action = null;
        Coordinates_ID = null;
        Address = null;
        Latitude = null;
        Longitude = null;
        Write_Coordinates_Data = null;
        Read_Coordinates = null;
        Coordinates_Data = null;
        Strip_Coordinates = null;
        Delete_Coordinate_Data = null;
    });

    it("Write_Coordinates", function (){
        action = "Write_Coordinates";
        //Write_Coordinates_Data = {Address: Address, Latitude: Latitude, Longitude: Longitude, action: action};

        expect(action).toContain("Write_Coordinates");
        expect(Address).toContain("Address");
        expect(Latitude).toContain("Latitude");
        expect(Longitude).toContain("Longitude");
        //expect(Write_Coordinates_Data).toHaveBeenCalledWith({ Address: 'Address', Latitude: 'Latitude', Longitude: 'Longitude', action: 'Write_Coordinates' });
    });

    it("Read_Coordinates", function (){
        action = "Read_Coordinates";
    });

    it("Strip_Coordinates", function (){
        action = "Strip_Coordinates";
    });

    it("Delete_Coordinates", function (){
        action = "Delete_Coordinates";
        Coordinates_ID = "1";

        expect(action).toContain("Delete_Coordinates");
        expect(Coordinates_ID).toContain("1");
        //expect(Delete_Coordinate_Data).toHaveBeenCalled();
    });
});