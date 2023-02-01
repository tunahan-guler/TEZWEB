import { useTranslation } from 'react-i18next';
import MSCToolbar, { ViewMode } from '../../../@mscComponnent/CRUDPage/MSCToolbar'
import { AutoForm, ErrorField, ErrorsField, HiddenField } from 'uniforms-material';
import { bridge as schema } from './uniforms/StockTransferSchema';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getViewModeFunc } from '../../store/mscToolbar/mscToolbarSlice'
import { AddOrUpdateEnum, useGetSubscriptionLazyQuery, useAddOrUpdateStockTransferHMutation } from '../../../generated/graphql';
import AutoLabelField from '../../../@mscComponnent/UniformsComponnents/AutoLabelField';
import TextLabelField from '../../../@mscComponnent/UniformsComponnents/TextLabelField';
import { Grid, Card, CardContent, Typography } from '@mui/material';
import MSCTableField from '../../../@mscComponnent/UniformsComponnents/MSCTableField'
import SubscriptionSelectionModal from './SubComponents/SubscriptionSelectionModal';
import GetStockTransferIs from './SubComponents/GetStockTransferIs';
import moment from 'moment';
import FuseLoading from '../../../@fuse/core/FuseLoading'
import { MSCMessage } from '../../../@mscComponnent/Global/GlobalFunc';


function StockShipping() {
  const { t } = useTranslation();
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const dispatch = useDispatch();
  const [addOrUpdate, setAddOrUpdate] = useState(AddOrUpdateEnum.Add);
  const [rowData, setRowData] = useState({});
  const [getSubscriptionLazyQuery, { data: dataSubscription, loading: loadingSubscription }] = useGetSubscriptionLazyQuery();
  const [addOrUpdateStockTransferH, { loading: loadingMutation }] = useAddOrUpdateStockTransferHMutation();
  const user = useSelector(({ auth }) => auth.user)

  const handleCloseSubscriptionModal = () => {
    setShowSubscriptionModal(false);
  }

  const AddOrUpdate = (model, addOrUpdateStatus) => {
    addOrUpdateStockTransferH({
      variables: {
        addOrUpdate: addOrUpdateStatus,
        prmStockTransferh: model
      }
    }).then(res => {
      console.log(res, "res");
      if (res.data.addOrUpdateStocktransferh.resultType === "SUC") {
        MSCMessage(dispatch, 'success', "Kaydedildi.");
        setRowData({});
      } else {
        MSCMessage(dispatch, 'error', 'Hata Oluştu')
      }
    })
      .catch(err => console.log(err, "err"))
  }

  if (loadingMutation) {
    return <FuseLoading />
  }

  return (

    <AutoForm
      schema={schema}
      model={{ ...rowData, sendtime: moment() }}
      onChangeModel={(model) => {
        setRowData(model);
        console.log(model, "modelihnho")
      }}
      onSubmit={model => {
        delete model.subscription;
        model?.stocktransferis?.map(value => {
          delete value.entrydate; delete value.variant; delete value.variantid; delete value.physicalqty;
          delete value.itemcodeNavigation; delete value.availableqty; delete value.invoiceno; delete value.id;
        })
        console.log(model, "submitted");
        AddOrUpdate(model, addOrUpdate);
      }}  >
      <MSCToolbar
        headerName={t('StockShipping')}
        viewMode={ViewMode.Create}
        CreateOrUpdateComponnent={
          <div>
            {/* HiddenFields */}
            <HiddenField name="subscriptionsidR" value={rowData?.subscription?.subscriptionsId} />
            <HiddenField name="transferid" value={0} />
            {/* Globalden gelecek reduxtan */}
            <HiddenField name="emailS" value={user.data.email} />
            <HiddenField name="subscriptionsidS" value={user.data.subscriptionId} />
            {/* <HiddenField name="sendtime" value={moment().format("HH:mm:ss")} /> */}
            <HiddenField name="tstat" value={"P"} />
            <HiddenField name="accepttime" value={null} />
            <HiddenField name="emailR" value={""} />
            <HiddenField name="explanationR" value={""} />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} lg={12} md={12}>
                <Card>
                  <CardContent>
                    <Grid container spacing={1}>
                      <ErrorsField />
                      <Grid item xs={12} sm={12} lg={6} md={6}>
                        <TextLabelField
                          label={t('subscriptionsId')}
                          name={'subscription.subscriptionsId'}
                          value={rowData?.subscription?.subscriptionsId}
                          onChange={(e) => onChange({ ...value, 'stakeholder.stakeholdername': e })}
                          onFolderIconClick={() => {
                            getSubscriptionLazyQuery();
                            setShowSubscriptionModal(true);
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} lg={6} md={6}>
                        <AutoLabelField name="subscription.companyName" label={t('companyName')} disabled />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={12} lg={12} md={12}>
                <Card >
                  <CardContent>
                    <Typography variant="h6">{t('stocks')}</Typography>
                    <MSCTableField
                      name="stocktransferis"
                      columns={[t('itemcode'), t('transqty'), t('unit'), '']}
                    >
                      <GetStockTransferIs name={'$'} addOrUpdate={addOrUpdate} />
                    </MSCTableField>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={12} lg={12} md={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{t('explanation')}</Typography>
                    <AutoLabelField name={'explanationS'} label={t('explanation')} />
                  </CardContent>
                </Card>
              </Grid>
              <SubscriptionSelectionModal
                name={'subscription'}
                loading={loadingSubscription}
                showModal={showSubscriptionModal}
                handleClose={handleCloseSubscriptionModal}
                subscriptionData={dataSubscription?.subscription}
              />
            </Grid>
          </div>
        }
      />
    </AutoForm>
  );
}

export default StockShipping; 