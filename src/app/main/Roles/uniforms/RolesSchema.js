import { GraphQLBridge } from 'uniforms-bridge-graphql';
import { buildASTSchema, parse } from 'graphql';
import moment from 'moment';

const schema = `
input RoleInput {
    roleCode: String!
    subscriptionsid: String!
    authObject: String
    createtime: String
    createuser: String
    userroles: [UserroleInput!]!
  }

  input UserroleInput {
    email: String!
    subscriptionid: String!
    roleCode: String!
    role: RoleInput!
  }
`;
const schemaType = buildASTSchema(parse(schema)).getType('RoleInput');
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
