describe("Test Write_Coordinates", function(){
    it("Variables", function (){
        var action = "Write_Coordinates";
        var Address = "Address";
        var Latitude = "Latitude";
        var Longitude = "Longitude";
        var Write_Coordinates_Data = {Address: Address, Latitude: Latitude, Longitude: Longitude, action: action};

        expect(action).toContain("Write_Coordinates");
        expect(Address).toContain("Address");
        expect(Latitude).toContain("Latitude");
        expect(Longitude).toContain("Longitude");
        //expect(Write_Coordinates_Data).toHaveBeenCalled();
    });
});


describe("Test Delete_Coordinates", function(){
    it("Variable", function (){
        var action = "Delete_Coordinates";
        var Coordinates_ID = "1";
        var Delete_Coordinate_Data = {Coordinates_ID: Coordinates_ID, action: action};

        expect(action).toContain("Delete_Coordinates");
        expect(Coordinates_ID).toContain("1");
    });
});