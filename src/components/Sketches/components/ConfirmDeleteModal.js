import React, { useState } from 'react';
import ReactModal from 'react-modal';
import {
  Container, Row, Col, Button,
} from 'reactstrap';
import * as fetch from '../../../lib/fetch.js';

const ConfirmDeleteModal = function (props) {
  const {
    onClose,
    isOpen,
    sketchName,
    uid,
    sketchKey,
    deleteProgram,
    mostRecentProgram,
    programKeys,
    setMostRecentProgram,
  } = props;

  const [spinner, setSpinner] = useState(true);
  const [error, setError] = useState('');

  const closeModal = () => {
    if (onClose && {}.toString.call(onClose) === '[object Function]') {
      onClose();
    }
  };

  const onDeleteSubmit = () => {
    const data = {
      uid,
      docID: sketchKey,
      name: sketchKey,
    };
    try {
      fetch
        .deleteSketch(data)
        .then((res) => {
          if (!res.ok) {
            setSpinner(false);
            setError(res.text() || 'Failed to delete sketch, please try again later');
            return;
          }

          deleteProgram(sketchKey);

          // this next piece of code is a guard against deleting mostRecentProgram - if we do,
          // then we need to re-populate it with something different.
          if (sketchKey === mostRecentProgram && programKeys.size > 0) {
            setMostRecentProgram(programKeys.get(0));
          }

          closeModal();
        })
        .catch((err) => {
          setSpinner(false);
          setError('Failed to create sketch, please try again later');
          console.error(err);
        });
    } catch (err) {
      console.error(err);
    }
    setSpinner(true);
    setError('');
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={closeModal}
      className="sketches-modal"
      ariaHideApp={false}
    >
      <Container>
        <h2 className="text-center">
          Are you sure you want to delete &quot;
          {sketchName}
          &quot;?
        </h2>
        <hr />
        <Row>
          <Col>
            <Button color="secondary" onClick={closeModal} size="lg" block>
              No thanks!
            </Button>
          </Col>
          <Col>
            <Button color="danger" onClick={onDeleteSubmit} size="lg" block>
              Delete Forever!
            </Button>
          </Col>
        </Row>
      </Container>
    </ReactModal>
  );
};

export default ConfirmDeleteModal;
