import ProductService from './ProductService';

const ProductServiceConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'product-service',
      element: <ProductService />,
    },
  ],
};

export default ProductServiceConfig;

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
