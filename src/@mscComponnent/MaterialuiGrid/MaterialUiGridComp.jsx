import { Grid } from '@mui/material'
import React from 'react'

const MaterialUiGridComp = ({children}) => {
  return (
    <Grid container spacing={2}>
        {children.map(val => 
            <Grid item xs={12} sm={12} lg={12} md={12}>
                {val}
            </Grid>
            )}
    </Grid>
  )
}

export default MaterialUiGridComp