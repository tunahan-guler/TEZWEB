import { IconButton } from '@material-ui/core'
import { Collapse, Stack, TableCell } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { connectField } from 'uniforms'
import { TextField, ListDelField } from 'uniforms-material'
import FolderIcon from '@mui/icons-material/Folder'
import { useGetItemMastersLazyQuery, useGetStocksLazyQuery, useGetUnitsLazyQuery } from '../../../../generated/graphql'
import { useTranslation } from 'react-i18next'
import MSCModal from '../../../../@mscComponnent/Modal/MSCModal'
import { useDispatch } from 'react-redux'
import { MSCTableCell } from '../../../../@mscComponnent/UniformsComponnents/MSCTableCell'
import MSCTableRowField from '../../../../@mscComponnent/UniformsComponnents/MSCTableRowField'
import { GetUnits, MSCMessage } from '../../../../@mscComponnent/Global/GlobalFunc'
import StockSelectionModal from '../../../../@mscComponnent/Modal/StockSelectionModal'
import { useForm } from 'uniforms'
import ItemSelectionDialog from '../../../../@mscComponnent/Modal/ItemSelectionDialog'
import StockSelectionDialog from '../../../../@mscComponnent/Modal/StockSelectionDialog'

const GetStockTransferIs = ({ onChange, value, addOrUpdate }) => {
    const { t } = useTranslation();
    const [showStockSelectionModal, setShowStockSelectionModal] = useState({ open: false, data: null });
    const [showItemSelectionModal, setShowItemSelectionModal] = useState(false);
    const [getItemMastersLazyQuery, { data: dataItemMasters, loading: loadingItemMasters }] = useGetItemMastersLazyQuery();
    const [getStocksLazyQuery, { data: dataStocks }] = useGetStocksLazyQuery();
    const dispatch = useDispatch();
    const [selectedItem, setSelectedItem] = useState({});
    const [getUnitsLazyQuery, { data: dataUnits }] = useGetUnitsLazyQuery();
    const uniforms = useForm();

    useEffect(() => {
        getUnitsLazyQuery();
    }, [])

    const handleCloseStockSelectionModal = () => {
        setShowStockSelectionModal({ open: false, data: null });
    }

    const handleCloseItemSelectionModal = () => {
        setShowItemSelectionModal(false);
    }

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
                        value={selectedItem?.itemcode ? selectedItem.itemcode : value?.itemcode}
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
                <TableCell align="center" style={{ border: '0.5px solid #DCDCDC', height: '5', padding: 0 }}>
                    <IconButton size={'small'}
                        onClick={() => {
                            getStocksLazyQuery({
                                variables: {
                                    itemCode:{filterType:'equal', parameter:selectedItem?.itemcode ? selectedItem?.itemcode : '*'},
                                    itemName:{filterType:'', parameter:""},
                                    serialNo:{filterType:'', parameter:""},
                                }
                            }).then((res) => {
                                if (res.data.stocks.length > 0) {
                                    setShowStockSelectionModal({ open: true, data: value?.quantity });
                                } else {
                                    MSCMessage(dispatch, 'warning', "Bu ürün için stok bulunmamaktadır.")
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

            <StockSelectionDialog
                showModal={showStockSelectionModal}
                handleClose={() => {
                    uniforms.onChange('stocktransferis', []);
                    handleCloseStockSelectionModal();
                }}
                SaveButtonClick={() => {
                    handleCloseStockSelectionModal();
                }}
                SelectRowData={(rowData) => {
                    let RowData;
                    RowData = rowData.map(val => val.original);
                    RowData.map(val => {
                        val.unit = val?.itemcodeNavigation?.unitsale ? val?.itemcodeNavigation?.unitsale : 'ad';
                        val.transferid = 0;
                        val.seqno = 0;
                        val.explanationR = "";
                        val.tstat = "P";
                    })
                    if (RowData?.length > 0) {
                        uniforms.onChange('stocktransferis', RowData);
                    }
                }}
            />
            <ItemSelectionDialog
                showModal={showItemSelectionModal}
                handleClose={handleCloseItemSelectionModal}
                SelectRowData={(rowData) => {
                    if (rowData) {
                        setSelectedItem(rowData);
                        onChange({
                            ...value, itemcode: rowData?.itemcode, unitprice: rowData?.salesprice, sctcode: rowData?.sctcode,
                            vatcode: rowData?.vatcode, pctcode: rowData?.pctcode, unit: rowData?.unitsale,
                            // stockcontrol: rowData?.stockcontrol,
                        })
                        handleCloseItemSelectionModal();
                    }
                }}
            />
        </>
    )
}

export default connectField(GetStockTransferIs)