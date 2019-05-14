import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Card, Image } from 'semantic-ui-react';
import Spinner from '../../utils/Spinner';
import { getProfileByUserId } from '../../redux/actions/profile';


class ProfilePage extends React.Component {
  componentDidMount() {
    const { uId, getProfileByUserId } = this.props;
    getProfileByUserId(uId);
  }

  cancelBtnHandler = () => {
    const { history } = this.props;
    history.goBack();
  };

  render() {
    const { auth, profile, uId } = this.props;
    if (auth.loading || profile.loading || profile.profile === null) return (<Spinner />);

    const isCurrentUser = auth.isAuthenticated && auth.user._id === uId;
    const {
      createdDate, bio, location, user: { name, avatarUrl },
    } = profile.profile;

    const locationName = location ? location.name : 'Unknown City';
    const dateString = new Date(createdDate).toLocaleDateString();

    return (
      <Card centered>

        <Image src={avatarUrl} size="large" />
        <Card.Content>
          <Card.Header>{name}</Card.Header>
          <Card.Header>{locationName}</Card.Header>
          <Card.Meta>
            <span className="date">
              {`Joined in ${dateString}`}
            </span>
          </Card.Meta>
          <Card.Description>{bio || 'n/a'}</Card.Description>
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
  profile: state.profile,
  uId: ownProps.match.params.id,
});

const mapDispatchToProps = {
  getProfileByUserId,
};

ProfilePage.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  getProfileByUserId: PropTypes.func.isRequired,
  uId: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
