import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { Box, Button, Divider, Drawer, Icon } from '@mui/material';
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MenuIcon from "@mui/icons-material/Menu";
import FuseLoading from '../../@fuse/core/FuseLoading';
import { Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { isMobile } from '../Global/GlobalFunc';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

export default function MSCDialogWithDrawer({ openDialog, handleCloseDialog, drawerChildren, loading, dialogChildren, onFilterButtonClick, hasSaveButton = false,
    SaveButtonClick }) {
    const { t } = useTranslation();
    const [openDrawer, setOpenDrawer] = React.useState(true);
    return (
        <div>
            <Dialog
                fullScreen
                open={openDialog}
                onClose={handleCloseDialog}
                TransitionComponent={Transition}
                style={{ height: '60%' }}
            >
                {loading ? <FuseLoading /> : <>
                    <Drawer
                        sx={{
                            width: isMobile() ? '80%' : '25%',
                            '& .MuiDrawer-paper': {
                                width: isMobile() ? '80%' : '25%',
                                boxSizing: 'border-box',
                            },
                        }}
                        PaperProps={{
                            style: {
                                position: "absolute",
                                border: 'none'
                            }
                        }}
                        variant="persistent"
                        anchor="left"
                        open={openDrawer}
                    >
                        <div style={{
                            flexDirection: 'row', justifyContent: 'space-between', width: '100%', display: 'flex', alignItems: 'center',
                            backgroundColor: '#1B2330'
                        }}>
                            <IconButton onClick={() => { setOpenDrawer(false) }} style={{color:'white'}}>
                                <ChevronLeftIcon />
                            </IconButton>
                            <Typography color={'white'} style={{ fontWeight: 'bold', marginRight: '5%' }}>FİLTRELE</Typography>
                        </div>
                        <Divider />
                        <Box style={{ padding: '2%' }}>
                            <div style={{ marginTop: '5%' }}>
                                {drawerChildren}
                            </div>
                            <Divider style={{ marginTop: '5%' }} />
                            <Button
                                onClick={() => { onFilterButtonClick(); setOpenDrawer(false) }}
                                variant={'contained'}
                                startIcon={<FilterAltIcon />}
                                style={{ marginTop: '5%', width: '95%', position: 'absolute', bottom: '5%' }}>FİLTRELE</Button>
                        </Box>
                    </Drawer>
                    <AppBar sx={{ position: 'relative' }}>
                        <Toolbar>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={() => setOpenDrawer(true)}
                                edge="start"
                                sx={{ mr: 2, ...(openDrawer && { display: 'none' }) }}
                            >
                                <MenuIcon />
                            </IconButton>
                            {hasSaveButton &&
                                <Button autoFocus color="inherit" onClick={SaveButtonClick ? SaveButtonClick : handleCloseDialog}>
                                    {t('Save')}
                                </Button>
                            }
                            <IconButton
                                style={{ marginLeft: 'auto' }}
                                edge="start"
                                color="inherit"
                                onClick={handleCloseDialog}
                                aria-label="close"
                            >
                                <CloseIcon />
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                    {dialogChildren}
                </>}
            </Dialog>
        </div>
    );
}