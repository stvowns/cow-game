import styled from 'styled-components';

interface Player {
  id: number;
  username: string;
  sentPoints: number;
  estimatedEarnings: number;
  rank: number;
}

interface LeaderBoardProps {
  players: Player[];
  totalPrizePool: number;
  currentMonth: string;
  daysLeft: number;
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

export function LeaderBoard({ players, totalPrizePool, currentMonth, daysLeft }: LeaderBoardProps) {
  const totalPoints = players.reduce((sum, player) => sum + player.sentPoints, 0);

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
                {totalPoints > 0
                  ? `₺${((player.sentPoints / totalPoints) * totalPrizePool).toLocaleString('tr-TR', {
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