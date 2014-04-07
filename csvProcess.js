"use strict";
var fs = require("fs");

var trip_data = fs.readFileSync("stop_times_start.csv", "utf8");
var stop_data = fs.readFileSync("stop_names_start.csv", "utf8");
var line_data = fs.readFileSync("lines_start.csv", "utf8");

var mta_data = {
	trip: trip_data,
	stop: stop_data,
	line: line_data
};
// debugger;
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
				description += extraColumns[j];
				if(i !== extraColumns.length - 2) {
					description += ",";
				}
			}
			cleaned.push(description,extraColumns[extraColumns.length -1]);
			// debugger; 
		}
		mta_data[data].push(line);
	}
}
//this will prep an object for us containing all our source data. We'll have to do some more cleanup 

debugger;

console.log("done!");