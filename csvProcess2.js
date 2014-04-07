// "use strict";
var fs = require("fs");

// var trip_data = fs.readFileSync("stop_times_start.csv", "utf8");
// var stop_data = fs.readFileSync("stop_names_start.csv", "utf8");
// var line_data = fs.readFileSync("lines_start.csv", "utf8");

var routes_in = fs.readFileSync("trip_arrives.csv","utf8");

Array.prototype.toCSV = function(){
        var i, j, outputString;
        outputString = "";
        for (i = 0; i < this.length; i++) {
                for ( j = 0; j < this[i].length; j++) {
                        outputString += "\"" + this[i][j] + "\"";
                        if(j !== this[i].length - 1) {
                                outputString += ",";
                        }
                }
                outputString += "\n";
        }
        return outputString;
};

// function writeLinesCsv(mta_data) {
    //     var linesData = mta_data.line;
    //     var output = [["line_id","line_fullname","line_description","line_color"]];
    //     output = output.concat(linesData);
    //     var outputString = output.toCSV();
    //     fs.writeFile("lines.csv", outputString, {encoding:"ascii"}, function (err) {
    //         if (err) throw err;
    //         console.log("It's saved!");
    //     });
    //     debugger;
    // }
    //monkeypatching :(


// function prepCsvData(mta_data) {
    //     for (var data in mta_data) {
    //         var thisData = mta_data[data];
    //         var rows = thisData.split("\n");//remove header

    //         mta_data[data] = [];
    //         for(var i = 1; i < rows.length; i++) {
    //             var line = rows[i].split(",");
    //             if(data === "line") {
    //                 var extraColumns = line;
    //                 var cleaned = [];
    //                 var description = "";
    //                 cleaned.push(extraColumns[0],extraColumns[1]);
    //                 for(var j = 2; j <extraColumns.length-1; j++) {
    //                     description += extraColumns[j].replace(/\"/g,"");
    //                     if(j !== extraColumns.length - 2) {
    //                         description += ",";
    //                     }
    //                 }
    //                 cleaned.push(description,extraColumns[extraColumns.length -1]);
    //                 line = cleaned;
    //                 // debugger; 
    //             }
    //             mta_data[data].push(line);
    //         }
    //     }
    //     return mta_data;
    // }

    // var mta_data = {
    //     trip: trip_data,
    //     stop: stop_data,
    //     line: line_data
    // };

    // mta_data = prepCsvData(mta_data);
// writeLinesCsv(mta_data);
var output = [];
// var entries = {};
routes_in = routes_in.split("\n");
for (var i = 1; i< routes_in.length; i++) {
    var toAdd = routes_in[i].split(",");

    if(toAdd[3].indexOf("H") === -1) {
        output.push(toAdd);
    }
    // debugger;
    // var index = "" + toAdd[0] + toAdd[1];
    // if(!entries[index]) {
    //     entries[index] = true;
    //     output.push(toAdd);
    // }//don't skip it if it's there already.
}

debugger;
var fileString = output.toCSV();
fs.writeFile("orders_min.csv",fileString, {encoding:"ascii"}, function (err) {
    if (err)    throw err;
    console.log("saved!");
});


// debugger;

// debugger;


//this will prep an object for us containing all our source data. We'll have to do some more cleanup 