import FinancialSituation from './FinancialSituation';

const FinancialSituationConfig = {
  settings: {
    layout: {
      config: {},
    },
  }, 
  routes: [
    {
      path: 'financialsituation',
      element: <FinancialSituation />,
    },
  ],
};

export default FinancialSituationConfig;

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
