# node-express-project-template

This repository contains a project template for building an enterprise-grade [Node.js](https://nodejs.org/en/) project written in [typescript](https://www.typescriptlang.org/) programming language. The project is based on [Express web framework](https://expressjs.com/). The template was designed to follow and incorporate the best practices in developing Node applications. Practices such as **scalable project structure**, **dependency injection**, **3-layer architecture**, **unit and integration testing**, **automated code linting**, **continuous integration** and many more.

The project also includes integration on localization (i18n), job scheduler, mail service, RDBMS [Query builder](https://github.com/tgriesser/knex)/[ORM](https://sequelize.org/) , Pub/sub systems, [graphQL](https://graphql.org/), [mongoDB](https://www.mongodb.com/), and [oAuth2 providers](https://oauth.net/2/). please refer to the plugins section to learn more.

## Basic usage

-   Installing the dependencies.

```bash
npm install
```

-   Running the app in dev environment.

```bash
npm start
```

-   Building the production app.

```bash
npm run build
```

-   Running testing and linting.

```bash
# Running both unit and integration test
npm test

# Or you can run the test script individually
npm run test:unit
npm run test:integration

## running lint
npm run lint
```
