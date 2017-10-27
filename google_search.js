/*
* Google Search
*/
 
"use strict";
  
function handleFailure(err) {
    console.error('Something went wrong\n', err.stack, '\n');
    closeBrowser();
}
 
function typeSearchTerm(search_term) {
    browser.findElement(by.name('q')).sendKeys(search_term);
}
function clickAutoSuggestSearch() {
    var loc = by.css('.lsbb input[value="Google Search"]');
    browser.
        wait(until.elementLocated(loc, 500)).
        then(() => { browser.findElement(loc).click() });
}

function verifySearchResults(search_term) {
    var loc = by.css('.srg .rc');
    var regex = new RegExp(search_term, "i")
    return browser.
        wait(until.elementLocated(loc, 2000)).
        then(() => { return browser.findElements(loc) }).
        then(results => {
            console.log("results found: " + results.length);
            return results; }).
        then(results => { 
            results.forEach((result, index) => { 
                result.getText().then(text => {
                if (text.match(regex) != null ) {
                    console.log(search_term+" found in result "+index)
                } else {
                    console.log(search_term+" NOT found in result "+index)
                }
            })})});
}
 
function openUrl(url) {
    browser.get(url);
}

function closeBrowser() {
    browser.quit();
}

function sleep( milliseconds) {
    setTimeout(function() {}, milliseconds);
}

 
var webdriver = require('selenium-webdriver'),
    by = webdriver.By,
    until = webdriver.until;
var browser = new webdriver.Builder().
                    usingServer().
                    withCapabilities({'browserName': 'chrome'}).
                    build();
 
openUrl('https://www.google.com');
var search_term = 'buster keaton'

typeSearchTerm(search_term);
clickAutoSuggestSearch();
verifySearchResults(search_term);
closeBrowser();
