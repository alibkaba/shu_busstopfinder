var backgroundUploader = new Windows.Networking.BackgroundTransfer.BackgroundUploader();

function uploadFile() {
    var filePicker = new Windows.Storage.Pickers.FileOpenPicker();
    filePicker.fileTypeFilter.replaceAll(["*"]);

    filePicker.pickSingleFileAsync().then(function (file) {
        if (!file) {
            printLog("No file selected");
            return;
        }

        var upload = new UploadOp();
        var uriString = document.getElementById("serverAddressField").value;
        upload.start(uriString, file);

        uploadOperations.push(upload);
    });
}

function UploadOp() {
    var upload = null;
    var promise = null;

    this.start = function (uriString, file) {
        try {
        
            var uri = new Windows.Foundation.Uri(uriString);
            var uploader = new Windows.Networking.BackgroundTransfer.BackgroundUploader();

            uploader.setRequestHeader("Student Addresses", file.name);

            upload = uploader.createUpload(uri, file);

            promise = upload.startAsync().then(complete, error, progress);
        } catch (err) {
            displayError(err);
        }
    };

    this.load = function (loadedUpload) {
        try {
            upload = loadedUpload;
            promise = upload.attachAsync().then(complete, error, progress);
        } catch (err) {
            displayError(err);
        }
    };
}

$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: "Student Addresses.csv",
        dataType: "text",
        success: function(data) {processData(data);}
     });
});

function processData(allText) {
    var record_num = 6;
    var allTextLines = allText.split(/\r\n|\n/);
    var entries = allTextLines[0].split(',');
    var lines = [];

    var headings = entries.splice(0,record_num);
    while (entries.length>0) {
        var tarr = [];
        for (var j=0; j<record_num; j++) {
            tarr.push(headings[j]+":"+entries.shift());
        }
        lines.push(tarr);
    }
}
