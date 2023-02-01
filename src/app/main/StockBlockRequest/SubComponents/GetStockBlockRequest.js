import { TableCell } from '@mui/material'
import { connectField } from 'uniforms'
import { ListDelField, ErrorField, HiddenField, TextField } from 'uniforms-material'
import { useTranslation } from 'react-i18next'
import { MSCTableCell } from '../../../../@mscComponnent/UniformsComponnents/MSCTableCell'
import MSCTableRowField from '../../../../@mscComponnent/UniformsComponnents/MSCTableRowField'
import { GetUnits, MSCMessage } from '../../../../@mscComponnent/Global/GlobalFunc'
import FolderIcon from '@mui/icons-material/Folder'
import { useGetItemMastersLazyQuery, useGetStocksLazyQuery, useGetUnitsLazyQuery } from '../../../../generated/graphql'
import StockSelectionModal from '../../../../@mscComponnent/Modal/StockSelectionModal'
import React, { useEffect, useState } from 'react'
import { IconButton } from '@material-ui/core'
import MSCModal from '../../../../@mscComponnent/Modal/MSCModal'
import { useForm } from 'uniforms'
import { useDispatch } from 'react-redux'

const GetStockBlockRequest = ({ onChange, value, addOrUpdate }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [selectedItem, setSelectedItem] = useState({});
    const [showStockSelectionModal, setShowStockSelectionModal] = useState({ open: false, data: null });
    const [showItemSelectionModal, setShowItemSelectionModal] = useState(false);
    const [getItemMastersLazyQuery, { data: dataItemMasters, loading:loadingItemMasters }] = useGetItemMastersLazyQuery();
    const [getStocksLazyQuery, { data: dataStocks }] = useGetStocksLazyQuery();
    const [getUnitsLazyQuery, { data: dataUnits }] = useGetUnitsLazyQuery();
    const uniforms = useForm();
    const handleCloseStockSelectionModal = () => {
        setShowStockSelectionModal({ open: false, data: null });
    }

    const handleCloseItemSelectionModal = () => {
        setShowItemSelectionModal(false);
    }

    useEffect(() => {
        if (addOrUpdate === "ADD") {
            getUnitsLazyQuery();
        }
    }, [addOrUpdate]);

    return (
        < >
            <MSCTableRowField >
                <TableCell style={{ border: '0.5px solid #DCDCDC', height: '5', padding: 0 }} >
                    <TextField
                        disabled
                        label={null}
                        name="itemcode"
                        variant={'standard'}
                        style={{ padding: "0px 5px", margin: "0px" }}
                        value={selectedItem?.itemcode ? selectedItem?.itemcode : value?.itemcode}
                        InputProps={{
                            disableUnderline: true,
                            endAdornment:
                                <IconButton
                                    disabled={addOrUpdate === "ADD" ? false : true}
                                    size={'small'}
                                    onClick={() => {
                                        getItemMastersLazyQuery({
                                            variables: {
                                                itemtypecode: ""
                                            }
                                        })
                                        setShowItemSelectionModal(true);
                                    }}>
                                    <FolderIcon />
                                </IconButton>
                        }}
                    />
                </TableCell>
                <MSCTableCell name={'transqty'} disabled />
                <MSCTableCell name={'unit'} options={GetUnits(dataUnits)} disabled />
                <MSCTableCell name={'explanationA'} disabled={false} />
                <TableCell align="center" style={{ border: '0.5px solid #DCDCDC', height: '5', padding: 0 }}>
                    <IconButton size={'small'}
                        onClick={() => {
                            getStocksLazyQuery({
                                variables: {
                                    itemCode:{filterType:'equal', parameter:selectedItem?.itemcode ? selectedItem?.itemcode : '*'},
                                    itemName:{filterType:'', parameter:''},
                                    serialNo:{filterType:'', parameter:''}
                                }
                            }).then(res => {
                                if(res.data.stocks.length > 0){
                                    setShowStockSelectionModal({ open: true, data: value?.quantity });
                                }else{
                                    MSCMessage(dispatch,"warning","Bu ürün için stok bulunmamaktadır.");
                                }
                            })
                        }}>
                        <FolderIcon />
                    </IconButton>
                </TableCell>
                <TableCell align="center" style={{ border: '0.5px solid #DCDCDC', height: '5', padding: 0 }} >
                    <ListDelField name="" size={'small'} variant="standard" InputProps={{ disableUnderline: true }}
                        style={{ padding: "0px 5px", margin: "0px" }} />
                </TableCell>
            </MSCTableRowField>
            <MSCTableRowField>
                <TableCell style={{ border: '0.5px solid #DCDCDC', height: '0', padding: '0px 16px 0px 16px' }} padding='0' colSpan={'100%'}>
                    <ErrorField name={'itemcode'} errorMessage={t('PleaseSelectItemCodeandStock')} />
                </TableCell>
            </MSCTableRowField>
            {/* <HiddenField name={'stockblockrequestid'} value={0} />
                <HiddenField name={'seqno'} value={0} />
                <HiddenField name={'rstat'} value={'P'} /> */}
            <StockSelectionModal
                dataSource={dataStocks?.stocks}
                showModal={showStockSelectionModal}
                handleClose={handleCloseStockSelectionModal}
                SaveButtonClick={() => {
                    handleCloseStockSelectionModal();
                }}
                SelectRowData={(rowData) => {
                    let RowData;
                    RowData = rowData.map(val => val.original);
                    RowData.map(val => {
                        val.unit = val?.itemcodeNavigation?.unitsale ? val?.itemcodeNavigation?.unitsale : 'ad';
                        val.stockblockrequestid = 0;
                        val.seqno = 0;
                        val.rstat = "P";
                    })
                    if (RowData?.length > 0) {
                        uniforms.onChange('stockblockrequestis', RowData);
                    }
                }}
            />

            <MSCModal
                visibleColumns={['itemcode', 'itemname', 'unitsale', 'baseunit']}
                dataSource={dataItemMasters?.itemmasters}
                showModal={showItemSelectionModal}
                loading={loadingItemMasters}
                handleClose={handleCloseItemSelectionModal}
                SelectRowData={(rowData) => {
                    console.log(rowData, "rowDa");
                    if (rowData) {
                        setSelectedItem(rowData)
                        // onChange({
                        //     ...value, itemcode: rowData.itemcode, unit: rowData?.unitsale
                        // })
                        handleCloseItemSelectionModal();
                    }
                }}
            />
        </>
    )
}

export default connectField(GetStockBlockRequest)