// test-setup.js
import * as enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import config from "./firebase";
import firebase from "firebase";

enzyme.configure({ adapter: new Adapter() });

firebase.initializeApp(config);
const settings = { timestampsInSnapshots: true };
firebase.firestore().settings(settings);
