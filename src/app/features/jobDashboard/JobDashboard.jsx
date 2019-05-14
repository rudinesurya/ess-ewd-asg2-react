import React from 'react';
import { connect } from 'react-redux';
import { loadJobs } from '../../redux/actions/job';
import JobList from './JobList';
import Spinner from '../../utils/Spinner';

class JobDashboard extends React.Component {
  componentDidMount() {
    const { loadJobs } = this.props;
    loadJobs();
  }

  render() {
    const { job } = this.props;
    if (job.loading) return (<Spinner />);

    return (
      <JobList jobs={job.jobs} />
    );
  }
}

const mapStateToProps = state => ({
  job: state.job,
});

const mapDispatchToProps = {
  loadJobs,
};

export default connect(mapStateToProps, mapDispatchToProps)(JobDashboard);
