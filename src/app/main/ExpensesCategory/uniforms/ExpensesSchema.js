import { GraphQLBridge } from 'uniforms-bridge-graphql';
import { buildASTSchema, parse } from 'graphql';

const schema = `
input ExpenseInput {
    expensecode: String!
    expensename: String
    expensecategoryid: Int
    expensecategory: ExpensecategoryInput
}

input ExpensecategoryInput {
        expensecategoryid: Int!
        expensecategorydesc: String
        expenses: [ExpenseInput!]!
  }

`;
const schemaType = buildASTSchema(parse(schema)).getType('ExpenseInput');
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
