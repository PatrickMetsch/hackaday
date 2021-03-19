# Patrick Metsch - Coding Challenge

## Developer Mode

run `npm run start`

This will run `nodemon` and `sass --watch` concurrently



## Testing

run `npm run test`

This will run `nightwatch` against all files located in `root/tests`



## New For Me

`EJS`, and `Nightwatch` were both new technologies for me! 

I enjoyed EJS as it had some similarities to the Symfony framework I was recently introduced to in my current job.

Nightwatch seems like an incredibly powerful tool! Until now, I'd only ever used `Jest` to test my code. Being able
to automate a browser experience for testing purposes is a skill I'm very happy to have learned!


## Blockers

I was unable to figure out how to complete two of the bullet points outlined in the `Challenge Objectives`

### 1) Tooltip data should be loaded dynamically, client-side.
	- I was unable to discover a way to get an asynchronus method that relied on node modules fired in my Express server from an event in my EJS templates
		- I have commented out my best attempt, so you can get some insight into my thought process:
			- in `src/routing/projects/projectsListRouteHandler.js` - I attempted to pass in all dependencies to the view 
			- in `views/partials/viewModifiers.ejs` - I attempted to use those passed dependencies to fire an asynchronus callback

### 2) When going to next/previous project pages, the page should not reload.
	- I was unable to get a 100% working model of this.
	- For each project page load, I loaded the previous and next pages (if appicable) and passed them to the view
		- However, without refreshing the page, I was uncertain as to how to, after paginating using the "non-loading" pagination:
			- Update the URL to reflect that a non-loading page "navigation" had occurred
			- Subsequently load the "next" and "previous" pages without hitting the server
				- another issue resulting from my difficulty firing async callbacks to the server from the view
	- I included what I have working, in regards to this deliverable, as a secondary "Experimental" pagination at the bottom of the `projects list` pages.



## In Closing

Thank you everyone for the opportunity to demonstrate my skills. I hope to be considered for a position at Supply Frame! It was a pleasure meeting all 
of you, and I really appreciate your time. Have a great weekend. I look forward to hearing from you!

- Patrick Metsch