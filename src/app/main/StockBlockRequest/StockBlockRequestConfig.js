import StockBlockRequest from './StockBlockRequest';

const StockBlockRequestConfig = {
  settings: {
    layout: {
      config: {},
    },
  }, 
  routes: [
    {
      path: 'stockblockrequest',
      element: <StockBlockRequest />,
    },
  ],
};

export default StockBlockRequestConfig;

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
