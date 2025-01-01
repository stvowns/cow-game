import styled from 'styled-components';
import { FaUserPlus, FaLink, FaCopy } from 'react-icons/fa';

interface ReferralSystemProps {
  referralCode: string;
  referralCount: number;
  totalEarnings: number;
  activeReferrals: Array<{
    username: string;
    registrationDate: string;
    daysLeft: number;
    totalEarnings: number;
  }>;
}

const Container = styled.div`
  padding: 20px;
`;

const ReferralCard = styled.div`
  background: var(--bg-secondary);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px var(--shadow-color);
`;

const ReferralLink = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background: var(--bg-primary);
  padding: 12px;
  border-radius: 8px;
  margin: 15px 0;

  input {
    flex: 1;
    background: none;
    border: none;
    color: var(--text-primary);
    font-size: 0.9em;
    &:focus {
      outline: none;
    }
  }

  button {
    background: none;
    border: none;
    color: var(--accent-primary);
    cursor: pointer;
    padding: 8px;
    border-radius: 4px;
    transition: all 0.3s;

    &:hover {
      background: var(--bg-secondary);
    }
  }
`;

const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin: 20px 0;
`;

const StatItem = styled.div`
  background: var(--bg-primary);
  padding: 15px;
  border-radius: 8px;
  text-align: center;

  h4 {
    color: var(--text-secondary);
    margin: 0 0 10px 0;
    font-size: 0.9em;
  }

  p {
    color: var(--text-primary);
    font-size: 1.2em;
    margin: 0;
    font-weight: 500;
  }
`;

const ReferralList = styled.div`
  margin-top: 20px;

  h3 {
    margin-bottom: 15px;
    color: var(--text-primary);
  }
`;

const ReferralItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background: var(--bg-primary);
  border-radius: 8px;
  margin-bottom: 10px;

  .info {
    h4 {
      margin: 0;
      color: var(--text-primary);
    }
    p {
      margin: 5px 0 0 0;
      font-size: 0.9em;
      color: var(--text-secondary);
    }
  }

  .status {
    text-align: right;
    p {
      margin: 0;
      &.earnings {
        color: #4CAF50;
        font-weight: 500;
      }
      &.days-left {
        font-size: 0.9em;
        color: var(--text-secondary);
        margin-top: 5px;
      }
    }
  }
`;

export function ReferralSystem({ referralCode, referralCount, totalEarnings, activeReferrals }: ReferralSystemProps) {
  const copyReferralLink = () => {
    const link = `https://yourdomain.com/register?ref=${referralCode}`;
    navigator.clipboard.writeText(link);
    // Bildirim göster
    const notification = document.createElement('div');
    notification.textContent = 'Referans linki kopyalandı!';
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #4CAF50;
      color: white;
      padding: 10px 20px;
      border-radius: 8px;
      animation: slideIn 0.3s ease-out;
      z-index: 1000;
    `;
    
    document.body.appendChild(notification);
    setTimeout(() => {
      notification.style.animation = 'fadeOut 0.3s ease-out';
      setTimeout(() => notification.remove(), 300);
    }, 2000);
  };

  return (
    <Container>
      <ReferralCard>
        <h3 style={{ margin: '0 0 15px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <FaUserPlus /> Referans Sistemi
        </h3>
        <p>
          Referans linkinizi paylaşarak her süt satışından %3 bonus kazanın! 
          Referanslarınız 25 gün boyunca geçerlidir.
        </p>
        
        <ReferralLink>
          <FaLink />
          <input 
            type="text" 
            value={`https://yourdomain.com/register?ref=${referralCode}`}
            readOnly 
          />
          <button onClick={copyReferralLink}>
            <FaCopy /> Kopyala
          </button>
        </ReferralLink>

        <Stats>
          <StatItem>
            <h4>Toplam Referans</h4>
            <p>{referralCount}</p>
          </StatItem>
          <StatItem>
            <h4>Toplam Kazanç</h4>
            <p>{totalEarnings} Puan</p>
          </StatItem>
        </Stats>
      </ReferralCard>

      <ReferralList>
        <h3>Aktif Referanslarınız</h3>
        {activeReferrals.map((referral, index) => (
          <ReferralItem key={index}>
            <div className="info">
              <h4>{referral.username}</h4>
              <p>Kayıt: {referral.registrationDate}</p>
            </div>
            <div className="status">
              <p className="earnings">+{referral.totalEarnings} Puan</p>
              <p className="days-left">{referral.daysLeft} gün kaldı</p>
            </div>
          </ReferralItem>
        ))}
        {activeReferrals.length === 0 && (
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
            Henüz aktif referansınız bulunmuyor.
          </p>
        )}
      </ReferralList>
    </Container>
  );
} 