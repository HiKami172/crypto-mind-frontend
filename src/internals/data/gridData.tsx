import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import { GridCellParams, GridRowsProp, GridColDef } from '@mui/x-data-grid';

function renderSide(side: 'Buy' | 'Sell') {
  const colors: { [index: string]: 'success' | 'error' } = {
    Buy: 'success',
    Sell: 'error',
  };

  return <Chip label={side} color={colors[side]} size="small" />;
}

export function renderAvatar(
  params: GridCellParams<{ name: string; color: string }, any, any>,
) {
  if (params.value == null) {
    return '';
  }

  return (
    <Avatar
      sx={{
        backgroundColor: params.value.color,
        width: '24px',
        height: '24px',
        fontSize: '0.85rem',
      }}
    >
      {params.value.name.toUpperCase().substring(0, 1)}
    </Avatar>
  );
}
export const columns: GridColDef[] = [
  {
    field: 'date',
    headerName: 'Date',
    flex: 1.5,
    minWidth: 180 },
  {
    field: 'pair',
    headerName: 'Pair',
    flex: 0.5,
    minWidth: 130,
    renderCell: (params) => renderSide(params.value as any),
  },
  {
    field: 'type',
    headerName: 'Type',
    flex: 1,
    minWidth: 80,
    renderCell: (params) => renderSide(params.value as any),
  },
  {
    field: 'side',
    headerName: 'Side',
    flex: 1,
    minWidth: 100,
    renderCell: (params) => renderSide(params.value as any),
  },
  {
    field: 'price',
    headerName: 'Price',
    flex: 1,
    minWidth: 100,
  },
  {
    field: 'amount',
    headerName: 'Amount',
    flex: 1,
    minWidth: 100,
  },
  {
    field: 'iceberg',
    headerName: 'Amount per Iceberg Order',
    flex: 1,
    minWidth: 200,
  },
  {
    field: 'filled',
    headerName: 'Filled',
    flex: 1,
    minWidth: 100,
  },
  {
    field: 'triggerConditions',
    headerName: 'Trigger Conditions',
    flex: 1,
    minWidth: 150,
  },
  {
    field: 'tpSl',
    headerName: 'TP/SL',
    flex: 1,
    minWidth: 50,
  },
];

export const rows: GridRowsProp = [
  {
    id: 1,
    date: '2024-11-16 19:59:44',
    pair: 'BTC/USDT',
    type: 'Limit',
    side: 'Buy',
    price: 85000,
    amount: 0.00006,
    iceberg: '-',
    filled: '0.00%',
    total: '5.1 USDT',
    triggerConditions: '-',
    tpSl: '-',
  },
  {
    id: 2,
    date: '2024-11-16 19:59:44',
    pair: 'BTC/USDT',
    type: 'Limit',
    side: 'Sell',
    price: 85000,
    amount: 0.00006,
    iceberg: '-',
    filled: '0.00%',
    total: '5.1 USDT',
    triggerConditions: '-',
    tpSl: '-',
  },
  {
    id: 3,
    date: '2024-11-16 19:59:44',
    pair: 'BTC/USDT',
    type: 'Limit',
    side: 'Buy',
    price: 85000,
    amount: 0.00006,
    iceberg: '-',
    filled: '0.00%',
    total: '5.1 USDT',
    triggerConditions: '-',
    tpSl: '-',
  },
  {
    id: 4,
    date: '2024-11-16 19:59:44',
    pair: 'BTC/USDT',
    type: 'Limit',
    side: 'Sell',
    price: 85000,
    amount: 0.00006,
    iceberg: '-',
    filled: '0.00%',
    total: '5.1 USDT',
    triggerConditions: '-',
    tpSl: '-',
  },
  {
    id: 5,
    date: '2024-11-16 19:59:44',
    pair: 'BTC/USDT',
    type: 'Limit',
    side: 'Buy',
    price: 85000,
    amount: 0.00006,
    iceberg: '-',
    filled: '0.00%',
    total: '5.1 USDT',
    triggerConditions: '-',
    tpSl: '-',
  },
  {
    id: 6,
    date: '2024-11-16 19:59:44',
    pair: 'BTC/USDT',
    type: 'Limit',
    side: 'Buy',
    price: 85000,
    amount: 0.00006,
    iceberg: '-',
    filled: '0.00%',
    total: '5.1 USDT',
    triggerConditions: '-',
    tpSl: '-',
  },
  {
    id: 7,
    date: '2024-11-16 19:59:44',
    pair: 'BTC/USDT',
    type: 'Limit',
    side: 'Sell',
    price: 85000,
    amount: 0.00006,
    iceberg: '-',
    filled: '0.00%',
    total: '5.1 USDT',
    triggerConditions: '-',
    tpSl: '-',
  },
  {
    id: 8,
    date: '2024-11-16 19:59:44',
    pair: 'BTC/USDT',
    type: 'Limit',
    side: 'Buy',
    price: 85000,
    amount: 0.00006,
    iceberg: '-',
    filled: '0.00%',
    total: '5.1 USDT',
    triggerConditions: '-',
    tpSl: '-',
  },
  {
    id: 9,
    date: '2024-11-16 19:59:44',
    pair: 'BTC/USDT',
    type: 'Limit',
    side: 'Buy',
    price: 85000,
    amount: 0.00006,
    iceberg: '-',
    filled: '0.00%',
    total: '5.1 USDT',
    triggerConditions: '-',
    tpSl: '-',
  },
  {
    id: 10,
    date: '2024-11-16 19:59:44',
    pair: 'BTC/USDT',
    type: 'Limit',
    side: 'Sell',
    price: 85000,
    amount: 0.00006,
    iceberg: '-',
    filled: '0.00%',
    total: '5.1 USDT',
    triggerConditions: '-',
    tpSl: '-',
  },
];