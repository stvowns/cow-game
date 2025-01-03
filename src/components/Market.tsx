import styled from 'styled-components';
import { FEEDS, FeedType } from '../App';

const MarketContainer = styled.div`
  padding: 20px;
  max-width: 860px;
  margin: 0 auto;
`;

const MarketHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 15px;
  background: var(--bg-primary);
  border-radius: 10px;
  box-shadow: 0 2px 4px var(--shadow-color);
`;

const PointsDisplay = styled.div`
  font-size: 1.2em;
  font-weight: 500;
  color: var(--text-primary);
  
  span {
    color: var(--accent-primary);
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 20px;
  padding: 20px;
`;

const ProductCard = styled.div`
  background: var(--bg-secondary);
  border-radius: 12px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px var(--shadow-color);
  min-width: 180px;
  border: 1px solid var(--border-color);

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px var(--shadow-color);
  }

  .product-info {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .product-name {
    font-size: 1.2em;
    font-weight: 600;
    color: var(--text-primary);
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .product-stats {
    display: flex;
    flex-direction: column;
    gap: 6px;
    font-size: 0.9em;
    color: var(--text-secondary);
    padding: 10px;
    background: var(--bg-primary);
    border-radius: 8px;
  }

  .buttons {
    display: flex;
    gap: 10px;
    margin-top: auto;
  }
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  height: 40px;
  font-size: 0.9em;
  
  background: ${props => {
    if (props.variant === 'primary') return '#2196F3';
    if (props.variant === 'secondary') return props.disabled ? 'var(--bg-primary)' : '#4CAF50';
    return 'var(--bg-primary)';
  }};
  color: ${props => props.variant === 'secondary' && !props.disabled ? 'white' : props.variant === 'primary' 
    ? 'white'
    : 'var(--text-primary)'};
  border: 1px solid ${props => {
    if (props.variant === 'primary') return '#1976D2';
    if (props.variant === 'secondary') return props.disabled ? 'var(--border-color)' : '#43A047';
    return 'var(--border-color)';
  }};

  &:hover:not(:disabled) {
    opacity: 0.9;
    transform: translateY(-2px);
    background: ${props => {
      if (props.variant === 'primary') return '#1976D2';
      if (props.variant === 'secondary') return '#43A047';
      return 'var(--bg-secondary)';
    }};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
    background: var(--bg-primary);
    color: var(--text-secondary);
    border-color: var(--border-color);
  }
`;

interface MarketProps {
  points: number;
  level: number;
  feed: { [key: string]: number };
  onBuy: (feedType: string) => void;
  onFeedCow: (feedType: string) => void;
  hunger: number;
  health: number;
}

const getProductIcon = (name: string) => {
  const icons: { [key: string]: string } = {
    'Çim': '🌿',
    'Yaprak': '🍃',
    'Buğday': '🌾',
    'Ayçiçeği': '🌻',
    'Mısır': '🌽',
    'Karpuz': '🍉',
    'Havuç': '🥕',
    'Patlıcan': '🍆',
    'Elma': '🍎',
    'Kiraz': '🍒',
    'Üzüm': '🍇',
    'Lahana': '🥬',
    'Şeftali': '🍑',
    'Balkabağı': '🎃',
    'Biber': '🫑',
    'Yonca': '🍀'
  };
  return icons[name] || '🌱';
};

export function Market({ points, level, feed, onBuy, onFeedCow, hunger, health }: MarketProps) {
  return (
    <MarketContainer>
      <MarketHeader>
        <PointsDisplay>Mevcut Puanınız: {points.toLocaleString('tr-TR')}</PointsDisplay>
      </MarketHeader>
      <ProductGrid>
        {FEEDS.map((product, index) => (
          <ProductCard key={product.name}>
            <div className="product-info">
              <span className="product-name">
                {getProductIcon(product.name)} {product.name}
              </span>
              <div className="product-stats">
                <span>Enerji: %{product.energy}</span>
                <span>Verim: {product.yield} Lt/dk</span>
                <span>Fiyat: {product.price.toLocaleString('tr-TR')} Puan</span>
                <span>Stok: {feed[product.name] || 0}</span>
              </div>
            </div>
            <div className="buttons">
              <Button
                variant="primary"
                onClick={() => onBuy(product.name)}
                disabled={points < product.price || level < product.minLevel}
              >
                Satın Al
              </Button>
              <Button
                variant="secondary"
                onClick={() => onFeedCow(product.name)}
                disabled={!feed[product.name] || health <= 0}
              >
                Besle
              </Button>
            </div>
          </ProductCard>
        ))}
      </ProductGrid>
    </MarketContainer>
  );
} 