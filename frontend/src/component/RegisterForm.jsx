import React from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import { registerAPI } from '../api.js';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

export function RegisterForm ({ success }) {
  RegisterForm.propTypes = {
    success: PropTypes.func.isRequired
  };
  // const handleBlur = useState('');
  // const {
  //   handleBlur,
  //   touched,
  //   styles
  // } = this.props;

  const formSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string()
      .required('Email is required')
      .email('Email format error'),
    password: Yup.string()
      .required('Password is required')
      .min(4, 'Password length should be at least 4 characters'),
    rePassword: Yup.string()
      .required('Password is required')
      .min(4, 'Password length should be at least 4 characters')
  });

  const validationOpt = { resolver: yupResolver(formSchema) };

  const { register, handleSubmit, reset, formState } = useForm(validationOpt);

  const { errors } = formState;

  function onFormSubmit (data) {
    console.log(JSON.stringify(data, null, 4));
    return false;
  }

  const registerUser = async (formData) => {
    if (formData.password !== formData.rePassword) {
      alert('The two passwords do not match');
      reset();
      return;
    }
    if (Object.keys(errors).length !== 0) {
      return;
    }
    const data = await registerAPI(
      formData.name,
      formData.email,
      formData.password
    );
    if (data.error) {
      alert(data.error);
      return;
    }
    localStorage.setItem('authToken', data.token);
    console.log(localStorage.getItem('authToken'));
    console.log(register, handleSubmit, reset, errors, onFormSubmit);
    success();
    reset();
  };

  // const onSubmit = async (data) => {
  //   console.log('---------------------------')
  //   // registerUser(name, email, password)
  //   success();
  //   reset();
  // };

  const fontColor = {
    color: 'red'
  };

  return (
    <form onSubmit={handleSubmit(registerUser)}>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Name</h5>
          <input
            // onChange={(event) => setName(event.target.value)}
            type="text"
            placeholder="Name"
            {...register('name')}
          />
          <div style={fontColor}>{errors.name?.message}</div>
          <h5 className="card-title">Email</h5>
          <input type="text" {...register('email')} placeholder="Email" />
          <div style={fontColor}>{errors.email?.message}</div>
          <h5 className="card-title">Password</h5>
          <input
            {...register('password')}
            type="password"
            placeholder="password"
            required
          />
          <br />
          <div style={fontColor}>{errors.password?.message}</div>
          <h5 className="card-title">Confirm Password</h5>
          <input
            type="password"
            placeholder="Password"
            {...register('rePassword')}
          />
          <div style={fontColor}>{errors.rePassword?.message}</div>
          <button type="submit" className="btn btn-success">
            Sign Up
          </button>
        </div>
      </div>
    </form>
  );
}

export default RegisterForm;
