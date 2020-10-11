# Maintenance

## People Who Should Read This

You should read this if you have at least one of the following interests:

* You are tasked to take care of this project
* You need to add or update
  * a project description
  * the intern/faculty/graduate student roster
  * a photo
  * pretty much any text or image

## Types of Maintenance Tasks

Types of maintenance tasks range between

* People
* Projects
* Sponsors
* Anything else

These tasks might also be predictable or unpredictable

* Predictable
  * New interns are added at the beginning of each semester
* Unpredictable
  * New project is added
  * Faculty/staff member leaves

### People Tasks

Most of the people updates revolve around the `src/data/people/people.json` file. Changes in this file are equipped to handle the following:

* Adding interns†
* Adding/Removing/Updating faculty, staff, or graduate students
* Changing profile photos

†: Moving interns from `current` to `previous` or from `previous` to `not mentioned` are handled implicitly via GraphQL query.

### Project Tasks

Changes to any projects can be found in `src/projects`. Each project has its own folder with at least two files:

* Markdown file with the project's in-depth description
* `.png` image file

Each project description file also contains what is called `frontmatter`, which is metadata about the project. This metadata includes:

* *path*: a unique link to the project description
* *title*
* *hero*: a prominent image displayed in the `Projects` section
* *tags*: any topics describing the project, such as the technology used
* *featured*: a boolean value which displays the indicated project on the front page
* *oneLiner*: a brief description of the project displayed on the `Projects` page

### Sponsors

TODO

### Any Other Changes

Any other changes will probably require changes in development code, which is fine. Please contact any of the Staff members and they should be able to point you in the right direction
