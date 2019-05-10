import PropTypes from 'prop-types';
import React from 'react';
import { InputField } from 'react-semantic-redux-form';
import { Field, reduxForm } from 'redux-form';
import { combineValidators, isRequired } from 'revalidate';
import { Button, Form, Label } from 'semantic-ui-react';

const LoginForm = ({
                     login, handleSubmit, invalid, submitting, error,
                   }) => (
  <Form size="large" onSubmit={handleSubmit(login)}>

    <Field
      name="email"
      component={InputField}
      type="text"
      placeholder="Email Address"
    />
    <Field
      name="password"
      component={InputField}
      type="password"
      placeholder="password"
    />

    {error && <Label basic color="red">{error}</Label>}
    <Button disabled={invalid || submitting} fluid size="large" color="blue">
      Login
    </Button>
  </Form>
);

const validate = combineValidators({
  email: isRequired('email'),
  password: isRequired('password'),
});

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'loginForm', validate,
})(LoginForm);
