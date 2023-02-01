import { GraphQLBridge } from 'uniforms-bridge-graphql';
import { buildASTSchema, parse } from 'graphql';

const schema = `
input StocktransferhInput {
  transferid: Int!
  subscriptionsidS: String
  subscriptionsidR: String
  sendtime: String
  emailS: String
  tstat: String
  accepttime: String
  emailR: String
  explanationS: String
  explanationR: String
  stocktransferis: [StocktransferiInput!]
  subscription:SubscriptionInput
}
input StocktransferiInput {
  transferid: Int!
  seqno: Int!
  itemcode: String
  serialno: String
  batchno: String
  transqty: Float
  unit: String
  tstat: String
  explanationR: String
  transfer: StocktransferhInput
}
input SubscriptionInput {
  subscriptionsId:String
  companyName:String
}

`;
const schemaType = buildASTSchema(parse(schema)).getType('StocktransferhInput');
// console.log("DATA",data)
const schemaExtras = {
};

const schemaValidator = (model) => {
    const details = [];
    if(!model?.subscriptionsidR){
      details.push({name: 'subscriptionsidR', message:'Lütfen bayi seçiniz.'})
    }
    if(!model?.stocktransferis){
      details.push({name: 'stocktransferis', message:'Lütfen stok giriniz.'})
    }
    for(let i=0; i<model.stocktransferis?.length; i++){
      if(model?.stocktransferis[i]?.tstat === "R" && !model?.stocktransferis[i]?.explanationR){
        details.push({name: `stocktransferis.${i}.explanationR`})
      }
      if(!model?.stocktransferis[i]?.tstat){
        details.push({name:`stocktransferis.${i}.tstat`})
      }
    }
    console.log(details,"ds")
    return details.length ? { details } : null;
};

export const bridge = new GraphQLBridge(schemaType, schemaValidator, schemaExtras);
