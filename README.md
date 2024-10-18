## ACM Teach LA's Editor Frontend

[![Node.js CI](https://github.com/uclaacm/TeachLAFrontend/workflows/Node.js%20CI/badge.svg)](https://github.com/uclaacm/TeachLAFrontend/actions?query=workflow%3A%22Node.js+CI%22)
[![Netlify Status](https://api.netlify.com/api/v1/badges/15895bed-2a7e-4a27-aa63-633a0cd645f1/deploy-status)](https://app.netlify.com/sites/sleepy-franklin-7a3e4c/deploys)
[![Coverage Status](https://coveralls.io/repos/github/uclaacm/TeachLAFrontend/badge.svg?branch=master)](https://coveralls.io/github/uclaacm/TeachLAFrontend?branch=master)

This repository holds the frontend code for the ACM Teach LA online editor!
Teach LA uses the editor to help teach LA students about Python, Web
Development, and expose them to computer science!

Our editor is primarily developed with [React](https://reactjs.org/) +
[Redux](https://redux.js.org/), and uses a smattering of other Node packages.
The project is actively developed and maintained by the [ACM Teach
LA](https://teachla.uclaacm.com) Dev Team (part of [ACM @
UCLA](https://uclaacm.com)).

Want to find out more about ACM Teach LA, or join the developer team? Check out
[our website](https://teachla.uclaacm.com) or shoot us an email at
[acmteachla@gmail.com](mailto:acmteachla@gmail.com).

## Developer Setup

We use `pnpm`: `pnpm` does what `npm` does but is much more efficient.
Recommended setup is as follows:

1. Follow installation instructions for `pnpm` [here](https://pnpm.io/installation).
2. Open a new shell and verify that `pnpm` is installed by running `pnpm --version`.
3. Run `pnpm env use --global lts` to download the latest LTS version of Node.
4. Clone this repository and navigate to the project directory within your shell.
5. Run `pnpm install` to install all dependencies.
6. Test that everything works by running `pnpm staging_start` to start the development server.

There are actually two different ways to run the app locally on your machine -
one that uses our staging backend server (as in step 6), and one where you'll
run it locally. Usually, the staging server is totally fine to use, but having
the backend makes more sense if you're working on a new feature or are editing
the backend.

### Connecting to a backend

#### Using the Staging Server (Recommended)

After following the **Developer Setup**, run:

```bash
$ pnpm staging_start
```

And voila! `vite` should automatically open a new browser window with the
editor; give it a few seconds to start up and you should be good to go. You can
also manually visit it on `localhost:5173`

#### Using a Local Server (Advanced)

**Note** This currently doesn't work.

Here, you'll run our backend on your local machine, which offers more
flexibility; you can find more information on that
[here](https://github.com/uclaacm/teach-la-go-backend).

And in another terminal window:

**TODO** Find equivalent of `react-scripts start`.

```bash
$ git clone https://github.com/uclaacm/TeachLAFrontend.git
$ cd TeachLAFrontend
$ pnpm install
$ pnpm start # this doesn't work right now
```

The client should now be automatically opened in your browser; however, you can
also manually visit it on `localhost:5173`. Note that we've also opened a copy
of the go backend on `localhost:8081`.

## Notes for Developers:

- every time you pull from master, make sure to run `pnpm install` - it's likely that some dependency has changed!
- `lint-staged` and `husky` auto-prettify some JS code on save - don't be spooked!
- GitHub Actions auto-builds branches and PRs - make sure that `npm run test` `npm run prod_build` pass, or your changes for-sure won't work!
- Netlify auto-deploys PRs, branches, and production deploys using the contents of `npm run prod_build`!
