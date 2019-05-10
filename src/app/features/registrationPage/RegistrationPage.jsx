import React from 'react';
import { connect } from 'react-redux';
import { Grid, Segment } from 'semantic-ui-react';
import { registerUser } from '../../redux/actions/auth';
import RegistrationForm from './RegistrationForm';

class RegistrationPage extends React.Component {
  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/');
    }
  }

  render() {
    const { registerUser } = this.props;

    return (
      <Grid centered columns={2}>
        <Grid.Column>
          <Segment>
            <RegistrationForm register={registerUser} />
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = {
  registerUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationPage);
