import Collection from './Collection';
 
  
const CollectionConfig = {
  settings: {
    layout: {
      config: {},
    },
  }, 
  routes: [
    {
      path: 'collection',
      element: <Collection />,
    },
  ],
};

export default CollectionConfig;