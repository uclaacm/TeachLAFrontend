import React, { useState } from 'react';
import ReactModal from 'react-modal';
import {
  Container, Row, Col, Button,
} from 'reactstrap';
import * as fetch from '../../../lib/fetch';

const ConfirmDeleteModal = (props) => {
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
    setUserDataError,
  } = props;

  const [_spinner, setSpinner] = useState(true);
  const [_error, setError] = useState('');

  const closeModal = () => {
    if (onClose && {}.toString.call(onClose) === '[object Function]') {
      onClose();
    }
  };

  const handleSetMostRecentProgram = (program) => {
    try {
      fetch
      .updateUserData(uid, { mostRecentProgram: program })
      .catch((err) => {
        setUserDataError(err);
        console.log(err);
      });
    } catch (err) {
      console.log(err);
    }
    setMostRecentProgram(program);
  }

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
          if (programKeys.size > 0 && sketchKey === mostRecentProgram) {
            if (sketchKey === programKeys.get(0)) {
              handleSetMostRecentProgram(programKeys.get(1));
            } else {
              handleSetMostRecentProgram(programKeys.get(0));
            }
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
