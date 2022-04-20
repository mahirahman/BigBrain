// Test Search Comp
import React from 'react';
import '@testing-library/jest-dom';
import StartQuizModal from '../../component/StartQuizModal';
import { it } from 'eslint/lib/rule-tester/rule-tester';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
// import { BrowserRouter } from 'react-router-dom';
configure({ adapter: new Adapter() });

describe('Test StartQuizModal component', () => {
  const noop = () => {};
  it('should render a page with button and input', () => {
    const wrapper = shallow(<StartQuizModal onClick={noop} />);
    expect(wrapper.find('.modal-dialog')).toHaveLength(0);
    expect(wrapper.find('input[class="form-control"]')).toHaveLength(0);
    expect(wrapper.find('button[type="button"]')).toHaveLength(0);
  });
});
