import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InfoIcon from '@mui/icons-material/Info';
import { GridCellParams, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import {Tooltip} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function renderSide(side: 'Buy' | 'Sell') {
  const colors: { [index: string]: 'success' | 'error' } = {
    Buy: 'success',
    Sell: 'error',
  };

  return <Chip label={side} color={colors[side]} size="small" />;
}

// export function renderAvatar(
//   params: GridCellParams<{ name: string; color: string }, any, any>,
// ) {
//   if (params.value == null) {
//     return '';
//   }
//
//   return (
//     <Avatar
//       sx={{
//         backgroundColor: params.value.color,
//         width: '24px',
//         height: '24px',
//         fontSize: '0.85rem',
//       }}
//     >
//       {params.value.name.toUpperCase().substring(0, 1)}
//     </Avatar>
//   );
// }

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

function renderIsActive(isActive: boolean) {
  return (
      <Chip
          label={isActive ? 'Active' : 'Inactive'}
          color={isActive ? 'success' : 'default'}
          size="small"
      />
  );
}

function renderRiskChip(risk: number) {
  let color: "success" | "warning" | "error" | "default" = "default"; // Default value if risk is invalid

  if (risk <= 33) color = "success"; // Low risk
  else if (risk <= 66) color = "warning"; // Medium risk
  else color = "error"; // High risk

  return <Chip label={`${risk}%`} color={color} size="small" />;
}

function renderProfitChip(profit: number) {
  return <Chip label={`${profit}%`} size="small" />;
}

function renderAccountType(accountType: string) {
  const tooltipTitle = (
      <Box display="flex" alignItems="center">
        <InfoIcon fontSize="small" style={{ marginRight: 4 }} />
        <Typography variant="body2">{accountType === 'Live' ? 'Live' : 'Testnet'}</Typography>
      </Box>
  );
  return (
      <Tooltip
          title={tooltipTitle}
          arrow
          placement="right-end" // Positions the tooltip to the top-right
      >
        <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
            }}
        >
          {accountType === 'Live' ? (
              <CheckCircleIcon />
          ) : (
              <BuildCircleIcon />
          )}
        </div>
      </Tooltip>
  );
}

export const botColumns: GridColDef[] = [
  {
    field: 'name',
    headerName: 'Name',
    flex: 1,
    minWidth: 120,
  },
  {
    field: 'binance_account',
    headerName: 'Binance Account',
    flex: 1,
    minWidth: 150,
  },
  {
    field: 'risk_tolerance',
    headerName: 'Risk Tolerance',
    flex: 1,
    minWidth: 130,
    align: 'center',
    headerAlign: 'center',

    renderCell: (params) => renderRiskChip(params.value as number),
  },
  {
    field: 'target_profit',
    headerName: 'Target Profit',
    flex: 1,
    minWidth: 120,
    align: 'center',
    headerAlign: 'center',

    renderCell: (params) => renderProfitChip(params.value as number),
  },
  {
    field: 'is_active',
    headerName: 'Active',
    flex: 1,
    minWidth: 100,
    align: 'center',
    headerAlign: 'center',

    renderCell: (params) => renderIsActive(params.value as boolean),
  },
  {
    field: 'account_type',
    headerName: 'Account Type',
    flex: 1,
    minWidth: 120,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params) => renderAccountType(params.value as string),
  },
];

export const botRows: GridRowsProp = [
  {
    id: 1,
    name: 'AlphaBot',
    color: '#1E90FF',
    is_active: true,
    binance_account: 'alpha123',
    risk_tolerance: 10,
    target_profit: 20,
    account_type: 'Live', // Added account type
  },
  {
    id: 2,
    name: 'BetaBot',
    color: '#32CD32',
    is_active: false,
    binance_account: 'beta456',
    risk_tolerance: 50,
    target_profit: 15,
    account_type: 'Testnet', // Added account type
  },
  {
    id: 3,
    name: 'GammaBot',
    color: '#FF4500',
    is_active: true,
    binance_account: 'gamma789',
    risk_tolerance: 25,
    target_profit: 10,
    account_type: 'Live', // Added account type
  },
  {
    id: 4,
    name: 'DeltaBot',
    color: '#FFD700',
    is_active: true,
    binance_account: 'delta101',
    risk_tolerance: 50,
    target_profit: 12,
    account_type: 'Testnet', // Added account type
  },
  {
    id: 5,
    name: 'EpsilonBot',
    color: '#FF69B4',
    is_active: false,
    binance_account: 'epsilon202',
    risk_tolerance: 75,
    target_profit: 25,
    account_type: 'Live', // Added account type
  },
];
