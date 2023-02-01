import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react'

const EmptyRowsRenderer = () => {
    return (
        <Box flex={1} alignItems={'center'} justifyContent={'center'} display={'flex'} style={{gridColumn: '1/-1'}}>
          <Typography color={'GrayText'}>Veri Yok</Typography>
        </Box>
      );
}

export default EmptyRowsRenderer