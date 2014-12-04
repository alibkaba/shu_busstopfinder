describe("Unit Test Database", function() {
    it("Action name test", function () {
        var action = "1";
        expect(action).toBe("1");
        action = "";
        expect(action).toBe("");
    });
    it("Response test", function () {
        var Response = "1";
        expect(Validate_Unit_Test_Response(Response)).toBeTruthy();
        var Response = "true";
        expect(Validate_Unit_Test_Response(Response)).toBeTruthy();
    });
});

it("should make an AJAX request to the correct URL", function() {
    spyOn($, "ajaxSetup");
    getProduct(123);
    expect($.ajax.mostRecentCall.args[0]["url"]).toEqual("db.php");
});