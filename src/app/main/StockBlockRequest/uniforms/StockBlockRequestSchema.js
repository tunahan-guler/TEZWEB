import { GraphQLBridge } from 'uniforms-bridge-graphql';
import { buildASTSchema, parse } from 'graphql';

const schema = `
input StockblockrequesthInput {
    stockblockrequestid: Int!
    subscriptionsid: String
    email: String
    requesttime: String
    rstat: String
    approvetime: String
    explanation: String
    explanationA: String
    stockblockrequestis: [StockblockrequestiInput!]
  }
  input StockblockrequestiInput {
    stockblockrequestid: Int!
    seqno: Int!
    itemcode: String
    serialno: String
    batchno: String
    transqty: Float
    unit: String
    rstat: String
    explanationA: String
    stockblockrequest: StockblockrequesthInput!
  }


`;
const schemaType = buildASTSchema(parse(schema)).getType('StockblockrequesthInput');
// console.log("DATA",data)
const schemaExtras = {
};

const schemaValidator = (model) => {
    const details = [];
    if(!model.stockblockrequestis){
      details.push({name:'stockblockrequestis'});
    }
    for(let i=0; i<model?.stockblockrequestis?.length; i++){
      if(!model?.stockblockrequestis[i]?.itemcode){
        details.push({name:`stockblockrequestis.${i}.itemcode`});
      }
    }
    return details.length ? { details } : null;
};

export const bridge = new GraphQLBridge(schemaType, schemaValidator, schemaExtras);
