import React from 'react';
import { Button, ButtonGroup, Modal, InputGroup, Form, FormControl, ToggleButton } from 'react-bootstrap';
import PropTypes from 'prop-types'
import style from '../css/AddEditQuestion.module.css';
import {
  validateYoutubeMedia, validateQuestionName,
  validateQuestionTimeLimit, validateQuestionPoints,
  validateAnswerInputs, validateCorrectAnswer, getBase64
} from '../util/validate';

export function AddQuestionModal (props) {
  AddQuestionModal.propTypes = {
    questions: PropTypes.array,
    handleClose: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
    setQuestionsList: PropTypes.func
  };

  const [questionName, setQuestionName] = React.useState('');
  const [questionType, setQuestionType] = React.useState('single-choice');
  const [timeLimit, setTimeLimit] = React.useState(null);
  const [points, setPoints] = React.useState(null);
  // Default input is single choice which has minimum of 2 choices
  const [answerInputs, setAnswerInputs] = React.useState([{ id: 1 }, { id: 2 }]);
  const [correctAnswer, setCorrectAnswer] = React.useState('');
  // Check the current state of the embed media type
  const [radioValue, setRadioValue] = React.useState('yt');
  // Set the state of the youtube url
  const [embedYoutubeMedia, setEmbedYoutubeMedia] = React.useState(null);
  // Set the state of the image url
  const [embedImageMediaFileObj, setEmbedImageMediaFileObj] = React.useState({});

  const radios = [
    { name: 'Youtube Video', value: 'yt' },
    { name: 'Image', value: 'img' },
  ];

  const updateInputType = (value) => {
    setQuestionType(value);
    // if value is single-choice, remove every element after the second element
    if (value === 'single-choice') {
      setAnswerInputs(answerInputs.slice(0, 2));
    // if the value is multiple-choice, remove every element after the third element
    } else if (value === 'multiple-choice') {
      // if there is only two elements add a new element
      if (answerInputs.length === 2) {
        setAnswerInputs([...answerInputs, { id: 3 }]);
      } else {
        // if there are more than two elements, remove every element after the third element
        setAnswerInputs(answerInputs.slice(0, 3));
      }
    }
  };

  const addAnswerInput = () => {
    // Checks if user can add a new answer input
    if (answerInputs.length + 1 > 6) {
      alert('You can only have a maximum of 6 answers');
      return;
    }
    // Add answer input
    setAnswerInputs([...answerInputs, { id: answerInputs.length + 1 }]);
  };

  const removeAnswerInput = () => {
    // Checks user must have minimum input boxes depending on answer type
    if (questionType === 'single-choice' && answerInputs.length === 2) {
      alert('You must have at least 2 answers');
      return;
    } else if (questionType === 'multiple-choice' && answerInputs.length === 3) {
      alert('You must have at least 3 answers');
      return;
    }
    // Remove answer input
    setAnswerInputs([...answerInputs.slice(0, answerInputs.length - 1)])
  };

  // Updates the answer input value on change
  const updateAnswerInput = (answer, id) => {
    setAnswerInputs([...answerInputs.slice(0, id - 1), { id, answer }, ...answerInputs.slice(id)]);
  };

  // Reset all the input fields
  const resetFormStates = () => {
    setQuestionName('');
    setQuestionType('single-choice');
    setTimeLimit(null);
    setPoints(null);
    setAnswerInputs([{ id: 1 }, { id: 2 }]);
    setCorrectAnswer('');
    setRadioValue('yt');
    setEmbedYoutubeMedia(null);
    setEmbedImageMediaFileObj({});
  };

  // Generates the question object to be later passed to API
  const generateQuestionObject = async (correctAnswerValid) => {
    let embedMedia = null;
    if (radioValue === 'yt') {
      embedMedia = embedYoutubeMedia;
    } else if (radioValue === 'img') {
      embedMedia = await getBase64(embedImageMediaFileObj);
    }

    return {
      questionId: (Math.random() + 1).toString(36).substring(7),
      question: questionName,
      type: questionType,
      answers: answerInputs,
      correctAnswer: correctAnswerValid,
      timeLimit: parseInt(timeLimit),
      points: parseInt(points),
      embed: embedMedia,
    };
  };

  // Submits a question to the API
  const submitQuestion = async () => {
    // Validate each field
    if (!validateQuestionName(questionName)) return;
    else if (!validateQuestionTimeLimit(timeLimit)) return;
    else if (!validateQuestionPoints(points)) return;
    else if (!validateAnswerInputs(answerInputs)) return;
    if (!validateCorrectAnswer(correctAnswer, questionType, answerInputs)[0]) return;
    else if (!validateYoutubeMedia(embedYoutubeMedia)) {
      alert('Please enter a valid youtube link');
      return;
    }
    const correctAnswerValid = validateCorrectAnswer(correctAnswer, questionType, answerInputs)[1];
    // If every field is valid, we can construct the question object
    const questionObj = await generateQuestionObject(correctAnswerValid);
    // Reset the form
    resetFormStates();
    // Add the question object to the questions array
    props.setQuestionsList([...props.questions, questionObj]);
    // Close the modal
    props.handleClose();
  };

  return (
    <>
      <Modal show={props.show} onHide={ () => {
        resetFormStates();
        props.handleClose();
      }}>
        <Modal.Header closeButton>
          <Modal.Title>Add a new question</Modal.Title>
        </Modal.Header>
        <Modal.Body className={style.center_btn}>
          <InputGroup className={style.input_spacing}>
            <InputGroup.Text>Question</InputGroup.Text>
            <FormControl placeholder="Start by typing your question" aria-label="Question"
            onChange={ (e) => setQuestionName(e.currentTarget.value)}/>
          </InputGroup>
          <div className={style.question_type_container}>
            <InputGroup.Text className={style.question_type_border}>Question Type</InputGroup.Text>
            <Form.Select className={`${style.input_spacing} ${style.select_question_type_border}`} aria-label="Default select"
            onChange={ (e) => updateInputType(e.currentTarget.value)}>
              <option value="single-choice">Single Choice</option>
              <option value="multiple-choice">Multiple Choice</option>
            </Form.Select>
          </div>
          {answerInputs.map((answers) => (
            <InputGroup key={answers.id} className={style.input_spacing}>
              <InputGroup.Text>Answer {answers.id}</InputGroup.Text>
              <FormControl aria-label="Answer" onChange={(e) => updateAnswerInput(e.currentTarget.value, answers.id)}/>
            </InputGroup>
          ))}
          <Button className={style.add_remove_input_box} variant='outline-danger' onClick={() => removeAnswerInput()}>Remove Previous Answer</Button>
          <Button className={style.add_remove_input_box} variant='outline-primary' onClick={() => addAnswerInput()}>Add Another Answer</Button>
          <InputGroup className={style.input_spacing}>
            <InputGroup.Text>Correct Answer</InputGroup.Text>
            <FormControl placeholder='Correct answer(s) comma seperated' aria-label="Correct Answer" onChange={(e) => setCorrectAnswer(e.currentTarget.value)}/>
          </InputGroup>
          <InputGroup className={style.input_spacing}>
            <InputGroup.Text>Time Limit</InputGroup.Text>
            <FormControl type="number" min="10" max="90" placeholder="Min: 10 secs, Max: 90 secs" aria-label="Time Limit"
            onChange={ (e) => setTimeLimit(e.currentTarget.value)}/>
          </InputGroup>
          <InputGroup className={style.input_spacing}>
            <InputGroup.Text>Points</InputGroup.Text>
            <FormControl type="number" min="1" max="100" placeholder="How many points is this question worth?" aria-label="Points"
            onChange={ (e) => setPoints(e.currentTarget.value)}/>
          </InputGroup>
          <ButtonGroup className={style.embed_btn}>
          {radios.map((radio, idx) => (
            <ToggleButton
              key={idx}
              id={`radio-${idx}`}
              type="radio"
              variant={idx % 2 ? 'outline-success' : 'outline-danger'}
              name="radio"
              value={radio.value}
              checked={radioValue === radio.value}
              onChange={(e) => setRadioValue(e.currentTarget.value)}>
              {radio.name}
            </ToggleButton>
          ))}
          </ButtonGroup>
          {radioValue === 'yt' &&
          <InputGroup className={style.input_spacing}>
            <InputGroup.Text>Media</InputGroup.Text>
            <FormControl placeholder="Optionally attach a youtube video" aria-label="Media"
            onChange={(e) => setEmbedYoutubeMedia(e.currentTarget.value)}/>
          </InputGroup>
          }
          {radioValue === 'img' &&
            <InputGroup className={style.input_spacing}>
            <InputGroup.Text >Thumbnail</InputGroup.Text>
            <FormControl title="your text" type="file" accept="image/jpeg, image/png, image/jpg" aria-label="Thumbnail"
              onChange={event => setEmbedImageMediaFileObj(event.target.files[0])}/>
          </InputGroup>
          }
        </Modal.Body>
        <Modal.Footer>
          <Button variant='primary' onClick={() => { submitQuestion() }}>
            Add Question
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddQuestionModal;
