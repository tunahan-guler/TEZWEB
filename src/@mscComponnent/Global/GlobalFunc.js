import { useTranslation } from "react-i18next";
import { showMessage } from '../../app/store/fuse/messageSlice'
import { useDispatch } from 'react-redux'

export const GetRowAndColumn = (arr, visibleColumn = []) => {
  const { t } = useTranslation();
  let id = 0;
  let rows = [];
  let columns = [];
  if (arr) {
    arr.map((item, i) => {
      let R = {};
      Object.keys(item).map((accessor, index) => {
        if (!columns.some(e => e.accessor === accessor) && accessor !== '__typename' && visibleColumn.some(e => e === accessor)) {
          columns.push({
            accessor: accessor,
            Header: t(accessor),
          });
        }
        if (accessor !== '__typename') {
          R = { ...R, [accessor]: item[accessor] }
        }
      })
      rows.push(R);
    })
    return { rows, columns }
  }
  else {
    return {
      rows: [],
      columns: []
    }
  }
}

export const GetCurrencies = (dataCurrencies) => {
  let currency = [];
  if (dataCurrencies?.acCurrencies) {
    dataCurrencies?.acCurrencies?.map((item) => {
      currency.push({
        label: `${item.currency} | ${item.description}`,
        value: item.currency
      })
    })
  }
  return currency;
}

export const GetItemTypes = (dataItemTypes) => {
  let itemTypes = [];
  if (dataItemTypes?.itemtypes) {
    dataItemTypes?.itemtypes?.map(item => {
      itemTypes.push({
        label: item.itemtypename,
        value: item.itemtypecode
      })
    })
  }
  return itemTypes;
}

export const GetTaxes = (arr) => {
  let taxes = [];
  if (arr) {
    arr?.map(item => {
      taxes.push({
        label: item.taxdesc,
        value: item.taxcode
      })
    })
  }
  return taxes;
}

export const GetWindowSize = () => {
  const clientSize = {
    width: window.innerWidth,
    height: window.innerHeight,
  }
  return clientSize;
}

export const isMobile = () => {
  if (window.innerWidth > 700) {
    return false;
  }
  else {
    return true;
  }
}

export const enumMovementTypes = () => {
  const { t } = useTranslation();
  return [
    { value: 1, label: t('Cash') },
    { value: 2, label: t('Check') },
    { value: 3, label: t('Bond') },
    { value: 4, label: "POS" },
    { value: 8, label: t('BankTransferEFT') }
  ];
}

export const GetUnits = (dataUnits) => {
  let units = [];
  if (dataUnits?.units) {
    dataUnits?.units?.map(item => {
      units.push({
        label: item.unitname,
        value: item.unitcode
      })
    })
  }
  return units;
}

export const MSCMessage = (dispatch, type, message) => {
  return (
    dispatch(
      showMessage({
        message: message,//text or html
        autoHideDuration: 6000,//ms
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right'
        },
        variant: type//success error info warning null
      })));
}

export const GetCountries = (dataCountries) => {
  let countries = [];
  if (dataCountries?.countries) {
    dataCountries?.countries?.map(item => {
      countries.push({
        label: `${item.countryKey} | ${item.country}`,
        value: item.countryKey
      })
    })
  }
  return countries;
}

export const GetCities = (dataCities) => {
  let cities = [];
  if (dataCities?.cities) {
    dataCities?.cities?.map(item => {
      cities.push({
        label: item.city,
        value: item.cityCode
      })
    })
  }
  return cities;
}

export const MSCCurrencyFormatter = (value, currency = "TRY") => {
  return new Intl.NumberFormat('tr', { style: 'currency', currency: currency }).format(value);
}

export const GetTransType = (dataTransType) => {
  let transtype = [];
  if(dataTransType?.ctTransCodes){
    dataTransType?.ctTransCodes.map(item => {
      transtype.push({
        label:item.transDesc,
        value:item.transCode  
      })
    })
  }
  return transtype;
}

export const GetInvoiceType = (dataInvoiceType) => {
  let invoiceType = [];
  if (dataInvoiceType?.invoicetypes) {
    dataInvoiceType?.invoicetypes?.map(item => {
      invoiceType.push({
        label: item.invoicetypename,
        value: item.invoicetype1
      })
    })
  }
  return invoiceType;
}
