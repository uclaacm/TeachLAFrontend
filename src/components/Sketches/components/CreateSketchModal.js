import React, { useState } from 'react';
import ReactModal from 'react-modal';
import { Redirect } from 'react-router-dom';
import {  Button, Container, Row, Col, FormGroup, Label, Input, DropdownItem } from 'reactstrap';
import { ThumbnailArray } from "../../../constants";
import * as fetch from '../../../lib/fetch.js';
import ImageSelector from '../../common/ImageSelector';
import {
  LanguageDropdownValues,
  LanguageDropdownDefault,
} from '../constants';
import DropdownButton from '../../common/DropdownButton.js';
import '../../../styles/SketchesModal.scss';

let CreateSketchModal = function (props) {
  const {
    onClose,
    uid,
    isOpen,
    addProgram,
    setMostRecentProgram,
    wid,
  } = props;
  const toggleProps = { className: '', color: 'primary', size: 'lg' };

  const [language, setLanguage] = useState(LanguageDropdownDefault);
  const [name, setName] = useState('');
  const [next, setNext] = useState(false);
  const [thumbnail, setThumbnail] = useState(-1);
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [error, setError] = useState('');
  const [redirect, setRedirect] = useState(false);

  const closeModal = () => {
    if (onClose && {}.toString.call(onClose) === '[object Function]') {
      onClose();
    }

    setNext(false);
    setLanguage(LanguageDropdownDefault);
    setName('');
    setThumbnail(-1);
    setError('');
    setDisableSubmit(false);
  };

  const setNextHelper = (val) => {
    setNext(val);
    setError('');
    setDisableSubmit(false);
  };

  const onBack = () => setNextHelper(false);

  const isBadThumbnailInput = () => {
    if (
      thumbnail === undefined
      || thumbnail === ''
      || thumbnail >= ThumbnailArray.length
      || thumbnail < 0
    ) {
      // setError('Please select a thumbnail')
      return true;
    }

    return false;
  };

  const isBadNameInput = () => {
    if (!name) {
      setError('Name is required');
      return true;
    }
    if (name.length > 15) {
      setError('Name must be 15 characters or less');
      return true;
    }
    // if( .name.match(/[^a-zA-Z0-9!@#$%'" .]/)){
    //   setError('Sketch name nust be less than 20 characters')
    //   return true
    // }

    return false;
  };

  const isBadLanguageInput = () => {
    if (!language) {
      setError('Please select a language');
      return true;
    }

    for (let i = 0; i < LanguageDropdownValues.length; i++) {
      if (
        language.display === LanguageDropdownValues[i].display
        && language.value === LanguageDropdownValues[i].value
      ) {
        return false;
      }
    }

    setError('Invalid language selected');
    return true;
  };

  const onFirstSubmit = (e) => {
    e.preventDefault();
    if (isBadNameInput() || isBadLanguageInput()) {
      return;
    }
    setNextHelper(true);
  };

  const onSecondSubmit = async (e) => {
    e.preventDefault();

    if (isBadThumbnailInput()) return;

    const data = {
      uid,
      thumbnail,
      language: language.value,
      name,
      code: '',
      wid,
    };

    try {
      fetch
        .createSketch(data)
        .then((res) => {
          if (!res.ok) throw new Error(`Failed to create user! Got status ${res.status}`);
          return res.json();
        })
        .then((json) => {
          const { id, ...programData } = json;
          addProgram(id, programData || {});
          setMostRecentProgram(id);
          setRedirect(true);
          closeModal();
        })
        .catch((err) => {
          setDisableSubmit(false);
          setError('Failed to create sketch, please try again later');
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
    setDisableSubmit(true);
    setError('');
  };

  const renderSecondModal = () => {
    const icons = ThumbnailArray.map((val, index) => (
      <figure className="sketches-gallery-item" key={val} onClick={() => setThumbnail(index)}>
        <img
          src={`${process.env.PUBLIC_URL}/img/sketch-thumbnails/${val}.svg`}
          className={`sketches-gallery-img${thumbnail === index ? '-selected' : ''}`}
          alt="icon"
        />
      </figure>
    ));

    const thumbnailPreview =      thumbnail !== -1 ? (
        <img
          src={`${process.env.PUBLIC_URL}/img/sketch-thumbnails/${ThumbnailArray[thumbnail]}.svg`}
          className="sketches-modal-header-thumbnail"
          alt="icon"
        />
      ) : null;
    return (
      <ImageSelector
        isOpen={isOpen}
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
              disabled={isBadThumbnailInput() || disableSubmit}
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
      isOpen={isOpen}
      onRequestClose={closeModal}
      className="sketches-modal"
      overlayClassName="profile-image-overlay"
      ariaHideApp={false}
    >
      <Container>
        <h1 className="text-center">Create a Sketch</h1>
        <hr />
        <FormGroup row>
          <Label className="text-right" for="sketch-name" xs={4}>
            Name
          </Label>
          <Col xs={8}>
            <Input onChange={(e) => setName(e.target.value)} value={name} id="sketch-name" />
          </Col>
        </FormGroup>
        <br />
        <Row>
          <Col xs="4" className="text-right">
            Language
          </Col>
          <Col xs="8" className="d-flex align-items-center">
            <DropdownButton
              displayValue={language.display || LanguageDropdownDefault.display}
              displayClass="sketches"
              toggleProps={toggleProps}
              onSelect={setLanguage}
              DropdownItems={LanguageDropdownValues}
            />
          </Col>
        </Row>
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
    return <Redirect to="/editor" />;
  }

  if (next) {
    return renderSecondModal();
  }

  return renderFirstModal();
};

export default CreateSketchModal;
