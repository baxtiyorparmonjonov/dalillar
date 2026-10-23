import React from 'react';
import { useEvidence } from '../hooks/useEvidence';
import { Folder, Shield } from 'lucide-react';

export const Cases = () => {
  const { evidenceList, loading } = useEvidence();

  const groupedCases = evidenceList.reduce((acc, item) => {
    const caseNum = item.caseNumber || 'Noma\'lum ish';
    if (!acc[caseNum]) {
      acc[caseNum] = [];
    }
    acc[caseNum].push(item);
    return acc;
  }, {});

  if (loading) return <div>Yuklanmoqda...</div>;

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900">Jinoyat Ishlari</h1>
        <p className="text-gray-500 text-xs md:text-sm">Ish raqamlari bo'yicha guruhlangan dalillar</p>
      </div>

      <div className="space-y-4">
        {Object.keys(groupedCases).map((caseNum) => (
          <div key={caseNum} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3 border-b pb-3 mb-3">
              <Folder className="text-blue-600" size={22} />
              <h3 className="font-bold text-base text-gray-800">{caseNum}</h3>
              <span className="ml-auto text-xs font-semibold px-2.5 py-1 bg-blue-50 text-blue-600 rounded-full">
                {groupedCases[caseNum].length} ta dalil
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {groupedCases[caseNum].map((item) => (
                <div key={item._id || item.id} className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <span className="text-xs font-semibold text-gray-500 block mb-1">{item.category}</span>
                  <h4 className="font-semibold text-sm text-gray-800">{item.title}</h4>
                  <p className="text-xs text-gray-500 mt-1 truncate">{item.location}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};