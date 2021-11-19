import React, { useState } from 'react';
import ReactModal from 'react-modal';
import { Redirect } from 'react-router-dom';
import {
  Button, Container, Row, Col, FormGroup, Label, Input,
} from 'reactstrap';
import { ThumbnailArray } from '../../../constants';
import * as fetch from '../../../lib/fetch';
import ImageSelector from '../../common/ImageSelector';

import '../../../styles/SketchesModal.scss';

const CreateClassModal = function (props) {
  const [name, setName] = useState('');
  const [next, setNext] = useState(false);
  const [thumbnail, setThumbnail] = useState(-1);
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [error, setError] = useState('');
  const [redirect, setRedirect] = useState(false);

  const closeModal = () => {
    if (props.onClose && {}.toString.call(props.onClose) === '[object Function]') {
      props.onClose();
    }

    setNext(false);
    setName('');
    setThumbnail(-1);
    setError('');
    setDisableSubmit(false);
  };

  const setNextStates = (val) => {
    setNext(val);
    setError('');
    setDisableSubmit(false);
  };

  const onBack = () => setNextStates(false);

  const badThumbnailInput = () => {
    if (
      thumbnail === undefined
      || thumbnail === ''
      || thumbnail >= ThumbnailArray.length
      || thumbnail < 0
    ) {
      return true;
    }

    return false;
  };

  const badNameInput = () => {
    if (!name) {
      setError('Name is required');
      return true;
    }
    if (name.length > 100) {
      setError('Name must be 100 characters or less');
      return true;
    }

    return false;
  };

  const onFirstSubmit = (e) => {
    e.preventDefault();
    if (badNameInput()) {
      return;
    }
    setNextStates(true);
  };

  const onSecondSubmit = async (e) => {
    e.preventDefault();

    if (badThumbnailInput()) return;

    const data = {
      uid: props.uid,
      thumbnail,
      name,
    };

    try {
      fetch
        .createClass(data)
        .then((res) => {
          if (!res.ok) throw new Error(`Failed to create class! Got status ${res.status}`);
          return res.json();
        })
        .then((json) => {
          props.setCurrentClass(json.cid);
          props.addInstrClass(json.cid, json || {});
          setRedirect(true);
          closeModal();
        })
        .catch((err) => {
          setDisableSubmit(false);
          setError(`Failed to create class, please try again later. Error: ${err}`);
          console.error(err);
        });
    } catch (err) {
      setError(`Failed to create class, please try again later. Error: ${err}`);
      console.error(err);
    }

    // Testing stuff (do this instead of the try-catch block):
    /*
    let testCid = Math.floor(Math.random() * 10);
    this.props.addInstrClass(testCid,
      {
        thumbnail: this.state.thumbnail,
        name: this.state.name,
        creator: this.props.uid,
        instructors: [ "Me", this.props.uid ],
        members: [ "HASH3", "HASH4", "HASH5" ],
        programs: [ "HASH6", "HASH7" ],
        cid: testCid,
        wid: "Metallic Funky Monkey",
      });
    this.props.setCurrentClass(testCid);
    this.closeModal();
*/
    // end of testing stuff

    setDisableSubmit(true);
    setError('');
  };

  const renderSecondModal = () => {
    const icons = ThumbnailArray.map((val, index) => (
      <figure className="sketches-gallery-item" key={val}>
        <input
          type="image"
          src={`${process.env.PUBLIC_URL}/img/sketch-thumbnails/${val}.svg`}
          className={`sketches-gallery-img${thumbnail === index ? '-selected' : ''}`}
          alt="icon"
          tabIndex="0"
          onClick={() => setThumbnail(index)}
          onKeyDown={() => setThumbnail(index)}
        />
      </figure>
    ));

    const thumbnailPreview = thumbnail !== -1 ? (
      <img
        src={`${process.env.PUBLIC_URL}/img/sketch-thumbnails/${ThumbnailArray[thumbnail]}.svg`}
        className="sketches-modal-header-thumbnail"
        alt="icon"
      />
    ) : null;
    return (
      <ImageSelector
        isOpen={props.isOpen}
        closeModal={closeModal}
        thumbnailPreview={thumbnailPreview}
        icons={icons}
        error={error}
      >
        <Row>
          <Col>
            <Button color="secondary" onClick={onBack} disabled={disableSubmit} size="lg" block>
              Back
            </Button>
          </Col>
          <Col>
            <Button
              color="success"
              onClick={onSecondSubmit}
              size="lg"
              disabled={badThumbnailInput() || disableSubmit}
              block
            >
              Create
            </Button>
          </Col>
        </Row>
      </ImageSelector>
    );
  };

  const renderFirstModal = () => (
    <ReactModal
      isOpen={props.isOpen}
      onRequestClose={closeModal}
      className="sketches-modal"
      overlayClassName="profile-image-overlay"
      ariaHideApp={false}
    >
      <Container>
        <h1 className="text-center">Create a Class</h1>
        <hr />
        <FormGroup row>
          <Label className="text-right" for="class-name" xs={4}>
            Enter new class name:
          </Label>
          <Col xs={8}>
            <Input onChange={(e) => setName(e.target.value)} value={name} id="class-name" />
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
            <Button color="success" onClick={onFirstSubmit} size="lg" block>
              Next
            </Button>
          </Col>
        </Row>
      </Container>
    </ReactModal>
  );

  if (redirect) {
    // put class url here
    return <Redirect to="/class" />;
  }

  if (next) {
    return renderSecondModal();
  }

  return renderFirstModal();
};

export default CreateClassModal;
