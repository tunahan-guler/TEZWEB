import Companies from "./Companies";

const CompaniesConfig = {
  settings: {
    layout: {
      config: {},
    },
  }, 
  routes: [
    {
      path: 'companies',
      element: <Companies />,
    },
  ],
};

export default CompaniesConfig;

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
