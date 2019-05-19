import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { TextAreaField } from 'react-semantic-redux-form';
import { Button, Divider, Form } from 'semantic-ui-react';

const Controller = ({ onSubmitHandler, handleSubmit, pristine, invalid, submitting, error }) => {
  return (
    <Form onSubmit={handleSubmit(onSubmitHandler)}>
      <Field
        name="query"
        label="Query"
        rows="6"
        component={TextAreaField}
      />
      <Divider />
      <Field
        name="sortBy"
        label="sortBy"
        rows="2"
        component={TextAreaField}
      />

      <Divider horizontal />
      <Button.Group attached="bottom">
        <Button
          positive
          type="submit"
          disabled={pristine || invalid || submitting}
          content="Search"
        />
      </Button.Group>
    </Form>
  );
};

export default reduxForm({
  form: 'controllerForm',
})(Controller);
