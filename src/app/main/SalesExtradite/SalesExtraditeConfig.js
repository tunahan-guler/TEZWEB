import SalesExtradite from './SalesExtradite';

const SalesExtraditeConfig = {
    settings: {
        layout: {
            config: {},
        },
    },
    routes: [
        {
            path: 'salesextradite',
            element: <SalesExtradite />,
        },
    ],
};

export default SalesExtraditeConfig;

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
