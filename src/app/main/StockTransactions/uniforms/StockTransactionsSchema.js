import { GraphQLBridge } from 'uniforms-bridge-graphql';
import { buildASTSchema, parse } from 'graphql';

const schema = `
input TranshistInput {
  matdocno: String!
  matdocyear: Int!
  matdocseq: Int!
  transcode: String
  referencetype: String
  referenceid: Int
  itemcode: String
  serialno: String
  batchno: String
  entrydate: String
  variantid: Int
  storagelocationid: Int
  storagebinid: Int
  plantid: Int
  newstoragelocationid: Int
  newstoragebinid: Int
  newplantid: Int
  transqty: Float
  physicalqty: Float
  availableqty: Float
  reservedqty: Float
  onqualityqty: Float
  blockedqty: Float
  stakeholderid: Int
  username: String
  transtime: String
  stakeholder: StakeholderInput
  stocks:[StockInput!]
}

input StakeholderInput {
  stakeholdercode: String
  stakeholdername: String
}

input StockInput {
  itemcode: String!
  serialno: String!
  batchno: String!
  variantid: Int!
  storagelocationid: Int!
  storagebinid: Int!
  plantid: Int!
  entrydate: String
  expirationdate: String
  physicalqty: Float
  availableqty: Float
  reservedqty: Float
  onqualityqty: Float
  blockedqty: Float
  sstatus: String
  lasttransdate: String
  transqty:Int
}

`;
const schemaType = buildASTSchema(parse(schema)).getType('TranshistInput');
const schemaExtras = {

};

const schemaValidator = (model) => {
  const details = [];
  return details.length ? { details } : null;
};

// eslint-disable-next-line import/prefer-default-export
export const bridge = new GraphQLBridge(schemaType, schemaValidator, schemaExtras);
