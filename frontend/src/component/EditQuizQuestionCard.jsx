import React from 'react';
import { Button, ButtonGroup, Card, Form, FormControl, InputGroup, ToggleButton } from 'react-bootstrap';
import style from '../css/AddEditQuestion.module.css';

function EditQuizQuestionCard () {
  // const [answerInputs, setAnswerInputs] = React.useState([{ id: 1 }, { id: 2 }]);
  // console.log(setAnswerInputs);

  const [radioValue, setRadioValue] = React.useState('yt');
  const radios = [
    { name: 'Youtube Video', value: 'yt' },
    { name: 'Image', value: 'img' },
  ];

  return (
    <>
      <Card className={style.container}>
        <Card.Header>Edit Question</Card.Header>
        <Card.Body className={style.center_btn}>
        <InputGroup className={style.input_spacing}>
            <InputGroup.Text>Question</InputGroup.Text>
            <FormControl placeholder="" aria-label="Question"
            onChange={ (e) => console.log(e.currentTarget.value)}/>
        </InputGroup>
        <div className={`${style.question_type_container} ${style.input_spacing}`}>
          <InputGroup.Text className={style.question_type_border}>Question Type</InputGroup.Text>
          <Form.Select className={style.select_question_type_border} aria-label="Default select"
          onChange={ (e) => console.log(e.currentTarget.value)}>
            <option value="single-choice">Single Choice</option>
            <option value="multiple-choice">Multiple Choice</option>
          </Form.Select>
        </div>
        {/* {answerInputs.map((answers) => (
          <InputGroup key={answers.id} className={style.input_spacing}>
            <InputGroup.Text>Answer {answers.id}</InputGroup.Text>
            <FormControl aria-label="Answer" onChange={(e) => console.log(e.currentTarget.value, answers.id)}/>
          </InputGroup>
        ))} */}
          <Button className={style.add_remove_input_box} variant='outline-danger' onClick={() => console.log('hi')}>Remove Previous Answer</Button>
          <Button className={style.add_remove_input_box} variant='outline-primary' onClick={() => console.log('hi')}>Add Another Answer</Button>
          <InputGroup className={style.input_spacing}>
            <InputGroup.Text>Correct Answer</InputGroup.Text>
            <FormControl placeholder='Correct answer(s) comma seperated' aria-label="Correct Answer" onChange={(e) => console.log(e.currentTarget.value)}/>
          </InputGroup>
          <InputGroup className={style.input_spacing}>
            <InputGroup.Text>Time Limit</InputGroup.Text>
            <FormControl type="number" min="10" max="90" placeholder="Min: 10 secs, Max: 90 secs" aria-label="Time Limit"
            onChange={ (e) => console.log(e.currentTarget.value)}/>
          </InputGroup>
          <InputGroup className={style.input_spacing}>
            <InputGroup.Text>Points</InputGroup.Text>
            <FormControl type="number" min="1" max="100" placeholder="How many points is this question worth?" aria-label="Points"
            onChange={ (e) => console.log(e.currentTarget.value)}/>
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
            onChange={(e) => console.log(e.currentTarget.value)}/>
          </InputGroup>
          }
          {radioValue === 'img' &&
            <InputGroup className={style.input_spacing}>
            <InputGroup.Text >Thumbnail</InputGroup.Text>
            <FormControl title="your text" type="file" accept="image/jpeg, image/png, image/jpg" aria-label="Thumbnail"
              onChange={event => console.log(event.target.files[0])}/>
          </InputGroup>
          }
        </Card.Body>
        <Card.Footer>
          <Button className={style.submit_btn} variant='primary' onClick={() => console.log('submitted')}>
              Save Changes
          </Button>
        </Card.Footer>
      </Card>
    </>
  );
}

export default EditQuizQuestionCard;
