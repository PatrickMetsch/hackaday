describe('unauthorized page access', function() {

	before(browser => browser.url('http://localhost:3000/projects/page/1'));
  
	test('destination url not reached', function (browser) {
	  browser
		.waitForElementVisible('#login')
		.assert.containsText('#header', 'This Page Requires Authentication!')
		.assert.urlContains("/unauthorized")
	});
  
	after(browser => browser.end());
  });