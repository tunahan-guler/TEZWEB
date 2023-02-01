import PurchasesExtradite from './PurchasesExtradite';

const PurchasesExtraditeConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'purchasesextradite',
      element: <PurchasesExtradite />,
    },
  ],
};

export default PurchasesExtraditeConfig;

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
