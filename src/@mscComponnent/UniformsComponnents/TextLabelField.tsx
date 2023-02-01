import { Grid, IconButton, Typography, Button } from '@mui/material'
import React, { useState } from 'react'
import { TextField } from 'uniforms-material';
import FolderIcon from '@mui/icons-material/Folder';
import { useTranslation } from 'react-i18next';

type Props = {
    name: string,
    disabled: boolean,
    itemProps: any,
    label: string,
    value?: any,
    onChange?: () => void,
    folderIconDisabled?: boolean,
    onFolderIconClick?: () => void,
    newButton?: boolean,
    onNewButtonClick?: () => void,
}

export default function TextLabel({ name, newButton, label, itemProps, disabled = false, value, onChange, folderIconDisabled, onFolderIconClick,
    onNewButtonClick }: Props) {
    const { t } = useTranslation();
    const [showWhenFocus, setShowWhenFocus] = useState(false);
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
                    <TextField
                        label={''}
                        size="small"
                        style={disabled ? { backgroundColor: '#E8E8E8' } : null}
                        name={name}
                        value={value}
                        onChange={(e) => {
                            if (e.length > 0) {
                                setShowWhenFocus(true)
                            } else {
                                setShowWhenFocus(false);
                            }
                        }}
                        disabled={disabled}
                        {...itemProps}
                        InputProps={{
                            endAdornment:
                                <>
                                    {newButton && showWhenFocus ?
                                        <Button
                                            variant={'contained'}
                                            color={'error'}
                                            size={'small'}
                                            onClick={onNewButtonClick}
                                        >{t('New')}</Button>
                                        : null
                                    }
                                    <IconButton
                                        size={'small'}
                                        disabled={folderIconDisabled}
                                        onClick={onFolderIconClick}>
                                        <FolderIcon />
                                    </IconButton>
                                </>
                        }}
                    />
                </Grid>
            </Grid>
        </>
    )
}
