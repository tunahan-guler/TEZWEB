import { Divider, Grid, Typography } from '@mui/material'
import React from 'react'
import { connectField } from 'uniforms'
import { AutoField } from 'uniforms-material'
import { TextField } from '@material-ui/core';

type Props = {
    disabled: boolean,
    itemProps: any,
    label:string,
    value?:any,
    type?:string,
    onChange?: () => void
}

export default function MSCTextField({ label, itemProps, value, disabled = false, onChange, type = 'text' }: Props) {
    return (
        <>
            <Grid container
                direction="row"
                alignItems="center"
                justifyContent="center"
                spacing={2}
                style={{ padding: '2px' }}
            >
                <Grid item xs={4} sm={4} lg={4} md={4}>
                    <Typography mt={2}>
                        {label}
                    </Typography>
                </Grid>
                <Grid item xs={8} sm={8} lg={8} md={8}>
                <TextField type={type} fullWidth label={null} size="small" value={value} disabled={disabled} {...itemProps} onChange={onChange}
                style={disabled ? {backgroundColor:'#E8E8E8'} : null}/>
                </Grid>
            </Grid>
        </>
    )
}

