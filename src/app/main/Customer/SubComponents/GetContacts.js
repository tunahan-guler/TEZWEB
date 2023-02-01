import { TableCell } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { connectField, useForm } from 'uniforms'
import { ListDelField, HiddenField } from 'uniforms-material'
import { MSCTableCell } from '../../../../@mscComponnent/UniformsComponnents/MSCTableCell'
import MSCTableRowField from '../../../../@mscComponnent/UniformsComponnents/MSCTableRowField'

const GetContacts = ({ onChange, value, getViewModeEx }) => {
    const uniforms = useForm();

    return (
        <MSCTableRowField>
            {
                (getViewModeEx === 2 || !value.contactid) ?
                    <>
                        <HiddenField name={'contactid'} value={0} />
                        <HiddenField name={'stakeholderid'} value={uniforms?.model?.stakeholderid} />
                    </>
                    :
                    null
            }
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
    )
}

export default connectField(GetContacts)