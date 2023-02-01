import StockList from './StockList';

const StockListConfig = {
  settings: {
    layout: {
      config: {},
    },
  }, 
  routes: [
    {
      path: 'stocklist',
      element: <StockList />,
    },
  ],
};

export default StockListConfig;

