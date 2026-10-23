import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEvidence } from '../hooks/useEvidence';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { EvidenceLocationMap } from '../ui/EvidenceLocationMap';

export const AddEvidence = () => {
  const navigate = useNavigate();
  const { addEvidence } = useEvidence();
  const [formData, setFormData] = useState({
    title: '',
    category: 'Fizik dalil',
    caseNumber: 'CR-2026-',
    addedBy: '',
    location: '',
    lat: 41.2995,
    lng: 69.2401,
    assignee: '',
    imageUrl: '',
    description: ''
  });
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSaving(true);
    try {
      await addEvidence(formData);
      navigate('/');
    } catch (err) {
      setError(err.message || "Dalilni saqlashda xatolik yuz berdi.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <h1 className="text-xl font-bold mb-4">Haqiqiy Dalil Kiritish (Protokol)</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Dalil Nomi va Turi"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Masalan: Gipotetik giperdisk yoki barmoq izi"
          required
        />
        <Input
          label="Jinoyat Ish Raqami"
          value={formData.caseNumber}
          onChange={(e) => setFormData({ ...formData, caseNumber: e.target.value })}
          required
        />
        <Input
          label="Topgan/Qayd etgan Shaxs (Mutaxassis)"
          value={formData.addedBy}
          onChange={(e) => setFormData({ ...formData, addedBy: e.target.value })}
          placeholder="Major Ismoilov"
          required
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Kenglik (Latitude)"
            type="number"
            step="any"
            min="-90"
            max="90"
            value={formData.lat}
            onChange={(e) => setFormData({
              ...formData,
              lat: e.target.value === '' ? '' : Number(e.target.value),
            })}
            required
          />
          <Input
            label="Uzunlik (Longitude)"
            type="number"
            step="any"
            min="-180"
            max="180"
            value={formData.lng}
            onChange={(e) => setFormData({
              ...formData,
              lng: e.target.value === '' ? '' : Number(e.target.value),
            })}
            required
          />
        </div>
        <EvidenceLocationMap
          position={
            Number.isFinite(formData.lat) &&
            Number.isFinite(formData.lng) &&
            formData.lat >= -90 &&
            formData.lat <= 90 &&
            formData.lng >= -180 &&
            formData.lng <= 180
              ? [formData.lat, formData.lng]
              : null
          }
          onChange={([lat, lng]) => setFormData((current) => ({ ...current, lat, lng }))}
        />
        <Input
          label="Aniq Joylashuv Manzili"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          placeholder="Toshkent sh., Chilonzor tumani..."
          required
        />
        <Input
          label="Mas'ul Laboratoriya / Xodim"
          value={formData.assignee}
          onChange={(e) => setFormData({ ...formData, assignee: e.target.value })}
          required
        />
        <Input
          label="Ashyoviy dalil rasmi (URL)"
          value={formData.imageUrl}
          onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
          placeholder="https://images.unsplash.com/..."
        />
        
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">Kategoriya</label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none text-sm"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          >
            <option value="Fizik dalil">Fizik dalil</option>
            <option value="Raqamli dalil">Raqamli dalil</option>
            <option value="Hujjat">Hujjat</option>
            <option value="Biologik dalil">Biologik dalil</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">Batafsil Tavsif va Ekspertiza Xulosasi</label>
          <textarea
            className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none h-24 text-sm"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Dalilning holati, olingan vaqti va sharoitlari haqida batafsil..."
          />
        </div>

        {error && (
          <p role="alert" className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
            {error}
          </p>
        )}

        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="secondary" onClick={() => navigate('/')}>Bekor qilish</Button>
          <Button type="submit" disabled={saving}>
            {saving ? 'Saqlanmoqda...' : 'Rasmiy Saqlash'}
          </Button>
        </div>
      </form>
    </div>
  );
};