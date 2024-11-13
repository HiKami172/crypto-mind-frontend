// Header.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from '@mui/material';
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    background-color: #f8f8f8;
`;

const Title = styled.h1`
    font-size: 24px;
`;

interface HeaderProps {
    onOpenModal: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenModal }) => {
    const [error, setError] = useState('');
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleSignOut = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            logout(navigate);
        } catch (err: any) {
            setError(`Failed to logout.`);
        }
    };

    return (
        <HeaderContainer>
            <Title>Crypto Chat Bot</Title>
            {/* Trigger onOpenModal when "Buy Subscription" is clicked */}
            <Button variant="contained" color="success" onClick={onOpenModal}>
                Buy Subscription
            </Button>
            <Button variant="contained" color="primary" onClick={handleSignOut}>
                Logout
            </Button>
        </HeaderContainer>
    );
};

export default Header;
