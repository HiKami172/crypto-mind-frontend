import React, {useState} from 'react';
import styled from 'styled-components';
import Header from '../components/Header/Header';
import UserInfo from '../components/Dashboard/UserInfo/UserInfo';
import ActiveOrders from '../components/Dashboard/Analyzer/ActiveOrders';
import ChatPanel from "../components/Dashboard/ChatBot/ChatPanel";
import SubscriptionModal from "../components/Dashboard/SubscriptionModal/SubscriptionModal";

const Container = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
`;

const Content = styled.div`
  display: flex;
  flex: 2;
    padding: 20px;
`;

const MainArea = styled.div`
  display: flex;
  flex-direction: column;
  flex: 2;
  padding: 20px;
`;

const DashboardPage: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    return (
        <Container>
            <Header onOpenModal={handleOpenModal} />
            <Content>
                <MainArea>
                    <UserInfo />
                    <ActiveOrders />
                </MainArea>
                <ChatPanel />
            </Content>
            <SubscriptionModal isOpen={isModalOpen} onClose={handleCloseModal} />
        </Container>
    );
}

export default DashboardPage;
