import { useTranslation } from 'react-i18next';
import MSCToolbar, { ViewMode } from '../../../@mscComponnent/CRUDPage/MSCToolbar'
import { AutoForm, ErrorField, HiddenField } from 'uniforms-material';
import { bridge as schema } from './uniforms/StockBlockRequestSchema';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getViewModeFunc } from '../../store/mscToolbar/mscToolbarSlice'
import { AddOrUpdateEnum, useAddOrUpdateStockBlockRequesthMutation } from '../../../generated/graphql';
import AutoLabelField from '../../../@mscComponnent/UniformsComponnents/AutoLabelField';
import { Grid, Card, CardContent, Typography } from '@mui/material';
import MSCTableField from '../../../@mscComponnent/UniformsComponnents/MSCTableField'
import moment from 'moment';
import { showMessage } from '../../store/fuse/messageSlice'
import GetStockBlockRequest from './SubComponents/GetStockBlockRequest';
import FuseLoading from '../../../@fuse/core/FuseLoading'

function StockBlockRequest() {
  const { t } = useTranslation();
  const getViewModeFuncEx = useSelector(getViewModeFunc);
  const dispatch = useDispatch();
  const user = useSelector(({ auth }) => auth.user)
  const [addOrUpdate, setAddOrUpdate] = useState(AddOrUpdateEnum.Add);
  const [rowData, setRowData] = useState({});
  const [addOrUpdateStockBlockRequesth, { loading: loadingMutation }] = useAddOrUpdateStockBlockRequesthMutation();

  const AddOrUpdate = (model, addOrUpdateStatus) => {
    addOrUpdateStockBlockRequesth({
      variables: {
        addOrUpdate: addOrUpdateStatus,
        prmStockBlockRequesth: model
      }
    }).then(res => {
      console.log(res, "res");
      if (res.data.addOrUpdateStockBlockRequesth.resultType === "SUC") {
        dispatch(
          showMessage({
            message: 'Kaydedildi',//text or html
            autoHideDuration: 6000,//ms
            anchorOrigin: {
              vertical: 'top',//top bottom
              horizontal: 'right'//left center right
            },
            variant: 'success'//success error info warning null
          }));
        setRowData({});
      }
    })
  }

  if (loadingMutation) {
    return <FuseLoading />
  }

  return (

    <AutoForm
      schema={schema}
      model={{ ...rowData, requesttime: moment() }}
      onChangeModel={(model) => {
        setRowData(model);
        console.log(model, "model");
      }}
      onSubmit={model => {
        delete model.subscription;
        model?.stockblockrequestis?.map(value => {
          delete value.entrydate; delete value.variant; delete value.variantid; delete value.physicalqty;
          delete value.itemcodeNavigation; delete value.availableqty; delete value.invoiceno; delete value.id;
        })
        console.log(model, "submitted");
        AddOrUpdate(model, addOrUpdate);
      }}  >
      <MSCToolbar
        headerName={t('StockBlockRequest')}
        viewMode={ViewMode.Create}
        CreateOrUpdateComponnent={
          <div>
            {/* HiddenFields */}
            <HiddenField name="stockblockrequestid" value={0} />
            {/* Globalden gelecek reduxtan */}
            <HiddenField name="email" value={user.data.email} />
            <HiddenField name="subscriptionsid" value={user.data.subscriptionId} />
            {/* <HiddenField name="requesttime" value={moment().format("HH:MM:ss")} /> */}
            <HiddenField name="rstat" value={"P"} />
            <HiddenField name="approvetime" value={null} />
            <HiddenField name="explanationA" value={""} />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} lg={12} md={12}>
                <Card >
                  <CardContent>
                    <Typography variant="h6">{t('stocks')}</Typography>
                    <ErrorField name={'stockblockrequestis'} errorMessage={t('PleaseSelectStock')} />
                    <MSCTableField
                      name="stockblockrequestis"
                      columns={[t('itemcode'), t('transqty'), t('unit'), t('explanation'), '']}
                    >
                      <GetStockBlockRequest name={'$'} addOrUpdate={addOrUpdate} />
                    </MSCTableField>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={12} lg={12} md={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{t('explanation')}</Typography>
                    <AutoLabelField name={'explanation'} label={t('explanation')} />
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </div>
        }
      />
    </AutoForm>
  );
}

export default StockBlockRequest; 