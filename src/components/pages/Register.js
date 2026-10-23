import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { ShieldCheck } from 'lucide-react';

export const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'investigator'
  });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await register(formData);
      navigate('/');
    } catch (err) {
      setError(err.message || "Ro'yxatdan o'tishda xatolik yuz berdi.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden">
      {/* 1. Orqa fon rasmi va qoraytirilgan qatlam (Overlay) */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0 filter brightness-50"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1600')` 
        }}
      />
      <div className="absolute inset-0 bg-slate-950/70 z-0 backdrop-blur-sm" />

      {/* 2. Registratsiya Modal Oynasi */}
      <div className="relative z-10 max-w-md w-full bg-slate-900/90 border border-slate-800 text-white p-6 md:p-8 rounded-2xl shadow-2xl backdrop-blur-md">
        
        <div className="flex flex-col items-center mb-6 text-center">
          <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-500 mb-3">
            <ShieldCheck size={28} />
          </div>
          <h2 className="text-2xl font-bold tracking-wide">DALILLAR</h2>
          <p className="text-xs text-slate-400 mt-1">Xavfsiz raqamli tergov tizimiga ro'yxatdan o'tish</p>
        </div>

        {error && (
          <p role="alert" className="mb-4 rounded-lg bg-red-950/60 p-3 text-center text-sm text-red-300">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-medium text-slate-300 block mb-1">F.I.Sh.</label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Major Alimov B."
              minLength={8}
              required
              className="bg-slate-800/50 border-slate-700 text-white placeholder-slate-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-slate-300 block mb-1">Xizmat Email manzili</label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="investigator@police.uz"
              required
              className="bg-slate-800/50 border-slate-700 text-white placeholder-slate-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-slate-300 block mb-1">Parol</label>
            <Input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="••••••••"
              required
              className="bg-slate-800/50 border-slate-700 text-white placeholder-slate-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-slate-300 block mb-1">Tizimdagi Lavozim (Rol)</label>
            <select
              className="w-full px-3 py-2 bg-slate-800/80 border border-slate-700 rounded-lg outline-none text-sm text-white focus:border-blue-500"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            >
              <option value="investigator" className="bg-slate-900">Tergovchi</option>
              <option value="expert" className="bg-slate-900">Ekspert (Kuzatuvchi)</option>
              <option value="admin" className="bg-slate-900">Administrator (Bosh tergovchi)</option>
            </select>
          </div>

          <Button type="submit" disabled={submitting} className="w-full py-2.5 mt-4 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-colors">
            {submitting ? "Ro'yxatdan o'tilmoqda..." : "Ro'yxatdan o'tish"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-400">
          Hisobingiz bormi?{' '}
          <Link to="/login" className="font-semibold text-blue-400 hover:underline">
            Tizimga kirish
          </Link>
        </p>
      </div>
    </div>
  );
};