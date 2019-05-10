import { Component } from 'react';
import { withRouter } from 'react-router-dom';


/**
 * Component to manage scroll restoration
 */
class ScrollToTop extends Component {
  componentDidUpdate(prevProps) {
    const { location } = this.props;
    const { prevLocation } = prevProps;

    if (!location || !prevLocation || location.pathname !== prevLocation.pathname) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    const { children } = this.props;
    return children;
  }
}

export default withRouter(ScrollToTop);
