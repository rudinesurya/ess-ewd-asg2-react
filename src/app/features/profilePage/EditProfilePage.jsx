import React from 'react';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { Button, Divider, Form, Grid, Segment } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import { TextAreaField } from 'react-semantic-redux-form';
import { connect } from 'react-redux';
import GoogleMapSearchBar from '../../utils/GoogleMapSearchBar';

class EditProfilePage extends React.Component {
  formSubmitHandler = (values) => {
    const {
      initialValues, history,
    } = this.props;

    const v = this.state.city || initialValues.city;
    const vll = this.state.cityLatLng || initialValues.cityLatLng;

    const newProfile = {
      location: {
        name: v,
        location: {
          type: 'Point',
          coordinates: [vll.lat, vll.lng],
        },
      },
      bio: values.bio,
    };

    console.log(newProfile);

    if (initialValues._id) {
    } else {
      history.push('/jobs');
    }
    history.goBack();
  };

  citySelectHandler = (city) => {
    geocodeByAddress(city)
      .then(results => getLatLng(results[0]))
      .then((latLng) => {
        this.setState({
          city,
          cityLatLng: latLng,
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
                  name="city"
                  label="City"
                  type="text"
                  component={GoogleMapSearchBar}
                  options={{ types: ['(cities)'] }}
                  placeholder="City"
                  onSelect={this.citySelectHandler}
                />

                <Field
                  name="bio"
                  label="Biography"
                  type="text"
                  rows={4}
                  placeholder="..."
                  component={TextAreaField}
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

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'editProfileForm',
  enableReinitialize: true,
})(EditProfilePage));
