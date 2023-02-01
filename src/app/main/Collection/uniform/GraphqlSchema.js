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
  stakeholder: StakeholderInput
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

input StakeholderInput {
  stakeholdercode: String
  stakeholdername: String
}

`;
const schemaType = buildASTSchema(parse(schema)).getType('AcAccountdocumenthInput');
// console.log("DATA",data)
const schemaExtras = {

};

const schemaValidator = (model) => {
  const details = [];
  if(!model.stakeholder){
    details.push({name:'stakeholder'})
  }
  if(!model?.acAccountdocumentis){
    details.push({name:'acAccountdocumentis'})
  }
  for(let i=0; i<model.acAccountdocumentis?.length; i++){
    if(!model?.acAccountdocumentis[i]?.movementtypeid){
      details.push({ name: `acAccountdocumentis.${i}.movementtypeid`})
    }
    if(!model?.acAccountdocumentis[i]?.ownercode){
      details.push({ name: `acAccountdocumentis.${i}.ownercode`})
    }
    if(!model?.acAccountdocumentis[i]?.maturitydate){
      details.push({ name: `acAccountdocumentis.${i}.maturitydate`,})
    }
    if(!model?.acAccountdocumentis[i]?.amount){
      details.push({ name: `acAccountdocumentis.${i}.amount`})
    }
  }
  return details.length ? { details } : null;
};

// eslint-disable-next-line import/prefer-default-export
console.table("GraphQLBridge", new GraphQLBridge(schemaType, schemaValidator, schemaExtras))
export const bridge = new GraphQLBridge(schemaType, schemaValidator, schemaExtras);
