describe('pagination', function() {

	before(browser => browser.url('http://localhost:3000/projects/page/1'));
  
	test('test pagination flow', function (browser) {
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
		.waitForElementVisible('.hero')
		.assert.visible('#next-page')
		.expect.element('#prev-page').to.not.be.present;

	browser
		.click('#next-page')
		.waitForElementVisible('body')
		.assert.visible('#next-page')
		.assert.visible('#prev-page')
		.assert.urlContains("/projects/page/2")
	});
  
	after(browser => browser.end());
  });