import PropTypes from 'prop-types';
import React from 'react';
import { TextAreaField } from 'react-semantic-redux-form';
import { Field, reduxForm, reset } from 'redux-form';
import { Button, Form } from 'semantic-ui-react';
import { combineValidators, composeValidators, hasLengthBetween, isRequired } from 'revalidate';

/**
 * Component for rendering a comment form
 */
class CommentForm extends React.Component {
  onSubmitHandler = async (values) => {
    await this.props.addComment(values);
    this.props.dispatch(reset('commentForm'));
  };

  render() {
    const {
      pristine, invalid, submitting, handleSubmit,
    } = this.props;

    return (
      <Form onSubmit={handleSubmit(this.onSubmitHandler)}>
        <Field
          name="comment"
          type="text"
          component={TextAreaField}
          rows={2}
        />

        <Button
          disabled={pristine || invalid || submitting}
          content="Post"
          labelPosition="left"
          icon="edit"
          primary
        />
      </Form>
    );
  }
}

const validate = combineValidators({
  comment: composeValidators(
    isRequired('comment'),
    hasLengthBetween(3, 200)({ message: 'body must be between 3 to 200 chars' }),
  )(),
});

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default reduxForm({ form: 'commentForm', validate, enableReinitialize: true })(CommentForm);
