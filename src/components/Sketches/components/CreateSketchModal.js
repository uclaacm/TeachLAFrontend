import React, { useState } from 'react';
import ReactModal from 'react-modal';
import { Redirect } from 'react-router-dom';
import { Button, Container, Row, Col, FormGroup, Label, Input } from 'reactstrap';
import * as fetch from '../../../lib/fetch.js';
import ImageSelector from '../../common/ImageSelector';
import {
  SketchThumbnailArray,
  LanguageDropdownValues,
  LanguageDropdownDefault,
} from '../constants';
import DropdownButton from '../../common/DropdownButton.js';
import { DropdownItem } from 'reactstrap';
import '../../../styles/SketchesModal.scss';

const CreateSketchModal = (props) => {
  const toggleProps = { className: '', color: 'primary', size: 'lg' };

  const [language, setLanguage] = useState(LanguageDropdownDefault);
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
    setLanguage(LanguageDropdownDefault);
    setName('');
    setThumbnail(-1);
    setError('');
    setDisableSubmit(false);
  };

  const changeLanguage = (lang) => {
    setLanguage(lang);
  };

  const setNextHelper = (val) => {
    setNext(val);
    setError('');
    setDisableSubmit(false);
  };

  const onBack = () => setNextHelper(false);

  const badThumbnailInput = () => {
    if (
      thumbnail === undefined ||
      thumbnail === '' ||
      thumbnail >= SketchThumbnailArray.length ||
      thumbnail < 0
    ) {
      // setError('Please select a thumbnail')
      return true;
    }

    return false;
  };

  const badNameInput = () => {
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

  const badLanguageInput = () => {
    if (!language) {
      setError('Please select a language');
      return true;
    }

    let notFound = true;
    for (let i = 0; i < LanguageDropdownValues.length; i++) {
      if (
        language.display === LanguageDropdownValues[i].display &&
        language.value === LanguageDropdownValues[i].value
      ) {
        notFound = false;
        break;
      }
    }
    if (notFound) {
      setError('Invalid language selected');
      return true;
    }

    return false;
  };

  const onFirstSubmit = (e) => {
    e.preventDefault();
    if (badNameInput() || badLanguageInput()) {
      return;
    }
    setNextHelper(true);
  };

  const onSecondSubmit = async (e) => {
    e.preventDefault();

    if (badThumbnailInput()) return;

    const data = {
      uid: props.uid,
      thumbnail: thumbnail,
      language: language.value,
      name: name,
      code: '',
    };

    try {
      fetch
        .createSketch(data)
        .then((res) => {
          if (!res.ok) throw new Error(`Failed to create user! Got status ${res.status}`);
          return res.json();
        })
        .then((json) => {
          const { uid, ...programData } = json;
          props.addProgram(uid, programData || {});
          props.setMostRecentProgram(uid);
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
    const icons = SketchThumbnailArray.map((val, index) => (
      <figure className="sketches-gallery-item" key={val} onClick={() => setThumbnail(index)}>
        <img
          src={`${process.env.PUBLIC_URL}/img/sketch-thumbnails/${val}.svg`}
          className={`sketches-gallery-img${thumbnail === index ? '-selected' : ''}`}
          alt="icon"
        />
      </figure>
    ));

    const thumbnailPreview =
      thumbnail !== -1 ? (
        <img
          src={`${process.env.PUBLIC_URL}/img/sketch-thumbnails/${SketchThumbnailArray[thumbnail]}.svg`}
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
              displayClass={'sketches'}
              toggleProps={toggleProps}
              onSelect={changeLanguage}
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
