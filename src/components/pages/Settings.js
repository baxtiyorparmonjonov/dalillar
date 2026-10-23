import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { 
  Bell, 
  Database, 
  Save, 
  CheckCircle, 
  UserCheck, 
  KeyRound, 
  MapPin, 
  Cpu, 
  History 
} from 'lucide-react';

const DEFAULT_SETTINGS = {
  officerName: 'Mayor A. Karimov',
  badgeNumber: 'UZ-POL-88321',
  department: 'Kiber-Xavfsizlik va Kriminalistika Boshqarmasi',
  rank: 'Mayor',
  twoFactorAuth: true,
  sessionTimeout: '30',
  ipRestriction: true,
  afisAutoSearch: true,
  pcrThreshold: '99.8',
  autoBackupFrequency: 'daily',
  defaultRegion: 'Guliston shahri',
  defaultLat: 40.4897,
  defaultLng: 68.7842,
  searchRadius: 200,
  notifyNewEvidence: true,
  notifyCriticalStatus: true,
  emailAlerts: true,
};

export const Settings = () => {
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem('dalillar_advanced_settings');
      if (!saved) return DEFAULT_SETTINGS;

      const parsed = JSON.parse(saved);
      if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
        throw new Error('Settings data must be an object.');
      }

      return { ...DEFAULT_SETTINGS, ...parsed };
    } catch (error) {
      console.error('Could not load saved settings:', error);
      return DEFAULT_SETTINGS;
    }
  });

  const [savedMessage, setSavedMessage] = useState(false);
  const [saveError, setSaveError] = useState('');

  const handleSave = (e) => {
    e.preventDefault();
    setSaveError('');
    try {
      localStorage.setItem('dalillar_advanced_settings', JSON.stringify(settings));
      setSavedMessage(true);
      window.setTimeout(() => setSavedMessage(false), 2500);
    } catch (error) {
      console.error('Could not save settings:', error);
      setSavedMessage(false);
      setSaveError('Sozlamalarni saqlab bo‘lmadi. Brauzer xotirasini tekshiring.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl border border-gray-200 shadow-sm my-6">
      <div className="flex items-center justify-between mb-6 pb-4 border-b">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tizim va Operativ Sozlamalar</h1>
          <p className="text-sm text-gray-500">
            Xizmat va kriminalistik ekspertiza parametrlarini sozlash
          </p>
        </div>
        {savedMessage && (
          <div className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-xl text-sm font-semibold animate-pulse border border-green-200">
            <CheckCircle size={18} />
            Barcha sozlamalar saqlandi!
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {saveError && (
          <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
            {saveError}
          </p>
        )}
        
        {/* 1. Xodim Profil Ma'lumotlari */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2 border-b pb-2">
            <UserCheck size={20} className="text-blue-600" />
            1. Mas'ul Xodim Profil Ma'lumotlari
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="F.I.Sh. va Unvoni"
              value={settings.officerName}
              onChange={(e) => setSettings({ ...settings, officerName: e.target.value })}
              required
            />
            <Input
              label="Xizmat Guvohnoma (Badge) №"
              value={settings.badgeNumber}
              onChange={(e) => setSettings({ ...settings, badgeNumber: e.target.value })}
              required
            />
            <Input
              label="Bo'linma / Boshqarma"
              value={settings.department}
              onChange={(e) => setSettings({ ...settings, department: e.target.value })}
              required
            />
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Maxsus Unvon</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none text-sm bg-white"
                value={settings.rank}
                onChange={(e) => setSettings({ ...settings, rank: e.target.value })}
              >
                <option value="Kapitan">Kapitan</option>
                <option value="Mayor">Mayor</option>
                <option value="Podpolkovnik">Podpolkovnik</option>
                <option value="Polkovnik">Polkovnik</option>
              </select>
            </div>
          </div>
        </section>

        {/* 2. Xavfsizlik va Autentifikatsiya */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2 border-b pb-2">
            <KeyRound size={20} className="text-blue-600" />
            2. Tizim Xavfsizligi va Kirish Nazorati
          </h2>
          <div className="space-y-3 bg-gray-50 p-4 rounded-xl">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.twoFactorAuth}
                onChange={(e) => setSettings({ ...settings, twoFactorAuth: e.target.checked })}
                className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">
                Ikki bosqichli autentifikatsiya (2FA) va SMS-kod orqali kirish
              </span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.ipRestriction}
                onChange={(e) => setSettings({ ...settings, ipRestriction: e.target.checked })}
                className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">
                Faqat xizmat IP-manzillaridan kirishga ruxsat berish
              </span>
            </label>

            <div className="pt-2">
              <label className="text-sm font-medium text-gray-700 block mb-1">
                Seans tugash vaqti (Sessiya avto-chiqishi)
              </label>
              <select
                className="w-full md:w-1/2 px-3 py-2 border border-gray-300 rounded-lg outline-none text-sm bg-white"
                value={settings.sessionTimeout}
                onChange={(e) => setSettings({ ...settings, sessionTimeout: e.target.value })}
              >
                <option value="15">15 daqiqa harakatsizlikda</option>
                <option value="30">30 daqiqa harakatsizlikda</option>
                <option value="60">1 soatda</option>
              </select>
            </div>
          </div>
        </section>

        {/* 3. Geokodlash va Xarita Operatsiyalari */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2 border-b pb-2">
            <MapPin size={20} className="text-blue-600" />
            3. Geolokatsiya va Xarita Parametrlari
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Boshlang'ich Hudud"
              value={settings.defaultRegion}
              onChange={(e) => setSettings({ ...settings, defaultRegion: e.target.value })}
            />
            <Input
              label="Kenglik (Lat)"
              type="number"
              step="any"
              min="-90"
              max="90"
              value={settings.defaultLat}
              onChange={(e) => setSettings({
                ...settings,
                defaultLat: e.target.value === '' ? '' : Number(e.target.value),
              })}
            />
            <Input
              label="Uzunlik (Lng)"
              type="number"
              step="any"
              min="-180"
              max="180"
              value={settings.defaultLng}
              onChange={(e) => setSettings({
                ...settings,
                defaultLng: e.target.value === '' ? '' : Number(e.target.value),
              })}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Dalillar atrofidagi muhofaza/qidiruv radiusi (metrda)
            </label>
            <input
              type="range"
              min="50"
              max="1000"
              step="50"
              value={settings.searchRadius}
              onChange={(e) => setSettings({ ...settings, searchRadius: Number(e.target.value) })}
              className="w-full accent-blue-600"
            />
            <span className="text-xs text-gray-500">Joriy radius: {settings.searchRadius} metr</span>
          </div>
        </section>

        {/* 4. Kriminalistik Integratsiya va Avtomatizatsiya */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2 border-b pb-2">
            <Cpu size={20} className="text-blue-600" />
            4. Kriminalistik Integratsiya
          </h2>
          <div className="space-y-3 bg-gray-50 p-4 rounded-xl">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.afisAutoSearch}
                onChange={(e) => setSettings({ ...settings, afisAutoSearch: e.target.checked })}
                className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">
                Daktiloskopiya (AFIS) markaziy bazasi bilan avtomatik iz moslashtirish
              </span>
            </label>

            <div className="pt-2">
              <label className="text-sm font-medium text-gray-700 block mb-1">
                Zahiraviy nusxalash (Backup) chastotasi
              </label>
              <select
                className="w-full md:w-1/2 px-3 py-2 border border-gray-300 rounded-lg outline-none text-sm bg-white"
                value={settings.autoBackupFrequency}
                onChange={(e) => setSettings({ ...settings, autoBackupFrequency: e.target.value })}
              >
                <option value="hourly">Har soatda</option>
                <option value="daily">Kuniga bir marta (Har yarim tunda)</option>
                <option value="weekly">Haftada bir marta</option>
              </select>
            </div>
          </div>
        </section>

        {/* 5. Bildirishnomalar */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2 border-b pb-2">
            <Bell size={20} className="text-blue-600" />
            5. Tezkor Bildirishnomalar
          </h2>
          <div className="space-y-2">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.notifyNewEvidence}
                onChange={(e) => setSettings({ ...settings, notifyNewEvidence: e.target.checked })}
                className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Biriktirilgan tergov guruhida yangi dalil ro'yxatga olinsa push-xabar yuborish</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.emailAlerts}
                onChange={(e) => setSettings({ ...settings, emailAlerts: e.target.checked })}
                className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Ekspertiza xulosasi tayyor bo'lganda elektron pochtaga xabar berish</span>
            </label>
          </div>
        </section>

        {/* Saqlash tugmasi */}
        <div className="flex justify-end pt-6 border-t">
          <Button type="submit" className="flex items-center gap-2 py-2.5 px-6 text-sm">
            <Save size={18} /> O'zgarishlarni Saqlash
          </Button>
        </div>
      </form>
    </div>
  );
};