import { GraphQLBridge } from 'uniforms-bridge-graphql';
import { buildASTSchema, parse } from 'graphql';

const schema = `
input StakeholderInput {
    stakeholderid: Int!
    stakeholdercode: String
    stakeholdername: String
    stakeholdertype: String
    shcategory: Int
    currency: String
    paymentterm: String
    taxoffice: String
    taxno: String
    identityno: String
    iname: String
    isurname: String
    risklimit: Float
    risknotes: String
    shadbookid: Int
    tradetype: String
    shadbook: StakeholderadbookInput
  stakeholdercontacts: [StakeholdercontactInput!]
  }

  input StakeholderadbookInput {
    shadbookid: Int!
    shadname: String
    shadtype: String
    countrykey: String
    city: String
    county: String
    address: String
    postcode: String
    phone: String
    phone2: String
    phone3: String
    fax: String
    website: String
    email: String
    stakeholders: [StakeholderInput!]!
  }

  input StakeholdercontactInput {
    contactid: Int!
    stakeholderid: Int
    contactname: String
    contactemail: String
    contactmobile: String
    contactphone: String
    contactrole: String
    contactnotes: String
    stakeholder: StakeholderInput
  }

`;

const schemaType = buildASTSchema(parse(schema)).getType('StakeholderInput');
const schemaExtras = {
};

const schemaValidator = (model) => {
  const details = [];
  if (!model?.stakeholdername) {
    details.push({ name: 'stakeholdername'})
  }
  if (!model.paymentterm) {
    details.push({ name: 'paymentterm' })
  }
  if (!model?.shadbook?.address) {
    details.push({ name: 'shadbook.address' })
  }
  if (!model?.shadbook?.county) {
    details.push({ name: 'shadbook.county' })
  }
  if (!model?.shadbook?.phone) {
    details.push({ name: 'shadbook.phone'})
  }
  return details.length ? { details } : null;
};

export const bridge = new GraphQLBridge(schemaType, schemaValidator, schemaExtras);
