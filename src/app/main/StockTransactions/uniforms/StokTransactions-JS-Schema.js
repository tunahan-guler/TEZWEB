import Ajv from 'ajv';
import { JSONSchemaBridge } from 'uniforms-bridge-json-schema';
 

const schema = {
  type: 'object',
  title: 'StokTransactions',
  properties: {
    matDocNo: { type: 'string' },
    matDocYear: { type: 'integer'},
    transCode: { type: 'string'},
    transNo: { type: 'integer' },
    storageLocationId: { type: 'integer' },
    storageBinId : { type: 'string' },
    plantId: { type: 'integer'},
    entryDate: { type: 'string', format: 'date-time'},
    stakeholderId: { type: 'integer'},
    userName: { type: 'string'}, 
    explanation :{ type : 'string' },
    StockInsertLines: {  
        type: "array",
        items: {
            type: "object",
            properties: { 
              matDocSeq: { type: 'integer'},
              itemCode:{ type: 'string' },
              serialNo : { type: 'string' },
              batchNo : { type: 'string' },
              transQty : { type: 'integer' }, 
            },
            // required: ['matDocSeq','itemCode']
        }, 
        // minItems: 1,
        // uniqueItems: false
    }, 
  },
//   required: ['firstName', 'lastName'],
};

const ajv = new Ajv({ allErrors: true, useDefaults: true });

function createValidator(schema) {
  const validator = ajv.compile(schema);

  return (model) => {
    validator(model);
    return validator.errors?.length ? { details: validator.errors } : null;
  };
}

const schemaValidator = createValidator(schema);

export const bridge = new JSONSchemaBridge(schema, schemaValidator);