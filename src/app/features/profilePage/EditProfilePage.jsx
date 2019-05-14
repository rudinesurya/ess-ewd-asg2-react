import React from 'react';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { Button, Divider, Form, Grid, Segment } from 'semantic-ui-react';
import { Field, initialize, reduxForm, SubmissionError } from 'redux-form';
import { InputField, TextAreaField } from 'react-semantic-redux-form';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import GoogleMapSearchBar from '../../utils/GoogleMapSearchBar';
import { getCurrentProfile, updateCurrentProfile } from '../../redux/actions/profile';
import Spinner from '../../utils/Spinner';

class EditProfilePage extends React.Component {
  state = {
    formInitialized: false,
  };

  componentDidMount() {
    const { getCurrentProfile } = this.props;
    getCurrentProfile();
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (this.state.formInitialized) return;

    if (!nextProps.profile.loading && nextProps.profile.profile) {
      const { profile } = nextProps.profile;
      const initialValues = {
        name: profile.user.name,
        location: profile.location ? profile.location.name : '',
        bio: profile.bio,
      };
      nextProps.dispatch(initialize('editProfileForm', initialValues));

      this.setState({
        formInitialized: true,
        location: profile.location && profile.location.name,
        locationLatLng: profile.location && profile.location.location.coordinates,
      });
    }
  }

  formSubmitHandler = async (values) => {
    const {
      history, updateCurrentProfile,
    } = this.props;

    const v = this.state.location;
    const vll = this.state.locationLatLng;

    const newProfile = {
      name: values.name,
      location: this.state.location && {
        name: v,
        location: {
          type: 'Point',
          coordinates: vll,
        },
      },
      bio: values.bio,
    };

    await updateCurrentProfile(newProfile);

    // Check for validation errors from server
    const { error: { data, error } } = this.props.profile;
    if (data) {
      toast.error(error);
      const keys = Object.keys(data);

      keys.forEach((k) => {
        throw new SubmissionError({
          [k]: data[k],
        });
      });
    } else {
      toast.success('Profile updated');
      history.goBack();
    }
  };

  cancelBtnHandler = () => {
    const { history } = this.props;
    history.goBack();
  };

  locationSelectHandler = (location) => {
    geocodeByAddress(location)
      .then(results => getLatLng(results[0]))
      .then((latLng) => {
        this.setState({
          location,
          locationLatLng: [latLng.lat, latLng.lng],
        });
      });
  };

  render() {
    const { profile } = this.props;
    if (profile.loading || profile.profile === null) return (<Spinner />);

    const {
      handleSubmit, pristine, invalid, submitting, error,
    } = this.props;
    return (
      <Grid centered columns={2}>
        <Grid.Column>
          <Segment>
            <React.Fragment>
              <Form onSubmit={handleSubmit(this.formSubmitHandler)}>
                <Field
                  name="name"
                  label="Display Name"
                  type="text"
                  placeholder="Your Name"
                  component={InputField}
                />

                <Field
                  name="location"
                  label="City"
                  type="text"
                  component={GoogleMapSearchBar}
                  options={{ types: ['(cities)'] }}
                  placeholder={this.state.location || 'City'}
                  onSelect={this.locationSelectHandler}
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
  profile: state.profile,
});

const mapDispatchToProps = {
  getCurrentProfile,
  updateCurrentProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'editProfileForm',
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
})(EditProfilePage));
