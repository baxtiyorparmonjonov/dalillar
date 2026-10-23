import { useState, useEffect, useCallback } from 'react';
import { evidenceService } from '../services/evidenceService';

export const useEvidence = () => {
  const [evidenceList, setEvidenceList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEvidence = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await evidenceService.getAll();
      if (Array.isArray(data)) {
        setEvidenceList(data);
      } else {
        setEvidenceList([]);
      }
    } catch (err) {
      console.error(err);
      setError(err.message || "Ma'lumotlarni yuklashda xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvidence();
  }, [fetchEvidence]);

  const addEvidence = async (data) => {
    await evidenceService.create(data);
    await fetchEvidence();
  };

  const toggleArchive = async (id) => {
    await evidenceService.toggleArchive(id);
    await fetchEvidence();
  };

  const deleteEvidence = async (id) => {
    await evidenceService.delete(id);
    await fetchEvidence();
  };

  return {
    evidenceList,
    loading,
    error,
    addEvidence,
    toggleArchive,
    deleteEvidence,
    refresh: fetchEvidence
  };
};