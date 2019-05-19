import React from 'react';

const SampleGuide = () => {
  const data = {
    host: '5cd9fc5b3588096d0c7f0a37',
  };

  const data2 = {
    urgency: true,
  };

  const data3 = {
    payout: {
      '$lt': 50,
    },
  };

  const data4 = {
    'participants.0': {
      '$exists': true,
    },
  };


  const sort = {
    date: -1,
  };

  return (
    <div>
      <label>Sample</label>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <pre>{JSON.stringify(data2, null, 2)}</pre>
      <pre>{JSON.stringify(data3, null, 2)}</pre>
      <pre>{JSON.stringify(data4, null, 2)}</pre>

      <label>Sort By</label>
      <pre>{JSON.stringify(sort, null, 2)}</pre>
    </div>
  );
};

export default SampleGuide;
