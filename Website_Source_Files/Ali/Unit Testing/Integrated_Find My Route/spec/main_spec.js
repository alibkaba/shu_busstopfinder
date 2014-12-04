describe("Unit Test Database", function() {
    it("Action name test", function () {
        var action = "1";
        expect(action).toBe("1");
        action = "";
        expect(action).toBe("");
    });
    it("Response test", function () {
        var Response = "1";
        expect(Validate_Unit_Test_Response(Response)).toBeFalsy();
        var Response = "true";
        expect(Validate_Unit_Test_Response(Response)).toBeFalsy();
    });
});
