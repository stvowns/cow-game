import styled from 'styled-components';

interface Player {
  id: number;
  username: string;
  sentPoints: number;
  estimatedEarnings: number;
  rank: number;
}

interface LeaderBoardProps {
  players: Array<{
    id: number;
    username: string;
    sentPoints: number;
    estimatedEarnings: number;
    rank: number;
  }>;
  totalPrizePool: number;
  currentMonth: string;
  daysLeft: number;
  currentXp?: number;
  nextLevelXp?: number;
  currentLevel?: number;
}

const Container = styled.div`
  background: var(--bg-secondary);
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 2px 4px var(--shadow-color);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--border-color);

  h2 {
    color: var(--text-primary);
    margin: 0;
  }
`;

const PrizeInfo = styled.div`
  background: var(--accent-primary);
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  text-align: center;
  margin-bottom: 20px;

  h3 {
    margin: 0;
    color: white;
  }

  p {
    margin: 5px 0 0;
    font-size: 0.9em;
    opacity: 0.9;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;

  th, td {
    padding: 12px;
    text-align: left;
    color: var(--text-primary);
    border-bottom: 1px solid var(--border-color);
  }

  th {
    font-weight: 600;
    color: var(--text-secondary);
  }

  tbody tr {
    transition: background-color 0.3s;

    &:hover {
      background: var(--bg-primary);
    }

    &:nth-child(1) td:first-child {
      color: gold;
    }

    &:nth-child(2) td:first-child {
      color: silver;
    }

    &:nth-child(3) td:first-child {
      color: #cd7f32;
    }
  }
`;

const RankCell = styled.td`
  font-weight: bold;
  width: 50px;
`;

const UsernameCell = styled.td`
  font-weight: 500;
`;

const PointsCell = styled.td`
  text-align: right;
  font-family: monospace;
  font-size: 1.1em;
`;

export function LeaderBoard({ 
  players, 
  totalPrizePool, 
  currentMonth, 
  daysLeft,
  currentXp = 0,
  nextLevelXp = 0,
  currentLevel = 1
}: LeaderBoardProps) {
  return (
    <Container>
      <Header>
        <h2>🏆 Puan Sıralaması</h2>
        <div>
          <strong>{currentMonth}</strong>
          <p style={{ margin: '5px 0 0', color: 'var(--text-secondary)' }}>
            {daysLeft} gün kaldı
          </p>
        </div>
      </Header>

      <PrizeInfo>
        <h3>🎉 Ödül Havuzu: {totalPrizePool.toLocaleString('tr-TR')} ₺</h3>
        <p>Bu ay dağıtılacak toplam miktar</p>
      </PrizeInfo>

      <div style={{
        background: '#f5f5f5',
        padding: '15px',
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <div style={{ marginBottom: '10px' }}>
          <strong>Seviye {currentLevel}</strong>
        </div>
        <div style={{ 
          background: '#e0e0e0',
          height: '10px',
          borderRadius: '5px',
          overflow: 'hidden'
        }}>
          <div style={{
            width: `${(currentXp / nextLevelXp) * 100}%`,
            height: '100%',
            background: '#2196F3',
            transition: 'width 0.3s ease'
          }} />
        </div>
        <div style={{ 
          fontSize: '0.9em',
          color: '#666',
          marginTop: '5px'
        }}>
          {currentXp.toLocaleString()} / {nextLevelXp.toLocaleString()} XP
        </div>
      </div>

      <div style={{ marginBottom: '20px', color: '#666' }}>
        <p>Kalan Süre: {daysLeft} gün</p>
        <p>Toplam Ödül Havuzu: {totalPrizePool.toLocaleString()} Puan</p>
      </div>

      <Table>
        <thead>
          <tr>
            <th>Sıra</th>
            <th>Kullanıcı</th>
            <th style={{ textAlign: 'right' }}>Gönderilen Puan</th>
            <th style={{ textAlign: 'right' }}>Tahmini Kazanç</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr key={player.id}>
              <RankCell>{player.rank}</RankCell>
              <UsernameCell>{player.username}</UsernameCell>
              <PointsCell>{player.sentPoints.toLocaleString('tr-TR')}</PointsCell>
              <PointsCell>
                {totalPrizePool > 0
                  ? `₺${((player.sentPoints / totalPrizePool) * totalPrizePool).toLocaleString('tr-TR', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}`
                  : '₺0.00'}
              </PointsCell>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
} 