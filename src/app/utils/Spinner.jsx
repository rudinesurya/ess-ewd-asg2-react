import React from 'react';
import { Dimmer, Image, Loader } from 'semantic-ui-react';

const Spinner = () => (
  <React.Fragment>
    <Dimmer active inverted>
      <Loader size="large">Loading</Loader>
    </Dimmer>

    <Image src="/images/wireframe/paragraph.png" />
  </React.Fragment>
);

export default Spinner;
