import { useTranslation } from 'react-i18next';
import MSCToolbar, { ViewMode } from '../../../@mscComponnent/CRUDPage/MSCToolbar'
import { GetRowAndColumn, MSCCurrencyFormatter } from '../../../@mscComponnent/Global/GlobalFunc'
import React, { useEffect, useState } from 'react';
import { MSCReactTable } from '../../../@mscComponnent/MSCReactTable/MSCReactTable';
import { AddOrUpdateEnum, useGetAccountStatementLazyQuery, useGetStakeholdersForAccountStatementLazyQuery, useGetStakeholderTypesLazyQuery, useGetStakeholderTypesQuery } from '../../../generated/graphql';
import { Grid, Card, CardContent, Typography, Button, Stack, CardHeader } from '@mui/material';
import TextField from '@mui/material/TextField';
import moment from 'moment';
import MSCTextField from '../../../@mscComponnent/MSCInput/MSCTextField'
import MSCLookup from '../../../@mscComponnent/MSCInput/MSCLookup'
import SearchIcon from '@mui/icons-material/Search'
import FuseLoading from '../../../@fuse/core/FuseLoading'
import { useSelector } from 'react-redux';
import { getViewModeFunc } from '../../store/mscToolbar/mscToolbarSlice';
import { AutoForm } from 'uniforms';
import { bridge as schema } from './uniforms/AccAccountSchema';

const AccountStatement = () => {
  const { t } = useTranslation();
  const [searchText, setSearchText] = useState('')
  const getViewModeFuncEx = useSelector(getViewModeFunc);
  const [filterGlobal, setFilterGlobal] = useState();
  const visibleColumns = ['docdate', 'accdoctype', 'accdocno', 'tstat', 'explanationS']
  const [getStakeholdersForAccountStatementLazyQuery, { data: dataStakeholders, loading: stakeholdersLoading }] = useGetStakeholdersForAccountStatementLazyQuery();
  const [getAccountStatementLazyQuery, { data: dataAccountStatement, loading: loadingAccountStatement }] = useGetAccountStatementLazyQuery();
  let gridData = GetRowAndColumn(dataStakeholders?.stakeholdersForAccountStatement, visibleColumns);
  const [selectedData, setSelectedData] = useState({});
  const [addOrUpdate, setAddOrUpdate] = useState(AddOrUpdateEnum.Update);
  const [accountMovements, setAccountMovements] = useState([]);
  const [totalDebit, setTotalDebit] = useState(0);
  const [totalCredit, setTotalCredit] = useState(0);
  const [stakeholderCode, setStakeholderCode] = useState("");
  const [stakeholderName, setStakeholderName] = useState("");
  const [stakeholderType, setStakeholderType] = useState("");
  const { data: dataStakeholderTypes, loading: loadingStakeholderTypes } = useGetStakeholderTypesQuery();

  useEffect(() => {
    if (selectedData && Object.keys(selectedData)?.length > 0) {
      getAccountStatementLazyQuery({
        variables: {
          prmStakeholderid: selectedData?.stakeholderid
        }
      })
    }
  }, [selectedData]);

  useEffect(() => {
    if (dataAccountStatement) {
      if (dataAccountStatement?.stakeholders?.length > 0) {
        let dataSource = [];
        var totalDebit = 0;
        var totalCredit = 0;
        dataSource = JSON.parse(JSON.stringify(dataAccountStatement?.stakeholders[0]?.acAccountdocumenths));
        dataSource?.map(val => {
          if (val?.accdoctypeNavigation?.dcindicator === "D") {
            val.credit = 0;
            val.debit = val.amount;
            val.balance = -val.amount;
            totalDebit += val.amount;
          }
          else {
            val.debit = 0;
            val.credit = val.amount;
            val.balance = val.amount
            totalCredit += val.amount
          }
        })
        setTotalDebit(totalDebit);
        setTotalCredit(totalCredit);
        setAccountMovements(dataSource);
      }
    }
  }, [dataAccountStatement]);

  useEffect(() => {
    filterGlobal?.setGlobalFilter(searchText)
  }, [searchText]);

  const dataRow = React.useMemo(
    () => gridData.rows,
    [gridData?.rows?.length, dataStakeholders]
  )

  const onFilterButtonClick = () => {
    getStakeholdersForAccountStatementLazyQuery({
      variables: {
        stakeholderCode:{filterType:"equal",parameter:stakeholderCode},
        stakeholderName:{filterType:"equal",parameter:stakeholderName},
        stakeholderType:stakeholderType
      }
    });
    setStakeholderCode('');
    setStakeholderName('');
    setStakeholderType('');
  }

  if (stakeholdersLoading || loadingStakeholderTypes) {
    return <FuseLoading />
  }

  const changeViewMode = (prmRowData, addOrUpdateStatus) => {
    setAddOrUpdate(addOrUpdateStatus); // kayıt modu belirleme
    setSelectedData(prmRowData); // isteğe bağlı yönetme şekli
    getViewModeFuncEx(ViewMode.Update)

  };

  console.log(selectedData,"selectedData");

  return (
    <AutoForm
      schema={schema} >
      <MSCToolbar
        filterSearch={setSearchText}
        headerName={t('AccountStatement')}
        viewMode={ViewMode.Read}
        ReadModeHeaderComponnent={<></>}
        ReadComponnent={
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12} lg={12} md={12}>
              <Card variant='outlined'>
                <Typography style={{ backgroundColor: '#263238', padding: '1%', marginBottom: '1%', color: 'white' }}>Filtrele</Typography>
                <CardContent >
                  <MSCTextField label={t('stakeholdercode')} fullWidth onChange={(e) => { setStakeholderCode(e.target.value) }}
                    value={stakeholderCode} />
                  <MSCTextField label={t('stakeholdername')} onChange={(e) => { setStakeholderName(e.target.value) }}
                    value={stakeholderName} />
                  <MSCLookup label={t('stakeholdertype')} onChange={(e) => { setStakeholderType(e.target.value) }} value={stakeholderType}
                    options={dataStakeholderTypes?.stakeholdertypes?.map(val => ({ label: t(val.stakeholdertypename), value: val.stakeholdertypename }))} />
                  <Button startIcon={<SearchIcon />} fullWidth variant={'contained'} style={{ marginTop: '2%' }} onClick={onFilterButtonClick}
                  >{t('Filter')}</Button>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={12} lg={12} md={12}>
              <MSCReactTable
                cursor
                columns={[
                  { accessor: 'stakeholdercode', Header: t('stakeholdercode') },
                  { accessor: 'stakeholdername', Header: t('stakeholdername') },
                  { accessor: 'paymentterm', Header: t('paymentterm') },
                  { accessor: 'taxno', Header: t('taxno') },
                  { accessor: 'risklimit', Header: t('risklimit') },
                ]}
                data={dataRow}
                SelectRowData={(e) => setSelectedData(e)}
                onRowClicked={(e) => {
                  changeViewMode(e.original, AddOrUpdateEnum.Update);
                }}
                globalFilterTable={(preGlobalFilteredRows, setGlobalFilter, globalFilter) => {
                  setFilterGlobal({ ...filterGlobal, setGlobalFilter })
                }}
              />
            </Grid>
          </Grid>
        }
        CreateOrUpdateComponnent={
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} lg={12} md={12}>
              <Card>
                <CardContent >
                  <Typography variant={'h6'} color={'GrayText'} marginBottom={'2%'}>TUNAHAN GÜLER</Typography>
                  <Stack direction={'row'} justifyContent={'space-between'}>
                    <Stack direction={'row'} spacing={8}>
                      <Stack spacing={1}>
                        <Typography variant={'subtitle1'}>{t('stakeholdercode')} : </Typography>
                        <Typography variant={'subtitle1'}>{t('taxno')} : </Typography>
                        <Typography variant={'subtitle1'}>{t('taxoffice')} : </Typography>
                        <Typography variant={'subtitle1'}>{t('phone')} : </Typography>
                        <Typography variant={'subtitle1'}>{t('Email')} : </Typography>
                      </Stack>
                      <Stack spacing={1}>
                        <Typography variant={'subtitle1'} fontWeight={'bolder'}>{selectedData?.stakeholdercode ? selectedData?.stakeholdercode : '-'}</Typography>
                        <Typography variant={'subtitle1'} fontWeight={'bolder'}>{selectedData?.taxno ? selectedData?.taxno : '-'}</Typography>
                        <Typography variant={'subtitle1'} fontWeight={'bolder'}>{selectedData?.taxoffice ? selectedData?.taxoffice : '-'}</Typography>
                        <Typography variant={'subtitle1'} fontWeight={'bolder'}>{selectedData?.shadbook?.phone ? selectedData?.shadbook?.phone : '-'}</Typography>
                        <Typography variant={'subtitle1'} fontWeight={'bolder'}>{selectedData?.shadbook?.email ? selectedData?.shadbook?.email : '-'}</Typography>
                      </Stack>
                    </Stack>
                    <Stack direction={'row'} spacing={8}>
                      <Stack spacing={1}>
                        <Typography variant={'subtitle1'}>{t('debit')}: </Typography>
                        <Typography variant={'subtitle1'}>{t('credit')}: </Typography>
                        <Typography variant={'subtitle1'}>{t('Balance')}: </Typography>
                        <Typography variant={'subtitle1'}>{t('address')}: </Typography>
                      </Stack>
                      <Stack spacing={1}>
                        <Typography variant={'subtitle1'} fontWeight={'bolder'}>{MSCCurrencyFormatter(totalDebit,selectedData?.currency)}</Typography>
                        <Typography variant={'subtitle1'} fontWeight={'bolder'}>{MSCCurrencyFormatter(totalCredit,selectedData?.currency)}</Typography>
                        <Typography variant={'subtitle1'} fontWeight={'bolder'} color={(totalCredit - totalDebit) > 0 ? 'red' : (totalCredit - totalDebit) === 0 ? null :
                          'green'}
                        >{MSCCurrencyFormatter((totalCredit - totalDebit),selectedData?.currency)}</Typography>
                        <Typography variant={'subtitle1'} fontWeight={'bolder'}>{selectedData?.shadbook?.address ? selectedData?.shadbook?.address : '-'}</Typography>
                      </Stack>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={12} lg={12} md={12}>
              <Card>
                <Typography variant={'h6'} padding={2}>Müşteri Hesap Hareketleri</Typography>
                <CardContent>
                  <MSCReactTable
                    columns={[
                      { accessor: (row) => { return moment(row.docdate).format('DD-MM-YYYY') }, Header: t('docdate') },
                      { accessor: (row) => { return row?.accdoctypeNavigation?.accdoctypename }, Header: t('accdoctype') },
                      { accessor: 'accdocno', Header: t('accdocno') },
                      {
                        accessor: (row) => {
                          if (row?.accdoctypeNavigation?.dcindicator === "D") { return t('debit') }
                          else { return t('credit') }
                        }, Header: t('dcindicator')
                      },
                      { accessor: (row) => { return MSCCurrencyFormatter(row?.debit,row?.currency) }, Header: t('debit') },
                      { accessor: (row) => { return MSCCurrencyFormatter(row?.credit,row?.currency) }, Header: t('credit') },
                      { accessor: (row) => { return MSCCurrencyFormatter(row?.balance,row?.currency) }, Header: t('Balance') },
                      { accessor: 'currency', Header: t('currency') },
                      { accessor: 'invoiceno', Header: t('invoiceno') },
                    ]}
                    data={accountMovements}
                    globalFilterTable={(preGlobalFilteredRows, setGlobalFilter, globalFilter) => {
                      setFilterGlobal({ ...filterGlobal, setGlobalFilter })
                    }}
                  />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={12} lg={12} md={12}>
              <Card>
                <Typography variant={'h6'} padding={2}>Geçmiş Fatura Bilgileri</Typography>
                <CardContent>
                  <MSCReactTable
                    columns={[
                      { accessor: (row) => { return moment(row.invdate).format('DD-MM-YYYY') }, Header: t('invdate') },
                      { accessor: 'invoiceno', Header: t('invoiceno') },
                      { accessor: (row) => { return row.invoicetypeNavigation.invoicetypename }, Header: t('invoicetype') },
                      { accessor: (row) => { return row.stakeholder.stakeholdercode }, Header: t('stakeholdercode') },
                      { accessor: (row) => { return row.stakeholder.stakeholdername }, Header: t('stakeholdername') },
                      { accessor: (row) => { return MSCCurrencyFormatter(row?.gtotalamount, row?.currency) }, Header: t('totalamount') },
                      { accessor: 'currency', Header: t('currency') },
                      { accessor: 'paymentterm', Header: t('PaymentCondition') },
                      { accessor: 'eiNo', Header: t('eiNo') },
                      { accessor: 'explanation', Header: t('explanation') },
                    ]}
                    data={dataAccountStatement ? dataAccountStatement?.stakeholders?.length > 0 ?
                      dataAccountStatement?.stakeholders[0].invoicehs : [] : []}
                    globalFilterTable={(preGlobalFilteredRows, setGlobalFilter, globalFilter) => {
                      setFilterGlobal({ ...filterGlobal, setGlobalFilter })
                    }}
                  />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        }
      />
    </AutoForm>
  )
}

export default AccountStatement