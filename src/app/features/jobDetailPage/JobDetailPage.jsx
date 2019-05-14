import React from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import JobCommentSection from './JobCommentSection';
import JobDetailHeader from './JobDetailHeader';
import JobDetailInfo from './JobDetailInfo';
import LocationSection from './LocationSection';
import Spinner from '../../utils/Spinner';
import {
  deleteComment, deleteJob, joinJob, leaveJob, loadJob, postComment,
} from '../../redux/actions/job';

class JobDetailPage extends React.Component {
  componentDidMount() {
    const { jobId, loadJob } = this.props;
    loadJob(jobId);
  }

  takeJobHandler = async () => {
    const { jobId, joinJob } = this.props;
    await joinJob(jobId);
    toast.success('Join success');
  };

  leaveJobHandler = async () => {
    const { jobId, leaveJob } = this.props;
    await leaveJob(jobId);
    toast.success('Leave success');
  };

  addCommentHandler = async (values) => {
    const { jobId, postComment } = this.props;
    await postComment(jobId, { text: values.comment });
    toast.success('Comment posted');
  };

  deleteCommentHandler = async (commentId) => {
    const { jobId, deleteComment } = this.props;
    await deleteComment(jobId, commentId);
    toast.success('Comment deleted');
  };

  deleteJobHandler = async () => {
    const { jobId, deleteJob } = this.props;
    await deleteJob(jobId);
    toast.success('Job deleted');
  };

  render() {
    const { auth, job, jobId } = this.props;
    if (auth.loading || job.loading || job.job === null) return <Spinner />;

    const authenticated = auth.isAuthenticated;
    const dateString = new Date(job.job.date).toLocaleDateString();
    const {
      title, host: { _id: hostId, name: hostName }, description, venue: { name, location: { coordinates } }, comments, participants,
    } = job.job;

    const isHost = hostId === auth.user._id;
    const isGoing = participants && participants.find(p => p.user._id === auth.user._id) != null;

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
              jobTitle={title}
              hostName={hostName}
              takeJob={this.takeJobHandler}
              leaveJob={this.leaveJobHandler}
              deleteJob={this.deleteJobHandler}
            />
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={10}>
              <JobDetailInfo description={description} participants={participants} />
              <JobCommentSection
                auth={auth}
                comments={comments}
                addComment={this.addCommentHandler}
                deleteComment={this.deleteCommentHandler}
              />
            </Grid.Column>
            <Grid.Column width={6}>
              <LocationSection venueName={name} lat={coordinates[0]} lng={coordinates[1]} />
            </Grid.Column>
          </Grid.Row>

        </Grid>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  auth: state.auth,
  job: state.job,
  jobId: ownProps.match.params.id,
});

const mapDispatchToProps = {
  loadJob, postComment, deleteComment, joinJob, leaveJob, deleteJob,
};

export default connect(mapStateToProps, mapDispatchToProps)(JobDetailPage);
