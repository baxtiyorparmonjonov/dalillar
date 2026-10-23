import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { evidenceService } from '../services/evidenceService';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/Button';
import { Map } from '../ui/map';
import { ArrowLeft, MapPin, UserCheck, MessageSquare, Send } from 'lucide-react';

export const EvidenceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [evidence, setEvidence] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [commentText, setCommentText] = useState('');
  const [commentError, setCommentError] = useState('');
  const [savingComment, setSavingComment] = useState(false);

  useEffect(() => {
    let isActive = true;
    setLoading(true);
    setError('');

    evidenceService.getById(id)
      .then((data) => {
        if (isActive) setEvidence(data);
      })
      .catch((err) => {
        if (isActive) setError(err.message || "Dalilni yuklashda xatolik yuz berdi.");
      })
      .finally(() => {
        if (isActive) setLoading(false);
      });

    return () => {
      isActive = false;
    };
  }, [id]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    const text = commentText.trim();
    if (!text || savingComment) return;

    setCommentError('');
    setSavingComment(true);
    try {
      const updated = await evidenceService.addComment(id, {
        user: user?.name || 'Tergovchi',
        text,
      });
      setEvidence(updated);
      setCommentText('');
    } catch (err) {
      setCommentError(err.message || "Izohni yuborishda xatolik yuz berdi.");
    } finally {
      setSavingComment(false);
    }
  };

  if (loading) return <div>Yuklanmoqda...</div>;
  if (error || !evidence) {
    return (
      <div role="alert" className="max-w-3xl mx-auto bg-red-50 text-red-700 p-4 rounded-xl">
        {error || 'Dalil topilmadi.'}
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto bg-white p-4 md:p-6 rounded-xl border border-gray-200">
      <Button variant="secondary" onClick={() => navigate(-1)} className="mb-4 text-xs md:text-sm">
        <ArrowLeft size={16} /> Ortga
      </Button>

      <div className="border-b pb-4 mb-4">
        <span className="text-xs md:text-sm text-blue-600 font-semibold">{evidence._id || evidence.id}</span>
        <h1 className="text-xl md:text-2xl font-bold mt-1">{evidence.title}</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <span className="text-xs text-gray-500 block">Ish Raqami</span>
          <span className="font-medium text-sm md:text-base">{evidence.caseNumber}</span>
        </div>
        <div>
          <span className="text-xs text-gray-500 block">Kategoriya</span>
          <span className="font-medium text-sm md:text-base">{evidence.category}</span>
        </div>
        <div>
          <span className="text-xs text-gray-500 block">Mas'ul shaxs</span>
          <span className="font-medium text-sm md:text-base">{evidence.addedBy}</span>
        </div>
        <div>
          <span className="text-xs text-gray-500 block">Sana</span>
          <span className="font-medium text-sm md:text-base">{evidence.createdAt?.split('T')[0]}</span>
        </div>
      </div>

      <div className="bg-slate-50 p-3 md:p-4 rounded-xl space-y-3 mb-6 border border-slate-100">
        <div className="flex items-center gap-3">
          <MapPin size={18} className="text-red-500 shrink-0" />
          <div className="min-w-0">
            <span className="text-xs text-gray-500 block">Joylashuv</span>
            <span className="font-semibold text-gray-800 text-sm md:text-base block truncate">{evidence.location || "Ko'rsatilmagan"}</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <UserCheck size={18} className="text-green-500 shrink-0" />
          <div className="min-w-0">
            <span className="text-xs text-gray-500 block">Bajaruvchi</span>
            <span className="font-semibold text-gray-800 text-sm md:text-base block truncate">{evidence.assignee || "Tayinlanmagan"}</span>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold text-sm text-gray-700 mb-2">Xaritada Joylashuvi</h3>
        <Map singleEvidence={evidence} className="h-64 w-full rounded-xl overflow-hidden border border-gray-200" />
      </div>

      <div className="mb-6">
        <h3 className="font-semibold text-sm text-gray-700 mb-2">Tavsif</h3>
        <p className="text-gray-600 bg-gray-50 p-3 md:p-4 rounded-lg text-sm md:text-base">{evidence.description}</p>
      </div>

      <div className="border-t pt-6">
        <h3 className="font-semibold text-sm text-gray-800 mb-4 flex items-center gap-2">
          <MessageSquare size={18} /> Izohlar va Muhokama ({evidence.comments?.length || 0})
        </h3>
        
        <div className="space-y-3 mb-4">
          {evidence.comments?.map((c, index) => (
            <div key={index} className="bg-gray-50 p-3 rounded-lg border border-gray-100">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-semibold text-blue-600">{c.user}</span>
                <span className="text-xs text-gray-400">
                  {c.date ? new Date(c.date).toLocaleString() : ''}
                </span>
              </div>
              <p className="text-sm text-gray-700">{c.text}</p>
            </div>
          ))}
        </div>

        <form onSubmit={handleAddComment} className="flex gap-2">
          <input
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg outline-none text-sm"
            placeholder="Izoh yozish..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <Button type="submit" className="text-xs md:text-sm">
            <Send size={16} /> {savingComment ? 'Yuborilmoqda...' : 'Yuborish'}
          </Button>
        </form>
        {commentError && (
          <p role="alert" className="mt-2 text-sm text-red-600">{commentError}</p>
        )}
      </div>
    </div>
  );
};