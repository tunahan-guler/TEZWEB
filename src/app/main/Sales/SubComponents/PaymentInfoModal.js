import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { connectField, useForm } from 'uniforms';
import { AutoField, HiddenField, DateField, ListField, ListItemField } from 'uniforms-material';
import { Box } from '@mui/system';
import { Grid, Card, CardContent, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import AddIcon from '@mui/icons-material/Add'
import GetPaymentPlanLine from './GetPaymentPlanLine';
import Slide from '@mui/material/Slide';
import MSCTableField from '../../../../@mscComponnent/UniformsComponnents/MSCTableField'
import AutoLabelField from '../../../../@mscComponnent/UniformsComponnents/AutoLabelField';
import SelectLabelField from '../../../../@mscComponnent/UniformsComponnents/SelectLabelField';
import DateLabelField from '../../../../@mscComponnent/UniformsComponnents/DateLabelField';
import MSCDateLabelField from '../../../../@mscComponnent/UniformsComponnents/MSCDateLabelField';
import { MSCCurrencyFormatter } from '../../../../@mscComponnent/Global/GlobalFunc';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const PaymentInfoModal = (props) => {
    const uniforms = useForm();
    const { t } = useTranslation();
    let paymentplanlines = [];
    let totalLineAmount = 0;

    const AddDateOperation = (date, operation, add) => {
        if (operation === 'd') {
            const copy = new Date(Number(date))
            copy.setDate(date.getDate() + add)
            return copy;
        }
        else if (operation === 'm') {
            const copy = new Date(Number(date))
            copy.setMonth(date.getMonth() + add)
            return copy;
        }
    }

    const onButtonClick = () => {
        var datecontrol;
        for (let i = 0; i < props.value.installmentcount; i++) {
            if (!datecontrol) {
                datecontrol = props?.value?.initialpaymentdate ? props?.value?.initialpaymentdate : new Date();
            }
            else {
                datecontrol = AddDateOperation(datecontrol, props.value.installmentperiodunit, props.value.installmentperiod);
            }
            paymentplanlines[i] = {
                paymentdate: datecontrol,
                invoiceno: 0,
                amount: parseFloat(props.gTotalCalculation / props.value.installmentcount),
                paidamount: 0,
                paymentplanid: 0,
                currency: 'TRY'
            };
        }
        props.onChange({ ...props.value, 'invoicepaymentplanlines': paymentplanlines });
    }

    for (let i = 0; i < props?.value?.invoicepaymentplanlines?.length; i++) {
        totalLineAmount += props?.value?.invoicepaymentplanlines[i].amount
    }

    useEffect(() => {
        if (props?.showModal) {
            props.onChange({ ...props.value, 'initialpaymentdate': new Date() })
        }
    }, [props?.showModal])

    return (
        <div>
            <Dialog
                fullScreen
                open={props.showModal}
                onClose={props.handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <Button autoFocus color="inherit" onClick={props.handleClose} >
                            {t('Save')}
                        </Button>
                        <IconButton
                            edge="start"
                            color="inherit"
                            style={{ marginLeft: 'auto' }}
                            onClick={() => {
                                props.onChange({ ...props.value, 'invoicepaymentplanlines': [] });
                                paymentplanlines = []
                                props.handleClose();
                                uniforms.onChange('invoicepaymentplan', null)
                            }}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Box paddingRight={'10%'} paddingLeft={'10%'} paddingTop={'2%'} paddingBottom={'2%'}>
                    <p style={{ float: 'right', fontWeight: 'bold', fontSize: 15 }}>{t('Balance')} {MSCCurrencyFormatter((props.gTotalCalculation - totalLineAmount),"TRY")}</p>
                    <HiddenField name={'invoiceno'} value={0} />
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={12} lg={12} md={12}>
                            <AutoLabelField name={'installmentperiod'} label={t('installmentperiod')} />
                        </Grid>
                        <Grid item xs={12} sm={12} lg={12} md={12}>
                            <SelectLabelField name={'installmentperiodunit'} label={t('installmentperiodunit')} options={[
                                { label: `${t('day')}`, value: 'd' },
                                { label: `${t('month')}`, value: 'm' },
                            ]} />
                        </Grid>
                        <Grid item xs={12} sm={12} lg={12} md={12}>
                            <MSCDateLabelField name={'initialpaymentdate'} value={moment(props?.value?.initialpaymentdate).format('YYYY-MM-DD')} />
                        </Grid>
                        <Grid item xs={12} sm={12} lg={12} md={12}>
                            <AutoLabelField name={'installmentcount'} label={t('installmentcount')} />
                        </Grid>
                        <Grid item xs={12} sm={12} lg={12} md={12}>

                            <AutoLabelField name={'explanation'} label={t('explanation')} />
                        </Grid>
                        <Grid item xs={12} sm={12} lg={4} md={4}>
                            <Button onClick={onButtonClick}
                                color={'primary'} variant={'contained'} endIcon={<AddIcon />}>{t('AddPayment')}</Button>
                        </Grid>
                        <Grid item xs={12} sm={12} lg={12} md={12}>
                            <Card >
                                <CardContent>
                                    <MSCTableField
                                        name="invoicepaymentplanlines"
                                        columns={[t('paymentdate'), t('currency'), t('amount')]}
                                        disabled={true}
                                        addIcon={null}
                                    >
                                        <GetPaymentPlanLine name={'$'} dataCurrencies={props.dataCurrencies} />
                                    </MSCTableField>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>
            </Dialog>
        </div>
    );
}

export default connectField(PaymentInfoModal)