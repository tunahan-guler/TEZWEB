import Customer from './Customer';

const CustomerConfig = {
  settings: {
    layout: {
      config: {},
    },
  }, 
  routes: [
    {
      path: 'customer',
      element: <Customer />,
    },
  ],
};

export default CustomerConfig;

/**
 * Lazy load Example
 */
/*
import React from 'react';
const Example = React.lazy(() => import('./Example'));

const ExampleConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : 'example',
            element: <Example/>
        }
    ]
};

export default ExampleConfig;

*/
