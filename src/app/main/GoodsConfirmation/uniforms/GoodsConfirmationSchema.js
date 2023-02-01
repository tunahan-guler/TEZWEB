import { GraphQLBridge } from 'uniforms-bridge-graphql';
import { buildASTSchema, parse } from 'graphql';

const schema = `
input GoodsreceivinghInput {
    goodsreceivingid: Int!
    subscriptionsidR: String
    deliverynoteno: Int
    shipmenttime: String
    rstat: String
    receivingtime: String
    emailR: String
    explanationR: String
    goodsreceivingis: [GoodsreceivingiInput!]!
    subscription:SubscriptionInput
  }
  input GoodsreceivingiInput {
    goodsreceivingid: Int!
    seqno: Int!
    itemcode: String
    serialno: String
    batchno: String
    transqty: Float
    unit: String
    rstat: String
    explanationR: String
    goodsreceiving: GoodsreceivinghInput
  }
input SubscriptionInput {
  subscriptionsId:String
  companyName:String
}

`;
const schemaType = buildASTSchema(parse(schema)).getType('GoodsreceivinghInput');
// console.log("DATA",data)
const schemaExtras = {
};

const schemaValidator = (model) => {
    const details = [];
    for(let i=0; i<model.goodsreceivingis?.length; i++){
      if(model?.goodsreceivingis[i]?.rstat === "R" && !model?.goodsreceivingis[i]?.explanationR){
        details.push({name: `goodsreceivingis.${i}.explanationR`})
      }
      if(!model?.goodsreceivingis[i]?.rstat){
        details.push({name:`goodsreceivingis.${i}.rstat`})
      }
    }
    return details.length ? { details } : null;
};

export const bridge = new GraphQLBridge(schemaType, schemaValidator, schemaExtras);
