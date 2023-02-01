import { GraphQLBridge } from 'uniforms-bridge-graphql';
import { buildASTSchema, parse } from 'graphql';

const schema = `
input AcPaymenttermInput {
    paymentterm: String!
    paymenttermdesc: String
    paymenttermtype: String
    maindate: String
    daycount: Int
    fixedday: Int
    active: Boolean
  }
`;
const schemaType = buildASTSchema(parse(schema)).getType('AcPaymenttermInput');
// console.log("DATA",data)
const schemaExtras = {

};

const schemaValidator = (model) => {
    const details = [];

    if (!model.paymentterm) {
        details.push({ name: 'paymentterm' });
    }
    return details.length ? { details } : null;
};

// eslint-disable-next-line import/prefer-default-export
console.table("GraphQLBridge", new GraphQLBridge(schemaType, schemaValidator, schemaExtras))
export const bridge = new GraphQLBridge(schemaType, schemaValidator, schemaExtras);
