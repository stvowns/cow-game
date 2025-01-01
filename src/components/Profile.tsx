import styled from 'styled-components';
import { useState } from 'react';

interface ProfileProps {
  username: string;
  email: string;
  joinDate: string;
  totalEarnings: number;
  onUpdateProfile: (data: { username?: string; email?: string; password?: string }) => void;
}

const ProfileContainer = styled.div`
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
`;

const Section = styled.div`
  background: var(--bg-secondary);
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px var(--shadow-color);

  h3 {
    color: var(--text-primary);
    margin: 0 0 20px 0;
    display: flex;
    align-items: center;
    gap: 10px;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0 20px;

  label {
    display: block;
    margin-bottom: 5px;
    color: var(--text-primary);
    font-weight: 500;
  }

  input {
    width: 50%;
    padding: 10px;
    border-radius: 8px;
    border: 1px solid var(--border-color);
    background: var(--card-bg);
    color: var(--text-primary);
    font-size: 1em;

    &:focus {
      outline: none;
      border-color: var(--accent-primary);
    }
  }
`;

const Button = styled.button`
  background: var(--accent-primary);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s;
  width: 50%;
  margin-left: 20px;

  &:hover {
    background: var(--accent-secondary);
  }

  &:disabled {
    background: var(--text-secondary);
    cursor: not-allowed;
  }
`;

const StatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-bottom: 20px;
`;

const StatItem = styled.div`
  background: var(--card-bg);
  padding: 15px;
  border-radius: 10px;
  text-align: center;

  h4 {
    color: var(--text-secondary);
    margin: 0 0 5px 0;
    font-size: 0.9em;
  }

  p {
    color: var(--text-primary);
    font-size: 1.2em;
    font-weight: 500;
    margin: 0;
  }
`;

export function Profile({ username, email, joinDate, totalEarnings, onUpdateProfile }: ProfileProps) {
  const [newUsername, setNewUsername] = useState(username);
  const [newEmail, setNewEmail] = useState(email);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleUpdateProfile = () => {
    const updates: { username?: string; email?: string; password?: string } = {};
    
    if (newUsername !== username) updates.username = newUsername;
    if (newEmail !== email) updates.email = newEmail;
    if (newPassword && newPassword === confirmPassword) updates.password = newPassword;

    onUpdateProfile(updates);
  };

  return (
    <ProfileContainer>
      <Section>
        <h3>📊 İstatistikler</h3>
        <StatGrid>
          <StatItem>
            <h4>Toplam Kazanç</h4>
            <p>{totalEarnings.toLocaleString('tr-TR')} ₺</p>
          </StatItem>
          <StatItem>
            <h4>Katılım Tarihi</h4>
            <p>{joinDate}</p>
          </StatItem>
        </StatGrid>
      </Section>

      <Section>
        <h3>👤 Profil Bilgileri</h3>
        <FormGroup>
          <label>Kullanıcı Adı</label>
          <input
            type="text"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <label>E-posta</label>
          <input
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
        </FormGroup>
        <Button 
          onClick={handleUpdateProfile}
          disabled={newUsername === username && newEmail === email}
        >
          Bilgileri Güncelle
        </Button>
      </Section>

      <Section>
        <h3>🔒 Şifre Değiştir</h3>
        <FormGroup>
          <label>Mevcut Şifre</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <label>Yeni Şifre</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <label>Yeni Şifre (Tekrar)</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </FormGroup>
        <Button 
          onClick={handleUpdateProfile}
          disabled={!currentPassword || !newPassword || newPassword !== confirmPassword}
        >
          Şifreyi Değiştir
        </Button>
      </Section>
    </ProfileContainer>
  );
} 