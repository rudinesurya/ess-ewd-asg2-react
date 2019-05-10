import React from 'react';
import { connect } from 'react-redux';
import { fetchJobs } from '../../redux/actions/jobs';
import JobList from './JobList';

class JobDashboard extends React.Component {
  componentDidMount() {
    const { fetchJobs } = this.props;
    fetchJobs();
  }

  render() {
    const { jobs } = this.props;

    return (
      <JobList jobs={jobs} />
    );
  }
}

const mapStateToProps = state => ({
  jobs: state.jobs.data,
});

const mapDispatchToProps = {
  fetchJobs,
};

export default connect(mapStateToProps, mapDispatchToProps)(JobDashboard);
