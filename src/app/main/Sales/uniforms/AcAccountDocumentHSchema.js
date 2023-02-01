import { GraphQLBridge } from 'uniforms-bridge-graphql';
import { buildASTSchema, parse } from 'graphql';

const schema = `
input AcAccountdocumenthInput {
    companyid: Int!
    accdocno: String!
    accdocyear: Int!
    accdoctype: Int
    plantid: Int
    amount: Float
    currency: String
    amountlc: Float
    currencylc: String
    period: Int
    exchangedate: String
    exchangerate: Float
    docdate: String
    referenceno: String
    accountclassid: Int
    accountcode: String
    explanation: String
    deleted: Boolean
    createtime: String
    createuser: String
    changetime: String
    changeuser: String
    invoiceno: Int
    stakeholderid: Int
    acAccountdocumentis: [AcAccountdocumentiInput!]
  }

  input AcAccountdocumentiInput {
    companyid: Int!
    accdocno: String!
    accdocyear: Int!
    accdocseq: Int!
    movementtypeid: Int
    paymentorderno: String
    dcindicator: String
    currency: String
    amount: Float
    amountlc: Float
    maturitydate: String
    accountclassid: Int
    ownercode: String
    stakeholderid: Int
    glaccount: String
    paymentterm: String
    explanation: String
    deleted: Boolean
    createtime: String
    createuser: String
    changetime: String
    changeuser: String
    acAccountdocumenth: AcAccountdocumenthInput
  }

`;
const schemaType = buildASTSchema(parse(schema)).getType('AcAccountdocumenthInput');
// console.log("DATA",data)
const schemaExtras = {
};

const schemaValidator = (model) => {
  const details = [];
  return details.length ? { details } : null;
};

export const bridge = new GraphQLBridge(schemaType, schemaValidator, schemaExtras);
