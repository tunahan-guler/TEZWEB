import { MenuItem } from '@material-ui/core'
import { FormControl, Grid, InputLabel, Select, Typography, Radio, RadioGroup, FormControlLabel } from '@mui/material'
import React from 'react'

type Props = {
    options: Array<any>,
    label: string,
    onChange?: () => void,
    value?: any
}

const MSCRadio = ({ options, label, onChange, value }: Props) => {
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
                    <RadioGroup row aria-label="position" name="position"
                        onChange={onChange}
                        value={value}
                    >
                        {options?.map((item,index) => (
                            <FormControlLabel
                            key={index}
                                value={item.value}
                                control={<Radio color="primary" />}
                                label={item.label}
                            />
                        ))}
                    </RadioGroup>
                </Grid>
            </Grid>
        </>
    )
}

export default MSCRadio