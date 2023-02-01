import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { GetRowAndColumn } from '../Global/GlobalFunc';
import Slide from '@mui/material/Slide';
import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { MSCReactTable } from '../MSCReactTable/MSCReactTable';
import MSCTextField from '../MSCInput/MSCTextField'
import moment from 'moment';
import FuseLoading from '../../@fuse/core/FuseLoading'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

export default function StockSelectionModal(props) {
    const { t } = useTranslation();
    const visibleColumns = ['itemcode', 'entrydate', 'quantity', 'baseunit'];
    const [dataStock, setDataStock] = useState([]);
    const [remainingProduct, setRemainingProduct] = useState(0);
    let gridData = GetRowAndColumn(props.dataSource, visibleColumns);
    useEffect(() => {
        setRemainingProduct(props?.showModal?.data);
    }, [props?.showModal?.data])

    useEffect(() => {
        var newData = gridData.rows
        newData.map(val => { val.transqty = val.availableqty; val.id = 0; val.seqno = 0; val.invoiceno = 0; });
        setDataStock(newData)
    }, [props?.dataSource]);

    useEffect(() => {
        var totalSelectedQuantity = 0;
        for (var i = 0; i < props?.selectedRow?.length; i++) {
            totalSelectedQuantity += props?.selectedRow[i].transqty;
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
                TransitionComponent={Transition}
                open={props.showModal.open}
                onClose={props.handleClose}
                style={{ height: '80%' }}
            >
                {props?.loading ? <FuseLoading /> : <>
                    <AppBar sx={{ position: 'relative' }}>
                        <Toolbar>
                            <Button autoFocus color="inherit" onClick={props.SaveButtonClick ? props.SaveButtonClick : props.handleClose}>
                                {t('Save')}
                            </Button>
                            <IconButton
                            style={{marginLeft:'auto'}}
                                edge="end"
                                color="inherit"
                                onClick={props.handleClose}
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
                            <MSCTextField label={t('itemname')} disabled value={
                                props.dataSource ? props?.dataSource[0]?.itemcode : ''} />
                        </Grid>
                        <Grid item xs={12} sm={12} lg={12} md={12}>
                            <MSCTextField label={t('itemname')} disabled value={
                                props.dataSource ? props?.dataSource[0]?.itemcodeNavigation.itemname : ''} />
                        </Grid>
                        <Grid item xs={12} sm={12} lg={12} md={12}>
                            <MSCReactTable
                                multipleSelection
                                columns={[
                                    { accessor: 'serialno', Header: t('serialno') },
                                    { accessor: 'batchno', Header: t('batchno') },
                                    { accessor: (row) => { return moment(row.entrydate).format('DD-MM-YYYY') }, Header: t('EntryDate') },
                                    { accessor: 'availableqty', Header: t('AvailableQty') },
                                    { accessor: (row) => { return row?.itemcodeNavigation?.unitsale }, Header: t('UnitSale') },
                                    { accessor: 'transqty', Header: t('SelectedAmount') },
                                ]}
                                data={dataStock}
                                SelectRowData={props.SelectRowData}
                            />
                        </Grid>
                    </Grid></>}

            </Dialog>
        </div>
    );
}