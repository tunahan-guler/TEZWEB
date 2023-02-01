import { GraphQLBridge } from 'uniforms-bridge-graphql';
import { buildASTSchema, parse } from 'graphql';
import ExampleCom from './CustomComponnet/ExampleCom';
import {GetRoleDocument, Role} from '../../../../generated/graphql'
import client  from '../../../../apolloClient';

// const req = new Promise((resolve, reject)=>{
//   client.query({query:GetRoleDocument})
//     .then(resolve)
//     .catch(reject)
// })
// const ex = async () => await req.then(res => res)
//  console.log("QWERTY",  ex)
//  const request = () => client.query({query:GetRoleDocument});
// //  console.log("QQQQQQQQQQQ",await request())

//  const  getRole = async () => {
//   const response = await request();
//   // ex = response;
//   console.log("QQQQQQQQ", response);
//   // return response;
// }
// getRole(); 

// const schema = `
//             type SubscriptionUser {
//               subscriptionId: String!
//               email: String!
//               userDesc: String
//               perNo: String
//               upass: Int!
//               langType: String
//               ustat: String
//               validFrom: String
//               validTo: String
//               createTime: String
//               createUser: String
//               changeTime: String
//               changeUser: String
//               userroles: [userrole] 
//             }

//             type userrole {
//               email: String!
//               subscriptionid: String!
//               roleCode: [Role]

//             }

//             type Role {
//               roleCode: String!
//               subscriptionsid: String!
//               authObject: String
//               createtime: String
//               createuser: String
//               userroles: [userrole!]!
//             }

// `; 

const schema = `
input ItemMasterInput {
  itemCode: String!
  itemName: String!
  itemTypeCode: String
  baseUnit: String
  unitSale: String
  istat: String
  stockManagement: String
  salesPrice: Float
  purchasePrice: Float
  vatcode: String
  sctcode: String
  pctcode: String
  stockControl: String
  minStockQty: Float
  maxStockQty: Float
  barcodeNo: String
  categoryId: Int
  currency: String
}

`; 
const schemaType = buildASTSchema(parse(schema)).getType('ItemMasterInput'); 
// console.log("DATA",data)
const schemaExtras = {
  'stockManagement': {
    options: [
      { label: 'Etkin', value: 'A' },
      { label: 'Etkin Değil', value: 'N' }
    ]
  },
};

const schemaValidator = (model) => {
  const details = [];

  if (!model.itemCode) {
    details.push({ name: 'itemCode', message: 'itemCode is required!' });
  } 

  if (!model.itemName) {
    details.push({ name: 'itemName', message: 'itemName ID is required!' });
  } 
  return details.length ? { details } : null;
};

// eslint-disable-next-line import/prefer-default-export
console.table("GraphQLBridge",new GraphQLBridge(schemaType, schemaValidator, schemaExtras))
export const bridge = new GraphQLBridge(schemaType, schemaValidator, schemaExtras);
