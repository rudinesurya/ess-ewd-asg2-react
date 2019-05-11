import React from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import JobCommentSection from './JobCommentSection';
import JobDetailHeader from './JobDetailHeader';
import JobDetailInfo from './JobDetailInfo';
import LocationSection from './LocationSection';

class JobDetailPage extends React.Component {
  takeJobHandler = () => {

  };

  leaveJobHandler = () => {

  };

  addCommentHandler = (values) => {

  };

  render() {
    const { auth } = this.props;

    const job = {
      _id: 'asdasdadsada',
      title: 'Customer Assistant',
      host: 'czxasdasdasd',
      payout: '500',
      date: new Date(),
      venue: {
        name: 'London, UK',
        location: {
          type: 'Point',
          coordinates: [51.5073509, -0.12775829999998223],
        },
      },
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      participants: [],
      comments: [],
    };

    const authenticated = auth.isAuthenticated;
    const jobId = job._id;
    const jobTitle = job.title;
    const jobDescription = job.description;
    const hostName = 'John Doe';
    const dateString = job.date.toLocaleDateString();
    const venueName = job.venue.name;
    const venueLatLng = job.venue.location.coordinates;
    const { participants } = job;
    const { comments } = job;

    const isHost = job.host === auth.user._id;
    const isGoing = participants && participants.find(p => p.user === auth.user._id) != null;


    return (
      <React.Fragment>
        <Grid centered columns={2} rows={2}>
          <Grid.Row>
            <JobDetailHeader
              authenticated={authenticated}
              isHost={isHost}
              isGoing={isGoing}
              dateString={dateString}
              jobId={jobId}
              jobTitle={jobTitle}
              hostName={hostName}
              takeJob={this.takeJobHandler}
              leaveJob={this.leaveJobHandler}
            />
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={10}>
              <JobDetailInfo description={jobDescription} participants={participants} />
              <JobCommentSection
                authenticated={authenticated}
                comments={comments}
                addComment={this.addCommentHandler}
              />
            </Grid.Column>
            <Grid.Column width={6}>
              <LocationSection venueName={venueName} lat={venueLatLng[0]} lng={venueLatLng[1]} />
            </Grid.Column>
          </Grid.Row>

        </Grid>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(JobDetailPage);
