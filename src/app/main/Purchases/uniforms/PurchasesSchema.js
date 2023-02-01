import { GraphQLBridge } from 'uniforms-bridge-graphql';
import { buildASTSchema, parse } from 'graphql';
import moment from 'moment';

const schema = `
input InvoicehInput {
  invoiceno: Int!
  plantid: Int
  companyid: Int
  invoicetype: String
  invoicedoctype: String
  documentno: String
  invdate: String
  invtime: String
  stakeholderid: Int
  shadbookid: Int
  paymentterm: String
  exchangerate: Float
  currency: String
  baseamount: Float
  discountamount: Float
  gtotalamount: Float
  exceptioncode: String
  eiType: String
  eiScenario: String
  eiStatus: String
  eiNo: String
  eiUuid: String
  eiSendinguser: String
  eiSendingtime: String
  explanation: String
  createuser: String
  createtime: String
  changeuser: String
  changetime: String
  deleted: Boolean!
  maturitydate: String
  paidamount: Float
  referencedocno: String
  stakeholder: StakeholderInput
  invoiceds: [InvoicedInput!]
  invoicepaymentplanlines: [InvoicepaymentplanlineInput!]
  invoicepaymentplan: InvoicepaymentplanInput
  acAccountdocumenths: [AcAccountdocumenthInput!]
}
input InvoicedInput {
  invoiceno: Int!
  seqno: Int!
  plantid: Int
  companyid: Int
  itemtype: String!
  itemcode: String
  conresproductvariantid: Int
  conresproductlevelid: Int
  quantity: Float
  unit: String
  unitprice: Float
  discountrate: Float
  discountamount: Float
  netamount: Float
  vatcode: String
  vatamount: Float
  sctcode: String
  sctamount: Float
  pctcode: String
  pctamount: Float
  deliverynoteno: Int
  deliverynoteseqno: Int
  orderid: Int
  orderseqno: Int
  warehouseid: Int
  locationid: Int
  explanation: String
  matdocno: String
  matdocyear: Int
  incotermcode: String
  packagingtypecode: String
  packagenumber: String
  packagecount: Int
  transportmodecode: Int
  createuser: String
  createtime: String
  changeuser: String
  changetime: String
  deleted: Boolean!
  returnedqty:Float!
  invoicedstocks: [InvoicedstockInput]
}

  input InvoicedstockInput {
    id: Int
    invoiceno: Int
    seqno: Int
    itemcode: String
    serialno: String
    batchno: String
    transqty: Float
    invoiced: InvoicedInput
    returnedqty:Float!
  }

  input InvoicepaymentplanInput {
    invoiceno: Int!
    initialpaymentdate: String
    installmentcount: Int
    installmentperiod: Int
    installmentperiodunit: String
    explanation: String
    invoicepaymentplanlines:[InvoicepaymentplanlineInput]
    invoicenoNavigation: InvoicehInput
  }

  input InvoicepaymentplanlineInput {
    paymentplanid: Int
    invoiceno: Int
    paymentdate: String
    currency: String
    amount: Float
    paidamount: Float
    invoicenoNavigation: InvoicehInput
  }

  input StakeholderInput {
    stakeholderid: Int
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
  }

  input StakeholderadbookInput {
    shadbookid: Int
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
    stakeholders: [StakeholderInput]
  }
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
    exchangeString: String
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
  }
`;
const schemaType = buildASTSchema(parse(schema)).getType('InvoicehInput');
// console.log("DATA",data)
const schemaExtras = {
};

const schemaValidator = (model) => {
  const details = [];
  if (!model.shadbookid && !model.stakeholderid) {
    details.push({ name: 'stakeholder', message: "Lütfen Tedarikçi seçiniz." });
  }
  if (!model.invoiceds) {
    details.push({ name: 'invoiceds', message: "Lütfen kalem giriniz." })
  }
  if (model.invoiceds) {
    for (let i = 0; i < model.invoiceds?.length; i++) {
      if (!model?.invoiceds[i]?.itemtype) {
        details.push({ name: `invoiceds.${i}.itemtype`, message: "Ürün tipi seçiniz." })
      }
      if (!model?.invoiceds[i]?.itemcode) {
        details.push({ name: `invoiceds.${i}.itemcode`, message: "Ürün kodu seçiniz." })
      }
      if (!model?.invoiceds[i]?.quantity) {
        details.push({ name: `invoiceds.${i}.quantity`, message: "Miktar giriniz." })
      }
      if (!model?.invoiceds[i]?.sctcode) {
        details.push({ name: `invoiceds.${i}.sctcode`, message: "ÖTV seçiniz." })
      }
      if (!model?.invoiceds[i]?.vatcode) {
        details.push({ name: `invoiceds.${i}.vatcode`, message: "KDV seçiniz." })
      }
      if (!model?.invoiceds[i]?.invoicedstocks) {
        if (model?.invoiceds[i]?.stockcontrol === "A")
          details.push({ name: `invoiceds.${i}.invoicedstocks`, message: "Stok girişi yapınız." })
      }
    }
  }
  return details.length ? { details } : null;
};

// eslint-disable-next-line import/prefer-default-export
console.table("GraphQLBridge", new GraphQLBridge(schemaType, schemaValidator, schemaExtras))
export const bridge = new GraphQLBridge(schemaType, schemaValidator, schemaExtras);
