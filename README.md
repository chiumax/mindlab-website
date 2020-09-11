# Mindlab Website

UMD CS MindLab website development repo

## Setup for Contributors

Install NPM via <https://www.npmjs.com/get-npm>

Install Gatsby CLI globally

```bash
npm install -g gatsby-cli
```

Clone the project

```bash
git clone https://github.com/fwajid/mindlab_website.git
```

Go into the project folder

```bash
cd mindlab_website
```

Install project dependencies

```bash
npm install
```

Run the Dev server

```bash
npm run start
```

## Routing in Gatsby

Reference: <https://www.gatsbyjs.com/docs/creating-dynamic-navigation>

Gatsby uses GraphQL to dynamically create navigation links.

## Project Structure

General Project Structure Reference: <https://www.gatsbyjs.com/docs/gatsby-project-structure/#:~:text=The%20file%2Ffolder%20structure%20described,and%20%2Futils%20inside%20%2Fsrc%20.>

- `/public` *Automatically generated*. The files that are to be hosted after building
- `/src` All code.
- `/static` All files here will not be processed by webpack and will be copied over to the `/public` folder. [When to use the static folder](https://www.gatsbyjs.com/docs/static-folder/#adding-assets-outside-of-the-module-system)