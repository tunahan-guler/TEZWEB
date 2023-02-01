import { GraphQLBridge } from 'uniforms-bridge-graphql';
import { buildASTSchema, parse } from 'graphql';

const schema = `
input SubscriptionUserInput {
    subscriptionId: String!
    email: String!
    userDesc: String
    perNo: String
    upass: String
    langType: String
    ustat: String
    validFrom: String
    validTo: String
    createTime: String
    createUser: String
    changeTime: String
    changeUser: String
    userroles: [UserroleInput!]
  }

  input UserroleInput {
    email: String!
    subscriptionid: String!
    roleCode: String!
    subscriptionUser: SubscriptionUserInput
    role: RoleInput!
  }

  input RoleInput {
    roleCode: String!
    subscriptionsid: String!
    authObject: String
    createtime: String
    createuser: String
    userroles: [UserroleInput!]
  }

`;
const schemaType = buildASTSchema(parse(schema)).getType('SubscriptionUserInput');
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
