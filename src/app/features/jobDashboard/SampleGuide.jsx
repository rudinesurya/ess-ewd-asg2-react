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

  return (
    <div>
      <label>Sample</label>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <pre>{JSON.stringify(data2, null, 2)}</pre>
      <pre>{JSON.stringify(data3, null, 2)}</pre>
    </div>
  );
};

export default SampleGuide;
