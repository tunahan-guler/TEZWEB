import { GraphQLBridge } from 'uniforms-bridge-graphql';
import { buildASTSchema, parse } from 'graphql';

const schema = `
input CompanyInput {
    companyid: Int!
    companycode: String!
    companyname: String
    currency: String
    country: String
    city: String
    address: String
    mersisno: String
    taxno: String
    taxoffice: String
    website: String
    email: String
    postcode: String
    chartaccount: String
    traderegisterno: String
    telno: String
    faxno: String
    signature: String
  }

`;
const schemaType = buildASTSchema(parse(schema)).getType('CompanyInput');
// console.log("DATA",data)
const schemaExtras = {

};

const schemaValidator = (model) => {
    const details = [];
    return details.length ? { details } : null;
};

// eslint-disable-next-line import/prefer-default-export
console.table("GraphQLBridge", new GraphQLBridge(schemaType, schemaValidator, schemaExtras))
export const bridge = new GraphQLBridge(schemaType, schemaValidator, schemaExtras);
