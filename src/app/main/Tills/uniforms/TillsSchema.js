import { GraphQLBridge } from 'uniforms-bridge-graphql';
import { buildASTSchema, parse } from 'graphql';

const schema = `
input AcTillInput {
    plantid: Int!
    tillcode: String!
    tillname: String
    currency: String
    tstat: String
  }

`;
const schemaType = buildASTSchema(parse(schema)).getType('AcTillInput');
// console.log("DATA",data)
const schemaExtras = {

};

const schemaValidator = (model) => {
    const details = [];

    if (!model.tillcode) {
        details.push({ name: 'tillcode' });
    }
    return details.length ? { details } : null;
};

// eslint-disable-next-line import/prefer-default-export
console.table("GraphQLBridge", new GraphQLBridge(schemaType, schemaValidator, schemaExtras))
export const bridge = new GraphQLBridge(schemaType, schemaValidator, schemaExtras);
