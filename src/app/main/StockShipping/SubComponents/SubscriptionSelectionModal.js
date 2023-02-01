import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { GetRowAndColumn } from '../../../../@mscComponnent/Global/GlobalFunc'
import { connectField } from 'uniforms';
import Slide from '@mui/material/Slide';
import { MSCReactTable } from '../../../../@mscComponnent/MSCReactTable/MSCReactTable';
import {useTranslation} from 'react-i18next'
import FuseLoading from '../../../../@fuse/core/FuseLoading'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const SubscriptionSelectionModal = (props) => {
    const {t} = useTranslation();
    const visibleColumns = ['subscriptionsId', 'companyName']
    let gridData = GetRowAndColumn(props?.subscriptionData, visibleColumns);
    
    return (
        <div>
            <Dialog
                fullScreen
                TransitionComponent={Transition}
                open={props.showModal}
                onClose={props.handleClose}
                style={{ height: '60%' }}
            >
                {props?.loading ? <FuseLoading/> : <>
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                        style={{marginLeft:'auto'}}
                            edge="start"
                            color="inherit"
                            onClick={props.handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <MSCReactTable
                selection
                    columns={gridData.columns}
                    data={gridData.rows}
                    SelectRowData={(rowData) => {
                        if (rowData) {
                            props.onChange({ ...props.value, ...rowData })
                            props.handleClose();
                        }
                    }}
                /></>}
                
            </Dialog>
        </div>
    );
}

export default connectField(SubscriptionSelectionModal)