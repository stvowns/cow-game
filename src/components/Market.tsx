import { useState } from 'react';
import styled from 'styled-components';

type FeedType = 'standard' | 'premium' | 'super';

interface MarketProps {
  points: number;
  onBuyFeed: (feedType: FeedType) => void;
  onSendPoints: (amount: number) => void;
}

const MarketContainer = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 15px;
  padding: 20px;
  width: 100%;
  max-width: 600px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const TabContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const Tab = styled.button<{ active?: boolean }>`
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  background: ${props => props.active ? '#4CAF50' : '#e0e0e0'};
  color: ${props => props.active ? 'white' : '#213547'};
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: ${props => props.active ? '#45a049' : '#d0d0d0'};
  }
`;

const FeedItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  margin-bottom: 10px;
  transition: all 0.3s;

  &:hover {
    background: #f5f5f5;
    transform: translateY(-2px);
  }
`;

const FeedInfo = styled.div`
  flex: 1;
  
  h3 {
    margin: 0;
    color: #213547;
  }
  
  p {
    margin: 5px 0 0;
    color: #666;
    font-size: 0.9em;
  }
`;

const BuyButton = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  background: #4CAF50;
  color: white;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: #45a049;
  }

  &:disabled {
    background: #cccccc;
    cursor: not-allowed;
  }
`;

const SendPointsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 20px;
  background: #f5f5f5;
  border-radius: 8px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1em;
`;

const feedTypes: Array<{
  name: string;
  description: string;
  price: number;
  id: FeedType;
}> = [
  {
    name: 'Standart Yem',
    description: 'Enerji: %25, Verim: 0.15L/dk',
    price: 50,
    id: 'standard'
  },
  {
    name: 'Premium Yem',
    description: 'Enerji: %35, Verim: 0.25L/dk',
    price: 100,
    id: 'premium'
  },
  {
    name: 'Süper Yem',
    description: 'Enerji: %50, Verim: 0.4L/dk',
    price: 200,
    id: 'super'
  }
];

export function Market({ points, onBuyFeed, onSendPoints }: MarketProps) {
  const [activeTab, setActiveTab] = useState('market');
  const [sendAmount, setSendAmount] = useState('');

  const handleSendPoints = () => {
    const amount = parseInt(sendAmount);
    if (amount && amount > 0 && amount <= points) {
      onSendPoints(amount);
      setSendAmount('');
    }
  };

  return (
    <MarketContainer>
      <TabContainer>
        <Tab 
          active={activeTab === 'market'} 
          onClick={() => setActiveTab('market')}
        >
          Market
        </Tab>
        <Tab 
          active={activeTab === 'send'} 
          onClick={() => setActiveTab('send')}
        >
          Puan Gönder
        </Tab>
      </TabContainer>

      {activeTab === 'market' ? (
        <div>
          <h2>Yem Market</h2>
          <p>Mevcut Puanınız: {points}</p>
          {feedTypes.map(feed => (
            <FeedItem key={feed.id}>
              <FeedInfo>
                <h3>{feed.name}</h3>
                <p>{feed.description}</p>
              </FeedInfo>
              <BuyButton 
                onClick={() => onBuyFeed(feed.id)}
                disabled={points < feed.price}
              >
                Satın Al ({feed.price} puan)
              </BuyButton>
            </FeedItem>
          ))}
        </div>
      ) : (
        <SendPointsContainer>
          <h2>Puan Gönder</h2>
          <p>Mevcut Puanınız: {points}</p>
          <p>Gönderdiğiniz puanlar, aylık reklam gelirinden pay almanızı sağlar.</p>
          <Input
            type="number"
            value={sendAmount}
            onChange={(e) => setSendAmount(e.target.value)}
            placeholder="Göndermek istediğiniz puan miktarı"
            max={points}
            min={1}
          />
          <BuyButton 
            onClick={handleSendPoints}
            disabled={!sendAmount || parseInt(sendAmount) > points}
          >
            Puanları Gönder
          </BuyButton>
        </SendPointsContainer>
      )}
    </MarketContainer>
  );
} 