# Changelog

## Version v1.2.0 | Updating Node, Removing Travis, & Dependencies (23/03/2020)

Hey all! This is a quick Release that mostly updates our dependencies: moving node to major version 12 (the new LTS), updating many of our node modules, and removing our Travis config (which also triggers our Travis builds) in favour of GitHub Actions.

Exciting new features coming soon!

#### dependencies

- [**dependencies**] Bump @fortawesome/free-solid-svg-icons from 5.12.1 to 5.13.0 [#240](https://github.com/uclaacm/TeachLAFrontend/pull/240)
- [**dependencies**] Bump @fortawesome/fontawesome-svg-core from 1.2.27 to 1.2.28 [#242](https://github.com/uclaacm/TeachLAFrontend/pull/242)
- [**dependencies**] Bump react-scripts from 3.4.0 to 3.4.1 [#241](https://github.com/uclaacm/TeachLAFrontend/pull/241)
- [**dependencies**] Bump react-dom from 16.13.0 to 16.13.1 [#239](https://github.com/uclaacm/TeachLAFrontend/pull/239)
- [**dependencies**] Bump react-split-pane from 0.1.89 to 0.1.91 [#237](https://github.com/uclaacm/TeachLAFrontend/pull/237)
- [**dependencies**] Bump prettier from 1.19.1 to 2.0.1 [#236](https://github.com/uclaacm/TeachLAFrontend/pull/236)
- [**dependencies**] Bump react from 16.13.0 to 16.13.1 [#232](https://github.com/uclaacm/TeachLAFrontend/pull/232)
- [**dependencies**] Bump codemirror from 5.52.0 to 5.52.2 [#233](https://github.com/uclaacm/TeachLAFrontend/pull/233)
- [**dependencies**] Bump firebase from 7.11.0 to 7.12.0 [#231](https://github.com/uclaacm/TeachLAFrontend/pull/231)
- [**dependencies**] Bump react-codemirror2 from 7.0.0 to 7.1.0 [#234](https://github.com/uclaacm/TeachLAFrontend/pull/234)
- [**dependencies**] Updating to Node 12.14.1 LTS! [#182](https://github.com/uclaacm/TeachLAFrontend/pull/182)
- [**dependencies**] Bump react-codemirror2 from 6.0.0 to 7.0.0 [#230](https://github.com/uclaacm/TeachLAFrontend/pull/230)
- [**dependencies**] Bump firebase from 7.9.1 to 7.11.0 [#228](https://github.com/uclaacm/TeachLAFrontend/pull/228)
- [**dependencies**][**security**] [Security] Bump acorn from 5.7.3 to 5.7.4 [#229](https://github.com/uclaacm/TeachLAFrontend/pull/229)
- [**dependencies**] Bump @fortawesome/react-fontawesome from 0.1.8 to 0.1.9 [#222](https://github.com/uclaacm/TeachLAFrontend/pull/222)
- [**dependencies**] Bump husky from 4.2.1 to 4.2.3 [#202](https://github.com/uclaacm/TeachLAFrontend/pull/202)

#### devops

- [**devops**] Removes Travis [#226](https://github.com/uclaacm/TeachLAFrontend/pull/226)

#### refactor

- [**refactor**] Removing Defunct Code [#225](https://github.com/uclaacm/TeachLAFrontend/pull/225)
- [**refactor**] Uses CodeDownloader Everywhere [#224](https://github.com/uclaacm/TeachLAFrontend/pull/224)

---

## Version v1.1.0 | Redirect Loop Fix, Helpful Loading/Error Pages, GitHub Actions! (29/02/2020)

It's our first minor release, exciting! We fixed a redirect loop when the user had empty sketches (introduced in our `Main.js` refactor), add a helpful message when loading takes longer than expected, makes 404/Error pages more helpful and respect themeing, tests out GitHub Actions, and updates lots of dependencies.

#### bug

- [**bug**] Fixing Redirect Loop in Main.js (and other small fixes) [#208](https://github.com/uclaacm/TeachLAFrontend/pull/208)

#### dependencies

- [**dependencies**] Bump lint-staged from 10.0.7 to 10.0.8 [#214](https://github.com/uclaacm/TeachLAFrontend/pull/214)
- [**dependencies**] Bump react-modal from 3.11.1 to 3.11.2 [#213](https://github.com/uclaacm/TeachLAFrontend/pull/213)
- [**dependencies**] Bump react-dom from 16.12.0 to 16.13.0 [#216](https://github.com/uclaacm/TeachLAFrontend/pull/216)
- [**dependencies**] Bump react from 16.12.0 to 16.13.0 [#215](https://github.com/uclaacm/TeachLAFrontend/pull/215)
- [**dependencies**] Bump firebase from 7.9.0 to 7.9.1 [#212](https://github.com/uclaacm/TeachLAFrontend/pull/212)
- [**dependencies**] Bump firebase from 7.8.2 to 7.9.0 [#209](https://github.com/uclaacm/TeachLAFrontend/pull/209)
- [**dependencies**] Bump codemirror from 5.51.0 to 5.52.0 [#207](https://github.com/uclaacm/TeachLAFrontend/pull/207)
- [**dependencies**] Bump react-redux from 7.1.3 to 7.2.0 [#206](https://github.com/uclaacm/TeachLAFrontend/pull/206)
- [**dependencies**] Bump react-scripts from 3.3.1 to 3.4.0 [#205](https://github.com/uclaacm/TeachLAFrontend/pull/205)

#### devops

- [**devops**] Tries Out GitHub Actions for CI [#211](https://github.com/uclaacm/TeachLAFrontend/pull/211)

#### feature

- [**feature**] Adds link to GitHub Repo on 404 page, makes styling respect current theme [#199](https://github.com/uclaacm/TeachLAFrontend/pull/199)
- [**feature**] Added help text to loading page [#197](https://github.com/uclaacm/TeachLAFrontend/pull/197)

#### refactor

- [**refactor**] Adds Tests for <Loading>'s Timer + Minor Improvements [#210](https://github.com/uclaacm/TeachLAFrontend/pull/210)
- [**refactor**](very) minor code cleanup! [#203](https://github.com/uclaacm/TeachLAFrontend/pull/203)

---

## Version v1.0.3 | Simple Dep Updates (17/02/2020)

Pretty routine almost-biweekly release. This is just dependency updates.

#### dependencies

- [**dependencies**] Bump firebase from 7.8.1 to 7.8.2 [#204](https://github.com/uclaacm/TeachLAFrontend/pull/204)
- [**dependencies**] Bump husky from 4.0.10 to 4.2.1 [#184](https://github.com/uclaacm/TeachLAFrontend/pull/184)
- [**dependencies**] Bump firebase from 7.8.0 to 7.8.1 [#196](https://github.com/uclaacm/TeachLAFrontend/pull/196)
- [**dependencies**] Bump lint-staged from 10.0.4 to 10.0.7 [#189](https://github.com/uclaacm/TeachLAFrontend/pull/189)
- [**dependencies**] Bump @fortawesome/free-brands-svg-icons from 5.12.0 to 5.12.1 [#193](https://github.com/uclaacm/TeachLAFrontend/pull/193)
- [**dependencies**] Bump @fortawesome/free-solid-svg-icons from 5.12.0 to 5.12.1 [#194](https://github.com/uclaacm/TeachLAFrontend/pull/194)
- [**dependencies**] Bump @fortawesome/fontawesome-svg-core from 1.2.26 to 1.2.27 [#195](https://github.com/uclaacm/TeachLAFrontend/pull/195)
- [**dependencies**] Bump enzyme-to-json from 3.4.3 to 3.4.4 [#192](https://github.com/uclaacm/TeachLAFrontend/pull/192)
- [**dependencies**] Bump react-scripts from 3.3.0 to 3.3.1 [#191](https://github.com/uclaacm/TeachLAFrontend/pull/191)
- [**dependencies**] Bump firebase from 7.7.0 to 7.8.0 [#190](https://github.com/uclaacm/TeachLAFrontend/pull/190)
- [**dependencies**] Bump lint-staged from 10.0.3 to 10.0.4 [#187](https://github.com/uclaacm/TeachLAFrontend/pull/187)
- [**dependencies**] Bump reactstrap from 8.4.0 to 8.4.1 [#186](https://github.com/uclaacm/TeachLAFrontend/pull/186)
- [**dependencies**] Bump lint-staged from 10.0.2 to 10.0.3 [#185](https://github.com/uclaacm/TeachLAFrontend/pull/185)

---

## Version 1.0.2 | More Cleanup & Consistency (27/01/2020)

Another small release, mostly just cataloguing dependency updates. Two small features added by @kilometerskang and @vohndernet on intuitive name-editing and finally adding the sketch thumbnail to the editor page!

(this was mostly auto-generated by `gren`, going to try this out).

#### feature

- [**feature**] Added sketch thumbnail [#181](https://github.com/uclaacm/TeachLAFrontend/pull/181)
- [**feature**] Make editing name intuitive. [#174](https://github.com/uclaacm/TeachLAFrontend/pull/174)

#### refactor

- [**refactor**] Removes Unused Configuration Files [#154](https://github.com/uclaacm/TeachLAFrontend/pull/154)

#### dependencies

- [**dependencies**] Bump cross-env from 6.0.3 to 7.0.0 [#183](https://github.com/uclaacm/TeachLAFrontend/pull/183)
- [**dependencies**] Bump lint-staged from 10.0.1 to 10.0.2 [#179](https://github.com/uclaacm/TeachLAFrontend/pull/179)
- [**dependencies**] Bump lint-staged from 9.5.0 to 10.0.1 [#178](https://github.com/uclaacm/TeachLAFrontend/pull/178)
- [**dependencies**] Bump reactstrap from 8.3.2 to 8.4.0 [#175](https://github.com/uclaacm/TeachLAFrontend/pull/175)
- [**dependencies**] Bump codemirror from 5.50.2 to 5.51.0 [#177](https://github.com/uclaacm/TeachLAFrontend/pull/177)
- [**dependencies**] Bump husky from 4.0.7 to 4.0.10 [#170](https://github.com/uclaacm/TeachLAFrontend/pull/170)
- [**dependencies**] Bump firebase from 7.6.2 to 7.7.0 [#173](https://github.com/uclaacm/TeachLAFrontend/pull/173)
- [**dependencies**] Bump node-sass from 4.13.0 to 4.13.1 [#171](https://github.com/uclaacm/TeachLAFrontend/pull/171)
- [**dependencies**] Bump reactstrap from 8.3.1 to 8.3.2 [#169](https://github.com/uclaacm/TeachLAFrontend/pull/169)
- [**dependencies**] Bump reactstrap from 8.2.0 to 8.3.1 [#167](https://github.com/uclaacm/TeachLAFrontend/pull/167)
- [**dependencies**] Bump firebase from 7.6.1 to 7.6.2 [#164](https://github.com/uclaacm/TeachLAFrontend/pull/164)
- [**dependencies**] Bump husky from 4.0.1 to 4.0.7 [#165](https://github.com/uclaacm/TeachLAFrontend/pull/165)
- [**dependencies**] Bump husky from 4.0.0 to 4.0.1 [#161](https://github.com/uclaacm/TeachLAFrontend/pull/161)
- [**dependencies**] Bump husky from 3.1.0 to 4.0.0 [#160](https://github.com/uclaacm/TeachLAFrontend/pull/160)
- [**dependencies**] Bump react-spinners from 0.7.2 to 0.8.0 [#159](https://github.com/uclaacm/TeachLAFrontend/pull/159)
- [**dependencies**] Bump codemirror from 5.50.0 to 5.50.2 [#158](https://github.com/uclaacm/TeachLAFrontend/pull/158)

---

## Version 1.0.1 | Just Dependency Updates! (01/01/2020)

Happy new year! This is a quick snapshot of our app at 01/01/20 (wow). The diff from `1.0.0` is just dependency updates. Until I investigate a way to auto-generate these (probably using `gren`, but that didn't work), I'll type them up manually.

# Release Notes

- Bump codemirror from 5.50.0 to 5.50.2 (#158)
- Bump react-spinners from 0.7.1 to 0.7.2 (#157)
- Bump redux from 4.0.4 to 4.0.5 (#156)
- Bump react-spinners from 0.6.1 to 0.7.1 (involved updating a Jest snapshot) (#155)
- Bump enzyme from 3.10.0 to 3.11.0 (#151)
- Bump codemirror from 5.49.2 to 5.50.0 (#153)
- Bump enzyme-adapter-react-16 from 1.15.1 to 1.15.2 (#152)
- Bump firebase from 7.6.0 to 7.6.1 (#150)

---

## Version 1.0.0 | The Start of Semver (kinda)! (16/12/2019)

Hey there,

This release marks a milestone - the (almost) end of product development for the decade (wow!), and also the official release of our website on the `editor.uclaacm.com` subdomain (with light mode and everything!). It also marks a milestone for our project's maturity; from this point on, we'll adhere to a slightly modified version of semver, where we'll tag releases with bug fixes (patches), new features (minor releases), and changes that dramatically change the structure of our app or involve a changed API (major releases).

Usually, we'll release a PR-based changelog of the diff from the previous version, but in our case that doesn't really make sense for our first release. As we make more releases, we'll add more detail to what's changed!

Keep tuned for more info! Happy holidays, and have a great new year 😄!
