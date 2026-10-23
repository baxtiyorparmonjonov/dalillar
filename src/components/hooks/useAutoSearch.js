import { useEffect, useState } from 'react';
import { evidenceService } from '../services/evidenceService';

export const useAutoSearch = (onFound, interval = 10000) => {
  const [isActive, setIsActive] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isActive) return undefined;

    const timer = setInterval(async () => {
      setError('');
      setScanning(true);
      try {
        await evidenceService.autoScan();
        if (onFound) await onFound();
      } catch (err) {
        setError(err.message || "Avtomatik qidiruvda xatolik yuz berdi");
        setIsActive(false);
      } finally {
        setScanning(false);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [isActive, interval, onFound]);

  return {
    isActive,
    scanning,
    error,
    toggle: () => setIsActive(!isActive)
  };
};