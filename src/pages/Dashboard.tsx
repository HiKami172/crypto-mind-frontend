import * as React from 'react';
import type {} from '@mui/x-date-pickers/themeAugmentation';
import type {} from '@mui/x-charts/themeAugmentation';
import type {} from '@mui/x-data-grid/themeAugmentation';
import type {} from '@mui/x-tree-view/themeAugmentation';
import { alpha } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppNavbar from '../components/Dashboard/AppNavbar';
import Header from '../components/Dashboard/Header';
import MainGrid from '../components/Dashboard/MainGrid';
import SideMenu from '../components/Dashboard/SideMenu';
import AppTheme from '../theme/shared-theme/AppTheme';
import {
  chartsCustomizations,
  dataGridCustomizations,
  datePickersCustomizations,
  treeViewCustomizations,
} from '../theme/shared-theme/customizations';
import {useEffect} from "react";
import {fetchUserInfo} from "../store/userSlice";
import {useDispatch} from "react-redux";

const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...treeViewCustomizations,
};

export default function Dashboard(props: { disableCustomTheme?: boolean }) {
    const dispatch = useDispatch();
    useEffect(() => {
        // @ts-ignore
        dispatch(fetchUserInfo());
    }, [dispatch]);
  return (
    <AppTheme {...props} themeComponents={xThemeComponents}>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: 'flex' }}>
        <SideMenu />
        <AppNavbar />
          <Box
              component="main"
              sx={(theme) => ({
                  flexGrow: 1,
                  // backgroundColor: theme.vars
                  //     ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
                  //     : alpha(theme.palette.background.default, 1),
                  overflow: 'auto',
              })}
          >
          <Stack
            spacing={2}
            sx={{
              alignItems: 'center',
              mx: 3,
              pb: 5,
              mt: { xs: 8, md: 0 },
            }}
          >
            <Header />
            <MainGrid />
          </Stack>
        </Box>
      </Box>
    </AppTheme>
  );
}
