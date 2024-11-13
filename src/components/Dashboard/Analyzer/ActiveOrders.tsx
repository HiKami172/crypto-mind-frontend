import React from 'react';
import styled from 'styled-components';

const OrdersContainer = styled.div`
  margin-top: 20px;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Order = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #e0e0e0;
    border-radius: 6px;
    gap: 30px; /* Adjust this value as needed */
`;
const BuySellButton = styled.div<{ type: 'buy' | 'sell' }>`
  color: #fff;
  background-color: ${({ type }) => (type === 'buy' ? '#4caf50' : '#f44336')};
  padding: 6px 12px;
  border-radius: 4px;
  text-align: center;
`;

const ActiveOrders: React.FC = () => (
    <OrdersContainer>
        <h3>Active Orders</h3>
        <Order>
            <BuySellButton type="buy">Buy</BuySellButton>
            <span>BTC/USDT</span>
            <span>$50,000</span>
            <span>0.1 BTC</span>
            <span>14:32 UTC 15.10.2024</span>
        </Order>
        <Order>
            <BuySellButton type="sell">Sell</BuySellButton>
            <span>ETH/USDT</span>
            <span>$3,200</span>
            <span>2.5 ETH</span>
            <span>09:17 UTC 15.10.2024</span>
        </Order>
        {/* Additional orders... */}
    </OrdersContainer>
);

export default ActiveOrders;
