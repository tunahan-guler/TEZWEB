
import MSCToolbarHeader from './Header/MSCToolbarHeader';

import ReadMode from './Modes/ReadMode';
import CreateOrUpdateMode from './Modes/CreateOrUpdateMode';
import SearchMode from './Modes/SearchMode'
// @ts-ignore
import FusePageCarded from '../../@fuse/core/FusePageCarded/index.js';
import { styled } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
// @ts-ignore
import FuseScrollbars from '@fuse/core/FuseScrollbars';

import { useSelector, useDispatch } from 'react-redux'
import { addViewModeChanceFunc, getViewModeFunc } from '../../app/store/mscToolbar/mscToolbarSlice'

//#region configration

const Root = styled(FusePageCarded)(({ theme }) => ({
  '& .FusePageCarded-header': {
    minHeight: 72,
    height: 72,
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
      minHeight: 100,
      // minHeight: 136,
      height: 100,
      // height: 136,
    },
  },
  '& .FusePageCarded-content': {
    display: 'flex',
  },
  '& .FusePageCarded-contentCard': {
    overflow: 'hidden',
  },
}));

export enum ViewMode {
  Read = 1,
  Create = 2,
  Update = 3,
  Search = 4,
}

export type ToolBarProps = {
  headerName: string,
  viewMode: ViewMode,
  queryList: () => any,
  mutationsCreate?: () => any,
  mutationUpdate?: () => any,
  changeViewMode?: (mode: ViewMode) => any,
  SubmitComponnent: JSX.Element,
  SearchComponent: JSX.Element,
  ReadModeHeaderComponnent?: JSX.Element,
  ReadComponnent: JSX.Element
  CreateOrUpdateComponnent: JSX.Element,
  filterSearch?: (e: string) => void,
  onUpdateButtonClick?:(e: string) => void,
  updateButtonDisabled:boolean,
  onAddButtonClick?:(e:string) => void,
  isMobile?:() => void,
  hideSubmitButton?:Boolean
}

//#endregion

function MSCToolbar(
  {
    headerName,
    queryList,
    mutationsCreate,
    mutationUpdate,
    ReadComponnent,
    SearchComponent,
    CreateOrUpdateComponnent,
    ReadModeHeaderComponnent,
    SubmitComponnent,
    viewMode,
    filterSearch,
    onUpdateButtonClick,
    updateButtonDisabled,
    onAddButtonClick,
    hideSubmitButton
  }: ToolBarProps) {

  const dispatch = useDispatch()

  const [viewM, setViewM] = useState(viewMode);
  dispatch(addViewModeChanceFunc(setViewM))
  const [oldView, setOldView] = useState({})
  if (viewM == oldView) {
    setOldView(viewM);
    setViewM(viewMode);
  }

  const [searchText, setSearchText] = useState('')
    useEffect(() => {
        if (!!filterSearch) {
            filterSearch(searchText)
        }
    }, [searchText])


  const SelectedPage = (mode: ViewMode): JSX.Element => {
    switch (mode) {
      case ViewMode.Search:
        return (
          <SearchMode
            ChilderenComponnent={SearchComponent}
          />
        )
      case ViewMode.Read:
        return (
          <ReadMode
            ChilderenComponnent={ReadComponnent}
          />
        )
      case ViewMode.Create:
        return (
          <CreateOrUpdateMode
            ChilderenComponnent={CreateOrUpdateComponnent}
          />
        )
      case ViewMode.Update:
        return (
          <CreateOrUpdateMode
            ChilderenComponnent={CreateOrUpdateComponnent}
          />
        )
      default:
        return (
          <ReadMode
            ChilderenComponnent={ReadComponnent}
          />
        )
    }
  }
  return (
    <Root
      header={
        <MSCToolbarHeader
          headerName={headerName}
          onAddButtonClick={onAddButtonClick}
          SubmitComponnent={SubmitComponnent}
          ReadModeHeaderComponnent={ReadModeHeaderComponnent}
          viewMode={viewM}
          viewModeChange={setViewM}
          queryList={queryList} 
          filterSearch={setSearchText}
          onUpdateButtonClick={onUpdateButtonClick}
          updateButtonDisabled={updateButtonDisabled}
          hideSubmitButton={hideSubmitButton}
        />
      } content={
        <div className="w-full flex flex-col">
          <FuseScrollbars className="grow overflow-x-auto">
            {
              SelectedPage(viewM)
            }
          </FuseScrollbars>
        </div>
      }
    // innerScroll
    />
  );
}

export default MSCToolbar;
