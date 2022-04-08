import React from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import { registerAPI } from '../api.js';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Card, Button } from 'react-bootstrap';
import style from '../css/LoginRegisterForm.module.css';

export function RegisterForm ({ success }) {
  RegisterForm.propTypes = {
    success: PropTypes.func.isRequired
  };

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
    success();
    reset();
  };

  const fontColor = {
    color: 'red'
  };

  return (
    <Card className={style.card}>
      <Card.Body>
        <form onSubmit={handleSubmit(registerUser)}>
          <div className="card">
            <div className="card-body">
              <Card.Title className={style.card_title}>Name</Card.Title>
              <input
                className={style.form_input}
                type="text"
                placeholder="Name"
                {...register('name')}
              />
              <div style={fontColor}>{errors.name?.message}</div>
              <Card.Title className={style.card_title}>Email</Card.Title>
              <input
                className={style.form_input}
                type="text"
                {...register('email')}
                placeholder="Email"
              />
              <div style={fontColor}>{errors.email?.message}</div>
              <Card.Title className={style.card_title}>Password</Card.Title>
              <input
                className={style.form_input}
                {...register('password')}
                type="password"
                placeholder="password"
                required
              />
              <br />
              <div style={fontColor}>{errors.password?.message}</div>
              <Card.Title className={style.card_title}>
                Confirm Password
              </Card.Title>
              <input
                className={style.form_input}
                type="password"
                placeholder="Password"
                {...register('rePassword')}
              />
              <div style={fontColor}>{errors.rePassword?.message}</div>
              <Button type="submit" className="btn btn-success">
                {' '}
                Sign Up
              </Button>
            </div>
          </div>
        </form>
      </Card.Body>
    </Card>
  );
}

export default RegisterForm;
