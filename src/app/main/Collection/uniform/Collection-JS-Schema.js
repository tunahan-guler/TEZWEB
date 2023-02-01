import Ajv from 'ajv';
import { JSONSchemaBridge } from 'uniforms-bridge-json-schema';

const schema = {
  type: 'object',
  title: 'Collection',
  properties: {
    accdocno: { type: 'string' },
    docdate: { format: 'date-time'},
    stakeholderid: { type: 'integer'},
    stakeholdercode: { type: 'string' },
    currency: { type: 'string' },
    accdoctype : { type: 'integer', default:1 },
    companyid: { type: 'integer', default: 1},
    accdocyear: { type: 'integer', default: 1},

    acAccountdocumentis: {
        title: 'Document deneme',
        description: "Tags for the product",
        type: "array",
        items: {
            type: "object",
            properties: {
                companyid: { type: 'integer', default : 1},
                accdocno: { type: 'string', default : "0"},
                accdocyear: { type: 'integer', default : 1},
                accdocseq: { type: 'integer', default : 0},


                movementtypeid: { type: 'integer'},
                ownercode:{ type: 'string' },
                maturitydate : { format: 'date-time' },
                amount : { type: 'integer' },
                currency : { type: 'string' },
                explanation: { type: 'string'}
            },
            required: ['movementtypeid','ownercode']
        },

        minItems: 1,
        // uniqueItems: false
    },
    explanation:{
        type: 'string', 
    }

 
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