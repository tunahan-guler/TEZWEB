import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `DateTime` scalar represents an ISO-8601 compliant date time type. */
  DateTime: any;
  /** The built-in `Decimal` scalar type. */
  Decimal: any;
  /** The `Long` scalar type represents non-fractional signed whole 64-bit numeric values. Long can represent values between -(2^63) and 2^63 - 1. */
  Long: any;
  /** The `Short` scalar type represents non-fractional signed whole 16-bit numeric values. Short can represent values between -(2^15) and 2^15 - 1. */
  Short: any;
};

export type AcAccountclass = {
  __typename?: 'AcAccountclass';
  acAccountdocumenths?: Maybe<Array<AcAccountdocumenth>>;
  acAccountdocumentis?: Maybe<Array<AcAccountdocumenti>>;
  acPaymentorders?: Maybe<Array<AcPaymentorder>>;
  accountclassid: Scalars['Int'];
  accountclassname?: Maybe<Scalars['String']>;
};

export type AcAccountclassFilterInput = {
  acAccountdocumenths?: InputMaybe<ListFilterInputTypeOfAcAccountdocumenthFilterInput>;
  acAccountdocumentis?: InputMaybe<ListFilterInputTypeOfAcAccountdocumentiFilterInput>;
  acPaymentorders?: InputMaybe<ListFilterInputTypeOfAcPaymentorderFilterInput>;
  accountclassid?: InputMaybe<ComparableInt32OperationFilterInput>;
  accountclassname?: InputMaybe<StringOperationFilterInput>;
  and?: InputMaybe<Array<AcAccountclassFilterInput>>;
  or?: InputMaybe<Array<AcAccountclassFilterInput>>;
};

export type AcAccountclassInput = {
  acAccountdocumenths?: InputMaybe<Array<AcAccountdocumenthInput>>;
  acAccountdocumentis?: InputMaybe<Array<AcAccountdocumentiInput>>;
  acPaymentorders?: InputMaybe<Array<AcPaymentorderInput>>;
  accountclassid: Scalars['Int'];
  accountclassname?: InputMaybe<Scalars['String']>;
};

export type AcAccountdocumenth = {
  __typename?: 'AcAccountdocumenth';
  acAccountdocumentis?: Maybe<Array<AcAccountdocumenti>>;
  accdocno: Scalars['String'];
  accdoctype?: Maybe<Scalars['Int']>;
  accdoctypeNavigation?: Maybe<AcDocumenttype>;
  accdocyear: Scalars['Int'];
  accountclass?: Maybe<AcAccountclass>;
  accountclassid?: Maybe<Scalars['Int']>;
  accountcode?: Maybe<Scalars['String']>;
  amount?: Maybe<Scalars['Decimal']>;
  amountlc?: Maybe<Scalars['Decimal']>;
  changetime?: Maybe<Scalars['DateTime']>;
  changeuser?: Maybe<Scalars['String']>;
  company?: Maybe<Company>;
  companyid: Scalars['Long'];
  createtime?: Maybe<Scalars['DateTime']>;
  createuser?: Maybe<Scalars['String']>;
  currency?: Maybe<Scalars['String']>;
  currencylc?: Maybe<Scalars['String']>;
  deleted?: Maybe<Scalars['Boolean']>;
  docdate?: Maybe<Scalars['DateTime']>;
  exchangedate?: Maybe<Scalars['DateTime']>;
  exchangerate?: Maybe<Scalars['Decimal']>;
  explanation?: Maybe<Scalars['String']>;
  invoiceno?: Maybe<Scalars['Long']>;
  invoicenoNavigation?: Maybe<Invoiceh>;
  period?: Maybe<Scalars['Int']>;
  plant?: Maybe<Companyplant>;
  plantid?: Maybe<Scalars['Int']>;
  referenceno?: Maybe<Scalars['String']>;
  stakeholder?: Maybe<Stakeholder>;
  stakeholderid?: Maybe<Scalars['Long']>;
};

export type AcAccountdocumenthFilterInput = {
  acAccountdocumentis?: InputMaybe<ListFilterInputTypeOfAcAccountdocumentiFilterInput>;
  accdocno?: InputMaybe<StringOperationFilterInput>;
  accdoctype?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  accdoctypeNavigation?: InputMaybe<AcDocumenttypeFilterInput>;
  accdocyear?: InputMaybe<ComparableInt32OperationFilterInput>;
  accountclass?: InputMaybe<AcAccountclassFilterInput>;
  accountclassid?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  accountcode?: InputMaybe<StringOperationFilterInput>;
  amount?: InputMaybe<ComparableNullableOfDecimalOperationFilterInput>;
  amountlc?: InputMaybe<ComparableNullableOfDecimalOperationFilterInput>;
  and?: InputMaybe<Array<AcAccountdocumenthFilterInput>>;
  changetime?: InputMaybe<ComparableNullableOfDateTimeOperationFilterInput>;
  changeuser?: InputMaybe<StringOperationFilterInput>;
  company?: InputMaybe<CompanyFilterInput>;
  companyid?: InputMaybe<ComparableInt64OperationFilterInput>;
  createtime?: InputMaybe<ComparableNullableOfDateTimeOperationFilterInput>;
  createuser?: InputMaybe<StringOperationFilterInput>;
  currency?: InputMaybe<StringOperationFilterInput>;
  currencylc?: InputMaybe<StringOperationFilterInput>;
  deleted?: InputMaybe<BooleanOperationFilterInput>;
  docdate?: InputMaybe<ComparableNullableOfDateTimeOperationFilterInput>;
  exchangedate?: InputMaybe<ComparableNullableOfDateTimeOperationFilterInput>;
  exchangerate?: InputMaybe<ComparableNullableOfDecimalOperationFilterInput>;
  explanation?: InputMaybe<StringOperationFilterInput>;
  invoiceno?: InputMaybe<ComparableNullableOfInt64OperationFilterInput>;
  invoicenoNavigation?: InputMaybe<InvoicehFilterInput>;
  or?: InputMaybe<Array<AcAccountdocumenthFilterInput>>;
  period?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  plant?: InputMaybe<CompanyplantFilterInput>;
  plantid?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  referenceno?: InputMaybe<StringOperationFilterInput>;
  stakeholder?: InputMaybe<StakeholderFilterInput>;
  stakeholderid?: InputMaybe<ComparableNullableOfInt64OperationFilterInput>;
};

export type AcAccountdocumenthInput = {
  acAccountdocumentis?: InputMaybe<Array<AcAccountdocumentiInput>>;
  accdocno: Scalars['String'];
  accdoctype?: InputMaybe<Scalars['Int']>;
  accdoctypeNavigation?: InputMaybe<AcDocumenttypeInput>;
  accdocyear: Scalars['Int'];
  accountclass?: InputMaybe<AcAccountclassInput>;
  accountclassid?: InputMaybe<Scalars['Int']>;
  accountcode?: InputMaybe<Scalars['String']>;
  amount?: InputMaybe<Scalars['Decimal']>;
  amountlc?: InputMaybe<Scalars['Decimal']>;
  changetime?: InputMaybe<Scalars['DateTime']>;
  changeuser?: InputMaybe<Scalars['String']>;
  company?: InputMaybe<CompanyInput>;
  companyid: Scalars['Long'];
  createtime?: InputMaybe<Scalars['DateTime']>;
  createuser?: InputMaybe<Scalars['String']>;
  currency?: InputMaybe<Scalars['String']>;
  currencylc?: InputMaybe<Scalars['String']>;
  deleted?: InputMaybe<Scalars['Boolean']>;
  docdate?: InputMaybe<Scalars['DateTime']>;
  exchangedate?: InputMaybe<Scalars['DateTime']>;
  exchangerate?: InputMaybe<Scalars['Decimal']>;
  explanation?: InputMaybe<Scalars['String']>;
  invoiceno?: InputMaybe<Scalars['Long']>;
  invoicenoNavigation?: InputMaybe<InvoicehInput>;
  period?: InputMaybe<Scalars['Int']>;
  plant?: InputMaybe<CompanyplantInput>;
  plantid?: InputMaybe<Scalars['Int']>;
  referenceno?: InputMaybe<Scalars['String']>;
  stakeholder?: InputMaybe<StakeholderInput>;
  stakeholderid?: InputMaybe<Scalars['Long']>;
};

export type AcAccountdocumenti = {
  __typename?: 'AcAccountdocumenti';
  acAccountdocumenth?: Maybe<AcAccountdocumenth>;
  acPaymentorders?: Maybe<Array<AcPaymentorder>>;
  accdocno: Scalars['String'];
  accdocseq: Scalars['Int'];
  accdocyear: Scalars['Int'];
  accountclass?: Maybe<AcAccountclass>;
  accountclassid?: Maybe<Scalars['Int']>;
  amount?: Maybe<Scalars['Decimal']>;
  amountlc?: Maybe<Scalars['Decimal']>;
  changetime?: Maybe<Scalars['DateTime']>;
  changeuser?: Maybe<Scalars['String']>;
  company?: Maybe<Company>;
  companyid: Scalars['Long'];
  createtime?: Maybe<Scalars['DateTime']>;
  createuser?: Maybe<Scalars['String']>;
  currency?: Maybe<Scalars['String']>;
  dcindicator?: Maybe<Scalars['String']>;
  deleted?: Maybe<Scalars['Boolean']>;
  explanation?: Maybe<Scalars['String']>;
  glaccount?: Maybe<Scalars['String']>;
  maturitydate?: Maybe<Scalars['DateTime']>;
  movementtype?: Maybe<AcMovementtype>;
  movementtypeid?: Maybe<Scalars['Int']>;
  ownercode?: Maybe<Scalars['String']>;
  paymentorderno?: Maybe<Scalars['String']>;
  paymentterm?: Maybe<Scalars['String']>;
  paymenttermNavigation?: Maybe<AcPaymentterm>;
  stakeholder?: Maybe<Stakeholder>;
  stakeholderid?: Maybe<Scalars['Long']>;
};

export type AcAccountdocumentiFilterInput = {
  acAccountdocumenth?: InputMaybe<AcAccountdocumenthFilterInput>;
  acPaymentorders?: InputMaybe<ListFilterInputTypeOfAcPaymentorderFilterInput>;
  accdocno?: InputMaybe<StringOperationFilterInput>;
  accdocseq?: InputMaybe<ComparableInt32OperationFilterInput>;
  accdocyear?: InputMaybe<ComparableInt32OperationFilterInput>;
  accountclass?: InputMaybe<AcAccountclassFilterInput>;
  accountclassid?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  amount?: InputMaybe<ComparableNullableOfDecimalOperationFilterInput>;
  amountlc?: InputMaybe<ComparableNullableOfDecimalOperationFilterInput>;
  and?: InputMaybe<Array<AcAccountdocumentiFilterInput>>;
  changetime?: InputMaybe<ComparableNullableOfDateTimeOperationFilterInput>;
  changeuser?: InputMaybe<StringOperationFilterInput>;
  company?: InputMaybe<CompanyFilterInput>;
  companyid?: InputMaybe<ComparableInt64OperationFilterInput>;
  createtime?: InputMaybe<ComparableNullableOfDateTimeOperationFilterInput>;
  createuser?: InputMaybe<StringOperationFilterInput>;
  currency?: InputMaybe<StringOperationFilterInput>;
  dcindicator?: InputMaybe<StringOperationFilterInput>;
  deleted?: InputMaybe<BooleanOperationFilterInput>;
  explanation?: InputMaybe<StringOperationFilterInput>;
  glaccount?: InputMaybe<StringOperationFilterInput>;
  maturitydate?: InputMaybe<ComparableNullableOfDateTimeOperationFilterInput>;
  movementtype?: InputMaybe<AcMovementtypeFilterInput>;
  movementtypeid?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  or?: InputMaybe<Array<AcAccountdocumentiFilterInput>>;
  ownercode?: InputMaybe<StringOperationFilterInput>;
  paymentorderno?: InputMaybe<StringOperationFilterInput>;
  paymentterm?: InputMaybe<StringOperationFilterInput>;
  paymenttermNavigation?: InputMaybe<AcPaymenttermFilterInput>;
  stakeholder?: InputMaybe<StakeholderFilterInput>;
  stakeholderid?: InputMaybe<ComparableNullableOfInt64OperationFilterInput>;
};

export type AcAccountdocumentiInput = {
  acAccountdocumenth?: InputMaybe<AcAccountdocumenthInput>;
  acPaymentorders?: InputMaybe<Array<AcPaymentorderInput>>;
  accdocno: Scalars['String'];
  accdocseq: Scalars['Int'];
  accdocyear: Scalars['Int'];
  accountclass?: InputMaybe<AcAccountclassInput>;
  accountclassid?: InputMaybe<Scalars['Int']>;
  amount?: InputMaybe<Scalars['Decimal']>;
  amountlc?: InputMaybe<Scalars['Decimal']>;
  changetime?: InputMaybe<Scalars['DateTime']>;
  changeuser?: InputMaybe<Scalars['String']>;
  company?: InputMaybe<CompanyInput>;
  companyid: Scalars['Long'];
  createtime?: InputMaybe<Scalars['DateTime']>;
  createuser?: InputMaybe<Scalars['String']>;
  currency?: InputMaybe<Scalars['String']>;
  dcindicator?: InputMaybe<Scalars['String']>;
  deleted?: InputMaybe<Scalars['Boolean']>;
  explanation?: InputMaybe<Scalars['String']>;
  glaccount?: InputMaybe<Scalars['String']>;
  maturitydate?: InputMaybe<Scalars['DateTime']>;
  movementtype?: InputMaybe<AcMovementtypeInput>;
  movementtypeid?: InputMaybe<Scalars['Int']>;
  ownercode?: InputMaybe<Scalars['String']>;
  paymentorderno?: InputMaybe<Scalars['String']>;
  paymentterm?: InputMaybe<Scalars['String']>;
  paymenttermNavigation?: InputMaybe<AcPaymenttermInput>;
  stakeholder?: InputMaybe<StakeholderInput>;
  stakeholderid?: InputMaybe<Scalars['Long']>;
};

export type AcBankaccount = {
  __typename?: 'AcBankaccount';
  accountno?: Maybe<Scalars['String']>;
  bankaccountcode: Scalars['String'];
  bankaccountname?: Maybe<Scalars['String']>;
  bankaccounttypeid?: Maybe<Scalars['Int']>;
  bankcode?: Maybe<Scalars['String']>;
  bastat?: Maybe<Scalars['String']>;
  branchcode?: Maybe<Scalars['String']>;
  creditcard?: Maybe<Scalars['Boolean']>;
  currency?: Maybe<Scalars['String']>;
  ibanno?: Maybe<Scalars['String']>;
  plant?: Maybe<Companyplant>;
  plantid: Scalars['Int'];
};

export type AcBankaccountFilterInput = {
  accountno?: InputMaybe<StringOperationFilterInput>;
  and?: InputMaybe<Array<AcBankaccountFilterInput>>;
  bankaccountcode?: InputMaybe<StringOperationFilterInput>;
  bankaccountname?: InputMaybe<StringOperationFilterInput>;
  bankaccounttypeid?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  bankcode?: InputMaybe<StringOperationFilterInput>;
  bastat?: InputMaybe<StringOperationFilterInput>;
  branchcode?: InputMaybe<StringOperationFilterInput>;
  creditcard?: InputMaybe<BooleanOperationFilterInput>;
  currency?: InputMaybe<StringOperationFilterInput>;
  ibanno?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<AcBankaccountFilterInput>>;
  plant?: InputMaybe<CompanyplantFilterInput>;
  plantid?: InputMaybe<ComparableInt32OperationFilterInput>;
};

export type AcBankaccountInput = {
  accountno?: InputMaybe<Scalars['String']>;
  bankaccountcode: Scalars['String'];
  bankaccountname?: InputMaybe<Scalars['String']>;
  bankaccounttypeid?: InputMaybe<Scalars['Int']>;
  bankcode?: InputMaybe<Scalars['String']>;
  bastat?: InputMaybe<Scalars['String']>;
  branchcode?: InputMaybe<Scalars['String']>;
  creditcard?: InputMaybe<Scalars['Boolean']>;
  currency?: InputMaybe<Scalars['String']>;
  ibanno?: InputMaybe<Scalars['String']>;
  plant?: InputMaybe<CompanyplantInput>;
  plantid: Scalars['Int'];
};

export type AcCurrency = {
  __typename?: 'AcCurrency';
  cstat?: Maybe<Scalars['String']>;
  currency: Scalars['String'];
  description?: Maybe<Scalars['String']>;
};

export type AcDocumenttype = {
  __typename?: 'AcDocumenttype';
  acAccountdocumenths?: Maybe<Array<AcAccountdocumenth>>;
  accdoctype: Scalars['Int'];
  accdoctypename: Scalars['String'];
  dcindicator?: Maybe<Scalars['String']>;
};

export type AcDocumenttypeFilterInput = {
  acAccountdocumenths?: InputMaybe<ListFilterInputTypeOfAcAccountdocumenthFilterInput>;
  accdoctype?: InputMaybe<ComparableInt32OperationFilterInput>;
  accdoctypename?: InputMaybe<StringOperationFilterInput>;
  and?: InputMaybe<Array<AcDocumenttypeFilterInput>>;
  dcindicator?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<AcDocumenttypeFilterInput>>;
};

export type AcDocumenttypeInput = {
  acAccountdocumenths?: InputMaybe<Array<AcAccountdocumenthInput>>;
  accdoctype: Scalars['Int'];
  accdoctypename: Scalars['String'];
  dcindicator?: InputMaybe<Scalars['String']>;
};

export type AcMovementtype = {
  __typename?: 'AcMovementtype';
  acAccountdocumentis?: Maybe<Array<AcAccountdocumenti>>;
  acPaymentorders?: Maybe<Array<AcPaymentorder>>;
  movementgroup?: Maybe<Scalars['String']>;
  movementtypeid: Scalars['Int'];
  movementtypename?: Maybe<Scalars['String']>;
};

export type AcMovementtypeFilterInput = {
  acAccountdocumentis?: InputMaybe<ListFilterInputTypeOfAcAccountdocumentiFilterInput>;
  acPaymentorders?: InputMaybe<ListFilterInputTypeOfAcPaymentorderFilterInput>;
  and?: InputMaybe<Array<AcMovementtypeFilterInput>>;
  movementgroup?: InputMaybe<StringOperationFilterInput>;
  movementtypeid?: InputMaybe<ComparableInt32OperationFilterInput>;
  movementtypename?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<AcMovementtypeFilterInput>>;
};

export type AcMovementtypeInput = {
  acAccountdocumentis?: InputMaybe<Array<AcAccountdocumentiInput>>;
  acPaymentorders?: InputMaybe<Array<AcPaymentorderInput>>;
  movementgroup?: InputMaybe<Scalars['String']>;
  movementtypeid: Scalars['Int'];
  movementtypename?: InputMaybe<Scalars['String']>;
};

export type AcPaymentorder = {
  __typename?: 'AcPaymentorder';
  acAccountdocumenti?: Maybe<AcAccountdocumenti>;
  accdocno: Scalars['String'];
  accdocseq: Scalars['Int'];
  accdocyear: Scalars['Int'];
  accountclass?: Maybe<AcAccountclass>;
  accountclassid?: Maybe<Scalars['Int']>;
  accountno: Scalars['String'];
  amount?: Maybe<Scalars['Decimal']>;
  amountlc?: Maybe<Scalars['Decimal']>;
  bankcode?: Maybe<Scalars['String']>;
  branchcode?: Maybe<Scalars['String']>;
  changetime?: Maybe<Scalars['DateTime']>;
  changeuser?: Maybe<Scalars['String']>;
  chequeno?: Maybe<Scalars['String']>;
  company: Company;
  companyid: Scalars['Long'];
  createtime?: Maybe<Scalars['DateTime']>;
  createuser?: Maybe<Scalars['String']>;
  currency?: Maybe<Scalars['String']>;
  debitor?: Maybe<Scalars['String']>;
  deleted?: Maybe<Scalars['Boolean']>;
  explanation?: Maybe<Scalars['String']>;
  ibanno: Scalars['String'];
  installmentcount?: Maybe<Scalars['Int']>;
  maturitydate?: Maybe<Scalars['DateTime']>;
  movementtype?: Maybe<AcMovementtype>;
  movementtypeid?: Maybe<Scalars['Int']>;
  nstakeholderid?: Maybe<Scalars['Long']>;
  ownercode?: Maybe<Scalars['String']>;
  paymentorderno: Scalars['String'];
  placeofissue?: Maybe<Scalars['String']>;
  portfoliocode?: Maybe<Scalars['String']>;
  pstat: Scalars['String'];
  stakeholder?: Maybe<Stakeholder>;
  stakeholderid?: Maybe<Scalars['Long']>;
};

export type AcPaymentorderFilterInput = {
  acAccountdocumenti?: InputMaybe<AcAccountdocumentiFilterInput>;
  accdocno?: InputMaybe<StringOperationFilterInput>;
  accdocseq?: InputMaybe<ComparableInt32OperationFilterInput>;
  accdocyear?: InputMaybe<ComparableInt32OperationFilterInput>;
  accountclass?: InputMaybe<AcAccountclassFilterInput>;
  accountclassid?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  accountno?: InputMaybe<StringOperationFilterInput>;
  amount?: InputMaybe<ComparableNullableOfDecimalOperationFilterInput>;
  amountlc?: InputMaybe<ComparableNullableOfDecimalOperationFilterInput>;
  and?: InputMaybe<Array<AcPaymentorderFilterInput>>;
  bankcode?: InputMaybe<StringOperationFilterInput>;
  branchcode?: InputMaybe<StringOperationFilterInput>;
  changetime?: InputMaybe<ComparableNullableOfDateTimeOperationFilterInput>;
  changeuser?: InputMaybe<StringOperationFilterInput>;
  chequeno?: InputMaybe<StringOperationFilterInput>;
  company?: InputMaybe<CompanyFilterInput>;
  companyid?: InputMaybe<ComparableInt64OperationFilterInput>;
  createtime?: InputMaybe<ComparableNullableOfDateTimeOperationFilterInput>;
  createuser?: InputMaybe<StringOperationFilterInput>;
  currency?: InputMaybe<StringOperationFilterInput>;
  debitor?: InputMaybe<StringOperationFilterInput>;
  deleted?: InputMaybe<BooleanOperationFilterInput>;
  explanation?: InputMaybe<StringOperationFilterInput>;
  ibanno?: InputMaybe<StringOperationFilterInput>;
  installmentcount?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  maturitydate?: InputMaybe<ComparableNullableOfDateTimeOperationFilterInput>;
  movementtype?: InputMaybe<AcMovementtypeFilterInput>;
  movementtypeid?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  nstakeholderid?: InputMaybe<ComparableNullableOfInt64OperationFilterInput>;
  or?: InputMaybe<Array<AcPaymentorderFilterInput>>;
  ownercode?: InputMaybe<StringOperationFilterInput>;
  paymentorderno?: InputMaybe<StringOperationFilterInput>;
  placeofissue?: InputMaybe<StringOperationFilterInput>;
  portfoliocode?: InputMaybe<StringOperationFilterInput>;
  pstat?: InputMaybe<StringOperationFilterInput>;
  stakeholder?: InputMaybe<StakeholderFilterInput>;
  stakeholderid?: InputMaybe<ComparableNullableOfInt64OperationFilterInput>;
};

export type AcPaymentorderInput = {
  acAccountdocumenti?: InputMaybe<AcAccountdocumentiInput>;
  accdocno: Scalars['String'];
  accdocseq: Scalars['Int'];
  accdocyear: Scalars['Int'];
  accountclass?: InputMaybe<AcAccountclassInput>;
  accountclassid?: InputMaybe<Scalars['Int']>;
  accountno: Scalars['String'];
  amount?: InputMaybe<Scalars['Decimal']>;
  amountlc?: InputMaybe<Scalars['Decimal']>;
  bankcode?: InputMaybe<Scalars['String']>;
  branchcode?: InputMaybe<Scalars['String']>;
  changetime?: InputMaybe<Scalars['DateTime']>;
  changeuser?: InputMaybe<Scalars['String']>;
  chequeno?: InputMaybe<Scalars['String']>;
  company: CompanyInput;
  companyid: Scalars['Long'];
  createtime?: InputMaybe<Scalars['DateTime']>;
  createuser?: InputMaybe<Scalars['String']>;
  currency?: InputMaybe<Scalars['String']>;
  debitor?: InputMaybe<Scalars['String']>;
  deleted?: InputMaybe<Scalars['Boolean']>;
  explanation?: InputMaybe<Scalars['String']>;
  ibanno: Scalars['String'];
  installmentcount?: InputMaybe<Scalars['Int']>;
  maturitydate?: InputMaybe<Scalars['DateTime']>;
  movementtype?: InputMaybe<AcMovementtypeInput>;
  movementtypeid?: InputMaybe<Scalars['Int']>;
  nstakeholderid?: InputMaybe<Scalars['Long']>;
  ownercode?: InputMaybe<Scalars['String']>;
  paymentorderno: Scalars['String'];
  placeofissue?: InputMaybe<Scalars['String']>;
  portfoliocode?: InputMaybe<Scalars['String']>;
  pstat: Scalars['String'];
  stakeholder?: InputMaybe<StakeholderInput>;
  stakeholderid?: InputMaybe<Scalars['Long']>;
};

export type AcPaymentterm = {
  __typename?: 'AcPaymentterm';
  acAccountdocumentis?: Maybe<Array<AcAccountdocumenti>>;
  active?: Maybe<Scalars['Boolean']>;
  daycount?: Maybe<Scalars['Int']>;
  fixedday?: Maybe<Scalars['Int']>;
  invoicehs?: Maybe<Array<Invoiceh>>;
  maindate?: Maybe<Scalars['String']>;
  paymentterm: Scalars['String'];
  paymenttermdesc?: Maybe<Scalars['String']>;
  paymenttermtype?: Maybe<Scalars['String']>;
};

export type AcPaymenttermFilterInput = {
  acAccountdocumentis?: InputMaybe<ListFilterInputTypeOfAcAccountdocumentiFilterInput>;
  active?: InputMaybe<BooleanOperationFilterInput>;
  and?: InputMaybe<Array<AcPaymenttermFilterInput>>;
  daycount?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  fixedday?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  invoicehs?: InputMaybe<ListFilterInputTypeOfInvoicehFilterInput>;
  maindate?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<AcPaymenttermFilterInput>>;
  paymentterm?: InputMaybe<StringOperationFilterInput>;
  paymenttermdesc?: InputMaybe<StringOperationFilterInput>;
  paymenttermtype?: InputMaybe<StringOperationFilterInput>;
};

export type AcPaymenttermInput = {
  acAccountdocumentis?: InputMaybe<Array<AcAccountdocumentiInput>>;
  active?: InputMaybe<Scalars['Boolean']>;
  daycount?: InputMaybe<Scalars['Int']>;
  fixedday?: InputMaybe<Scalars['Int']>;
  invoicehs?: InputMaybe<Array<InvoicehInput>>;
  maindate?: InputMaybe<Scalars['String']>;
  paymentterm: Scalars['String'];
  paymenttermdesc?: InputMaybe<Scalars['String']>;
  paymenttermtype?: InputMaybe<Scalars['String']>;
};

export type AcTill = {
  __typename?: 'AcTill';
  currency?: Maybe<Scalars['String']>;
  plant?: Maybe<Companyplant>;
  plantid: Scalars['Int'];
  tillcode: Scalars['String'];
  tillname?: Maybe<Scalars['String']>;
  tstat?: Maybe<Scalars['String']>;
};

export type AcTillFilterInput = {
  and?: InputMaybe<Array<AcTillFilterInput>>;
  currency?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<AcTillFilterInput>>;
  plant?: InputMaybe<CompanyplantFilterInput>;
  plantid?: InputMaybe<ComparableInt32OperationFilterInput>;
  tillcode?: InputMaybe<StringOperationFilterInput>;
  tillname?: InputMaybe<StringOperationFilterInput>;
  tstat?: InputMaybe<StringOperationFilterInput>;
};

export type AcTillInput = {
  currency?: InputMaybe<Scalars['String']>;
  plant?: InputMaybe<CompanyplantInput>;
  plantid: Scalars['Int'];
  tillcode: Scalars['String'];
  tillname?: InputMaybe<Scalars['String']>;
  tstat?: InputMaybe<Scalars['String']>;
};

export enum AddOrUpdateEnum {
  Add = 'ADD',
  Update = 'UPDATE'
}

export enum ApplyPolicy {
  AfterResolver = 'AFTER_RESOLVER',
  BeforeResolver = 'BEFORE_RESOLVER'
}

export type BooleanOperationFilterInput = {
  eq?: InputMaybe<Scalars['Boolean']>;
  neq?: InputMaybe<Scalars['Boolean']>;
};

export type Company = {
  __typename?: 'Company';
  acAccountdocumenths?: Maybe<Array<AcAccountdocumenth>>;
  acAccountdocumentis?: Maybe<Array<AcAccountdocumenti>>;
  acPaymentorders?: Maybe<Array<AcPaymentorder>>;
  address?: Maybe<Scalars['String']>;
  chartaccount?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  companycode: Scalars['String'];
  companyesolutionparam?: Maybe<Companyesolutionparam>;
  companyid: Scalars['Long'];
  companyname?: Maybe<Scalars['String']>;
  companyplants?: Maybe<Array<Companyplant>>;
  country?: Maybe<Scalars['String']>;
  currency?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  faxno?: Maybe<Scalars['String']>;
  invoiceds?: Maybe<Array<Invoiced>>;
  invoicehs?: Maybe<Array<Invoiceh>>;
  invoicenumberasses?: Maybe<Array<Invoicenumberass>>;
  mersisno?: Maybe<Scalars['String']>;
  postcode?: Maybe<Scalars['String']>;
  signature?: Maybe<Scalars['String']>;
  taxno?: Maybe<Scalars['String']>;
  taxoffice?: Maybe<Scalars['String']>;
  telno?: Maybe<Scalars['String']>;
  traderegisterno?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
};

export type CompanyFilterInput = {
  acAccountdocumenths?: InputMaybe<ListFilterInputTypeOfAcAccountdocumenthFilterInput>;
  acAccountdocumentis?: InputMaybe<ListFilterInputTypeOfAcAccountdocumentiFilterInput>;
  acPaymentorders?: InputMaybe<ListFilterInputTypeOfAcPaymentorderFilterInput>;
  address?: InputMaybe<StringOperationFilterInput>;
  and?: InputMaybe<Array<CompanyFilterInput>>;
  chartaccount?: InputMaybe<StringOperationFilterInput>;
  city?: InputMaybe<StringOperationFilterInput>;
  companycode?: InputMaybe<StringOperationFilterInput>;
  companyesolutionparam?: InputMaybe<CompanyesolutionparamFilterInput>;
  companyid?: InputMaybe<ComparableInt64OperationFilterInput>;
  companyname?: InputMaybe<StringOperationFilterInput>;
  companyplants?: InputMaybe<ListFilterInputTypeOfCompanyplantFilterInput>;
  country?: InputMaybe<StringOperationFilterInput>;
  currency?: InputMaybe<StringOperationFilterInput>;
  email?: InputMaybe<StringOperationFilterInput>;
  faxno?: InputMaybe<StringOperationFilterInput>;
  invoiceds?: InputMaybe<ListFilterInputTypeOfInvoicedFilterInput>;
  invoicehs?: InputMaybe<ListFilterInputTypeOfInvoicehFilterInput>;
  invoicenumberasses?: InputMaybe<ListFilterInputTypeOfInvoicenumberassFilterInput>;
  mersisno?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<CompanyFilterInput>>;
  postcode?: InputMaybe<StringOperationFilterInput>;
  signature?: InputMaybe<StringOperationFilterInput>;
  taxno?: InputMaybe<StringOperationFilterInput>;
  taxoffice?: InputMaybe<StringOperationFilterInput>;
  telno?: InputMaybe<StringOperationFilterInput>;
  traderegisterno?: InputMaybe<StringOperationFilterInput>;
  website?: InputMaybe<StringOperationFilterInput>;
};

export type CompanyInput = {
  acAccountdocumenths?: InputMaybe<Array<AcAccountdocumenthInput>>;
  acAccountdocumentis?: InputMaybe<Array<AcAccountdocumentiInput>>;
  acPaymentorders?: InputMaybe<Array<AcPaymentorderInput>>;
  address?: InputMaybe<Scalars['String']>;
  chartaccount?: InputMaybe<Scalars['String']>;
  city?: InputMaybe<Scalars['String']>;
  companycode: Scalars['String'];
  companyesolutionparam?: InputMaybe<CompanyesolutionparamInput>;
  companyid: Scalars['Long'];
  companyname?: InputMaybe<Scalars['String']>;
  companyplants?: InputMaybe<Array<CompanyplantInput>>;
  country?: InputMaybe<Scalars['String']>;
  currency?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  faxno?: InputMaybe<Scalars['String']>;
  invoiceds?: InputMaybe<Array<InvoicedInput>>;
  invoicehs?: InputMaybe<Array<InvoicehInput>>;
  invoicenumberasses?: InputMaybe<Array<InvoicenumberassInput>>;
  mersisno?: InputMaybe<Scalars['String']>;
  postcode?: InputMaybe<Scalars['String']>;
  signature?: InputMaybe<Scalars['String']>;
  taxno?: InputMaybe<Scalars['String']>;
  taxoffice?: InputMaybe<Scalars['String']>;
  telno?: InputMaybe<Scalars['String']>;
  traderegisterno?: InputMaybe<Scalars['String']>;
  website?: InputMaybe<Scalars['String']>;
};

export type Companyesolutionparam = {
  __typename?: 'Companyesolutionparam';
  company?: Maybe<Company>;
  companyid: Scalars['Long'];
  earchivePassword?: Maybe<Scalars['String']>;
  earchiveUsername?: Maybe<Scalars['String']>;
  einvoicePassword?: Maybe<Scalars['String']>;
  einvoiceUsername?: Maybe<Scalars['String']>;
  receiverlabel?: Maybe<Scalars['String']>;
  senderlabel?: Maybe<Scalars['String']>;
};

export type CompanyesolutionparamFilterInput = {
  and?: InputMaybe<Array<CompanyesolutionparamFilterInput>>;
  company?: InputMaybe<CompanyFilterInput>;
  companyid?: InputMaybe<ComparableInt64OperationFilterInput>;
  earchivePassword?: InputMaybe<StringOperationFilterInput>;
  earchiveUsername?: InputMaybe<StringOperationFilterInput>;
  einvoicePassword?: InputMaybe<StringOperationFilterInput>;
  einvoiceUsername?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<CompanyesolutionparamFilterInput>>;
  receiverlabel?: InputMaybe<StringOperationFilterInput>;
  senderlabel?: InputMaybe<StringOperationFilterInput>;
};

export type CompanyesolutionparamInput = {
  company?: InputMaybe<CompanyInput>;
  companyid: Scalars['Long'];
  earchivePassword?: InputMaybe<Scalars['String']>;
  earchiveUsername?: InputMaybe<Scalars['String']>;
  einvoicePassword?: InputMaybe<Scalars['String']>;
  einvoiceUsername?: InputMaybe<Scalars['String']>;
  receiverlabel?: InputMaybe<Scalars['String']>;
  senderlabel?: InputMaybe<Scalars['String']>;
};

export type Companyplant = {
  __typename?: 'Companyplant';
  acAccountdocumenths?: Maybe<Array<AcAccountdocumenth>>;
  acBankaccounts?: Maybe<Array<AcBankaccount>>;
  acTills?: Maybe<Array<AcTill>>;
  company?: Maybe<Company>;
  companyid?: Maybe<Scalars['Long']>;
  invoiceds?: Maybe<Array<Invoiced>>;
  invoicehs?: Maybe<Array<Invoiceh>>;
  invoicenumberasses?: Maybe<Array<Invoicenumberass>>;
  plantcode?: Maybe<Scalars['String']>;
  plantid: Scalars['Int'];
  plantname?: Maybe<Scalars['String']>;
  stocks?: Maybe<Array<Stock>>;
  storagelocations?: Maybe<Array<Storagelocation>>;
};

export type CompanyplantFilterInput = {
  acAccountdocumenths?: InputMaybe<ListFilterInputTypeOfAcAccountdocumenthFilterInput>;
  acBankaccounts?: InputMaybe<ListFilterInputTypeOfAcBankaccountFilterInput>;
  acTills?: InputMaybe<ListFilterInputTypeOfAcTillFilterInput>;
  and?: InputMaybe<Array<CompanyplantFilterInput>>;
  company?: InputMaybe<CompanyFilterInput>;
  companyid?: InputMaybe<ComparableNullableOfInt64OperationFilterInput>;
  invoiceds?: InputMaybe<ListFilterInputTypeOfInvoicedFilterInput>;
  invoicehs?: InputMaybe<ListFilterInputTypeOfInvoicehFilterInput>;
  invoicenumberasses?: InputMaybe<ListFilterInputTypeOfInvoicenumberassFilterInput>;
  or?: InputMaybe<Array<CompanyplantFilterInput>>;
  plantcode?: InputMaybe<StringOperationFilterInput>;
  plantid?: InputMaybe<ComparableInt32OperationFilterInput>;
  plantname?: InputMaybe<StringOperationFilterInput>;
  stocks?: InputMaybe<ListFilterInputTypeOfStockFilterInput>;
  storagelocations?: InputMaybe<ListFilterInputTypeOfStoragelocationFilterInput>;
};

export type CompanyplantInput = {
  acAccountdocumenths?: InputMaybe<Array<AcAccountdocumenthInput>>;
  acBankaccounts?: InputMaybe<Array<AcBankaccountInput>>;
  acTills?: InputMaybe<Array<AcTillInput>>;
  company?: InputMaybe<CompanyInput>;
  companyid?: InputMaybe<Scalars['Long']>;
  invoiceds?: InputMaybe<Array<InvoicedInput>>;
  invoicehs?: InputMaybe<Array<InvoicehInput>>;
  invoicenumberasses?: InputMaybe<Array<InvoicenumberassInput>>;
  plantcode?: InputMaybe<Scalars['String']>;
  plantid: Scalars['Int'];
  plantname?: InputMaybe<Scalars['String']>;
  stocks?: InputMaybe<Array<StockInput>>;
  storagelocations?: InputMaybe<Array<StoragelocationInput>>;
};

export type ComparableDateTimeOperationFilterInput = {
  eq?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  in?: InputMaybe<Array<Scalars['DateTime']>>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
  neq?: InputMaybe<Scalars['DateTime']>;
  ngt?: InputMaybe<Scalars['DateTime']>;
  ngte?: InputMaybe<Scalars['DateTime']>;
  nin?: InputMaybe<Array<Scalars['DateTime']>>;
  nlt?: InputMaybe<Scalars['DateTime']>;
  nlte?: InputMaybe<Scalars['DateTime']>;
};

export type ComparableDecimalOperationFilterInput = {
  eq?: InputMaybe<Scalars['Decimal']>;
  gt?: InputMaybe<Scalars['Decimal']>;
  gte?: InputMaybe<Scalars['Decimal']>;
  in?: InputMaybe<Array<Scalars['Decimal']>>;
  lt?: InputMaybe<Scalars['Decimal']>;
  lte?: InputMaybe<Scalars['Decimal']>;
  neq?: InputMaybe<Scalars['Decimal']>;
  ngt?: InputMaybe<Scalars['Decimal']>;
  ngte?: InputMaybe<Scalars['Decimal']>;
  nin?: InputMaybe<Array<Scalars['Decimal']>>;
  nlt?: InputMaybe<Scalars['Decimal']>;
  nlte?: InputMaybe<Scalars['Decimal']>;
};

export type ComparableInt32OperationFilterInput = {
  eq?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<Scalars['Int']>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  neq?: InputMaybe<Scalars['Int']>;
  ngt?: InputMaybe<Scalars['Int']>;
  ngte?: InputMaybe<Scalars['Int']>;
  nin?: InputMaybe<Array<Scalars['Int']>>;
  nlt?: InputMaybe<Scalars['Int']>;
  nlte?: InputMaybe<Scalars['Int']>;
};

export type ComparableInt64OperationFilterInput = {
  eq?: InputMaybe<Scalars['Long']>;
  gt?: InputMaybe<Scalars['Long']>;
  gte?: InputMaybe<Scalars['Long']>;
  in?: InputMaybe<Array<Scalars['Long']>>;
  lt?: InputMaybe<Scalars['Long']>;
  lte?: InputMaybe<Scalars['Long']>;
  neq?: InputMaybe<Scalars['Long']>;
  ngt?: InputMaybe<Scalars['Long']>;
  ngte?: InputMaybe<Scalars['Long']>;
  nin?: InputMaybe<Array<Scalars['Long']>>;
  nlt?: InputMaybe<Scalars['Long']>;
  nlte?: InputMaybe<Scalars['Long']>;
};

export type ComparableNullableOfDateTimeOperationFilterInput = {
  eq?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
  neq?: InputMaybe<Scalars['DateTime']>;
  ngt?: InputMaybe<Scalars['DateTime']>;
  ngte?: InputMaybe<Scalars['DateTime']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  nlt?: InputMaybe<Scalars['DateTime']>;
  nlte?: InputMaybe<Scalars['DateTime']>;
};

export type ComparableNullableOfDecimalOperationFilterInput = {
  eq?: InputMaybe<Scalars['Decimal']>;
  gt?: InputMaybe<Scalars['Decimal']>;
  gte?: InputMaybe<Scalars['Decimal']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Decimal']>>>;
  lt?: InputMaybe<Scalars['Decimal']>;
  lte?: InputMaybe<Scalars['Decimal']>;
  neq?: InputMaybe<Scalars['Decimal']>;
  ngt?: InputMaybe<Scalars['Decimal']>;
  ngte?: InputMaybe<Scalars['Decimal']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['Decimal']>>>;
  nlt?: InputMaybe<Scalars['Decimal']>;
  nlte?: InputMaybe<Scalars['Decimal']>;
};

export type ComparableNullableOfDoubleOperationFilterInput = {
  eq?: InputMaybe<Scalars['Float']>;
  gt?: InputMaybe<Scalars['Float']>;
  gte?: InputMaybe<Scalars['Float']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  lt?: InputMaybe<Scalars['Float']>;
  lte?: InputMaybe<Scalars['Float']>;
  neq?: InputMaybe<Scalars['Float']>;
  ngt?: InputMaybe<Scalars['Float']>;
  ngte?: InputMaybe<Scalars['Float']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  nlt?: InputMaybe<Scalars['Float']>;
  nlte?: InputMaybe<Scalars['Float']>;
};

export type ComparableNullableOfInt16OperationFilterInput = {
  eq?: InputMaybe<Scalars['Short']>;
  gt?: InputMaybe<Scalars['Short']>;
  gte?: InputMaybe<Scalars['Short']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Short']>>>;
  lt?: InputMaybe<Scalars['Short']>;
  lte?: InputMaybe<Scalars['Short']>;
  neq?: InputMaybe<Scalars['Short']>;
  ngt?: InputMaybe<Scalars['Short']>;
  ngte?: InputMaybe<Scalars['Short']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['Short']>>>;
  nlt?: InputMaybe<Scalars['Short']>;
  nlte?: InputMaybe<Scalars['Short']>;
};

export type ComparableNullableOfInt32OperationFilterInput = {
  eq?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  neq?: InputMaybe<Scalars['Int']>;
  ngt?: InputMaybe<Scalars['Int']>;
  ngte?: InputMaybe<Scalars['Int']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  nlt?: InputMaybe<Scalars['Int']>;
  nlte?: InputMaybe<Scalars['Int']>;
};

export type ComparableNullableOfInt64OperationFilterInput = {
  eq?: InputMaybe<Scalars['Long']>;
  gt?: InputMaybe<Scalars['Long']>;
  gte?: InputMaybe<Scalars['Long']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Long']>>>;
  lt?: InputMaybe<Scalars['Long']>;
  lte?: InputMaybe<Scalars['Long']>;
  neq?: InputMaybe<Scalars['Long']>;
  ngt?: InputMaybe<Scalars['Long']>;
  ngte?: InputMaybe<Scalars['Long']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['Long']>>>;
  nlt?: InputMaybe<Scalars['Long']>;
  nlte?: InputMaybe<Scalars['Long']>;
};

export type CtCity = {
  __typename?: 'CtCity';
  city?: Maybe<Scalars['String']>;
  cityCode?: Maybe<Scalars['String']>;
  cityId: Scalars['Long'];
  countryKey?: Maybe<Scalars['String']>;
  latitude?: Maybe<Scalars['Decimal']>;
  longitude?: Maybe<Scalars['Decimal']>;
  regionId?: Maybe<Scalars['Long']>;
};

export type CtCityFilterInput = {
  and?: InputMaybe<Array<CtCityFilterInput>>;
  city?: InputMaybe<StringOperationFilterInput>;
  cityCode?: InputMaybe<StringOperationFilterInput>;
  cityId?: InputMaybe<ComparableInt64OperationFilterInput>;
  countryKey?: InputMaybe<StringOperationFilterInput>;
  latitude?: InputMaybe<ComparableNullableOfDecimalOperationFilterInput>;
  longitude?: InputMaybe<ComparableNullableOfDecimalOperationFilterInput>;
  or?: InputMaybe<Array<CtCityFilterInput>>;
  regionId?: InputMaybe<ComparableNullableOfInt64OperationFilterInput>;
};

export type CtCountry = {
  __typename?: 'CtCountry';
  country?: Maybe<Scalars['String']>;
  countryCode?: Maybe<Scalars['String']>;
  countryKey: Scalars['String'];
};

export type CtTransCode = {
  __typename?: 'CtTransCode';
  transCode: Scalars['String'];
  transDesc?: Maybe<Scalars['String']>;
  transHist?: Maybe<Array<Transhist>>;
};

export type CtTransCodeFilterInput = {
  and?: InputMaybe<Array<CtTransCodeFilterInput>>;
  or?: InputMaybe<Array<CtTransCodeFilterInput>>;
  transCode?: InputMaybe<StringOperationFilterInput>;
  transDesc?: InputMaybe<StringOperationFilterInput>;
  transHist?: InputMaybe<ListFilterInputTypeOfTranshistFilterInput>;
};

export type CtTransCodeInput = {
  transCode: Scalars['String'];
  transDesc?: InputMaybe<Scalars['String']>;
  transHist?: InputMaybe<Array<TranshistInput>>;
};

export type Expense = {
  __typename?: 'Expense';
  expensecategory?: Maybe<Expensecategory>;
  expensecategoryid?: Maybe<Scalars['Long']>;
  expensecode: Scalars['String'];
  expensename?: Maybe<Scalars['String']>;
};

export type ExpenseFilterInput = {
  and?: InputMaybe<Array<ExpenseFilterInput>>;
  expensecategory?: InputMaybe<ExpensecategoryFilterInput>;
  expensecategoryid?: InputMaybe<ComparableNullableOfInt64OperationFilterInput>;
  expensecode?: InputMaybe<StringOperationFilterInput>;
  expensename?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<ExpenseFilterInput>>;
};

export type ExpenseInput = {
  expensecategory?: InputMaybe<ExpensecategoryInput>;
  expensecategoryid?: InputMaybe<Scalars['Long']>;
  expensecode: Scalars['String'];
  expensename?: InputMaybe<Scalars['String']>;
};

export type Expensecategory = {
  __typename?: 'Expensecategory';
  expensecategorydesc?: Maybe<Scalars['String']>;
  expensecategoryid: Scalars['Long'];
  expenses?: Maybe<Array<Expense>>;
};

export type ExpensecategoryFilterInput = {
  and?: InputMaybe<Array<ExpensecategoryFilterInput>>;
  expensecategorydesc?: InputMaybe<StringOperationFilterInput>;
  expensecategoryid?: InputMaybe<ComparableInt64OperationFilterInput>;
  expenses?: InputMaybe<ListFilterInputTypeOfExpenseFilterInput>;
  or?: InputMaybe<Array<ExpensecategoryFilterInput>>;
};

export type ExpensecategoryInput = {
  expensecategorydesc?: InputMaybe<Scalars['String']>;
  expensecategoryid: Scalars['Long'];
  expenses?: InputMaybe<Array<ExpenseInput>>;
};

export type FilterTypeInputOfStringInput = {
  filterType: Scalars['String'];
  parameter?: InputMaybe<Scalars['String']>;
};

export type Goodsreceivingh = {
  __typename?: 'Goodsreceivingh';
  deliverynoteno?: Maybe<Scalars['Long']>;
  emailR?: Maybe<Scalars['String']>;
  explanationR?: Maybe<Scalars['String']>;
  goodsreceivingid: Scalars['Long'];
  goodsreceivingis: Array<Goodsreceivingi>;
  receivingtime?: Maybe<Scalars['DateTime']>;
  rstat?: Maybe<Scalars['String']>;
  shipmenttime?: Maybe<Scalars['DateTime']>;
  subscriptionsidR?: Maybe<Scalars['String']>;
};

export type GoodsreceivinghFilterInput = {
  and?: InputMaybe<Array<GoodsreceivinghFilterInput>>;
  deliverynoteno?: InputMaybe<ComparableNullableOfInt64OperationFilterInput>;
  emailR?: InputMaybe<StringOperationFilterInput>;
  explanationR?: InputMaybe<StringOperationFilterInput>;
  goodsreceivingid?: InputMaybe<ComparableInt64OperationFilterInput>;
  goodsreceivingis?: InputMaybe<ListFilterInputTypeOfGoodsreceivingiFilterInput>;
  or?: InputMaybe<Array<GoodsreceivinghFilterInput>>;
  receivingtime?: InputMaybe<ComparableNullableOfDateTimeOperationFilterInput>;
  rstat?: InputMaybe<StringOperationFilterInput>;
  shipmenttime?: InputMaybe<ComparableNullableOfDateTimeOperationFilterInput>;
  subscriptionsidR?: InputMaybe<StringOperationFilterInput>;
};

export type GoodsreceivinghInput = {
  deliverynoteno?: InputMaybe<Scalars['Long']>;
  emailR?: InputMaybe<Scalars['String']>;
  explanationR?: InputMaybe<Scalars['String']>;
  goodsreceivingid: Scalars['Long'];
  goodsreceivingis: Array<GoodsreceivingiInput>;
  receivingtime?: InputMaybe<Scalars['DateTime']>;
  rstat?: InputMaybe<Scalars['String']>;
  shipmenttime?: InputMaybe<Scalars['DateTime']>;
  subscriptionsidR?: InputMaybe<Scalars['String']>;
};

export type Goodsreceivingi = {
  __typename?: 'Goodsreceivingi';
  batchno?: Maybe<Scalars['String']>;
  explanationR?: Maybe<Scalars['String']>;
  goodsreceiving?: Maybe<Goodsreceivingh>;
  goodsreceivingid: Scalars['Long'];
  itemcode?: Maybe<Scalars['String']>;
  rstat?: Maybe<Scalars['String']>;
  seqno: Scalars['Int'];
  serialno?: Maybe<Scalars['String']>;
  transqty?: Maybe<Scalars['Decimal']>;
  unit?: Maybe<Scalars['String']>;
};

export type GoodsreceivingiFilterInput = {
  and?: InputMaybe<Array<GoodsreceivingiFilterInput>>;
  batchno?: InputMaybe<StringOperationFilterInput>;
  explanationR?: InputMaybe<StringOperationFilterInput>;
  goodsreceiving?: InputMaybe<GoodsreceivinghFilterInput>;
  goodsreceivingid?: InputMaybe<ComparableInt64OperationFilterInput>;
  itemcode?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<GoodsreceivingiFilterInput>>;
  rstat?: InputMaybe<StringOperationFilterInput>;
  seqno?: InputMaybe<ComparableInt32OperationFilterInput>;
  serialno?: InputMaybe<StringOperationFilterInput>;
  transqty?: InputMaybe<ComparableNullableOfDecimalOperationFilterInput>;
  unit?: InputMaybe<StringOperationFilterInput>;
};

export type GoodsreceivingiInput = {
  batchno?: InputMaybe<Scalars['String']>;
  explanationR?: InputMaybe<Scalars['String']>;
  goodsreceiving?: InputMaybe<GoodsreceivinghInput>;
  goodsreceivingid: Scalars['Long'];
  itemcode?: InputMaybe<Scalars['String']>;
  rstat?: InputMaybe<Scalars['String']>;
  seqno: Scalars['Int'];
  serialno?: InputMaybe<Scalars['String']>;
  transqty?: InputMaybe<Scalars['Decimal']>;
  unit?: InputMaybe<Scalars['String']>;
};

export type Invoiced = {
  __typename?: 'Invoiced';
  changetime: Scalars['DateTime'];
  changeuser: Scalars['String'];
  company?: Maybe<Company>;
  companyid: Scalars['Long'];
  conresproductlevelid?: Maybe<Scalars['Long']>;
  conresproductvariant?: Maybe<Itemvariant>;
  conresproductvariantid?: Maybe<Scalars['Long']>;
  createtime: Scalars['DateTime'];
  createuser: Scalars['String'];
  deleted?: Maybe<Scalars['Boolean']>;
  deliverynoteno?: Maybe<Scalars['Long']>;
  deliverynoteseqno?: Maybe<Scalars['Int']>;
  discountamount: Scalars['Decimal'];
  discountrate: Scalars['Decimal'];
  explanation?: Maybe<Scalars['String']>;
  incotermcode?: Maybe<Scalars['String']>;
  invoicedstocks?: Maybe<Array<Invoicedstock>>;
  invoiceno: Scalars['Long'];
  invoicenoNavigation?: Maybe<Invoiceh>;
  itemcode: Scalars['String'];
  itemcode1?: Maybe<Itemmaster>;
  itemtype: Scalars['String'];
  locationid?: Maybe<Scalars['Int']>;
  matdocno?: Maybe<Scalars['String']>;
  matdocyear?: Maybe<Scalars['Int']>;
  netamount: Scalars['Decimal'];
  orderid?: Maybe<Scalars['Long']>;
  orderseqno?: Maybe<Scalars['Int']>;
  packagecount?: Maybe<Scalars['Int']>;
  packagenumber?: Maybe<Scalars['String']>;
  packagingtypecode?: Maybe<Scalars['String']>;
  pctamount: Scalars['Decimal'];
  pctcode?: Maybe<Scalars['String']>;
  plant?: Maybe<Companyplant>;
  plantid: Scalars['Int'];
  quantity: Scalars['Decimal'];
  returnedqty: Scalars['Decimal'];
  sctamount: Scalars['Decimal'];
  sctcode?: Maybe<Scalars['String']>;
  seqno: Scalars['Int'];
  transportmodecode?: Maybe<Scalars['Int']>;
  unit: Scalars['String'];
  unitprice: Scalars['Decimal'];
  vatamount: Scalars['Decimal'];
  vatcode?: Maybe<Scalars['String']>;
  warehouseid?: Maybe<Scalars['Int']>;
};

export type InvoicedFilterInput = {
  and?: InputMaybe<Array<InvoicedFilterInput>>;
  changetime?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  changeuser?: InputMaybe<StringOperationFilterInput>;
  company?: InputMaybe<CompanyFilterInput>;
  companyid?: InputMaybe<ComparableInt64OperationFilterInput>;
  conresproductlevelid?: InputMaybe<ComparableNullableOfInt64OperationFilterInput>;
  conresproductvariant?: InputMaybe<ItemvariantFilterInput>;
  conresproductvariantid?: InputMaybe<ComparableNullableOfInt64OperationFilterInput>;
  createtime?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  createuser?: InputMaybe<StringOperationFilterInput>;
  deleted?: InputMaybe<BooleanOperationFilterInput>;
  deliverynoteno?: InputMaybe<ComparableNullableOfInt64OperationFilterInput>;
  deliverynoteseqno?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  discountamount?: InputMaybe<ComparableDecimalOperationFilterInput>;
  discountrate?: InputMaybe<ComparableDecimalOperationFilterInput>;
  explanation?: InputMaybe<StringOperationFilterInput>;
  incotermcode?: InputMaybe<StringOperationFilterInput>;
  invoicedstocks?: InputMaybe<ListFilterInputTypeOfInvoicedstockFilterInput>;
  invoiceno?: InputMaybe<ComparableInt64OperationFilterInput>;
  invoicenoNavigation?: InputMaybe<InvoicehFilterInput>;
  itemcode?: InputMaybe<StringOperationFilterInput>;
  itemcode1?: InputMaybe<ItemmasterFilterInput>;
  itemtype?: InputMaybe<StringOperationFilterInput>;
  locationid?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  matdocno?: InputMaybe<StringOperationFilterInput>;
  matdocyear?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  netamount?: InputMaybe<ComparableDecimalOperationFilterInput>;
  or?: InputMaybe<Array<InvoicedFilterInput>>;
  orderid?: InputMaybe<ComparableNullableOfInt64OperationFilterInput>;
  orderseqno?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  packagecount?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  packagenumber?: InputMaybe<StringOperationFilterInput>;
  packagingtypecode?: InputMaybe<StringOperationFilterInput>;
  pctamount?: InputMaybe<ComparableDecimalOperationFilterInput>;
  pctcode?: InputMaybe<StringOperationFilterInput>;
  plant?: InputMaybe<CompanyplantFilterInput>;
  plantid?: InputMaybe<ComparableInt32OperationFilterInput>;
  quantity?: InputMaybe<ComparableDecimalOperationFilterInput>;
  returnedqty?: InputMaybe<ComparableDecimalOperationFilterInput>;
  sctamount?: InputMaybe<ComparableDecimalOperationFilterInput>;
  sctcode?: InputMaybe<StringOperationFilterInput>;
  seqno?: InputMaybe<ComparableInt32OperationFilterInput>;
  transportmodecode?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  unit?: InputMaybe<StringOperationFilterInput>;
  unitprice?: InputMaybe<ComparableDecimalOperationFilterInput>;
  vatamount?: InputMaybe<ComparableDecimalOperationFilterInput>;
  vatcode?: InputMaybe<StringOperationFilterInput>;
  warehouseid?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
};

export type InvoicedInput = {
  changetime: Scalars['DateTime'];
  changeuser: Scalars['String'];
  company?: InputMaybe<CompanyInput>;
  companyid: Scalars['Long'];
  conresproductlevelid?: InputMaybe<Scalars['Long']>;
  conresproductvariant?: InputMaybe<ItemvariantInput>;
  conresproductvariantid?: InputMaybe<Scalars['Long']>;
  createtime: Scalars['DateTime'];
  createuser: Scalars['String'];
  deleted?: InputMaybe<Scalars['Boolean']>;
  deliverynoteno?: InputMaybe<Scalars['Long']>;
  deliverynoteseqno?: InputMaybe<Scalars['Int']>;
  discountamount: Scalars['Decimal'];
  discountrate: Scalars['Decimal'];
  explanation?: InputMaybe<Scalars['String']>;
  incotermcode?: InputMaybe<Scalars['String']>;
  invoicedstocks?: InputMaybe<Array<InvoicedstockInput>>;
  invoiceno: Scalars['Long'];
  invoicenoNavigation?: InputMaybe<InvoicehInput>;
  itemcode: Scalars['String'];
  itemcode1?: InputMaybe<ItemmasterInput>;
  itemtype: Scalars['String'];
  locationid?: InputMaybe<Scalars['Int']>;
  matdocno?: InputMaybe<Scalars['String']>;
  matdocyear?: InputMaybe<Scalars['Int']>;
  netamount: Scalars['Decimal'];
  orderid?: InputMaybe<Scalars['Long']>;
  orderseqno?: InputMaybe<Scalars['Int']>;
  packagecount?: InputMaybe<Scalars['Int']>;
  packagenumber?: InputMaybe<Scalars['String']>;
  packagingtypecode?: InputMaybe<Scalars['String']>;
  pctamount: Scalars['Decimal'];
  pctcode?: InputMaybe<Scalars['String']>;
  plant?: InputMaybe<CompanyplantInput>;
  plantid: Scalars['Int'];
  quantity: Scalars['Decimal'];
  returnedqty: Scalars['Decimal'];
  sctamount: Scalars['Decimal'];
  sctcode?: InputMaybe<Scalars['String']>;
  seqno: Scalars['Int'];
  transportmodecode?: InputMaybe<Scalars['Int']>;
  unit: Scalars['String'];
  unitprice: Scalars['Decimal'];
  vatamount: Scalars['Decimal'];
  vatcode?: InputMaybe<Scalars['String']>;
  warehouseid?: InputMaybe<Scalars['Int']>;
};

export type Invoicedoctype = {
  __typename?: 'Invoicedoctype';
  invoicedoctype1: Scalars['String'];
  invoicedoctypename?: Maybe<Scalars['String']>;
  invoicehs?: Maybe<Array<Invoiceh>>;
  invoicenumberasses?: Maybe<Array<Invoicenumberass>>;
};

export type InvoicedoctypeFilterInput = {
  and?: InputMaybe<Array<InvoicedoctypeFilterInput>>;
  invoicedoctype1?: InputMaybe<StringOperationFilterInput>;
  invoicedoctypename?: InputMaybe<StringOperationFilterInput>;
  invoicehs?: InputMaybe<ListFilterInputTypeOfInvoicehFilterInput>;
  invoicenumberasses?: InputMaybe<ListFilterInputTypeOfInvoicenumberassFilterInput>;
  or?: InputMaybe<Array<InvoicedoctypeFilterInput>>;
};

export type InvoicedoctypeInput = {
  invoicedoctype1: Scalars['String'];
  invoicedoctypename?: InputMaybe<Scalars['String']>;
  invoicehs?: InputMaybe<Array<InvoicehInput>>;
  invoicenumberasses?: InputMaybe<Array<InvoicenumberassInput>>;
};

export type Invoicedstock = {
  __typename?: 'Invoicedstock';
  batchno?: Maybe<Scalars['String']>;
  id: Scalars['Long'];
  invoiced?: Maybe<Invoiced>;
  invoiceno: Scalars['Long'];
  itemcode?: Maybe<Scalars['String']>;
  returnedqty: Scalars['Decimal'];
  seqno: Scalars['Int'];
  serialno?: Maybe<Scalars['String']>;
  transqty?: Maybe<Scalars['Decimal']>;
};

export type InvoicedstockFilterInput = {
  and?: InputMaybe<Array<InvoicedstockFilterInput>>;
  batchno?: InputMaybe<StringOperationFilterInput>;
  id?: InputMaybe<ComparableInt64OperationFilterInput>;
  invoiced?: InputMaybe<InvoicedFilterInput>;
  invoiceno?: InputMaybe<ComparableInt64OperationFilterInput>;
  itemcode?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<InvoicedstockFilterInput>>;
  returnedqty?: InputMaybe<ComparableDecimalOperationFilterInput>;
  seqno?: InputMaybe<ComparableInt32OperationFilterInput>;
  serialno?: InputMaybe<StringOperationFilterInput>;
  transqty?: InputMaybe<ComparableNullableOfDecimalOperationFilterInput>;
};

export type InvoicedstockInput = {
  batchno?: InputMaybe<Scalars['String']>;
  id: Scalars['Long'];
  invoiced?: InputMaybe<InvoicedInput>;
  invoiceno: Scalars['Long'];
  itemcode?: InputMaybe<Scalars['String']>;
  returnedqty: Scalars['Decimal'];
  seqno: Scalars['Int'];
  serialno?: InputMaybe<Scalars['String']>;
  transqty?: InputMaybe<Scalars['Decimal']>;
};

export type Invoiceh = {
  __typename?: 'Invoiceh';
  acAccountdocumenths?: Maybe<Array<AcAccountdocumenth>>;
  baseamount: Scalars['Decimal'];
  changetime?: Maybe<Scalars['DateTime']>;
  changeuser?: Maybe<Scalars['String']>;
  company?: Maybe<Company>;
  companyid: Scalars['Long'];
  createtime: Scalars['DateTime'];
  createuser: Scalars['String'];
  currency: Scalars['String'];
  deleted: Scalars['Boolean'];
  discountamount: Scalars['Decimal'];
  documentno?: Maybe<Scalars['String']>;
  eiNo?: Maybe<Scalars['String']>;
  eiScenario?: Maybe<Scalars['String']>;
  eiSendingtime?: Maybe<Scalars['DateTime']>;
  eiSendinguser?: Maybe<Scalars['String']>;
  eiStatus?: Maybe<Scalars['String']>;
  eiType?: Maybe<Scalars['String']>;
  eiUuid?: Maybe<Scalars['String']>;
  exceptioncode?: Maybe<Scalars['String']>;
  exchangerate?: Maybe<Scalars['Decimal']>;
  explanation?: Maybe<Scalars['String']>;
  gtotalamount: Scalars['Decimal'];
  invdate: Scalars['DateTime'];
  invoicedoctype: Scalars['String'];
  invoicedoctypeNavigation?: Maybe<Invoicedoctype>;
  invoiceds?: Maybe<Array<Invoiced>>;
  invoiceno: Scalars['Long'];
  invoicepaymentplan?: Maybe<Invoicepaymentplan>;
  invoicepaymentplanlines?: Maybe<Array<Invoicepaymentplanline>>;
  invoicetype: Scalars['String'];
  invoicetypeNavigation?: Maybe<Invoicetype>;
  invtime: Scalars['DateTime'];
  maturitydate?: Maybe<Scalars['DateTime']>;
  paidamount?: Maybe<Scalars['Decimal']>;
  paymentterm?: Maybe<Scalars['String']>;
  paymenttermNavigation?: Maybe<AcPaymentterm>;
  plant?: Maybe<Companyplant>;
  plantid: Scalars['Int'];
  referencedocno?: Maybe<Scalars['String']>;
  shadbook?: Maybe<Stakeholderadbook>;
  shadbookid: Scalars['Long'];
  stakeholder?: Maybe<Stakeholder>;
  stakeholderid: Scalars['Long'];
};

export type InvoicehFilterInput = {
  acAccountdocumenths?: InputMaybe<ListFilterInputTypeOfAcAccountdocumenthFilterInput>;
  and?: InputMaybe<Array<InvoicehFilterInput>>;
  baseamount?: InputMaybe<ComparableDecimalOperationFilterInput>;
  changetime?: InputMaybe<ComparableNullableOfDateTimeOperationFilterInput>;
  changeuser?: InputMaybe<StringOperationFilterInput>;
  company?: InputMaybe<CompanyFilterInput>;
  companyid?: InputMaybe<ComparableInt64OperationFilterInput>;
  createtime?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  createuser?: InputMaybe<StringOperationFilterInput>;
  currency?: InputMaybe<StringOperationFilterInput>;
  deleted?: InputMaybe<BooleanOperationFilterInput>;
  discountamount?: InputMaybe<ComparableDecimalOperationFilterInput>;
  documentno?: InputMaybe<StringOperationFilterInput>;
  eiNo?: InputMaybe<StringOperationFilterInput>;
  eiScenario?: InputMaybe<StringOperationFilterInput>;
  eiSendingtime?: InputMaybe<ComparableNullableOfDateTimeOperationFilterInput>;
  eiSendinguser?: InputMaybe<StringOperationFilterInput>;
  eiStatus?: InputMaybe<StringOperationFilterInput>;
  eiType?: InputMaybe<StringOperationFilterInput>;
  eiUuid?: InputMaybe<StringOperationFilterInput>;
  exceptioncode?: InputMaybe<StringOperationFilterInput>;
  exchangerate?: InputMaybe<ComparableNullableOfDecimalOperationFilterInput>;
  explanation?: InputMaybe<StringOperationFilterInput>;
  gtotalamount?: InputMaybe<ComparableDecimalOperationFilterInput>;
  invdate?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  invoicedoctype?: InputMaybe<StringOperationFilterInput>;
  invoicedoctypeNavigation?: InputMaybe<InvoicedoctypeFilterInput>;
  invoiceds?: InputMaybe<ListFilterInputTypeOfInvoicedFilterInput>;
  invoiceno?: InputMaybe<ComparableInt64OperationFilterInput>;
  invoicepaymentplan?: InputMaybe<InvoicepaymentplanFilterInput>;
  invoicepaymentplanlines?: InputMaybe<ListFilterInputTypeOfInvoicepaymentplanlineFilterInput>;
  invoicetype?: InputMaybe<StringOperationFilterInput>;
  invoicetypeNavigation?: InputMaybe<InvoicetypeFilterInput>;
  invtime?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  maturitydate?: InputMaybe<ComparableNullableOfDateTimeOperationFilterInput>;
  or?: InputMaybe<Array<InvoicehFilterInput>>;
  paidamount?: InputMaybe<ComparableNullableOfDecimalOperationFilterInput>;
  paymentterm?: InputMaybe<StringOperationFilterInput>;
  paymenttermNavigation?: InputMaybe<AcPaymenttermFilterInput>;
  plant?: InputMaybe<CompanyplantFilterInput>;
  plantid?: InputMaybe<ComparableInt32OperationFilterInput>;
  referencedocno?: InputMaybe<StringOperationFilterInput>;
  shadbook?: InputMaybe<StakeholderadbookFilterInput>;
  shadbookid?: InputMaybe<ComparableInt64OperationFilterInput>;
  stakeholder?: InputMaybe<StakeholderFilterInput>;
  stakeholderid?: InputMaybe<ComparableInt64OperationFilterInput>;
};

export type InvoicehInput = {
  acAccountdocumenths?: InputMaybe<Array<AcAccountdocumenthInput>>;
  baseamount: Scalars['Decimal'];
  changetime?: InputMaybe<Scalars['DateTime']>;
  changeuser?: InputMaybe<Scalars['String']>;
  company?: InputMaybe<CompanyInput>;
  companyid: Scalars['Long'];
  createtime: Scalars['DateTime'];
  createuser: Scalars['String'];
  currency: Scalars['String'];
  deleted: Scalars['Boolean'];
  discountamount: Scalars['Decimal'];
  documentno?: InputMaybe<Scalars['String']>;
  eiNo?: InputMaybe<Scalars['String']>;
  eiScenario?: InputMaybe<Scalars['String']>;
  eiSendingtime?: InputMaybe<Scalars['DateTime']>;
  eiSendinguser?: InputMaybe<Scalars['String']>;
  eiStatus?: InputMaybe<Scalars['String']>;
  eiType?: InputMaybe<Scalars['String']>;
  eiUuid?: InputMaybe<Scalars['String']>;
  exceptioncode?: InputMaybe<Scalars['String']>;
  exchangerate?: InputMaybe<Scalars['Decimal']>;
  explanation?: InputMaybe<Scalars['String']>;
  gtotalamount: Scalars['Decimal'];
  invdate: Scalars['DateTime'];
  invoicedoctype: Scalars['String'];
  invoicedoctypeNavigation?: InputMaybe<InvoicedoctypeInput>;
  invoiceds?: InputMaybe<Array<InvoicedInput>>;
  invoiceno: Scalars['Long'];
  invoicepaymentplan?: InputMaybe<InvoicepaymentplanInput>;
  invoicepaymentplanlines?: InputMaybe<Array<InvoicepaymentplanlineInput>>;
  invoicetype: Scalars['String'];
  invoicetypeNavigation?: InputMaybe<InvoicetypeInput>;
  invtime: Scalars['DateTime'];
  maturitydate?: InputMaybe<Scalars['DateTime']>;
  paidamount?: InputMaybe<Scalars['Decimal']>;
  paymentterm?: InputMaybe<Scalars['String']>;
  paymenttermNavigation?: InputMaybe<AcPaymenttermInput>;
  plant?: InputMaybe<CompanyplantInput>;
  plantid: Scalars['Int'];
  referencedocno?: InputMaybe<Scalars['String']>;
  shadbook?: InputMaybe<StakeholderadbookInput>;
  shadbookid: Scalars['Long'];
  stakeholder?: InputMaybe<StakeholderInput>;
  stakeholderid: Scalars['Long'];
};

export type Invoicenumberass = {
  __typename?: 'Invoicenumberass';
  company?: Maybe<Company>;
  companyid: Scalars['Long'];
  eiType: Scalars['String'];
  invoicedoctype: Scalars['String'];
  invoicedoctypeNavigation?: Maybe<Invoicedoctype>;
  numbertype?: Maybe<Scalars['String']>;
  numbertypeNavigation?: Maybe<SysNumberass>;
  plant: Companyplant;
  plantid: Scalars['Int'];
};

export type InvoicenumberassFilterInput = {
  and?: InputMaybe<Array<InvoicenumberassFilterInput>>;
  company?: InputMaybe<CompanyFilterInput>;
  companyid?: InputMaybe<ComparableInt64OperationFilterInput>;
  eiType?: InputMaybe<StringOperationFilterInput>;
  invoicedoctype?: InputMaybe<StringOperationFilterInput>;
  invoicedoctypeNavigation?: InputMaybe<InvoicedoctypeFilterInput>;
  numbertype?: InputMaybe<StringOperationFilterInput>;
  numbertypeNavigation?: InputMaybe<SysNumberassFilterInput>;
  or?: InputMaybe<Array<InvoicenumberassFilterInput>>;
  plant?: InputMaybe<CompanyplantFilterInput>;
  plantid?: InputMaybe<ComparableInt32OperationFilterInput>;
};

export type InvoicenumberassInput = {
  company?: InputMaybe<CompanyInput>;
  companyid: Scalars['Long'];
  eiType: Scalars['String'];
  invoicedoctype: Scalars['String'];
  invoicedoctypeNavigation?: InputMaybe<InvoicedoctypeInput>;
  numbertype?: InputMaybe<Scalars['String']>;
  numbertypeNavigation?: InputMaybe<SysNumberassInput>;
  plant: CompanyplantInput;
  plantid: Scalars['Int'];
};

export type Invoicepaymentplan = {
  __typename?: 'Invoicepaymentplan';
  explanation?: Maybe<Scalars['String']>;
  initialpaymentdate?: Maybe<Scalars['DateTime']>;
  installmentcount?: Maybe<Scalars['Int']>;
  installmentperiod?: Maybe<Scalars['Int']>;
  installmentperiodunit?: Maybe<Scalars['String']>;
  invoiceno: Scalars['Long'];
  invoicenoNavigation?: Maybe<Invoiceh>;
};

export type InvoicepaymentplanFilterInput = {
  and?: InputMaybe<Array<InvoicepaymentplanFilterInput>>;
  explanation?: InputMaybe<StringOperationFilterInput>;
  initialpaymentdate?: InputMaybe<ComparableNullableOfDateTimeOperationFilterInput>;
  installmentcount?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  installmentperiod?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  installmentperiodunit?: InputMaybe<StringOperationFilterInput>;
  invoiceno?: InputMaybe<ComparableInt64OperationFilterInput>;
  invoicenoNavigation?: InputMaybe<InvoicehFilterInput>;
  or?: InputMaybe<Array<InvoicepaymentplanFilterInput>>;
};

export type InvoicepaymentplanInput = {
  explanation?: InputMaybe<Scalars['String']>;
  initialpaymentdate?: InputMaybe<Scalars['DateTime']>;
  installmentcount?: InputMaybe<Scalars['Int']>;
  installmentperiod?: InputMaybe<Scalars['Int']>;
  installmentperiodunit?: InputMaybe<Scalars['String']>;
  invoiceno: Scalars['Long'];
  invoicenoNavigation?: InputMaybe<InvoicehInput>;
};

export type Invoicepaymentplanline = {
  __typename?: 'Invoicepaymentplanline';
  amount?: Maybe<Scalars['Decimal']>;
  currency?: Maybe<Scalars['String']>;
  invoiceno: Scalars['Long'];
  invoicenoNavigation?: Maybe<Invoiceh>;
  paidamount?: Maybe<Scalars['Decimal']>;
  paymentdate: Scalars['DateTime'];
  paymentplanid: Scalars['Long'];
};

export type InvoicepaymentplanlineFilterInput = {
  amount?: InputMaybe<ComparableNullableOfDecimalOperationFilterInput>;
  and?: InputMaybe<Array<InvoicepaymentplanlineFilterInput>>;
  currency?: InputMaybe<StringOperationFilterInput>;
  invoiceno?: InputMaybe<ComparableInt64OperationFilterInput>;
  invoicenoNavigation?: InputMaybe<InvoicehFilterInput>;
  or?: InputMaybe<Array<InvoicepaymentplanlineFilterInput>>;
  paidamount?: InputMaybe<ComparableNullableOfDecimalOperationFilterInput>;
  paymentdate?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  paymentplanid?: InputMaybe<ComparableInt64OperationFilterInput>;
};

export type InvoicepaymentplanlineInput = {
  amount?: InputMaybe<Scalars['Decimal']>;
  currency?: InputMaybe<Scalars['String']>;
  invoiceno: Scalars['Long'];
  invoicenoNavigation?: InputMaybe<InvoicehInput>;
  paidamount?: InputMaybe<Scalars['Decimal']>;
  paymentdate: Scalars['DateTime'];
  paymentplanid: Scalars['Long'];
};

export type Invoicetype = {
  __typename?: 'Invoicetype';
  invoicehs?: Maybe<Array<Invoiceh>>;
  invoicetype1: Scalars['String'];
  invoicetypename?: Maybe<Scalars['String']>;
  itemtypecode?: Maybe<Scalars['String']>;
  itemtypename?: Maybe<Scalars['String']>;
  mataccatref?: Maybe<Scalars['String']>;
  procurementtype?: Maybe<Scalars['String']>;
  stockfollowup?: Maybe<Scalars['Boolean']>;
};

export type InvoicetypeFilterInput = {
  and?: InputMaybe<Array<InvoicetypeFilterInput>>;
  invoicehs?: InputMaybe<ListFilterInputTypeOfInvoicehFilterInput>;
  invoicetype1?: InputMaybe<StringOperationFilterInput>;
  invoicetypename?: InputMaybe<StringOperationFilterInput>;
  itemtypecode?: InputMaybe<StringOperationFilterInput>;
  itemtypename?: InputMaybe<StringOperationFilterInput>;
  mataccatref?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<InvoicetypeFilterInput>>;
  procurementtype?: InputMaybe<StringOperationFilterInput>;
  stockfollowup?: InputMaybe<BooleanOperationFilterInput>;
};

export type InvoicetypeInput = {
  invoicehs?: InputMaybe<Array<InvoicehInput>>;
  invoicetype1: Scalars['String'];
  invoicetypename?: InputMaybe<Scalars['String']>;
  itemtypecode?: InputMaybe<Scalars['String']>;
  itemtypename?: InputMaybe<Scalars['String']>;
  mataccatref?: InputMaybe<Scalars['String']>;
  procurementtype?: InputMaybe<Scalars['String']>;
  stockfollowup?: InputMaybe<Scalars['Boolean']>;
};

export type Itemcategory = {
  __typename?: 'Itemcategory';
  categoryid: Scalars['Long'];
  categoryname: Scalars['String'];
  imtype: Scalars['String'];
  itemmasters?: Maybe<Array<Itemmaster>>;
};

export type ItemcategoryFilterInput = {
  and?: InputMaybe<Array<ItemcategoryFilterInput>>;
  categoryid?: InputMaybe<ComparableInt64OperationFilterInput>;
  categoryname?: InputMaybe<StringOperationFilterInput>;
  imtype?: InputMaybe<StringOperationFilterInput>;
  itemmasters?: InputMaybe<ListFilterInputTypeOfItemmasterFilterInput>;
  or?: InputMaybe<Array<ItemcategoryFilterInput>>;
};

export type ItemcategoryInput = {
  categoryid: Scalars['Long'];
  categoryname: Scalars['String'];
  imtype: Scalars['String'];
  itemmasters?: InputMaybe<Array<ItemmasterInput>>;
};

export type Itemmaster = {
  __typename?: 'Itemmaster';
  barcodeno?: Maybe<Scalars['String']>;
  baseunit?: Maybe<Scalars['String']>;
  category?: Maybe<Itemcategory>;
  categoryid?: Maybe<Scalars['Long']>;
  currency?: Maybe<Scalars['String']>;
  invoiceds?: Maybe<Array<Invoiced>>;
  istat?: Maybe<Scalars['String']>;
  itemcode: Scalars['String'];
  itemname?: Maybe<Scalars['String']>;
  itemtypecode?: Maybe<Scalars['String']>;
  itemtypecodeNavigation?: Maybe<Itemtype>;
  maxstockqty?: Maybe<Scalars['Float']>;
  minstockqty?: Maybe<Scalars['Float']>;
  pctcode?: Maybe<Scalars['String']>;
  purchaseprice?: Maybe<Scalars['Decimal']>;
  salesprice?: Maybe<Scalars['Decimal']>;
  sctcode?: Maybe<Scalars['String']>;
  stockcontrol?: Maybe<Scalars['String']>;
  stockmanagement?: Maybe<Scalars['String']>;
  stocks?: Maybe<Array<Stock>>;
  unitsale?: Maybe<Scalars['String']>;
  vatcode?: Maybe<Scalars['String']>;
};

export type ItemmasterFilterInput = {
  and?: InputMaybe<Array<ItemmasterFilterInput>>;
  barcodeno?: InputMaybe<StringOperationFilterInput>;
  baseunit?: InputMaybe<StringOperationFilterInput>;
  category?: InputMaybe<ItemcategoryFilterInput>;
  categoryid?: InputMaybe<ComparableNullableOfInt64OperationFilterInput>;
  currency?: InputMaybe<StringOperationFilterInput>;
  invoiceds?: InputMaybe<ListFilterInputTypeOfInvoicedFilterInput>;
  istat?: InputMaybe<StringOperationFilterInput>;
  itemcode?: InputMaybe<StringOperationFilterInput>;
  itemname?: InputMaybe<StringOperationFilterInput>;
  itemtypecode?: InputMaybe<StringOperationFilterInput>;
  itemtypecodeNavigation?: InputMaybe<ItemtypeFilterInput>;
  maxstockqty?: InputMaybe<ComparableNullableOfDoubleOperationFilterInput>;
  minstockqty?: InputMaybe<ComparableNullableOfDoubleOperationFilterInput>;
  or?: InputMaybe<Array<ItemmasterFilterInput>>;
  pctcode?: InputMaybe<StringOperationFilterInput>;
  purchaseprice?: InputMaybe<ComparableNullableOfDecimalOperationFilterInput>;
  salesprice?: InputMaybe<ComparableNullableOfDecimalOperationFilterInput>;
  sctcode?: InputMaybe<StringOperationFilterInput>;
  stockcontrol?: InputMaybe<StringOperationFilterInput>;
  stockmanagement?: InputMaybe<StringOperationFilterInput>;
  stocks?: InputMaybe<ListFilterInputTypeOfStockFilterInput>;
  unitsale?: InputMaybe<StringOperationFilterInput>;
  vatcode?: InputMaybe<StringOperationFilterInput>;
};

export type ItemmasterInput = {
  barcodeno?: InputMaybe<Scalars['String']>;
  baseunit?: InputMaybe<Scalars['String']>;
  category?: InputMaybe<ItemcategoryInput>;
  categoryid?: InputMaybe<Scalars['Long']>;
  currency?: InputMaybe<Scalars['String']>;
  invoiceds?: InputMaybe<Array<InvoicedInput>>;
  istat?: InputMaybe<Scalars['String']>;
  itemcode: Scalars['String'];
  itemname?: InputMaybe<Scalars['String']>;
  itemtypecode?: InputMaybe<Scalars['String']>;
  itemtypecodeNavigation?: InputMaybe<ItemtypeInput>;
  maxstockqty?: InputMaybe<Scalars['Float']>;
  minstockqty?: InputMaybe<Scalars['Float']>;
  pctcode?: InputMaybe<Scalars['String']>;
  purchaseprice?: InputMaybe<Scalars['Decimal']>;
  salesprice?: InputMaybe<Scalars['Decimal']>;
  sctcode?: InputMaybe<Scalars['String']>;
  stockcontrol?: InputMaybe<Scalars['String']>;
  stockmanagement?: InputMaybe<Scalars['String']>;
  stocks?: InputMaybe<Array<StockInput>>;
  unitsale?: InputMaybe<Scalars['String']>;
  vatcode?: InputMaybe<Scalars['String']>;
};

export type Itemtype = {
  __typename?: 'Itemtype';
  itemmasters?: Maybe<Array<Itemmaster>>;
  itemtypecode: Scalars['String'];
  itemtypename?: Maybe<Scalars['String']>;
  mataccatref?: Maybe<Scalars['String']>;
  procurementtype?: Maybe<Scalars['String']>;
  stockfollowup?: Maybe<Scalars['Boolean']>;
};

export type ItemtypeFilterInput = {
  and?: InputMaybe<Array<ItemtypeFilterInput>>;
  itemmasters?: InputMaybe<ListFilterInputTypeOfItemmasterFilterInput>;
  itemtypecode?: InputMaybe<StringOperationFilterInput>;
  itemtypename?: InputMaybe<StringOperationFilterInput>;
  mataccatref?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<ItemtypeFilterInput>>;
  procurementtype?: InputMaybe<StringOperationFilterInput>;
  stockfollowup?: InputMaybe<BooleanOperationFilterInput>;
};

export type ItemtypeInput = {
  itemmasters?: InputMaybe<Array<ItemmasterInput>>;
  itemtypecode: Scalars['String'];
  itemtypename?: InputMaybe<Scalars['String']>;
  mataccatref?: InputMaybe<Scalars['String']>;
  procurementtype?: InputMaybe<Scalars['String']>;
  stockfollowup?: InputMaybe<Scalars['Boolean']>;
};

export type Itemvariant = {
  __typename?: 'Itemvariant';
  invoiceds?: Maybe<Array<Invoiced>>;
  stocks?: Maybe<Array<Stock>>;
  variantid: Scalars['Long'];
  variantname?: Maybe<Scalars['String']>;
};

export type ItemvariantFilterInput = {
  and?: InputMaybe<Array<ItemvariantFilterInput>>;
  invoiceds?: InputMaybe<ListFilterInputTypeOfInvoicedFilterInput>;
  or?: InputMaybe<Array<ItemvariantFilterInput>>;
  stocks?: InputMaybe<ListFilterInputTypeOfStockFilterInput>;
  variantid?: InputMaybe<ComparableInt64OperationFilterInput>;
  variantname?: InputMaybe<StringOperationFilterInput>;
};

export type ItemvariantInput = {
  invoiceds?: InputMaybe<Array<InvoicedInput>>;
  stocks?: InputMaybe<Array<StockInput>>;
  variantid: Scalars['Long'];
  variantname?: InputMaybe<Scalars['String']>;
};

export type ListFilterInputTypeOfAcAccountdocumenthFilterInput = {
  all?: InputMaybe<AcAccountdocumenthFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<AcAccountdocumenthFilterInput>;
  some?: InputMaybe<AcAccountdocumenthFilterInput>;
};

export type ListFilterInputTypeOfAcAccountdocumentiFilterInput = {
  all?: InputMaybe<AcAccountdocumentiFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<AcAccountdocumentiFilterInput>;
  some?: InputMaybe<AcAccountdocumentiFilterInput>;
};

export type ListFilterInputTypeOfAcBankaccountFilterInput = {
  all?: InputMaybe<AcBankaccountFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<AcBankaccountFilterInput>;
  some?: InputMaybe<AcBankaccountFilterInput>;
};

export type ListFilterInputTypeOfAcPaymentorderFilterInput = {
  all?: InputMaybe<AcPaymentorderFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<AcPaymentorderFilterInput>;
  some?: InputMaybe<AcPaymentorderFilterInput>;
};

export type ListFilterInputTypeOfAcTillFilterInput = {
  all?: InputMaybe<AcTillFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<AcTillFilterInput>;
  some?: InputMaybe<AcTillFilterInput>;
};

export type ListFilterInputTypeOfCompanyplantFilterInput = {
  all?: InputMaybe<CompanyplantFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<CompanyplantFilterInput>;
  some?: InputMaybe<CompanyplantFilterInput>;
};

export type ListFilterInputTypeOfExpenseFilterInput = {
  all?: InputMaybe<ExpenseFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<ExpenseFilterInput>;
  some?: InputMaybe<ExpenseFilterInput>;
};

export type ListFilterInputTypeOfGoodsreceivingiFilterInput = {
  all?: InputMaybe<GoodsreceivingiFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<GoodsreceivingiFilterInput>;
  some?: InputMaybe<GoodsreceivingiFilterInput>;
};

export type ListFilterInputTypeOfInvoicedFilterInput = {
  all?: InputMaybe<InvoicedFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<InvoicedFilterInput>;
  some?: InputMaybe<InvoicedFilterInput>;
};

export type ListFilterInputTypeOfInvoicedstockFilterInput = {
  all?: InputMaybe<InvoicedstockFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<InvoicedstockFilterInput>;
  some?: InputMaybe<InvoicedstockFilterInput>;
};

export type ListFilterInputTypeOfInvoicehFilterInput = {
  all?: InputMaybe<InvoicehFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<InvoicehFilterInput>;
  some?: InputMaybe<InvoicehFilterInput>;
};

export type ListFilterInputTypeOfInvoicenumberassFilterInput = {
  all?: InputMaybe<InvoicenumberassFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<InvoicenumberassFilterInput>;
  some?: InputMaybe<InvoicenumberassFilterInput>;
};

export type ListFilterInputTypeOfInvoicepaymentplanlineFilterInput = {
  all?: InputMaybe<InvoicepaymentplanlineFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<InvoicepaymentplanlineFilterInput>;
  some?: InputMaybe<InvoicepaymentplanlineFilterInput>;
};

export type ListFilterInputTypeOfItemmasterFilterInput = {
  all?: InputMaybe<ItemmasterFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<ItemmasterFilterInput>;
  some?: InputMaybe<ItemmasterFilterInput>;
};

export type ListFilterInputTypeOfStakeholderFilterInput = {
  all?: InputMaybe<StakeholderFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<StakeholderFilterInput>;
  some?: InputMaybe<StakeholderFilterInput>;
};

export type ListFilterInputTypeOfStakeholdercontactFilterInput = {
  all?: InputMaybe<StakeholdercontactFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<StakeholdercontactFilterInput>;
  some?: InputMaybe<StakeholdercontactFilterInput>;
};

export type ListFilterInputTypeOfStockFilterInput = {
  all?: InputMaybe<StockFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<StockFilterInput>;
  some?: InputMaybe<StockFilterInput>;
};

export type ListFilterInputTypeOfStockblockrequestiFilterInput = {
  all?: InputMaybe<StockblockrequestiFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<StockblockrequestiFilterInput>;
  some?: InputMaybe<StockblockrequestiFilterInput>;
};

export type ListFilterInputTypeOfStocktransferhFilterInput = {
  all?: InputMaybe<StocktransferhFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<StocktransferhFilterInput>;
  some?: InputMaybe<StocktransferhFilterInput>;
};

export type ListFilterInputTypeOfStocktransferiFilterInput = {
  all?: InputMaybe<StocktransferiFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<StocktransferiFilterInput>;
  some?: InputMaybe<StocktransferiFilterInput>;
};

export type ListFilterInputTypeOfStoragelocationFilterInput = {
  all?: InputMaybe<StoragelocationFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<StoragelocationFilterInput>;
  some?: InputMaybe<StoragelocationFilterInput>;
};

export type ListFilterInputTypeOfTranshistFilterInput = {
  all?: InputMaybe<TranshistFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<TranshistFilterInput>;
  some?: InputMaybe<TranshistFilterInput>;
};

export type ListFilterInputTypeOfUserroleFilterInput = {
  all?: InputMaybe<UserroleFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<UserroleFilterInput>;
  some?: InputMaybe<UserroleFilterInput>;
};

export type LoginInputTypeInput = {
  email: Scalars['String'];
  passowrd: Scalars['String'];
};

export type ModuleList = {
  __typename?: 'ModuleList';
  createTime?: Maybe<Scalars['DateTime']>;
  createUser?: Maybe<Scalars['String']>;
  moduleDesc?: Maybe<Scalars['String']>;
  moduleName: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addBankAccount: ResultModelOfAcBankaccount;
  addOrUpdateAcAccountdocumenth: ResultModelOfAcAccountdocumenth;
  addOrUpdateAcBankAccount: ResultModelOfAcBankaccount;
  addOrUpdateCompany: ResultModelOfCompany;
  addOrUpdateExpense: ResultModelOfExpense;
  addOrUpdateExpenseCategory: ResultModelOfExpensecategory;
  addOrUpdateInvoiceH: ResultModelOfInvoiceh;
  addOrUpdateItemMaster: ResultModelOfItemmaster;
  addOrUpdatePaymentTerm: ResultModelOfAcPaymentterm;
  addOrUpdateStakeholder: ResultModelOfStakeholder;
  addOrUpdateStockBlockRequesth: ResultModelOfStockblockrequesth;
  addOrUpdateStockGoodsReceivingh: ResultModelOfGoodsreceivingh;
  addOrUpdateStocktransferh: ResultModelOfStocktransferh;
  addOrUpdateSubscriptionUser: ResultModelOfSubscriptionUser;
  addOrUpdateTill: ResultModelOfAcTill;
  addOrUpdateTranshist: ResultModelOfTranshist;
  addSubscriptionUser: ResultModelOfSubscriptionUser;
  deleteAcAccountDocumenth: ResultModelOfString;
  deleteAcBankAccount: ResultModelOfString;
  deleteAcPaymentTerm: ResultModelOfString;
  deleteAcTills: ResultModelOfString;
  deleteCompany: ResultModelOfString;
  deleteExpense: ResultModelOfString;
  deleteExpenseCategory: ResultModelOfString;
  deleteInvoiceh: ResultModelOfString;
  deleteStakeholder: ResultModelOfString;
  deleteSubscriptionUsers: ResultModelOfString;
  login: ResultModelOfSubscriptionUser;
  loginControl: ResultModelOfSubscriptionUser;
  saveStockTransaction: ResultModelOfString;
};


export type MutationAddBankAccountArgs = {
  prmBankAccount: AcBankaccountInput;
};


export type MutationAddOrUpdateAcAccountdocumenthArgs = {
  addOrUpdate: AddOrUpdateEnum;
  prmAcAccountdocumenth: AcAccountdocumenthInput;
};


export type MutationAddOrUpdateAcBankAccountArgs = {
  addOrUpdate: AddOrUpdateEnum;
  prmAcBankAccount: AcBankaccountInput;
};


export type MutationAddOrUpdateCompanyArgs = {
  addOrUpdate: AddOrUpdateEnum;
  prmCompany: CompanyInput;
};


export type MutationAddOrUpdateExpenseArgs = {
  addOrUpdate: AddOrUpdateEnum;
  prmExpense: ExpenseInput;
};


export type MutationAddOrUpdateExpenseCategoryArgs = {
  addOrUpdate: AddOrUpdateEnum;
  prmExpenseCategory: ExpensecategoryInput;
};


export type MutationAddOrUpdateInvoiceHArgs = {
  addOrUpdate: AddOrUpdateEnum;
  prmInvoiceH: InvoicehInput;
  prmInvoiceno?: InputMaybe<Scalars['Long']>;
};


export type MutationAddOrUpdateItemMasterArgs = {
  addOrUpdate: AddOrUpdateEnum;
  prmItemMaster: ItemmasterInput;
};


export type MutationAddOrUpdatePaymentTermArgs = {
  addOrUpdate: AddOrUpdateEnum;
  prmAcPaymentTerm: AcPaymenttermInput;
};


export type MutationAddOrUpdateStakeholderArgs = {
  addOrUpdate: AddOrUpdateEnum;
  prmStakeholder: StakeholderInput;
};


export type MutationAddOrUpdateStockBlockRequesthArgs = {
  addOrUpdate: AddOrUpdateEnum;
  prmStockBlockRequesth: StockblockrequesthInput;
};


export type MutationAddOrUpdateStockGoodsReceivinghArgs = {
  addOrUpdate: AddOrUpdateEnum;
  prmGoodsReceivingh: GoodsreceivinghInput;
};


export type MutationAddOrUpdateStocktransferhArgs = {
  addOrUpdate: AddOrUpdateEnum;
  prmStocktransferh: StocktransferhInput;
};


export type MutationAddOrUpdateSubscriptionUserArgs = {
  addOrUpdate: AddOrUpdateEnum;
  prmSubscriptionUser: SubscriptionUserInput;
};


export type MutationAddOrUpdateTillArgs = {
  addOrUpdate: AddOrUpdateEnum;
  prmAcTill: AcTillInput;
};


export type MutationAddOrUpdateTranshistArgs = {
  addOrUpdate: AddOrUpdateEnum;
  prmTranshist: TranshistInput;
};


export type MutationAddSubscriptionUserArgs = {
  prmSubscriptionUser: SubscriptionUserInput;
};


export type MutationDeleteAcAccountDocumenthArgs = {
  prmaccdocno: Scalars['String'];
  prmaccdocyear: Scalars['Int'];
  prmcompanyId: Scalars['Long'];
};


export type MutationDeleteAcBankAccountArgs = {
  prmBankAccountCode: Scalars['String'];
  prmPlantId: Scalars['Int'];
};


export type MutationDeleteAcPaymentTermArgs = {
  prmPaymentTerm: Scalars['String'];
};


export type MutationDeleteAcTillsArgs = {
  prmPlantId: Scalars['Int'];
  prmTillCode: Scalars['String'];
};


export type MutationDeleteCompanyArgs = {
  prmCompanyId: Scalars['Long'];
};


export type MutationDeleteExpenseArgs = {
  prmExpenseCode: Scalars['String'];
};


export type MutationDeleteExpenseCategoryArgs = {
  prmExpenseCategoryId: Scalars['Long'];
};


export type MutationDeleteInvoicehArgs = {
  prmInvoiceNo: Scalars['Long'];
};


export type MutationDeleteStakeholderArgs = {
  prmStakeholderId: Scalars['Long'];
};


export type MutationDeleteSubscriptionUsersArgs = {
  prmEmail: Scalars['String'];
  prmSubscriptionId: Scalars['String'];
};


export type MutationLoginArgs = {
  loginInput: LoginInputTypeInput;
};


export type MutationLoginControlArgs = {
  loginInput: LoginInputTypeInput;
};

export type Query = {
  __typename?: 'Query';
  acAccountdocumenths: Array<AcAccountdocumenth>;
  acAccountdocumenthsTable: Array<AcAccountdocumenth>;
  acBankaccountsWithFilterType: Array<AcBankaccount>;
  acCurrencies: Array<AcCurrency>;
  acPaymentTermsWithFilter: Array<AcPaymentterm>;
  acTillsWithFilter: Array<AcTill>;
  cities: Array<CtCity>;
  companies: Array<Company>;
  countries: Array<CtCountry>;
  ctTransCodes: Array<CtTransCode>;
  expensecategory: Array<Expensecategory>;
  expenses: Array<Expense>;
  goodsreceivinghs: Array<Goodsreceivingh>;
  invoiceD: Array<Invoiced>;
  invoiceH: Array<Invoiceh>;
  invoicehWithFilter: Array<Invoiceh>;
  invoicehWithFilterForReturn: Array<Invoiceh>;
  invoicetypes: Array<Invoicetype>;
  itemmasters: Array<Itemmaster>;
  itemmastersWithFilter: Array<Itemmaster>;
  itemmastersWithFilterType: Array<Itemmaster>;
  itemtypes: Array<Itemtype>;
  moduleLists: Array<ModuleList>;
  role: Array<Role>;
  stakeholders: Array<Stakeholder>;
  stakeholdersForAccountStatement: Array<Stakeholder>;
  stakeholdertypes: Array<Stakeholdertype>;
  stockblockrequesths: Array<Stockblockrequesth>;
  stocks: Array<Stock>;
  stocktransferhs: Array<Stocktransferh>;
  subscription: Array<Subscription>;
  subscriptionUsers: Array<SubscriptionUser>;
  taxes: Array<Taxis>;
  transhists: Array<Transhist>;
  units: Array<Unit>;
  welcome: Scalars['String'];
  welcome2: Scalars['String'];
};


export type QueryAcAccountdocumenthsArgs = {
  where?: InputMaybe<AcAccountdocumenthFilterInput>;
};


export type QueryAcAccountdocumenthsTableArgs = {
  prmAccDocType: Scalars['Int'];
  prmDocNo: Scalars['String'];
  prmEndTime?: InputMaybe<Scalars['DateTime']>;
  prmStartDate?: InputMaybe<Scalars['DateTime']>;
  stakeholderCode: FilterTypeInputOfStringInput;
  stakeholderName: FilterTypeInputOfStringInput;
};


export type QueryAcBankaccountsWithFilterTypeArgs = {
  bankAccountCode: FilterTypeInputOfStringInput;
  bankAccountName: FilterTypeInputOfStringInput;
  bankCode: FilterTypeInputOfStringInput;
};


export type QueryAcPaymentTermsWithFilterArgs = {
  paymentTermCode: FilterTypeInputOfStringInput;
  paymentTermDesc: FilterTypeInputOfStringInput;
};


export type QueryAcTillsWithFilterArgs = {
  tillCode: FilterTypeInputOfStringInput;
  tillName: FilterTypeInputOfStringInput;
};


export type QueryCitiesArgs = {
  where?: InputMaybe<CtCityFilterInput>;
};


export type QueryCompaniesArgs = {
  where?: InputMaybe<CompanyFilterInput>;
};


export type QueryExpensecategoryArgs = {
  expenseCategoryDesc: FilterTypeInputOfStringInput;
  where?: InputMaybe<ExpensecategoryFilterInput>;
};


export type QueryExpensesArgs = {
  expenseCategoryId: Scalars['Long'];
  expenseCode: FilterTypeInputOfStringInput;
  expenseName: FilterTypeInputOfStringInput;
  where?: InputMaybe<ExpenseFilterInput>;
};


export type QueryGoodsreceivinghsArgs = {
  prmDeliveryNoteNo?: Scalars['Long'];
  prmEndDate?: InputMaybe<Scalars['DateTime']>;
  prmStartDate?: InputMaybe<Scalars['DateTime']>;
  prmSubscriptionIdR?: Scalars['String'];
  where?: InputMaybe<GoodsreceivinghFilterInput>;
};


export type QueryInvoiceDArgs = {
  where?: InputMaybe<InvoicedFilterInput>;
};


export type QueryInvoiceHArgs = {
  prmSearchParameter?: Scalars['String'];
  where?: InputMaybe<InvoicehFilterInput>;
};


export type QueryInvoicehWithFilterArgs = {
  prmEino: Scalars['String'];
  prmEndTime?: InputMaybe<Scalars['DateTime']>;
  prmInvoiceType: Scalars['String'];
  prmInvoiceno: Scalars['Long'];
  prmStartTime?: InputMaybe<Scalars['DateTime']>;
  where?: InputMaybe<InvoicehFilterInput>;
};


export type QueryInvoicehWithFilterForReturnArgs = {
  prmEino: Scalars['String'];
  prmEndDate?: InputMaybe<Scalars['DateTime']>;
  prmInvoiceType: Scalars['String'];
  prmInvoiceType2: Scalars['String'];
  prmInvoiceno: Scalars['Long'];
  prmStartDate?: InputMaybe<Scalars['DateTime']>;
};


export type QueryInvoicetypesArgs = {
  prmType: Scalars['String'];
};


export type QueryItemmastersArgs = {
  itemtypecode?: Scalars['String'];
  where?: InputMaybe<ItemmasterFilterInput>;
};


export type QueryItemmastersWithFilterArgs = {
  prmItemCode?: Scalars['String'];
  prmItemName?: Scalars['String'];
  prmItemTypeCode?: Scalars['String'];
};


export type QueryItemmastersWithFilterTypeArgs = {
  itemCode: FilterTypeInputOfStringInput;
  itemName: FilterTypeInputOfStringInput;
  itemTypeCode: FilterTypeInputOfStringInput;
};


export type QueryRoleArgs = {
  where?: InputMaybe<RoleFilterInput>;
};


export type QueryStakeholdersArgs = {
  where?: InputMaybe<StakeholderFilterInput>;
};


export type QueryStakeholdersForAccountStatementArgs = {
  stakeholderCode: FilterTypeInputOfStringInput;
  stakeholderName: FilterTypeInputOfStringInput;
  stakeholderType: Scalars['String'];
  where?: InputMaybe<StakeholderFilterInput>;
};


export type QueryStockblockrequesthsArgs = {
  where?: InputMaybe<StockblockrequesthFilterInput>;
};


export type QueryStocksArgs = {
  itemCode: FilterTypeInputOfStringInput;
  itemName: FilterTypeInputOfStringInput;
  serialNo: FilterTypeInputOfStringInput;
  where?: InputMaybe<StockFilterInput>;
};


export type QueryStocktransferhsArgs = {
  prmCompanyName: Scalars['String'];
  prmEndDate?: InputMaybe<Scalars['DateTime']>;
  prmStartDate?: InputMaybe<Scalars['DateTime']>;
  prmSubscriptionIdR: Scalars['String'];
  prmSubscriptionIdS: Scalars['String'];
  where?: InputMaybe<StocktransferhFilterInput>;
};


export type QuerySubscriptionUsersArgs = {
  where?: InputMaybe<SubscriptionUserFilterInput>;
};


export type QueryTranshistsArgs = {
  batchNo: FilterTypeInputOfStringInput;
  itemCode: FilterTypeInputOfStringInput;
  matDocNo: FilterTypeInputOfStringInput;
  serialNo: FilterTypeInputOfStringInput;
  stakeholderName: FilterTypeInputOfStringInput;
  transCode: Scalars['String'];
  where?: InputMaybe<TranshistFilterInput>;
};

export enum ResultEnum {
  Err = 'ERR',
  Suc = 'SUC'
}

export type ResultModelOfAcAccountdocumenth = {
  __typename?: 'ResultModelOfAcAccountdocumenth';
  data?: Maybe<AcAccountdocumenth>;
  messageText?: Maybe<Scalars['String']>;
  resultType: ResultEnum;
};

export type ResultModelOfAcBankaccount = {
  __typename?: 'ResultModelOfAcBankaccount';
  data?: Maybe<AcBankaccount>;
  messageText?: Maybe<Scalars['String']>;
  resultType: ResultEnum;
};

export type ResultModelOfAcPaymentterm = {
  __typename?: 'ResultModelOfAcPaymentterm';
  data?: Maybe<AcPaymentterm>;
  messageText?: Maybe<Scalars['String']>;
  resultType: ResultEnum;
};

export type ResultModelOfAcTill = {
  __typename?: 'ResultModelOfAcTill';
  data?: Maybe<AcTill>;
  messageText?: Maybe<Scalars['String']>;
  resultType: ResultEnum;
};

export type ResultModelOfCompany = {
  __typename?: 'ResultModelOfCompany';
  data?: Maybe<Company>;
  messageText?: Maybe<Scalars['String']>;
  resultType: ResultEnum;
};

export type ResultModelOfExpense = {
  __typename?: 'ResultModelOfExpense';
  data?: Maybe<Expense>;
  messageText?: Maybe<Scalars['String']>;
  resultType: ResultEnum;
};

export type ResultModelOfExpensecategory = {
  __typename?: 'ResultModelOfExpensecategory';
  data?: Maybe<Expensecategory>;
  messageText?: Maybe<Scalars['String']>;
  resultType: ResultEnum;
};

export type ResultModelOfGoodsreceivingh = {
  __typename?: 'ResultModelOfGoodsreceivingh';
  data?: Maybe<Goodsreceivingh>;
  messageText?: Maybe<Scalars['String']>;
  resultType: ResultEnum;
};

export type ResultModelOfInvoiceh = {
  __typename?: 'ResultModelOfInvoiceh';
  data?: Maybe<Invoiceh>;
  messageText?: Maybe<Scalars['String']>;
  resultType: ResultEnum;
};

export type ResultModelOfItemmaster = {
  __typename?: 'ResultModelOfItemmaster';
  data?: Maybe<Itemmaster>;
  messageText?: Maybe<Scalars['String']>;
  resultType: ResultEnum;
};

export type ResultModelOfStakeholder = {
  __typename?: 'ResultModelOfStakeholder';
  data?: Maybe<Stakeholder>;
  messageText?: Maybe<Scalars['String']>;
  resultType: ResultEnum;
};

export type ResultModelOfStockblockrequesth = {
  __typename?: 'ResultModelOfStockblockrequesth';
  data?: Maybe<Stockblockrequesth>;
  messageText?: Maybe<Scalars['String']>;
  resultType: ResultEnum;
};

export type ResultModelOfStocktransferh = {
  __typename?: 'ResultModelOfStocktransferh';
  data?: Maybe<Stocktransferh>;
  messageText?: Maybe<Scalars['String']>;
  resultType: ResultEnum;
};

export type ResultModelOfString = {
  __typename?: 'ResultModelOfString';
  data?: Maybe<Scalars['String']>;
  messageText?: Maybe<Scalars['String']>;
  resultType: ResultEnum;
};

export type ResultModelOfSubscriptionUser = {
  __typename?: 'ResultModelOfSubscriptionUser';
  data?: Maybe<SubscriptionUser>;
  messageText?: Maybe<Scalars['String']>;
  resultType: ResultEnum;
};

export type ResultModelOfTranshist = {
  __typename?: 'ResultModelOfTranshist';
  data?: Maybe<Transhist>;
  messageText?: Maybe<Scalars['String']>;
  resultType: ResultEnum;
};

export type Role = {
  __typename?: 'Role';
  authObject?: Maybe<Scalars['String']>;
  createtime?: Maybe<Scalars['DateTime']>;
  createuser?: Maybe<Scalars['String']>;
  roleCode: Scalars['String'];
  subscriptionsid: Scalars['String'];
  userroles?: Maybe<Array<Userrole>>;
};

export type RoleFilterInput = {
  and?: InputMaybe<Array<RoleFilterInput>>;
  authObject?: InputMaybe<StringOperationFilterInput>;
  createtime?: InputMaybe<ComparableNullableOfDateTimeOperationFilterInput>;
  createuser?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<RoleFilterInput>>;
  roleCode?: InputMaybe<StringOperationFilterInput>;
  subscriptionsid?: InputMaybe<StringOperationFilterInput>;
  userroles?: InputMaybe<ListFilterInputTypeOfUserroleFilterInput>;
};

export type RoleInput = {
  authObject?: InputMaybe<Scalars['String']>;
  createtime?: InputMaybe<Scalars['DateTime']>;
  createuser?: InputMaybe<Scalars['String']>;
  roleCode: Scalars['String'];
  subscriptionsid: Scalars['String'];
  userroles?: InputMaybe<Array<UserroleInput>>;
};

export type Stakeholder = {
  __typename?: 'Stakeholder';
  acAccountdocumenths?: Maybe<Array<AcAccountdocumenth>>;
  acAccountdocumentis?: Maybe<Array<AcAccountdocumenti>>;
  acPaymentorders?: Maybe<Array<AcPaymentorder>>;
  currency?: Maybe<Scalars['String']>;
  identityno?: Maybe<Scalars['String']>;
  iname?: Maybe<Scalars['String']>;
  invoicehs?: Maybe<Array<Invoiceh>>;
  isurname?: Maybe<Scalars['String']>;
  paymentterm?: Maybe<Scalars['String']>;
  risklimit?: Maybe<Scalars['Decimal']>;
  risknotes?: Maybe<Scalars['String']>;
  shadbook?: Maybe<Stakeholderadbook>;
  shadbookid?: Maybe<Scalars['Long']>;
  shcategory?: Maybe<Scalars['Int']>;
  stakeholdercode?: Maybe<Scalars['String']>;
  stakeholdercontacts?: Maybe<Array<Stakeholdercontact>>;
  stakeholderid: Scalars['Long'];
  stakeholdername?: Maybe<Scalars['String']>;
  stakeholdertype?: Maybe<Scalars['String']>;
  stakeholdertypeNavigation?: Maybe<Stakeholdertype>;
  taxno?: Maybe<Scalars['String']>;
  taxoffice?: Maybe<Scalars['String']>;
  tradetype?: Maybe<Scalars['String']>;
};


export type StakeholderAcAccountdocumenthsArgs = {
  where?: InputMaybe<AcAccountdocumenthFilterInput>;
};

export type StakeholderFilterInput = {
  acAccountdocumenths?: InputMaybe<ListFilterInputTypeOfAcAccountdocumenthFilterInput>;
  acAccountdocumentis?: InputMaybe<ListFilterInputTypeOfAcAccountdocumentiFilterInput>;
  acPaymentorders?: InputMaybe<ListFilterInputTypeOfAcPaymentorderFilterInput>;
  and?: InputMaybe<Array<StakeholderFilterInput>>;
  currency?: InputMaybe<StringOperationFilterInput>;
  identityno?: InputMaybe<StringOperationFilterInput>;
  iname?: InputMaybe<StringOperationFilterInput>;
  invoicehs?: InputMaybe<ListFilterInputTypeOfInvoicehFilterInput>;
  isurname?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<StakeholderFilterInput>>;
  paymentterm?: InputMaybe<StringOperationFilterInput>;
  risklimit?: InputMaybe<ComparableNullableOfDecimalOperationFilterInput>;
  risknotes?: InputMaybe<StringOperationFilterInput>;
  shadbook?: InputMaybe<StakeholderadbookFilterInput>;
  shadbookid?: InputMaybe<ComparableNullableOfInt64OperationFilterInput>;
  shcategory?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  stakeholdercode?: InputMaybe<StringOperationFilterInput>;
  stakeholdercontacts?: InputMaybe<ListFilterInputTypeOfStakeholdercontactFilterInput>;
  stakeholderid?: InputMaybe<ComparableInt64OperationFilterInput>;
  stakeholdername?: InputMaybe<StringOperationFilterInput>;
  stakeholdertype?: InputMaybe<StringOperationFilterInput>;
  stakeholdertypeNavigation?: InputMaybe<StakeholdertypeFilterInput>;
  taxno?: InputMaybe<StringOperationFilterInput>;
  taxoffice?: InputMaybe<StringOperationFilterInput>;
  tradetype?: InputMaybe<StringOperationFilterInput>;
};

export type StakeholderInput = {
  acAccountdocumenths?: InputMaybe<Array<AcAccountdocumenthInput>>;
  acAccountdocumentis?: InputMaybe<Array<AcAccountdocumentiInput>>;
  acPaymentorders?: InputMaybe<Array<AcPaymentorderInput>>;
  currency?: InputMaybe<Scalars['String']>;
  identityno?: InputMaybe<Scalars['String']>;
  iname?: InputMaybe<Scalars['String']>;
  invoicehs?: InputMaybe<Array<InvoicehInput>>;
  isurname?: InputMaybe<Scalars['String']>;
  paymentterm?: InputMaybe<Scalars['String']>;
  risklimit?: InputMaybe<Scalars['Decimal']>;
  risknotes?: InputMaybe<Scalars['String']>;
  shadbook?: InputMaybe<StakeholderadbookInput>;
  shadbookid?: InputMaybe<Scalars['Long']>;
  shcategory?: InputMaybe<Scalars['Int']>;
  stakeholdercode?: InputMaybe<Scalars['String']>;
  stakeholdercontacts?: InputMaybe<Array<StakeholdercontactInput>>;
  stakeholderid: Scalars['Long'];
  stakeholdername?: InputMaybe<Scalars['String']>;
  stakeholdertype?: InputMaybe<Scalars['String']>;
  stakeholdertypeNavigation?: InputMaybe<StakeholdertypeInput>;
  taxno?: InputMaybe<Scalars['String']>;
  taxoffice?: InputMaybe<Scalars['String']>;
  tradetype?: InputMaybe<Scalars['String']>;
};

export type Stakeholderadbook = {
  __typename?: 'Stakeholderadbook';
  address?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  countrykey?: Maybe<Scalars['String']>;
  county?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  fax?: Maybe<Scalars['String']>;
  invoicehs?: Maybe<Array<Invoiceh>>;
  phone?: Maybe<Scalars['String']>;
  phone2?: Maybe<Scalars['String']>;
  phone3?: Maybe<Scalars['String']>;
  postcode?: Maybe<Scalars['String']>;
  shadbookid: Scalars['Long'];
  shadname?: Maybe<Scalars['String']>;
  shadtype?: Maybe<Scalars['String']>;
  stakeholders?: Maybe<Array<Stakeholder>>;
  website?: Maybe<Scalars['String']>;
};

export type StakeholderadbookFilterInput = {
  address?: InputMaybe<StringOperationFilterInput>;
  and?: InputMaybe<Array<StakeholderadbookFilterInput>>;
  city?: InputMaybe<StringOperationFilterInput>;
  countrykey?: InputMaybe<StringOperationFilterInput>;
  county?: InputMaybe<StringOperationFilterInput>;
  email?: InputMaybe<StringOperationFilterInput>;
  fax?: InputMaybe<StringOperationFilterInput>;
  invoicehs?: InputMaybe<ListFilterInputTypeOfInvoicehFilterInput>;
  or?: InputMaybe<Array<StakeholderadbookFilterInput>>;
  phone?: InputMaybe<StringOperationFilterInput>;
  phone2?: InputMaybe<StringOperationFilterInput>;
  phone3?: InputMaybe<StringOperationFilterInput>;
  postcode?: InputMaybe<StringOperationFilterInput>;
  shadbookid?: InputMaybe<ComparableInt64OperationFilterInput>;
  shadname?: InputMaybe<StringOperationFilterInput>;
  shadtype?: InputMaybe<StringOperationFilterInput>;
  stakeholders?: InputMaybe<ListFilterInputTypeOfStakeholderFilterInput>;
  website?: InputMaybe<StringOperationFilterInput>;
};

export type StakeholderadbookInput = {
  address?: InputMaybe<Scalars['String']>;
  city?: InputMaybe<Scalars['String']>;
  countrykey?: InputMaybe<Scalars['String']>;
  county?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  fax?: InputMaybe<Scalars['String']>;
  invoicehs?: InputMaybe<Array<InvoicehInput>>;
  phone?: InputMaybe<Scalars['String']>;
  phone2?: InputMaybe<Scalars['String']>;
  phone3?: InputMaybe<Scalars['String']>;
  postcode?: InputMaybe<Scalars['String']>;
  shadbookid: Scalars['Long'];
  shadname?: InputMaybe<Scalars['String']>;
  shadtype?: InputMaybe<Scalars['String']>;
  stakeholders?: InputMaybe<Array<StakeholderInput>>;
  website?: InputMaybe<Scalars['String']>;
};

export type Stakeholdercontact = {
  __typename?: 'Stakeholdercontact';
  contactemail?: Maybe<Scalars['String']>;
  contactid: Scalars['Long'];
  contactmobile?: Maybe<Scalars['String']>;
  contactname?: Maybe<Scalars['String']>;
  contactnotes?: Maybe<Scalars['String']>;
  contactphone?: Maybe<Scalars['String']>;
  contactrole?: Maybe<Scalars['String']>;
  stakeholder?: Maybe<Stakeholder>;
  stakeholderid?: Maybe<Scalars['Long']>;
};

export type StakeholdercontactFilterInput = {
  and?: InputMaybe<Array<StakeholdercontactFilterInput>>;
  contactemail?: InputMaybe<StringOperationFilterInput>;
  contactid?: InputMaybe<ComparableInt64OperationFilterInput>;
  contactmobile?: InputMaybe<StringOperationFilterInput>;
  contactname?: InputMaybe<StringOperationFilterInput>;
  contactnotes?: InputMaybe<StringOperationFilterInput>;
  contactphone?: InputMaybe<StringOperationFilterInput>;
  contactrole?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<StakeholdercontactFilterInput>>;
  stakeholder?: InputMaybe<StakeholderFilterInput>;
  stakeholderid?: InputMaybe<ComparableNullableOfInt64OperationFilterInput>;
};

export type StakeholdercontactInput = {
  contactemail?: InputMaybe<Scalars['String']>;
  contactid: Scalars['Long'];
  contactmobile?: InputMaybe<Scalars['String']>;
  contactname?: InputMaybe<Scalars['String']>;
  contactnotes?: InputMaybe<Scalars['String']>;
  contactphone?: InputMaybe<Scalars['String']>;
  contactrole?: InputMaybe<Scalars['String']>;
  stakeholder?: InputMaybe<StakeholderInput>;
  stakeholderid?: InputMaybe<Scalars['Long']>;
};

export type Stakeholdertype = {
  __typename?: 'Stakeholdertype';
  stakeholders?: Maybe<Array<Stakeholder>>;
  stakeholdertype1: Scalars['String'];
  stakeholdertypename?: Maybe<Scalars['String']>;
};

export type StakeholdertypeFilterInput = {
  and?: InputMaybe<Array<StakeholdertypeFilterInput>>;
  or?: InputMaybe<Array<StakeholdertypeFilterInput>>;
  stakeholders?: InputMaybe<ListFilterInputTypeOfStakeholderFilterInput>;
  stakeholdertype1?: InputMaybe<StringOperationFilterInput>;
  stakeholdertypename?: InputMaybe<StringOperationFilterInput>;
};

export type StakeholdertypeInput = {
  stakeholders?: InputMaybe<Array<StakeholderInput>>;
  stakeholdertype1: Scalars['String'];
  stakeholdertypename?: InputMaybe<Scalars['String']>;
};

export type Stock = {
  __typename?: 'Stock';
  availableqty?: Maybe<Scalars['Float']>;
  batchno: Scalars['String'];
  blockedqty?: Maybe<Scalars['Float']>;
  entrydate?: Maybe<Scalars['DateTime']>;
  expirationdate?: Maybe<Scalars['DateTime']>;
  itemcode: Scalars['String'];
  itemcodeNavigation?: Maybe<Itemmaster>;
  lasttransdate?: Maybe<Scalars['DateTime']>;
  onqualityqty?: Maybe<Scalars['Float']>;
  physicalqty?: Maybe<Scalars['Float']>;
  plant?: Maybe<Companyplant>;
  plantid: Scalars['Int'];
  reservedqty?: Maybe<Scalars['Float']>;
  serialno: Scalars['String'];
  sstatus?: Maybe<Scalars['String']>;
  storagebinid: Scalars['Int'];
  storagelocation?: Maybe<Storagelocation>;
  storagelocationid: Scalars['Int'];
  variant?: Maybe<Itemvariant>;
  variantid: Scalars['Long'];
};

export type StockFilterInput = {
  and?: InputMaybe<Array<StockFilterInput>>;
  availableqty?: InputMaybe<ComparableNullableOfDoubleOperationFilterInput>;
  batchno?: InputMaybe<StringOperationFilterInput>;
  blockedqty?: InputMaybe<ComparableNullableOfDoubleOperationFilterInput>;
  entrydate?: InputMaybe<ComparableNullableOfDateTimeOperationFilterInput>;
  expirationdate?: InputMaybe<ComparableNullableOfDateTimeOperationFilterInput>;
  itemcode?: InputMaybe<StringOperationFilterInput>;
  itemcodeNavigation?: InputMaybe<ItemmasterFilterInput>;
  lasttransdate?: InputMaybe<ComparableNullableOfDateTimeOperationFilterInput>;
  onqualityqty?: InputMaybe<ComparableNullableOfDoubleOperationFilterInput>;
  or?: InputMaybe<Array<StockFilterInput>>;
  physicalqty?: InputMaybe<ComparableNullableOfDoubleOperationFilterInput>;
  plant?: InputMaybe<CompanyplantFilterInput>;
  plantid?: InputMaybe<ComparableInt32OperationFilterInput>;
  reservedqty?: InputMaybe<ComparableNullableOfDoubleOperationFilterInput>;
  serialno?: InputMaybe<StringOperationFilterInput>;
  sstatus?: InputMaybe<StringOperationFilterInput>;
  storagebinid?: InputMaybe<ComparableInt32OperationFilterInput>;
  storagelocation?: InputMaybe<StoragelocationFilterInput>;
  storagelocationid?: InputMaybe<ComparableInt32OperationFilterInput>;
  variant?: InputMaybe<ItemvariantFilterInput>;
  variantid?: InputMaybe<ComparableInt64OperationFilterInput>;
};

export type StockInput = {
  availableqty?: InputMaybe<Scalars['Float']>;
  batchno: Scalars['String'];
  blockedqty?: InputMaybe<Scalars['Float']>;
  entrydate?: InputMaybe<Scalars['DateTime']>;
  expirationdate?: InputMaybe<Scalars['DateTime']>;
  itemcode: Scalars['String'];
  itemcodeNavigation?: InputMaybe<ItemmasterInput>;
  lasttransdate?: InputMaybe<Scalars['DateTime']>;
  onqualityqty?: InputMaybe<Scalars['Float']>;
  physicalqty?: InputMaybe<Scalars['Float']>;
  plant?: InputMaybe<CompanyplantInput>;
  plantid: Scalars['Int'];
  reservedqty?: InputMaybe<Scalars['Float']>;
  serialno: Scalars['String'];
  sstatus?: InputMaybe<Scalars['String']>;
  storagebinid: Scalars['Int'];
  storagelocation?: InputMaybe<StoragelocationInput>;
  storagelocationid: Scalars['Int'];
  variant?: InputMaybe<ItemvariantInput>;
  variantid: Scalars['Long'];
};

export type Stockblockrequesth = {
  __typename?: 'Stockblockrequesth';
  approvetime?: Maybe<Scalars['DateTime']>;
  email?: Maybe<Scalars['String']>;
  explanation?: Maybe<Scalars['String']>;
  explanationA?: Maybe<Scalars['String']>;
  requesttime?: Maybe<Scalars['DateTime']>;
  rstat?: Maybe<Scalars['String']>;
  stockblockrequestid: Scalars['Long'];
  stockblockrequestis: Array<Stockblockrequesti>;
  subscriptionsid?: Maybe<Scalars['String']>;
};

export type StockblockrequesthFilterInput = {
  and?: InputMaybe<Array<StockblockrequesthFilterInput>>;
  approvetime?: InputMaybe<ComparableNullableOfDateTimeOperationFilterInput>;
  email?: InputMaybe<StringOperationFilterInput>;
  explanation?: InputMaybe<StringOperationFilterInput>;
  explanationA?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<StockblockrequesthFilterInput>>;
  requesttime?: InputMaybe<ComparableNullableOfDateTimeOperationFilterInput>;
  rstat?: InputMaybe<StringOperationFilterInput>;
  stockblockrequestid?: InputMaybe<ComparableInt64OperationFilterInput>;
  stockblockrequestis?: InputMaybe<ListFilterInputTypeOfStockblockrequestiFilterInput>;
  subscriptionsid?: InputMaybe<StringOperationFilterInput>;
};

export type StockblockrequesthInput = {
  approvetime?: InputMaybe<Scalars['DateTime']>;
  email?: InputMaybe<Scalars['String']>;
  explanation?: InputMaybe<Scalars['String']>;
  explanationA?: InputMaybe<Scalars['String']>;
  requesttime?: InputMaybe<Scalars['DateTime']>;
  rstat?: InputMaybe<Scalars['String']>;
  stockblockrequestid: Scalars['Long'];
  stockblockrequestis: Array<StockblockrequestiInput>;
  subscriptionsid?: InputMaybe<Scalars['String']>;
};

export type Stockblockrequesti = {
  __typename?: 'Stockblockrequesti';
  batchno?: Maybe<Scalars['String']>;
  explanationA?: Maybe<Scalars['String']>;
  itemcode?: Maybe<Scalars['String']>;
  rstat?: Maybe<Scalars['String']>;
  seqno: Scalars['Int'];
  serialno?: Maybe<Scalars['String']>;
  stockblockrequest?: Maybe<Stockblockrequesth>;
  stockblockrequestid: Scalars['Long'];
  transqty?: Maybe<Scalars['Decimal']>;
  unit?: Maybe<Scalars['String']>;
};

export type StockblockrequestiFilterInput = {
  and?: InputMaybe<Array<StockblockrequestiFilterInput>>;
  batchno?: InputMaybe<StringOperationFilterInput>;
  explanationA?: InputMaybe<StringOperationFilterInput>;
  itemcode?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<StockblockrequestiFilterInput>>;
  rstat?: InputMaybe<StringOperationFilterInput>;
  seqno?: InputMaybe<ComparableInt32OperationFilterInput>;
  serialno?: InputMaybe<StringOperationFilterInput>;
  stockblockrequest?: InputMaybe<StockblockrequesthFilterInput>;
  stockblockrequestid?: InputMaybe<ComparableInt64OperationFilterInput>;
  transqty?: InputMaybe<ComparableNullableOfDecimalOperationFilterInput>;
  unit?: InputMaybe<StringOperationFilterInput>;
};

export type StockblockrequestiInput = {
  batchno?: InputMaybe<Scalars['String']>;
  explanationA?: InputMaybe<Scalars['String']>;
  itemcode?: InputMaybe<Scalars['String']>;
  rstat?: InputMaybe<Scalars['String']>;
  seqno: Scalars['Int'];
  serialno?: InputMaybe<Scalars['String']>;
  stockblockrequest?: InputMaybe<StockblockrequesthInput>;
  stockblockrequestid: Scalars['Long'];
  transqty?: InputMaybe<Scalars['Decimal']>;
  unit?: InputMaybe<Scalars['String']>;
};

export type Stocktransferh = {
  __typename?: 'Stocktransferh';
  accepttime?: Maybe<Scalars['DateTime']>;
  emailR?: Maybe<Scalars['String']>;
  emailS?: Maybe<Scalars['String']>;
  explanationR?: Maybe<Scalars['String']>;
  explanationS?: Maybe<Scalars['String']>;
  sendtime?: Maybe<Scalars['DateTime']>;
  stocktransferis: Array<Stocktransferi>;
  subscription?: Maybe<Subs>;
  subscriptionsidR?: Maybe<Scalars['String']>;
  subscriptionsidS?: Maybe<Scalars['String']>;
  transferid: Scalars['Long'];
  tstat?: Maybe<Scalars['String']>;
};

export type StocktransferhFilterInput = {
  accepttime?: InputMaybe<ComparableNullableOfDateTimeOperationFilterInput>;
  and?: InputMaybe<Array<StocktransferhFilterInput>>;
  emailR?: InputMaybe<StringOperationFilterInput>;
  emailS?: InputMaybe<StringOperationFilterInput>;
  explanationR?: InputMaybe<StringOperationFilterInput>;
  explanationS?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<StocktransferhFilterInput>>;
  sendtime?: InputMaybe<ComparableNullableOfDateTimeOperationFilterInput>;
  stocktransferis?: InputMaybe<ListFilterInputTypeOfStocktransferiFilterInput>;
  subscription?: InputMaybe<SubsFilterInput>;
  subscriptionsidR?: InputMaybe<StringOperationFilterInput>;
  subscriptionsidS?: InputMaybe<StringOperationFilterInput>;
  transferid?: InputMaybe<ComparableInt64OperationFilterInput>;
  tstat?: InputMaybe<StringOperationFilterInput>;
};

export type StocktransferhInput = {
  accepttime?: InputMaybe<Scalars['DateTime']>;
  emailR?: InputMaybe<Scalars['String']>;
  emailS?: InputMaybe<Scalars['String']>;
  explanationR?: InputMaybe<Scalars['String']>;
  explanationS?: InputMaybe<Scalars['String']>;
  sendtime?: InputMaybe<Scalars['DateTime']>;
  stocktransferis: Array<StocktransferiInput>;
  subscription?: InputMaybe<SubsInput>;
  subscriptionsidR?: InputMaybe<Scalars['String']>;
  subscriptionsidS?: InputMaybe<Scalars['String']>;
  transferid: Scalars['Long'];
  tstat?: InputMaybe<Scalars['String']>;
};

export type Stocktransferi = {
  __typename?: 'Stocktransferi';
  batchno?: Maybe<Scalars['String']>;
  explanationR?: Maybe<Scalars['String']>;
  itemcode?: Maybe<Scalars['String']>;
  seqno: Scalars['Int'];
  serialno?: Maybe<Scalars['String']>;
  transfer?: Maybe<Stocktransferh>;
  transferid: Scalars['Long'];
  transqty?: Maybe<Scalars['Decimal']>;
  tstat?: Maybe<Scalars['String']>;
  unit?: Maybe<Scalars['String']>;
};

export type StocktransferiFilterInput = {
  and?: InputMaybe<Array<StocktransferiFilterInput>>;
  batchno?: InputMaybe<StringOperationFilterInput>;
  explanationR?: InputMaybe<StringOperationFilterInput>;
  itemcode?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<StocktransferiFilterInput>>;
  seqno?: InputMaybe<ComparableInt32OperationFilterInput>;
  serialno?: InputMaybe<StringOperationFilterInput>;
  transfer?: InputMaybe<StocktransferhFilterInput>;
  transferid?: InputMaybe<ComparableInt64OperationFilterInput>;
  transqty?: InputMaybe<ComparableNullableOfDecimalOperationFilterInput>;
  tstat?: InputMaybe<StringOperationFilterInput>;
  unit?: InputMaybe<StringOperationFilterInput>;
};

export type StocktransferiInput = {
  batchno?: InputMaybe<Scalars['String']>;
  explanationR?: InputMaybe<Scalars['String']>;
  itemcode?: InputMaybe<Scalars['String']>;
  seqno: Scalars['Int'];
  serialno?: InputMaybe<Scalars['String']>;
  transfer?: InputMaybe<StocktransferhInput>;
  transferid: Scalars['Long'];
  transqty?: InputMaybe<Scalars['Decimal']>;
  tstat?: InputMaybe<Scalars['String']>;
  unit?: InputMaybe<Scalars['String']>;
};

export type Storagelocation = {
  __typename?: 'Storagelocation';
  plant?: Maybe<Companyplant>;
  plantid?: Maybe<Scalars['Int']>;
  slstatus?: Maybe<Scalars['String']>;
  stocks?: Maybe<Array<Stock>>;
  storagelocationcode?: Maybe<Scalars['String']>;
  storagelocationdesc?: Maybe<Scalars['String']>;
  storagelocationid: Scalars['Int'];
};

export type StoragelocationFilterInput = {
  and?: InputMaybe<Array<StoragelocationFilterInput>>;
  or?: InputMaybe<Array<StoragelocationFilterInput>>;
  plant?: InputMaybe<CompanyplantFilterInput>;
  plantid?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  slstatus?: InputMaybe<StringOperationFilterInput>;
  stocks?: InputMaybe<ListFilterInputTypeOfStockFilterInput>;
  storagelocationcode?: InputMaybe<StringOperationFilterInput>;
  storagelocationdesc?: InputMaybe<StringOperationFilterInput>;
  storagelocationid?: InputMaybe<ComparableInt32OperationFilterInput>;
};

export type StoragelocationInput = {
  plant?: InputMaybe<CompanyplantInput>;
  plantid?: InputMaybe<Scalars['Int']>;
  slstatus?: InputMaybe<Scalars['String']>;
  stocks?: InputMaybe<Array<StockInput>>;
  storagelocationcode?: InputMaybe<Scalars['String']>;
  storagelocationdesc?: InputMaybe<Scalars['String']>;
  storagelocationid: Scalars['Int'];
};

export type StringOperationFilterInput = {
  and?: InputMaybe<Array<StringOperationFilterInput>>;
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  eq?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  ncontains?: InputMaybe<Scalars['String']>;
  nendsWith?: InputMaybe<Scalars['String']>;
  neq?: InputMaybe<Scalars['String']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  nstartsWith?: InputMaybe<Scalars['String']>;
  or?: InputMaybe<Array<StringOperationFilterInput>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type Subs = {
  __typename?: 'Subs';
  accessFailedCount?: Maybe<Scalars['Int']>;
  companyName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  emailConfirmed?: Maybe<Scalars['Boolean']>;
  lockoutEnabled?: Maybe<Scalars['Boolean']>;
  password?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  phoneNumberConfirmed?: Maybe<Scalars['Boolean']>;
  receiverLabel?: Maybe<Scalars['String']>;
  sectorId?: Maybe<Scalars['Short']>;
  senderLabel?: Maybe<Scalars['String']>;
  stocktransferh?: Maybe<Array<Stocktransferh>>;
  subscriptionDate?: Maybe<Scalars['DateTime']>;
  subscriptionStatus?: Maybe<Scalars['String']>;
  subscriptionType?: Maybe<Scalars['String']>;
  subscriptionsId: Scalars['String'];
  userName?: Maybe<Scalars['String']>;
};

export type SubsFilterInput = {
  accessFailedCount?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  and?: InputMaybe<Array<SubsFilterInput>>;
  companyName?: InputMaybe<StringOperationFilterInput>;
  email?: InputMaybe<StringOperationFilterInput>;
  emailConfirmed?: InputMaybe<BooleanOperationFilterInput>;
  lockoutEnabled?: InputMaybe<BooleanOperationFilterInput>;
  or?: InputMaybe<Array<SubsFilterInput>>;
  password?: InputMaybe<StringOperationFilterInput>;
  phoneNumber?: InputMaybe<StringOperationFilterInput>;
  phoneNumberConfirmed?: InputMaybe<BooleanOperationFilterInput>;
  receiverLabel?: InputMaybe<StringOperationFilterInput>;
  sectorId?: InputMaybe<ComparableNullableOfInt16OperationFilterInput>;
  senderLabel?: InputMaybe<StringOperationFilterInput>;
  stocktransferh?: InputMaybe<ListFilterInputTypeOfStocktransferhFilterInput>;
  subscriptionDate?: InputMaybe<ComparableNullableOfDateTimeOperationFilterInput>;
  subscriptionStatus?: InputMaybe<StringOperationFilterInput>;
  subscriptionType?: InputMaybe<StringOperationFilterInput>;
  subscriptionsId?: InputMaybe<StringOperationFilterInput>;
  userName?: InputMaybe<StringOperationFilterInput>;
};

export type SubsInput = {
  accessFailedCount?: InputMaybe<Scalars['Int']>;
  companyName?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  emailConfirmed?: InputMaybe<Scalars['Boolean']>;
  lockoutEnabled?: InputMaybe<Scalars['Boolean']>;
  password?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
  phoneNumberConfirmed?: InputMaybe<Scalars['Boolean']>;
  receiverLabel?: InputMaybe<Scalars['String']>;
  sectorId?: InputMaybe<Scalars['Short']>;
  senderLabel?: InputMaybe<Scalars['String']>;
  stocktransferh?: InputMaybe<Array<StocktransferhInput>>;
  subscriptionDate?: InputMaybe<Scalars['DateTime']>;
  subscriptionStatus?: InputMaybe<Scalars['String']>;
  subscriptionType?: InputMaybe<Scalars['String']>;
  subscriptionsId: Scalars['String'];
  userName?: InputMaybe<Scalars['String']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  accessFailedCount?: Maybe<Scalars['Int']>;
  companyName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  emailConfirmed?: Maybe<Scalars['Boolean']>;
  lockoutEnabled?: Maybe<Scalars['Boolean']>;
  password?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  phoneNumberConfirmed?: Maybe<Scalars['Boolean']>;
  receiverLabel?: Maybe<Scalars['String']>;
  sectorId?: Maybe<Scalars['Short']>;
  senderLabel?: Maybe<Scalars['String']>;
  subscriptionDate?: Maybe<Scalars['DateTime']>;
  subscriptionStatus?: Maybe<Scalars['String']>;
  subscriptionType?: Maybe<Scalars['String']>;
  subscriptionsId: Scalars['String'];
  userName?: Maybe<Scalars['String']>;
};

export type SubscriptionUser = {
  __typename?: 'SubscriptionUser';
  changeTime?: Maybe<Scalars['DateTime']>;
  changeUser?: Maybe<Scalars['String']>;
  createTime?: Maybe<Scalars['DateTime']>;
  createUser?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  langType?: Maybe<Scalars['String']>;
  perNo?: Maybe<Scalars['String']>;
  subscriptionId: Scalars['String'];
  upass?: Maybe<Scalars['String']>;
  userDesc?: Maybe<Scalars['String']>;
  userroles: Array<Userrole>;
  ustat?: Maybe<Scalars['String']>;
  validFrom?: Maybe<Scalars['DateTime']>;
  validTo?: Maybe<Scalars['DateTime']>;
};

export type SubscriptionUserFilterInput = {
  and?: InputMaybe<Array<SubscriptionUserFilterInput>>;
  changeTime?: InputMaybe<ComparableNullableOfDateTimeOperationFilterInput>;
  changeUser?: InputMaybe<StringOperationFilterInput>;
  createTime?: InputMaybe<ComparableNullableOfDateTimeOperationFilterInput>;
  createUser?: InputMaybe<StringOperationFilterInput>;
  email?: InputMaybe<StringOperationFilterInput>;
  langType?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<SubscriptionUserFilterInput>>;
  perNo?: InputMaybe<StringOperationFilterInput>;
  subscriptionId?: InputMaybe<StringOperationFilterInput>;
  upass?: InputMaybe<StringOperationFilterInput>;
  userDesc?: InputMaybe<StringOperationFilterInput>;
  userroles?: InputMaybe<ListFilterInputTypeOfUserroleFilterInput>;
  ustat?: InputMaybe<StringOperationFilterInput>;
  validFrom?: InputMaybe<ComparableNullableOfDateTimeOperationFilterInput>;
  validTo?: InputMaybe<ComparableNullableOfDateTimeOperationFilterInput>;
};

export type SubscriptionUserInput = {
  changeTime?: InputMaybe<Scalars['DateTime']>;
  changeUser?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['DateTime']>;
  createUser?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  langType?: InputMaybe<Scalars['String']>;
  perNo?: InputMaybe<Scalars['String']>;
  subscriptionId: Scalars['String'];
  upass?: InputMaybe<Scalars['String']>;
  userDesc?: InputMaybe<Scalars['String']>;
  userroles: Array<UserroleInput>;
  ustat?: InputMaybe<Scalars['String']>;
  validFrom?: InputMaybe<Scalars['DateTime']>;
  validTo?: InputMaybe<Scalars['DateTime']>;
};

export type SysNumberass = {
  __typename?: 'SysNumberass';
  description?: Maybe<Scalars['String']>;
  digitcount?: Maybe<Scalars['Int']>;
  invoicenumberasses?: Maybe<Array<Invoicenumberass>>;
  number?: Maybe<Scalars['Long']>;
  numbertype: Scalars['String'];
  nyear?: Maybe<Scalars['Short']>;
  prefix?: Maybe<Scalars['String']>;
  useyear?: Maybe<Scalars['Int']>;
};

export type SysNumberassFilterInput = {
  and?: InputMaybe<Array<SysNumberassFilterInput>>;
  description?: InputMaybe<StringOperationFilterInput>;
  digitcount?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  invoicenumberasses?: InputMaybe<ListFilterInputTypeOfInvoicenumberassFilterInput>;
  number?: InputMaybe<ComparableNullableOfInt64OperationFilterInput>;
  numbertype?: InputMaybe<StringOperationFilterInput>;
  nyear?: InputMaybe<ComparableNullableOfInt16OperationFilterInput>;
  or?: InputMaybe<Array<SysNumberassFilterInput>>;
  prefix?: InputMaybe<StringOperationFilterInput>;
  useyear?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
};

export type SysNumberassInput = {
  description?: InputMaybe<Scalars['String']>;
  digitcount?: InputMaybe<Scalars['Int']>;
  invoicenumberasses?: InputMaybe<Array<InvoicenumberassInput>>;
  number?: InputMaybe<Scalars['Long']>;
  numbertype: Scalars['String'];
  nyear?: InputMaybe<Scalars['Short']>;
  prefix?: InputMaybe<Scalars['String']>;
  useyear?: InputMaybe<Scalars['Int']>;
};

export type Taxis = {
  __typename?: 'Taxis';
  taxcode: Scalars['String'];
  taxdesc?: Maybe<Scalars['String']>;
  taxkey?: Maybe<Scalars['String']>;
  taxrate?: Maybe<Scalars['Decimal']>;
  taxtype?: Maybe<Scalars['String']>;
};

export type Transhist = {
  __typename?: 'Transhist';
  availableqty?: Maybe<Scalars['Float']>;
  batchno?: Maybe<Scalars['String']>;
  blockedqty?: Maybe<Scalars['Float']>;
  ctTransCode?: Maybe<CtTransCode>;
  entrydate?: Maybe<Scalars['DateTime']>;
  itemcode?: Maybe<Scalars['String']>;
  matdocno: Scalars['String'];
  matdocseq: Scalars['Int'];
  matdocyear: Scalars['Int'];
  newplantid?: Maybe<Scalars['Int']>;
  newstoragebinid?: Maybe<Scalars['Long']>;
  newstoragelocationid?: Maybe<Scalars['Int']>;
  onqualityqty?: Maybe<Scalars['Float']>;
  physicalqty?: Maybe<Scalars['Float']>;
  plantid?: Maybe<Scalars['Int']>;
  referenceid?: Maybe<Scalars['Long']>;
  referencetype?: Maybe<Scalars['String']>;
  reservedqty?: Maybe<Scalars['Float']>;
  serialno?: Maybe<Scalars['String']>;
  stakeholder?: Maybe<Stakeholder>;
  stakeholderid?: Maybe<Scalars['Long']>;
  storagebinid?: Maybe<Scalars['Long']>;
  storagelocationid?: Maybe<Scalars['Int']>;
  transcode?: Maybe<Scalars['String']>;
  transqty?: Maybe<Scalars['Float']>;
  transtime?: Maybe<Scalars['DateTime']>;
  username?: Maybe<Scalars['String']>;
  variantid?: Maybe<Scalars['Long']>;
};

export type TranshistFilterInput = {
  and?: InputMaybe<Array<TranshistFilterInput>>;
  availableqty?: InputMaybe<ComparableNullableOfDoubleOperationFilterInput>;
  batchno?: InputMaybe<StringOperationFilterInput>;
  blockedqty?: InputMaybe<ComparableNullableOfDoubleOperationFilterInput>;
  ctTransCode?: InputMaybe<CtTransCodeFilterInput>;
  entrydate?: InputMaybe<ComparableNullableOfDateTimeOperationFilterInput>;
  itemcode?: InputMaybe<StringOperationFilterInput>;
  matdocno?: InputMaybe<StringOperationFilterInput>;
  matdocseq?: InputMaybe<ComparableInt32OperationFilterInput>;
  matdocyear?: InputMaybe<ComparableInt32OperationFilterInput>;
  newplantid?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  newstoragebinid?: InputMaybe<ComparableNullableOfInt64OperationFilterInput>;
  newstoragelocationid?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  onqualityqty?: InputMaybe<ComparableNullableOfDoubleOperationFilterInput>;
  or?: InputMaybe<Array<TranshistFilterInput>>;
  physicalqty?: InputMaybe<ComparableNullableOfDoubleOperationFilterInput>;
  plantid?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  referenceid?: InputMaybe<ComparableNullableOfInt64OperationFilterInput>;
  referencetype?: InputMaybe<StringOperationFilterInput>;
  reservedqty?: InputMaybe<ComparableNullableOfDoubleOperationFilterInput>;
  serialno?: InputMaybe<StringOperationFilterInput>;
  stakeholder?: InputMaybe<StakeholderFilterInput>;
  stakeholderid?: InputMaybe<ComparableNullableOfInt64OperationFilterInput>;
  storagebinid?: InputMaybe<ComparableNullableOfInt64OperationFilterInput>;
  storagelocationid?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  transcode?: InputMaybe<StringOperationFilterInput>;
  transqty?: InputMaybe<ComparableNullableOfDoubleOperationFilterInput>;
  transtime?: InputMaybe<ComparableNullableOfDateTimeOperationFilterInput>;
  username?: InputMaybe<StringOperationFilterInput>;
  variantid?: InputMaybe<ComparableNullableOfInt64OperationFilterInput>;
};

export type TranshistInput = {
  availableqty?: InputMaybe<Scalars['Float']>;
  batchno?: InputMaybe<Scalars['String']>;
  blockedqty?: InputMaybe<Scalars['Float']>;
  ctTransCode?: InputMaybe<CtTransCodeInput>;
  entrydate?: InputMaybe<Scalars['DateTime']>;
  itemcode?: InputMaybe<Scalars['String']>;
  matdocno: Scalars['String'];
  matdocseq: Scalars['Int'];
  matdocyear: Scalars['Int'];
  newplantid?: InputMaybe<Scalars['Int']>;
  newstoragebinid?: InputMaybe<Scalars['Long']>;
  newstoragelocationid?: InputMaybe<Scalars['Int']>;
  onqualityqty?: InputMaybe<Scalars['Float']>;
  physicalqty?: InputMaybe<Scalars['Float']>;
  plantid?: InputMaybe<Scalars['Int']>;
  referenceid?: InputMaybe<Scalars['Long']>;
  referencetype?: InputMaybe<Scalars['String']>;
  reservedqty?: InputMaybe<Scalars['Float']>;
  serialno?: InputMaybe<Scalars['String']>;
  stakeholder?: InputMaybe<StakeholderInput>;
  stakeholderid?: InputMaybe<Scalars['Long']>;
  storagebinid?: InputMaybe<Scalars['Long']>;
  storagelocationid?: InputMaybe<Scalars['Int']>;
  transcode?: InputMaybe<Scalars['String']>;
  transqty?: InputMaybe<Scalars['Float']>;
  transtime?: InputMaybe<Scalars['DateTime']>;
  username?: InputMaybe<Scalars['String']>;
  variantid?: InputMaybe<Scalars['Long']>;
};

export type Unit = {
  __typename?: 'Unit';
  inUnitcode?: Maybe<Scalars['String']>;
  uactive?: Maybe<Scalars['Boolean']>;
  unitcode: Scalars['String'];
  unitname?: Maybe<Scalars['String']>;
  unittype?: Maybe<Scalars['String']>;
};

export type Userrole = {
  __typename?: 'Userrole';
  email: Scalars['String'];
  role?: Maybe<Role>;
  roleCode: Scalars['String'];
  subscriptionUser?: Maybe<SubscriptionUser>;
  subscriptionid: Scalars['String'];
};

export type UserroleFilterInput = {
  and?: InputMaybe<Array<UserroleFilterInput>>;
  email?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<UserroleFilterInput>>;
  role?: InputMaybe<RoleFilterInput>;
  roleCode?: InputMaybe<StringOperationFilterInput>;
  subscriptionUser?: InputMaybe<SubscriptionUserFilterInput>;
  subscriptionid?: InputMaybe<StringOperationFilterInput>;
};

export type UserroleInput = {
  email: Scalars['String'];
  role?: InputMaybe<RoleInput>;
  roleCode: Scalars['String'];
  subscriptionUser?: InputMaybe<SubscriptionUserInput>;
  subscriptionid: Scalars['String'];
};

export type AcAccountdocumenthMutateMutationVariables = Exact<{
  addOrUpdate: AddOrUpdateEnum;
  prmAcAccountdocumenth: AcAccountdocumenthInput;
}>;


export type AcAccountdocumenthMutateMutation = { __typename?: 'Mutation', addOrUpdateAcAccountdocumenth: { __typename?: 'ResultModelOfAcAccountdocumenth', resultType: ResultEnum, messageText?: string | null, data?: { __typename?: 'AcAccountdocumenth', accdocno: string, accountcode?: string | null, invoiceno?: any | null } | null } };

export type AddOrUpdatePaymentTermsMutationVariables = Exact<{
  addOrUpdate: AddOrUpdateEnum;
  AcPaymenttermInput: AcPaymenttermInput;
}>;


export type AddOrUpdatePaymentTermsMutation = { __typename?: 'Mutation', addOrUpdatePaymentTerm: { __typename?: 'ResultModelOfAcPaymentterm', resultType: ResultEnum, messageText?: string | null } };

export type AddOrUpdateAcTillMutationVariables = Exact<{
  addOrUpdate: AddOrUpdateEnum;
  prmAcTill: AcTillInput;
}>;


export type AddOrUpdateAcTillMutation = { __typename?: 'Mutation', addOrUpdateTill: { __typename?: 'ResultModelOfAcTill', resultType: ResultEnum, messageText?: string | null } };

export type AddOrUpdateCompanyMutationVariables = Exact<{
  addOrUpdate: AddOrUpdateEnum;
  prmCompany: CompanyInput;
}>;


export type AddOrUpdateCompanyMutation = { __typename?: 'Mutation', addOrUpdateCompany: { __typename?: 'ResultModelOfCompany', resultType: ResultEnum, messageText?: string | null } };

export type AddOrUpdateExpenseCategoryMutationVariables = Exact<{
  addOrUpdate: AddOrUpdateEnum;
  prmExpenseCategory: ExpensecategoryInput;
}>;


export type AddOrUpdateExpenseCategoryMutation = { __typename?: 'Mutation', addOrUpdateExpenseCategory: { __typename?: 'ResultModelOfExpensecategory', resultType: ResultEnum, messageText?: string | null, data?: { __typename?: 'Expensecategory', expensecategoryid: any, expensecategorydesc?: string | null } | null } };

export type AddOrUpdateStakeholderMutationVariables = Exact<{
  addOrUpdate: AddOrUpdateEnum;
  prmStakeholder: StakeholderInput;
}>;


export type AddOrUpdateStakeholderMutation = { __typename?: 'Mutation', addOrUpdateStakeholder: { __typename?: 'ResultModelOfStakeholder', resultType: ResultEnum, messageText?: string | null, data?: { __typename?: 'Stakeholder', stakeholderid: any, iname?: string | null, isurname?: string | null, stakeholdercode?: string | null, stakeholdername?: string | null, stakeholdertype?: string | null, paymentterm?: string | null, taxno?: string | null, risklimit?: any | null, risknotes?: string | null, tradetype?: string | null, identityno?: string | null, currency?: string | null, shadbook?: { __typename?: 'Stakeholderadbook', shadbookid: any, fax?: string | null, website?: string | null, email?: string | null, shadname?: string | null, shadtype?: string | null, countrykey?: string | null, city?: string | null, county?: string | null, postcode?: string | null, address?: string | null, phone?: string | null } | null, stakeholdercontacts?: Array<{ __typename?: 'Stakeholdercontact', contactname?: string | null, contactemail?: string | null, contactmobile?: string | null, contactphone?: string | null, contactrole?: string | null, contactnotes?: string | null }> | null } | null } };

export type AddOrUpdateSubscriptionUsersMutationVariables = Exact<{
  addOrUpdate: AddOrUpdateEnum;
  prmSubscriptionUser: SubscriptionUserInput;
}>;


export type AddOrUpdateSubscriptionUsersMutation = { __typename?: 'Mutation', addOrUpdateSubscriptionUser: { __typename?: 'ResultModelOfSubscriptionUser', resultType: ResultEnum, messageText?: string | null, data?: { __typename?: 'SubscriptionUser', upass?: string | null } | null } };

export type AddOrUpdateTranshistMutationVariables = Exact<{
  addOrUpdate: AddOrUpdateEnum;
  prmTranshist: TranshistInput;
}>;


export type AddOrUpdateTranshistMutation = { __typename?: 'Mutation', addOrUpdateTranshist: { __typename?: 'ResultModelOfTranshist', resultType: ResultEnum, messageText?: string | null } };

export type AddSubscriptionUserMutationVariables = Exact<{
  prmSubscriptionUser: SubscriptionUserInput;
}>;


export type AddSubscriptionUserMutation = { __typename?: 'Mutation', addSubscriptionUser: { __typename?: 'ResultModelOfSubscriptionUser', data?: { __typename?: 'SubscriptionUser', subscriptionId: string, perNo?: string | null } | null } };

export type AddOrUpdateAcBankAccountMutationVariables = Exact<{
  addOrUpdate: AddOrUpdateEnum;
  prmAcBankAccount: AcBankaccountInput;
}>;


export type AddOrUpdateAcBankAccountMutation = { __typename?: 'Mutation', addOrUpdateAcBankAccount: { __typename?: 'ResultModelOfAcBankaccount', resultType: ResultEnum, messageText?: string | null } };

export type DeleteAcAccountDocumenthMutationVariables = Exact<{
  prmaccdocno: Scalars['String'];
  prmaccdocyear: Scalars['Int'];
  prmcompanyId: Scalars['Long'];
}>;


export type DeleteAcAccountDocumenthMutation = { __typename?: 'Mutation', deleteAcAccountDocumenth: { __typename?: 'ResultModelOfString', resultType: ResultEnum, messageText?: string | null } };

export type DeleteAcBankAccountMutationVariables = Exact<{
  prmAcBankAccountCode: Scalars['String'];
  prmPlantId: Scalars['Int'];
}>;


export type DeleteAcBankAccountMutation = { __typename?: 'Mutation', deleteAcBankAccount: { __typename?: 'ResultModelOfString', resultType: ResultEnum, messageText?: string | null } };

export type DeleteAcPaymentTermMutationVariables = Exact<{
  prmPaymentTerm: Scalars['String'];
}>;


export type DeleteAcPaymentTermMutation = { __typename?: 'Mutation', deleteAcPaymentTerm: { __typename?: 'ResultModelOfString', resultType: ResultEnum, messageText?: string | null } };

export type DeleteAcTillsMutationVariables = Exact<{
  prmAcTillCode: Scalars['String'];
  prmPlantId: Scalars['Int'];
}>;


export type DeleteAcTillsMutation = { __typename?: 'Mutation', deleteAcTills: { __typename?: 'ResultModelOfString', resultType: ResultEnum, messageText?: string | null } };

export type DeleteCompanyMutationVariables = Exact<{
  prmCompanyId: Scalars['Long'];
}>;


export type DeleteCompanyMutation = { __typename?: 'Mutation', deleteCompany: { __typename?: 'ResultModelOfString', resultType: ResultEnum, messageText?: string | null } };

export type DeleteExpenseMutationVariables = Exact<{
  prmExpenseCode: Scalars['String'];
}>;


export type DeleteExpenseMutation = { __typename?: 'Mutation', deleteExpense: { __typename?: 'ResultModelOfString', resultType: ResultEnum, messageText?: string | null } };

export type DeleteExpenseCategoryMutationVariables = Exact<{
  prmExpenseCategoryId: Scalars['Long'];
}>;


export type DeleteExpenseCategoryMutation = { __typename?: 'Mutation', deleteExpenseCategory: { __typename?: 'ResultModelOfString', resultType: ResultEnum, messageText?: string | null } };

export type DeleteInvoicehMutationVariables = Exact<{
  prmInvoiceNo: Scalars['Long'];
}>;


export type DeleteInvoicehMutation = { __typename?: 'Mutation', deleteInvoiceh: { __typename?: 'ResultModelOfString', resultType: ResultEnum, messageText?: string | null } };

export type DeleteStakeholderMutationVariables = Exact<{
  prmStakeholderId: Scalars['Long'];
}>;


export type DeleteStakeholderMutation = { __typename?: 'Mutation', deleteStakeholder: { __typename?: 'ResultModelOfString', resultType: ResultEnum, messageText?: string | null } };

export type DeleteSubscriptionUsersMutationVariables = Exact<{
  prmEmail: Scalars['String'];
  prmSubscriptionId: Scalars['String'];
}>;


export type DeleteSubscriptionUsersMutation = { __typename?: 'Mutation', deleteSubscriptionUsers: { __typename?: 'ResultModelOfString', resultType: ResultEnum, messageText?: string | null } };

export type AddOrUpdateExpensesMutationVariables = Exact<{
  addOrUpdate: AddOrUpdateEnum;
  prmExpense: ExpenseInput;
}>;


export type AddOrUpdateExpensesMutation = { __typename?: 'Mutation', addOrUpdateExpense: { __typename?: 'ResultModelOfExpense', resultType: ResultEnum, messageText?: string | null } };

export type AddOrUpdateGoodsReceivinghMutateMutationVariables = Exact<{
  addOrUpdate: AddOrUpdateEnum;
  prmGoodsReceivingh: GoodsreceivinghInput;
}>;


export type AddOrUpdateGoodsReceivinghMutateMutation = { __typename?: 'Mutation', addOrUpdateStockGoodsReceivingh: { __typename?: 'ResultModelOfGoodsreceivingh', resultType: ResultEnum, messageText?: string | null } };

export type AddOrUpdateInvoiceHMutationVariables = Exact<{
  addOrUpdate: AddOrUpdateEnum;
  prmInvoiceH: InvoicehInput;
  prmInvoiceno?: InputMaybe<Scalars['Long']>;
}>;


export type AddOrUpdateInvoiceHMutation = { __typename?: 'Mutation', addOrUpdateInvoiceH: { __typename?: 'ResultModelOfInvoiceh', resultType: ResultEnum, messageText?: string | null, data?: { __typename?: 'Invoiceh', invoiceno: any } | null } };

export type AddOrUpdateItemMasterMutationVariables = Exact<{
  prmItemMaster: ItemmasterInput;
  addOrUpdate: AddOrUpdateEnum;
}>;


export type AddOrUpdateItemMasterMutation = { __typename?: 'Mutation', addOrUpdateItemMaster: { __typename?: 'ResultModelOfItemmaster', resultType: ResultEnum, messageText?: string | null } };

export type LoginMutationVariables = Exact<{
  prmLoginInput: LoginInputTypeInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'ResultModelOfSubscriptionUser', resultType: ResultEnum, messageText?: string | null, data?: { __typename?: 'SubscriptionUser', subscriptionId: string, perNo?: string | null, userDesc?: string | null, userroles: Array<{ __typename?: 'Userrole', email: string, roleCode: string, subscriptionid: string }> } | null } };

export type AddOrUpdateStockBlockRequesthMutationVariables = Exact<{
  addOrUpdate: AddOrUpdateEnum;
  prmStockBlockRequesth: StockblockrequesthInput;
}>;


export type AddOrUpdateStockBlockRequesthMutation = { __typename?: 'Mutation', addOrUpdateStockBlockRequesth: { __typename?: 'ResultModelOfStockblockrequesth', resultType: ResultEnum, messageText?: string | null } };

export type AddOrUpdateStockTransferHMutationVariables = Exact<{
  addOrUpdate: AddOrUpdateEnum;
  prmStockTransferh: StocktransferhInput;
}>;


export type AddOrUpdateStockTransferHMutation = { __typename?: 'Mutation', addOrUpdateStocktransferh: { __typename?: 'ResultModelOfStocktransferh', resultType: ResultEnum, messageText?: string | null, data?: { __typename?: 'Stocktransferh', transferid: any, tstat?: string | null, subscriptionsidS?: string | null, subscriptionsidR?: string | null } | null } };

export type GetAcAccountDocumentHQueryVariables = Exact<{
  prmInvoiceNo?: InputMaybe<Scalars['Long']>;
  prmDocType?: InputMaybe<Scalars['Int']>;
}>;


export type GetAcAccountDocumentHQuery = { __typename?: 'Query', acAccountdocumenths: Array<{ __typename?: 'AcAccountdocumenth', invoiceno?: any | null, docdate?: any | null, accdocno: string, amountlc?: any | null, currencylc?: string | null, amount?: any | null, currency?: string | null }> };

export type GetAcAccountdocumenthsTableQueryVariables = Exact<{
  prmAccDocType: Scalars['Int'];
  prmDocNo: Scalars['String'];
  prmEndTime?: InputMaybe<Scalars['DateTime']>;
  stakeholderCode: FilterTypeInputOfStringInput;
  stakeholderName: FilterTypeInputOfStringInput;
  prmStartDate?: InputMaybe<Scalars['DateTime']>;
}>;


export type GetAcAccountdocumenthsTableQuery = { __typename?: 'Query', acAccountdocumenthsTable: Array<{ __typename?: 'AcAccountdocumenth', invoiceno?: any | null, docdate?: any | null, accdocno: string, stakeholderid?: any | null, amount?: any | null, currency?: string | null, companyid: any, accdocyear: number, amountlc?: any | null, explanation?: string | null, currencylc?: string | null, stakeholder?: { __typename?: 'Stakeholder', stakeholdername?: string | null, stakeholdercode?: string | null } | null, acAccountdocumentis?: Array<{ __typename?: 'AcAccountdocumenti', movementtypeid?: number | null, ownercode?: string | null, maturitydate?: any | null, amount?: any | null, currency?: string | null, explanation?: string | null }> | null }> };

export type GetAcBankAccountsQueryVariables = Exact<{
  bankAccountCode: FilterTypeInputOfStringInput;
  bankAccountName: FilterTypeInputOfStringInput;
  bankCode: FilterTypeInputOfStringInput;
}>;


export type GetAcBankAccountsQuery = { __typename?: 'Query', acBankaccountsWithFilterType: Array<{ __typename?: 'AcBankaccount', plantid: number, bastat?: string | null, bankaccountcode: string, bankaccountname?: string | null, bankcode?: string | null, branchcode?: string | null, bankaccounttypeid?: number | null, creditcard?: boolean | null, currency?: string | null, accountno?: string | null, ibanno?: string | null }> };

export type GetAcPaymentTermsQueryVariables = Exact<{
  paymentTermCode: FilterTypeInputOfStringInput;
  paymentTermDesc: FilterTypeInputOfStringInput;
}>;


export type GetAcPaymentTermsQuery = { __typename?: 'Query', acPaymentTermsWithFilter: Array<{ __typename?: 'AcPaymentterm', paymentterm: string, paymenttermdesc?: string | null, paymenttermtype?: string | null, maindate?: string | null, daycount?: number | null, fixedday?: number | null, active?: boolean | null }> };

export type GetAcTillsQueryVariables = Exact<{
  tillCode: FilterTypeInputOfStringInput;
  tillName: FilterTypeInputOfStringInput;
}>;


export type GetAcTillsQuery = { __typename?: 'Query', acTillsWithFilter: Array<{ __typename?: 'AcTill', plantid: number, tillcode: string, tillname?: string | null, currency?: string | null, tstat?: string | null }> };

export type GetAccountStatementQueryVariables = Exact<{
  prmStakeholderid: Scalars['Long'];
}>;


export type GetAccountStatementQuery = { __typename?: 'Query', stakeholders: Array<{ __typename?: 'Stakeholder', acAccountdocumenths?: Array<{ __typename?: 'AcAccountdocumenth', docdate?: any | null, accdocno: string, amount?: any | null, amountlc?: any | null, currency?: string | null, invoiceno?: any | null, accdoctypeNavigation?: { __typename?: 'AcDocumenttype', accdoctypename: string, dcindicator?: string | null } | null }> | null, invoicehs?: Array<{ __typename?: 'Invoiceh', invdate: any, invoiceno: any, invoicetype: string, gtotalamount: any, currency: string, paymentterm?: string | null, eiNo?: string | null, explanation?: string | null, invoicetypeNavigation?: { __typename?: 'Invoicetype', invoicetypename?: string | null } | null, stakeholder?: { __typename?: 'Stakeholder', stakeholdercode?: string | null, stakeholdername?: string | null } | null }> | null }> };

export type GetAllStakeholdersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllStakeholdersQuery = { __typename?: 'Query', stakeholders: Array<{ __typename?: 'Stakeholder', stakeholderid: any, iname?: string | null, isurname?: string | null, stakeholdercode?: string | null, stakeholdername?: string | null, stakeholdertype?: string | null, paymentterm?: string | null, taxno?: string | null, risklimit?: any | null, risknotes?: string | null, tradetype?: string | null, taxoffice?: string | null, shadbook?: { __typename?: 'Stakeholderadbook', shadbookid: any, fax?: string | null, website?: string | null, email?: string | null, shadname?: string | null, shadtype?: string | null, countrykey?: string | null, city?: string | null, county?: string | null, postcode?: string | null, address?: string | null, phone?: string | null } | null, stakeholdercontacts?: Array<{ __typename?: 'Stakeholdercontact', contactname?: string | null, contactemail?: string | null, contactmobile?: string | null, contactphone?: string | null, contactrole?: string | null, contactnotes?: string | null }> | null }> };

export type GetCitiesQueryVariables = Exact<{
  prmCountryKey: Scalars['String'];
}>;


export type GetCitiesQuery = { __typename?: 'Query', cities: Array<{ __typename?: 'CtCity', city?: string | null, cityCode?: string | null }> };

export type GetCompaniesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCompaniesQuery = { __typename?: 'Query', companies: Array<{ __typename?: 'Company', signature?: string | null, companyid: any, companycode: string, companyname?: string | null, taxno?: string | null, taxoffice?: string | null, telno?: string | null, country?: string | null, city?: string | null, currency?: string | null, address?: string | null, mersisno?: string | null, website?: string | null, email?: string | null, postcode?: string | null, chartaccount?: string | null, traderegisterno?: string | null, faxno?: string | null }> };

export type GetCountriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCountriesQuery = { __typename?: 'Query', countries: Array<{ __typename?: 'CtCountry', countryKey: string, country?: string | null }> };

export type GetCtTransCodesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCtTransCodesQuery = { __typename?: 'Query', ctTransCodes: Array<{ __typename?: 'CtTransCode', transCode: string, transDesc?: string | null }> };

export type GetCurrenciesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrenciesQuery = { __typename?: 'Query', acCurrencies: Array<{ __typename?: 'AcCurrency', currency: string, description?: string | null, cstat?: string | null }> };

export type GetExpenseCategoryQueryVariables = Exact<{
  expenseCategoryDesc: FilterTypeInputOfStringInput;
}>;


export type GetExpenseCategoryQuery = { __typename?: 'Query', expensecategory: Array<{ __typename?: 'Expensecategory', expensecategoryid: any, expensecategorydesc?: string | null }> };

export type GetExpensesQueryVariables = Exact<{
  expenseCode: FilterTypeInputOfStringInput;
  expenseName: FilterTypeInputOfStringInput;
  expenseCategoryId: Scalars['Long'];
}>;


export type GetExpensesQuery = { __typename?: 'Query', expenses: Array<{ __typename?: 'Expense', expensecode: string, expensename?: string | null, expensecategoryid?: any | null, expensecategory?: { __typename?: 'Expensecategory', expensecategorydesc?: string | null } | null }> };

export type GetGoodsReceivinghQueryVariables = Exact<{
  prmDeliveryNoteNo?: InputMaybe<Scalars['Long']>;
  prmEndDate?: InputMaybe<Scalars['DateTime']>;
  prmStartDate?: InputMaybe<Scalars['DateTime']>;
  prmSubscriptionIdR: Scalars['String'];
}>;


export type GetGoodsReceivinghQuery = { __typename?: 'Query', goodsreceivinghs: Array<{ __typename?: 'Goodsreceivingh', goodsreceivingid: any, subscriptionsidR?: string | null, deliverynoteno?: any | null, shipmenttime?: any | null, rstat?: string | null, receivingtime?: any | null, emailR?: string | null, explanationR?: string | null, goodsreceivingis: Array<{ __typename?: 'Goodsreceivingi', goodsreceivingid: any, seqno: number, itemcode?: string | null, serialno?: string | null, batchno?: string | null, transqty?: any | null, unit?: string | null, rstat?: string | null, explanationR?: string | null }> }> };

export type GetInvoiceHQueryVariables = Exact<{
  prmInvoiceType?: InputMaybe<Scalars['String']>;
}>;


export type GetInvoiceHQuery = { __typename?: 'Query', invoiceH: Array<{ __typename?: 'Invoiceh', invoiceno: any, paymentterm?: string | null, exchangerate?: any | null, currency: string, baseamount: any, discountamount: any, gtotalamount: any, exceptioncode?: string | null, documentno?: string | null, eiType?: string | null, eiScenario?: string | null, eiStatus?: string | null, plantid: number, eiNo?: string | null, eiUuid?: string | null, eiSendinguser?: string | null, eiSendingtime?: any | null, explanation?: string | null, createuser: string, createtime: any, changeuser?: string | null, changetime?: any | null, deleted: boolean, companyid: any, maturitydate?: any | null, paidamount?: any | null, invdate: any, referencedocno?: string | null, invoicetype: string, stakeholder?: { __typename?: 'Stakeholder', stakeholderid: any, stakeholdercode?: string | null, stakeholdername?: string | null, taxoffice?: string | null, taxno?: string | null, shadbook?: { __typename?: 'Stakeholderadbook', address?: string | null } | null } | null, invoicepaymentplan?: { __typename?: 'Invoicepaymentplan', invoiceno: any, initialpaymentdate?: any | null, installmentcount?: number | null, installmentperiod?: number | null, installmentperiodunit?: string | null, explanation?: string | null } | null, invoiceds?: Array<{ __typename?: 'Invoiced', invoiceno: any, unitprice: any, discountrate: any, discountamount: any, explanation?: string | null, netamount: any, vatcode?: string | null, vatamount: any, sctcode?: string | null, sctamount: any, pctcode?: string | null, pctamount: any, returnedqty: any, seqno: number, unit: string, quantity: any, itemcode: string, itemtype: string, invoicedstocks?: Array<{ __typename?: 'Invoicedstock', id: any, invoiceno: any, seqno: number, itemcode?: string | null, serialno?: string | null, batchno?: string | null, transqty?: any | null, returnedqty: any }> | null }> | null, invoicepaymentplanlines?: Array<{ __typename?: 'Invoicepaymentplanline', invoiceno: any, paymentdate: any, currency?: string | null, amount?: any | null, paidamount?: any | null }> | null, acAccountdocumenths?: Array<{ __typename?: 'AcAccountdocumenth', docdate?: any | null, accdocno: string, amountlc?: any | null, currencylc?: string | null }> | null }> };

export type GetInvoiceHByInvoiceNoQueryVariables = Exact<{
  prmInvoiceNo?: InputMaybe<Scalars['Long']>;
}>;


export type GetInvoiceHByInvoiceNoQuery = { __typename?: 'Query', invoiceH: Array<{ __typename?: 'Invoiceh', invoiceno: any, paymentterm?: string | null, exchangerate?: any | null, currency: string, baseamount: any, discountamount: any, gtotalamount: any, exceptioncode?: string | null, eiType?: string | null, documentno?: string | null, eiScenario?: string | null, eiStatus?: string | null, plantid: number, eiNo?: string | null, eiUuid?: string | null, eiSendinguser?: string | null, eiSendingtime?: any | null, explanation?: string | null, createuser: string, createtime: any, changeuser?: string | null, changetime?: any | null, deleted: boolean, companyid: any, maturitydate?: any | null, paidamount?: any | null, invdate: any, referencedocno?: string | null, invoicetype: string, stakeholder?: { __typename?: 'Stakeholder', stakeholderid: any, stakeholdercode?: string | null, stakeholdername?: string | null, taxoffice?: string | null, taxno?: string | null, shadbook?: { __typename?: 'Stakeholderadbook', address?: string | null } | null } | null, invoicepaymentplan?: { __typename?: 'Invoicepaymentplan', invoiceno: any, initialpaymentdate?: any | null, installmentcount?: number | null, installmentperiod?: number | null, installmentperiodunit?: string | null, explanation?: string | null } | null, invoiceds?: Array<{ __typename?: 'Invoiced', invoiceno: any, unitprice: any, discountrate: any, discountamount: any, netamount: any, vatcode?: string | null, vatamount: any, sctcode?: string | null, sctamount: any, explanation?: string | null, pctcode?: string | null, pctamount: any, seqno: number, unit: string, quantity: any, itemcode: string, returnedqty: any, itemtype: string, invoicedstocks?: Array<{ __typename?: 'Invoicedstock', id: any, invoiceno: any, seqno: number, itemcode?: string | null, serialno?: string | null, batchno?: string | null, transqty?: any | null, returnedqty: any }> | null }> | null, invoicepaymentplanlines?: Array<{ __typename?: 'Invoicepaymentplanline', invoiceno: any, paymentdate: any, currency?: string | null, amount?: any | null, paidamount?: any | null }> | null }> };

export type GetInvoiceHByTypesQueryVariables = Exact<{
  prmInvoiceType1?: InputMaybe<Scalars['String']>;
  prmInvoiceType2?: InputMaybe<Scalars['String']>;
}>;


export type GetInvoiceHByTypesQuery = { __typename?: 'Query', invoiceH: Array<{ __typename?: 'Invoiceh', invoiceno: any, paymentterm?: string | null, exchangerate?: any | null, currency: string, baseamount: any, discountamount: any, gtotalamount: any, exceptioncode?: string | null, changeuser?: string | null, createuser: string, eiType?: string | null, eiScenario?: string | null, eiStatus?: string | null, plantid: number, eiNo?: string | null, eiUuid?: string | null, explanation?: string | null, deleted: boolean, companyid: any, maturitydate?: any | null, paidamount?: any | null, referencedocno?: string | null, invoicetype: string, invdate: any, stakeholderid: any, shadbookid: any, documentno?: string | null, eiSendinguser?: string | null, stakeholder?: { __typename?: 'Stakeholder', stakeholderid: any, stakeholdercode?: string | null, stakeholdername?: string | null, taxoffice?: string | null, taxno?: string | null, shadbook?: { __typename?: 'Stakeholderadbook', address?: string | null } | null } | null, invoicepaymentplan?: { __typename?: 'Invoicepaymentplan', invoiceno: any, initialpaymentdate?: any | null, installmentcount?: number | null, installmentperiod?: number | null, installmentperiodunit?: string | null, explanation?: string | null } | null, invoiceds?: Array<{ __typename?: 'Invoiced', invoiceno: any, unitprice: any, discountrate: any, discountamount: any, netamount: any, explanation?: string | null, vatcode?: string | null, vatamount: any, sctcode?: string | null, sctamount: any, pctcode?: string | null, pctamount: any, seqno: number, unit: string, quantity: any, itemcode: string, itemtype: string, returnedqty: any, invoicedstocks?: Array<{ __typename?: 'Invoicedstock', id: any, itemcode?: string | null, serialno?: string | null, batchno?: string | null, transqty?: any | null, seqno: number, invoiceno: any, returnedqty: any }> | null }> | null, invoicepaymentplanlines?: Array<{ __typename?: 'Invoicepaymentplanline', invoiceno: any, paymentdate: any, currency?: string | null, amount?: any | null, paidamount?: any | null }> | null, acAccountdocumenths?: Array<{ __typename?: 'AcAccountdocumenth', companyid: any, exchangedate?: any | null, exchangerate?: any | null, referenceno?: string | null, amount?: any | null, accountclassid?: number | null, accountcode?: string | null, explanation?: string | null, deleted?: boolean | null, createtime?: any | null, createuser?: string | null, accdocno: string, changetime?: any | null, changeuser?: string | null, invoiceno?: any | null, stakeholderid?: any | null, docdate?: any | null, amountlc?: any | null, currencylc?: string | null, acAccountdocumentis?: Array<{ __typename?: 'AcAccountdocumenti', companyid: any, maturitydate?: any | null, accountclassid?: number | null, ownercode?: string | null, stakeholderid?: any | null, glaccount?: string | null, paymentterm?: string | null, explanation?: string | null, deleted?: boolean | null, createtime?: any | null, createuser?: string | null, accdocno: string, changetime?: any | null, changeuser?: string | null, accdocyear: number, accdocseq: number, movementtypeid?: number | null, paymentorderno?: string | null, dcindicator?: string | null, currency?: string | null, amount?: any | null, amountlc?: any | null }> | null }> | null }> };

export type GetInvoiceTypesQueryVariables = Exact<{
  prmType: Scalars['String'];
}>;


export type GetInvoiceTypesQuery = { __typename?: 'Query', invoicetypes: Array<{ __typename?: 'Invoicetype', invoicetype1: string, invoicetypename?: string | null }> };

export type GetInvoicehWithFilterQueryVariables = Exact<{
  prmEino: Scalars['String'];
  prmInvoiceno: Scalars['Long'];
  prmStartTime?: InputMaybe<Scalars['DateTime']>;
  prmEndTime?: InputMaybe<Scalars['DateTime']>;
  prmInvoicetype: Scalars['String'];
}>;


export type GetInvoicehWithFilterQuery = { __typename?: 'Query', invoicehWithFilter: Array<{ __typename?: 'Invoiceh', invoiceno: any, paymentterm?: string | null, exchangerate?: any | null, currency: string, baseamount: any, discountamount: any, gtotalamount: any, exceptioncode?: string | null, documentno?: string | null, eiType?: string | null, eiScenario?: string | null, eiStatus?: string | null, plantid: number, eiNo?: string | null, eiUuid?: string | null, eiSendinguser?: string | null, eiSendingtime?: any | null, explanation?: string | null, createuser: string, createtime: any, changeuser?: string | null, changetime?: any | null, deleted: boolean, companyid: any, maturitydate?: any | null, paidamount?: any | null, invdate: any, referencedocno?: string | null, invoicetype: string, stakeholder?: { __typename?: 'Stakeholder', stakeholderid: any, stakeholdercode?: string | null, stakeholdername?: string | null, taxoffice?: string | null, taxno?: string | null, shadbook?: { __typename?: 'Stakeholderadbook', address?: string | null } | null } | null, invoicepaymentplan?: { __typename?: 'Invoicepaymentplan', invoiceno: any, initialpaymentdate?: any | null, installmentcount?: number | null, installmentperiod?: number | null, installmentperiodunit?: string | null, explanation?: string | null } | null, invoiceds?: Array<{ __typename?: 'Invoiced', invoiceno: any, unitprice: any, discountrate: any, discountamount: any, explanation?: string | null, netamount: any, vatcode?: string | null, vatamount: any, sctcode?: string | null, sctamount: any, pctcode?: string | null, pctamount: any, returnedqty: any, seqno: number, unit: string, quantity: any, itemcode: string, itemtype: string, invoicedstocks?: Array<{ __typename?: 'Invoicedstock', id: any, invoiceno: any, seqno: number, itemcode?: string | null, serialno?: string | null, batchno?: string | null, transqty?: any | null, returnedqty: any }> | null }> | null, invoicepaymentplanlines?: Array<{ __typename?: 'Invoicepaymentplanline', invoiceno: any, paymentdate: any, currency?: string | null, amount?: any | null, paidamount?: any | null }> | null, acAccountdocumenths?: Array<{ __typename?: 'AcAccountdocumenth', docdate?: any | null, accdocno: string, amountlc?: any | null, currencylc?: string | null }> | null }> };

export type GetInvoicehWithFilterForReturnQueryVariables = Exact<{
  prmEino: Scalars['String'];
  prmEndDate?: InputMaybe<Scalars['DateTime']>;
  prmInvoiceno: Scalars['Long'];
  prmInvoiceType: Scalars['String'];
  prmInvoiceType2: Scalars['String'];
  prmStartDate?: InputMaybe<Scalars['DateTime']>;
}>;


export type GetInvoicehWithFilterForReturnQuery = { __typename?: 'Query', invoicehWithFilterForReturn: Array<{ __typename?: 'Invoiceh', invoiceno: any, paymentterm?: string | null, exchangerate?: any | null, currency: string, baseamount: any, discountamount: any, gtotalamount: any, exceptioncode?: string | null, changeuser?: string | null, createuser: string, eiType?: string | null, eiScenario?: string | null, eiStatus?: string | null, plantid: number, eiNo?: string | null, eiUuid?: string | null, explanation?: string | null, deleted: boolean, companyid: any, maturitydate?: any | null, paidamount?: any | null, referencedocno?: string | null, invoicetype: string, invdate: any, stakeholderid: any, shadbookid: any, documentno?: string | null, eiSendinguser?: string | null, stakeholder?: { __typename?: 'Stakeholder', stakeholderid: any, stakeholdercode?: string | null, stakeholdername?: string | null, taxoffice?: string | null, taxno?: string | null, shadbook?: { __typename?: 'Stakeholderadbook', address?: string | null } | null } | null, invoicepaymentplan?: { __typename?: 'Invoicepaymentplan', invoiceno: any, initialpaymentdate?: any | null, installmentcount?: number | null, installmentperiod?: number | null, installmentperiodunit?: string | null, explanation?: string | null } | null, invoiceds?: Array<{ __typename?: 'Invoiced', invoiceno: any, unitprice: any, discountrate: any, discountamount: any, netamount: any, explanation?: string | null, vatcode?: string | null, vatamount: any, sctcode?: string | null, sctamount: any, pctcode?: string | null, pctamount: any, seqno: number, unit: string, quantity: any, itemcode: string, itemtype: string, returnedqty: any, invoicedstocks?: Array<{ __typename?: 'Invoicedstock', id: any, itemcode?: string | null, serialno?: string | null, batchno?: string | null, transqty?: any | null, seqno: number, invoiceno: any, returnedqty: any }> | null }> | null, invoicepaymentplanlines?: Array<{ __typename?: 'Invoicepaymentplanline', invoiceno: any, paymentdate: any, currency?: string | null, amount?: any | null, paidamount?: any | null }> | null, acAccountdocumenths?: Array<{ __typename?: 'AcAccountdocumenth', companyid: any, exchangedate?: any | null, exchangerate?: any | null, referenceno?: string | null, amount?: any | null, accountclassid?: number | null, accountcode?: string | null, explanation?: string | null, deleted?: boolean | null, createtime?: any | null, createuser?: string | null, accdocno: string, changetime?: any | null, changeuser?: string | null, invoiceno?: any | null, stakeholderid?: any | null, docdate?: any | null, amountlc?: any | null, currencylc?: string | null, acAccountdocumentis?: Array<{ __typename?: 'AcAccountdocumenti', companyid: any, maturitydate?: any | null, accountclassid?: number | null, ownercode?: string | null, stakeholderid?: any | null, glaccount?: string | null, paymentterm?: string | null, explanation?: string | null, deleted?: boolean | null, createtime?: any | null, createuser?: string | null, accdocno: string, changetime?: any | null, changeuser?: string | null, accdocyear: number, accdocseq: number, movementtypeid?: number | null, paymentorderno?: string | null, dcindicator?: string | null, currency?: string | null, amount?: any | null, amountlc?: any | null }> | null }> | null }> };

export type GetItemMastersQueryVariables = Exact<{
  itemtypecode: Scalars['String'];
}>;


export type GetItemMastersQuery = { __typename?: 'Query', itemmasters: Array<{ __typename?: 'Itemmaster', itemcode: string, sctcode?: string | null, pctcode?: string | null, stockcontrol?: string | null, minstockqty?: number | null, maxstockqty?: number | null, barcodeno?: string | null, categoryid?: any | null, currency?: string | null, itemname?: string | null, vatcode?: string | null, purchaseprice?: any | null, salesprice?: any | null, stockmanagement?: string | null, istat?: string | null, unitsale?: string | null, baseunit?: string | null, itemtypecode?: string | null, invoiceds?: Array<{ __typename?: 'Invoiced', invoiceno: any, unitprice: any, discountrate: any, discountamount: any, netamount: any, vatcode?: string | null, companyid: any, plantid: number, sctcode?: string | null, sctamount: any, pctcode?: string | null, pctamount: any, seqno: number, deliverynoteno?: any | null, matdocno?: string | null, warehouseid?: number | null, locationid?: number | null, quantity: any }> | null }> };

export type GetItemMastersWithFilterQueryVariables = Exact<{
  prmItemCode: Scalars['String'];
  prmItemName: Scalars['String'];
  prmItemTypeCode: Scalars['String'];
}>;


export type GetItemMastersWithFilterQuery = { __typename?: 'Query', itemmastersWithFilter: Array<{ __typename?: 'Itemmaster', itemcode: string, sctcode?: string | null, pctcode?: string | null, stockcontrol?: string | null, minstockqty?: number | null, maxstockqty?: number | null, barcodeno?: string | null, categoryid?: any | null, currency?: string | null, itemname?: string | null, vatcode?: string | null, purchaseprice?: any | null, salesprice?: any | null, stockmanagement?: string | null, istat?: string | null, unitsale?: string | null, baseunit?: string | null, itemtypecode?: string | null }> };

export type GetItemMastersWithFilterTypeQueryVariables = Exact<{
  itemCode: FilterTypeInputOfStringInput;
  itemName: FilterTypeInputOfStringInput;
  itemTypeCode: FilterTypeInputOfStringInput;
}>;


export type GetItemMastersWithFilterTypeQuery = { __typename?: 'Query', itemmastersWithFilterType: Array<{ __typename?: 'Itemmaster', itemcode: string, sctcode?: string | null, pctcode?: string | null, stockcontrol?: string | null, minstockqty?: number | null, maxstockqty?: number | null, barcodeno?: string | null, categoryid?: any | null, currency?: string | null, itemname?: string | null, vatcode?: string | null, purchaseprice?: any | null, salesprice?: any | null, stockmanagement?: string | null, istat?: string | null, unitsale?: string | null, baseunit?: string | null, itemtypecode?: string | null }> };

export type GetItemTypesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetItemTypesQuery = { __typename?: 'Query', itemtypes: Array<{ __typename?: 'Itemtype', itemtypecode: string, itemtypename?: string | null, procurementtype?: string | null, stockfollowup?: boolean | null }> };

export type GetModuleListQueryVariables = Exact<{ [key: string]: never; }>;


export type GetModuleListQuery = { __typename?: 'Query', moduleLists: Array<{ __typename?: 'ModuleList', moduleName: string, moduleDesc?: string | null, createTime?: any | null, createUser?: string | null }> };

export type GetRoleQueryVariables = Exact<{
  prmSubscriptionId: Scalars['String'];
}>;


export type GetRoleQuery = { __typename?: 'Query', role: Array<{ __typename?: 'Role', roleCode: string, subscriptionsid: string, authObject?: string | null, createtime?: any | null, createuser?: string | null }> };

export type GetStakeholderTypesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetStakeholderTypesQuery = { __typename?: 'Query', stakeholdertypes: Array<{ __typename?: 'Stakeholdertype', stakeholdertypename?: string | null }> };

export type GetStakeholdersQueryVariables = Exact<{
  prmStakeholderType?: InputMaybe<Scalars['String']>;
}>;


export type GetStakeholdersQuery = { __typename?: 'Query', stakeholders: Array<{ __typename?: 'Stakeholder', stakeholderid: any, iname?: string | null, isurname?: string | null, stakeholdercode?: string | null, stakeholdername?: string | null, stakeholdertype?: string | null, paymentterm?: string | null, taxno?: string | null, risklimit?: any | null, risknotes?: string | null, tradetype?: string | null, identityno?: string | null, taxoffice?: string | null, shadbookid?: any | null, currency?: string | null, shadbook?: { __typename?: 'Stakeholderadbook', shadbookid: any, fax?: string | null, website?: string | null, email?: string | null, shadname?: string | null, shadtype?: string | null, countrykey?: string | null, city?: string | null, county?: string | null, postcode?: string | null, address?: string | null, phone?: string | null } | null, stakeholdercontacts?: Array<{ __typename?: 'Stakeholdercontact', contactid: any, stakeholderid?: any | null, contactname?: string | null, contactemail?: string | null, contactmobile?: string | null, contactphone?: string | null, contactrole?: string | null, contactnotes?: string | null }> | null }> };

export type GetStakeholdersForAccountStatementQueryVariables = Exact<{
  stakeholderCode: FilterTypeInputOfStringInput;
  stakeholderName: FilterTypeInputOfStringInput;
  stakeholderType: Scalars['String'];
}>;


export type GetStakeholdersForAccountStatementQuery = { __typename?: 'Query', stakeholdersForAccountStatement: Array<{ __typename?: 'Stakeholder', stakeholderid: any, iname?: string | null, isurname?: string | null, stakeholdercode?: string | null, stakeholdername?: string | null, stakeholdertype?: string | null, paymentterm?: string | null, taxno?: string | null, risklimit?: any | null, risknotes?: string | null, tradetype?: string | null, identityno?: string | null, currency?: string | null, shadbook?: { __typename?: 'Stakeholderadbook', shadbookid: any, fax?: string | null, website?: string | null, email?: string | null, shadname?: string | null, shadtype?: string | null, countrykey?: string | null, city?: string | null, county?: string | null, postcode?: string | null, address?: string | null, phone?: string | null } | null, stakeholdercontacts?: Array<{ __typename?: 'Stakeholdercontact', contactid: any, contactname?: string | null, contactemail?: string | null, contactmobile?: string | null, contactphone?: string | null, contactrole?: string | null, contactnotes?: string | null }> | null }> };

export type GetStockTransferHsQueryVariables = Exact<{
  prmCompanyName: Scalars['String'];
  prmStartDate?: InputMaybe<Scalars['DateTime']>;
  prmEndDate?: InputMaybe<Scalars['DateTime']>;
  prmSubscriptionIdR: Scalars['String'];
  prmSubscriptionIdS: Scalars['String'];
}>;


export type GetStockTransferHsQuery = { __typename?: 'Query', stocktransferhs: Array<{ __typename?: 'Stocktransferh', transferid: any, subscriptionsidS?: string | null, subscriptionsidR?: string | null, sendtime?: any | null, emailS?: string | null, tstat?: string | null, accepttime?: any | null, emailR?: string | null, explanationS?: string | null, explanationR?: string | null, subscription?: { __typename?: 'Subs', companyName?: string | null } | null, stocktransferis: Array<{ __typename?: 'Stocktransferi', transferid: any, seqno: number, itemcode?: string | null, serialno?: string | null, batchno?: string | null, transqty?: any | null, unit?: string | null }> }> };

export type GetStocksQueryVariables = Exact<{
  itemCode: FilterTypeInputOfStringInput;
  itemName: FilterTypeInputOfStringInput;
  serialNo: FilterTypeInputOfStringInput;
}>;


export type GetStocksQuery = { __typename?: 'Query', stocks: Array<{ __typename?: 'Stock', itemcode: string, serialno: string, batchno: string, availableqty?: number | null, variantid: any, physicalqty?: number | null, entrydate?: any | null, itemcodeNavigation?: { __typename?: 'Itemmaster', itemname?: string | null, unitsale?: string | null, baseunit?: string | null } | null, variant?: { __typename?: 'Itemvariant', variantname?: string | null } | null }> };

export type GetSubscriptionUsersQueryVariables = Exact<{
  prmSubsId: Scalars['String'];
}>;


export type GetSubscriptionUsersQuery = { __typename?: 'Query', subscriptionUsers: Array<{ __typename?: 'SubscriptionUser', subscriptionId: string, email: string, userDesc?: string | null, langType?: string | null, ustat?: string | null, validTo?: any | null, validFrom?: any | null, createTime?: any | null, createUser?: string | null, changeTime?: any | null, changeUser?: string | null, userroles: Array<{ __typename?: 'Userrole', email: string, subscriptionid: string, roleCode: string }> }> };

export type GetSubscriptionQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSubscriptionQuery = { __typename?: 'Query', subscription: Array<{ __typename?: 'Subscription', subscriptionsId: string, companyName?: string | null }> };

export type GetTaxesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTaxesQuery = { __typename?: 'Query', taxes: Array<{ __typename?: 'Taxis', taxcode: string, taxdesc?: string | null, taxrate?: any | null, taxtype?: string | null, taxkey?: string | null }> };

export type GetTranshistsQueryVariables = Exact<{
  batchNo: FilterTypeInputOfStringInput;
  itemCode: FilterTypeInputOfStringInput;
  matDocNo: FilterTypeInputOfStringInput;
  serialNo: FilterTypeInputOfStringInput;
  stakeholderName: FilterTypeInputOfStringInput;
  transCode: Scalars['String'];
}>;


export type GetTranshistsQuery = { __typename?: 'Query', transhists: Array<{ __typename?: 'Transhist', matdocno: string, matdocseq: number, stakeholderid?: any | null, itemcode?: string | null, serialno?: string | null, batchno?: string | null, transqty?: number | null, variantid?: any | null, storagelocationid?: number | null, storagebinid?: any | null, plantid?: number | null, newstoragelocationid?: number | null, newstoragebinid?: any | null, newplantid?: number | null, physicalqty?: number | null, availableqty?: number | null, matdocyear: number, reservedqty?: number | null, onqualityqty?: number | null, blockedqty?: number | null, username?: string | null, transtime?: any | null, transcode?: string | null, referencetype?: string | null, referenceid?: any | null, entrydate?: any | null, ctTransCode?: { __typename?: 'CtTransCode', transCode: string, transDesc?: string | null } | null, stakeholder?: { __typename?: 'Stakeholder', stakeholdername?: string | null } | null }> };

export type GetUnitsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUnitsQuery = { __typename?: 'Query', units: Array<{ __typename?: 'Unit', unitcode: string, unitname?: string | null }> };


export const AcAccountdocumenthMutateDocument = gql`
    mutation AcAccountdocumenthMutate($addOrUpdate: AddOrUpdateEnum!, $prmAcAccountdocumenth: AcAccountdocumenthInput!) {
  addOrUpdateAcAccountdocumenth(
    addOrUpdate: $addOrUpdate
    prmAcAccountdocumenth: $prmAcAccountdocumenth
  ) {
    resultType
    messageText
    data {
      accdocno
      accountcode
      invoiceno
    }
  }
}
    `;
export type AcAccountdocumenthMutateMutationFn = Apollo.MutationFunction<AcAccountdocumenthMutateMutation, AcAccountdocumenthMutateMutationVariables>;

/**
 * __useAcAccountdocumenthMutateMutation__
 *
 * To run a mutation, you first call `useAcAccountdocumenthMutateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAcAccountdocumenthMutateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [acAccountdocumenthMutateMutation, { data, loading, error }] = useAcAccountdocumenthMutateMutation({
 *   variables: {
 *      addOrUpdate: // value for 'addOrUpdate'
 *      prmAcAccountdocumenth: // value for 'prmAcAccountdocumenth'
 *   },
 * });
 */
export function useAcAccountdocumenthMutateMutation(baseOptions?: Apollo.MutationHookOptions<AcAccountdocumenthMutateMutation, AcAccountdocumenthMutateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AcAccountdocumenthMutateMutation, AcAccountdocumenthMutateMutationVariables>(AcAccountdocumenthMutateDocument, options);
      }
export type AcAccountdocumenthMutateMutationHookResult = ReturnType<typeof useAcAccountdocumenthMutateMutation>;
export type AcAccountdocumenthMutateMutationResult = Apollo.MutationResult<AcAccountdocumenthMutateMutation>;
export type AcAccountdocumenthMutateMutationOptions = Apollo.BaseMutationOptions<AcAccountdocumenthMutateMutation, AcAccountdocumenthMutateMutationVariables>;
export const AddOrUpdatePaymentTermsDocument = gql`
    mutation AddOrUpdatePaymentTerms($addOrUpdate: AddOrUpdateEnum!, $AcPaymenttermInput: AcPaymenttermInput!) {
  addOrUpdatePaymentTerm(
    addOrUpdate: $addOrUpdate
    prmAcPaymentTerm: $AcPaymenttermInput
  ) {
    resultType
    messageText
  }
}
    `;
export type AddOrUpdatePaymentTermsMutationFn = Apollo.MutationFunction<AddOrUpdatePaymentTermsMutation, AddOrUpdatePaymentTermsMutationVariables>;

/**
 * __useAddOrUpdatePaymentTermsMutation__
 *
 * To run a mutation, you first call `useAddOrUpdatePaymentTermsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddOrUpdatePaymentTermsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addOrUpdatePaymentTermsMutation, { data, loading, error }] = useAddOrUpdatePaymentTermsMutation({
 *   variables: {
 *      addOrUpdate: // value for 'addOrUpdate'
 *      AcPaymenttermInput: // value for 'AcPaymenttermInput'
 *   },
 * });
 */
export function useAddOrUpdatePaymentTermsMutation(baseOptions?: Apollo.MutationHookOptions<AddOrUpdatePaymentTermsMutation, AddOrUpdatePaymentTermsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddOrUpdatePaymentTermsMutation, AddOrUpdatePaymentTermsMutationVariables>(AddOrUpdatePaymentTermsDocument, options);
      }
export type AddOrUpdatePaymentTermsMutationHookResult = ReturnType<typeof useAddOrUpdatePaymentTermsMutation>;
export type AddOrUpdatePaymentTermsMutationResult = Apollo.MutationResult<AddOrUpdatePaymentTermsMutation>;
export type AddOrUpdatePaymentTermsMutationOptions = Apollo.BaseMutationOptions<AddOrUpdatePaymentTermsMutation, AddOrUpdatePaymentTermsMutationVariables>;
export const AddOrUpdateAcTillDocument = gql`
    mutation AddOrUpdateAcTill($addOrUpdate: AddOrUpdateEnum!, $prmAcTill: AcTillInput!) {
  addOrUpdateTill(addOrUpdate: $addOrUpdate, prmAcTill: $prmAcTill) {
    resultType
    messageText
  }
}
    `;
export type AddOrUpdateAcTillMutationFn = Apollo.MutationFunction<AddOrUpdateAcTillMutation, AddOrUpdateAcTillMutationVariables>;

/**
 * __useAddOrUpdateAcTillMutation__
 *
 * To run a mutation, you first call `useAddOrUpdateAcTillMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddOrUpdateAcTillMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addOrUpdateAcTillMutation, { data, loading, error }] = useAddOrUpdateAcTillMutation({
 *   variables: {
 *      addOrUpdate: // value for 'addOrUpdate'
 *      prmAcTill: // value for 'prmAcTill'
 *   },
 * });
 */
export function useAddOrUpdateAcTillMutation(baseOptions?: Apollo.MutationHookOptions<AddOrUpdateAcTillMutation, AddOrUpdateAcTillMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddOrUpdateAcTillMutation, AddOrUpdateAcTillMutationVariables>(AddOrUpdateAcTillDocument, options);
      }
export type AddOrUpdateAcTillMutationHookResult = ReturnType<typeof useAddOrUpdateAcTillMutation>;
export type AddOrUpdateAcTillMutationResult = Apollo.MutationResult<AddOrUpdateAcTillMutation>;
export type AddOrUpdateAcTillMutationOptions = Apollo.BaseMutationOptions<AddOrUpdateAcTillMutation, AddOrUpdateAcTillMutationVariables>;
export const AddOrUpdateCompanyDocument = gql`
    mutation AddOrUpdateCompany($addOrUpdate: AddOrUpdateEnum!, $prmCompany: CompanyInput!) {
  addOrUpdateCompany(addOrUpdate: $addOrUpdate, prmCompany: $prmCompany) {
    resultType
    messageText
  }
}
    `;
export type AddOrUpdateCompanyMutationFn = Apollo.MutationFunction<AddOrUpdateCompanyMutation, AddOrUpdateCompanyMutationVariables>;

/**
 * __useAddOrUpdateCompanyMutation__
 *
 * To run a mutation, you first call `useAddOrUpdateCompanyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddOrUpdateCompanyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addOrUpdateCompanyMutation, { data, loading, error }] = useAddOrUpdateCompanyMutation({
 *   variables: {
 *      addOrUpdate: // value for 'addOrUpdate'
 *      prmCompany: // value for 'prmCompany'
 *   },
 * });
 */
export function useAddOrUpdateCompanyMutation(baseOptions?: Apollo.MutationHookOptions<AddOrUpdateCompanyMutation, AddOrUpdateCompanyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddOrUpdateCompanyMutation, AddOrUpdateCompanyMutationVariables>(AddOrUpdateCompanyDocument, options);
      }
export type AddOrUpdateCompanyMutationHookResult = ReturnType<typeof useAddOrUpdateCompanyMutation>;
export type AddOrUpdateCompanyMutationResult = Apollo.MutationResult<AddOrUpdateCompanyMutation>;
export type AddOrUpdateCompanyMutationOptions = Apollo.BaseMutationOptions<AddOrUpdateCompanyMutation, AddOrUpdateCompanyMutationVariables>;
export const AddOrUpdateExpenseCategoryDocument = gql`
    mutation AddOrUpdateExpenseCategory($addOrUpdate: AddOrUpdateEnum!, $prmExpenseCategory: ExpensecategoryInput!) {
  addOrUpdateExpenseCategory(
    addOrUpdate: $addOrUpdate
    prmExpenseCategory: $prmExpenseCategory
  ) {
    resultType
    messageText
    data {
      expensecategoryid
      expensecategorydesc
    }
  }
}
    `;
export type AddOrUpdateExpenseCategoryMutationFn = Apollo.MutationFunction<AddOrUpdateExpenseCategoryMutation, AddOrUpdateExpenseCategoryMutationVariables>;

/**
 * __useAddOrUpdateExpenseCategoryMutation__
 *
 * To run a mutation, you first call `useAddOrUpdateExpenseCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddOrUpdateExpenseCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addOrUpdateExpenseCategoryMutation, { data, loading, error }] = useAddOrUpdateExpenseCategoryMutation({
 *   variables: {
 *      addOrUpdate: // value for 'addOrUpdate'
 *      prmExpenseCategory: // value for 'prmExpenseCategory'
 *   },
 * });
 */
export function useAddOrUpdateExpenseCategoryMutation(baseOptions?: Apollo.MutationHookOptions<AddOrUpdateExpenseCategoryMutation, AddOrUpdateExpenseCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddOrUpdateExpenseCategoryMutation, AddOrUpdateExpenseCategoryMutationVariables>(AddOrUpdateExpenseCategoryDocument, options);
      }
export type AddOrUpdateExpenseCategoryMutationHookResult = ReturnType<typeof useAddOrUpdateExpenseCategoryMutation>;
export type AddOrUpdateExpenseCategoryMutationResult = Apollo.MutationResult<AddOrUpdateExpenseCategoryMutation>;
export type AddOrUpdateExpenseCategoryMutationOptions = Apollo.BaseMutationOptions<AddOrUpdateExpenseCategoryMutation, AddOrUpdateExpenseCategoryMutationVariables>;
export const AddOrUpdateStakeholderDocument = gql`
    mutation AddOrUpdateStakeholder($addOrUpdate: AddOrUpdateEnum!, $prmStakeholder: StakeholderInput!) {
  addOrUpdateStakeholder(
    addOrUpdate: $addOrUpdate
    prmStakeholder: $prmStakeholder
  ) {
    resultType
    messageText
    data {
      stakeholderid
      iname
      isurname
      stakeholdercode
      stakeholdername
      stakeholdertype
      paymentterm
      taxno
      risklimit
      risknotes
      tradetype
      identityno
      currency
      shadbook {
        shadbookid
        fax
        website
        email
        shadname
        shadtype
        countrykey
        city
        county
        postcode
        address
        phone
      }
      stakeholdercontacts {
        contactname
        contactemail
        contactmobile
        contactphone
        contactrole
        contactnotes
      }
    }
  }
}
    `;
export type AddOrUpdateStakeholderMutationFn = Apollo.MutationFunction<AddOrUpdateStakeholderMutation, AddOrUpdateStakeholderMutationVariables>;

/**
 * __useAddOrUpdateStakeholderMutation__
 *
 * To run a mutation, you first call `useAddOrUpdateStakeholderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddOrUpdateStakeholderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addOrUpdateStakeholderMutation, { data, loading, error }] = useAddOrUpdateStakeholderMutation({
 *   variables: {
 *      addOrUpdate: // value for 'addOrUpdate'
 *      prmStakeholder: // value for 'prmStakeholder'
 *   },
 * });
 */
export function useAddOrUpdateStakeholderMutation(baseOptions?: Apollo.MutationHookOptions<AddOrUpdateStakeholderMutation, AddOrUpdateStakeholderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddOrUpdateStakeholderMutation, AddOrUpdateStakeholderMutationVariables>(AddOrUpdateStakeholderDocument, options);
      }
export type AddOrUpdateStakeholderMutationHookResult = ReturnType<typeof useAddOrUpdateStakeholderMutation>;
export type AddOrUpdateStakeholderMutationResult = Apollo.MutationResult<AddOrUpdateStakeholderMutation>;
export type AddOrUpdateStakeholderMutationOptions = Apollo.BaseMutationOptions<AddOrUpdateStakeholderMutation, AddOrUpdateStakeholderMutationVariables>;
export const AddOrUpdateSubscriptionUsersDocument = gql`
    mutation AddOrUpdateSubscriptionUsers($addOrUpdate: AddOrUpdateEnum!, $prmSubscriptionUser: SubscriptionUserInput!) {
  addOrUpdateSubscriptionUser(
    addOrUpdate: $addOrUpdate
    prmSubscriptionUser: $prmSubscriptionUser
  ) {
    resultType
    messageText
    data {
      upass
    }
  }
}
    `;
export type AddOrUpdateSubscriptionUsersMutationFn = Apollo.MutationFunction<AddOrUpdateSubscriptionUsersMutation, AddOrUpdateSubscriptionUsersMutationVariables>;

/**
 * __useAddOrUpdateSubscriptionUsersMutation__
 *
 * To run a mutation, you first call `useAddOrUpdateSubscriptionUsersMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddOrUpdateSubscriptionUsersMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addOrUpdateSubscriptionUsersMutation, { data, loading, error }] = useAddOrUpdateSubscriptionUsersMutation({
 *   variables: {
 *      addOrUpdate: // value for 'addOrUpdate'
 *      prmSubscriptionUser: // value for 'prmSubscriptionUser'
 *   },
 * });
 */
export function useAddOrUpdateSubscriptionUsersMutation(baseOptions?: Apollo.MutationHookOptions<AddOrUpdateSubscriptionUsersMutation, AddOrUpdateSubscriptionUsersMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddOrUpdateSubscriptionUsersMutation, AddOrUpdateSubscriptionUsersMutationVariables>(AddOrUpdateSubscriptionUsersDocument, options);
      }
export type AddOrUpdateSubscriptionUsersMutationHookResult = ReturnType<typeof useAddOrUpdateSubscriptionUsersMutation>;
export type AddOrUpdateSubscriptionUsersMutationResult = Apollo.MutationResult<AddOrUpdateSubscriptionUsersMutation>;
export type AddOrUpdateSubscriptionUsersMutationOptions = Apollo.BaseMutationOptions<AddOrUpdateSubscriptionUsersMutation, AddOrUpdateSubscriptionUsersMutationVariables>;
export const AddOrUpdateTranshistDocument = gql`
    mutation AddOrUpdateTranshist($addOrUpdate: AddOrUpdateEnum!, $prmTranshist: TranshistInput!) {
  addOrUpdateTranshist(addOrUpdate: $addOrUpdate, prmTranshist: $prmTranshist) {
    resultType
    messageText
  }
}
    `;
export type AddOrUpdateTranshistMutationFn = Apollo.MutationFunction<AddOrUpdateTranshistMutation, AddOrUpdateTranshistMutationVariables>;

/**
 * __useAddOrUpdateTranshistMutation__
 *
 * To run a mutation, you first call `useAddOrUpdateTranshistMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddOrUpdateTranshistMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addOrUpdateTranshistMutation, { data, loading, error }] = useAddOrUpdateTranshistMutation({
 *   variables: {
 *      addOrUpdate: // value for 'addOrUpdate'
 *      prmTranshist: // value for 'prmTranshist'
 *   },
 * });
 */
export function useAddOrUpdateTranshistMutation(baseOptions?: Apollo.MutationHookOptions<AddOrUpdateTranshistMutation, AddOrUpdateTranshistMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddOrUpdateTranshistMutation, AddOrUpdateTranshistMutationVariables>(AddOrUpdateTranshistDocument, options);
      }
export type AddOrUpdateTranshistMutationHookResult = ReturnType<typeof useAddOrUpdateTranshistMutation>;
export type AddOrUpdateTranshistMutationResult = Apollo.MutationResult<AddOrUpdateTranshistMutation>;
export type AddOrUpdateTranshistMutationOptions = Apollo.BaseMutationOptions<AddOrUpdateTranshistMutation, AddOrUpdateTranshistMutationVariables>;
export const AddSubscriptionUserDocument = gql`
    mutation AddSubscriptionUser($prmSubscriptionUser: SubscriptionUserInput!) {
  addSubscriptionUser(prmSubscriptionUser: $prmSubscriptionUser) {
    data {
      subscriptionId
      perNo
    }
  }
}
    `;
export type AddSubscriptionUserMutationFn = Apollo.MutationFunction<AddSubscriptionUserMutation, AddSubscriptionUserMutationVariables>;

/**
 * __useAddSubscriptionUserMutation__
 *
 * To run a mutation, you first call `useAddSubscriptionUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddSubscriptionUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addSubscriptionUserMutation, { data, loading, error }] = useAddSubscriptionUserMutation({
 *   variables: {
 *      prmSubscriptionUser: // value for 'prmSubscriptionUser'
 *   },
 * });
 */
export function useAddSubscriptionUserMutation(baseOptions?: Apollo.MutationHookOptions<AddSubscriptionUserMutation, AddSubscriptionUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddSubscriptionUserMutation, AddSubscriptionUserMutationVariables>(AddSubscriptionUserDocument, options);
      }
export type AddSubscriptionUserMutationHookResult = ReturnType<typeof useAddSubscriptionUserMutation>;
export type AddSubscriptionUserMutationResult = Apollo.MutationResult<AddSubscriptionUserMutation>;
export type AddSubscriptionUserMutationOptions = Apollo.BaseMutationOptions<AddSubscriptionUserMutation, AddSubscriptionUserMutationVariables>;
export const AddOrUpdateAcBankAccountDocument = gql`
    mutation AddOrUpdateAcBankAccount($addOrUpdate: AddOrUpdateEnum!, $prmAcBankAccount: AcBankaccountInput!) {
  addOrUpdateAcBankAccount(
    addOrUpdate: $addOrUpdate
    prmAcBankAccount: $prmAcBankAccount
  ) {
    resultType
    messageText
  }
}
    `;
export type AddOrUpdateAcBankAccountMutationFn = Apollo.MutationFunction<AddOrUpdateAcBankAccountMutation, AddOrUpdateAcBankAccountMutationVariables>;

/**
 * __useAddOrUpdateAcBankAccountMutation__
 *
 * To run a mutation, you first call `useAddOrUpdateAcBankAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddOrUpdateAcBankAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addOrUpdateAcBankAccountMutation, { data, loading, error }] = useAddOrUpdateAcBankAccountMutation({
 *   variables: {
 *      addOrUpdate: // value for 'addOrUpdate'
 *      prmAcBankAccount: // value for 'prmAcBankAccount'
 *   },
 * });
 */
export function useAddOrUpdateAcBankAccountMutation(baseOptions?: Apollo.MutationHookOptions<AddOrUpdateAcBankAccountMutation, AddOrUpdateAcBankAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddOrUpdateAcBankAccountMutation, AddOrUpdateAcBankAccountMutationVariables>(AddOrUpdateAcBankAccountDocument, options);
      }
export type AddOrUpdateAcBankAccountMutationHookResult = ReturnType<typeof useAddOrUpdateAcBankAccountMutation>;
export type AddOrUpdateAcBankAccountMutationResult = Apollo.MutationResult<AddOrUpdateAcBankAccountMutation>;
export type AddOrUpdateAcBankAccountMutationOptions = Apollo.BaseMutationOptions<AddOrUpdateAcBankAccountMutation, AddOrUpdateAcBankAccountMutationVariables>;
export const DeleteAcAccountDocumenthDocument = gql`
    mutation DeleteAcAccountDocumenth($prmaccdocno: String!, $prmaccdocyear: Int!, $prmcompanyId: Long!) {
  deleteAcAccountDocumenth(
    prmaccdocno: $prmaccdocno
    prmaccdocyear: $prmaccdocyear
    prmcompanyId: $prmcompanyId
  ) {
    resultType
    messageText
  }
}
    `;
export type DeleteAcAccountDocumenthMutationFn = Apollo.MutationFunction<DeleteAcAccountDocumenthMutation, DeleteAcAccountDocumenthMutationVariables>;

/**
 * __useDeleteAcAccountDocumenthMutation__
 *
 * To run a mutation, you first call `useDeleteAcAccountDocumenthMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAcAccountDocumenthMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAcAccountDocumenthMutation, { data, loading, error }] = useDeleteAcAccountDocumenthMutation({
 *   variables: {
 *      prmaccdocno: // value for 'prmaccdocno'
 *      prmaccdocyear: // value for 'prmaccdocyear'
 *      prmcompanyId: // value for 'prmcompanyId'
 *   },
 * });
 */
export function useDeleteAcAccountDocumenthMutation(baseOptions?: Apollo.MutationHookOptions<DeleteAcAccountDocumenthMutation, DeleteAcAccountDocumenthMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteAcAccountDocumenthMutation, DeleteAcAccountDocumenthMutationVariables>(DeleteAcAccountDocumenthDocument, options);
      }
export type DeleteAcAccountDocumenthMutationHookResult = ReturnType<typeof useDeleteAcAccountDocumenthMutation>;
export type DeleteAcAccountDocumenthMutationResult = Apollo.MutationResult<DeleteAcAccountDocumenthMutation>;
export type DeleteAcAccountDocumenthMutationOptions = Apollo.BaseMutationOptions<DeleteAcAccountDocumenthMutation, DeleteAcAccountDocumenthMutationVariables>;
export const DeleteAcBankAccountDocument = gql`
    mutation DeleteAcBankAccount($prmAcBankAccountCode: String!, $prmPlantId: Int!) {
  deleteAcBankAccount(
    prmBankAccountCode: $prmAcBankAccountCode
    prmPlantId: $prmPlantId
  ) {
    resultType
    messageText
  }
}
    `;
export type DeleteAcBankAccountMutationFn = Apollo.MutationFunction<DeleteAcBankAccountMutation, DeleteAcBankAccountMutationVariables>;

/**
 * __useDeleteAcBankAccountMutation__
 *
 * To run a mutation, you first call `useDeleteAcBankAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAcBankAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAcBankAccountMutation, { data, loading, error }] = useDeleteAcBankAccountMutation({
 *   variables: {
 *      prmAcBankAccountCode: // value for 'prmAcBankAccountCode'
 *      prmPlantId: // value for 'prmPlantId'
 *   },
 * });
 */
export function useDeleteAcBankAccountMutation(baseOptions?: Apollo.MutationHookOptions<DeleteAcBankAccountMutation, DeleteAcBankAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteAcBankAccountMutation, DeleteAcBankAccountMutationVariables>(DeleteAcBankAccountDocument, options);
      }
export type DeleteAcBankAccountMutationHookResult = ReturnType<typeof useDeleteAcBankAccountMutation>;
export type DeleteAcBankAccountMutationResult = Apollo.MutationResult<DeleteAcBankAccountMutation>;
export type DeleteAcBankAccountMutationOptions = Apollo.BaseMutationOptions<DeleteAcBankAccountMutation, DeleteAcBankAccountMutationVariables>;
export const DeleteAcPaymentTermDocument = gql`
    mutation DeleteAcPaymentTerm($prmPaymentTerm: String!) {
  deleteAcPaymentTerm(prmPaymentTerm: $prmPaymentTerm) {
    resultType
    messageText
  }
}
    `;
export type DeleteAcPaymentTermMutationFn = Apollo.MutationFunction<DeleteAcPaymentTermMutation, DeleteAcPaymentTermMutationVariables>;

/**
 * __useDeleteAcPaymentTermMutation__
 *
 * To run a mutation, you first call `useDeleteAcPaymentTermMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAcPaymentTermMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAcPaymentTermMutation, { data, loading, error }] = useDeleteAcPaymentTermMutation({
 *   variables: {
 *      prmPaymentTerm: // value for 'prmPaymentTerm'
 *   },
 * });
 */
export function useDeleteAcPaymentTermMutation(baseOptions?: Apollo.MutationHookOptions<DeleteAcPaymentTermMutation, DeleteAcPaymentTermMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteAcPaymentTermMutation, DeleteAcPaymentTermMutationVariables>(DeleteAcPaymentTermDocument, options);
      }
export type DeleteAcPaymentTermMutationHookResult = ReturnType<typeof useDeleteAcPaymentTermMutation>;
export type DeleteAcPaymentTermMutationResult = Apollo.MutationResult<DeleteAcPaymentTermMutation>;
export type DeleteAcPaymentTermMutationOptions = Apollo.BaseMutationOptions<DeleteAcPaymentTermMutation, DeleteAcPaymentTermMutationVariables>;
export const DeleteAcTillsDocument = gql`
    mutation DeleteAcTills($prmAcTillCode: String!, $prmPlantId: Int!) {
  deleteAcTills(prmTillCode: $prmAcTillCode, prmPlantId: $prmPlantId) {
    resultType
    messageText
  }
}
    `;
export type DeleteAcTillsMutationFn = Apollo.MutationFunction<DeleteAcTillsMutation, DeleteAcTillsMutationVariables>;

/**
 * __useDeleteAcTillsMutation__
 *
 * To run a mutation, you first call `useDeleteAcTillsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAcTillsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAcTillsMutation, { data, loading, error }] = useDeleteAcTillsMutation({
 *   variables: {
 *      prmAcTillCode: // value for 'prmAcTillCode'
 *      prmPlantId: // value for 'prmPlantId'
 *   },
 * });
 */
export function useDeleteAcTillsMutation(baseOptions?: Apollo.MutationHookOptions<DeleteAcTillsMutation, DeleteAcTillsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteAcTillsMutation, DeleteAcTillsMutationVariables>(DeleteAcTillsDocument, options);
      }
export type DeleteAcTillsMutationHookResult = ReturnType<typeof useDeleteAcTillsMutation>;
export type DeleteAcTillsMutationResult = Apollo.MutationResult<DeleteAcTillsMutation>;
export type DeleteAcTillsMutationOptions = Apollo.BaseMutationOptions<DeleteAcTillsMutation, DeleteAcTillsMutationVariables>;
export const DeleteCompanyDocument = gql`
    mutation DeleteCompany($prmCompanyId: Long!) {
  deleteCompany(prmCompanyId: $prmCompanyId) {
    resultType
    messageText
  }
}
    `;
export type DeleteCompanyMutationFn = Apollo.MutationFunction<DeleteCompanyMutation, DeleteCompanyMutationVariables>;

/**
 * __useDeleteCompanyMutation__
 *
 * To run a mutation, you first call `useDeleteCompanyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCompanyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCompanyMutation, { data, loading, error }] = useDeleteCompanyMutation({
 *   variables: {
 *      prmCompanyId: // value for 'prmCompanyId'
 *   },
 * });
 */
export function useDeleteCompanyMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCompanyMutation, DeleteCompanyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCompanyMutation, DeleteCompanyMutationVariables>(DeleteCompanyDocument, options);
      }
export type DeleteCompanyMutationHookResult = ReturnType<typeof useDeleteCompanyMutation>;
export type DeleteCompanyMutationResult = Apollo.MutationResult<DeleteCompanyMutation>;
export type DeleteCompanyMutationOptions = Apollo.BaseMutationOptions<DeleteCompanyMutation, DeleteCompanyMutationVariables>;
export const DeleteExpenseDocument = gql`
    mutation DeleteExpense($prmExpenseCode: String!) {
  deleteExpense(prmExpenseCode: $prmExpenseCode) {
    resultType
    messageText
  }
}
    `;
export type DeleteExpenseMutationFn = Apollo.MutationFunction<DeleteExpenseMutation, DeleteExpenseMutationVariables>;

/**
 * __useDeleteExpenseMutation__
 *
 * To run a mutation, you first call `useDeleteExpenseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteExpenseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteExpenseMutation, { data, loading, error }] = useDeleteExpenseMutation({
 *   variables: {
 *      prmExpenseCode: // value for 'prmExpenseCode'
 *   },
 * });
 */
export function useDeleteExpenseMutation(baseOptions?: Apollo.MutationHookOptions<DeleteExpenseMutation, DeleteExpenseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteExpenseMutation, DeleteExpenseMutationVariables>(DeleteExpenseDocument, options);
      }
export type DeleteExpenseMutationHookResult = ReturnType<typeof useDeleteExpenseMutation>;
export type DeleteExpenseMutationResult = Apollo.MutationResult<DeleteExpenseMutation>;
export type DeleteExpenseMutationOptions = Apollo.BaseMutationOptions<DeleteExpenseMutation, DeleteExpenseMutationVariables>;
export const DeleteExpenseCategoryDocument = gql`
    mutation DeleteExpenseCategory($prmExpenseCategoryId: Long!) {
  deleteExpenseCategory(prmExpenseCategoryId: $prmExpenseCategoryId) {
    resultType
    messageText
  }
}
    `;
export type DeleteExpenseCategoryMutationFn = Apollo.MutationFunction<DeleteExpenseCategoryMutation, DeleteExpenseCategoryMutationVariables>;

/**
 * __useDeleteExpenseCategoryMutation__
 *
 * To run a mutation, you first call `useDeleteExpenseCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteExpenseCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteExpenseCategoryMutation, { data, loading, error }] = useDeleteExpenseCategoryMutation({
 *   variables: {
 *      prmExpenseCategoryId: // value for 'prmExpenseCategoryId'
 *   },
 * });
 */
export function useDeleteExpenseCategoryMutation(baseOptions?: Apollo.MutationHookOptions<DeleteExpenseCategoryMutation, DeleteExpenseCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteExpenseCategoryMutation, DeleteExpenseCategoryMutationVariables>(DeleteExpenseCategoryDocument, options);
      }
export type DeleteExpenseCategoryMutationHookResult = ReturnType<typeof useDeleteExpenseCategoryMutation>;
export type DeleteExpenseCategoryMutationResult = Apollo.MutationResult<DeleteExpenseCategoryMutation>;
export type DeleteExpenseCategoryMutationOptions = Apollo.BaseMutationOptions<DeleteExpenseCategoryMutation, DeleteExpenseCategoryMutationVariables>;
export const DeleteInvoicehDocument = gql`
    mutation DeleteInvoiceh($prmInvoiceNo: Long!) {
  deleteInvoiceh(prmInvoiceNo: $prmInvoiceNo) {
    resultType
    messageText
  }
}
    `;
export type DeleteInvoicehMutationFn = Apollo.MutationFunction<DeleteInvoicehMutation, DeleteInvoicehMutationVariables>;

/**
 * __useDeleteInvoicehMutation__
 *
 * To run a mutation, you first call `useDeleteInvoicehMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteInvoicehMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteInvoicehMutation, { data, loading, error }] = useDeleteInvoicehMutation({
 *   variables: {
 *      prmInvoiceNo: // value for 'prmInvoiceNo'
 *   },
 * });
 */
export function useDeleteInvoicehMutation(baseOptions?: Apollo.MutationHookOptions<DeleteInvoicehMutation, DeleteInvoicehMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteInvoicehMutation, DeleteInvoicehMutationVariables>(DeleteInvoicehDocument, options);
      }
export type DeleteInvoicehMutationHookResult = ReturnType<typeof useDeleteInvoicehMutation>;
export type DeleteInvoicehMutationResult = Apollo.MutationResult<DeleteInvoicehMutation>;
export type DeleteInvoicehMutationOptions = Apollo.BaseMutationOptions<DeleteInvoicehMutation, DeleteInvoicehMutationVariables>;
export const DeleteStakeholderDocument = gql`
    mutation DeleteStakeholder($prmStakeholderId: Long!) {
  deleteStakeholder(prmStakeholderId: $prmStakeholderId) {
    resultType
    messageText
  }
}
    `;
export type DeleteStakeholderMutationFn = Apollo.MutationFunction<DeleteStakeholderMutation, DeleteStakeholderMutationVariables>;

/**
 * __useDeleteStakeholderMutation__
 *
 * To run a mutation, you first call `useDeleteStakeholderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteStakeholderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteStakeholderMutation, { data, loading, error }] = useDeleteStakeholderMutation({
 *   variables: {
 *      prmStakeholderId: // value for 'prmStakeholderId'
 *   },
 * });
 */
export function useDeleteStakeholderMutation(baseOptions?: Apollo.MutationHookOptions<DeleteStakeholderMutation, DeleteStakeholderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteStakeholderMutation, DeleteStakeholderMutationVariables>(DeleteStakeholderDocument, options);
      }
export type DeleteStakeholderMutationHookResult = ReturnType<typeof useDeleteStakeholderMutation>;
export type DeleteStakeholderMutationResult = Apollo.MutationResult<DeleteStakeholderMutation>;
export type DeleteStakeholderMutationOptions = Apollo.BaseMutationOptions<DeleteStakeholderMutation, DeleteStakeholderMutationVariables>;
export const DeleteSubscriptionUsersDocument = gql`
    mutation DeleteSubscriptionUsers($prmEmail: String!, $prmSubscriptionId: String!) {
  deleteSubscriptionUsers(
    prmEmail: $prmEmail
    prmSubscriptionId: $prmSubscriptionId
  ) {
    resultType
    messageText
  }
}
    `;
export type DeleteSubscriptionUsersMutationFn = Apollo.MutationFunction<DeleteSubscriptionUsersMutation, DeleteSubscriptionUsersMutationVariables>;

/**
 * __useDeleteSubscriptionUsersMutation__
 *
 * To run a mutation, you first call `useDeleteSubscriptionUsersMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteSubscriptionUsersMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteSubscriptionUsersMutation, { data, loading, error }] = useDeleteSubscriptionUsersMutation({
 *   variables: {
 *      prmEmail: // value for 'prmEmail'
 *      prmSubscriptionId: // value for 'prmSubscriptionId'
 *   },
 * });
 */
export function useDeleteSubscriptionUsersMutation(baseOptions?: Apollo.MutationHookOptions<DeleteSubscriptionUsersMutation, DeleteSubscriptionUsersMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteSubscriptionUsersMutation, DeleteSubscriptionUsersMutationVariables>(DeleteSubscriptionUsersDocument, options);
      }
export type DeleteSubscriptionUsersMutationHookResult = ReturnType<typeof useDeleteSubscriptionUsersMutation>;
export type DeleteSubscriptionUsersMutationResult = Apollo.MutationResult<DeleteSubscriptionUsersMutation>;
export type DeleteSubscriptionUsersMutationOptions = Apollo.BaseMutationOptions<DeleteSubscriptionUsersMutation, DeleteSubscriptionUsersMutationVariables>;
export const AddOrUpdateExpensesDocument = gql`
    mutation AddOrUpdateExpenses($addOrUpdate: AddOrUpdateEnum!, $prmExpense: ExpenseInput!) {
  addOrUpdateExpense(addOrUpdate: $addOrUpdate, prmExpense: $prmExpense) {
    resultType
    messageText
  }
}
    `;
export type AddOrUpdateExpensesMutationFn = Apollo.MutationFunction<AddOrUpdateExpensesMutation, AddOrUpdateExpensesMutationVariables>;

/**
 * __useAddOrUpdateExpensesMutation__
 *
 * To run a mutation, you first call `useAddOrUpdateExpensesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddOrUpdateExpensesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addOrUpdateExpensesMutation, { data, loading, error }] = useAddOrUpdateExpensesMutation({
 *   variables: {
 *      addOrUpdate: // value for 'addOrUpdate'
 *      prmExpense: // value for 'prmExpense'
 *   },
 * });
 */
export function useAddOrUpdateExpensesMutation(baseOptions?: Apollo.MutationHookOptions<AddOrUpdateExpensesMutation, AddOrUpdateExpensesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddOrUpdateExpensesMutation, AddOrUpdateExpensesMutationVariables>(AddOrUpdateExpensesDocument, options);
      }
export type AddOrUpdateExpensesMutationHookResult = ReturnType<typeof useAddOrUpdateExpensesMutation>;
export type AddOrUpdateExpensesMutationResult = Apollo.MutationResult<AddOrUpdateExpensesMutation>;
export type AddOrUpdateExpensesMutationOptions = Apollo.BaseMutationOptions<AddOrUpdateExpensesMutation, AddOrUpdateExpensesMutationVariables>;
export const AddOrUpdateGoodsReceivinghMutateDocument = gql`
    mutation AddOrUpdateGoodsReceivinghMutate($addOrUpdate: AddOrUpdateEnum!, $prmGoodsReceivingh: GoodsreceivinghInput!) {
  addOrUpdateStockGoodsReceivingh(
    addOrUpdate: $addOrUpdate
    prmGoodsReceivingh: $prmGoodsReceivingh
  ) {
    resultType
    messageText
  }
}
    `;
export type AddOrUpdateGoodsReceivinghMutateMutationFn = Apollo.MutationFunction<AddOrUpdateGoodsReceivinghMutateMutation, AddOrUpdateGoodsReceivinghMutateMutationVariables>;

/**
 * __useAddOrUpdateGoodsReceivinghMutateMutation__
 *
 * To run a mutation, you first call `useAddOrUpdateGoodsReceivinghMutateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddOrUpdateGoodsReceivinghMutateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addOrUpdateGoodsReceivinghMutateMutation, { data, loading, error }] = useAddOrUpdateGoodsReceivinghMutateMutation({
 *   variables: {
 *      addOrUpdate: // value for 'addOrUpdate'
 *      prmGoodsReceivingh: // value for 'prmGoodsReceivingh'
 *   },
 * });
 */
export function useAddOrUpdateGoodsReceivinghMutateMutation(baseOptions?: Apollo.MutationHookOptions<AddOrUpdateGoodsReceivinghMutateMutation, AddOrUpdateGoodsReceivinghMutateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddOrUpdateGoodsReceivinghMutateMutation, AddOrUpdateGoodsReceivinghMutateMutationVariables>(AddOrUpdateGoodsReceivinghMutateDocument, options);
      }
export type AddOrUpdateGoodsReceivinghMutateMutationHookResult = ReturnType<typeof useAddOrUpdateGoodsReceivinghMutateMutation>;
export type AddOrUpdateGoodsReceivinghMutateMutationResult = Apollo.MutationResult<AddOrUpdateGoodsReceivinghMutateMutation>;
export type AddOrUpdateGoodsReceivinghMutateMutationOptions = Apollo.BaseMutationOptions<AddOrUpdateGoodsReceivinghMutateMutation, AddOrUpdateGoodsReceivinghMutateMutationVariables>;
export const AddOrUpdateInvoiceHDocument = gql`
    mutation AddOrUpdateInvoiceH($addOrUpdate: AddOrUpdateEnum!, $prmInvoiceH: InvoicehInput!, $prmInvoiceno: Long) {
  addOrUpdateInvoiceH(
    addOrUpdate: $addOrUpdate
    prmInvoiceH: $prmInvoiceH
    prmInvoiceno: $prmInvoiceno
  ) {
    resultType
    messageText
    data {
      invoiceno
    }
  }
}
    `;
export type AddOrUpdateInvoiceHMutationFn = Apollo.MutationFunction<AddOrUpdateInvoiceHMutation, AddOrUpdateInvoiceHMutationVariables>;

/**
 * __useAddOrUpdateInvoiceHMutation__
 *
 * To run a mutation, you first call `useAddOrUpdateInvoiceHMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddOrUpdateInvoiceHMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addOrUpdateInvoiceHMutation, { data, loading, error }] = useAddOrUpdateInvoiceHMutation({
 *   variables: {
 *      addOrUpdate: // value for 'addOrUpdate'
 *      prmInvoiceH: // value for 'prmInvoiceH'
 *      prmInvoiceno: // value for 'prmInvoiceno'
 *   },
 * });
 */
export function useAddOrUpdateInvoiceHMutation(baseOptions?: Apollo.MutationHookOptions<AddOrUpdateInvoiceHMutation, AddOrUpdateInvoiceHMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddOrUpdateInvoiceHMutation, AddOrUpdateInvoiceHMutationVariables>(AddOrUpdateInvoiceHDocument, options);
      }
export type AddOrUpdateInvoiceHMutationHookResult = ReturnType<typeof useAddOrUpdateInvoiceHMutation>;
export type AddOrUpdateInvoiceHMutationResult = Apollo.MutationResult<AddOrUpdateInvoiceHMutation>;
export type AddOrUpdateInvoiceHMutationOptions = Apollo.BaseMutationOptions<AddOrUpdateInvoiceHMutation, AddOrUpdateInvoiceHMutationVariables>;
export const AddOrUpdateItemMasterDocument = gql`
    mutation AddOrUpdateItemMaster($prmItemMaster: ItemmasterInput!, $addOrUpdate: AddOrUpdateEnum!) {
  addOrUpdateItemMaster(prmItemMaster: $prmItemMaster, addOrUpdate: $addOrUpdate) {
    resultType
    messageText
  }
}
    `;
export type AddOrUpdateItemMasterMutationFn = Apollo.MutationFunction<AddOrUpdateItemMasterMutation, AddOrUpdateItemMasterMutationVariables>;

/**
 * __useAddOrUpdateItemMasterMutation__
 *
 * To run a mutation, you first call `useAddOrUpdateItemMasterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddOrUpdateItemMasterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addOrUpdateItemMasterMutation, { data, loading, error }] = useAddOrUpdateItemMasterMutation({
 *   variables: {
 *      prmItemMaster: // value for 'prmItemMaster'
 *      addOrUpdate: // value for 'addOrUpdate'
 *   },
 * });
 */
export function useAddOrUpdateItemMasterMutation(baseOptions?: Apollo.MutationHookOptions<AddOrUpdateItemMasterMutation, AddOrUpdateItemMasterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddOrUpdateItemMasterMutation, AddOrUpdateItemMasterMutationVariables>(AddOrUpdateItemMasterDocument, options);
      }
export type AddOrUpdateItemMasterMutationHookResult = ReturnType<typeof useAddOrUpdateItemMasterMutation>;
export type AddOrUpdateItemMasterMutationResult = Apollo.MutationResult<AddOrUpdateItemMasterMutation>;
export type AddOrUpdateItemMasterMutationOptions = Apollo.BaseMutationOptions<AddOrUpdateItemMasterMutation, AddOrUpdateItemMasterMutationVariables>;
export const LoginDocument = gql`
    mutation Login($prmLoginInput: LoginInputTypeInput!) {
  login(loginInput: $prmLoginInput) {
    resultType
    messageText
    data {
      subscriptionId
      perNo
      userDesc
      userroles {
        email
        roleCode
        subscriptionid
      }
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      prmLoginInput: // value for 'prmLoginInput'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const AddOrUpdateStockBlockRequesthDocument = gql`
    mutation AddOrUpdateStockBlockRequesth($addOrUpdate: AddOrUpdateEnum!, $prmStockBlockRequesth: StockblockrequesthInput!) {
  addOrUpdateStockBlockRequesth(
    addOrUpdate: $addOrUpdate
    prmStockBlockRequesth: $prmStockBlockRequesth
  ) {
    resultType
    messageText
  }
}
    `;
export type AddOrUpdateStockBlockRequesthMutationFn = Apollo.MutationFunction<AddOrUpdateStockBlockRequesthMutation, AddOrUpdateStockBlockRequesthMutationVariables>;

/**
 * __useAddOrUpdateStockBlockRequesthMutation__
 *
 * To run a mutation, you first call `useAddOrUpdateStockBlockRequesthMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddOrUpdateStockBlockRequesthMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addOrUpdateStockBlockRequesthMutation, { data, loading, error }] = useAddOrUpdateStockBlockRequesthMutation({
 *   variables: {
 *      addOrUpdate: // value for 'addOrUpdate'
 *      prmStockBlockRequesth: // value for 'prmStockBlockRequesth'
 *   },
 * });
 */
export function useAddOrUpdateStockBlockRequesthMutation(baseOptions?: Apollo.MutationHookOptions<AddOrUpdateStockBlockRequesthMutation, AddOrUpdateStockBlockRequesthMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddOrUpdateStockBlockRequesthMutation, AddOrUpdateStockBlockRequesthMutationVariables>(AddOrUpdateStockBlockRequesthDocument, options);
      }
export type AddOrUpdateStockBlockRequesthMutationHookResult = ReturnType<typeof useAddOrUpdateStockBlockRequesthMutation>;
export type AddOrUpdateStockBlockRequesthMutationResult = Apollo.MutationResult<AddOrUpdateStockBlockRequesthMutation>;
export type AddOrUpdateStockBlockRequesthMutationOptions = Apollo.BaseMutationOptions<AddOrUpdateStockBlockRequesthMutation, AddOrUpdateStockBlockRequesthMutationVariables>;
export const AddOrUpdateStockTransferHDocument = gql`
    mutation AddOrUpdateStockTransferH($addOrUpdate: AddOrUpdateEnum!, $prmStockTransferh: StocktransferhInput!) {
  addOrUpdateStocktransferh(
    addOrUpdate: $addOrUpdate
    prmStocktransferh: $prmStockTransferh
  ) {
    resultType
    messageText
    data {
      transferid
      tstat
      subscriptionsidS
      subscriptionsidR
    }
  }
}
    `;
export type AddOrUpdateStockTransferHMutationFn = Apollo.MutationFunction<AddOrUpdateStockTransferHMutation, AddOrUpdateStockTransferHMutationVariables>;

/**
 * __useAddOrUpdateStockTransferHMutation__
 *
 * To run a mutation, you first call `useAddOrUpdateStockTransferHMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddOrUpdateStockTransferHMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addOrUpdateStockTransferHMutation, { data, loading, error }] = useAddOrUpdateStockTransferHMutation({
 *   variables: {
 *      addOrUpdate: // value for 'addOrUpdate'
 *      prmStockTransferh: // value for 'prmStockTransferh'
 *   },
 * });
 */
export function useAddOrUpdateStockTransferHMutation(baseOptions?: Apollo.MutationHookOptions<AddOrUpdateStockTransferHMutation, AddOrUpdateStockTransferHMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddOrUpdateStockTransferHMutation, AddOrUpdateStockTransferHMutationVariables>(AddOrUpdateStockTransferHDocument, options);
      }
export type AddOrUpdateStockTransferHMutationHookResult = ReturnType<typeof useAddOrUpdateStockTransferHMutation>;
export type AddOrUpdateStockTransferHMutationResult = Apollo.MutationResult<AddOrUpdateStockTransferHMutation>;
export type AddOrUpdateStockTransferHMutationOptions = Apollo.BaseMutationOptions<AddOrUpdateStockTransferHMutation, AddOrUpdateStockTransferHMutationVariables>;
export const GetAcAccountDocumentHDocument = gql`
    query GetAcAccountDocumentH($prmInvoiceNo: Long, $prmDocType: Int) {
  acAccountdocumenths(
    where: {invoiceno: {eq: $prmInvoiceNo}, accdoctype: {eq: $prmDocType}}
  ) {
    invoiceno
    docdate
    accdocno
    amountlc
    currencylc
    amount
    currency
  }
}
    `;

/**
 * __useGetAcAccountDocumentHQuery__
 *
 * To run a query within a React component, call `useGetAcAccountDocumentHQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAcAccountDocumentHQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAcAccountDocumentHQuery({
 *   variables: {
 *      prmInvoiceNo: // value for 'prmInvoiceNo'
 *      prmDocType: // value for 'prmDocType'
 *   },
 * });
 */
export function useGetAcAccountDocumentHQuery(baseOptions?: Apollo.QueryHookOptions<GetAcAccountDocumentHQuery, GetAcAccountDocumentHQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAcAccountDocumentHQuery, GetAcAccountDocumentHQueryVariables>(GetAcAccountDocumentHDocument, options);
      }
export function useGetAcAccountDocumentHLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAcAccountDocumentHQuery, GetAcAccountDocumentHQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAcAccountDocumentHQuery, GetAcAccountDocumentHQueryVariables>(GetAcAccountDocumentHDocument, options);
        }
export type GetAcAccountDocumentHQueryHookResult = ReturnType<typeof useGetAcAccountDocumentHQuery>;
export type GetAcAccountDocumentHLazyQueryHookResult = ReturnType<typeof useGetAcAccountDocumentHLazyQuery>;
export type GetAcAccountDocumentHQueryResult = Apollo.QueryResult<GetAcAccountDocumentHQuery, GetAcAccountDocumentHQueryVariables>;
export const GetAcAccountdocumenthsTableDocument = gql`
    query GetAcAccountdocumenthsTable($prmAccDocType: Int!, $prmDocNo: String!, $prmEndTime: DateTime, $stakeholderCode: FilterTypeInputOfStringInput!, $stakeholderName: FilterTypeInputOfStringInput!, $prmStartDate: DateTime) {
  acAccountdocumenthsTable(
    prmAccDocType: $prmAccDocType
    prmDocNo: $prmDocNo
    prmEndTime: $prmEndTime
    prmStartDate: $prmStartDate
    stakeholderCode: $stakeholderCode
    stakeholderName: $stakeholderName
  ) {
    invoiceno
    docdate
    accdocno
    stakeholderid
    amount
    currency
    companyid
    accdocyear
    amountlc
    explanation
    currencylc
    stakeholder {
      stakeholdername
      stakeholdercode
    }
    acAccountdocumentis {
      movementtypeid
      ownercode
      maturitydate
      amount
      currency
      explanation
    }
  }
}
    `;

/**
 * __useGetAcAccountdocumenthsTableQuery__
 *
 * To run a query within a React component, call `useGetAcAccountdocumenthsTableQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAcAccountdocumenthsTableQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAcAccountdocumenthsTableQuery({
 *   variables: {
 *      prmAccDocType: // value for 'prmAccDocType'
 *      prmDocNo: // value for 'prmDocNo'
 *      prmEndTime: // value for 'prmEndTime'
 *      stakeholderCode: // value for 'stakeholderCode'
 *      stakeholderName: // value for 'stakeholderName'
 *      prmStartDate: // value for 'prmStartDate'
 *   },
 * });
 */
export function useGetAcAccountdocumenthsTableQuery(baseOptions: Apollo.QueryHookOptions<GetAcAccountdocumenthsTableQuery, GetAcAccountdocumenthsTableQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAcAccountdocumenthsTableQuery, GetAcAccountdocumenthsTableQueryVariables>(GetAcAccountdocumenthsTableDocument, options);
      }
export function useGetAcAccountdocumenthsTableLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAcAccountdocumenthsTableQuery, GetAcAccountdocumenthsTableQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAcAccountdocumenthsTableQuery, GetAcAccountdocumenthsTableQueryVariables>(GetAcAccountdocumenthsTableDocument, options);
        }
export type GetAcAccountdocumenthsTableQueryHookResult = ReturnType<typeof useGetAcAccountdocumenthsTableQuery>;
export type GetAcAccountdocumenthsTableLazyQueryHookResult = ReturnType<typeof useGetAcAccountdocumenthsTableLazyQuery>;
export type GetAcAccountdocumenthsTableQueryResult = Apollo.QueryResult<GetAcAccountdocumenthsTableQuery, GetAcAccountdocumenthsTableQueryVariables>;
export const GetAcBankAccountsDocument = gql`
    query GetAcBankAccounts($bankAccountCode: FilterTypeInputOfStringInput!, $bankAccountName: FilterTypeInputOfStringInput!, $bankCode: FilterTypeInputOfStringInput!) {
  acBankaccountsWithFilterType(
    bankAccountCode: $bankAccountCode
    bankAccountName: $bankAccountName
    bankCode: $bankCode
  ) {
    plantid
    bastat
    bankaccountcode
    bankaccountname
    bankcode
    branchcode
    bankaccounttypeid
    creditcard
    currency
    accountno
    ibanno
  }
}
    `;

/**
 * __useGetAcBankAccountsQuery__
 *
 * To run a query within a React component, call `useGetAcBankAccountsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAcBankAccountsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAcBankAccountsQuery({
 *   variables: {
 *      bankAccountCode: // value for 'bankAccountCode'
 *      bankAccountName: // value for 'bankAccountName'
 *      bankCode: // value for 'bankCode'
 *   },
 * });
 */
export function useGetAcBankAccountsQuery(baseOptions: Apollo.QueryHookOptions<GetAcBankAccountsQuery, GetAcBankAccountsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAcBankAccountsQuery, GetAcBankAccountsQueryVariables>(GetAcBankAccountsDocument, options);
      }
export function useGetAcBankAccountsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAcBankAccountsQuery, GetAcBankAccountsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAcBankAccountsQuery, GetAcBankAccountsQueryVariables>(GetAcBankAccountsDocument, options);
        }
export type GetAcBankAccountsQueryHookResult = ReturnType<typeof useGetAcBankAccountsQuery>;
export type GetAcBankAccountsLazyQueryHookResult = ReturnType<typeof useGetAcBankAccountsLazyQuery>;
export type GetAcBankAccountsQueryResult = Apollo.QueryResult<GetAcBankAccountsQuery, GetAcBankAccountsQueryVariables>;
export const GetAcPaymentTermsDocument = gql`
    query GetAcPaymentTerms($paymentTermCode: FilterTypeInputOfStringInput!, $paymentTermDesc: FilterTypeInputOfStringInput!) {
  acPaymentTermsWithFilter(
    paymentTermCode: $paymentTermCode
    paymentTermDesc: $paymentTermDesc
  ) {
    paymentterm
    paymenttermdesc
    paymenttermtype
    maindate
    daycount
    fixedday
    active
  }
}
    `;

/**
 * __useGetAcPaymentTermsQuery__
 *
 * To run a query within a React component, call `useGetAcPaymentTermsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAcPaymentTermsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAcPaymentTermsQuery({
 *   variables: {
 *      paymentTermCode: // value for 'paymentTermCode'
 *      paymentTermDesc: // value for 'paymentTermDesc'
 *   },
 * });
 */
export function useGetAcPaymentTermsQuery(baseOptions: Apollo.QueryHookOptions<GetAcPaymentTermsQuery, GetAcPaymentTermsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAcPaymentTermsQuery, GetAcPaymentTermsQueryVariables>(GetAcPaymentTermsDocument, options);
      }
export function useGetAcPaymentTermsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAcPaymentTermsQuery, GetAcPaymentTermsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAcPaymentTermsQuery, GetAcPaymentTermsQueryVariables>(GetAcPaymentTermsDocument, options);
        }
export type GetAcPaymentTermsQueryHookResult = ReturnType<typeof useGetAcPaymentTermsQuery>;
export type GetAcPaymentTermsLazyQueryHookResult = ReturnType<typeof useGetAcPaymentTermsLazyQuery>;
export type GetAcPaymentTermsQueryResult = Apollo.QueryResult<GetAcPaymentTermsQuery, GetAcPaymentTermsQueryVariables>;
export const GetAcTillsDocument = gql`
    query GetAcTills($tillCode: FilterTypeInputOfStringInput!, $tillName: FilterTypeInputOfStringInput!) {
  acTillsWithFilter(tillCode: $tillCode, tillName: $tillName) {
    plantid
    tillcode
    tillname
    currency
    tstat
  }
}
    `;

/**
 * __useGetAcTillsQuery__
 *
 * To run a query within a React component, call `useGetAcTillsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAcTillsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAcTillsQuery({
 *   variables: {
 *      tillCode: // value for 'tillCode'
 *      tillName: // value for 'tillName'
 *   },
 * });
 */
export function useGetAcTillsQuery(baseOptions: Apollo.QueryHookOptions<GetAcTillsQuery, GetAcTillsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAcTillsQuery, GetAcTillsQueryVariables>(GetAcTillsDocument, options);
      }
export function useGetAcTillsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAcTillsQuery, GetAcTillsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAcTillsQuery, GetAcTillsQueryVariables>(GetAcTillsDocument, options);
        }
export type GetAcTillsQueryHookResult = ReturnType<typeof useGetAcTillsQuery>;
export type GetAcTillsLazyQueryHookResult = ReturnType<typeof useGetAcTillsLazyQuery>;
export type GetAcTillsQueryResult = Apollo.QueryResult<GetAcTillsQuery, GetAcTillsQueryVariables>;
export const GetAccountStatementDocument = gql`
    query GetAccountStatement($prmStakeholderid: Long!) {
  stakeholders(where: {stakeholderid: {eq: $prmStakeholderid}}) {
    acAccountdocumenths {
      docdate
      accdoctypeNavigation {
        accdoctypename
      }
      accdocno
      accdoctypeNavigation {
        accdoctypename
        dcindicator
      }
      amount
      amountlc
      currency
      invoiceno
    }
    invoicehs {
      invdate
      invoiceno
      invoicetype
      invoicetypeNavigation {
        invoicetypename
      }
      stakeholder {
        stakeholdercode
        stakeholdername
      }
      gtotalamount
      currency
      paymentterm
      eiNo
      explanation
    }
  }
}
    `;

/**
 * __useGetAccountStatementQuery__
 *
 * To run a query within a React component, call `useGetAccountStatementQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAccountStatementQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAccountStatementQuery({
 *   variables: {
 *      prmStakeholderid: // value for 'prmStakeholderid'
 *   },
 * });
 */
export function useGetAccountStatementQuery(baseOptions: Apollo.QueryHookOptions<GetAccountStatementQuery, GetAccountStatementQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAccountStatementQuery, GetAccountStatementQueryVariables>(GetAccountStatementDocument, options);
      }
export function useGetAccountStatementLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAccountStatementQuery, GetAccountStatementQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAccountStatementQuery, GetAccountStatementQueryVariables>(GetAccountStatementDocument, options);
        }
export type GetAccountStatementQueryHookResult = ReturnType<typeof useGetAccountStatementQuery>;
export type GetAccountStatementLazyQueryHookResult = ReturnType<typeof useGetAccountStatementLazyQuery>;
export type GetAccountStatementQueryResult = Apollo.QueryResult<GetAccountStatementQuery, GetAccountStatementQueryVariables>;
export const GetAllStakeholdersDocument = gql`
    query GetAllStakeholders {
  stakeholders {
    stakeholderid
    iname
    isurname
    stakeholdercode
    stakeholdername
    stakeholdertype
    paymentterm
    taxno
    risklimit
    risknotes
    tradetype
    taxoffice
    taxno
    shadbook {
      shadbookid
      fax
      website
      email
      shadname
      shadtype
      countrykey
      city
      county
      postcode
      address
      phone
    }
    stakeholdercontacts {
      contactname
      contactemail
      contactmobile
      contactphone
      contactrole
      contactnotes
    }
  }
}
    `;

/**
 * __useGetAllStakeholdersQuery__
 *
 * To run a query within a React component, call `useGetAllStakeholdersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllStakeholdersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllStakeholdersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllStakeholdersQuery(baseOptions?: Apollo.QueryHookOptions<GetAllStakeholdersQuery, GetAllStakeholdersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllStakeholdersQuery, GetAllStakeholdersQueryVariables>(GetAllStakeholdersDocument, options);
      }
export function useGetAllStakeholdersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllStakeholdersQuery, GetAllStakeholdersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllStakeholdersQuery, GetAllStakeholdersQueryVariables>(GetAllStakeholdersDocument, options);
        }
export type GetAllStakeholdersQueryHookResult = ReturnType<typeof useGetAllStakeholdersQuery>;
export type GetAllStakeholdersLazyQueryHookResult = ReturnType<typeof useGetAllStakeholdersLazyQuery>;
export type GetAllStakeholdersQueryResult = Apollo.QueryResult<GetAllStakeholdersQuery, GetAllStakeholdersQueryVariables>;
export const GetCitiesDocument = gql`
    query GetCities($prmCountryKey: String!) {
  cities(where: {countryKey: {eq: $prmCountryKey}}) {
    city
    cityCode
  }
}
    `;

/**
 * __useGetCitiesQuery__
 *
 * To run a query within a React component, call `useGetCitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCitiesQuery({
 *   variables: {
 *      prmCountryKey: // value for 'prmCountryKey'
 *   },
 * });
 */
export function useGetCitiesQuery(baseOptions: Apollo.QueryHookOptions<GetCitiesQuery, GetCitiesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCitiesQuery, GetCitiesQueryVariables>(GetCitiesDocument, options);
      }
export function useGetCitiesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCitiesQuery, GetCitiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCitiesQuery, GetCitiesQueryVariables>(GetCitiesDocument, options);
        }
export type GetCitiesQueryHookResult = ReturnType<typeof useGetCitiesQuery>;
export type GetCitiesLazyQueryHookResult = ReturnType<typeof useGetCitiesLazyQuery>;
export type GetCitiesQueryResult = Apollo.QueryResult<GetCitiesQuery, GetCitiesQueryVariables>;
export const GetCompaniesDocument = gql`
    query GetCompanies {
  companies {
    signature
    companyid
    companycode
    companyname
    taxno
    taxoffice
    telno
    country
    city
    currency
    address
    mersisno
    website
    email
    postcode
    chartaccount
    traderegisterno
    telno
    faxno
  }
}
    `;

/**
 * __useGetCompaniesQuery__
 *
 * To run a query within a React component, call `useGetCompaniesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCompaniesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCompaniesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCompaniesQuery(baseOptions?: Apollo.QueryHookOptions<GetCompaniesQuery, GetCompaniesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCompaniesQuery, GetCompaniesQueryVariables>(GetCompaniesDocument, options);
      }
export function useGetCompaniesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCompaniesQuery, GetCompaniesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCompaniesQuery, GetCompaniesQueryVariables>(GetCompaniesDocument, options);
        }
export type GetCompaniesQueryHookResult = ReturnType<typeof useGetCompaniesQuery>;
export type GetCompaniesLazyQueryHookResult = ReturnType<typeof useGetCompaniesLazyQuery>;
export type GetCompaniesQueryResult = Apollo.QueryResult<GetCompaniesQuery, GetCompaniesQueryVariables>;
export const GetCountriesDocument = gql`
    query GetCountries {
  countries {
    countryKey
    country
  }
}
    `;

/**
 * __useGetCountriesQuery__
 *
 * To run a query within a React component, call `useGetCountriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCountriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCountriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCountriesQuery(baseOptions?: Apollo.QueryHookOptions<GetCountriesQuery, GetCountriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCountriesQuery, GetCountriesQueryVariables>(GetCountriesDocument, options);
      }
export function useGetCountriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCountriesQuery, GetCountriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCountriesQuery, GetCountriesQueryVariables>(GetCountriesDocument, options);
        }
export type GetCountriesQueryHookResult = ReturnType<typeof useGetCountriesQuery>;
export type GetCountriesLazyQueryHookResult = ReturnType<typeof useGetCountriesLazyQuery>;
export type GetCountriesQueryResult = Apollo.QueryResult<GetCountriesQuery, GetCountriesQueryVariables>;
export const GetCtTransCodesDocument = gql`
    query GetCtTransCodes {
  ctTransCodes {
    transCode
    transDesc
  }
}
    `;

/**
 * __useGetCtTransCodesQuery__
 *
 * To run a query within a React component, call `useGetCtTransCodesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCtTransCodesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCtTransCodesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCtTransCodesQuery(baseOptions?: Apollo.QueryHookOptions<GetCtTransCodesQuery, GetCtTransCodesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCtTransCodesQuery, GetCtTransCodesQueryVariables>(GetCtTransCodesDocument, options);
      }
export function useGetCtTransCodesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCtTransCodesQuery, GetCtTransCodesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCtTransCodesQuery, GetCtTransCodesQueryVariables>(GetCtTransCodesDocument, options);
        }
export type GetCtTransCodesQueryHookResult = ReturnType<typeof useGetCtTransCodesQuery>;
export type GetCtTransCodesLazyQueryHookResult = ReturnType<typeof useGetCtTransCodesLazyQuery>;
export type GetCtTransCodesQueryResult = Apollo.QueryResult<GetCtTransCodesQuery, GetCtTransCodesQueryVariables>;
export const GetCurrenciesDocument = gql`
    query GetCurrencies {
  acCurrencies {
    currency
    description
    cstat
  }
}
    `;

/**
 * __useGetCurrenciesQuery__
 *
 * To run a query within a React component, call `useGetCurrenciesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrenciesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrenciesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCurrenciesQuery(baseOptions?: Apollo.QueryHookOptions<GetCurrenciesQuery, GetCurrenciesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCurrenciesQuery, GetCurrenciesQueryVariables>(GetCurrenciesDocument, options);
      }
export function useGetCurrenciesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCurrenciesQuery, GetCurrenciesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCurrenciesQuery, GetCurrenciesQueryVariables>(GetCurrenciesDocument, options);
        }
export type GetCurrenciesQueryHookResult = ReturnType<typeof useGetCurrenciesQuery>;
export type GetCurrenciesLazyQueryHookResult = ReturnType<typeof useGetCurrenciesLazyQuery>;
export type GetCurrenciesQueryResult = Apollo.QueryResult<GetCurrenciesQuery, GetCurrenciesQueryVariables>;
export const GetExpenseCategoryDocument = gql`
    query GetExpenseCategory($expenseCategoryDesc: FilterTypeInputOfStringInput!) {
  expensecategory(expenseCategoryDesc: $expenseCategoryDesc) {
    expensecategoryid
    expensecategorydesc
  }
}
    `;

/**
 * __useGetExpenseCategoryQuery__
 *
 * To run a query within a React component, call `useGetExpenseCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetExpenseCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetExpenseCategoryQuery({
 *   variables: {
 *      expenseCategoryDesc: // value for 'expenseCategoryDesc'
 *   },
 * });
 */
export function useGetExpenseCategoryQuery(baseOptions: Apollo.QueryHookOptions<GetExpenseCategoryQuery, GetExpenseCategoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetExpenseCategoryQuery, GetExpenseCategoryQueryVariables>(GetExpenseCategoryDocument, options);
      }
export function useGetExpenseCategoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetExpenseCategoryQuery, GetExpenseCategoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetExpenseCategoryQuery, GetExpenseCategoryQueryVariables>(GetExpenseCategoryDocument, options);
        }
export type GetExpenseCategoryQueryHookResult = ReturnType<typeof useGetExpenseCategoryQuery>;
export type GetExpenseCategoryLazyQueryHookResult = ReturnType<typeof useGetExpenseCategoryLazyQuery>;
export type GetExpenseCategoryQueryResult = Apollo.QueryResult<GetExpenseCategoryQuery, GetExpenseCategoryQueryVariables>;
export const GetExpensesDocument = gql`
    query GetExpenses($expenseCode: FilterTypeInputOfStringInput!, $expenseName: FilterTypeInputOfStringInput!, $expenseCategoryId: Long!) {
  expenses(
    expenseCode: $expenseCode
    expenseName: $expenseName
    expenseCategoryId: $expenseCategoryId
  ) {
    expensecode
    expensename
    expensecategoryid
    expensecategory {
      expensecategorydesc
    }
  }
}
    `;

/**
 * __useGetExpensesQuery__
 *
 * To run a query within a React component, call `useGetExpensesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetExpensesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetExpensesQuery({
 *   variables: {
 *      expenseCode: // value for 'expenseCode'
 *      expenseName: // value for 'expenseName'
 *      expenseCategoryId: // value for 'expenseCategoryId'
 *   },
 * });
 */
export function useGetExpensesQuery(baseOptions: Apollo.QueryHookOptions<GetExpensesQuery, GetExpensesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetExpensesQuery, GetExpensesQueryVariables>(GetExpensesDocument, options);
      }
export function useGetExpensesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetExpensesQuery, GetExpensesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetExpensesQuery, GetExpensesQueryVariables>(GetExpensesDocument, options);
        }
export type GetExpensesQueryHookResult = ReturnType<typeof useGetExpensesQuery>;
export type GetExpensesLazyQueryHookResult = ReturnType<typeof useGetExpensesLazyQuery>;
export type GetExpensesQueryResult = Apollo.QueryResult<GetExpensesQuery, GetExpensesQueryVariables>;
export const GetGoodsReceivinghDocument = gql`
    query GetGoodsReceivingh($prmDeliveryNoteNo: Long, $prmEndDate: DateTime, $prmStartDate: DateTime, $prmSubscriptionIdR: String!) {
  goodsreceivinghs(
    prmDeliveryNoteNo: $prmDeliveryNoteNo
    prmEndDate: $prmEndDate
    prmStartDate: $prmStartDate
    prmSubscriptionIdR: $prmSubscriptionIdR
  ) {
    goodsreceivingid
    subscriptionsidR
    deliverynoteno
    shipmenttime
    rstat
    receivingtime
    emailR
    explanationR
    goodsreceivingis {
      goodsreceivingid
      seqno
      itemcode
      serialno
      batchno
      transqty
      unit
      rstat
      explanationR
    }
  }
}
    `;

/**
 * __useGetGoodsReceivinghQuery__
 *
 * To run a query within a React component, call `useGetGoodsReceivinghQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGoodsReceivinghQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGoodsReceivinghQuery({
 *   variables: {
 *      prmDeliveryNoteNo: // value for 'prmDeliveryNoteNo'
 *      prmEndDate: // value for 'prmEndDate'
 *      prmStartDate: // value for 'prmStartDate'
 *      prmSubscriptionIdR: // value for 'prmSubscriptionIdR'
 *   },
 * });
 */
export function useGetGoodsReceivinghQuery(baseOptions: Apollo.QueryHookOptions<GetGoodsReceivinghQuery, GetGoodsReceivinghQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetGoodsReceivinghQuery, GetGoodsReceivinghQueryVariables>(GetGoodsReceivinghDocument, options);
      }
export function useGetGoodsReceivinghLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetGoodsReceivinghQuery, GetGoodsReceivinghQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetGoodsReceivinghQuery, GetGoodsReceivinghQueryVariables>(GetGoodsReceivinghDocument, options);
        }
export type GetGoodsReceivinghQueryHookResult = ReturnType<typeof useGetGoodsReceivinghQuery>;
export type GetGoodsReceivinghLazyQueryHookResult = ReturnType<typeof useGetGoodsReceivinghLazyQuery>;
export type GetGoodsReceivinghQueryResult = Apollo.QueryResult<GetGoodsReceivinghQuery, GetGoodsReceivinghQueryVariables>;
export const GetInvoiceHDocument = gql`
    query GetInvoiceH($prmInvoiceType: String) {
  invoiceH(where: {invoicetype: {eq: $prmInvoiceType}}) {
    invoiceno
    paymentterm
    exchangerate
    currency
    baseamount
    discountamount
    gtotalamount
    exceptioncode
    documentno
    eiType
    eiScenario
    eiStatus
    plantid
    eiNo
    eiUuid
    eiSendinguser
    eiSendingtime
    explanation
    createuser
    createtime
    changeuser
    changetime
    deleted
    companyid
    maturitydate
    paidamount
    invdate
    referencedocno
    invoicetype
    stakeholder {
      stakeholderid
      stakeholdercode
      stakeholdername
      taxoffice
      taxno
      shadbook {
        address
      }
    }
    invoicepaymentplan {
      invoiceno
      initialpaymentdate
      installmentcount
      installmentperiod
      installmentperiodunit
      explanation
    }
    invoiceds {
      invoiceno
      unitprice
      discountrate
      discountamount
      explanation
      netamount
      vatcode
      vatamount
      sctcode
      sctamount
      pctcode
      pctamount
      returnedqty
      seqno
      unit
      quantity
      itemcode
      itemtype
      invoicedstocks {
        id
        invoiceno
        seqno
        itemcode
        serialno
        batchno
        transqty
        returnedqty
      }
    }
    invoicepaymentplanlines {
      invoiceno
      paymentdate
      currency
      amount
      paidamount
    }
    acAccountdocumenths {
      docdate
      accdocno
      amountlc
      currencylc
    }
  }
}
    `;

/**
 * __useGetInvoiceHQuery__
 *
 * To run a query within a React component, call `useGetInvoiceHQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetInvoiceHQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetInvoiceHQuery({
 *   variables: {
 *      prmInvoiceType: // value for 'prmInvoiceType'
 *   },
 * });
 */
export function useGetInvoiceHQuery(baseOptions?: Apollo.QueryHookOptions<GetInvoiceHQuery, GetInvoiceHQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetInvoiceHQuery, GetInvoiceHQueryVariables>(GetInvoiceHDocument, options);
      }
export function useGetInvoiceHLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetInvoiceHQuery, GetInvoiceHQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetInvoiceHQuery, GetInvoiceHQueryVariables>(GetInvoiceHDocument, options);
        }
export type GetInvoiceHQueryHookResult = ReturnType<typeof useGetInvoiceHQuery>;
export type GetInvoiceHLazyQueryHookResult = ReturnType<typeof useGetInvoiceHLazyQuery>;
export type GetInvoiceHQueryResult = Apollo.QueryResult<GetInvoiceHQuery, GetInvoiceHQueryVariables>;
export const GetInvoiceHByInvoiceNoDocument = gql`
    query GetInvoiceHByInvoiceNo($prmInvoiceNo: Long) {
  invoiceH(where: {invoiceno: {eq: $prmInvoiceNo}}) {
    invoiceno
    paymentterm
    exchangerate
    currency
    baseamount
    discountamount
    gtotalamount
    exceptioncode
    eiType
    documentno
    eiScenario
    eiStatus
    plantid
    eiNo
    eiUuid
    eiSendinguser
    eiSendingtime
    explanation
    createuser
    createtime
    changeuser
    changetime
    deleted
    companyid
    maturitydate
    paidamount
    invdate
    referencedocno
    invoicetype
    stakeholder {
      stakeholderid
      stakeholdercode
      stakeholdername
      taxoffice
      taxno
      shadbook {
        address
      }
    }
    invoicepaymentplan {
      invoiceno
      initialpaymentdate
      installmentcount
      installmentperiod
      installmentperiodunit
      explanation
    }
    invoiceds {
      invoiceno
      unitprice
      discountrate
      discountamount
      netamount
      vatcode
      vatamount
      sctcode
      sctamount
      explanation
      pctcode
      pctamount
      seqno
      unit
      quantity
      itemcode
      returnedqty
      itemtype
      invoicedstocks {
        id
        invoiceno
        seqno
        itemcode
        serialno
        batchno
        transqty
        returnedqty
      }
    }
    invoicepaymentplanlines {
      invoiceno
      paymentdate
      currency
      amount
      paidamount
    }
  }
}
    `;

/**
 * __useGetInvoiceHByInvoiceNoQuery__
 *
 * To run a query within a React component, call `useGetInvoiceHByInvoiceNoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetInvoiceHByInvoiceNoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetInvoiceHByInvoiceNoQuery({
 *   variables: {
 *      prmInvoiceNo: // value for 'prmInvoiceNo'
 *   },
 * });
 */
export function useGetInvoiceHByInvoiceNoQuery(baseOptions?: Apollo.QueryHookOptions<GetInvoiceHByInvoiceNoQuery, GetInvoiceHByInvoiceNoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetInvoiceHByInvoiceNoQuery, GetInvoiceHByInvoiceNoQueryVariables>(GetInvoiceHByInvoiceNoDocument, options);
      }
export function useGetInvoiceHByInvoiceNoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetInvoiceHByInvoiceNoQuery, GetInvoiceHByInvoiceNoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetInvoiceHByInvoiceNoQuery, GetInvoiceHByInvoiceNoQueryVariables>(GetInvoiceHByInvoiceNoDocument, options);
        }
export type GetInvoiceHByInvoiceNoQueryHookResult = ReturnType<typeof useGetInvoiceHByInvoiceNoQuery>;
export type GetInvoiceHByInvoiceNoLazyQueryHookResult = ReturnType<typeof useGetInvoiceHByInvoiceNoLazyQuery>;
export type GetInvoiceHByInvoiceNoQueryResult = Apollo.QueryResult<GetInvoiceHByInvoiceNoQuery, GetInvoiceHByInvoiceNoQueryVariables>;
export const GetInvoiceHByTypesDocument = gql`
    query GetInvoiceHByTypes($prmInvoiceType1: String, $prmInvoiceType2: String) {
  invoiceH(
    where: {or: [{invoicetype: {eq: $prmInvoiceType1}}, {invoicetype: {eq: $prmInvoiceType2}}]}
  ) {
    invoiceno
    paymentterm
    exchangerate
    currency
    baseamount
    discountamount
    gtotalamount
    exceptioncode
    changeuser
    createuser
    eiType
    eiScenario
    eiStatus
    plantid
    eiNo
    eiUuid
    explanation
    deleted
    companyid
    maturitydate
    paidamount
    referencedocno
    invoicetype
    invdate
    stakeholderid
    shadbookid
    documentno
    eiSendinguser
    stakeholder {
      stakeholderid
      stakeholdercode
      stakeholdername
      taxoffice
      taxno
      shadbook {
        address
      }
    }
    invoicepaymentplan {
      invoiceno
      initialpaymentdate
      installmentcount
      installmentperiod
      installmentperiodunit
      explanation
    }
    invoiceds {
      invoiceno
      unitprice
      discountrate
      discountamount
      netamount
      explanation
      vatcode
      vatamount
      sctcode
      sctamount
      pctcode
      pctamount
      seqno
      unit
      quantity
      itemcode
      itemtype
      returnedqty
      invoicedstocks {
        id
        itemcode
        serialno
        batchno
        transqty
        seqno
        invoiceno
        returnedqty
      }
    }
    invoicepaymentplanlines {
      invoiceno
      paymentdate
      currency
      amount
      paidamount
    }
    acAccountdocumenths {
      companyid
      exchangedate
      exchangerate
      referenceno
      amount
      accountclassid
      accountcode
      explanation
      deleted
      createtime
      createuser
      accdocno
      changetime
      changeuser
      invoiceno
      stakeholderid
      acAccountdocumentis {
        companyid
        maturitydate
        accountclassid
        ownercode
        stakeholderid
        glaccount
        paymentterm
        explanation
        deleted
        createtime
        createuser
        accdocno
        changetime
        changeuser
        accdocyear
        accdocseq
        movementtypeid
        paymentorderno
        dcindicator
        currency
        amount
        amountlc
      }
      docdate
      accdocno
      amountlc
      currencylc
    }
  }
}
    `;

/**
 * __useGetInvoiceHByTypesQuery__
 *
 * To run a query within a React component, call `useGetInvoiceHByTypesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetInvoiceHByTypesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetInvoiceHByTypesQuery({
 *   variables: {
 *      prmInvoiceType1: // value for 'prmInvoiceType1'
 *      prmInvoiceType2: // value for 'prmInvoiceType2'
 *   },
 * });
 */
export function useGetInvoiceHByTypesQuery(baseOptions?: Apollo.QueryHookOptions<GetInvoiceHByTypesQuery, GetInvoiceHByTypesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetInvoiceHByTypesQuery, GetInvoiceHByTypesQueryVariables>(GetInvoiceHByTypesDocument, options);
      }
export function useGetInvoiceHByTypesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetInvoiceHByTypesQuery, GetInvoiceHByTypesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetInvoiceHByTypesQuery, GetInvoiceHByTypesQueryVariables>(GetInvoiceHByTypesDocument, options);
        }
export type GetInvoiceHByTypesQueryHookResult = ReturnType<typeof useGetInvoiceHByTypesQuery>;
export type GetInvoiceHByTypesLazyQueryHookResult = ReturnType<typeof useGetInvoiceHByTypesLazyQuery>;
export type GetInvoiceHByTypesQueryResult = Apollo.QueryResult<GetInvoiceHByTypesQuery, GetInvoiceHByTypesQueryVariables>;
export const GetInvoiceTypesDocument = gql`
    query GetInvoiceTypes($prmType: String!) {
  invoicetypes(prmType: $prmType) {
    invoicetype1
    invoicetypename
  }
}
    `;

/**
 * __useGetInvoiceTypesQuery__
 *
 * To run a query within a React component, call `useGetInvoiceTypesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetInvoiceTypesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetInvoiceTypesQuery({
 *   variables: {
 *      prmType: // value for 'prmType'
 *   },
 * });
 */
export function useGetInvoiceTypesQuery(baseOptions: Apollo.QueryHookOptions<GetInvoiceTypesQuery, GetInvoiceTypesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetInvoiceTypesQuery, GetInvoiceTypesQueryVariables>(GetInvoiceTypesDocument, options);
      }
export function useGetInvoiceTypesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetInvoiceTypesQuery, GetInvoiceTypesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetInvoiceTypesQuery, GetInvoiceTypesQueryVariables>(GetInvoiceTypesDocument, options);
        }
export type GetInvoiceTypesQueryHookResult = ReturnType<typeof useGetInvoiceTypesQuery>;
export type GetInvoiceTypesLazyQueryHookResult = ReturnType<typeof useGetInvoiceTypesLazyQuery>;
export type GetInvoiceTypesQueryResult = Apollo.QueryResult<GetInvoiceTypesQuery, GetInvoiceTypesQueryVariables>;
export const GetInvoicehWithFilterDocument = gql`
    query GetInvoicehWithFilter($prmEino: String!, $prmInvoiceno: Long!, $prmStartTime: DateTime, $prmEndTime: DateTime, $prmInvoicetype: String!) {
  invoicehWithFilter(
    prmEino: $prmEino
    prmInvoiceno: $prmInvoiceno
    prmStartTime: $prmStartTime
    prmEndTime: $prmEndTime
    prmInvoiceType: $prmInvoicetype
  ) {
    invoiceno
    paymentterm
    exchangerate
    currency
    baseamount
    discountamount
    gtotalamount
    exceptioncode
    documentno
    eiType
    eiScenario
    eiStatus
    plantid
    eiNo
    eiUuid
    eiSendinguser
    eiSendingtime
    explanation
    createuser
    createtime
    changeuser
    changetime
    deleted
    companyid
    maturitydate
    paidamount
    invdate
    referencedocno
    invoicetype
    stakeholder {
      stakeholderid
      stakeholdercode
      stakeholdername
      taxoffice
      taxno
      shadbook {
        address
      }
    }
    invoicepaymentplan {
      invoiceno
      initialpaymentdate
      installmentcount
      installmentperiod
      installmentperiodunit
      explanation
    }
    invoiceds {
      invoiceno
      unitprice
      discountrate
      discountamount
      explanation
      netamount
      vatcode
      vatamount
      sctcode
      sctamount
      pctcode
      pctamount
      returnedqty
      seqno
      unit
      quantity
      itemcode
      itemtype
      invoicedstocks {
        id
        invoiceno
        seqno
        itemcode
        serialno
        batchno
        transqty
        returnedqty
      }
    }
    invoicepaymentplanlines {
      invoiceno
      paymentdate
      currency
      amount
      paidamount
    }
    acAccountdocumenths {
      docdate
      accdocno
      amountlc
      currencylc
    }
  }
}
    `;

/**
 * __useGetInvoicehWithFilterQuery__
 *
 * To run a query within a React component, call `useGetInvoicehWithFilterQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetInvoicehWithFilterQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetInvoicehWithFilterQuery({
 *   variables: {
 *      prmEino: // value for 'prmEino'
 *      prmInvoiceno: // value for 'prmInvoiceno'
 *      prmStartTime: // value for 'prmStartTime'
 *      prmEndTime: // value for 'prmEndTime'
 *      prmInvoicetype: // value for 'prmInvoicetype'
 *   },
 * });
 */
export function useGetInvoicehWithFilterQuery(baseOptions: Apollo.QueryHookOptions<GetInvoicehWithFilterQuery, GetInvoicehWithFilterQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetInvoicehWithFilterQuery, GetInvoicehWithFilterQueryVariables>(GetInvoicehWithFilterDocument, options);
      }
export function useGetInvoicehWithFilterLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetInvoicehWithFilterQuery, GetInvoicehWithFilterQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetInvoicehWithFilterQuery, GetInvoicehWithFilterQueryVariables>(GetInvoicehWithFilterDocument, options);
        }
export type GetInvoicehWithFilterQueryHookResult = ReturnType<typeof useGetInvoicehWithFilterQuery>;
export type GetInvoicehWithFilterLazyQueryHookResult = ReturnType<typeof useGetInvoicehWithFilterLazyQuery>;
export type GetInvoicehWithFilterQueryResult = Apollo.QueryResult<GetInvoicehWithFilterQuery, GetInvoicehWithFilterQueryVariables>;
export const GetInvoicehWithFilterForReturnDocument = gql`
    query GetInvoicehWithFilterForReturn($prmEino: String!, $prmEndDate: DateTime, $prmInvoiceno: Long!, $prmInvoiceType: String!, $prmInvoiceType2: String!, $prmStartDate: DateTime) {
  invoicehWithFilterForReturn(
    prmEino: $prmEino
    prmEndDate: $prmEndDate
    prmInvoiceno: $prmInvoiceno
    prmInvoiceType: $prmInvoiceType
    prmInvoiceType2: $prmInvoiceType2
    prmStartDate: $prmStartDate
  ) {
    invoiceno
    paymentterm
    exchangerate
    currency
    baseamount
    discountamount
    gtotalamount
    exceptioncode
    changeuser
    createuser
    eiType
    eiScenario
    eiStatus
    plantid
    eiNo
    eiUuid
    explanation
    deleted
    companyid
    maturitydate
    paidamount
    referencedocno
    invoicetype
    invdate
    stakeholderid
    shadbookid
    documentno
    eiSendinguser
    stakeholder {
      stakeholderid
      stakeholdercode
      stakeholdername
      taxoffice
      taxno
      shadbook {
        address
      }
    }
    invoicepaymentplan {
      invoiceno
      initialpaymentdate
      installmentcount
      installmentperiod
      installmentperiodunit
      explanation
    }
    invoiceds {
      invoiceno
      unitprice
      discountrate
      discountamount
      netamount
      explanation
      vatcode
      vatamount
      sctcode
      sctamount
      pctcode
      pctamount
      seqno
      unit
      quantity
      itemcode
      itemtype
      returnedqty
      invoicedstocks {
        id
        itemcode
        serialno
        batchno
        transqty
        seqno
        invoiceno
        returnedqty
      }
    }
    invoicepaymentplanlines {
      invoiceno
      paymentdate
      currency
      amount
      paidamount
    }
    acAccountdocumenths {
      companyid
      exchangedate
      exchangerate
      referenceno
      amount
      accountclassid
      accountcode
      explanation
      deleted
      createtime
      createuser
      accdocno
      changetime
      changeuser
      invoiceno
      stakeholderid
      acAccountdocumentis {
        companyid
        maturitydate
        accountclassid
        ownercode
        stakeholderid
        glaccount
        paymentterm
        explanation
        deleted
        createtime
        createuser
        accdocno
        changetime
        changeuser
        accdocyear
        accdocseq
        movementtypeid
        paymentorderno
        dcindicator
        currency
        amount
        amountlc
      }
      docdate
      accdocno
      amountlc
      currencylc
    }
  }
}
    `;

/**
 * __useGetInvoicehWithFilterForReturnQuery__
 *
 * To run a query within a React component, call `useGetInvoicehWithFilterForReturnQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetInvoicehWithFilterForReturnQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetInvoicehWithFilterForReturnQuery({
 *   variables: {
 *      prmEino: // value for 'prmEino'
 *      prmEndDate: // value for 'prmEndDate'
 *      prmInvoiceno: // value for 'prmInvoiceno'
 *      prmInvoiceType: // value for 'prmInvoiceType'
 *      prmInvoiceType2: // value for 'prmInvoiceType2'
 *      prmStartDate: // value for 'prmStartDate'
 *   },
 * });
 */
export function useGetInvoicehWithFilterForReturnQuery(baseOptions: Apollo.QueryHookOptions<GetInvoicehWithFilterForReturnQuery, GetInvoicehWithFilterForReturnQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetInvoicehWithFilterForReturnQuery, GetInvoicehWithFilterForReturnQueryVariables>(GetInvoicehWithFilterForReturnDocument, options);
      }
export function useGetInvoicehWithFilterForReturnLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetInvoicehWithFilterForReturnQuery, GetInvoicehWithFilterForReturnQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetInvoicehWithFilterForReturnQuery, GetInvoicehWithFilterForReturnQueryVariables>(GetInvoicehWithFilterForReturnDocument, options);
        }
export type GetInvoicehWithFilterForReturnQueryHookResult = ReturnType<typeof useGetInvoicehWithFilterForReturnQuery>;
export type GetInvoicehWithFilterForReturnLazyQueryHookResult = ReturnType<typeof useGetInvoicehWithFilterForReturnLazyQuery>;
export type GetInvoicehWithFilterForReturnQueryResult = Apollo.QueryResult<GetInvoicehWithFilterForReturnQuery, GetInvoicehWithFilterForReturnQueryVariables>;
export const GetItemMastersDocument = gql`
    query GetItemMasters($itemtypecode: String!) {
  itemmasters(itemtypecode: $itemtypecode) {
    itemcode
    sctcode
    pctcode
    stockcontrol
    minstockqty
    maxstockqty
    barcodeno
    categoryid
    currency
    itemname
    vatcode
    purchaseprice
    salesprice
    stockmanagement
    istat
    unitsale
    baseunit
    itemtypecode
    purchaseprice
    invoiceds {
      invoiceno
      unitprice
      discountrate
      discountamount
      netamount
      vatcode
      companyid
      plantid
      sctcode
      sctamount
      pctcode
      pctamount
      seqno
      deliverynoteno
      matdocno
      warehouseid
      locationid
      quantity
    }
  }
}
    `;

/**
 * __useGetItemMastersQuery__
 *
 * To run a query within a React component, call `useGetItemMastersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetItemMastersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetItemMastersQuery({
 *   variables: {
 *      itemtypecode: // value for 'itemtypecode'
 *   },
 * });
 */
export function useGetItemMastersQuery(baseOptions: Apollo.QueryHookOptions<GetItemMastersQuery, GetItemMastersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetItemMastersQuery, GetItemMastersQueryVariables>(GetItemMastersDocument, options);
      }
export function useGetItemMastersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetItemMastersQuery, GetItemMastersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetItemMastersQuery, GetItemMastersQueryVariables>(GetItemMastersDocument, options);
        }
export type GetItemMastersQueryHookResult = ReturnType<typeof useGetItemMastersQuery>;
export type GetItemMastersLazyQueryHookResult = ReturnType<typeof useGetItemMastersLazyQuery>;
export type GetItemMastersQueryResult = Apollo.QueryResult<GetItemMastersQuery, GetItemMastersQueryVariables>;
export const GetItemMastersWithFilterDocument = gql`
    query GetItemMastersWithFilter($prmItemCode: String!, $prmItemName: String!, $prmItemTypeCode: String!) {
  itemmastersWithFilter(
    prmItemCode: $prmItemCode
    prmItemName: $prmItemName
    prmItemTypeCode: $prmItemTypeCode
  ) {
    itemcode
    sctcode
    pctcode
    stockcontrol
    minstockqty
    maxstockqty
    barcodeno
    categoryid
    currency
    itemname
    vatcode
    purchaseprice
    salesprice
    stockmanagement
    istat
    unitsale
    baseunit
    itemtypecode
    purchaseprice
  }
}
    `;

/**
 * __useGetItemMastersWithFilterQuery__
 *
 * To run a query within a React component, call `useGetItemMastersWithFilterQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetItemMastersWithFilterQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetItemMastersWithFilterQuery({
 *   variables: {
 *      prmItemCode: // value for 'prmItemCode'
 *      prmItemName: // value for 'prmItemName'
 *      prmItemTypeCode: // value for 'prmItemTypeCode'
 *   },
 * });
 */
export function useGetItemMastersWithFilterQuery(baseOptions: Apollo.QueryHookOptions<GetItemMastersWithFilterQuery, GetItemMastersWithFilterQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetItemMastersWithFilterQuery, GetItemMastersWithFilterQueryVariables>(GetItemMastersWithFilterDocument, options);
      }
export function useGetItemMastersWithFilterLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetItemMastersWithFilterQuery, GetItemMastersWithFilterQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetItemMastersWithFilterQuery, GetItemMastersWithFilterQueryVariables>(GetItemMastersWithFilterDocument, options);
        }
export type GetItemMastersWithFilterQueryHookResult = ReturnType<typeof useGetItemMastersWithFilterQuery>;
export type GetItemMastersWithFilterLazyQueryHookResult = ReturnType<typeof useGetItemMastersWithFilterLazyQuery>;
export type GetItemMastersWithFilterQueryResult = Apollo.QueryResult<GetItemMastersWithFilterQuery, GetItemMastersWithFilterQueryVariables>;
export const GetItemMastersWithFilterTypeDocument = gql`
    query GetItemMastersWithFilterType($itemCode: FilterTypeInputOfStringInput!, $itemName: FilterTypeInputOfStringInput!, $itemTypeCode: FilterTypeInputOfStringInput!) {
  itemmastersWithFilterType(
    itemCode: $itemCode
    itemName: $itemName
    itemTypeCode: $itemTypeCode
  ) {
    itemcode
    sctcode
    pctcode
    stockcontrol
    minstockqty
    maxstockqty
    barcodeno
    categoryid
    currency
    itemname
    vatcode
    purchaseprice
    salesprice
    stockmanagement
    istat
    unitsale
    baseunit
    itemtypecode
    purchaseprice
  }
}
    `;

/**
 * __useGetItemMastersWithFilterTypeQuery__
 *
 * To run a query within a React component, call `useGetItemMastersWithFilterTypeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetItemMastersWithFilterTypeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetItemMastersWithFilterTypeQuery({
 *   variables: {
 *      itemCode: // value for 'itemCode'
 *      itemName: // value for 'itemName'
 *      itemTypeCode: // value for 'itemTypeCode'
 *   },
 * });
 */
export function useGetItemMastersWithFilterTypeQuery(baseOptions: Apollo.QueryHookOptions<GetItemMastersWithFilterTypeQuery, GetItemMastersWithFilterTypeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetItemMastersWithFilterTypeQuery, GetItemMastersWithFilterTypeQueryVariables>(GetItemMastersWithFilterTypeDocument, options);
      }
export function useGetItemMastersWithFilterTypeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetItemMastersWithFilterTypeQuery, GetItemMastersWithFilterTypeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetItemMastersWithFilterTypeQuery, GetItemMastersWithFilterTypeQueryVariables>(GetItemMastersWithFilterTypeDocument, options);
        }
export type GetItemMastersWithFilterTypeQueryHookResult = ReturnType<typeof useGetItemMastersWithFilterTypeQuery>;
export type GetItemMastersWithFilterTypeLazyQueryHookResult = ReturnType<typeof useGetItemMastersWithFilterTypeLazyQuery>;
export type GetItemMastersWithFilterTypeQueryResult = Apollo.QueryResult<GetItemMastersWithFilterTypeQuery, GetItemMastersWithFilterTypeQueryVariables>;
export const GetItemTypesDocument = gql`
    query GetItemTypes {
  itemtypes {
    itemtypecode
    itemtypename
    procurementtype
    stockfollowup
  }
}
    `;

/**
 * __useGetItemTypesQuery__
 *
 * To run a query within a React component, call `useGetItemTypesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetItemTypesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetItemTypesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetItemTypesQuery(baseOptions?: Apollo.QueryHookOptions<GetItemTypesQuery, GetItemTypesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetItemTypesQuery, GetItemTypesQueryVariables>(GetItemTypesDocument, options);
      }
export function useGetItemTypesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetItemTypesQuery, GetItemTypesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetItemTypesQuery, GetItemTypesQueryVariables>(GetItemTypesDocument, options);
        }
export type GetItemTypesQueryHookResult = ReturnType<typeof useGetItemTypesQuery>;
export type GetItemTypesLazyQueryHookResult = ReturnType<typeof useGetItemTypesLazyQuery>;
export type GetItemTypesQueryResult = Apollo.QueryResult<GetItemTypesQuery, GetItemTypesQueryVariables>;
export const GetModuleListDocument = gql`
    query GetModuleList {
  moduleLists {
    moduleName
    moduleDesc
    createTime
    createUser
  }
}
    `;

/**
 * __useGetModuleListQuery__
 *
 * To run a query within a React component, call `useGetModuleListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetModuleListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetModuleListQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetModuleListQuery(baseOptions?: Apollo.QueryHookOptions<GetModuleListQuery, GetModuleListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetModuleListQuery, GetModuleListQueryVariables>(GetModuleListDocument, options);
      }
export function useGetModuleListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetModuleListQuery, GetModuleListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetModuleListQuery, GetModuleListQueryVariables>(GetModuleListDocument, options);
        }
export type GetModuleListQueryHookResult = ReturnType<typeof useGetModuleListQuery>;
export type GetModuleListLazyQueryHookResult = ReturnType<typeof useGetModuleListLazyQuery>;
export type GetModuleListQueryResult = Apollo.QueryResult<GetModuleListQuery, GetModuleListQueryVariables>;
export const GetRoleDocument = gql`
    query GetRole($prmSubscriptionId: String!) {
  role(where: {subscriptionsid: {eq: $prmSubscriptionId}}) {
    roleCode
    subscriptionsid
    authObject
    createtime
    createuser
  }
}
    `;

/**
 * __useGetRoleQuery__
 *
 * To run a query within a React component, call `useGetRoleQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRoleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRoleQuery({
 *   variables: {
 *      prmSubscriptionId: // value for 'prmSubscriptionId'
 *   },
 * });
 */
export function useGetRoleQuery(baseOptions: Apollo.QueryHookOptions<GetRoleQuery, GetRoleQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRoleQuery, GetRoleQueryVariables>(GetRoleDocument, options);
      }
export function useGetRoleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRoleQuery, GetRoleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRoleQuery, GetRoleQueryVariables>(GetRoleDocument, options);
        }
export type GetRoleQueryHookResult = ReturnType<typeof useGetRoleQuery>;
export type GetRoleLazyQueryHookResult = ReturnType<typeof useGetRoleLazyQuery>;
export type GetRoleQueryResult = Apollo.QueryResult<GetRoleQuery, GetRoleQueryVariables>;
export const GetStakeholderTypesDocument = gql`
    query GetStakeholderTypes {
  stakeholdertypes {
    stakeholdertypename
  }
}
    `;

/**
 * __useGetStakeholderTypesQuery__
 *
 * To run a query within a React component, call `useGetStakeholderTypesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetStakeholderTypesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetStakeholderTypesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetStakeholderTypesQuery(baseOptions?: Apollo.QueryHookOptions<GetStakeholderTypesQuery, GetStakeholderTypesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetStakeholderTypesQuery, GetStakeholderTypesQueryVariables>(GetStakeholderTypesDocument, options);
      }
export function useGetStakeholderTypesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetStakeholderTypesQuery, GetStakeholderTypesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetStakeholderTypesQuery, GetStakeholderTypesQueryVariables>(GetStakeholderTypesDocument, options);
        }
export type GetStakeholderTypesQueryHookResult = ReturnType<typeof useGetStakeholderTypesQuery>;
export type GetStakeholderTypesLazyQueryHookResult = ReturnType<typeof useGetStakeholderTypesLazyQuery>;
export type GetStakeholderTypesQueryResult = Apollo.QueryResult<GetStakeholderTypesQuery, GetStakeholderTypesQueryVariables>;
export const GetStakeholdersDocument = gql`
    query GetStakeholders($prmStakeholderType: String) {
  stakeholders(
    where: {or: [{stakeholdertype: {eq: "X"}}, {stakeholdertype: {eq: $prmStakeholderType}}]}
  ) {
    stakeholderid
    iname
    isurname
    stakeholdercode
    stakeholdername
    stakeholdertype
    paymentterm
    taxno
    risklimit
    risknotes
    tradetype
    identityno
    taxoffice
    taxno
    shadbookid
    currency
    shadbook {
      shadbookid
      fax
      website
      email
      shadname
      shadtype
      countrykey
      city
      county
      postcode
      address
      phone
    }
    stakeholdercontacts {
      contactid
      stakeholderid
      contactname
      contactemail
      contactmobile
      contactphone
      contactrole
      contactnotes
    }
  }
}
    `;

/**
 * __useGetStakeholdersQuery__
 *
 * To run a query within a React component, call `useGetStakeholdersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetStakeholdersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetStakeholdersQuery({
 *   variables: {
 *      prmStakeholderType: // value for 'prmStakeholderType'
 *   },
 * });
 */
export function useGetStakeholdersQuery(baseOptions?: Apollo.QueryHookOptions<GetStakeholdersQuery, GetStakeholdersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetStakeholdersQuery, GetStakeholdersQueryVariables>(GetStakeholdersDocument, options);
      }
export function useGetStakeholdersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetStakeholdersQuery, GetStakeholdersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetStakeholdersQuery, GetStakeholdersQueryVariables>(GetStakeholdersDocument, options);
        }
export type GetStakeholdersQueryHookResult = ReturnType<typeof useGetStakeholdersQuery>;
export type GetStakeholdersLazyQueryHookResult = ReturnType<typeof useGetStakeholdersLazyQuery>;
export type GetStakeholdersQueryResult = Apollo.QueryResult<GetStakeholdersQuery, GetStakeholdersQueryVariables>;
export const GetStakeholdersForAccountStatementDocument = gql`
    query GetStakeholdersForAccountStatement($stakeholderCode: FilterTypeInputOfStringInput!, $stakeholderName: FilterTypeInputOfStringInput!, $stakeholderType: String!) {
  stakeholdersForAccountStatement(
    stakeholderCode: $stakeholderCode
    stakeholderName: $stakeholderName
    stakeholderType: $stakeholderType
  ) {
    stakeholderid
    iname
    isurname
    stakeholdercode
    stakeholdername
    stakeholdertype
    paymentterm
    taxno
    risklimit
    risknotes
    tradetype
    identityno
    currency
    shadbook {
      shadbookid
      fax
      website
      email
      shadname
      shadtype
      countrykey
      city
      county
      postcode
      address
      phone
    }
    stakeholdercontacts {
      contactid
      contactname
      contactemail
      contactmobile
      contactphone
      contactrole
      contactnotes
    }
  }
}
    `;

/**
 * __useGetStakeholdersForAccountStatementQuery__
 *
 * To run a query within a React component, call `useGetStakeholdersForAccountStatementQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetStakeholdersForAccountStatementQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetStakeholdersForAccountStatementQuery({
 *   variables: {
 *      stakeholderCode: // value for 'stakeholderCode'
 *      stakeholderName: // value for 'stakeholderName'
 *      stakeholderType: // value for 'stakeholderType'
 *   },
 * });
 */
export function useGetStakeholdersForAccountStatementQuery(baseOptions: Apollo.QueryHookOptions<GetStakeholdersForAccountStatementQuery, GetStakeholdersForAccountStatementQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetStakeholdersForAccountStatementQuery, GetStakeholdersForAccountStatementQueryVariables>(GetStakeholdersForAccountStatementDocument, options);
      }
export function useGetStakeholdersForAccountStatementLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetStakeholdersForAccountStatementQuery, GetStakeholdersForAccountStatementQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetStakeholdersForAccountStatementQuery, GetStakeholdersForAccountStatementQueryVariables>(GetStakeholdersForAccountStatementDocument, options);
        }
export type GetStakeholdersForAccountStatementQueryHookResult = ReturnType<typeof useGetStakeholdersForAccountStatementQuery>;
export type GetStakeholdersForAccountStatementLazyQueryHookResult = ReturnType<typeof useGetStakeholdersForAccountStatementLazyQuery>;
export type GetStakeholdersForAccountStatementQueryResult = Apollo.QueryResult<GetStakeholdersForAccountStatementQuery, GetStakeholdersForAccountStatementQueryVariables>;
export const GetStockTransferHsDocument = gql`
    query GetStockTransferHs($prmCompanyName: String!, $prmStartDate: DateTime, $prmEndDate: DateTime, $prmSubscriptionIdR: String!, $prmSubscriptionIdS: String!) {
  stocktransferhs(
    prmCompanyName: $prmCompanyName
    prmEndDate: $prmEndDate
    prmStartDate: $prmStartDate
    prmSubscriptionIdR: $prmSubscriptionIdR
    prmSubscriptionIdS: $prmSubscriptionIdS
  ) {
    transferid
    subscriptionsidS
    subscriptionsidR
    sendtime
    emailS
    tstat
    accepttime
    emailR
    explanationS
    explanationR
    subscription {
      companyName
    }
    stocktransferis {
      transferid
      seqno
      itemcode
      serialno
      batchno
      transqty
      unit
    }
  }
}
    `;

/**
 * __useGetStockTransferHsQuery__
 *
 * To run a query within a React component, call `useGetStockTransferHsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetStockTransferHsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetStockTransferHsQuery({
 *   variables: {
 *      prmCompanyName: // value for 'prmCompanyName'
 *      prmStartDate: // value for 'prmStartDate'
 *      prmEndDate: // value for 'prmEndDate'
 *      prmSubscriptionIdR: // value for 'prmSubscriptionIdR'
 *      prmSubscriptionIdS: // value for 'prmSubscriptionIdS'
 *   },
 * });
 */
export function useGetStockTransferHsQuery(baseOptions: Apollo.QueryHookOptions<GetStockTransferHsQuery, GetStockTransferHsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetStockTransferHsQuery, GetStockTransferHsQueryVariables>(GetStockTransferHsDocument, options);
      }
export function useGetStockTransferHsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetStockTransferHsQuery, GetStockTransferHsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetStockTransferHsQuery, GetStockTransferHsQueryVariables>(GetStockTransferHsDocument, options);
        }
export type GetStockTransferHsQueryHookResult = ReturnType<typeof useGetStockTransferHsQuery>;
export type GetStockTransferHsLazyQueryHookResult = ReturnType<typeof useGetStockTransferHsLazyQuery>;
export type GetStockTransferHsQueryResult = Apollo.QueryResult<GetStockTransferHsQuery, GetStockTransferHsQueryVariables>;
export const GetStocksDocument = gql`
    query GetStocks($itemCode: FilterTypeInputOfStringInput!, $itemName: FilterTypeInputOfStringInput!, $serialNo: FilterTypeInputOfStringInput!) {
  stocks(itemCode: $itemCode, itemName: $itemName, serialNo: $serialNo) {
    itemcode
    serialno
    batchno
    availableqty
    variantid
    physicalqty
    entrydate
    itemcodeNavigation {
      itemname
      unitsale
      baseunit
    }
    variant {
      variantname
    }
    physicalqty
  }
}
    `;

/**
 * __useGetStocksQuery__
 *
 * To run a query within a React component, call `useGetStocksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetStocksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetStocksQuery({
 *   variables: {
 *      itemCode: // value for 'itemCode'
 *      itemName: // value for 'itemName'
 *      serialNo: // value for 'serialNo'
 *   },
 * });
 */
export function useGetStocksQuery(baseOptions: Apollo.QueryHookOptions<GetStocksQuery, GetStocksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetStocksQuery, GetStocksQueryVariables>(GetStocksDocument, options);
      }
export function useGetStocksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetStocksQuery, GetStocksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetStocksQuery, GetStocksQueryVariables>(GetStocksDocument, options);
        }
export type GetStocksQueryHookResult = ReturnType<typeof useGetStocksQuery>;
export type GetStocksLazyQueryHookResult = ReturnType<typeof useGetStocksLazyQuery>;
export type GetStocksQueryResult = Apollo.QueryResult<GetStocksQuery, GetStocksQueryVariables>;
export const GetSubscriptionUsersDocument = gql`
    query GetSubscriptionUsers($prmSubsId: String!) {
  subscriptionUsers(where: {subscriptionId: {eq: $prmSubsId}}) {
    subscriptionId
    email
    userDesc
    langType
    ustat
    validTo
    validFrom
    createTime
    createUser
    changeTime
    changeUser
    userroles {
      email
      subscriptionid
      roleCode
    }
  }
}
    `;

/**
 * __useGetSubscriptionUsersQuery__
 *
 * To run a query within a React component, call `useGetSubscriptionUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSubscriptionUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSubscriptionUsersQuery({
 *   variables: {
 *      prmSubsId: // value for 'prmSubsId'
 *   },
 * });
 */
export function useGetSubscriptionUsersQuery(baseOptions: Apollo.QueryHookOptions<GetSubscriptionUsersQuery, GetSubscriptionUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSubscriptionUsersQuery, GetSubscriptionUsersQueryVariables>(GetSubscriptionUsersDocument, options);
      }
export function useGetSubscriptionUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSubscriptionUsersQuery, GetSubscriptionUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSubscriptionUsersQuery, GetSubscriptionUsersQueryVariables>(GetSubscriptionUsersDocument, options);
        }
export type GetSubscriptionUsersQueryHookResult = ReturnType<typeof useGetSubscriptionUsersQuery>;
export type GetSubscriptionUsersLazyQueryHookResult = ReturnType<typeof useGetSubscriptionUsersLazyQuery>;
export type GetSubscriptionUsersQueryResult = Apollo.QueryResult<GetSubscriptionUsersQuery, GetSubscriptionUsersQueryVariables>;
export const GetSubscriptionDocument = gql`
    query GetSubscription {
  subscription {
    subscriptionsId
    companyName
  }
}
    `;

/**
 * __useGetSubscriptionQuery__
 *
 * To run a query within a React component, call `useGetSubscriptionQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSubscriptionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSubscriptionQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSubscriptionQuery(baseOptions?: Apollo.QueryHookOptions<GetSubscriptionQuery, GetSubscriptionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSubscriptionQuery, GetSubscriptionQueryVariables>(GetSubscriptionDocument, options);
      }
export function useGetSubscriptionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSubscriptionQuery, GetSubscriptionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSubscriptionQuery, GetSubscriptionQueryVariables>(GetSubscriptionDocument, options);
        }
export type GetSubscriptionQueryHookResult = ReturnType<typeof useGetSubscriptionQuery>;
export type GetSubscriptionLazyQueryHookResult = ReturnType<typeof useGetSubscriptionLazyQuery>;
export type GetSubscriptionQueryResult = Apollo.QueryResult<GetSubscriptionQuery, GetSubscriptionQueryVariables>;
export const GetTaxesDocument = gql`
    query GetTaxes {
  taxes {
    taxcode
    taxdesc
    taxrate
    taxtype
    taxkey
  }
}
    `;

/**
 * __useGetTaxesQuery__
 *
 * To run a query within a React component, call `useGetTaxesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTaxesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTaxesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTaxesQuery(baseOptions?: Apollo.QueryHookOptions<GetTaxesQuery, GetTaxesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTaxesQuery, GetTaxesQueryVariables>(GetTaxesDocument, options);
      }
export function useGetTaxesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTaxesQuery, GetTaxesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTaxesQuery, GetTaxesQueryVariables>(GetTaxesDocument, options);
        }
export type GetTaxesQueryHookResult = ReturnType<typeof useGetTaxesQuery>;
export type GetTaxesLazyQueryHookResult = ReturnType<typeof useGetTaxesLazyQuery>;
export type GetTaxesQueryResult = Apollo.QueryResult<GetTaxesQuery, GetTaxesQueryVariables>;
export const GetTranshistsDocument = gql`
    query GetTranshists($batchNo: FilterTypeInputOfStringInput!, $itemCode: FilterTypeInputOfStringInput!, $matDocNo: FilterTypeInputOfStringInput!, $serialNo: FilterTypeInputOfStringInput!, $stakeholderName: FilterTypeInputOfStringInput!, $transCode: String!) {
  transhists(
    batchNo: $batchNo
    itemCode: $itemCode
    matDocNo: $matDocNo
    serialNo: $serialNo
    stakeholderName: $stakeholderName
    transCode: $transCode
  ) {
    matdocno
    matdocseq
    stakeholderid
    itemcode
    serialno
    batchno
    transqty
    variantid
    storagelocationid
    storagebinid
    plantid
    newstoragelocationid
    newstoragebinid
    newplantid
    physicalqty
    availableqty
    matdocyear
    reservedqty
    onqualityqty
    blockedqty
    username
    transtime
    transcode
    referencetype
    referenceid
    entrydate
    ctTransCode {
      transCode
      transDesc
    }
    stakeholder {
      stakeholdername
    }
  }
}
    `;

/**
 * __useGetTranshistsQuery__
 *
 * To run a query within a React component, call `useGetTranshistsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTranshistsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTranshistsQuery({
 *   variables: {
 *      batchNo: // value for 'batchNo'
 *      itemCode: // value for 'itemCode'
 *      matDocNo: // value for 'matDocNo'
 *      serialNo: // value for 'serialNo'
 *      stakeholderName: // value for 'stakeholderName'
 *      transCode: // value for 'transCode'
 *   },
 * });
 */
export function useGetTranshistsQuery(baseOptions: Apollo.QueryHookOptions<GetTranshistsQuery, GetTranshistsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTranshistsQuery, GetTranshistsQueryVariables>(GetTranshistsDocument, options);
      }
export function useGetTranshistsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTranshistsQuery, GetTranshistsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTranshistsQuery, GetTranshistsQueryVariables>(GetTranshistsDocument, options);
        }
export type GetTranshistsQueryHookResult = ReturnType<typeof useGetTranshistsQuery>;
export type GetTranshistsLazyQueryHookResult = ReturnType<typeof useGetTranshistsLazyQuery>;
export type GetTranshistsQueryResult = Apollo.QueryResult<GetTranshistsQuery, GetTranshistsQueryVariables>;
export const GetUnitsDocument = gql`
    query GetUnits {
  units {
    unitcode
    unitname
  }
}
    `;

/**
 * __useGetUnitsQuery__
 *
 * To run a query within a React component, call `useGetUnitsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUnitsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUnitsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUnitsQuery(baseOptions?: Apollo.QueryHookOptions<GetUnitsQuery, GetUnitsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUnitsQuery, GetUnitsQueryVariables>(GetUnitsDocument, options);
      }
export function useGetUnitsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUnitsQuery, GetUnitsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUnitsQuery, GetUnitsQueryVariables>(GetUnitsDocument, options);
        }
export type GetUnitsQueryHookResult = ReturnType<typeof useGetUnitsQuery>;
export type GetUnitsLazyQueryHookResult = ReturnType<typeof useGetUnitsLazyQuery>;
export type GetUnitsQueryResult = Apollo.QueryResult<GetUnitsQuery, GetUnitsQueryVariables>;