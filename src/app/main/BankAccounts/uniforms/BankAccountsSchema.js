import { GraphQLBridge } from 'uniforms-bridge-graphql';
import { buildASTSchema, parse } from 'graphql';

const schema = `
input AcBankaccountInput {
  plantid: Int!
  bankaccountcode: String!
  bankaccountname: String
  bankcode: String
  branchcode: String
  bankaccounttypeid: Int
  creditcard: Boolean
  currency: String
  accountno: String
  ibanno: String
  bastat: String
}

`;
const schemaType = buildASTSchema(parse(schema)).getType('AcBankaccountInput');
// console.log("DATA",data)
const schemaExtras = {
};

const schemaValidator = (model) => {
  const details = [];

  if (!model.bankaccountcode) {
    details.push({ name: 'bankaccountcode' });
  }
  return details.length ? { details } : null;
};

// eslint-disable-next-line import/prefer-default-export
// console.table("GraphQLBridge", new GraphQLBridge(schemaType, schemaValidator, schemaExtras))
export const bridge = new GraphQLBridge(schemaType, schemaValidator, schemaExtras);
