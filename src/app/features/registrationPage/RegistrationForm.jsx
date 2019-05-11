import PropTypes from 'prop-types';
import React from 'react';
import { InputField } from 'react-semantic-redux-form';
import { Field, reduxForm } from 'redux-form';
import { combineValidators, isRequired } from 'revalidate';
import { Button, Form, Label } from 'semantic-ui-react';

const RegistrationForm = ({
  register, handleSubmit, invalid, submitting, error,
}) => (
  <Form size="large" onSubmit={handleSubmit(register)}>

    <Field
      name="name"
      component={InputField}
      type="text"
      placeholder="Your Name"
    />
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
    <Field
      name="password2"
      component={InputField}
      type="password"
      placeholder="re-enter password"
    />

    {error && <Label basic color="red">{error}</Label>}
    <Button disabled={invalid || submitting} fluid size="large" color="blue">
      Register
    </Button>
  </Form>
);

const validate = combineValidators({
  name: isRequired('name'),
  email: isRequired('email'),
  password: isRequired('password'),
  password2: isRequired('re-enter password'),
});

RegistrationForm.propTypes = {
  register: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'registrationForm', validate,
})(RegistrationForm);
