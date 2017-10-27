"use strict";

var webdriver = require('selenium-webdriver');
var assert = require('assert')

var browser = new webdriver.Builder().usingServer()
  .withCapabilities({'browserName': 'chrome' }).build();

function HomePage() {
	this.home_url = 'https://www.yahoo.com';
	var links_banner_locator = webdriver.By.id('mega-bottombar');
	var banner_links_locators = {
		mail:    webdriver.By.css('a[href*="mail"]'),
		finance: webdriver.By.css('a[href*="finance"]')
	};

	/*  Click a link 
    	parameter: 'link' the web_element to click  */
	this.click_link = function (link) { link.click(); }

	/* Find a link in the banner
	   returns a web element as specified by the parameter
	     or returns false if element cannot be found.
	   parameter: 'link' (string) a key into banner_links_locators  */
	this.find_banner_link = function (link) { 
	  	return browser
	  		.findElement(links_banner_locator)
	  	 	.findElements(banner_links_locators[link])
	  	 	.then(function(elements) {
	  		 	if (elements.length == undefined || elements.length < 1) { 
	  	 			return false;
		  	 	} else {
	  		 		return elements[0];
	  	 		}
	  		});
	};

}

function FinancePage() {
	var search_input = webdriver.By.css("input[placeholder*='symbols']");
	this.search_input = webdriver.By.css("input[placeholder*='symbols']");

	var banner_links_locators = {
		home:       webdriver.By.css("a[href='/']"),
		technology: webdriver.By.css('a[href$="/tech"]'),
		markets:    webdriver.By.css('a[href$="/calendar"]')
	};
	var banner_links_text = {
		home:       'Finance Home',
		technology: 'Technology',
		markets:    'Markets'
	};

	this.finance_page_is_present = function() {
		var x = browser.findElement(search_input).isDisplayed()
//		var x = browser.findElement(search_input).isDisplayed()
		  .then(function(element) {return element;});
		console.log("assert finance page is present.  result is "+x);	
		return x
	};

	/* assert expectation on all links in banner_links_locators */ 
	this.assert_banner_links_present = function() {
		var link;
		for (link in banner_links_text) {
			this.assert_banner_link_present(link);
		};
	};

	/* assert a link in the banner has expected text
	   parameter 'link' (string) index into banner_links_locators and 
	   banner_links_text  */   
	this.assert_banner_link_present = function(link) {
		browser.findElement(banner_links_locators[link])
			.getText()
		  	.then(function(text) {
		  		assert.equal(text, banner_links_text[link]);
		  	});
	};

}


var home_page = new HomePage();
var finance_page = new FinancePage();

browser.get(home_page.home_url);
browser.wait(function() {return home_page.find_banner_link('finance');}, 5000)
    .then(home_page.click_link);

setTimeout(function() {finance_page.assert_banner_links_present();}, 20000);
   

//browser.wait(finance_page.finance_page_is_present, 10000)    
//    .then(finance_page.assert_banner_links_present);

/*
// check the job summary is not the QA job
browser.findElement(JOB_HEADER_LOCATOR).getText().then(function(txt) {
    assert.ok(!QA_SUMMARY_REGEX.test(txt));
});

// check the QA job button is not active
browser.findElement(QA_JOB_LOCATOR).getAttribute("class").then(function(cls) {
    assert.ok(!ACTIVE_TAB_CLASS.test(cls));
});

// click the QA job button
browser.findElement(QA_JOB_LOCATOR).findElement(LINK_LOCATOR).click();

// check the job summary is the QA job
browser.findElement(JOB_HEADER_LOCATOR).getText().then(function(txt) {
    assert.ok(QA_SUMMARY_REGEX.test(txt));
});

// check QA job button is active
browser.findElement(QA_JOB_LOCATOR).getAttribute("class").then(function(cls) {
    assert.ok(ACTIVE_TAB_CLASS.test(cls));
});
*/

//browser.quit();
