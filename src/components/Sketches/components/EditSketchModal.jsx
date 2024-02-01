import React, { useState } from 'react';
import ReactModal from 'react-modal';
import {
  Button, Container, Row, Col, FormGroup, Label, Input,
} from 'reactstrap';
import { ThumbnailArray } from '../../../constants';
import * as fetch from '../../../lib/fetch';
import DropdownButton from '../../common/DropdownButton';
import ImageSelector from '../../common/ImageSelector';
import { LanguageDropdownValues } from '../constants';

import '../../../styles/SketchesModal.scss';

const EditSketchModal = (props) => {
  const {
    isOpen,
    onClose,
    setProgramLanguage,
    setProgramName,
    setProgramThumbnail,
    sketchImg,
    sketchKey,
    sketchLang,
    sketchName,
    uid,
  } = props;
  const toggleProps = { className: '', color: 'primary', size: 'lg' };

  const [newLanguage, setNewLanguage] = useState(-1);
  const [newName, setNewName] = useState(-1);
  const [newThumbnail, setNewThumbnail] = useState(-1);
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [error, setError] = useState('');
  const [onThumbnails, setOnThumbnails] = useState(false);

  const closeModal = () => {
    if (onClose && {}.toString.call(onClose) === '[object Function]') {
      onClose();
    }
    setNewLanguage(-1);
    setNewName(-1);
    setNewThumbnail(-1);
    setError('');
    setOnThumbnails(false);
    setDisableSubmit(false);
  };

  // Next two bad____input are copied (and slightly modified) from create sketch modal

  const badNameInput = () => {
    if (newName === -1) {
      return false;
    }
    if (!newName) {
      setError('Name is required');
      return true;
    }
    if (newName.length > 15) {
      setError('Name must be 15 characters or less');
      return true;
    }
    return false;
  };

  const badLanguageInput = () => {
    if (newLanguage === -1) {
      return false;
    }
    if (!newLanguage) {
      setError('Please select a language');
      return true;
    }

    const noMatch = !LanguageDropdownValues.some(
      (l) => l.display === newLanguage.display && l.value === newLanguage.value,
    );
    if (noMatch) {
      setError('Invalid language selected');
      return true;
    }

    return false;
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();

    if (badNameInput() || badLanguageInput()) {
      // note it's impossible to have a bad thumbnail input
      return;
    }

    const data = {};
    let doUpdate = false;

    if (newLanguage !== -1) {
      data.language = newLanguage.value;
      doUpdate = true;
    }
    if (newName !== -1) {
      data.name = newName;
      doUpdate = true;
    }
    if (newThumbnail !== -1) {
      data.thumbnail = newThumbnail;
      doUpdate = true;
    }
    if (doUpdate) {
      const updateData = {};
      updateData[sketchKey] = data;
      try {
        fetch
          .updatePrograms(uid, updateData)
          .then((res) => {
            if (res.ok) {
              if (newLanguage !== -1) {
                setProgramLanguage(sketchKey, newLanguage.value);
              }
              if (newName !== -1) {
                setProgramName(sketchKey, newName);
              }
              if (newThumbnail !== -1) {
                setProgramThumbnail(sketchKey, newThumbnail);
              }
              closeModal();
            } else {
              setDisableSubmit(false);
              setError(res.text() || 'Failed to edit sketch, please try again later');
            }
          })
          .catch((err) => {
            setDisableSubmit(false);
            setError('Failed to edit sketch, please try again later');
            console.error(err);
          });
      } catch (err) {
        console.error(err);
      }
      setDisableSubmit(true);
      setError('');
    } else {
      closeModal();
    }
  };

  const renderMainModal = () => {
    const thumbnailPreview = (
      <img
        src={`/img/sketch-thumbnails/${
          newThumbnail !== -1 ? ThumbnailArray[newThumbnail] : sketchImg
        }.svg`}
        className="sketches-modal-header-thumbnail"
        alt="icon"
      />
    );
    return (
      <ReactModal
        isOpen={isOpen}
        onRequestClose={closeModal}
        className="sketches-modal"
        overlayClassName="profile-image-overlay"
        ariaHideApp={false}
      >
        <Container>
          <h2 className="text-center">
            Editing &quot;
            {sketchName}
            &quot;
          </h2>
          <hr />
          <FormGroup row>
            <Label className="text-right" for="sketch-name" xs={4}>
              Name
            </Label>
            <Col xs={8}>
              <Input
                onChange={(e) => setNewName(e.target.value)}
                value={newName !== -1 ? newName : sketchName}
                id="sketch-name"
              />
            </Col>
          </FormGroup>
          <br />
          <Row>
            <Col xs="4" className="text-right">
              Language
            </Col>
            <Col xs="8" className="d-flex align-items-center">
              <DropdownButton
                displayValue={newLanguage !== -1 ? newLanguage.display : sketchLang}
                displayClass="sketches"
                toggleProps={toggleProps}
                onSelect={setNewLanguage}
                DropdownItems={LanguageDropdownValues}
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col xs="4" className="text-right">
              <div
                className="sketches-modal-header-thumbnail-container"
                style={{ display: 'block', marginLeft: 'auto', marginRight: '0' }}
              >
                {thumbnailPreview}
              </div>
            </Col>
            <Col xs="8" className="d-flex align-items-center">
              <Button
                color="primary"
                size="lg"
                onClick={() => setOnThumbnails(true)}
                onKeyDown={() => setOnThumbnails(true)}
                tabIndex="0"
              >
                Change
              </Button>
            </Col>
          </Row>
          <br />
          <div className="text-center text-danger">{error || <br />}</div>
          <hr />
          <Row>
            <Col>
              <Button
                color="danger"
                onClick={closeModal}
                onKeyDown={closeModal}
                tabIndex="0"
                size="lg"
                disabled={disableSubmit}
                block
              >
                Cancel
              </Button>
            </Col>
            <Col>
              <Button
                color="success"
                onClick={handleSubmitEdit}
                onKeyDown={handleSubmitEdit}
                tabIndex="0"
                size="lg"
                disabled={disableSubmit}
                block
              >
                Confirm
              </Button>
            </Col>
          </Row>
        </Container>
      </ReactModal>
    );
  };

  const renderThumbnailModal = () => {
    const icons = ThumbnailArray.map((val, index) => (
      <figure
        role="presentation"
        className="sketches-gallery-item"
        key={val}
        onClick={() => setNewThumbnail(index)}
        onKeyDown={() => setNewThumbnail(index)}
      >
        <img
          src={`/img/sketch-thumbnails/${val}.svg`}
          className={`sketches-gallery-img${newThumbnail === index ? '-selected' : ''}`}
          alt="icon"
        />
      </figure>
    ));

    const thumbnailPreview = newThumbnail !== -1 ? (
      <img
        src={`/img/sketch-thumbnails/${ThumbnailArray[newThumbnail]}.svg`}
        className="sketches-modal-header-thumbnail"
        alt="icon"
      />
    ) : (
      <img
        src={`/img/sketch-thumbnails/${sketchImg}.svg`}
        className="sketches-modal-header-thumbnail"
        alt="icon"
      />
    );
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
            <Button
              color="secondary"
              onClick={() => {
                setOnThumbnails(false);
              }}
              onKeyDown={() => setOnThumbnails(false)}
              tabIndex="0"
              size="lg"
              block
            >
              Back
            </Button>
            {' '}
          </Col>
        </Row>
      </ImageSelector>
    );
  };
  if (onThumbnails) {
    return renderThumbnailModal();
  }

  return renderMainModal();
};

export default EditSketchModal;
