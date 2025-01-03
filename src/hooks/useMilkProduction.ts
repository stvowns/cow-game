import { useEffect } from 'react';

interface MilkProductionProps {
  health: number;
  hunger: number;
  milkProductionRate: number;
  hasEverFed: boolean;
  setMilk: (value: number | ((prev: number) => number)) => void;
}

export function useMilkProduction({
  health,
  hunger,
  milkProductionRate,
  hasEverFed,
  setMilk
}: MilkProductionProps) {
  useEffect(() => {
    // Üretim koşullarını kontrol et
    if (health <= 0 || !hasEverFed) {
      console.log('Süt üretimi durdu:', {
        sağlık: health,
        açlık: hunger,
        yemKullanıldı: hasEverFed,
        koşullar: {
          sağlıkKontrol: health > 0,
          yemKontrol: hasEverFed
        }
      });
      return;
    }

    console.log('Süt üretimi başladı:', {
      sağlık: health,
      açlık: hunger,
      yemKullanıldı: hasEverFed,
      üretimHızı: milkProductionRate
    });

    const milkInterval = setInterval(() => {
      setMilk(prevMilk => {
        const newMilk = prevMilk + 0.1; // Her saniye 0.1 litre artır
        console.log('Süt üretimi:', { 
          öncekiMiktar: prevMilk.toFixed(4), 
          yeniMiktar: newMilk.toFixed(4),
          koşullar: {
            sağlık: health,
            açlık: hunger,
            yemKullanıldı: hasEverFed,
            üretimHızı: milkProductionRate
          }
        });
        return Number(newMilk.toFixed(4));
      });
    }, 1000); // Her saniye güncelle

    return () => clearInterval(milkInterval);
  }, [health, hasEverFed, milkProductionRate, setMilk]);
} 