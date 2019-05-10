import React from 'react';
import { Button, Divider, Form, Grid, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Checkbox, InputField, TextAreaField } from 'react-semantic-redux-form';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { createJob, deleteJob, updateJob } from '../../redux/actions/jobs';
import MyDatePicker from '../../utils/MyDatePicker';
import GoogleMapSearchBar from '../../utils/GoogleMapSearchBar';

class JobRegistrationPage extends React.Component {
  formSubmitHandler = (values) => {
    const {
      initialValues, history, createJob, updateJob,
    } = this.props;

    const v = this.state.venue || initialValues.venue;
    const vll = this.state.venueLatLng || initialValues.venueLatLng;

    const newJob = {
      title: values.title,
      payout: values.payout,
      date: values.date,
      venue: {
        name: v,
        location: {
          type: 'Point',
          coordinates: [vll.lat, vll.lng],
        },
      },
      description: values.description,
    };

    if (initialValues._id) {
      updateJob(newJob);
      history.goBack();
    } else {
      createJob(newJob);
      history.push('/jobs');
    }
  };

  venueSelectHandler = (venue) => {
    geocodeByAddress(venue)
      .then(results => getLatLng(results[0]))
      .then((latLng) => {
        this.setState({
          venue,
          venueLatLng: latLng,
        });
      });
  };

  cancelBtnHandler = () => {
    const { history } = this.props;
    history.goBack();
  };

  render() {
    const {
      handleSubmit, invalid, submitting, error,
    } = this.props;
    return (
      <Grid centered columns={2}>
        <Grid.Column>
          <Segment>
            <React.Fragment>
              <Form onSubmit={handleSubmit(this.formSubmitHandler)}>
                <Field
                  name="title"
                  label="Job Title"
                  type="text"
                  placeholder="Job Title.."
                  component={InputField}
                />

                <Field
                  name="payout"
                  label="Payout"
                  type="number"
                  placeholder="$500"
                  component={InputField}
                />

                <Field
                  name="venue"
                  label="Venue"
                  type="text"
                  component={GoogleMapSearchBar}
                  options={{ types: ['establishment'] }}
                  placeholder="Venue"
                  onSelect={this.venueSelectHandler}
                />

                <Field
                  name="date"
                  label="Date"
                  type="text"
                  dateFormat="MMMM d, yyyy h:mm aa"
                  timeFormat="HH:mm"
                  showTimeSelect
                  placeholder="Sometime.."
                  component={MyDatePicker}
                />

                <Field
                  name="description"
                  label="Description"
                  type="text"
                  rows={4}
                  placeholder="..."
                  component={TextAreaField}
                />

                <Field
                  name="urgency"
                  label="urgency"
                  component={Checkbox}
                />

                <Divider horizontal />
                <Button.Group attached="bottom">
                  <Button
                    positive
                    type="submit"
                    disabled={invalid || submitting}
                    content="Submit"
                  />
                  <Button type="button" onClick={this.cancelBtnHandler} content="Go Back" />
                </Button.Group>
              </Form>
            </React.Fragment>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  initialValues: {},
});

const mapDispatchToProps = {
  createJob,
  updateJob,
  deleteJob,
};

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'jobCreationForm',
  enableReinitialize: true,
})(JobRegistrationPage));
