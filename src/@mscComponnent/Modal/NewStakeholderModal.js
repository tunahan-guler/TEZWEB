import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ViewMode } from '../CRUDPage/MSCToolbar'
import { AutoForm, AutoField, HiddenField, ListDelField, SubmitField } from 'uniforms-material';
import { bridge as schema } from '../UniformsSchema/StakeholderSchema';
import { AddOrUpdateEnum, useAddOrUpdateStakeholderMutation, useGetCountriesLazyQuery, useGetCitiesLazyQuery } from '../../generated/graphql'
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { GetCities, GetCountries, GetCurrencies, MSCMessage } from '../Global/GlobalFunc'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Slide from '@mui/material/Slide';
import { Card, CardContent, Grid, Tabs, Tab, Box, Typography, TableCell, Divider, IconButton, DialogContent, DialogTitle, DialogActions, DialogContentText, Toolbar } from '@mui/material';
import MSCLookup from '../MSCInput/MSCLookup';
import AutoLabelField from '../UniformsComponnents/AutoLabelField'
import MSCTableField from '../UniformsComponnents/MSCTableField';
import MSCTableRowField from '../UniformsComponnents/MSCTableRowField';
import { MSCTableCell } from '../UniformsComponnents/MSCTableCell';
import { connectField, useForm } from 'uniforms';
import CloseIcon from '@mui/icons-material/Close'


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-force-tabpanel-${index}`}
            aria-labelledby={`scrollable-force-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `scrollable-force-tab-${index}`,
        'aria-controls': `scrollable-force-tabpanel-${index}`,
    };
}

function NewStakeholderModal(props) {
    const [value, setValue] = useState(0);
    const [customerType, setCustomerType] = useState('I');
    const uniform = useForm();
    const StakeholderJSON = {
        currency: "TRY",
        stakeholdertype: props.type,
        shadbook: {
            countrykey: 'TR'
        }
    }
    const autoFormRef = useRef();
    const [getCountriesLazyQuery, { data: dataCountries }] = useGetCountriesLazyQuery();
    const [getCitiesLazyQuery, { data: dataCities }] = useGetCitiesLazyQuery();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const { t } = useTranslation();
    const dispatch = useDispatch();

    const [rowData, setRowData] = useState({})

    useEffect(() => {
        if (props.showModal === false) {
            setRowData({});
        }
        if (props.showModal === true) {
            getCountriesLazyQuery();
        }
    }, [props.showModal]);

    useEffect(() => {
        if (rowData?.shadbook?.countrykey) {
            getCitiesLazyQuery({
                variables: {
                    prmCountryKey: rowData?.shadbook?.countrykey
                }
            })
        }
    }, [rowData?.shadbook?.countrykey])

    const [addOrUpdateStakeholderMutation, { data: dataMutation }] = useAddOrUpdateStakeholderMutation();

    const AddOrUpdate = (model, addOrUpdateStatus) => {
        console.log(model, "model");
        addOrUpdateStakeholderMutation({
            variables: {
                addOrUpdate: addOrUpdateStatus,
                prmStakeholder: model
            }
        }).then(res => {
            console.log(res, "res");
            if (res.data.addOrUpdateStakeholder.resultType === "SUC") {
                MSCMessage(dispatch, 'success', "Kaydedildi.")
                setRowData({});
                uniform.onChange('stakeholder', res.data.addOrUpdateStakeholder.data);
                props.handleClose();
            } else {
                MSCMessage(dispatch, 'error', "Hata Oluştu.");
            }
        })
            .catch(err => console.log(err, "err"));
    }

    return (

        <Dialog
            fullScreen
            TransitionComponent={Transition}
            open={props.showModal}
            onClose={props.handleClose}
            scroll={'paper'}
            style={{ height: '90%' }}
        >
            <DialogTitle style={{ padding: 0, margin: 0 }}>
                <AppBar sx={{ position: "relative" }}>
                    <Toolbar style={{ justifyContent: "space-between" }}>
                        {props.type === "C" ? "Müşteri Oluştur" : 'Tedarikçi Oluştur'}
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={props.handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </DialogTitle>
            <DialogContent dividers={scroll === 'paper'}>
                <AutoForm
                    ref={autoFormRef}
                    schema={schema}
                    model={{ ...StakeholderJSON }}
                    onChangeModel={(model) => {
                        setRowData(model);
                        // console.log(model, "model");
                    }}
                    onSubmit={(model) => {
                        console.log(model, "model");
                        AddOrUpdate(model, AddOrUpdateEnum.Add);
                    }}
                >
                    <Divider />
                    <DialogContent>
                        <Card>
                            <CardContent>
                                {/* HIDDEN FIELDS */}
                                <HiddenField name={'stakeholderid'} value={0} />
                                <HiddenField name={'tradetype'} value={customerType} />
                                <HiddenField name={'risklimit'} value={0} />
                                <HiddenField name="shadbook.shadbookid" value={0} />
                                <HiddenField name="shadbook.shadtype" value={customerType} />
                                <Grid container spacing={1}>
                                    <Grid item xs={12} sm={12} lg={6} md={6}>
                                        <MSCLookup options={[{ label: t('Individual'), value: "I" }, { label: t('Corporate'), value: 'C' }]}
                                            value={customerType} onChange={(e) => setCustomerType(e.target.value)} />
                                    </Grid>
                                    <Grid item xs={12} sm={12} lg={6} md={6}>
                                        <AutoLabelField name={'stakeholdertype'} label={props.type === "C" ? t('stakeholdertype') : t('suppliertype')} options={[{ label: t(props.type), value: props.type },
                                        { label: t('X'), value: 'X' }]} />
                                    </Grid>
                                    <Grid item xs={12} sm={12} lg={6} md={6}>
                                        <AutoLabelField name={'stakeholdername'} label={props.type === "C" ? t('stakeholdername') : t('suppliername')} />
                                    </Grid>
                                    <Grid item xs={12} sm={12} lg={6} md={6}>
                                        <AutoLabelField name={'stakeholdercode'} disabled label={props.type === "C" ? t('stakeholdercode') : t('suppliercode')} />
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                        <AppBar position="static" color="default" style={{ textAlign: "center", justifyContent: "center", marginTop: 15 }}>
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                variant="fullWidth"
                                scrollButtons="on"
                                indicatorColor="primary"
                                textColor="primary"
                                aria-label="ant example"
                            >

                                <Tab label={t('RequiredFields')} {...a11yProps(2)} />
                                <Tab label={t('AdditionalFields')} {...a11yProps(1)} />
                                <Tab label={t('contactinformation')}  {...a11yProps(0)} />
                            </Tabs>
                        </AppBar>
                        <TabPanel value={value} index={0}>
                            <Grid container spacing={1}>
                                <Grid item xs={12} sm={12} lg={12} md={12}>
                                    <Grid container
                                        direction="row"
                                        alignItems="center"
                                        justifyContent="center"
                                        spacing={2}
                                        style={{ padding: '2px' }}
                                    >
                                        <Grid item xs={4} sm={4} lg={2} md={2}>
                                            <Typography mt={2}>
                                                {t('address')}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={8} sm={8} lg={10} md={10}>
                                            <AutoField size="small" label="" name={'shadbook.address'} inputProps={{ maxLength: 250 }} />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} sm={12} lg={6} md={6}>
                                    <AutoLabelField name="shadbook.countrykey" label={t('country')} options={GetCountries(dataCountries)}
                                        itemProps={{ inputProps: { maxLength: 2 } }} />
                                </Grid>
                                <Grid item xs={12} sm={12} lg={6} md={6}>
                                    <AutoLabelField name="shadbook.city" label={t('city')} options={GetCities(dataCities)} />
                                </Grid>
                                <Grid item xs={12} sm={12} lg={6} md={6}>
                                    <AutoLabelField name="shadbook.county" label={t('county')} />
                                </Grid>
                                <Grid item xs={12} sm={12} lg={6} md={6}>
                                    <AutoLabelField name="shadbook.phone" label={t('phone')} itemProps={{ inputProps: { maxLength: 15 } }} />
                                </Grid>
                                <Grid item xs={12} sm={12} lg={6} md={6}>
                                    <AutoLabelField name="currency" options={GetCurrencies(props.dataCurrencies)} label={t('currency')} />
                                </Grid>
                                <Grid item xs={12} sm={12} lg={6} md={6}>
                                    <AutoLabelField name="paymentterm" label={t('paymentterm')} itemProps={{ inputProps: { maxLength: 4 } }} />
                                </Grid>
                                {
                                    customerType === "I" ?
                                        <>
                                            <Grid item xs={12} sm={12} lg={6} md={6}>
                                                <AutoLabelField name="identityno" label={t('identityno')} itemProps={{ inputProps: { maxLength: 11 } }} />
                                            </Grid>
                                        </> : <>
                                            <Grid item xs={12} sm={12} lg={6} md={6}>
                                                <AutoLabelField name="taxno" label={t('taxno')} />
                                            </Grid>
                                            <Grid item xs={12} sm={12} lg={6} md={6}>
                                                <AutoLabelField name="taxoffice" label={t('taxoffice')} />
                                            </Grid>
                                        </>
                                }
                            </Grid>
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <Grid container spacing={1}>
                                <Grid item xs={12} sm={12} lg={6} md={6}>
                                    <AutoLabelField name={'shcategory'} label={t('Category')} />
                                </Grid>
                                <Grid item xs={12} sm={12} lg={6} md={6}>
                                    <AutoLabelField name="shadbook.fax" label={t('fax')} itemProps={{ inputProps: { maxLength: 15 } }} />
                                </Grid>
                                <Grid item xs={12} sm={12} lg={6} md={6}>
                                    <AutoLabelField name="shadbook.email" label={t('Email')} />
                                </Grid>
                                <Grid item xs={12} sm={12} lg={6} md={6}>
                                    <AutoLabelField name="shadbook.postcode" label={t('postcode')} itemProps={{ inputProps: { maxLength: 10 } }} />
                                </Grid>
                            </Grid>
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            <Grid item xs={12} sm={12} lg={12} md={12}>
                                <Typography style={{ fontWeight: 'bolder' }} mt={'1%'}>{t('contactinformation')}</Typography>

                                <MSCTableField
                                    name="stakeholdercontacts"
                                    columns={[`${t('contactname')}`, `${t('contactemail')}`, `${t('contactmobile')}`,
                                    `${t('contactphone')}`, `${t('contactrole')}`, `${t('contactnotes')}`, '']}
                                >
                                    <MSCTableRowField name="$">
                                        <HiddenField name={'contactid'} value={0} />
                                        <HiddenField name={'stakeholderid'} value={0} />
                                        <MSCTableCell name={'contactname'} />
                                        <MSCTableCell name={'contactemail'} />
                                        <MSCTableCell name={'contactmobile'} />
                                        <MSCTableCell name={'contactphone'} />
                                        <MSCTableCell name={'contactrole'} />
                                        <MSCTableCell name={'contactnotes'} />
                                        <TableCell align="center" style={{ border: '0.5px solid #DCDCDC', height: '5', padding: 0 }} >
                                            <ListDelField style={{ padding: "0px 5px", margin: "0px" }} />
                                        </TableCell>
                                    </MSCTableRowField>
                                </MSCTableField>
                            </Grid>
                        </TabPanel>
                    </DialogContent>
                </AutoForm>
            </DialogContent>
            <Divider />
            <DialogActions>
                <SubmitField label={t('Add')} onClick={() => autoFormRef.current.onSubmit()}/>
            </DialogActions>
        </Dialog>
    );
}

export default connectField(NewStakeholderModal); 