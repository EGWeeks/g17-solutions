// The 'use strict' statement is one line of code and can prevent bugs from
// happening before they occur by switching how the language handles errors.
'use strict';

// TIP: always include your imports at the top of the file, so they may be used
// throught the file.
// Node has built in modules, which are programs that we can use.
// Load the fs module an assign to the variable fileSystem
var fileSystem = require("fs");

// Parse the log file, afterward invoke the callback function
parseLogFile(function(logSummaryMap){
  printAnswerOne(logSummaryMap);
  printAnswerTwo(logSummaryMap);
  printAnswerThree(logSummaryMap);
});

function parseLogFile(callbackFunction) {

  // Path to log file
  var fileToRead = 'log.log';

  // Map to store the log
  var logSummaryMap = {};

  // The first param to pass in is the path to the file we want to load.
  // The second param is a callback function that will be invoked once fs
  // has finished attempting to read the file.
  fileSystem.readFile(fileToRead, function(error, fileData) {

    // If err object exists it will be truthy
    if (error) {
      // Throw is a keyword like return, function & var.
      // It terminates the program and prints out the error message.
      throw error;
    }

    // Convert the file fileData from hexadecimal to human readable.
    var humanReadable = fileData.toString();
    // Split the human readable file data into an array of strings.
    // In a file every line ends with a with a line break character.
    // The `\n` character refers to the line break character.
    var linesArray = humanReadable.split('\n');
    // Loop through every single line in the linesArray.
    linesArray.forEach(function(currLine) {
      // Parse the line date and store it to logSummaryMap.
      parseLine(currLine, logSummaryMap);
    });

    // Invoke the callback function and pass in the logSummaryMap
    callbackFunction(logSummaryMap);
  });
}

function parseLine(line, logSummaryMap) {

  // We don't care about empty lines.
  // Check to see if the line is not empty.
  if (line !== '') {

    // Get date the from line.
    var logDate = line.substr(4, 10);
    // Get the type of log from line.
    var logType = line.charAt(0);

    // Add entry to logSummaryMap or if entry already exists update it.
    setLogSummaryMapEntry(logSummaryMap, logDate, logType);
  }
}

function setLogSummaryMapEntry(logSummaryMap, logDate, logType){
  // If the entry, logSummaryMap[logDate] does not exist we want to create it.
  if (!logSummaryMap[logDate]) {
      createlogSummaryMapEntry(logSummaryMap, logDate);
  }
  // Now we want update the entry, logSummaryMap[logDate]
  updatelogSummaryMapEntry(logSummaryMap[logDate], logType);
}

function createlogSummaryMapEntry(logSummaryMap, logDate){
  logSummaryMap[logDate] = {
    // Remember, objects can store functions as values.
    // getCount: adds up all the counts together and returns the result.
    getCount: function() {
      // The variable `this` refers to to the object we are in, logSummaryMap[logDate].
      // So this.debugCount refers to logSummaryMap[logDate].debugCount.
      return this.debugCount + this.infoCount + this.warnCount + this.unknownCount;
    },
    debugCount: 0,
    infoCount: 0,
    warnCount: 0,
    unknownCount: 0
  };
}

function updatelogSummaryMapEntry(mapEntry, logType) {
  // Detect which type of log it is and increment the objects count of that type.
  switch(logType){
    case 'I': mapEntry.infoCount++; break;
    case 'D': mapEntry.debugCount++; break;
    case 'W': mapEntry.warnCount++; break;
    default: mapEntry.unknownCount++; break;
  }
}

function printAnswerOne(logSummaryMap) {
  console.log('* What are all the dates the log covers?');
  for (var key in logSummaryMap) {
    // Remember to use Object.prototype.hasOwnProperty() to ensure that we are
    // only looping through direct properties, and not inherited ones.
    if (logSummaryMap.hasOwnProperty(key)) {
      console.log(key);
    }
  }
}

function printAnswerTwo(logSummaryMap) {
  console.log('* For each date, how many log messages were added?');
  for (var key in logSummaryMap) {
    // Remember to use Object.prototype.hasOwnProperty() to ensure that we are
    // only looping through direct properties, and not inherited ones.
    if (logSummaryMap.hasOwnProperty(key)) {
      console.log(key + ' ' + logSummaryMap[key].getCount());
    }
  }
}

function printAnswerThree(logSummaryMap) {
  console.log('* For each date, how many log messages were added?');
  for (var key in logSummaryMap) {
    // Remember to use Object.prototype.hasOwnProperty() to ensure that we are
    // only looping through direct properties, and not inherited ones.
    if (logSummaryMap.hasOwnProperty(key)) {
      console.log(key + ' DEBUG ' + logSummaryMap[key].debugCount);
      console.log(key + ' INFO ' + logSummaryMap[key].infoCount);
      console.log(key + ' WARN ' + logSummaryMap[key].warnCount);
    }
  }
} // Remember to not leave an empty line belong here because it's just foolish