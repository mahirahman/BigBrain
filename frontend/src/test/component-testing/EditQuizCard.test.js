// Test Search Comp
import React from 'react';
import { render, screen } from '@testing-library/react';
// import { createMemoryHistory } from 'history';
import '@testing-library/jest-dom';
import EditQuizCard from '../../component/EditQuizCard';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const noop = () => {};
describe('Test EditQuizCard component', () => {
  it('should render a form with name, email and password and confirm password fields', () => {
    const wrapper = shallow(<EditQuizCard onClick={noop} />);
    expect(
      wrapper.find('.EditQuizCard_card_body_container__1-aFW.card-body')
    ).toHaveLength(0);
    expect(wrapper.find('input[aria-label="Quiz Name"]')).toHaveLength(0);
    expect(wrapper.find('button[type="button"]')).toHaveLength(0);
  });

  it('test register form component', () => {
    render(<EditQuizCard quizID={'1'} />);
    // expect Edit quiz header in component
    const head = screen.getByText(/Edit Game/i);
    expect(head).toBeInTheDocument();
    // expect Quiz name in component
    const name = screen.getByText(/Quiz Name/i);
    expect(name).toBeInTheDocument();
    // expect thumbnail input in component
    const thumbnail = screen.getByText(/Thumbnail/i);
    expect(thumbnail).toBeInTheDocument();
  });
});
