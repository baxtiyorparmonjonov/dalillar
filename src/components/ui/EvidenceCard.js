import React from 'react';
import { Link } from 'react-router-dom';
import { Archive, Trash2, Eye, MapPin, UserCheck } from 'lucide-react';
import { Button } from './Button';
import { useAuth } from '../../context/AuthContext';

export const EvidenceCard = ({ evidence, onArchive, onDelete }) => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col">
      {evidence.imageUrl && (
        <div className="h-40 w-full bg-gray-100 overflow-hidden">
          <img src={evidence.imageUrl} alt={evidence.title} className="w-full h-full object-cover" />
        </div>
      )}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-3">
            <span className="text-xs font-semibold px-2.5 py-1 bg-blue-50 text-blue-600 rounded-full">
              {evidence.category}
            </span>
            <span className="text-xs text-gray-500">{evidence.createdAt?.split('T')[0] || evidence.date}</span>
          </div>

          <h3 className="font-semibold text-lg text-gray-900 mb-1">{evidence.title}</h3>
          <p className="text-sm text-gray-500 mb-4 line-clamp-2">{evidence.description}</p>

          <div className="space-y-1.5 text-xs text-gray-600 mb-4 bg-gray-50 p-3 rounded-lg">
            <div className="flex items-center gap-2">
              <MapPin size={14} className="text-red-500 shrink-0" />
              <span className="truncate"><strong>Joylashuv:</strong> {evidence.location || "Ko'rsatilmagan"}</span>
            </div>
            <div className="flex items-center gap-2">
              <UserCheck size={14} className="text-green-500 shrink-0" />
              <span className="truncate"><strong>Bajaruvchi:</strong> {evidence.assignee || "Tayinlanmagan"}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between border-t pt-3 gap-2">
          <Link to={`/evidence/${evidence._id || evidence.id}`}>
            <Button variant="secondary" className="text-xs py-1.5 px-3">
              <Eye size={14} /> Ko'rish
            </Button>
          </Link>

          {/* Faqat Admin uchun o'chirish va arxivlash tugmalari ko'rinadi */}
          {isAdmin && (
            <div className="flex gap-1">
              <Button 
                variant="outline" 
                className="text-xs p-2" 
                title={evidence.archived ? "Arxivdan chiqarish" : "Arxivlash"}
                onClick={() => onArchive(evidence._id || evidence.id)}
              >
                <Archive size={14} />
              </Button>
              <Button 
                variant="danger" 
                className="text-xs p-2" 
                title="O'chirish"
                onClick={() => onDelete(evidence._id || evidence.id)}
              >
                <Trash2 size={14} />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};