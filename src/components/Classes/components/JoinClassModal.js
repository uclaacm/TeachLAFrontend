import React from 'react';
import ReactModal from 'react-modal';
import { Redirect } from 'react-router-dom';
import {
  Button, Container, Row, Col, FormGroup, Label, Input,
} from 'reactstrap';
import * as fetch from '../../../lib/fetch.js';

class JoinClassModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wid: '',
      disableSubmit: false,
      error: '',
      redirect: false,
    };
  }

  closeModal = () => {
    if (this.props.onClose && {}.toString.call(this.props.onClose) === '[object Function]') {
      this.props.onClose();
    }

    this.setState({
      wid: '',
      error: '',
      disableSubmit: false,
    });
  };

  badInput = () => {
    if (!this.state.wid) {
      this.setState({
        error: 'Please enter the class code. You should get this from your instructor.',
      });
      return true;
    }
    // TODO: Check if class code input is formatted correctly

    return false;
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (badInput()) {
      return;
    }

    const data = {
<<<<<<< HEAD
      uid: this.props.uid,
=======
      uid: props.uid,
>>>>>>> 54f097b (Changed JoinClassModal to functional, checked by Regina)
      // Todo: swap this line back in when BE is fixed
      // wid: this.state.wid,
      cid: wid,
    };

    try {
      fetch
        .joinClass(data)
        .then((res) => {
          if (!res.ok) {
<<<<<<< HEAD
            if (res.status == 404) {
              throw '404';
=======
            if (res.status === 404) {
              throw new Error('404');
>>>>>>> 54f097b (Changed JoinClassModal to functional, checked by Regina)
            } else {
              throw new Error(`Error: Response code is ${res.status}`);
            }
          }
          return res.classData;
        })
        .then((json) => {
          props.addStudentClass(json.cid, json || {});
          // this.setState({ redirect: true });
          setRedirect(true);
          closeModal();
        })
        .catch((err) => {
<<<<<<< HEAD
          this.setState({
            disableSubmit: false,
            error: (err === '404')
              ? "We couldn't find that class. Please try again!"
              : 'There was a problem joining the class, please try again!',
          });
          console.log(err);
=======
          // setDisableSubmit(false)
          setError(
            err === '404'
              ? "We couldn't find that class. Please try again!"
              : 'There was a problem joining the class, please try again!',
          );
          // this.setState({
          //   disableSubmit: false,
          //   error: (err === "404") ?
          //     "We couldn't find that class. Please try again!" :
          //     "There was a problem joining the class, please try again!",
          // });
          // console.log(err);
>>>>>>> 54f097b (Changed JoinClassModal to functional, checked by Regina)
        });
    } catch (err) {
      // console.log(err);
    }

    // Testing stuff (do this instead of the try-catch block):
    /*
    let classLetter = String.fromCharCode(Math.floor(Math.random() * 26) + 65);
    let testCid = Math.floor(Math.random() * 10);
    this.props.addStudentClass(testCid,
      {
        thumbnail: Math.floor(Math.random() * 20),
        name: "Class ".concat(classLetter),
        creator: "HASH0",
        instructors: [ "Prof. ".concat(classLetter) ],
        members: [ "HASH3", "HASH4", "HASH5" ],
        programs: [ "HASH6", "HASH7" ],
        cid: testCid,
        wid: this.state.wid,
      });
    this.closeModal();
*/
    // end of testing stuff
<<<<<<< HEAD

    this.setState({ disableSubmit: true, error: '' });
  };

  renderModal = () => (
    <ReactModal
      isOpen={this.props.isOpen}
      onRequestClose={this.closeModal}
=======
    // setDisableSubmit(true)
    setError('');
    // this.setState({ disableSubmit: true, error: "" });
  };

  const renderModal = () => (
    <ReactModal
      isOpen={props.isOpen}
      onRequestClose={closeModal}
>>>>>>> 54f097b (Changed JoinClassModal to functional, checked by Regina)
      className="sketches-modal"
      overlayClassName="profile-image-overlay"
      ariaHideApp={false}
    >
      <Container>
        <h1 className="text-center">Join a Class</h1>
        <hr />
        <FormGroup row>
          <Label className="text-right" for="class-code" xs={4}>
            Enter class code:
          </Label>
          <Col xs={8}>
            <Input
              className="sketches-modal-input"
<<<<<<< HEAD
              onChange={(e) => this.setState({ wid: e.target.value })}
              value={this.state.wid}
=======
              onChange={(e) => setWid(e.target.value)}
              value={wid}
>>>>>>> 54f097b (Changed JoinClassModal to functional, checked by Regina)
              id="class-code"
            />
          </Col>
        </FormGroup>
        <br />
<<<<<<< HEAD
        <div className="text-center text-danger">{this.state.error || <br />}</div>
        <hr />
        <Row>
          <Col>
            <Button color="danger" onClick={this.closeModal} size="lg" block>
=======
        <div className="text-center text-danger">{error || <br />}</div>
        <hr />
        <Row>
          <Col>
            <Button color="danger" onClick={closeModal} size="lg" block>
>>>>>>> 54f097b (Changed JoinClassModal to functional, checked by Regina)
              Cancel
            </Button>
          </Col>
          <Col>
<<<<<<< HEAD
            <Button color="success" onClick={this.onSubmit} size="lg" block>
=======
            <Button color="success" onClick={onSubmit} size="lg" block>
>>>>>>> 54f097b (Changed JoinClassModal to functional, checked by Regina)
              Join
            </Button>
          </Col>
        </Row>
      </Container>
    </ReactModal>
  );

<<<<<<< HEAD
  render() {
    if (this.state.redirect) {
      // Need to send them to the right class page
      return <Redirect to="/class" />;
    }

    return this.renderModal();
=======
  if (redirect) {
    // Need to send them to the right class page
    return <Redirect to="/class" />;
>>>>>>> 54f097b (Changed JoinClassModal to functional, checked by Regina)
  }

  return renderModal();
};

export default JoinClassModal;
