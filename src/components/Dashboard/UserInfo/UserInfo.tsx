import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserInfo, selectUser } from '../../../store/userSlice';

const UserInfoContainer = styled.div`
  padding: 20px;
  background-color: #fff;
  border-bottom: 1px solid #e0e0e0;
`;

const UserInfo: React.FC = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);

    useEffect(() => {
        // @ts-ignore
        dispatch(fetchUserInfo());
    }, [dispatch]);

    if (user.status === 'loading') return <p>Loading...</p>;
    if (user.status === 'failed') return <p>Error loading user data</p>;

    return (
        <UserInfoContainer>
            <h2><strong>{user.name}</strong></h2>
            <p>{user.email}</p>
            <p>Total Worth: <strong>$123,567.12</strong></p>
            <p>Active Assets: <strong>$74,000</strong></p>
        </UserInfoContainer>
    )
};

export default UserInfo;
