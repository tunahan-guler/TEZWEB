import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';
import Input from '@mui/material/Input';
import Paper from '@mui/material/Paper';
import { ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
// @ts-ignore
import { selectMainTheme } from '../../../../app/store/fuse/settingsSlice.js';
import { ViewMode } from '../../MSCToolbar';
import { useTranslation } from 'react-i18next'; 
import { getViewModeFunc, getViewMode , changeViewMode } from '../../../../app/store/mscToolbar/mscToolbarSlice'



function HeaderRead({ HeaderName, viewModeChange, queryList, HeaderComponnent, filterSearch, updateButtonDisabled, onUpdateButtonClick,
  onAddButtonClick }) {
  const dispatch = useDispatch();

  const mainTheme = useSelector(selectMainTheme);
  const { t } = useTranslation();
  const [searchText, setSearchText] = useState('')
  const AddButtonClick = () => {
    viewModeChange(ViewMode.Create);
    dispatch(changeViewMode(ViewMode.Create))
    onAddButtonClick();
  }

  useEffect(() => {
    filterSearch(searchText)
  }, [searchText])
  

  return (
    <div className="flex flex-1 w-full items-center justify-between">
      <div className="flex items-center">
        <Icon
          component={motion.span}
          initial={{ scale: 0 }}
          animate={{ scale: 1, transition: { delay: 0.2 } }}
          className="text-24 md:text-32"
        >
          shopping_basket
        </Icon>
        <Typography
          component={motion.span}
          initial={{ x: -20 }}
          animate={{ x: 0, transition: { delay: 0.2 } }}
          delay={300}
          className="hidden sm:flex text-16 md:text-24 mx-12 font-semibold"
        >
          {HeaderName}
        </Typography>
      </div>

      <div className="flex flex-1 items-center justify-center px-12">
        <ThemeProvider theme={mainTheme}>
          <Paper
            component={motion.div}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
            className="flex items-center w-full max-w-512 px-8 py-4 rounded-16 shadow"
          >
            <Icon color="action">search</Icon>

            <Input
              placeholder={t('Search')}
              className="flex flex-1 mx-8"
              disableUnderline
              fullWidth
              value={searchText}
              onChange = {e => setSearchText(e.target.value)}
              inputProps={{
                'aria-label': 'Search',
              }}
            // onChange={(ev) => dispatch(setProductsSearchText(ev))}
            />
          </Paper>
        </ThemeProvider>
      </div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
      >
        {
          HeaderComponnent ? 
          HeaderComponnent : 
            <>
              <Button
                className="whitespace-nowrap mx-4"
                variant="contained"
                color="secondary"
                onClick={() => { 
                  viewModeChange(ViewMode.Search);
                  dispatch(changeViewMode(ViewMode.Search))
                }}
                startIcon={<Icon className="hidden sm:flex">search</Icon>}
              >
                <span className="hidden sm:flex">{t('Search')}</span>
                <span className="flex sm:hidden">{t('Search')}</span>
              </Button>
              <Button
                className="whitespace-nowrap mx-4"
                variant="contained"
                color="secondary"
                disabled={updateButtonDisabled}
                onClick={() => {
                  dispatch(changeViewMode(ViewMode.Update))
                  onUpdateButtonClick() 
                }}
                startIcon={<Icon className="hidden sm:flex">edit</Icon>}
              >
                <span className="hidden sm:flex">{t('Update')}</span>
                <span className="flex sm:hidden">{t('Update')}</span>
              </Button>
              <Button
                className="whitespace-nowrap mx-4"
                variant="contained"
                color="secondary"
                onClick={AddButtonClick}
                startIcon={<Icon className="hidden sm:flex">add</Icon>}
              >
                <span className="hidden sm:flex">{t('Add')}</span>
                <span className="flex sm:hidden">{t('Add')}</span>
              </Button>
            </>
        }
        
      </motion.div>
    </div>
  );
}

export default HeaderRead;
