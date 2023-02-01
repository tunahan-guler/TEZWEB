import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import MSCGrid from '../../../../@mscComponnent/Grid/MSCGrid';
import { SelectColumn } from 'react-data-grid';
import { GetRowAndColumn } from '../../../../@mscComponnent/Global/GlobalFunc';
import { MSCReactTable } from '../../../../@mscComponnent/MSCReactTable/MSCReactTable';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function ModalDialog(props) {
  const [open, setOpen] = React.useState(false);
  let selectedRow = {}
  let gridData = {
    rows: [],
    columns: []
  };
  if (Array.isArray(props.dataSource)) {
    gridData = GetRowAndColumn(props.dataSource, props.visibleColumns)
    console.log(gridData)
  }

  const data = React.useMemo(
    () => [
      {
        col1: 'Hello',
        col2: 'World',
        col3: 1
      },
      {
        col1: 'react-table',
        col2: 'rocks',
        col3: 2
      },
      {
        col1: 'whatever',
        col2: 'you want',
        col3: 3
      },
    ],
    []
  )

  const columns = React.useMemo(
    () => [
      {
        Header: 'Column 1',
        accessor: 'col1', // accessor is the "key" in the data
      },
      {
        Header: 'Column 2',
        accessor: 'col2',
      },
      {
        Header: 'Column 3',
        accessor: 'col3',
      },
    ],
    []
  )

  // let gridData = GetRowAndColumn(props.dataSource, props.visibleColumns)

  const handleClickOpen = () => {
    setOpen(true);
  };


  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open full-screen dialog
      </Button> */}
      <Dialog
        // fullScreen
        fullWidth={'xl'}
        maxWidth={'xl'}
        maxHeight={'xl'}
        styles={{ height: '80%', width: '80%' }}
        open={props.ShowModal}
        onClose={props.handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Sound
            </Typography>
            <Button autoFocus color="inherit" onClick={() => {
              console.log('SEEE',selectedRow)
              props.handleClose()

              props.onRowClick(selectedRow)
            }}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <MSCReactTable
          columns={gridData.columns}
          data={gridData.rows}
          SelectRowData={(e) => {selectedRow = e}}
          // onRowClicked={props.onRowClick}
          globalFilterTable={
            (preGlobalFilteredRows, setGlobalFilter, globalFilter) => {
              // if (!!gridData.rows) {

              //   setFilterGlobal({ ...filterGlobal, setGlobalFilter })
              //   // setFilterGlobal(3)
              // }
            }
          }
        />
        {/* <MSCGrid
                    columns={[SelectColumn,...gridData.columns]}
                    rows={gridData.rows}
                    onRowClick={props.onRowClick}
                /> */}
      </Dialog>
    </div>
  );
}