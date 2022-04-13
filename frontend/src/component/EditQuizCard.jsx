import React from 'react';
import { Button, Card, FormControl, InputGroup } from 'react-bootstrap';
import PropTypes from 'prop-types'
import style from '../css/EditQuizCard.module.css';
import styled from 'styled-components';
import { updateQuizAPI } from '../api';
import { fileToDataUrl } from '../helper';
import { MdQuiz } from 'react-icons/md';

const CardFilter = styled.div`filter: hue-rotate(${props => props.colour}deg)`;

export function EditQuizCard (props) {
  EditQuizCard.propTypes = {
    quizID: PropTypes.string.isRequired,
    name: PropTypes.string,
    thumbnail: PropTypes.string.isRequired,
    randColour: PropTypes.number.isRequired,
    questions: PropTypes.array,
  };

  const [quizName, setQuizName] = React.useState(props.name);
  const [quizThumbnailBase64, setQuizThumbnailBase64] = React.useState(props.thumbnail);
  const [quizThumbnailFileObj, setQuizThumbnailFileObj] = React.useState({});

  const fetchData = async (base64Image) => {
    const data = await updateQuizAPI(props.quizID, null, quizName, base64Image);
    if (data.error) {
      alert(data.error);
    }
    if (base64Image) setQuizThumbnailBase64(base64Image);
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
    fetchData(base64Image);
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

      <Card className={style.card_container}>
        <Card.Header>Edit Questions</Card.Header>
        <Card.Body>
          <div className={style.add_question}>
            <Button variant="primary"><MdQuiz className={style.quiz_icon}/>Add New Question</Button>
          </div>
        </Card.Body>
        {/* Render when there is no questions otherwise render question cards */}
        {JSON.stringify(props.questions) === '[]'
          ? <div className={style.no_question_text}>No Questions here 😴</div>
          : <div className={style.no_question_text}>{JSON.stringify(props.questions)}</div>
        }
      </Card>
    </>
  )
}

export default EditQuizCard;
