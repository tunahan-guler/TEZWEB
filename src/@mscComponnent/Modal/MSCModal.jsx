import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import MSCGrid from '../Grid/MSCGrid';
import { GetRowAndColumn } from '../Global/GlobalFunc';
import Slide from '@mui/material/Slide';
import { SelectColumn } from 'react-data-grid';
import { MSCReactTable } from '../MSCReactTable/MSCReactTable';
import FuseLoading from '../../@fuse/core/FuseLoading'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

export default function MSCModal(props) {

    let gridData = GetRowAndColumn(props.dataSource, props.visibleColumns);

    return (
        <div>
            <Dialog
                fullScreen
                open={props.showModal}
                onClose={props.handleClose}
                TransitionComponent={Transition}
                style={{ height: '60%' }}
            >
                {props.loading ? <FuseLoading /> :
                    <>
                        <AppBar sx={{ position: 'relative' }}>
                            <Toolbar>
                                <IconButton
                                    style={{ marginLeft: 'auto' }}
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
                            SelectRowData={props.SelectRowData}
                        /></>
                }

            </Dialog>
        </div>
    );
}