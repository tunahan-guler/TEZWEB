import { Divider, Grid, Typography } from '@mui/material'
import React from 'react'
import { connectField } from 'uniforms'
import { AutoField } from 'uniforms-material'
import { useTranslation } from 'react-i18next';

type Props = {
    name: string,
    disabled: boolean,
    itemProps: any,
    label:string,
    options: Array<any>
}

export default function AutoLabel({ name, label, itemProps, options, disabled = false }: Props) {
    const { t } = useTranslation();
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
                        { label ? t(label):t(name)}
                    </Typography>
                </Grid>
                <Grid item xs={8} sm={8} lg={8} md={8}>
                    <AutoField size="small" label="" name={name} disabled={disabled} {...itemProps} options={options} 
                    style={disabled ? {backgroundColor:'#E8E8E8'} : null}/>
                </Grid>
            </Grid>
        </>
    )
}

// export const AutoLabelField = connectField(AutoLabel)