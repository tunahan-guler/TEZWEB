import { Navigate } from 'react-router-dom';
import FuseUtils from '@fuse/utils';
import FuseLoading from '@fuse/core/FuseLoading';
import Error404Page from 'app/main/404/Error404Page';
import StockShippingConfig from '../main/StockShipping/StockShippingConfig';
import BankAccountsConfig from '../main/BankAccounts/BankAccountsConfig';
import TillsConfig from '../main/Tills/TillsConfig';
import PaymentTermsConfig from '../main/PaymentTerms/PaymentTermsConfig';
import SalesConfig from '../main/Sales/SalesConfig';
import ExampleConfig from '../main/example/ExampleConfig'
import ExpensesConfig from '../main/Expenses/ExpensesConfig';
import ExpensesCategoryConfig from '../main/ExpensesCategory/ExpensesCategoryConfig';
import CustomerConfig from '../main/Customer/CustomerConfig';
import SupplierConfig from '../main/Supplier/SupplierConfig'
import StockListConfig from '../main/StockList/StockListConfig';
import StockTransactionsConfig from '../main/StockTransactions/StockTransactionsConfig';
import ProductServiceConfig from '../main/ProductService/ProductServiceConfig';
import CollectionConfig from '../main/Collection/CollectionConfig';
import PaymentConfig from '../main/Payment/PaymentConfig';
import PurchasesConfig from '../main/Purchases/PurchasesConfig'
import SalesExtraditeConfig from '../main/SalesExtradite/SalesExtraditeConfig';
import PurchasesExtraditeConfig from '../main/PurchasesExtradite/PurchasesExtraditeConfig';
import StockConfirmationConfig from '../main/StockConfirmation/StockConfirmationConfig';
import GoodsConfirmationConfig from '../main/GoodsConfirmation/GoodsConfirmationConfig';
import FinancialSituationConfig from '../main/FinancialSituation/FinancialSituationConfig';
import AccountStatementConfig from '../main/AccountStatement/AccountStatementConfig';
import StockBlockRequestConfig from '../main/StockBlockRequest/StockBlockRequestConfig';
import LoginConfig from '../main/login/LoginConfig';
import CompaniesConfig from '../main/Companies/CompaniesConfig';
import UsersConfig from '../main/Users/UsersConfig';
import RolesConfig from '../main/Roles/RolesConfig';
import ExpenseSlipsConfig from '../main/ExpenseSlips/ExpenseSlipsConfig';

const routeConfigs = [LoginConfig, StockShippingConfig, BankAccountsConfig, TillsConfig, PaymentTermsConfig, SalesConfig, ExampleConfig, ExpensesConfig, ExpensesCategoryConfig,
  CustomerConfig, SupplierConfig, StockListConfig, StockTransactionsConfig, ProductServiceConfig, CollectionConfig, PaymentConfig, PurchasesConfig,
  SalesExtraditeConfig, PurchasesExtraditeConfig, StockConfirmationConfig, GoodsConfirmationConfig, FinancialSituationConfig, AccountStatementConfig, PaymentConfig, PurchasesConfig,
  StockBlockRequestConfig, CompaniesConfig, UsersConfig, RolesConfig, ExpenseSlipsConfig]


const routes = [
  // if you want to make whole app auth protected by default change defaultAuth for example:
  // ...FuseUtils.generateRoutesFromConfigs(routeConfigs, ['admin','staff','user']),
  // The individual route configs which has auth option won't be overridden.
  ...FuseUtils.generateRoutesFromConfigs(routeConfigs, null),
  {
    path: '/',
    element: <Navigate to="companies" />,
  },
  {
    path: 'loading',
    element: <FuseLoading />,
  },
  {
    path: '404',
    element: <Error404Page />,
  },
  {
    path: '*',
    element: <Navigate to="404" />,
  },
];

export default routes;
