import React from 'react';
import { connect } from 'react-redux';
import { loadJobs } from '../../redux/actions/job';
import JobList from './JobList';

class JobDashboard extends React.Component {
  componentDidMount() {
    const { loadJobs } = this.props;
    loadJobs();
  }

  render() {
    const { jobs } = this.props;

    return (
      <JobList jobs={jobs} />
    );
  }
}

const mapStateToProps = state => ({
  jobs: state.job.jobs,
});

const mapDispatchToProps = {
  loadJobs,
};

export default connect(mapStateToProps, mapDispatchToProps)(JobDashboard);
