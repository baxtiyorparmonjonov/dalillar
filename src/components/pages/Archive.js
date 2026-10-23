import React from 'react';
import { useEvidence } from '../hooks/useEvidence';
import { EvidenceCard } from '../ui/EvidenceCard';

export const Archive = () => {
  const { evidenceList, loading, toggleArchive, deleteEvidence } = useEvidence();

  const archivedEvidences = evidenceList.filter(e => e.archived);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Arxiv</h1>
        <p className="text-gray-500 text-sm">Arxivlangan va yopilgan dalillar</p>
      </div>

      {loading ? (
        <div>Yuklanmoqda...</div>
      ) : archivedEvidences.length === 0 ? (
        <p className="text-gray-500">Arxivlangan dalillar yo'q.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {archivedEvidences.map(evidence => (
            <EvidenceCard
              key={evidence._id || evidence.id}
              evidence={evidence}
              onArchive={toggleArchive}
              onDelete={deleteEvidence}
            />
          ))}
        </div>
      )}
    </div>
  );
};