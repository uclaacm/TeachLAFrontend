import { useState } from 'react';
import ReactModal from 'react-modal';
import {
  Container, Row, Col, Button,
} from 'reactstrap';
import * as fetch from '../../../lib/fetch';

const ConfirmDeleteModal = (props) => {
  const {
    onClose, isOpen, sketchName, uid, sketchKey, deleteProgram,
  } = props;

  const [_spinner, setSpinner] = useState(true);
  const [_error, setError] = useState('');

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
          if (res.ok) {
            deleteProgram(sketchKey);
            closeModal();
          } else {
            setSpinner(false);
            setError(res.text() || 'Failed to delete sketch, please try again later');
          }
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
