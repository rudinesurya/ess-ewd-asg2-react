import React from 'react';
import { connect } from 'react-redux';
import { Grid, Segment } from 'semantic-ui-react';
import { loginUser } from '../../redux/actions/auth';
import LoginForm from './LoginForm';

class LoginPage extends React.Component {
  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/');
    }
  }

  render() {
    const { loginUser } = this.props;

    return (
      <Grid centered columns={2}>
        <Grid.Column>
          <Segment>
            <LoginForm login={loginUser} />
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
  loginUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
