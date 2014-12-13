describe("Unit Test Database", function() {
    it("Action name test", function () {
        var action = "1";
        expect(action).toBe("1");
        action = "";
        expect(action).toBe("");
    });

});

it("should make an AJAX request to the correct URL", function() {
    spyOn($, "ajaxSetup");
    Outgoing_Ajax(Ajax_Data);
    expect($.ajax.mostRecentCall.args[0]["url"]).toEqual("db.php");
});