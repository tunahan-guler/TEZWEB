import Payment from './Payment';
 
  
const PaymentConfig = {
  settings: {
    layout: {
      config: {},
    },
  }, 
  routes: [
    {
      path: 'payment',
      element: <Payment />,
    },
  ],
};

export default PaymentConfig;