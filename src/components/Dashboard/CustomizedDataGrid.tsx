import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
// import { columns, rows } from '../../internals/data/gridData';

// interface OrderProps {
//   id: number
//   date: string
//   pair: string
//   type: string
//   side: string
//   price: string
//   amount: string
//   filled: string
//   total: string
//   triggerConditions: string
//   tpSl: string
// }
interface CustomizedDataGridProps {
  columns: any[];
  rows: readonly any[];
  selectable?: boolean; // Controls checkbox selection
  showFooter?: boolean; // Controls footer visibility
}

export default function CustomizedDataGrid({
                                             columns,
                                             rows,
                                             selectable = false,
                                             showFooter = true
                                           }: CustomizedDataGridProps) {
  return (
      <React.Fragment>
        <DataGrid
          autoHeight
          checkboxSelection={selectable}
          rows={rows}
          columns={columns}
          getRowClassName={(params) =>
            params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
          }
          initialState={{
            pagination: { paginationModel: { pageSize: 20 } },
          }}
          pageSizeOptions={[10, 20, 50]}
          disableColumnResize
          density="compact"
          slotProps={{
            filterPanel: {
              filterFormProps: {
                logicOperatorInputProps: {
                  variant: 'outlined',
                  size: 'small',
                },
                columnInputProps: {
                  variant: 'outlined',
                  size: 'small',
                  sx: { mt: 'auto' },
                },
                operatorInputProps: {
                  variant: 'outlined',
                  size: 'small',
                  sx: { mt: 'auto' },
                },
                valueInputProps: {
                  InputComponentProps: {
                    variant: 'outlined',
                    size: 'small',
                  },
                },
              },
            },
          }}
          hideFooter={!showFooter}
        />
      </React.Fragment>
  );
}
