import { GraphQLBridge } from 'uniforms-bridge-graphql';
import { buildASTSchema, parse } from 'graphql';

const schema = `
input ItemmasterInput {
    itemcode: String!
    itemname: String
    itemtypecode: String
    baseunit: String
    unitsale: String
    istat: String
    stockmanagement: String
    salesprice: Float
    purchaseprice: Float
    vatcode: String
    sctcode: String
    pctcode: String
    stockcontrol: String
    minstockqty: Float
    maxstockqty: Float
    barcodeno: String
    categoryid: Int
    currency: String
  }

`;
const schemaType = buildASTSchema(parse(schema)).getType('ItemmasterInput');
// console.log("DATA",data)
const schemaExtras = {
};

const schemaValidator = (model) => {
  const details = [];
  return details.length ? { details } : null;
};

export const bridge = new GraphQLBridge(schemaType, schemaValidator, schemaExtras);
