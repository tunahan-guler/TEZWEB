import { GraphQLBridge } from 'uniforms-bridge-graphql';
import { buildASTSchema, parse } from 'graphql';

const schema = `
input AcAccount {
    plantid:Int
}

`;
const schemaType = buildASTSchema(parse(schema)).getType('AcAccount');
// console.log("DATA",data)
const schemaExtras = {
};

const schemaValidator = (model) => {
  const details = [];
  return details.length ? { details } : null;
};

// eslint-disable-next-line import/prefer-default-export
// console.table("GraphQLBridge", new GraphQLBridge(schemaType, schemaValidator, schemaExtras))
export const bridge = new GraphQLBridge(schemaType, schemaValidator, schemaExtras);
