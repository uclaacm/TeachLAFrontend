import React, { useState } from 'react';
import ReactModal from 'react-modal';
import { Redirect } from 'react-router-dom';
import {
  Button, Container, Row, Col, FormGroup, Label, Input,
} from 'reactstrap';
import * as fetch from '../../../lib/fetch';

const JoinClassModal = function ({ props }) {
  const [wid, setWid] = useState('');
  const [_disableSubmit, setDisableSubmit] = useState(false);
  const [error, setError] = useState('');
  const [redirect, setRedirect] = useState(false);

  const closeModal = () => {
    const { onClose } = props;

    if (onClose && {}.toString.call(onClose) === '[object Function]') {
      onClose();
    }

    setWid('');
    setError('');
    setDisableSubmit(false);
  };

  const badInput = () => {
    if (!wid) {
      setError('Please enter the class code. You should get this from your instructor.');
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
      uid: props.uid,
      // Todo: swap this line back in when BE is fixed
      // wid: this.state.wid,
      cid: wid,
    };

    try {
      fetch
        .joinClass(data)
        .then((res) => {
          if (!res.ok) {
            if (res.status === 404) {
              throw new Error('404');
            } else {
              throw new Error(`Error: Response code is ${res.status}`);
            }
          }
          return res.classData;
        })
        .then((json) => {
          props.addStudentClass(json.cid, json || {});
          setRedirect(true);
          closeModal();
        })
        .catch((err) => {
          setDisableSubmit(false);
          setError(
            err === '404'
              ? "We couldn't find that class. Please try again!"
              : 'There was a problem joining the class, please try again!',
          );

          console.error(err);
        });
    } catch (err) {
      console.error(err);
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
    setDisableSubmit(true);
    setError('');
  };

  const renderModal = () => (
    <ReactModal
      isOpen={props.isOpen}
      onRequestClose={closeModal}
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
              onChange={(e) => setWid(e.target.value)}
              value={wid}
              id="class-code"
            />
          </Col>
        </FormGroup>
        <br />
        <div className="text-center text-danger">{error || <br />}</div>
        <hr />
        <Row>
          <Col>
            <Button color="danger" onClick={closeModal} size="lg" block>
              Cancel
            </Button>
          </Col>
          <Col>
            <Button color="success" onClick={onSubmit} size="lg" block>
              Join
            </Button>
          </Col>
        </Row>
      </Container>
    </ReactModal>
  );

  if (redirect) {
    // Need to send them to the right class page
    return <Redirect to="/class" />;
  }

  return renderModal();
};

export default JoinClassModal;
