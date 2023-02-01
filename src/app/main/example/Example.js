import { styled } from '@mui/material/styles';
import {useAsyncMemo} from "use-async-memo" 
import FusePageSimple from '@fuse/core/FusePageSimple';
import { useTranslation } from 'react-i18next';
import MSCToolbar, { ViewMode } from '../../../@mscComponnent/CRUDPage/MSCToolbar'
import {
  AutoForm,
  AutoField,
  ErrorField,
  ListDelField
} from 'uniforms-material';
import MSCTableField from '../../../@mscComponnent/UniformsComponnents/MSCTableField'
import { MSCTableCell } from '../../../@mscComponnent/UniformsComponnents/MSCTableCell'
import MSCTableRowField from '../../../@mscComponnent/UniformsComponnents/MSCTableRowField'
// import { bridge as schema } from './uniform/GraphqlSchema';
import { bridge as schema } from './uniform/Payment-JS-Schema';
import { useGetItemMasterQuery, useAddOrUpdateItemMasterMutation, AddOrUpdateEnum, useGetInvoiceHQuery, useGetInvoiceHLazyQuery } from '../example/../../../generated/graphql'

import DataGrid, { SelectColumn } from 'react-data-grid';
import React, { useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux'
import { getViewModeFunc } from '../../store/mscToolbar/mscToolbarSlice'
import { showMessage } from '../../store/fuse/messageSlice'
import { GetRowAndColumn } from '../../../@mscComponnent/Global/GlobalFunc'
import { connectField } from 'uniforms';
import { Collapse, Grid, IconButton, TableCell, TextField } from '@mui/material';
import { TableRow } from '@material-ui/core';


import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { MSCReactTable } from '../../../@mscComponnent/MSCReactTable/MSCReactTable';
import AutoLabelField from '../../../@mscComponnent/UniformsComponnents/AutoLabelField';

// const GetRowAndColumn = (arr) => {
//   let rows = [];
//   let columns = [];
//     if (arr) {  
//       arr.map((item, i) => {
//         let R = {};
//         Object.keys(item).map((key, index) => {
//           if (!columns.some(e => e.key === key) && key !== '__typename') {
//             columns.push({
//               key: key,
//               name: key.toUpperCase()
//             });

//           }
//           if (key !== '__typename') {
//             R = { ...R, [key]: item[key] } 
//           } 
//         })
//         rows.push(R); 
//       }) 
//       return { rows, columns }
//     }
//     else {
//       return {
//         rows: [],
//         columns: []
//       }
//     } 
// }


// const columns = [
//   { key: 'title', name: 'Title' }
// ];

// const rows = [
//   { id: 0, title: 'Example' },
//   { id: 1, title: 'Demo' }
// ];

const Root = styled(FusePageSimple)({
  '& .FusePageSimple-header': {},
  '& .FusePageSimple-toolbar': {},
  '& .FusePageSimple-content': {},
  '& .FusePageSimple-sidebarHeader': {},
  '& .FusePageSimple-sidebarContent': {},
});

const CustomTableCell = (props) => {
  console.log('ROWCELL PROPS', props)
  return <TableCell style={{ border: '0.5px solid #DCDCDC', height: '10' }} >
    <AutoField
      style={{ padding: "0px 16px" }}
      label=""
      size="small"
      variant="standard"
      name={props.Fname}
      InputProps={{ disableUnderline: true }}
    />
  </TableCell>
}

const CustomTableField = connectField(CustomTableCell)

const Rows = () => {
  const [open, setOpen] = useState(false)
  return (
    <React.Fragment  >
      <MSCTableRowField  >
        <TableCell style={{ border: '0.5px solid #DCDCDC', height: '0' }}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
          </IconButton>
        </TableCell>
        <MSCTableCell Cname="movementtypeid" />
        <MSCTableCell Cname="ownercode" />
        <MSCTableCell Cname="maturitydate" />
        <TableCell align="right" >
          <ListDelField name="" />
        </TableCell>
      </MSCTableRowField>
      <MSCTableRowField >
        <TableCell style={{ border: '0.5px solid #DCDCDC', height: '0', padding: '0px 16px 0px 16px' }} padding='0' colSpan={'100%'}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <MSCTableField
              name="exampleline"
              columns={['accdocno', 'maturitydate', 'maturitydate', 'accdocno']}
            >
              <MSCTableRowField name="$" >
                <CustomTableCell Fname="companyid" />
                <CustomTableCell Fname="accdocno" />
                <CustomTableCell Fname="accdocyear" />
                <TableCell align="right" >
                  <ListDelField name="" />
                </TableCell>
              </MSCTableRowField>
            </MSCTableField>
          </Collapse>
        </TableCell>
      </MSCTableRowField>
    </React.Fragment>
  )
}

const CustomRows = connectField(Rows)

function ExamplePage(props) {
  const [searchText, setSearchText] = useState('')
  const [filterGlobal, setFilterGlobal] = useState()
  const { data: invoiceData, loading, error } = useGetInvoiceHQuery({
    variables: {
      prmInvoiceType: "SA"
    }
  });

  // const [GetInvoiceH ,{ data: invoiceData, loading, error  }] = useGetInvoiceHLazyQuery({
  //   variables: {
  //     prmInvoiceType: "SA"
  //   },
  //   fetchPolicy:'cache-first'
  // })

  useEffect(() => {
    // GetInvoiceH()
    console.log(invoiceData)
  }, [invoiceData])
  

  const visibleColumns = ['invoiceno', 'eiNo', "invoicetype", "stakeholdercode",
    "stakeholdername", "invdate", "gtotalamount", "paidamount"]
  let gridData =  GetRowAndColumn(invoiceData?.invoiceH, visibleColumns);

  console.log('Grid Data', JSON.stringify(gridData.columns, 2, 4));


  useEffect(() => {
    console.log('SearchTextExample', searchText)
    filterGlobal?.setGlobalFilter(searchText)
  }, [searchText])


    // let columns = React.useMemo(
    //   () =>  gridData.columns,
    //   [gridData.columns]
    // )
    // let data = React.useMemo(
    //    () =>  gridData.rows,
    //   [gridData.rows]
    // ) 

 
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

  const  columns = React.useMemo(
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
 

  console.log('COLUMN',columns)
  console.log('ROW',data)

  // if (loading) {
  //   return <div> loading </div>
  // }

  const [open, setOpen] = useState(false)
  const { t } = useTranslation();
  const getViewModeFuncEx = useSelector(getViewModeFunc);
  const dispatch = useDispatch();
  // let gridData = GetRowAndColumn(data?.itemMasters)

  const [addOrUpdate, setAddOrUpdate] = useState(AddOrUpdateEnum.Add)
  const [rowData, setRowData] = useState({})
   

  useEffect(() => {
    console.log('State Row', rowData)
  }, [rowData])


  const AddOrUpdate = (model, addOrUpdateStatus) => {
    ItemMasterMutate({
      variables: {
        addOrUpdate: addOrUpdateStatus,
        prmItemMaster: model
      }
    }).then(res => {
      dispatch(
        showMessage({
          message: 'Hi, how are you?',//text or html
          autoHideDuration: 6000,//ms
          anchorOrigin: {
            vertical: 'top',//top bottom
            horizontal: 'right'//left center right
          },
          variant: 'success'//success error info warning null
        }))
    })
  }



  return (
    <AutoForm
      schema={schema}
      onChangeModel={model => {
        console.log('MODEL', model)
        if (!!rowData && rowData != model) {
          // setRowData(model)
        }
      }}
      onChange={(key, value) => {
        setRowData({ ...rowData, [key]: value })

      }}
      onSubmit={model => {
        AddOrUpdate(model, addOrUpdate)
      }} >
      <MSCToolbar
      
        filterSearch={setSearchText}
        headerName={t('ExampleEx')}
        viewMode={ViewMode.Read}
        ReadComponnent={
          <div style={{ width: '100%' }}>
            <MSCReactTable
            selection
            // multipleSelection
              columns={columns}
              data={data}
              SelectRowData={(e) => {  }}
              onRowClicked={e => {
                console.log(e.original, "eoriginal")
                // DoubleRowClick(e.original, AddOrUpdateEnum.Update)
              }}
              // onRowClicked={e => { console.log('RowCliced', e) }}
              globalFilterTable={(preGlobalFilteredRows, setGlobalFilter, globalFilter) => {
                if (!!gridData.rows) {
                  
                  setFilterGlobal({ ...filterGlobal, setGlobalFilter })
                  // setFilterGlobal(3)
                }
              }}
            />
          </div>
        }
        CreateOrUpdateComponnent={
          <div>
            <Grid container  >
              <Grid item xs={6} sm={6} lg={6} md={6}>
                <AutoLabelField name='accdocno' />
                <AutoLabelField name='accdoctype' />

              </Grid>
              <Grid item xs={6} sm={6} lg={6} md={6}>
                <AutoLabelField name='docdate' />
              </Grid>
            </Grid>
            <AutoLabelField name='accdocno' />
            <AutoLabelField name='accdoctype' />
            <AutoLabelField name='docdate' />
            <MSCTableField
              name="acAccountdocumentis"
              columns={['', 'movementtypeid', 'ownercode', 'maturitydate', 'delete']}
            // isDeleteColumn
            >
              <CustomRows name="$" />
            </MSCTableField>
          </div>
        }
      />
    </AutoForm>
  );
}

export default ExamplePage; 