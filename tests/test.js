describe('authentication', function() {

	before(browser => browser.url('http://localhost:3000'));
  
	test('test auth flow', function (browser) {
	  browser
		.waitForElementVisible('body')
		.assert.visible('#login')
		.click('#login')
		.waitForElementVisible('form')
		.assert.titleContains('Log In')
		.assert.visible('input[type=text]')
		.setValue('input[type=text]', 'ptmetsch@gmail.com')
		.assert.visible('input[type=password]')
		.setValue('input[type=password]', 'smokeyD27')
		.assert.visible('button[type=submit]')
		.click('button[type=submit]')
		.waitForElementVisible('.hero', 3000)
		.assert.titleContains('Patrick Metsch')
		.browser.assert.urlContains("/projects/page/")
	});
  
	after(browser => browser.end());
  });

describe('unauthorized page access', function() {

	before(browser => browser.url('http://localhost:3000/projects/page/1'));
  
	test('test auth flow', function (browser) {
	  browser
		.waitForElementVisible('#login')
		.assert.containsText('#header', 'Oops... This Page Requires Authentication!')
		.assert.urlContains("/unauthorized")
	});
  
	after(browser => browser.end());
  });