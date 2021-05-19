import { programUploadSuccess } from 'actions/userDataActions.js';
import React, { useState } from 'react';
import ReactModal from 'react-modal';
import { Container, Row, Col, Button } from 'reactstrap';
import * as fetch from '../../../lib/fetch.js';

const ConfirmDeleteModal = (props) => {
  // extract props
  // add props section in later if I want to?
  //const {
  //onClose, uid, sketchKey, programKeys
  //} = props;

  const [spinner, setSpinner] = useState(true);
  const [error, setError] = useState('');

  const closeModal = () => {
    if (props.onClose && {}.toString.call(props.onClose) === '[object Function]') {
      props.onClose();
    }
  };

  const onDeleteSubmit = () => {
    const data = {
      uid: props.uid,
      docID: props.sketchKey,
      name: props.sketchKey,
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

          props.deleteProgram(props.sketchKey);

          // this next piece of code is a guard against deleting mostRecentProgram - if we do,
          // then we need to re-populate it with something different.
          if (props.sketchKey === props.mostRecentProgram && props.programKeys.size > 0) {
            props.setMostRecentProgram(props.programKeys.get(0));
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
      isOpen={props.isOpen}
      onRequestClose={closeModal}
      className="sketches-modal"
      ariaHideApp={false}
    >
      <Container>
        <h2 className="text-center">
          Are you sure you want to delete &quot;
          {props.sketchName}
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
