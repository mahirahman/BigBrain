import React from 'react';
import { Button, ButtonGroup, Modal, InputGroup, Form, FormControl, ToggleButton } from 'react-bootstrap';
import PropTypes from 'prop-types'
import style from '../css/ModalMenu.module.css';
import { fileToDataUrl } from '../util/helper';

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

  const validateQuestionName = () => {
    if (!questionName.length) {
      alert('Please enter a name for your new game');
      return false;
    } else if (questionName.length > 64) {
      alert('Game name must be less than 64 characters');
      return false;
    }
    return true;
  };

  const validateQuestionTimeLimit = () => {
    if (timeLimit === null) {
      alert('Please enter a time limit for your question');
      return false;
    } else if (timeLimit < 10) {
      alert('Time limit must be at least 10 seconds');
      return false;
    } else if (timeLimit > 90) {
      alert('Time limit must not exceed 90 seconds');
      return false;
    }
    return true;
  };

  const validateQuestionPoints = () => {
    if (points === null) {
      alert('Please enter a point value for your question');
      return false;
    } else if (points < 1) {
      alert('Point value must be at least 1');
      return false;
    } else if (points > 10000) {
      alert('Point value must not exceed 10000');
      return false;
    }
    return true;
  };

  const validateYoutubeMedia = () => {
    const urlRegex = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    if (embedYoutubeMedia !== null && !embedYoutubeMedia.match(urlRegex)) {
      alert('Please enter a valid youtube link');
      return false;
    }
    return true;
  };

  const validateCorrectAnswer = () => {
    if (correctAnswer.length === 0) {
      alert('Please select a correct answer');
      return false;
    }
    const split = correctAnswer.split(',');

    // Convert the string of correct answers to an array of integers
    const arrOfCorrectAnswersNum = [];
    split.forEach(str => {
      arrOfCorrectAnswersNum.push(Number(str));
    });
    // Remove duplicates from the array of integers
    const uniqueCorrectAnswersNum = [...new Set(arrOfCorrectAnswersNum)];
    console.log(uniqueCorrectAnswersNum);

    // Check if the correct answers are in the answer inputs
    const correctAnswersInAnswerInputs = [];
    answerInputs.forEach(answer => {
      if (uniqueCorrectAnswersNum.includes(answer.id)) {
        correctAnswersInAnswerInputs.push(answer.id);
      }
    });
    console.log(correctAnswersInAnswerInputs);
    if (correctAnswersInAnswerInputs.length !== uniqueCorrectAnswersNum.length) {
      alert('Please select a correct answer that is in the answer inputs');
      return false;
    }

    if (questionType === 'single-choice') {
      if (correctAnswersInAnswerInputs.length > 1) {
        alert('Please select only 1 correct answer');
        return false;
      }
    } else if (questionType === 'multiple-choice') {
      if (correctAnswersInAnswerInputs.length < 2) {
        alert('Please select at least 2 correct answers');
        return false;
      } else if (correctAnswersInAnswerInputs.length > answerInputs.length) {
        alert('Please select no more than the number of answers');
        return false;
      }
    }
    return [true, correctAnswersInAnswerInputs];
  };

  const validateAnswerInputs = () => {
    // Check all the answer inputs for empty strings
    const emptyAnswerInputs = [];
    answerInputs.forEach(answer => {
      try {
        if (answer.answer.length === 0) {
          emptyAnswerInputs.push(answer.id);
        }
      } catch {
        emptyAnswerInputs.push(answer.id);
      }
    });
    if (emptyAnswerInputs.length > 0) {
      alert('Please enter an answer for all the answer inputs');
      return false;
    }
    return true;
  };

  const getBase64 = async (file) => {
    let base64Image;
    try {
      base64Image = await fileToDataUrl(embedImageMediaFileObj);
    } catch {
      base64Image = null;
    }
    return base64Image;
  };

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
    // (value === 'single-choice') ? setAnswerInputs() : setAnswerInputs([{ id: 1 }, { id: 2 }, { id: 3 }]);
  };

  const addAnswerInput = () => {
    if (answerInputs.length + 1 > 6) {
      alert('You can only have a maximum of 6 answers');
      return;
    }
    setAnswerInputs([...answerInputs, { id: answerInputs.length + 1 }]);
  };

  const removeAnswerInput = () => {
    if (questionType === 'single-choice' && answerInputs.length === 2) {
      alert('You must have at least 2 answers');
      return;
    } else if (questionType === 'multiple-choice' && answerInputs.length === 3) {
      alert('You must have at least 3 answers');
      return;
    }
    setAnswerInputs([...answerInputs.slice(0, answerInputs.length - 1)])
  };

  const updateAnswerInput = (answer, id) => {
    setAnswerInputs([...answerInputs.slice(0, id - 1), { id, answer }, ...answerInputs.slice(id)]);
  };

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

  const generateQuestionObject = async (correctAnswerValid) => {
    let embedMedia = null;
    if (radioValue === 'yt') {
      embedMedia = embedYoutubeMedia;
    } else if (radioValue === 'img') {
      embedMedia = await getBase64(embedImageMediaFileObj);
    }

    return {
      questionId: (props.questions).length + 1,
      question: questionName,
      type: questionType,
      answers: answerInputs,
      correctAnswer: correctAnswerValid,
      timeLimit: parseInt(timeLimit),
      points: parseInt(points),
      embed: embedMedia,
    };
  };

  const submitQuestion = async () => {
    // Validate each field
    if (!validateQuestionName()) return
    else if (!validateQuestionTimeLimit()) return
    else if (!validateQuestionPoints()) return
    else if (!validateAnswerInputs()) return
    else if (!validateCorrectAnswer()[0]) return
    else if (!validateYoutubeMedia()) return
    const correctAnswerValid = validateCorrectAnswer()[1];
    // If every field is valid, we can construct the question object
    const questionObj = await generateQuestionObject(correctAnswerValid);
    // Reset the form
    resetFormStates();
    // Add the question object to the questions array
    props.setQuestionsList([...props.questions, questionObj]);
    // Close the modal
    props.handleClose();
    console.log(questionObj);
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
          <InputGroup className={style.add_game_padding}>
            <InputGroup.Text>Question</InputGroup.Text>
            <FormControl placeholder="Start by typing your question" aria-label="Question"
            onChange={ (e) => setQuestionName(e.currentTarget.value)}/>
          </InputGroup>
          <div className={style.question_type_container}>
            <InputGroup.Text className={style.question_type_border}>Question Type</InputGroup.Text>
            <Form.Select className={`${style.add_game_padding} ${style.select_question_type_border}`} aria-label="Default select"
            onChange={ (e) => updateInputType(e.currentTarget.value)}>
              <option value="single-choice">Single Choice</option>
              <option value="multiple-choice">Multiple Choice</option>
            </Form.Select>
          </div>
          {answerInputs.map((answers) => (
            <InputGroup key={answers.id} className={style.add_game_padding}>
              <InputGroup.Text>Answer {answers.id}</InputGroup.Text>
              <FormControl aria-label="Answer" onChange={(e) => updateAnswerInput(e.currentTarget.value, answers.id)}/>
            </InputGroup>
          ))}
          <Button className={style.add_remove_input_box} variant='outline-danger' onClick={() => removeAnswerInput()}>Remove previous answer</Button>
          <Button className={style.add_remove_input_box} variant='outline-primary' onClick={() => addAnswerInput()}>Add another answer</Button>
          <InputGroup className={style.add_game_padding}>
            <InputGroup.Text>Correct Answer</InputGroup.Text>
            <FormControl placeholder='Correct answer(s) comma seperated' aria-label="Correct Answer" onChange={(e) => setCorrectAnswer(e.currentTarget.value)}/>
          </InputGroup>
          <InputGroup className={style.add_game_padding}>
            <InputGroup.Text>Time Limit</InputGroup.Text>
            <FormControl type="number" min="10" max="90" placeholder="Min: 10 secs, Max: 90 secs" aria-label="Time Limit"
            onChange={ (e) => setTimeLimit(e.currentTarget.value)}/>
          </InputGroup>
          <InputGroup className={style.add_game_padding}>
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
          <InputGroup className={style.add_game_padding}>
            <InputGroup.Text>Media</InputGroup.Text>
            <FormControl placeholder="Optionally attach a youtube video" aria-label="Media"
            onChange={(e) => setEmbedYoutubeMedia(e.currentTarget.value)}/>
          </InputGroup>
          }
          {radioValue === 'img' &&
            <InputGroup className={`${style.add_game_padding} ${style.input_spacing}`}>
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
