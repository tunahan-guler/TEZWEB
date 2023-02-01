import React, { useEffect, useState } from 'react'
import { connectField } from 'uniforms'
import { HiddenField, TextField, ErrorField, DateField } from 'uniforms-material'
import { enumMovementTypes, GetCurrencies } from '../../../../@mscComponnent/Global/GlobalFunc'
import { MSCTableCell } from '../../../../@mscComponnent/UniformsComponnents/MSCTableCell'
import moment from 'moment'
import MSCTableRowField from '../../../../@mscComponnent/UniformsComponnents/MSCTableRowField'
import { ListDelField } from 'uniforms-material'
import { TableCell } from '@mui/material'
import { IconButton } from '@material-ui/core'
import FolderIcon from '@mui/icons-material/Folder'
import MSCModal from '../../../../@mscComponnent/Modal/MSCModal'
import { useDispatch, useSelector } from 'react-redux'
import { showMessage } from '../../../store/fuse/messageSlice'
import { useGetAcBankAccountsLazyQuery, useGetAcTillsLazyQuery, useGetCurrenciesQuery } from '../../../../generated/graphql'
import { useTranslation } from 'react-i18next'
import MSCDateField from '../../../../@mscComponnent/MSCInput/MSCDateField'

const GetAcAccountDocumentIs = ({ onChange, value, getViewModeEx, selectedStakeholder }) => {
    const { t } = useTranslation();
    const user = useSelector(({ auth }) => auth.user)
    const [showOwnerModal, setShowOwnerModal] = useState(false);
    const dispatch = useDispatch();
    const handleCloseOwnerModal = () => {
        setShowOwnerModal(false);
    }
    const [getAcTillsLazyQuery, { data: dataAcTills, loading: loadingAcTills }] = useGetAcTillsLazyQuery();
    const [getBankAccountsLazyQuery, { data: dataBankAccounts, loading: loadingBankAccounts }] = useGetAcBankAccountsLazyQuery();
    const { data: dataCurrencies } = useGetCurrenciesQuery()
    useEffect(() => {
        onChange({ ...value, 'createtime': moment(), 'changetime': moment() })
    }, [value?.movementtypeid])

    console.log(dataBankAccounts, "value", dataAcTills);

    return (
        <>

            <HiddenField name={'companyid'} value={1} />
            <HiddenField name={'accdocno'} value={"0"} />
            <HiddenField name={'accdocyear'} value={0} />
            <HiddenField name={'accdocseq'} value={0} />
            <HiddenField name={'dcindicator'} value={"C"} />
            <HiddenField name={'amountlc'} value={value?.amount} />
            <HiddenField name={'accountclassid'} value={value?.movementtypeid === 1 ? 3 : (value?.movementtypeid === 4 ||
                value?.movementtypeid === 8 ? 2 : '')} />
            <HiddenField name={'stakeholderid'} value={selectedStakeholder?.stakeholderid} />
            <HiddenField name={'deleted'} value={false} />
            <HiddenField name={'currency'} value={'TRY'} />
            <HiddenField name={'createuser'} value={user.data.displayName} />
            <HiddenField name={'changeuser'} value={user.data.displayName} />
            <MSCTableRowField >
                <MSCTableCell name={'movementtypeid'} options={enumMovementTypes()} />
                <TableCell style={{ border: '0.5px solid #DCDCDC', height: '5', padding: 0 }} >
                    <TextField
                        label={null}
                        name="ownercode"
                        variant={'standard'}
                        style={{ padding: "0px 5px", margin: "0px" }}
                        disabled
                        InputProps={{
                            disableUnderline: true,
                            endAdornment:
                                <IconButton
                                    size={'small'}
                                    disabled={getViewModeEx === 2 ? false : true}
                                    onClick={() => {
                                        if (value.movementtypeid) {
                                            if (value.movementtypeid === 1) {
                                                getAcTillsLazyQuery({
                                                    variables: {
                                                        tillCode: { filterType: "", parameter: "" },
                                                        tillName: { filterType: "", parameter: "" },
                                                    }
                                                })
                                            }
                                            else if (value.movementtypeid === 4 || value.movementtypeid === 8) {
                                                getBankAccountsLazyQuery({
                                                    variables: {
                                                        bankAccountCode: { filterType: '', parameter: '' },
                                                        bankAccountName: { filterType: '', parameter: '' },
                                                        bankCode: { filterType: '', parameter: '' }
                                                    }
                                                })
                                            }
                                            setShowOwnerModal(true);
                                        }
                                        else {
                                            dispatch(
                                                showMessage({
                                                    message: 'Tahsilat tipi seçiniz.',
                                                    autoHideDuration: 6000,
                                                    anchorOrigin: {
                                                        vertical: 'top',
                                                        horizontal: 'right'
                                                    },
                                                    variant: 'warning'
                                                }))
                                        }
                                    }}>
                                    <FolderIcon />
                                </IconButton>
                        }}
                    />
                </TableCell>
                <TableCell style={{ border: '0.5px solid #DCDCDC', height: '5', padding: 0 }} >
                    <MSCDateField
                        name={'maturitydate'}
                        style={{ padding: "0px 5px", margin: "0px" }}
                        label=""
                        size="small"
                        variant="standard"
                        value={moment(value?.maturitydate).format('YYYY-MM-DD')}
                        InputProps={{ disableUnderline: true }}
                    />
                </TableCell>
                {getViewModeEx === 3 ? <MSCTableCell name={'amount'} value={value?.amount?.toFixed(2)} /> :
                    <MSCTableCell name={'amount'} />}

                <MSCTableCell name={'currency'} options={GetCurrencies(dataCurrencies)} disabled />
                <MSCTableCell name={'explanation'} />
                <TableCell align="center" style={{ border: '0.5px solid #DCDCDC', height: '5', padding: 0 }} >
                    <ListDelField name="" size={'small'} variant="standard" InputProps={{ disableUnderline: true }}
                        style={{ padding: "0px 5px", margin: "0px" }} />
                </TableCell>
            </MSCTableRowField>
            <MSCTableRowField>
                <TableCell style={{ border: '0.5px solid #DCDCDC', height: '0', padding: '0px 16px 0px 16px' }} padding='0' colSpan={'100%'}>
                    <ErrorField name={'movementtypeid'} errorMessage={t('PleaseSelectMovementType')} />
                    <ErrorField name={'ownercode'} errorMessage={t('PleaseSelectOwnerCode')} />
                    <ErrorField name={'maturitydate'} errorMessage={t('MaturityDateisRequired')} />
                    <ErrorField name={'amount'} errorMessage={t('AmountisRequired')} />
                </TableCell>
            </MSCTableRowField>
            <MSCModal
                loading={loadingBankAccounts ? loadingBankAccounts : loadingAcTills ? loadingAcTills : false}
                visibleColumns={value.movementtypeid === 1 ? ['tillcode', 'tillname'] : ['bankaccountcode', 'bankaccountname']}
                dataSource={value.movementtypeid === 1 ? dataAcTills?.acTillsWithFilter :
                    value.movementtypeid === 8 || value.movementtypeid === 4 ? dataBankAccounts?.acBankaccountsWithFilterType : []}
                showModal={showOwnerModal}
                handleClose={handleCloseOwnerModal}
                SelectRowData={(rowData) => {
                    if (rowData) {
                        onChange({
                            ...value, ownercode: rowData?.tillcode ? rowData?.tillcode : rowData?.bankaccountcode, maturitydate: moment()
                        })
                        handleCloseOwnerModal();
                    }
                }}
            />
        </>
    )
}

export default connectField(GetAcAccountDocumentIs)