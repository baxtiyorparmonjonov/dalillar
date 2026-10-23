import React, { useState } from 'react';
import { useEvidence } from '../hooks/useEvidence';
import { useAutoSearch } from '../hooks/useAutoSearch';
import { EvidenceCard } from '../ui/EvidenceCard';
import { Button } from '../ui/Button';
import { Map } from '../ui/map';
import { Bot, Loader2, RefreshCw, MapPin, Grid, BarChart2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export const Dashboard = () => {
  const { evidenceList, loading, error, toggleArchive, deleteEvidence, refresh } = useEvidence();
  const { isActive, scanning, toggle } = useAutoSearch(refresh, 10000);
  const [showMap, setShowMap] = useState(true);
  const [showStats, setShowStats] = useState(true);

  const activeEvidences = evidenceList.filter(e => !e.archived);

  const statsData = [
    { name: 'Fizik', count: activeEvidences.filter(e => e.category === 'Fizik dalil').length },
    { name: 'Raqamli', count: activeEvidences.filter(e => e.category === 'Raqamli dalil').length },
    { name: 'Hujjat', count: activeEvidences.filter(e => e.category === 'Hujjat').length },
    { name: 'Biologik', count: activeEvidences.filter(e => e.category === 'Biologik dalil').length },
  ];

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">Aktiv Dalillar</h1>
          <p className="text-gray-500 text-xs md:text-sm">Hozirda ko'rib chiqilayotgan barcha dalillar ro'yxati</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Button
            variant="outline"
            onClick={() => setShowStats(!showStats)}
            className="text-xs py-2 px-3"
          >
            <BarChart2 size={16} />
            {showStats ? "Statistikani yashirish" : "Statistika"}
          </Button>

          <Button
            variant="outline"
            onClick={() => setShowMap(!showMap)}
            className="text-xs py-2 px-3"
          >
            {showMap ? <Grid size={16} /> : <MapPin size={16} />}
            {showMap ? "Xaritani yashirish" : "Xarita"}
          </Button>

          {scanning && (
            <span className="text-xs text-blue-600 flex items-center gap-1">
              <Loader2 size={14} className="animate-spin" />
            </span>
          )}

          <Button
            variant={isActive ? "primary" : "outline"}
            onClick={toggle}
            className="text-xs py-2 px-3"
          >
            <Bot size={16} />
            {isActive ? "Avto-qidiruv: Ishlayapti" : "Avto-qidiruvni yoqish"}
          </Button>
        </div>
      </div>

      {showStats && (
        <div className="mb-6 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="font-semibold text-sm text-gray-700 mb-3">Kategoriyalar bo'yicha tahlil</h3>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={statsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="count" fill="#2563eb" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {showMap && activeEvidences.length > 0 && (
        <div className="mb-6">
          <Map evidences={activeEvidences} className="h-72 w-full rounded-xl overflow-hidden shadow-sm border border-gray-200" />
        </div>
      )}

      {loading ? (
        <div className="flex items-center gap-2 text-gray-600 p-4">
          <Loader2 size={20} className="animate-spin text-blue-600" />
          <span>Yuklanmoqda...</span>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl flex items-center justify-between">
          <span>Backend server bilan aloqa yo'q yoki xatolik: {error}</span>
          <Button variant="outline" className="text-xs" onClick={refresh}>
            <RefreshCw size={14} /> Qayta urinish
          </Button>
        </div>
      ) : activeEvidences.length === 0 ? (
        <p className="text-gray-500 bg-white p-6 rounded-xl border border-gray-200 text-center">
          Aktiv dalillar topilmadi.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {activeEvidences.map(evidence => (
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