import React from 'react';
import PropTypes from 'prop-types'
import { Button, ButtonGroup, Card, Form, FormControl, InputGroup, ToggleButton } from 'react-bootstrap';
import {
  validateYoutubeMedia, validateQuestionName,
  validateQuestionTimeLimit, validateQuestionPoints,
  validateAnswerInputs, validateCorrectAnswer, getBase64
} from '../util/validate';
import { updateQuizAPI } from '../util/api';
import style from '../css/AddEditQuestion.module.css';
import { useNavigate } from 'react-router-dom';
import LoadingWheel from './LoadingWheel';

function EditQuestionCard (props) {
  EditQuestionCard.propTypes = {
    quizId: PropTypes.string.isRequired,
    questionData: PropTypes.object.isRequired,
    questionList: PropTypes.array.isRequired,
  };

  const navigate = useNavigate();
  const [radioValue, setRadioValue] = React.useState('yt');
  const radios = [
    { name: 'Youtube Video', value: 'yt' },
    { name: 'Image', value: 'img' },
  ];
  // Set the state of the youtube url
  const [embedYoutubeMedia, setEmbedYoutubeMedia] = React.useState(null);
  // Set the state of the image url
  const [embedImageMediaFileObj, setEmbedImageMediaFileObj] = React.useState({});
  const [embedImageMediaBase64, setEmbedImageMediaBase64] = React.useState({});

  const [questionName, setQuestionName] = React.useState('');
  const [answerInputs, setAnswerInputs] = React.useState([{ id: 1 }, { id: 2 }]);
  const [questionType, setQuestionType] = React.useState('');
  const [correctAnswer, setCorrectAnswer] = React.useState('');
  const [timeLimit, setTimeLimit] = React.useState(null);
  const [points, setPoints] = React.useState(null);

  // Set the default input fields when props are loaded in
  React.useEffect(() => {
    setQuestionName(props.questionData.question);
    setAnswerInputs(props.questionData.answers);
    setQuestionType(props.questionData.type);
    setCorrectAnswer(props.questionData.correctAnswer ? props.questionData.correctAnswer.join(',') : 'Loading...');
    setTimeLimit(props.questionData.timeLimit);
    setPoints(props.questionData.points);
    if (validateYoutubeMedia(props.questionData.embed ? props.questionData.embed : null)) {
      setEmbedYoutubeMedia(props.questionData.embed);
    }
    const base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
    setEmbedImageMediaBase64(base64regex.test(props.questionData.embed) ? 'Loading...' : props.questionData.embed);
  }, [props]);

  // Updates the input type
  const updateInputType = (value) => {
    setQuestionType(value);
    // If value is single-choice, remove every element after the second element
    if (value === 'single-choice') {
      setAnswerInputs(answerInputs.slice(0, 2));
    // If the value is multiple-choice, remove every element after the third element
    } else if (value === 'multiple-choice') {
      // If there is only two elements add a new element
      if (answerInputs.length === 2) {
        setAnswerInputs([...answerInputs, { id: 3 }]);
      } else {
        // If there are more than two elements, remove every element after the third element
        setAnswerInputs(answerInputs.slice(0, 3));
      }
    }
  };

  // Add answer input
  const addAnswerInput = () => {
    // Maximum of 6 answer inputs for all question types
    if (answerInputs.length + 1 > 6) {
      alert('You can only have a maximum of 6 answers');
      return;
    }
    setAnswerInputs([...answerInputs, { id: answerInputs.length + 1 }]);
  };

  // Remove answer input
  const removeAnswerInput = () => {
    // Check the minimum answer inputs for each type
    if (questionType === 'single-choice' && answerInputs.length === 2) {
      alert('You must have at least 2 answers');
      return;
    } else if (questionType === 'multiple-choice' && answerInputs.length === 3) {
      alert('You must have at least 3 answers');
      return;
    }
    // Set the new answer input
    setAnswerInputs([...answerInputs.slice(0, answerInputs.length - 1)])
  };

  // Updates the value in the answer input
  const updateAnswerInput = (answer, id) => {
    setAnswerInputs([...answerInputs.slice(0, id - 1), { id, answer }, ...answerInputs.slice(id)]);
  };

  // Generates the question object
  const generateQuestionObject = async (correctAnswerValid) => {
    let embedMedia = null;
    if (radioValue === 'yt') {
      embedMedia = embedYoutubeMedia;
    } else if (radioValue === 'img') {
      embedMedia = await getBase64(embedImageMediaFileObj);
    } else if (!embedMedia) {
      embedMedia = embedImageMediaBase64;
    }

    return {
      questionId: props.questionData.questionId,
      question: questionName,
      type: questionType,
      answers: answerInputs,
      correctAnswer: correctAnswerValid,
      timeLimit: parseInt(timeLimit),
      points: parseInt(points),
      embed: embedMedia,
    };
  };

  // Submit the question to the API
  const submitQuestion = async () => {
    // Validate each field
    if (!validateQuestionName(questionName)) return;
    else if (!validateQuestionTimeLimit(timeLimit)) return;
    else if (!validateQuestionPoints(points)) return;
    else if (!validateAnswerInputs(answerInputs)) return;
    else if (!validateCorrectAnswer(correctAnswer, questionType, answerInputs)[0]) return;
    else if (!validateYoutubeMedia(embedYoutubeMedia)) {
      alert('Please enter a valid youtube link');
      return;
    }
    const correctAnswerValid = validateCorrectAnswer(correctAnswer, questionType, answerInputs)[1];
    // If every field is valid, we can construct the question object
    const questionObj = await generateQuestionObject(correctAnswerValid);
    // Find props.questionData.questionId in props.questionList and replace it with questionObj
    // console.log(props.questionData.questionId);
    // console.log(props.questionList);
    // console.log(questionObj);
    // Find the correct index of the question and replace it with the new question object
    props.questionList.forEach((question, index) => {
      if (question.questionId === props.questionData.questionId) {
        props.questionList[index] = questionObj;
      }
    });
    const data = await updateQuizAPI(props.quizId, props.questionList, null, null);
    if (data.error) {
      navigate('/quizzes');
    }
  };

  return (
    <>
      <Card className={style.container}>
        <Card.Header>Edit Question</Card.Header>
        <Card.Body className={style.center_btn}>
        <InputGroup className={style.input_spacing}>
            <InputGroup.Text>Question</InputGroup.Text>
            <FormControl placeholder={props.questionData.question} aria-label="Question"
            onChange={ (e) => setQuestionName(e.currentTarget.value)}/>
        </InputGroup>
        <div className={`${style.question_type_container} ${style.input_spacing}`}>
          <InputGroup.Text className={style.question_type_border}>Question Type</InputGroup.Text>
          <Form.Select value={questionType} className={style.select_question_type_border} aria-label="select"
          onChange={ (e) => updateInputType(e.currentTarget.value)}>
            <option value="single-choice">Single Choice</option>
            <option value="multiple-choice">Multiple Choice</option>
          </Form.Select>
        </div>
        {answerInputs
          ? answerInputs.map((answers) => (
              <InputGroup key={answers.id} className={style.input_spacing}>
                <InputGroup.Text>Answer {answers.id}</InputGroup.Text>
                <FormControl placeholder={answers.answer} aria-label="Answer" onChange={(e) => updateAnswerInput(e.currentTarget.value, answers.id)}/>
              </InputGroup>
            ))
          : <LoadingWheel/>}
          <Button className={style.add_remove_input_box} variant='outline-danger' onClick={() => removeAnswerInput('hi')}>Remove Previous Answer</Button>
          <Button className={style.add_remove_input_box} variant='outline-primary' onClick={() => addAnswerInput('hi')}>Add Another Answer</Button>
          <InputGroup className={style.input_spacing}>
            <InputGroup.Text>Correct Answer</InputGroup.Text>
            <FormControl placeholder={props.questionData.correctAnswer} aria-label="Correct Answer" onChange={(e) => setCorrectAnswer(e.currentTarget.value)}/>
          </InputGroup>
          <InputGroup className={style.input_spacing}>
            <InputGroup.Text>Time Limit</InputGroup.Text>
            <FormControl type="number" min="10" max="90" placeholder={`${props.questionData.timeLimit} secs`} aria-label="Time Limit"
            onChange={ (e) => setTimeLimit(e.currentTarget.value)}/>
          </InputGroup>
          <InputGroup className={style.input_spacing}>
            <InputGroup.Text>Points</InputGroup.Text>
            <FormControl type="number" min="1" max="100" placeholder={props.questionData.points} aria-label="Points"
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
        </Card.Body>
        <Card.Footer>
          <Button className={style.submit_btn} variant='primary' onClick={() => { submitQuestion() }}>
              Save Changes
          </Button>
          <Button className={style.submit_btn} variant='secondary' onClick={ () => { navigate(`/quiz/edit/${props.quizId}/`) }}>
              Go Back
          </Button>
        </Card.Footer>
      </Card>
    </>
  );
}

export default EditQuestionCard;
