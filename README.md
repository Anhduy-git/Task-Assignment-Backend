<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    

# Task assignment app (Backend)

Back-end of a task assignment app, just for self-learning purpose.

There are 2 types of user in the web:
+ Admin: manage list of members & tasks.
+ Member.

## Contributors
Here is our team, you can connect us through our Linkedin:
- [Nguyen Tran Anh Duy (Backend Developper)](https://www.linkedin.com/in/duy-nguyen-tran-anh/).

## Diagram
![Task_Assignment_App_ER](https://user-images.githubusercontent.com/84486806/199247469-6a890705-4a48-4241-9c2c-6b29f5e6cabc.png)

## Tech Stack

**Programming Language:** Typescript.

**Frameworks:** NodeJS, NestJS.

**Database:** PostgreSQL.

**Web server:** AWS EC2.

**Documentation:** OpenAPI, Swagger.

**E2E testing:** Jest, Pactum.

## Features
- Signin/Signup user.
- Add new admin/member.
- CRUD tasks.
- ASssign tasks to member.

## Documentation

[Documentation](https://app.swaggerhub.com/apis-docs/Anhduy-git/AssignmentTaskAPI/1.0.0)

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
