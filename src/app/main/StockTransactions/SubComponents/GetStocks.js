import { TableCell } from '@mui/material'
import { connectField } from 'uniforms'
import { ListDelField, ErrorField, HiddenField, TextField } from 'uniforms-material'
import { useTranslation } from 'react-i18next'
import { MSCTableCell } from '../../../../@mscComponnent/UniformsComponnents/MSCTableCell'
import MSCTableRowField from '../../../../@mscComponnent/UniformsComponnents/MSCTableRowField'
import { GetUnits } from '../../../../@mscComponnent/Global/GlobalFunc'
import FolderIcon from '@mui/icons-material/Folder'
import { useGetItemMastersLazyQuery, useGetStocksLazyQuery, useGetUnitsLazyQuery } from '../../../../generated/graphql'
import React, { useEffect, useState } from 'react'
import { IconButton } from '@material-ui/core'
import MSCModal from '../../../../@mscComponnent/Modal/MSCModal'

const GetStockBlockRequest = ({ onChange, value, addOrUpdate }) => {
    const { t } = useTranslation();
    const [selectedItem, setSelectedItem] = useState({});
    const [showStockSelectionModal, setShowStockSelectionModal] = useState({ open: false, data: null });
    const [showItemSelectionModal, setShowItemSelectionModal] = useState(false);
    const [getItemMastersLazyQuery, { data: dataItemMasters }] = useGetItemMastersLazyQuery();
    const [getStocksLazyQuery, { data: dataStocks }] = useGetStocksLazyQuery();
    const [getUnitsLazyQuery, { data: dataUnits }] = useGetUnitsLazyQuery();
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
    }, [addOrUpdate])

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
                        InputProps={{
                            disableUnderline: true,
                            endAdornment:
                                <IconButton
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
                <MSCTableCell name="serialno" />
                <MSCTableCell name="batchno" />
                <MSCTableCell name="transqty" />
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
            <MSCModal
                visibleColumns={['itemcode', 'itemname', 'unitsale', 'baseunit']}
                dataSource={dataItemMasters?.itemmasters}
                showModal={showItemSelectionModal}
                handleClose={handleCloseItemSelectionModal}
                SelectRowData={(rowData) => {
                    console.log(rowData, "rowDa");
                    if (rowData) {
                        onChange({
                            ...value, itemcode: rowData.itemcode
                        })
                        handleCloseItemSelectionModal();
                    }
                }}
            />
        </>
    )
}

export default connectField(GetStockBlockRequest)