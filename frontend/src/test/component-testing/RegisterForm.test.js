// Test Search Comp
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RegisterForm from '../../component/RegisterForm';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { it } from 'eslint/lib/rule-tester/rule-tester';

configure({ adapter: new Adapter() });

const noop = () => {};
describe('<RegisterForm>', () => {
  it('should render a form with name, email and password and confirm password fields', () => {
    const wrapper = shallow(<RegisterForm onClick={noop} />);
    expect(wrapper.find('.card-body')).toHaveLength(0);
    expect(wrapper.find('input[placeholder="Name"]')).toHaveLength(1);
    expect(wrapper.find('input[placeholder="Email"]')).toHaveLength(1);
    expect(wrapper.find('input[placeholder="Password"]')).toHaveLength(1);
    expect(wrapper.find('input[placeholder="Confirm Password"]')).toHaveLength(
      1
    );
    expect(wrapper.find('button[type="button"]')).toHaveLength(0);
  });

  it('register button is shown', async () => {
    render(<RegisterForm success={'registerUser()'} />);
    expect(
      await screen.findByRole('button', { name: /Sign Up/i })
    ).toBeEnabled();
  });

  it('test register form component', () => {
    render(<RegisterForm />);
    // expect name select in component
    const name = screen.getByText(/Name/i);
    expect(name).toBeInTheDocument();
    // expect email multi select in component
    const email = screen.getByText(/Email/i);
    expect(email).toBeInTheDocument();
    // expect password input in component
    const password = screen.getAllByText(/Password/i)[0];
    expect(password).toBeInTheDocument();
    // expect confirm password range in component
    const conPassword = screen.getByText(/Confirm Password/i);
    expect(conPassword).toBeInTheDocument();
  });
});
