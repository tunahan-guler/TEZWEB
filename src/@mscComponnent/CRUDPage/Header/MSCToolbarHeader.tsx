import React, { useEffect, useState } from 'react';
// @ts-ignore
import { ViewMode } from '../MSCToolbar';
// @ts-ignore
import HeaderRead from './Modes/HeaderRead';
// @ts-ignore
import HeaderCreatOrUpdate from './Modes/HeaderCreatOrUpdate';
// @ts-ignore
import HeaderSearch from './Modes/HeaderSearch';


type MSCToolbarHeaderProps = {
    viewMode?: ViewMode,
    headerName: string,
    viewModeChange: (a: any) => void,
    SubmitComponnent: JSX.Element,
    ReadModeHeaderComponnent?: JSX.Element
    queryList: (a: any) => void,
    filterSearch: (e: string) => void,
    onUpdateButtonClick?: (e:string) => void,
    updateButtonDisabled?: boolean,
    onAddButtonClick?:(e:string) => void,
    hideSubmitButton?:Boolean
};

function MSCToolbarHeader(
    {
        headerName,
        viewModeChange,
        viewMode = ViewMode.Read,
        SubmitComponnent,
        ReadModeHeaderComponnent,
        queryList,
        filterSearch,
        onUpdateButtonClick,
        updateButtonDisabled,
        onAddButtonClick,
        hideSubmitButton
    }: MSCToolbarHeaderProps) {
    const [modeView, setModeView] = useState(viewMode);
    const [searchText, setSearchText] = useState('')
    useEffect(() => {
        if (!!filterSearch) {
            filterSearch(searchText)
        }
    }, [searchText])


    const SelectedMode = (mode: ViewMode): JSX.Element => {
        switch (mode) {
            case ViewMode.Search:
                return <HeaderSearch
                HeaderName={headerName}
                queryList={queryList}
                viewModeChange={viewModeChange}
                />
            case ViewMode.Read:
                return <HeaderRead
                    HeaderName={headerName}
                    viewModeChange={viewModeChange}
                    HeaderComponnent={ReadModeHeaderComponnent}
                    filterSearch={setSearchText} 
                    onUpdateButtonClick={onUpdateButtonClick}
                    updateButtonDisabled={updateButtonDisabled}
                    onAddButtonClick={onAddButtonClick}
                />
            case ViewMode.Create:
                return <HeaderCreatOrUpdate
                    HeaderName={headerName}
                    submitComponnent={SubmitComponnent}
                    viewModeChange={viewModeChange}
                    hideSubmitButton={hideSubmitButton}
                />
            case ViewMode.Update:
                return <HeaderCreatOrUpdate
                    HeaderName={headerName}
                    submitComponnent={SubmitComponnent}
                    viewModeChange={viewModeChange}
                    hideSubmitButton={hideSubmitButton}
                />
            default:
                return <HeaderRead
                    HeaderName={headerName}
                    viewModeChange={viewModeChange}
                    HeaderComponnent={ReadModeHeaderComponnent}
                    queryList={queryList}
                />
        }
    }

    return (SelectedMode(viewMode))
}

export default MSCToolbarHeader;
