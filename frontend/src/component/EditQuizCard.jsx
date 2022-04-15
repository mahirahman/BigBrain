import React from 'react';
import { Button, Card, FormControl, InputGroup } from 'react-bootstrap';
import PropTypes from 'prop-types'
import style from '../css/EditQuizCard.module.css';
import styled from 'styled-components';
import { updateQuizAPI } from '../util/api';
import { fileToDataUrl } from '../util/helper';

const CardFilter = styled.div`filter: hue-rotate(${props => props.colour}deg)`;

export function EditQuestionCard (props) {
  EditQuestionCard.propTypes = {
    quizID: PropTypes.string.isRequired,
    name: PropTypes.string,
    thumbnail: PropTypes.string.isRequired,
    randColour: PropTypes.number.isRequired,
  };

  const [quizName, setQuizName] = React.useState(props.name);
  const [quizThumbnailBase64, setQuizThumbnailBase64] = React.useState(props.thumbnail);
  const [quizThumbnailFileObj, setQuizThumbnailFileObj] = React.useState({});
  // const [defaultImageColour, setDefaultImageColour] = React.useState(props.randColour);
  // console.log(props.randColour);
  // console.log(defaultImageColour);

  const updateData = async (base64Image) => {
    const data = await updateQuizAPI(props.quizID, null, quizName, base64Image);
    if (data.error) {
      alert(data.error);
    }
    console.log(base64Image);
    if (base64Image) {
      setQuizThumbnailBase64(base64Image);
      // setDefaultImageColour(0);
      // console.log(defaultImageColour);
    }
  }

  const updateQuizDetails = async () => {
    if (quizName.length > 64) {
      alert('Quiz name must be less than 64 characters');
      return;
    }
    let base64Image;
    try {
      base64Image = await fileToDataUrl(quizThumbnailFileObj);
    } catch {
      base64Image = null;
    }
    updateData(base64Image);
  }

  React.useEffect(() => {
    setQuizThumbnailBase64(props.thumbnail);
    setQuizName(props.name);
  }
  , [props])

  return (
    <>
      <Card className={style.card_container}>
        <Card.Header>Edit Quiz</Card.Header>
        <Card.Body className={style.card_body_container}>
          <CardFilter colour = {props.randColour}>
            <img className={style.image_dimensions} src={quizThumbnailBase64} alt="Quiz Thumbnail"/>
          </CardFilter>
          <div className={style.quiz_update_details}>
            <InputGroup className={style.input_spacing}>
              <InputGroup.Text >Quiz Name</InputGroup.Text>
              <FormControl placeholder={quizName} aria-label="Quiz Name" onChange={event => setQuizName(event.target.value)}/>
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
    </>
  )
}

export default EditQuestionCard;
