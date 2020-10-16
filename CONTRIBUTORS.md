# Contributing

So you want to make a development update, eh?

## Adding a New Route

Based on Gatsby, there are two types of routes in this site:

* Individual page
* Markdown page

### Adding an Individual Page

#### What is an Individual Page?

An individual page is like the pages you can find on `src/pages`. These are generally root-level routes, such as https://mindlab.cs.umd.edu/**about** or https://mindlab.cs.umd.edu/**people**. By looking in the `src/pages` folder, you should see a `.js` for each page. Each `.js` file has a default export which is a React component that returns HTML which describes the whole page.

#### How to

In order to add an individual page, you will need to make two additions:

* Add a `.js` file to `src/pages`
* Update `gatsby.config.js` in the root folder and add a menu link

### Adding a new Markdown Page

Adding a markdown page is a more simple task than adding an individual page. Assuming that this is a new project description, all you have to do is add a new folder to `src/projects`. In that folder, you need to add a `.md` file with an optional `.png` image to display in the Projects List page.
