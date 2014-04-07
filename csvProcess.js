// "use strict";
var fs = require("fs");

var trip_data = fs.readFileSync("stop_times_start.csv", "utf8");
var stop_data = fs.readFileSync("stop_names_start.csv", "utf8");
var line_data = fs.readFileSync("lines_start.csv", "utf8");

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

function writeLinesCsv(mta_data) {
    var linesData = mta_data.line;
    var output = [["line_id","line_fullname","line_description","line_color"]];
    output = output.concat(linesData);
    var outputString = output.toCSV();
    fs.writeFile("lines.csv", outputString, {encoding:"ascii"}, function (err) {
        if (err) throw err;
        console.log("It's saved!");
    });
    debugger;
}
//monkeypatching :(


function prepCsvData(mta_data) {
    for (var data in mta_data) {
        var thisData = mta_data[data];
        var rows = thisData.split("\n");//remove header

        mta_data[data] = [];
        for(var i = 1; i < rows.length; i++) {
            var line = rows[i].split(",");
            if(data === "line") {
                var extraColumns = line;
                var cleaned = [];
                var description = "";
                cleaned.push(extraColumns[0],extraColumns[1]);
                for(var j = 2; j <extraColumns.length-1; j++) {
                    description += extraColumns[j].replace(/\"/g,"");
                    if(j !== extraColumns.length - 2) {
                        description += ",";
                    }
                }
                cleaned.push(description,extraColumns[extraColumns.length -1]);
                line = cleaned;
                // debugger; 
            }
            mta_data[data].push(line);
        }
    }
    return mta_data;
}

var mta_data = {
    trip: trip_data,
    stop: stop_data,
    line: line_data
};

mta_data = prepCsvData(mta_data);
writeLinesCsv(mta_data);
// debugger;


//this will prep an object for us containing all our source data. We'll have to do some more cleanup 