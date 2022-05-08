import React from 'react';
import { Button, Card, FormControl, InputGroup } from 'react-bootstrap';
import PropTypes from 'prop-types'
import style from '../css/EditQuizCard.module.css';
import styled from 'styled-components';
import { updateQuizAPI } from '../util/api';
import { fileToDataUrl } from '../util/helper';
import Notification from './Notification';
import LoadingWheel from './LoadingWheel';

const CardFilter = styled.div`filter: hue-rotate(${props => props.colour}deg)`;

export function EditQuizCard (props) {
  EditQuizCard.propTypes = {
    quizID: PropTypes.string.isRequired,
    name: PropTypes.string,
    thumbnail: PropTypes.string.isRequired,
    randColour: PropTypes.number.isRequired,
  };

  const [quizName, setQuizName] = React.useState(props.name);
  const [quizThumbnailBase64, setQuizThumbnailBase64] = React.useState(props.thumbnail);
  const [quizThumbnailFileObj, setQuizThumbnailFileObj] = React.useState({});

  const [showNotification, setShowNotification] = React.useState(false);
  const [notifcationMsg, setNotifcationMsg] = React.useState('');
  const [notificationTitle, setNotifcationTitle] = React.useState('');
  const [variant, setVariant] = React.useState('primary');
  const [error, setError] = React.useState(true);

  // Adds a custom notification to the page
  const addNotification = (title, msg, variant, error) => {
    setNotifcationTitle(title);
    setNotifcationMsg(msg);
    setVariant(variant);
    setError(error);
    setShowNotification(true);
  };

  const [defaultImageColour, setDefaultImageColour] = React.useState(props.randColour);

  // Update the quiz name and image using the API
  const updateData = async (base64Image) => {
    const data = await updateQuizAPI(props.quizID, null, quizName, base64Image);
    if (data.error) {
      addNotification('Error', data.error, 'danger', true);
      return;
    }
    if (base64Image) {
      setQuizThumbnailBase64(base64Image);
      setDefaultImageColour(0);
    }
  }

  // Update the state variables for name and image
  const updateQuizDetails = async () => {
    // Validate the name length
    if (quizName.length < 4) {
      addNotification('Error', 'Please enter a name with at least 4 characters', 'danger', true);
      return;
    } else if (quizName.length > 36) {
      addNotification('Error', 'Quiz name must be less than 36 characters', 'danger', true);
      return;
    }
    // Attempt to create a base64 image from file object
    let base64Image;
    try {
      base64Image = await fileToDataUrl(quizThumbnailFileObj);
    } catch {
      base64Image = null;
    }
    updateData(base64Image);
    addNotification('Success', 'Quiz updated successfully', 'success', false);
  }

  // Set the current quiz thumbnail and name when props load
  React.useEffect(() => {
    setQuizThumbnailBase64(props.thumbnail);
    setQuizName(props.name);
  }
  , [props]);

  return (
    <>
      <Card className={style.card_container}>
        <Card.Header>Edit Game</Card.Header>
        <Card.Body className={style.card_body_container}>
          {isNaN(props.randColour) && props.thumbnail.includes('no_thumbnail')
          ? <LoadingWheel variant='dark'/>
          : <CardFilter colour = {isNaN(defaultImageColour) ? props.randColour : defaultImageColour}>
            <img className={style.image_dimensions} src={quizThumbnailBase64} alt="Quiz Thumbnail"/>
            </CardFilter>}
          <div className={style.quiz_update_details}>
            <InputGroup className={style.input_spacing}>
              <InputGroup.Text >Quiz Name</InputGroup.Text>
              <FormControl placeholder={!quizName ? 'Loading...' : quizName} aria-label="Quiz Name" onChange={event => setQuizName(event.target.value)}/>
            </InputGroup>
            <InputGroup className={style.input_spacing}>
              <InputGroup.Text >Thumbnail</InputGroup.Text>
              <FormControl type="file" accept="image/jpeg, image/png, image/jpg" aria-label="Quiz Name"
              onChange={event => setQuizThumbnailFileObj(event.target.files[0])}/>
            </InputGroup>
            <Button variant="success" className={style.save_changes} onClick={updateQuizDetails}>Save Changes</Button>
          </div>
        </Card.Body>
      </Card>
      <Notification
        setShowNotification={setShowNotification}
        showNotification={showNotification}
        message={notifcationMsg}
        notificationTitle={notificationTitle}
        variant={variant}
        error={error}
      />
    </>
  )
}

export default EditQuizCard;
