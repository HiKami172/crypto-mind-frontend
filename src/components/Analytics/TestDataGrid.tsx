import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {botColumns, botRows} from "../../internals/data/gridData";


// Sample columns and rows
// const columns: GridColDef[] = [
//     { field: 'id', headerName: 'ID', width: 90 },
//     { field: 'name', headerName: 'Name', width: 150 },
//     { field: 'is_active', headerName: 'Is Active', width: 150 },
// ];
//
// const rows: GridRowsProp = [
//     { id: 1, name: 'AlphaBot', is_active: true },
//     { id: 2, name: 'BetaBot', is_active: false },
//     { id: 3, name: 'GammaBot', is_active: true },
// ];

// Custom theme to override DataGrid styles
const theme = createTheme({
    components: {
        MuiDataGrid: {
            styleOverrides: {
                root: {
                    '.MuiDataGrid-row.Mui-selected': {
                        backgroundColor: 'rgba(0, 123, 255, 0.2) !important', // Highlight the selected row
                        '&:hover': {
                            backgroundColor: 'rgba(0, 123, 255, 0.3) !important', // Slightly darker on hover
                        },
                    },
                    '.MuiDataGrid-cell': {
                        '&:focus': {
                            outline: 'none', // Remove focus outline
                        },
                    },
                },
            },
        },
    },
});

export default function TestDataGrid() {
    const handleRowClick = (params: any) => {
        console.log('Row clicked:', params.row); // Custom action for row click
    };

    return (
        <ThemeProvider theme={theme}>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={botRows}
                    columns={botColumns}
                    disableRowSelectionOnClick // Allow row selection via click
                    hideFooterSelectedRowCount // Hide the footer showing selected row count
                    onRowClick={handleRowClick} // Handle row click for custom actions
                    disableColumnSelector // Disable column selector from the toolbar
                    disableColumnMenu // Disable column menu options (sorting, filtering)
                    // disableCSelectionOnClick // Prevent individual cell selection
                    hideFooter={true}
                />
            </div>
        </ThemeProvider>
    );
}
