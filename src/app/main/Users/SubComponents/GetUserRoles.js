import React, { useEffect, useState } from 'react'
import { connectField, useForm} from 'uniforms'
import { HiddenField, TextField, ErrorField } from 'uniforms-material'
import { MSCTableCell } from '../../../../@mscComponnent/UniformsComponnents/MSCTableCell'
import moment from 'moment'
import MSCTableRowField from '../../../../@mscComponnent/UniformsComponnents/MSCTableRowField'
import { ListDelField } from 'uniforms-material'
import { TableCell } from '@mui/material'
import { IconButton } from '@material-ui/core'
import FolderIcon from '@mui/icons-material/Folder'
import MSCModal from '../../../../@mscComponnent/Modal/MSCModal'
import { useDispatch } from 'react-redux'
import { showMessage } from '../../../store/fuse/messageSlice'
import { useTranslation } from 'react-i18next'
import { useGetRoleLazyQuery, useGetRoleQuery } from '../../../../generated/graphql'
import MSCTableField from '../../../../@mscComponnent/UniformsComponnents/MSCTableField'

const GetUserRoles = ({addOrUpdate, value}) => {
    const {t} = useTranslation();
    const uniforms = useForm();
    const {data:dataRole} = useGetRoleQuery({
        variables:{
            prmSubscriptionId:"1000000006"
        }
    });

    return (
        <>
            <HiddenField name={'subscriptionid'} value={uniforms?.model?.subscriptionId}/>
            <HiddenField name={'email'} value={uniforms?.model?.email}/>
                <MSCTableRowField >
                <MSCTableCell name={'roleCode'} options={dataRole?.role.map(item => ({label:t(item.roleCode), value:item.roleCode}))}/>
                    <MSCTableCell name={'email'} disabled/>
                <TableCell align="center" style={{ border: '0.5px solid #DCDCDC', height: '5', padding: 0 }} >
                    <ListDelField name="" size={'small'} variant="standard" InputProps={{ disableUnderline: true }}
                        style={{ padding: "0px 5px", margin: "0px" }} />
                </TableCell>
                  <HiddenField name={'role.roleCode'} value={value.roleCode}/>
                  <HiddenField name={'role.subscriptionsid'} value={value.subscriptionid}/>
                  <HiddenField name={'role.authObject'} value={value.roleCode}/>
                  {/* <HiddenField name={'role.createtime'} value={moment().format('DD-MM-YYYY')}/> */}
                  <HiddenField name={'role.createuser'} value={"TUNAHAN"}/>
            </MSCTableRowField>
            <MSCTableRowField>
                <TableCell style={{ border: '0.5px solid #DCDCDC', height: '0', padding: '0px 16px 0px 16px' }} padding='0' colSpan={'100%'}>
                  {/* Error Field */}
     
                </TableCell>
            </MSCTableRowField>
        </>
    )
}

export default connectField(GetUserRoles)