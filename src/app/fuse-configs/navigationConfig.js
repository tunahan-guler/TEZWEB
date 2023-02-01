import i18next from 'i18next';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
  {
    id: 'mscube',
    title: null,
    translate: 'MSCUBE',
    type: 'group',
    icon: 'apps',
    children: [
      {
        id: 'definitions',
        title: 'Definitions',
        translate: 'DEFINITIONS',
        type: 'collapse',
        icon: 'settings',
        children: [
          {
            id: 'productservice',
            title: 'Product Service',
            translate: 'PRODUCTSERVICE',
            type: 'item',
            icon: 'folder',
            url: 'product-service',
          },
          {
            id: 'bankAccount',
            title: 'Bank Accounts',
            translate: 'BANKACCOUNTS',
            type: 'item',
            icon: 'folder',
            url: 'bankaccounts',
          },
          {
            id: 'tills',
            title: 'Tills',
            translate: 'TILLS',
            type: 'item',
            icon: 'folder',
            url: 'tills',
          },
          {
            id: 'paymentTerms',
            title: 'Payment Terms',
            translate: 'PAYMENTTERMS',
            type: 'item',
            icon: 'folder',
            url: 'paymentterms',
          },
        ]
      },
      {
        id: 'sales',
        title: 'Sales',
        translate: 'SALES',
        type: 'collapse',
        icon: 'settings',
        children: [
          {
            id: 'sales',
            title: 'Sales',
            translate: 'SALES',
            type: 'item',
            icon: 'folder',
            url: "sales"
          },
          {
            id: 'salesExtradite',
            title: 'Sales Extradite',
            translate: 'SALESEXTRADITE',
            type: 'item',
            icon: 'folder',
            url: "salesextradite"
          }
        ]
      },
      {
        id: 'purchases',
        title: 'Purchases',
        translate: 'PURCHASES',
        type: 'collapse',
        icon: 'settings',
        children: [
          {
            id: 'purchaseInvoice',
            title: 'Purchase Invoice',
            translate: 'PURCHASEINVOICE',
            type: 'item',
            icon: 'folder',
            url: "purchases"
          },
          {
            id: 'purchasesExtradite',
            title: 'Purchases Extradite',
            translate: 'PURCHASESEXTRADITE',
            type: 'item',
            icon: 'folder',
            url: "purchasesextradite"
          }
        ]
      },
      {
        id: 'stockTransferBetweenDealers',
        title: 'Stock Transfer Between Dealers',
        translate: 'STOCKTRANSFERBETWEENDEALERS',
        type: 'collapse',
        icon: 'settings',
        children: [
          {
            id: 'stockShipping',
            title: 'Stock Shipping',
            translate: 'STOCKSHIPPING',
            type: 'item',
            icon: 'folder',
            url: "stockshipping"
          },
          {
            id: 'stockConfirmation',
            title: 'Stock Confirmation',
            translate: 'STOCKCONFIRMATION',
            type: 'item',
            icon: 'folder',
            url: "stockconfirmation"
          }
        ]
      },
      {
        id: 'voltaConfirmationIncomingGoods',
        title: 'Volta Confirmation Incoming Goods',
        translate: 'VOLTACONFIRMATIONINCOMINGGOODS',
        type: 'collapse',
        icon: 'settings',
        children: [
          {
            id: 'goodsConfirmation',
            title: 'Goods Confirmation',
            translate: 'GOODSCONFIRMATION',
            type: 'item',
            icon: 'folder',
            url: "goodsconfirmation"
          }
        ]
      },
      {
        id: 'financialTracking',
        title: 'Financial Tracking',
        translate: 'FINANCIALTRACKING',
        type: 'collapse',
        icon: 'settings',
        children: [
          {
            id: 'accountStatement',
            title: 'Account Statement',
            translate: 'ACCOUNTSTATEMENT',
            type: 'item',
            icon: 'folder',
            url: "accountstatement"
          },
          // {
          //   id: 'financialSituation',
          //   title: 'Financial Situation',
          //   translate: 'FINANCIALSITUATION',
          //   type: 'item',
          //   icon: 'folder',
          //   url: "financialsituation"
          // }
        ]
      },
      {
        id: 'expenses',
        title: 'Expenses',
        translate: 'EXPENSES',
        type: 'collapse',
        icon: 'settings',
        children: [
          {
            id: 'expensesCategory',
            title: 'Expenses Category',
            translate: 'EXPENSESCATEGORY',
            type: 'item',
            icon: 'folder',
            url: "expensescategory"
          },
          {
            id: 'expenses',
            title: 'Expenses',
            translate: 'EXPENSES',
            type: 'item',
            icon: 'folder',
            url: "expenses"
          },
          // {
          //   id: 'expenseslips',
          //   title: 'Expense Slips',
          //   translate: 'EXPENSESLIPS',
          //   type: 'item',
          //   icon: 'folder',
          //   url: "expenseslips"
          // }
        ]
      },
      {
        id: 'customerSupplier',
        title: 'Customer Supplier',
        translate: 'CUSTOMERSUPPLIER',
        type: 'collapse',
        icon: 'settings',
        children: [
          {
            id: 'customer',
            title: 'Customer',
            translate: 'CUSTOMERS',
            type: 'item',
            icon: 'folder',
            url: "customer"
          },
          {
            id: 'supplier',
            title: 'Supplier',
            translate: 'SUPPLIERS',
            type: 'item',
            icon: 'folder',
            url: "supplier"
          }
        ]
      },
      {
        id: 'stock',
        title: 'Stock',
        translate: 'STOCK',
        type: 'collapse',
        icon: 'settings',
        children: [
          {
            id: 'stocklist',
            title: 'Stock List',
            translate: 'STOCKLIST',
            type: 'item',
            icon: 'folder',
            url: "stocklist"
          },
          {
            id: 'stock',
            title: 'Stock Transactions',
            translate: 'STOCKTRANSACTIONS',
            type: 'item',
            icon: 'folder',
            url: "stocktransactions"
          },
          {
            id: 'stockBlockRequest',
            title: 'Stock Block Request',
            translate: 'STOCKBLOCKREQUEST',
            type: 'item',
            icon: 'folder',
            url: "stockblockrequest"
          }
        ]
      },
      {
        id: 'monetaryTransactions',
        title: 'Monetary Transactions',
        translate: 'MONETARYTRANSACTIONS',
        type: 'collapse',
        icon: 'settings',
        children: [
          {
            id: 'collection',
            title: 'Collection',
            translate: 'COLLECTION',
            type: 'item',
            icon: 'folder',
            url: "collection"
          },
          {
            id: 'payment',
            title: 'Payment',
            translate: 'PAYMENT',
            type: 'item',
            icon: 'folder',
            url: "payment"
          }
        ]
      },
      {
        id: 'settings',
        title: 'Setting',
        translate: 'SETTINGS',
        type: 'collapse',
        icon: 'settings',
        children: [
          {
            id: 'companies',
            title: 'Companies',
            translate: 'COMPANIES',
            type: 'item',
            icon: 'folder',
            url: "companies"
          },
          {
            id: 'users',
            title: 'Users',
            translate: 'USERS',
            type: 'item',
            icon: 'folder',
            url: "users"
          },
          {
            id: 'roles',
            title: 'Roles',
            translate: 'ROLES',
            type: 'item',
            icon: 'folder',
            url: "roles"
          }
        ]
      },
    ],
  },
];

export default navigationConfig;
