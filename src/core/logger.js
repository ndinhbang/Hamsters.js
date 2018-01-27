/*
* Title: Hamsters.js
* Description: Javascript library to add multi-threading support to javascript by exploiting concurrent web workers
* Author: Austin K. Smith
* Contact: austin@asmithdev.com
* Copyright: 2015 Austin K. Smith - austin@asmithdev.com
* License: Artistic License 2.0
*/

/* jshint esversion: 6 */

import hamstersVersion from './core/version';

'use strict';

class logger {
  constructor() {
    this.logBook = {
      error: [], 
      warning: [], 
      info: []
    };
    this.info = this.infoLog;
    this.warning = this.warningLog;
    this.error = this.errorLog;
    this.saveLogEntry = this.saveToLogBook;
    this.getLogEntries = this.fetchLogBook;
    this.searchLogEntries = this.searchLogBook;
  }

  infoLog(message) {
    let timeStamp = Date.now();
    let timeStampedMessage = `Hamsters.js v${hamstersVersion} Info: ${message} @ ${timeStamp}`;
    this.saveLogEntry('info', timeStampedMessage);
    console.info(timeStampedMessage);
  }

  warningLog(message) {
    let timeStamp = Date.now();
    let timeStampedMessage = `Hamsters.js v${hamstersVersion} Warning: ${message} @ ${timeStamp}`;
    this.saveLogEntry('warning', timeStampedMessage);
    console.warning(timeStampedMessage);
  }

  errorLog(message, reject) {
    let timeStamp = Date.now();
    let timeStampedMessage = `Hamsters.js v${hamstersVersion} Error: ${message} @ ${timeStamp}`;
    this.saveLogEntry('error', timeStampedMessage);
    console.error(timeStampedMessage);
    reject(timeStampedMessage);
  }

  saveToLogBook(eventType, message) {
    this.logBook[eventType].push(message);
  }

  fetchLogBook(eventType) {
    if(eventType) {
      return this.logBook[eventType];
    }
    return this.logBook;
  }

  findStringInLogBook(logBookEntries, string) {
    let searchResults = [];
    let i = 0;
    for (i; i < logBookEntries.length; i++) {
      if(logBookEntries[i].indexOf(string) !== -1) {
        searchResults.push(logBookEntries[i]);
      }
    }
    return searchResults;
  }

  findStringInLogBookAllTypes(logBook, searchString) {
    let searchResults = [];
    let key, eventTypeResults, tmpEntries = null;
    for(key in logBook) {
      if(logBook.hasOwnProperty(key)) {
        tmpEntries = logBook[key];
        eventTypeResults = this.findStringInLogBook(tmpEntries, searchString);
      }
    }
    return searchResults;
  }

  searchLogBook(searchString, eventType) {
    let finalResults = [];
    let eventTypeResults;
    if(eventType) {
      tmpEntries = this.logBook[eventType];
      finalResults = this.findStringInLogBook(tmpEntries, string);
    } else {
      let allResults = this.findStringInLogBookAllTypes(this.logBook);
      if(all.length !== 0) {
        finalResults = [finalResults, eventTypeResults].reduce(function(a, b) {
          return a.concat(b);
        });
      }
    }
    return {
      total: finalResults.length,
      results: finalResults
    };
  }   
}

var hamsterLogger = new logger();

if(typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = hamsterLogger;
}
