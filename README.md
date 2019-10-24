## ACM Teach LA Frontend

[![Build Status](https://travis-ci.org/uclaacm/TeachLAFrontend.svg?branch=master)](https://travis-ci.org/uclaacm/TeachLAFrontend)

This is the frontend code for the ACM Teach LA helper site, which functions as an online IDE and code-saver. It's built by the UCLA ACM Teach LA dev team with [React](https://reactjs.org/), [Redux](https://redux.js.org/), and [Firebase](https://firebase.google.com/).

## Developer Setup

You'll need:

- [Node](https://nodejs.org/en/) (we develop this with Node v10.15.3)
- [git](https://git-scm.com/)
- either npm (which comes default with Node) or [yarn](https://yarnpkg.com/en/)

In addition, you'll need to run our backend on your local machine - you can find more information on that [here](https://github.com/uclaacm/TeachLAJSBackend).

Once you have those dependencies, set up is very simple. Type the following lines into your command line:

```bash
$ git clone https://github.com/uclaacm/TeachLAFrontend.git
$ git clone https://github.com/uclaacm/TeachLAJSBackend.git
$ cd TeachLAJSBackend
$ npm install
$ npm start
$ cd ../teachla-frontend
$ npm install
$ npm start
```

The client should now be automatically opened in your browser; however, you can also manually visit it on `localhost:8080`. Note that we've also opened a copy of the TeachLAJSBackend on `localhost:8081`.

## Developer Notes

- We use lint-staged and husky to prettify commited files on push
- We use Travis CI to automatically check the validity of every commit
