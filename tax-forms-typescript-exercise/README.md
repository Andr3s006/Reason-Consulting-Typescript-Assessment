# What Is This?

This is a mock application that serves as a technical screener for Reason
Consulting's developer interview process. In this README you will find a
seqence of tasks that you are expected to complete that are very similar to
what would be expected in a production application.

There is no backing API, and all data is mock data. Refreshing the application
will reinitialize the application to its starting state, and that's OK. Where
an API would be expected we have mocked out API calls with Promise-based
functions that can stand in. You are not expected to modify the mock API in
`lib/api.ts`.

This project was bootstrapped with [Create React
App](https://github.com/facebook/create-react-app).

## About The Application

The Application allows a Taxpayer to access a public list of property Listings
for which owners must file Business Personal Property Tax. This public
property list is maintained by the County's Tax Collector. The User may peruse
the public list in order to find Listings they own, and may use the
application to request an Extension on their tax filing. When the User opens a
listing via the "Request Extension" button, they are considered to have
claimed the Property, and it is removed from the public list, and added to the
User's list of "Claimed" properties.

_Please note that in a production application we would require a confirmation
from the taxpayer when claiming a property, but this has been ommitted for
brevity._

Once the User clicks "Submit Request" on the Extension form, the API is called
to record the Submission on the server and with the County.

Unfortunately, time tables are tight, and the last dev got pulled off this
project before he could finish implementing all of the necessary features...


## Contributing to this Git Repository

At Reason Consulting, we spend much of our time writing software for State or
Local governments and are thus subject to certain security controls. One of
those is that we can track all commits on our repositories back to the work
items (i.e. "Tickets") for which the commit was made. We do this by prefixing
the commit message with the Ticket number in square brackets. When you commit
to this repository, please write you commit message in the following format:

```
[TID-XX] My normal commit message goes here.
```

Where, `XX` is replaced by the appropriate numeric ID. All of the features you
will be asked to add having a Ticket ID associated with them.

## A Word on Typescript

> [!IMPORTANT]
> This section is only relevant if you are applying for a junior position at
> Reason Consulting. Mid level developers and above are expected to work
> within the Typescript language.

The application is written in Typescript, as that is Reason Consulting's
frontend language of choice. However, we understand that many very capable
junior applicants are not familiar with that language. We at Reason are not
interested in applicants getting stuck on the nitty-gritty of Typescript if
they are capable of creating the solution in Javascript. In order to avoid
this, the TS config for this application is set to allow Javascript files in
addition to Typescript.

If you are applying for a junior position, you may write Javascript and/or
convert existing Typescript code to Javascript as you feel necessary.

In addition to allowing JS files, you may turn down Typescript's strictness.
If you wish to do so, you may uncomment the "PERMISSIVE" mode settings in
`./tsconfig.json`. Be sure to remove the prior "STRICT" mode settings if you
do so.

That being said, you **are** encouraged to attempt the challenges in
Typescript.

## Architecture

The application's Architecture relies on React and popular React libraries to
keep the development experience as familiar as possible. The critical
libraries to the architecture are:

| Library | Description |
|---------|-------------|
| `react` | You know this one |
| `react-router-dom` | React Router controls rendering specific components based on the current URL, the Browser's history, and navigating between pages. |
| `@reduxjs/toolkit` | The official, batteries-included library for setting up ReduxJS as a frontend data store |
| `react-redux` | The official React bindings for Redux |
| `formik` | Formik is a simple ReactJS form library. It saves us from writing a lot of boilerplate as opposed to using `form` and `input` HTML Elements |
| `@mui/material` | The Material UI library provides clean, basic styling via a rich component library |

You are free to add additional libraries if you feel the application would
benefit from it.

There are no intentional tricks or traps in the application. Everything
written is meant to function as intended in so far as it is implemented.

Authentication and Authorization is neglected in this app. You are assumed to
be signed into the application through a secure system, and your current
credentials are in the `users` Slice of the Redux store.

HINT: If you are new to ReduxJS, we strongly recommend that you check out the
offical browser extensions. This is by no means required, but tends to be
useful.

[ReduxJS Dev Tools (Chrome)](https://github.com/reduxjs/redux-devtools)

## Tasks

| Task ID | Expections | Description |
|---------|------------|-------------|
| TID-1   | Junior and Mid (REQUIRED) |[Add Reason as Required Text Field ](#tid-1-add-reason-as-required-text-field) |
| TID-2   | Junior and Mid (REQUIRED) |[Display Submitted At Time in Submissions Table](#tid-2-display-submitted-at-time-in-submissions-table) |
| TID-3   | Junior and Mid (REQUIRED) |[Submit Extenion Request](#tid-3-submit-extension-request)|
| TID-4   | Mid (REQUIRED) |[New Statements Page](#tid-4-new-statements-page) |
| TID-5   | Mid (REQUIRED) |[Create a New Statement](#tid-5-create-a-new-statement) |
| TID-6   | Optional  |[Update My Statements](#tid-6-update-my-statements) |

> [!IMPORTANT]
> JUNIORS!
> You are expected to complete tasks 1-3 in the table above. We also encourage
> you to complete as many of the later tasks as possible.

> [!IMPORTANT]
> MID-LEVEL AND UP
> You are expected to complete tasks 1-5 in the table above.

In all cases, TID-6 is considered optional.

### TID-1: Add Reason as Required Text Field 

#### Story

_As a County Administrator, I want Taxpayers to be required to state a reason
for filing an extension, so that we can better audit Extension filings._

#### Acceptance Criteria

1. The Request Extension form has a large text field so that the user can
   state the reason for requesting an Extension.
2. The Field Must not be blank, and an error is shown if the user tries to
   submit an empty reason.
3. A meaningful error message is displayed if the field is blank and the user
   tries to submit.

### TID-2: Display Submitted At Time in Submissions Table

#### Story

_As a Taxpayer, I want to see the time my Extension was submitted at, so that I
can be confident it was sent before any legal deadlines._

#### Acceptance Criteria

1. The Submissions table has a new Column called "Submitted At".
2. The "Submitted At" column is the first column in the table.
3. The column displays the Date and Time when the request for an Extension was submitted.
4. The Date and Time should display in local time and be formatted like: `8/19/2023 7:15:30 PM`.

### TID-3: Submit Extension Request

#### Story

_As a Taxpayer, I want to submit my Extension, so that the County receives my
filing for an extension on my taxes._

#### Acceptance Criteria

1. The Application submits the Extension Request to the API via
   `requestExtension` function in `./lib/api.ts` when the "Submit Request"
   button in the form is clicked.
2. The Taxpayer is redirected to the Submissions page.
3. The recorded Submission returned from the API shows up on the "Submissions"
   page.

### TID-4: New Statements Page

#### Story

_As a Taxpayer, I want to see a list of all of my Statements, so that I can
track their progress._

#### Acceptance Criteria

1. A new "My Statements" page is added to the Application.
2. The user can navigate to it via a "My Statements" link in the top
   navigation.
3. The Application loads the User's Statements from the API via the
   `loadStatements` function in `./lib/api.ts`.
4. The data is stored in Redux.
5. The `name` and all attributes of `contactInformation` are displayed in a
   Table for the Taxpayer.

### TID-5: Create a New Statement

#### Story

_As a Taxpayer, I want to create new Statements, so that I can file with the
County._

#### Acceptance Criteria

1. A "Create Statement" button is added to the "My Statements" page.
2. The user is presented a form where they can fill out
    - The Name of the business. (Required in order to submit)
    - The Contact Information for the business.
3. They can submit their statement to the API via the `createStatement`
   function in `./lib/api.ts`.
4. They are redirected to the "My Statements" page after successfully
   submitting their Statement.

### TID-6: Update My Statements

#### Story

_As a Taxpayer, I want to update my Statements, so that I can keep them up to
date with the County._

#### Acceptance Criteria

1. Their is an "Update" button for every Statement in the "My Statements"
   table.
2. Clicking the "Update" button takes the user to a form where they can see
   existing values. The fields and requirements are the same as the "Create
   Statement Form" from TID-5.
3. They can submit the form to the API via the `updateStatement` function in
   `./lib/api.ts`.
4. They are redirected to the "My Statements" page on successfully submitting.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode. Open
[http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits. You will also see any lint errors in
the console.

### `yarn test`

Launches the test runner in the interactive watch mode. See the section about
[running
tests](https://facebook.github.io/create-react-app/docs/running-tests) for
more information.

### `yarn build`

Builds the app for production to the `build` folder. It correctly bundles
React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes. Your app is ready
to be deployed!

See the section about
[deployment](https://facebook.github.io/create-react-app/docs/deployment) for
more information.
