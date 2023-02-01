import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Grid } from '@mui/material';
import MSCTableField from '../../../../@mscComponnent/UniformsComponnents/MSCTableField';
import { useTranslation } from 'react-i18next';
import AddStock from './AddStock';
import MSCTextField from '../../../../@mscComponnent/MSCInput/MSCTextField'

export default function AddStockModal(props) {
    const { t } = useTranslation();
    const [remainingProduct, setRemainingProduct] = useState(0);
    useEffect(() => {
        setRemainingProduct(props?.showModal?.data);
    }, [props?.showModal?.data])


    useEffect(() => {
        var totalSelectedQuantity = 0;
        for (var i = 0; i < props?.selectedRow?.length; i++) {
            totalSelectedQuantity += props?.selectedRow[i]?.transqty;
        }
        if (parseInt(props?.showModal?.data) - parseInt(totalSelectedQuantity) >= 0)
            setRemainingProduct(parseInt(props?.showModal?.data) - parseInt(totalSelectedQuantity));
        else {
            setRemainingProduct(0);
        }
    }, [props?.selectedRow]);
    return (
        <div>
            <Dialog
                fullScreen
                open={props.showModal.open}
                onClose={props.handleClose}
                style={{ height: '80%' }}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <Button autoFocus color="inherit" onClick={props.saveButtonClick}>
                            {t('Save')}
                        </Button>
                        <IconButton
                            style={{ marginLeft: 'auto' }}
                            edge="start"
                            color="inherit"
                            onClick={props.exitButtonClick}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Grid container spacing={1} padding={2}>
                    <Grid item xs={12} sm={12} lg={12} md={12}>
                        {
                            props?.showModal?.data ?
                                <p style={{ textAlign: 'right' }}><span style={{ color: 'red', fontSize: 'large' }}>{t('RemainingProduct')} : {remainingProduct}</span></p>
                                : null}
                        <MSCTextField label={t('itemname')} disabled value={props.itemname} />
                    </Grid>
                    <Grid item xs={12} sm={12} lg={12} md={12}>
                        <MSCTableField
                            name="invoicedstocks"
                            columns={[t('serialno'), t('batchno'), t('quantity')]}
                        >
                            <AddStock itemcode={props.itemcode} name={'$'} />
                        </MSCTableField>
                    </Grid>
                </Grid>
            </Dialog>
        </div>
    );
}