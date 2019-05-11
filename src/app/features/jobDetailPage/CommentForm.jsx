import PropTypes from 'prop-types';
import React from 'react';
import { TextAreaField } from 'react-semantic-redux-form';
import { Field, reduxForm, reset } from 'redux-form';
import { Button, Form } from 'semantic-ui-react';


/**
 * Component for rendering a comment form
 */
class CommentForm extends React.Component {
  onSubmitHandler = (values) => {
    this.props.addComment(values);
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

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default reduxForm({ form: 'commentForm', enableReinitialize: true })(CommentForm);
