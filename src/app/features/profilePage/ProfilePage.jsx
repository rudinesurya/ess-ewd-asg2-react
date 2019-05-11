import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Card, Image } from 'semantic-ui-react';


class ProfilePage extends React.Component {
  cancelBtnHandler = () => {
    const { history } = this.props;
    history.goBack();
  };

  render() {
    const { auth, uId } = this.props;
    const isCurrentUser = auth.isAuthenticated && auth.user._id === uId;
    const avatarUrl = '';
    const name = 'John Doe';
    const city = 'London, UK';
    const dateString = 'some date';
    const bio = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

    return (
      <Card centered>

        <Image src={avatarUrl} size="large" />
        <Card.Content>
          <Card.Header>{name}</Card.Header>
          <Card.Header>{city}</Card.Header>
          <Card.Meta>
            <span className="date">
Joined in
              {dateString}
            </span>
          </Card.Meta>
          <Card.Description>{bio}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button.Group attached="bottom">
            {isCurrentUser && (
              <Button
                attached="bottom"
                as={Link}
                to={`/editProfile/${uId}`}
                color="blue"
                content="Edit"
              />
            )}
            <Button type="button" onClick={this.cancelBtnHandler} content="Go Back" />
          </Button.Group>
        </Card.Content>
      </Card>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  auth: state.auth,
  uId: ownProps.match.params.id,
});

const mapDispatchToProps = {};

ProfilePage.propTypes = {
  auth: PropTypes.any,
  uId: PropTypes.any,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
