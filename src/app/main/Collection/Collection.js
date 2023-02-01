import React from 'react'
import { useTranslation } from 'react-i18next';
import MSCToolbar, { ViewMode } from '../../../@mscComponnent/CRUDPage/MSCToolbar'
import { AutoForm, ErrorField } from 'uniforms-material';
import { bridge as schema } from './uniform/GraphqlSchema';
import {
  AddOrUpdateEnum, useAcAccountdocumenthMutateMutation, useGetStakeholdersLazyQuery,
  useGetCurrenciesQuery, useDeleteAcAccountDocumenthMutation, useGetAcAccountdocumenthsTableLazyQuery
} from '../example/../../../generated/graphql'
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getViewModeFunc, getViewMode, changeViewMode } from '../../store/mscToolbar/mscToolbarSlice'
import { Button, Card, CardContent, Grid, Typography } from '@mui/material';
import AutoLabelField from '../../../@mscComponnent/UniformsComponnents/AutoLabelField';
import MSCTableField from '../../../@mscComponnent/UniformsComponnents/MSCTableField';
import { MSCReactTable } from '../../../@mscComponnent/MSCReactTable/MSCReactTable';
import moment from 'moment';
import { GetCurrencies, GetRowAndColumn, MSCCurrencyFormatter, MSCMessage } from '../../../@mscComponnent/Global/GlobalFunc';
import GetAcAccountDocumentIs from './SubComponnents/GetAcAccountDocumentIs';
import StakeholderSelectionModal from '../../../@mscComponnent/Modal/StakeholderSelectionModal';
import TextLabelField from '../../../@mscComponnent/UniformsComponnents/TextLabelField';
import ConfirmModal from '../../../@mscComponnent/Modal/ConfirmModal';
import NewStakeholderModal from '../../../@mscComponnent/Modal/NewStakeholderModal';
import MSCDateLabelField from '../../../@mscComponnent/UniformsComponnents/MSCDateLabelField'
import MaterialUiGridComp from '../../../@mscComponnent/MaterialuiGrid/MaterialUiGridComp';
import MSCTextField from '../../../@mscComponnent/MSCInput/MSCTextField';
import FuseLoading from '../../../@fuse/core/FuseLoading';
import MSCButton from '../../../@mscComponnent/Buttons/MSCButton';
import StakeholderSelectionDialog from '../../../@mscComponnent/Modal/StakeholderSelectionDialog';
import MSCFilterInputs from '../../../@mscComponnent/MSCInput/MSCFilterInputs';

function Collection(props) {
  const user = useSelector(({ auth }) => auth.user)
  const period = moment().format("YYYY-MM").replace('-', '');
  const acJSON = {
    accdoctype: 1,
    accdocyear: 0,//Prosedürden gelecek
    accountcode: "",
    companyid: 1,
    accountclassid: 1,
    // changetime: moment().format('HH:MM'),
    changeuser: user.data.displayName,
    // createtime: moment().format('HH:MM'),
    createuser: user.data.displayName,
    currency: "TRY",
    currencylc: "TRY",
    deleted: false,
    // docdate: moment().format('YYYY-MM-DD'),
    // exchangedate: moment().format('YYYY-MM-DD'),
    exchangerate: 1,
    period: parseInt(period),
    plantid: 1,
    referenceno: "",
  }
  const [newStakeholderModal, setNewStakeholderModal] = useState(false);
  const getViewModeEx = useSelector(getViewMode); // 18042022 
  const [showStakeholderModal, setShowStakeholderModal] = useState(false);
  const [getStakeholdersLazyQuery, { data: stakeholdersData, loading: loadingStakeholders }] = useGetStakeholdersLazyQuery();
  const [deleteAcAccountDocumenthMutation, { data: deleteMutationData }] = useDeleteAcAccountDocumenthMutation();
  const [selectedData, setSelectedData] = useState({});
  const [acAccountdocumenthMutateMutation, { data, loading, error }] = useAcAccountdocumenthMutateMutation();
  const { t } = useTranslation();
  const getViewModeFuncEx = useSelector(getViewModeFunc);
  const dispatch = useDispatch();
  const [addOrUpdate, setAddOrUpdate] = useState(AddOrUpdateEnum.Add)
  const [rowData, setRowData] = useState({})
  const [TotalAmount, setTotalAmount] = useState(0);
  const [searchText, setSearchText] = useState('')
  const [filterGlobal, setFilterGlobal] = useState()
  const [getAcAccountDocumenthLazyQuery, { data: DataAcAccountdocumenths, loading: LoadingAcAccountdocumenths, refetch }] = useGetAcAccountdocumenthsTableLazyQuery();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { data: dataCurrencies, loading: loadingCurrencies } = useGetCurrenciesQuery();
  const visibleColumns = ['docdate', 'stakeholdercode', "stakeholdername", "stakeholderid", "amount", "currency"]
  let gridData = GetRowAndColumn(DataAcAccountdocumenths?.acAccountdocumenthsTable, visibleColumns);
  const [filterParams, setFilterParams] = useState({
    docno: "",
    stakeholderCode: { filterType: "", parameter: "" },
    stakeholderName: { filterType: "", parameter: "" },
    enddate: null,
    startdate: null
  })

  const handleCloseStakeholderModal = () => {
    setShowStakeholderModal(false);
  }
  const handleCloseNewStakeholderModal = () => {
    setNewStakeholderModal(false);
  }

  const dataRow = React.useMemo(
    () => gridData.rows,
    [gridData?.rows?.length]
  )

  useEffect(() => {
    filterGlobal?.setGlobalFilter(searchText)
  }, [searchText])


  useEffect(() => {
    if (getViewModeEx === 1) {
      setTotalAmount(0);
      setRowData({});
    }
  }, [getViewModeEx])


  const AddOrUpdate = (model, addOrUpdateStatus) => {
    acAccountdocumenthMutateMutation({
      variables: {
        addOrUpdate: addOrUpdateStatus,
        prmAcAccountdocumenth: model
      }
    }).then(res => {
      console.log(res, "res");
      if (res.data.addOrUpdateAcAccountdocumenth.resultType === "SUC") {
        MSCMessage(dispatch, 'success', "Kaydedildi.")
        getViewModeFuncEx(ViewMode.Read);
        dispatch(changeViewMode(ViewMode.Read))
        refetch();
        setRowData({});
        setSelectedData({})
      } else {
        MSCMessage(dispatch, 'error', "Hata Oluştu")
      }
    })
      .catch(err => console.log(err, "err"))
  }

  const UpdateButtonClick = (prmRowData, addOrUpdateStatus) => {
    setAddOrUpdate(addOrUpdateStatus); // kayıt modu belirleme
    getViewModeFuncEx(ViewMode.Update)
    dispatch(changeViewMode(ViewMode.Update))
  };

  const onDeleteButtonClick = () => {
    setShowDeleteModal(true);
  }

  const onDeleteModalButtonClick = (accdocno, accdocyear, companyId) => {
    deleteAcAccountDocumenthMutation({
      variables: {
        prmaccdocno: accdocno,
        prmaccdocyear: accdocyear,
        prmcompanyId: companyId
      }
    })
      .then(res => {
        console.log(res, "res");
        if (res.data.deleteAcAccountDocumenth.resultType === "SUC") {
          MSCMessage(dispatch, 'success', "Kaydedildi")
          refetch();
          setRowData({});
          setSelectedData({});
          getViewModeFuncEx(ViewMode.Read);
          dispatch(changeViewMode(ViewMode.Read))
          refetch();
        } else {
          MSCMessage(dispatch, 'error', "Hata Oluştu")
        }
      })
      .catch(err => console.log(err, "err"))
  }

  const GetAcAccountDocumenthLazyQuery = () => {
    getAcAccountDocumenthLazyQuery({
      variables: {
        prmAccDocType: 1,
        stakeholderCode: { filterType: filterParams.stakeholderCode.filterType, parameter: filterParams.stakeholderCode.parameter },
        stakeholderName: { filterType: filterParams.stakeholderName.filterType, parameter: filterParams.stakeholderName.parameter },
        prmDocNo: filterParams.docno,
        prmEndTime: filterParams.enddate,
        prmStartDate: filterParams.startdate
      }
    })
    setFilterParams({
      docno: "",
      stakeholderCode: { filterType: "", parameter: "" },
      stakeholderName: { filterType: "", parameter: "" },
      enddate: null,
      startdate: null
    })
  }

  if (LoadingAcAccountdocumenths) {
    return <FuseLoading />
  }


  return (
    <AutoForm
      schema={schema}
      model={addOrUpdate === "ADD" ? { ...acJSON } : selectedData}
      onChangeModel={model => {
        setRowData(model);
        console.log(model, "model");
        if (model?.acAccountdocumentis) {
          if (model?.acAccountdocumentis?.length > 0) {
            var lineTotalAmount = model?.acAccountdocumentis.map(item => parseFloat(item?.amount)).reduce((prev, next) => prev + next);
          }
        }
        if (!!lineTotalAmount) {
          setTotalAmount(lineTotalAmount)
        }
      }}
      onSubmit={model => {
        model.accdocno = "0",
          model = Object.assign(model, {
            amount: TotalAmount, stakeholderid: rowData?.stakeholder?.
              stakeholderid, amountlc: TotalAmount
          });
        delete model.stakeholder
        model = Object.assign(model, { changetime: moment(), createtime: moment(), docdate: moment(), exchangedate: moment() })
        console.log('submitted', model);
        AddOrUpdate(model, addOrUpdate)
      }} >
      <MSCToolbar
        filterSearch={setSearchText}
        viewMode={ViewMode.Read}
        queryList={GetAcAccountDocumenthLazyQuery}
        hideSubmitButton={getViewModeEx === 3 && true}
        SubmitComponnent={
          getViewModeEx === 3 ?
            <MSCButton title={'Delete'}
              onClick={() => { onDeleteButtonClick() }}
            /> : null}
        headerName={t('COLLECTION')}
        ReadModeHeaderComponnent={
          <>
            <MSCButton title={'Search'} onClick={() => {
              getViewModeFuncEx(ViewMode.Search)
              dispatch(changeViewMode(ViewMode.Search))
            }} />
            <MSCButton
              title={'View'}
              disabled={selectedData ? ((Object.keys(selectedData)?.length > 0 ? false : true)) : true}
              onClick={() => {
                dispatch(changeViewMode(ViewMode.Update))
                UpdateButtonClick(selectedData, AddOrUpdateEnum.Update)
              }}
            />
            <MSCButton title={'Add'} onClick={() => {
              setAddOrUpdate(AddOrUpdateEnum.Add); // kayıt modu belirleme
              getViewModeFuncEx(ViewMode.Create)
              dispatch(changeViewMode(ViewMode.Create))
            }}
            />
          </>}
        ReadComponnent={
          <div style={{ width: '100%' }}>
            <MSCReactTable
              selection
              columns={[
                { accessor: (row) => { return moment(row.docdate).format('DD-MM-YYYY') }, Header: t('docdate') },
                { accessor: 'accdocno', Header: t('accdocno') },
                { accessor: (row) => { return row.stakeholder.stakeholdercode }, Header: t('stakeholdercode') },
                { accessor: (row) => { return row.stakeholder.stakeholdername }, Header: t('stakeholdername') },
                { accessor: (row) => { return MSCCurrencyFormatter(row.amount,row?.currency) }, Header: t('amount') },
                { accessor: 'currency', Header: t('currency') },
                { accessor: (row) => { return MSCCurrencyFormatter(row.amountlc,row?.currencylc) }, Header: t('amountlc') },
                { accessor: 'currencylc', Header: t('currencylc') },
              ]}
              data={dataRow}
              SelectRowData={(e) => { setSelectedData(e) }}
              onRowClicked={e => {
                console.log(e.original, "eoriginal")
                DoubleRowClick(e.original, AddOrUpdateEnum.Update)
              }}
              globalFilterTable={(preGlobalFilteredRows, setGlobalFilter, globalFilter) => {
                setFilterGlobal({ ...filterGlobal, setGlobalFilter })
              }}
            />
          </div>
        }
        SearchComponent={
          <MaterialUiGridComp
            children={[
              <MSCTextField label={t('accdocno')} fullWidth onChange={(e) => setFilterParams({ ...filterParams, docno: e.target.value })} />,
              <MSCFilterInputs label={t('stakeholdercode')} fullWidth onChange={(e) => setFilterParams({ ...filterParams, stakeholderCode: { ...filterParams.stakeholderCode, parameter: e.target.value } })}
                onFilterTypeChange={(e) => setFilterParams({ ...filterParams, stakeholderCode: { ...filterParams.stakeholderCode, filterType: e.target.value } })} />,
              <MSCFilterInputs label={t('stakeholdername')} fullWidth onChange={(e) => setFilterParams({ ...filterParams, stakeholderName: { ...filterParams.stakeholderName, parameter: e.target.value } })}
                onFilterTypeChange={(e) => setFilterParams({ ...filterParams, stakeholderName: { ...filterParams.stakeholderName, filterType: e.target.value } })} />,
              <MSCTextField type={'date'} label={t('starttime')} fullWidth onChange={(e) => setFilterParams({ ...filterParams, startdate: e.target.value })} />,
              <MSCTextField type={'date'} label={t('endtime')} fullWidth onChange={(e) => setFilterParams({ ...filterParams, enddate: e.target.value })} />
            ]}
          />
        }
        CreateOrUpdateComponnent={
          <div>
            <Card variant='outlined' sx={{
              boxShadow: 3,
              p: 1,
              m: 1,
            }} >
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {t("Document")}
                </Typography>
                <ErrorField name={'stakeholder'} errorMessage={t('PleaseSelectCustomer')} />
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={12} lg={6} md={6}>
                    <AutoLabelField name="accdocno" disabled={true} />
                  </Grid>
                  <Grid item xs={12} sm={6} lg={6}>
                    <MSCDateLabelField name="docdate"
                      label={t('docdate')}
                      value={moment(rowData?.docdate).format('YYYY-MM-DD')}
                      disabled={getViewModeEx === 2 ? false : true} />
                  </Grid>
                  <Grid item xs={12} sm={12} lg={6} md={6}>
                    <TextLabelField name={'stakeholder.stakeholdername'} label={t('stakeholdername')}
                      disabled={getViewModeEx === 2 ? false : true}
                      onNewButtonClick={() => setNewStakeholderModal(true)}
                      folderIconDisabled={getViewModeEx === 2 ? false : true}
                      newButton={(getViewModeEx === 2 && !rowData?.stakeholder) ? true : false}
                      value={rowData?.stakeholder?.stakeholdername ? rowData?.stakeholder?.stakeholdername : null}
                      onFolderIconClick={() => {
                        getStakeholdersLazyQuery({
                          variables: {
                            prmStakeholderType: 'C'
                          }
                        });
                        setShowStakeholderModal(true);
                      }} />
                  </Grid>
                  <Grid item xs={12} sm={12} lg={6} md={6}>
                    <AutoLabelField name={'stakeholder.stakeholdercode'} label={'stakeholdercode'} disabled />
                  </Grid>
                  <Grid item xs={12} sm={6} lg={6}>
                    <AutoLabelField name="currency" label="currency" options={GetCurrencies(dataCurrencies)} disabled />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            <Card variant='outlined' sx={{ boxShadow: 3, p: 1, m: 1 }} >
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {t("Lines")}
                </Typography>
                <ErrorField name={'acAccountdocumentis'} errorMessage={t('PleaseSelectLine')} />
                <MSCTableField
                  name="acAccountdocumentis"
                  disabled={getViewModeEx === 2 ? false : true}
                  columns={['movementtypes', 'ownercode', 'maturitydate', 'amount', 'currency', 'explanation', '']}
                >
                  <GetAcAccountDocumentIs name="$" getViewModeEx={getViewModeEx} selectedStakeholder={rowData?.stakeholder} />
                </MSCTableField>
                <Typography variant={'subtitle1'} fontWeight={'bold'}>{t('totalamount')} : {MSCCurrencyFormatter(TotalAmount,rowData?.currency)}</Typography>
              </CardContent>
            </Card>

            <Card variant='outlined' sx={{ boxShadow: 3, p: 1, m: 1 }} >
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {t('explanation')}
                </Typography>
                <AutoLabelField name="explanation" disabled={getViewModeEx === 2 ? false : true} />
              </CardContent>
            </Card>
            <ConfirmModal
              handleClose={() => { setShowDeleteModal(false) }}
              showModal={showDeleteModal}
              onYesButtonClick={() => onDeleteModalButtonClick(selectedData?.accdocno, selectedData?.accdocyear, selectedData?.companyid)}
            />
            <NewStakeholderModal
              showModal={newStakeholderModal}
              handleClose={handleCloseNewStakeholderModal}
              dataCurrencies={dataCurrencies}
              type={'C'}
            />
            <StakeholderSelectionDialog
              name={'stakeholder'}
              showModal={showStakeholderModal}
              handleClose={handleCloseStakeholderModal}
              stakeholdertype="C"
            />
          </div>
        }
      />
    </AutoForm>
  );
}

export default Collection; 