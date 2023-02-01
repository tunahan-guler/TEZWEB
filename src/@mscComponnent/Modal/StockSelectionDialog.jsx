import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { connectField } from 'uniforms';
import { useGetStocksLazyQuery } from '../../generated/graphql';
import { GetRowAndColumn } from '../Global/GlobalFunc';
import MaterialUiGridComp from '../MaterialuiGrid/MaterialUiGridComp';
import MSCTextField from '../MSCInput/MSCTextField';
import { MSCReactTable } from '../MSCReactTable/MSCReactTable';
import MSCDialogWithDrawer from './MSCDialogWithDrawer'
import moment from 'moment'

const StockSelectionDialog = (props) => {
    const { t } = useTranslation();
    const visibleColumns = ['itemcode', 'entrydate', 'quantity', 'baseunit'];
    const [dataStock, setDataStock] = useState([]);
    const [remainingProduct, setRemainingProduct] = useState(0);
    const [getStocksLazyQuery, { data, loading, error }] = useGetStocksLazyQuery();
    const [filterParams, setFilterParams] = useState({
        serialno: ""
    })

    let gridData = GetRowAndColumn(data?.stocks, visibleColumns);

    useEffect(() => {
        setRemainingProduct(props?.showModal?.data);
    }, [props?.showModal?.data])

    useEffect(() => {
        var newData = gridData.rows
        newData.map(val => { val.transqty = val.availableqty; val.id = 0; val.seqno = 0; val.invoiceno = 0; });
        setDataStock(newData)
    }, [data]);

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

    const GetStocks = () => {
        getStocksLazyQuery({
            variables: {
                itemCode:{filterType:'equal', parameter:props?.value?.itemcode},
                itemName:{filterType:"", parameter:""},
                serialNo: {filterType:'equal', parameter:filterParams.serialno}
            }
        })
        setFilterParams({
            serialno: ""
        })
    }


    return (
        <MSCDialogWithDrawer
            openDialog={props.showModal?.open}
            handleCloseDialog={props.handleClose}
            hasSaveButton={true}
            SaveButtonClick={props.SaveButtonClick}
            dialogChildren={
                <Grid container spacing={1} padding={2}>
                    <Grid item xs={12} sm={12} lg={12} md={12}>
                        {
                            props?.showModal?.data ?
                                <p style={{ textAlign: 'right' }}><span style={{ color: 'red', fontSize: 'large' }}>{t('RemainingProduct')} : {remainingProduct}</span></p>
                                : null}
                        <MSCTextField label={t('itemname')} disabled value={
                            data?.stocks ? data?.stocks[0]?.itemcode : ''} />
                    </Grid>
                    <Grid item xs={12} sm={12} lg={12} md={12}>
                        <MSCTextField label={t('itemname')} disabled value={
                            data?.stocks ? data?.stocks[0]?.itemcodeNavigation.itemname : ''} />
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
                </Grid>}
            drawerChildren={<MaterialUiGridComp
                children={[
                    <MaterialUiGridComp
                        children={[
                            <MSCTextField label={t('serialno')} fullWidth onChange={(e) => setFilterParams({ ...filterParams, serialno: e.target.value })} />
                        ]}
                    />
                ]}
            />}
            onFilterButtonClick={GetStocks}
            loading={loading}
        />
    )
}

export default connectField(StockSelectionDialog)