import { TableCell } from '@mui/material'
import React, { useEffect } from 'react'
import { connectField } from 'uniforms'
import { ListDelField, ErrorField } from 'uniforms-material'
import { useTranslation } from 'react-i18next'
import { MSCTableCell } from '../../../../@mscComponnent/UniformsComponnents/MSCTableCell'
import MSCTableRowField from '../../../../@mscComponnent/UniformsComponnents/MSCTableRowField'
import { GetUnits } from '../../../../@mscComponnent/Global/GlobalFunc'
import { useGetUnitsLazyQuery } from '../../../../generated/graphql';

const GetStockTransferIs = ({ onChange, value, getViewModeEx }) => {
    const { t } = useTranslation();
    const [getUnitsLazyQuery, { data: dataUnits }] = useGetUnitsLazyQuery();

    useEffect(() => {
        if (getViewModeEx === 3) {
            getUnitsLazyQuery();
            onChange({ ...value, 'tstat': 'A' })
        }
    }, [getViewModeEx])

    return (
        < >
            <MSCTableRowField >
                <MSCTableCell name={'itemcode'} />
                <MSCTableCell name={'serialno'} />
                <MSCTableCell name={'batchno'} />
                <MSCTableCell name={'transqty'} />
                <MSCTableCell name={'unit'} options={GetUnits(dataUnits)} />
                <MSCTableCell name={'tstat'} options={[{ label: t("Accept"), value: "A" }, { label: t("Reject"), value: "R" }]} disabled={false} />
                <MSCTableCell name={'explanationR'} disabled={false} />
                <TableCell align="center" style={{ border: '0.5px solid #DCDCDC', height: '5', padding: 0 }} >
                    <ListDelField name="" size={'small'} variant="standard" InputProps={{ disableUnderline: true }}
                        style={{ padding: "0px 5px", margin: "0px" }} />
                </TableCell>
            </MSCTableRowField>
            <MSCTableRowField>
                <TableCell style={{ border: '0.5px solid #DCDCDC', height: '0', padding: '0px 16px 0px 16px' }} padding='0' colSpan={'100%'}>
                    <ErrorField name={'explanationR'} errorMessage={t('YouMustAddExplanationOfTheRejected')} />
                    <ErrorField name={'tstat'} errorMessage={t('Accept/RejectIsRequired')} />
                </TableCell>
            </MSCTableRowField>
        </>
    )
}

export default connectField(GetStockTransferIs)