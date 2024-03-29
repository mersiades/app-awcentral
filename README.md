[![mersiades](https://circleci.com/gh/mersiades/app-awcentral.svg?style=svg)](https://app.circleci.com/pipelines/github/mersiades/app-awcentral)

### About

### Running locally

To run this app locally, for development purposes, you'll need to take the following steps:

- Launch an instance of the graphql.aw-central.com server locally
- Run `yarn start:dev` from the command line.

### Running tests

#### Jest unit tests

To run the unit tests: `yarn test`.

For unit test coverage: `yarn test --coverage --watchAll=false`

#### Cypress E2E tests

These tests interact with the backend and the database, so before running the tests you'll need to run `awcentral-api` server with the `cypress` Spring Boot profile.

Cypress sends a request to the graphql server before each test run to reset and reseed the test db. But for that to work on your local machine, you'll need to add a `cypress.env.json` file to the root directory.

To open the Cypress console: `yarn run cypress:open`

To run all the Cypress tests and generate code coverage: `yarn run cypress:all`

Through some quirk, `yarn run cypress:all` tests will fail unless you've run `yarn run cypress:open` at least once beforehand.

To open the test coverage in your browser: `open coverage-cypress/lcov-report/index.html`

#### Combined coverage reports

To run all Jest and Cypress tests and then generate a combined coverage report: `yarn test-coverage`.

To open the combined test coverage report in your browser: `open coverage-combined/lcov-report/index.html`

### Production deployment

Builds for production, staging and demo environments can be built using:

- `yarn run build:prod`
- `yarn run build:staging`
- `yarn run build:demo`

However, CircleCI is configured to deploy to S3 buckets whenever there is a commit (including merges) to the master branch. It takes the following steps:

- Automatically build and deploy the `staging` version
- Build the `production` version
- Wait for manual approval before deploying `production` version
  - this gives you the opportunity to visit the `staging` version at https://app-staging.aw-central.com and check that everything is working as it should.
  - note that you made need to do a CloudFront invalidation before you can see changes at app-staging.aw-central.com
- Deploy `production` version upon manual approval (via CircleCI web interface)

Therefore, the preferred deployment procedure is:

- Do you work on a working branch (not `master`)
- When finished, issue pull request
- If good, merge pull request into `master`
- Check staging environment for problems
- If all good, approve deployment of `prod` version at CircleCI web interface (app.circleci.com)

### Amplitude

This app anonymously records some user events for analytics. Amplitude is the service used for this. Events form local development will not be sent to Amplitude, but event in staging and production will. Unfortunately, events from both environments will be sent to the same Amplitude project, so we're currently unable to differentiate between the environments when doing analytics.
