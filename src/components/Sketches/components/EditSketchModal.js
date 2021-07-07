import React from 'react';
import ReactModal from 'react-modal';
import { Button, Container, Row, Col, FormGroup, Label, Input } from 'reactstrap';

import * as fetch from '../../../lib/fetch.js';
import ImageSelector from '../../common/ImageSelector';
import { SketchThumbnailArray, LanguageDropdownValues } from '../constants';
import DropdownButton from '../../common/DropdownButton.js';
import '../../../styles/SketchesModal.scss';

class EditSketchModal extends React.Component {
  toggleProps = { className: '', color: 'primary', size: 'lg' };

  constructor(props) {
    super(props);
    this.state = {
      newLanguage: -1,
      newName: -1,
      newThumbnail: -1,
      disableSubmit: false,
      error: '',
      onThumbnails: false,
    };
  }

  closeModal = () => {
    if (this.props.onClose && {}.toString.call(this.props.onClose) === '[object Function]') {
      this.props.onClose();
    }
    this.setState({
      newLanguage: -1,
      newName: -1,
      newThumbnail: -1,
      error: '',
      onThumbnails: false,
      disableSubmit: false,
    });
  };

  changeLanguage = (lang) => {
    this.setState({ newLanguage: lang });
  };

  // Next two bad____input are copied (and slightly modified) from create sketch modal

  badNameInput = () => {
    if (this.state.newName === -1) {
      return false;
    }
    if (!this.state.newName) {
      this.setState({ error: 'Name is required' });
      return true;
    }
    if (this.state.newName.length > 15) {
      this.setState({ error: 'Name must be 15 characters or less' });
      return true;
    }
    return false;
  };

  badLanguageInput = () => {
    if (this.state.newLanguage === -1) {
      return false;
    }
    if (!this.state.newLanguage) {
      this.setState({ error: 'Please select a language' });
      return true;
    }

    let notFound = true;
    for (let i = 0; i < LanguageDropdownValues.length; i++) {
      if (
        this.state.newLanguage.display === LanguageDropdownValues[i].display &&
        this.state.newLanguage.value === LanguageDropdownValues[i].value
      ) {
        notFound = false;
        break;
      }
    }
    if (notFound) {
      this.setState({ error: 'Invalid language selected' });
      return true;
    }

    return false;
  };

  handleSubmitEdit = async (e) => {
    e.preventDefault();

    if (this.badNameInput() || this.badLanguageInput()) {
      // note it's impossible to have a bad thumbnail input
      return;
    }

    const data = {};
    let doUpdate = false;

    if (this.state.newLanguage !== -1) {
      data.language = this.state.newLanguage.value;
      doUpdate = true;
    }
    if (this.state.newName !== -1) {
      data.name = this.state.newName;
      doUpdate = true;
    }
    if (this.state.newThumbnail !== -1) {
      data.thumbnail = this.state.newThumbnail;
      doUpdate = true;
    }
    if (doUpdate) {
      const updateData = {};
      updateData[this.props.sketchKey] = data;
      try {
        fetch
          .updatePrograms(this.props.uid, updateData)
          .then((res) => {
            if (res.ok) {
              if (this.state.newLanguage !== -1) {
                this.props.setProgramLanguage(this.props.sketchKey, this.state.newLanguage.value);
              }
              if (this.state.newName !== -1) {
                this.props.setProgramName(this.props.sketchKey, this.state.newName);
              }
              if (this.state.newThumbnail !== -1) {
                this.props.setProgramThumbnail(this.props.sketchKey, this.state.newThumbnail);
              }
              this.closeModal();
            } else {
              this.setState({
                disableSubmit: false,
                error: res.text() || 'Failed to edit sketch, please try again later',
              });
            }
          })
          .catch((err) => {
            this.setState({
              disableSubmit: false,
              error: 'Failed to edit sketch, please try again later',
            });
            console.log(err);
          });
      } catch (err) {
        console.log(err);
      }
      this.setState({ disableSubmit: true, error: '' });
    } else {
      this.closeModal();
    }
  };

  renderMainModal() {
    const thumbnailPreview = (
      <img
        src={`${process.env.PUBLIC_URL}/img/sketch-thumbnails/${
          this.state.newThumbnail !== -1
            ? SketchThumbnailArray[this.state.newThumbnail]
            : this.props.sketchImg
        }.svg`}
        className="sketches-modal-header-thumbnail"
        alt="icon"
      />
    );
    return (
      <ReactModal
        isOpen={this.props.isOpen}
        onRequestClose={this.closeModal}
        className="sketches-modal"
        overlayClassName="profile-image-overlay"
        ariaHideApp={false}
      >
        <Container>
          <h2 className="text-center">
            Editing &quot;
            {this.props.sketchName}
            &quot;
          </h2>
          <hr />
          <FormGroup row>
            <Label className="text-right" for="sketch-name" xs={4}>
              Name
            </Label>
            <Col xs={8}>
              <Input
                onChange={(e) => this.setState({ newName: e.target.value })}
                value={this.state.newName !== -1 ? this.state.newName : this.props.sketchName}
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
                displayValue={
                  this.state.newLanguage !== -1
                    ? this.state.newLanguage.display
                    : this.props.sketchLang
                }
                displayClass={'sketches'}
                toggleProps={this.toggleProps}
                onSelect={this.changeLanguage}
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
                onClick={() => {
                  this.setState({ onThumbnails: true });
                }}
              >
                Change
              </Button>
            </Col>
          </Row>
          <br />
          <div className="text-center text-danger">{this.state.error || <br />}</div>
          <hr />
          <Row>
            <Col>
              <Button
                color="danger"
                onClick={this.closeModal}
                size="lg"
                disabled={this.state.disableSubmit}
                block
              >
                Cancel
              </Button>
            </Col>
            <Col>
              <Button
                color="success"
                onClick={this.handleSubmitEdit}
                size="lg"
                disabled={this.state.disableSubmit}
                block
              >
                Confirm
              </Button>
            </Col>
          </Row>
        </Container>
      </ReactModal>
    );
  }

  renderThumbnailModal() {
    const icons = SketchThumbnailArray.map((val, index) => (
      <figure
        className="sketches-gallery-item"
        key={val}
        onClick={() => this.setState({ newThumbnail: index })}
      >
        <img
          src={`${process.env.PUBLIC_URL}/img/sketch-thumbnails/${val}.svg`}
          className={`sketches-gallery-img${this.state.newThumbnail === index ? '-selected' : ''}`}
          alt="icon"
        />
      </figure>
    ));

    const thumbnailPreview =
      this.state.newThumbnail !== -1 ? (
        <img
          src={`${process.env.PUBLIC_URL}/img/sketch-thumbnails/${
            SketchThumbnailArray[this.state.newThumbnail]
          }.svg`}
          className="sketches-modal-header-thumbnail"
          alt="icon"
        />
      ) : (
        <img
          src={`${process.env.PUBLIC_URL}/img/sketch-thumbnails/${this.props.sketchImg}.svg`}
          className="sketches-modal-header-thumbnail"
          alt="icon"
        />
      );
    return (
      <ImageSelector
        isOpen={this.props.isOpen}
        closeModal={this.closeModal}
        thumbnailPreview={thumbnailPreview}
        icons={icons}
        error={this.state.error}
      >
        <Row>
          <Col>
            <Button
              color="secondary"
              onClick={() => {
                this.setState({ onThumbnails: false });
              }}
              size="lg"
              block
            >
              Back
            </Button>{' '}
          </Col>
        </Row>
      </ImageSelector>
    );
  }

  render() {
    if (this.state.onThumbnails) {
      return this.renderThumbnailModal();
    }

    return this.renderMainModal();
  }
}

export default EditSketchModal;
