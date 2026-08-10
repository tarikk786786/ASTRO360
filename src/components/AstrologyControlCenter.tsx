import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sliders, User, Globe, Compass, Sun, Moon, Sparkles, BookOpen, Clock, 
  ShieldCheck, Layers, Eye, Cpu, Database, Bell, Mail, Palette, Zap, 
  Key, RefreshCw, CheckCircle, RotateCcw, Download, Upload, Check, AlertCircle,
  FileText, HeartHandshake, Award
} from 'lucide-react';
import { useGlobalConfig } from '../context/GlobalConfigContext';

export const CONTROL_CENTER_SECTIONS = [
  { id: 'profile', name: '1. Profile & Birth Data', icon: User },
  { id: 'language', name: '2. Language & Region', icon: Globe },
  { id: 'astrologySystem', name: '3. Astrology System', icon: Compass },
  { id: 'vedic', name: '4. Vedic / Jyotish', icon: Sun },
  { id: 'western', name: '5. Western Astrology', icon: Sparkles },
  { id: 'panchang', name: '6. Panchang', icon: Clock },
  { id: 'hinduCalendar', name: '7. Hindu Calendar', icon: BookOpen },
  { id: 'nakshatra', name: '8. Nakshatra', icon: Moon },
  { id: 'dasha', name: '9. Dasha System', icon: Layers },
  { id: 'divisionalCharts', name: '10. Divisional Charts', icon: Sliders },
  { id: 'yoga', name: '11. Yoga Engine', icon: Sparkles },
  { id: 'dosha', name: '12. Dosha Engine', icon: ShieldCheck },
  { id: 'shadbala', name: '13. Shadbala', icon: Cpu },
  { id: 'ashtakavarga', name: '14. Ashtakavarga', icon: Layers },
  { id: 'jaimini', name: '15. Jaimini Karakas', icon: Compass },
  { id: 'muhurta', name: '16. Muhurta', icon: Clock },
  { id: 'kundliMatching', name: '17. Kundli Matching', icon: User },
  { id: 'transits', name: '18. Transits', icon: Sun },
  { id: 'predictions', name: '19. Predictions', icon: Sparkles },
  { id: 'compatibility', name: '20. Compatibility', icon: User },
  { id: 'chartAppearance', name: '21. Chart Appearance', icon: Eye },
  { id: 'planetSettings', name: '22. Planet Settings', icon: Moon },
  { id: 'houseSettings', name: '23. House Settings', icon: Compass },
  { id: 'aspectSettings', name: '24. Aspect Settings', icon: Sliders },
  { id: 'precision', name: '25. Calculation Precision', icon: Cpu },
  { id: 'timeLocation', name: '26. Time & Location', icon: Clock },
  { id: 'islamic', name: '27. Islamic / Hijri', icon: Moon },
  { id: 'prayerQibla', name: '28. Prayer & Qibla', icon: Compass },
  { id: 'aiSettings', name: '29. AI Settings', icon: Cpu },
  { id: 'reportSettings', name: '30. Report Settings', icon: BookOpen },
  { id: 'dashboard', name: '31. Dashboard Layout', icon: Sliders },
  { id: 'notifications', name: '32. Notifications', icon: Bell },
  { id: 'email', name: '33. Email Settings', icon: Mail },
  { id: 'theme', name: '34. Theme & Appearance', icon: Palette },
  { id: 'animation', name: '35. Animation', icon: Zap },
  { id: 'accessibility', name: '36. Accessibility', icon: Eye },
  { id: 'privacy', name: '37. Privacy', icon: ShieldCheck },
  { id: 'dataExport', name: '38. Data & Export', icon: Database },
  { id: 'apiEngine', name: '39. API / Engine Status', icon: Cpu },
  { id: 'developer', name: '40. Advanced Developer', icon: Key },
  { id: 'presets', name: '41. Presets', icon: Sliders },
  { id: 'resetBackup', name: '42. Reset & Backup', icon: RotateCcw }
];

const ToggleSwitch = ({ checked, onChange, label, description }: any) => (
  <div className="flex items-center justify-between p-3 bg-slate-950/50 border border-slate-800 rounded-xl hover:border-slate-700 transition-colors">
    <div className="pr-4">
      <div className="text-sm font-bold text-slate-200">{label}</div>
      {description && <div className="text-xs text-slate-500 mt-1 leading-snug">{description}</div>}
    </div>
    <div
      onClick={() => onChange(!checked)}
      className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer shrink-0 transition-colors ${checked ? 'bg-blue-500' : 'bg-slate-700'}`}
    >
      <motion.div
        layout
        className="w-4 h-4 bg-white rounded-full shadow-md"
        animate={{ x: checked ? 24 : 0 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      />
    </div>
  </div>
);

const SliderControl = ({ value, min, max, step, onChange, label, unit, description }: any) => (
  <div className="p-3 bg-slate-950/50 border border-slate-800 rounded-xl hover:border-slate-700 transition-colors">
    <div className="flex justify-between items-center mb-2">
      <div>
        <span className="text-sm font-bold text-slate-200">{label}</span>
        {description && <div className="text-xs text-slate-500 mt-0.5">{description}</div>}
      </div>
      <span className="text-xs text-blue-400 font-mono bg-blue-500/10 px-2 py-0.5 rounded ml-2 shrink-0">{value}{unit}</span>
    </div>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500 mt-2"
    />
  </div>
);

const SelectControl = ({ value, onChange, label, options, description }: any) => (
  <div className="p-3 bg-slate-950/50 border border-slate-800 rounded-xl hover:border-slate-700 transition-colors">
    <label className="text-sm font-bold text-slate-200 block mb-1">{label}</label>
    {description && <div className="text-xs text-slate-500 mb-2">{description}</div>}
    <select 
      value={value} 
      onChange={(e) => onChange(e.target.value)} 
      className="w-full bg-slate-900 border border-slate-700 text-slate-300 p-2.5 rounded-lg text-sm focus:border-blue-500 focus:outline-none transition-colors"
    >
      {options.map((opt: any) => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  </div>
);

const InputControl = ({ value, onChange, label, description, type = "text", placeholder = "" }: any) => (
  <div className="p-3 bg-slate-950/50 border border-slate-800 rounded-xl hover:border-slate-700 transition-colors">
    <label className="text-sm font-bold text-slate-200 block mb-1">{label}</label>
    {description && <div className="text-xs text-slate-500 mb-2">{description}</div>}
    <input 
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-slate-900 border border-slate-700 text-slate-300 p-2.5 rounded-lg text-sm focus:border-blue-500 focus:outline-none transition-colors"
    />
  </div>
);

const ColorPicker = ({ value, onChange, label }: any) => (
  <div className="flex items-center justify-between p-3 bg-slate-950/50 border border-slate-800 rounded-xl hover:border-slate-700 transition-colors">
    <span className="text-sm font-bold text-slate-200">{label}</span>
    <input 
      type="color"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-8 h-8 rounded cursor-pointer border-0 p-0 bg-transparent"
    />
  </div>
);

const StatusDot = ({ status }: { status: 'green' | 'yellow' | 'red' }) => (
  <div className={`w-3 h-3 rounded-full shadow-sm ${
    status === 'green' ? 'bg-emerald-500 shadow-emerald-500/50' : 
    status === 'yellow' ? 'bg-amber-500 shadow-amber-500/50' : 
    'bg-red-500 shadow-red-500/50'
  }`} />
);

export default function AstrologyControlCenter() {
  const { config, updateConfig, resetConfig } = useGlobalConfig();
  const [activeSection, setActiveSection] = useState<string>('astrologySystem');
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);
  
  // Local states for UI properties not fully in GlobalConfig
  const [localState, setLocalState] = useState<any>({
    profileName: 'Seeker',
    birthTime: '1998-06-15T10:30',
    birthLocation: 'Varanasi, India',
    birthAccuracy: 'exact',
    gender: 'not_specified',
    calendarLocale: 'en-IN',
    chartStyle: 'north_indian',
    bhavaMadhya: true,
    trueNode: true,
    midpointAnalysis: false,
    choghadiyaRules: 'standard',
    lunarReckoning: 'amanta',
    samvatEra: 'vikram',
    nakshatraDivision: '27',
    subLordCalculation: true,
    abhijitInclusion: false,
    dashaDepth: '3',
    dashaBalance: 'exact',
    dashaYear: '365.25',
    vargaD1: true, vargaD9: true, vargaD10: true, vargaD60: false,
    yogaRaja: true, yogaDhana: true, yogaPancha: true,
    doshaManglik: true, doshaKalsarpa: true, doshaSeverity: 50,
    shadbalaSthana: 100, shadbalaKala: 100,
    ashtakavargaTransitThresh: 28,
    jaiminiKarakas: '7',
    arudhaPadas: true,
    muhurtaCategory: 'marriage',
    muhurtaMaleficFilter: true,
    kundliScoreSlider: 18,
    kundliManglik: true,
    kundliNadiExcept: false,
    transitOrb: 3,
    transitRetro: true,
    predAiIntegration: true,
    compatEngine: 'vedic',
    compatComposite: false,
    chartSize: 100,
    planetSun: '#fbbf24', planetMoon: '#f8fafc',
    rulerSystem: 'classical',
    cuspDisplay: true,
    aspectOrbConj: 8, aspectOrbTrine: 8,
    vedicDrishti: true,
    coordPrecision: 'arcsec',
    ephSource: 'jpl',
    tzProvider: 'iana',
    geoProvider: 'nominatim',
    dstHandling: 'auto',
    coordFormat: 'ddmmss',
    islamicDays: true,
    hijriNotif: true,
    qiblaCompass: true,
    highLatRule: 'angle',
    aiProvider: 'gemini',
    aiCitations: 'inline',
    reportFormat: 'pdf',
    reportWatermark: true,
    dashPreset: 'vedic',
    dashColumns: 3,
    dashAutoRef: true,
    notifQuietHours: '22:00-06:00',
    notifSound: true,
    emailAddress: 'user@astro360.com',
    emailFreq: 'weekly',
    themeRadius: 12,
    animSpeed: 300,
    animParticles: true,
    fontScaling: 100,
    colorBlind: 'none',
    screenReader: false,
    keyboardNav: true,
    privEncrypt: true,
    privAnalytics: false,
    privDataReten: '30',
    devDebug: false,
    devProf: false,
  });

  const updateLocal = (key: string, val: any) => setLocalState((p: any) => ({ ...p, [key]: val }));

  const handleApplySettings = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const currentSectionMeta = CONTROL_CENTER_SECTIONS.find(s => s.id === activeSection) || CONTROL_CENTER_SECTIONS[2];

  return (
    <div className="glass-card rounded-3xl p-4 sm:p-8 border border-blue-500/30 shadow-2xl space-y-6 text-left w-full mx-auto bg-slate-900/80 backdrop-blur-xl">
      {/* HEADER & RESET BAR */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 text-blue-400 text-xs font-mono font-bold uppercase tracking-wider mb-1">
            <Sliders className="w-4 h-4 text-blue-400" />
            ASTRO360 Control Center (42 Comprehensive Modules)
          </div>
          <h3 className="text-2xl font-bold font-display text-white">Global Configuration & Engine Settings</h3>
          <p className="text-slate-400 text-sm mt-1">Interactive configuration for all astrology modules and application behaviors.</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <AnimatePresence>
            {saveSuccess && (
              <motion.span 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-xs font-mono text-emerald-400 font-bold flex items-center gap-1 bg-emerald-500/10 px-3 py-2 rounded-xl border border-emerald-500/30"
              >
                <Check className="w-4 h-4 text-emerald-400" /> Saved
              </motion.span>
            )}
          </AnimatePresence>
          <button
            onClick={() => handleApplySettings()}
            className="px-4 py-2 rounded-xl bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/50 text-blue-300 text-sm font-bold flex items-center gap-2 transition-all cursor-pointer shadow-md"
          >
            <CheckCircle className="w-4 h-4" />
            Apply Settings
          </button>
          <button
            onClick={() => { resetConfig(); handleApplySettings(); }}
            className="px-4 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-300 text-sm font-bold flex items-center gap-2 transition-all cursor-pointer shadow-md"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
        </div>
      </div>

      {/* 42 SECTIONS GRID TABS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 max-h-64 overflow-y-auto custom-scrollbar p-1">
        {CONTROL_CENTER_SECTIONS.map((sec) => {
          const Icon = sec.icon;
          const isSelected = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              onClick={() => setActiveSection(sec.id)}
              className={`p-2.5 rounded-xl text-xs font-mono font-semibold flex items-center gap-2 transition-all cursor-pointer text-left border ${
                isSelected
                  ? 'bg-blue-600/30 border-blue-400 text-white shadow-lg shadow-blue-500/20 font-bold'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-600'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-blue-400' : 'text-slate-500'}`} />
              <span className="truncate">{sec.name}</span>
            </button>
          );
        })}
      </div>

      {/* DYNAMIC CONTROL PANEL VIEW */}
      <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800/80 shadow-inner space-y-6 min-h-[400px]">
        {/* SECTION HEADER */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-6">
          <div className="flex items-center gap-2 text-lg font-mono font-bold text-blue-400">
            <currentSectionMeta.icon className="w-5 h-5 text-blue-400" />
            {currentSectionMeta.name}
          </div>
          <span className="text-xs font-mono text-slate-400 bg-slate-900 px-3 py-1 rounded-full border border-slate-700">
            Module Config
          </span>
        </div>

        {/* --- DYNAMIC SECTIONS CONTENT --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeSection === 'profile' && (
            <>
              <InputControl label="Full Name" value={localState.profileName} onChange={(v:any) => updateLocal('profileName', v)} description="Name for chart & reports" />
              <InputControl label="Birth Date & Time" type="datetime-local" value={localState.birthTime} onChange={(v:any) => updateLocal('birthTime', v)} description="Local time of birth" />
              <InputControl label="Birth Location" value={localState.birthLocation} onChange={(v:any) => updateLocal('birthLocation', v)} description="City, State, Country" />
              <SelectControl label="Time Accuracy" value={localState.birthAccuracy} onChange={(v:any) => updateLocal('birthAccuracy', v)} options={[
                {label: 'Exact (Certificate)', value: 'exact'}, {label: 'Approx (15 mins)', value: 'approx'}, {label: 'Rectified', value: 'rectified'}
              ]} />
              <SelectControl label="Gender" value={localState.gender} onChange={(v:any) => updateLocal('gender', v)} options={[
                {label: 'Not Specified', value: 'not_specified'}, {label: 'Male', value: 'male'}, {label: 'Female', value: 'female'}
              ]} />
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center gap-3">
                <Globe className="text-blue-400 w-6 h-6" />
                <div>
                  <div className="text-sm font-bold text-white">Auto-detected Timezone</div>
                  <div className="text-xs text-slate-400">Asia/Kolkata (IST)</div>
                </div>
              </div>
            </>
          )}

          {activeSection === 'language' && (
            <>
              <SelectControl label="App Language" value={config.language} onChange={(v:any) => updateConfig({ language: v })} options={[
                {label: 'English (Global)', value: 'en'}, {label: 'Hindi (हिन्दी)', value: 'hi'}, {label: 'Arabic (العربية)', value: 'ar'},
                {label: 'Urdu (أردو)', value: 'ur'}, {label: 'Bengali (বাংলা)', value: 'bn'}, {label: 'Spanish', value: 'es'}
              ]} />
              <SelectControl label="Date Format" value={config.dateFormat} onChange={(v:any) => updateConfig({ dateFormat: v })} options={[
                {label: 'YYYY-MM-DD (ISO)', value: 'YYYY-MM-DD'}, {label: 'DD/MM/YYYY (UK/IN)', value: 'DD/MM/YYYY'}, {label: 'MM/DD/YYYY (US)', value: 'MM/DD/YYYY'}
              ]} />
              <SelectControl label="Number Format Locale" value={localState.calendarLocale} onChange={(v:any) => updateLocal('calendarLocale', v)} options={[
                {label: 'India (en-IN)', value: 'en-IN'}, {label: 'US (en-US)', value: 'en-US'}, {label: 'Arabic (ar-SA)', value: 'ar-SA'}
              ]} />
              <ToggleSwitch label="Right-to-Left (RTL)" checked={config.isRtl} onChange={(v:any) => updateConfig({ isRtl: v })} description="Auto-detects based on language" />
            </>
          )}

          {activeSection === 'astrologySystem' && (
            <div className="col-span-1 md:col-span-2 lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div 
                onClick={() => updateConfig({ astrologySystem: 'vedic' })}
                className={`p-6 rounded-2xl border-2 cursor-pointer transition-all ${config.astrologySystem === 'vedic' ? 'bg-amber-500/10 border-amber-500' : 'bg-slate-900 border-slate-700'}`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <Sun className={`w-8 h-8 ${config.astrologySystem === 'vedic' ? 'text-amber-400' : 'text-slate-500'}`} />
                  <h4 className="text-xl font-bold text-white">Vedic / Jyotish</h4>
                </div>
                <p className="text-slate-400 text-sm mb-4">Traditional Indian astrology using sidereal zodiac, whole sign houses, and lunar mansions (Nakshatras).</p>
                <ul className="text-xs text-slate-500 space-y-1">
                  <li>• Sidereal Zodiac (Lahiri Default)</li>
                  <li>• Vimshottari Dasha System</li>
                  <li>• 16 Divisional Charts (Vargas)</li>
                </ul>
              </div>
              <div 
                onClick={() => updateConfig({ astrologySystem: 'western' })}
                className={`p-6 rounded-2xl border-2 cursor-pointer transition-all ${config.astrologySystem === 'western' ? 'bg-blue-500/10 border-blue-500' : 'bg-slate-900 border-slate-700'}`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <Sparkles className={`w-8 h-8 ${config.astrologySystem === 'western' ? 'text-blue-400' : 'text-slate-500'}`} />
                  <h4 className="text-xl font-bold text-white">Western Astrology</h4>
                </div>
                <p className="text-slate-400 text-sm mb-4">Modern psychological astrology using tropical zodiac and complex house systems.</p>
                <ul className="text-xs text-slate-500 space-y-1">
                  <li>• Tropical Zodiac (Vernal Equinox)</li>
                  <li>• Placidus House System</li>
                  <li>• Major & Minor Geometric Aspects</li>
                </ul>
              </div>
            </div>
          )}

          {activeSection === 'vedic' && (
            <>
              <SelectControl label="Ayanamsa" value={config.ayanamsaMode} onChange={(v:any) => updateConfig({ ayanamsaMode: v })} options={[
                {label: 'Lahiri (Chitra Paksha)', value: 'lahiri'}, {label: 'BV Raman', value: 'raman'}, {label: 'KP (Krishnamurti)', value: 'kp'}, {label: 'Fagan-Bradley', value: 'fagan_bradley'}
              ]} description="Precession calculation method" />
              <SelectControl label="Chart Format" value={localState.chartStyle} onChange={(v:any) => updateLocal('chartStyle', v)} options={[
                {label: 'North Indian (Diamond)', value: 'north_indian'}, {label: 'South Indian (Square)', value: 'south_indian'}, {label: 'East Indian (Bengalee)', value: 'east_indian'}
              ]} />
              <ToggleSwitch label="Bhava Madhya" checked={localState.bhavaMadhya} onChange={(v:any) => updateLocal('bhavaMadhya', v)} description="Use cusp as house center" />
              <ToggleSwitch label="True Nodes" checked={localState.trueNode} onChange={(v:any) => updateLocal('trueNode', v)} description="Calculate True Rahu/Ketu vs Mean" />
            </>
          )}

          {activeSection === 'western' && (
            <>
              <SelectControl label="House System" value={config.houseSystem} onChange={(v:any) => updateConfig({ houseSystem: v })} options={[
                {label: 'Placidus', value: 'placidus'}, {label: 'Koch', value: 'koch'}, {label: 'Equal House', value: 'equal'}, {label: 'Porphyry', value: 'porphyry'}, {label: 'Campanus', value: 'campanus'}, {label: 'Regiomontanus', value: 'regiomontanus'}
              ]} />
              <ToggleSwitch label="Midpoint Analysis" checked={localState.midpointAnalysis} onChange={(v:any) => updateLocal('midpointAnalysis', v)} description="Calculate planetary midpoints" />
              <div className="p-3 bg-slate-900 border border-slate-700 rounded-xl">
                <span className="text-sm font-bold text-slate-200">Tropical Reference</span>
                <p className="text-xs text-blue-400 mt-1">Fixed to Vernal Equinox (0° Aries)</p>
              </div>
            </>
          )}

          {activeSection === 'panchang' && (
            <>
              <InputControl label="Calculation Location" value={localState.birthLocation} onChange={(v:any) => updateLocal('birthLocation', v)} />
              <SelectControl label="Sunrise/Sunset Rules" value={localState.choghadiyaRules} onChange={(v:any) => updateLocal('choghadiyaRules', v)} options={[
                {label: 'Standard Solar Center', value: 'standard'}, {label: 'Exact Astronomical Edge', value: 'exact'}
              ]} />
              <ToggleSwitch label="Show Hora Lord" checked={true} onChange={()=>{}} description="Display planetary hour ruler" />
            </>
          )}

          {activeSection === 'hinduCalendar' && (
            <>
              <SelectControl label="Lunar Reckoning" value={localState.lunarReckoning} onChange={(v:any) => updateLocal('lunarReckoning', v)} options={[
                {label: 'Amanta (New Moon End)', value: 'amanta'}, {label: 'Purnimanta (Full Moon End)', value: 'purnimanta'}
              ]} />
              <SelectControl label="Samvat Era" value={localState.samvatEra} onChange={(v:any) => updateLocal('samvatEra', v)} options={[
                {label: 'Vikram Samvat (+57y)', value: 'vikram'}, {label: 'Saka Samvat (-78y)', value: 'saka'}
              ]} />
            </>
          )}

          {activeSection === 'nakshatra' && (
            <>
              <SelectControl label="Division System" value={localState.nakshatraDivision} onChange={(v:any) => updateLocal('nakshatraDivision', v)} options={[
                {label: '27 Equal Nakshatras', value: '27'}, {label: '28 (With Abhijit)', value: '28'}
              ]} />
              <ToggleSwitch label="Sub-lord Calculation" checked={localState.subLordCalculation} onChange={(v:any) => updateLocal('subLordCalculation', v)} description="For KP Astrology" />
              <ToggleSwitch label="Include Abhijit" checked={localState.abhijitInclusion} onChange={(v:any) => updateLocal('abhijitInclusion', v)} />
            </>
          )}

          {activeSection === 'dasha' && (
            <>
              <SelectControl label="Primary System" value={config.dashaSystem} onChange={(v:any) => updateConfig({ dashaSystem: v })} options={[
                {label: 'Vimshottari (120y)', value: 'vimshottari'}, {label: 'Yogini (36y)', value: 'yogini'}, {label: 'Chara (Jaimini)', value: 'chara'}
              ]} />
              <SelectControl label="Sub-period Depth" value={localState.dashaDepth} onChange={(v:any) => updateLocal('dashaDepth', v)} options={[
                {label: '3 Levels (Pratyantar)', value: '3'}, {label: '5 Levels (Prana)', value: '5'}
              ]} />
              <SelectControl label="Balance Method" value={localState.dashaBalance} onChange={(v:any) => updateLocal('dashaBalance', v)} options={[
                {label: 'Exact Lunar Position', value: 'exact'}, {label: 'Proportional Arc', value: 'prop'}
              ]} />
            </>
          )}

          {activeSection === 'divisionalCharts' && (
            <div className="col-span-1 md:col-span-2 lg:col-span-3">
              <div className="text-sm text-slate-400 mb-3">Select active Varga charts (D1 - D60) to render in dashboard:</div>
              <div className="flex flex-wrap gap-3">
                {[
                  {id:'vargaD1', label:'D1 Rashi'}, {id:'vargaD9', label:'D9 Navamsha'}, 
                  {id:'vargaD10', label:'D10 Dashamsha'}, {id:'vargaD60', label:'D60 Shashtiamsha'}
                ].map(v => (
                  <label key={v.id} className="flex items-center gap-2 bg-slate-900 p-2 rounded-lg cursor-pointer border border-slate-700 hover:border-blue-500">
                    <input type="checkbox" checked={localState[v.id]} onChange={(e) => updateLocal(v.id, e.target.checked)} className="accent-blue-500" />
                    <span className="text-sm font-bold text-white">{v.label}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'yoga' && (
            <div className="col-span-1 md:col-span-2 lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
              <ToggleSwitch label="Raja Yogas" checked={localState.yogaRaja} onChange={(v:any) => updateLocal('yogaRaja', v)} />
              <ToggleSwitch label="Dhana Yogas" checked={localState.yogaDhana} onChange={(v:any) => updateLocal('yogaDhana', v)} />
              <ToggleSwitch label="Pancha Mahapurusha" checked={localState.yogaPancha} onChange={(v:any) => updateLocal('yogaPancha', v)} />
            </div>
          )}

          {activeSection === 'dosha' && (
            <>
              <ToggleSwitch label="Manglik Dosha" checked={localState.doshaManglik} onChange={(v:any) => updateLocal('doshaManglik', v)} />
              <ToggleSwitch label="Kaal Sarpa Dosha" checked={localState.doshaKalsarpa} onChange={(v:any) => updateLocal('doshaKalsarpa', v)} />
              <SliderControl label="Severity Threshold" value={localState.doshaSeverity} min={10} max={100} step={10} onChange={(v:any) => updateLocal('doshaSeverity', v)} unit="%" />
            </>
          )}

          {activeSection === 'shadbala' && (
            <>
              <SliderControl label="Sthana Bala Weight" value={localState.shadbalaSthana} min={0} max={200} step={10} onChange={(v:any) => updateLocal('shadbalaSthana', v)} unit="%" />
              <SliderControl label="Kala Bala Weight" value={localState.shadbalaKala} min={0} max={200} step={10} onChange={(v:any) => updateLocal('shadbalaKala', v)} unit="%" />
            </>
          )}

          {activeSection === 'ashtakavarga' && (
            <>
              <SliderControl label="Transit Auspicious Threshold" value={localState.ashtakavargaTransitThresh} min={20} max={35} step={1} onChange={(v:any) => updateLocal('ashtakavargaTransitThresh', v)} unit=" pts" />
              <div className="p-3 bg-slate-900 border border-slate-700 rounded-xl">
                <span className="text-sm font-bold text-slate-200">Calculations Included</span>
                <p className="text-xs text-blue-400 mt-1">SAV, BAV, Kakshya analysis enabled</p>
              </div>
            </>
          )}

          {activeSection === 'jaimini' && (
            <>
              <SelectControl label="Karaka Scheme" value={localState.jaiminiKarakas} onChange={(v:any) => updateLocal('jaiminiKarakas', v)} options={[
                {label: '7 Karakas (Exclude Rahu)', value: '7'}, {label: '8 Karakas (Include Rahu)', value: '8'}
              ]} />
              <ToggleSwitch label="Arudha Padas" checked={localState.arudhaPadas} onChange={(v:any) => updateLocal('arudhaPadas', v)} />
            </>
          )}

          {activeSection === 'muhurta' && (
            <>
              <SelectControl label="Electional Category" value={localState.muhurtaCategory} onChange={(v:any) => updateLocal('muhurtaCategory', v)} options={[
                {label: 'Marriage (Vivaha)', value: 'marriage'}, {label: 'Business Launch', value: 'business'}, {label: 'Housewarming', value: 'house'}
              ]} />
              <ToggleSwitch label="Filter Malefic Windows" checked={localState.muhurtaMaleficFilter} onChange={(v:any) => updateLocal('muhurtaMaleficFilter', v)} description="Rahu Kalam, Yamaganda" />
            </>
          )}

          {activeSection === 'kundliMatching' && (
            <>
              <SliderControl label="Min Passing Score" value={localState.kundliScoreSlider} min={0} max={36} step={1} onChange={(v:any) => updateLocal('kundliScoreSlider', v)} unit="/36" />
              <ToggleSwitch label="Consider Manglik" checked={localState.kundliManglik} onChange={(v:any) => updateLocal('kundliManglik', v)} />
              <ToggleSwitch label="Nadi Exceptions" checked={localState.kundliNadiExcept} onChange={(v:any) => updateLocal('kundliNadiExcept', v)} />
            </>
          )}

          {activeSection === 'transits' && (
            <>
              <SliderControl label="Transit Orb Precision" value={localState.transitOrb} min={1} max={5} step={0.5} onChange={(v:any) => updateLocal('transitOrb', v)} unit="°" />
              <ToggleSwitch label="Highlight Retrograde" checked={localState.transitRetro} onChange={(v:any) => updateLocal('transitRetro', v)} />
            </>
          )}

          {activeSection === 'predictions' && (
            <>
              <SelectControl label="Time Scope" value={config.predictionTimeframe} onChange={(v:any) => updateConfig({ predictionTimeframe: v })} options={[
                {label: 'Daily', value: 'Daily'}, {label: 'Weekly', value: 'Weekly'}, {label: 'Monthly', value: 'Monthly'}, {label: 'Yearly', value: 'Yearly'}
              ]} />
              <SelectControl label="Domain Focus" value={config.predictionFocus} onChange={(v:any) => updateConfig({ predictionFocus: v })} options={[
                {label: 'General', value: 'general'}, {label: 'Career', value: 'career'}, {label: 'Love', value: 'love'}
              ]} />
              <ToggleSwitch label="AI Enhanced Analysis" checked={localState.predAiIntegration} onChange={(v:any) => updateLocal('predAiIntegration', v)} />
            </>
          )}

          {activeSection === 'compatibility' && (
            <>
              <SelectControl label="Compatibility Engine" value={localState.compatEngine} onChange={(v:any) => updateLocal('compatEngine', v)} options={[
                {label: 'Vedic Ashta Koota', value: 'vedic'}, {label: 'Western Synastry', value: 'western'}, {label: 'Hybrid Mode', value: 'hybrid'}
              ]} />
              <ToggleSwitch label="Composite Chart" checked={localState.compatComposite} onChange={(v:any) => updateLocal('compatComposite', v)} />
            </>
          )}

          {activeSection === 'chartAppearance' && (
            <>
              <SelectControl label="Color Theme" value={config.themeMode} onChange={(v:any) => updateConfig({ themeMode: v })} options={[
                {label: 'Cosmic Dark', value: 'cosmic'}, {label: 'Deep Dark', value: 'dark'}, {label: 'Gold Prestige', value: 'gold'}
              ]} />
              <SliderControl label="Chart Size Scale" value={localState.chartSize} min={50} max={150} step={10} onChange={(v:any) => updateLocal('chartSize', v)} unit="%" />
            </>
          )}

          {activeSection === 'planetSettings' && (
            <div className="col-span-1 md:col-span-2 lg:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-4">
              <ColorPicker label="Sun Color" value={localState.planetSun} onChange={(v:any) => updateLocal('planetSun', v)} />
              <ColorPicker label="Moon Color" value={localState.planetMoon} onChange={(v:any) => updateLocal('planetMoon', v)} />
              <div className="p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-400 col-span-2 flex items-center justify-center">
                Apply global preset palettes or customize 12+ bodies.
              </div>
            </div>
          )}

          {activeSection === 'houseSettings' && (
            <>
              <SelectControl label="Algorithm" value={config.houseSystem} onChange={(v:any) => updateConfig({ houseSystem: v })} options={[
                {label: 'Whole Sign', value: 'wholesign'}, {label: 'Placidus', value: 'placidus'}, {label: 'Equal', value: 'equal'}
              ]} />
              <SelectControl label="Ruler System" value={localState.rulerSystem} onChange={(v:any) => updateLocal('rulerSystem', v)} options={[
                {label: 'Classical (Traditional)', value: 'classical'}, {label: 'Modern (Uranus+)', value: 'modern'}
              ]} />
              <ToggleSwitch label="Display Cusps" checked={localState.cuspDisplay} onChange={(v:any) => updateLocal('cuspDisplay', v)} />
            </>
          )}

          {activeSection === 'aspectSettings' && (
            <>
              <SliderControl label="Max Orb" value={config.aspectMaxOrb} min={1} max={12} step={0.5} onChange={(v:any) => updateConfig({ aspectMaxOrb: v })} unit="°" />
              <ToggleSwitch label="Vedic Drishti" checked={localState.vedicDrishti} onChange={(v:any) => updateLocal('vedicDrishti', v)} description="Special Mars/Jup/Sat aspects" />
            </>
          )}

          {activeSection === 'precision' && (
            <>
              <SelectControl label="Ephemeris Source" value={localState.ephSource} onChange={(v:any) => updateLocal('ephSource', v)} options={[
                {label: 'Swiss Ephemeris', value: 'swiss'}, {label: 'JPL Horizons', value: 'jpl'}
              ]} />
              <SelectControl label="Coordinate Precision" value={localState.coordPrecision} onChange={(v:any) => updateLocal('coordPrecision', v)} options={[
                {label: 'Degrees & Minutes', value: 'degmin'}, {label: 'Arcseconds', value: 'arcsec'}
              ]} />
            </>
          )}

          {activeSection === 'timeLocation' && (
            <>
              <SelectControl label="Timezone Provider" value={localState.tzProvider} onChange={(v:any) => updateLocal('tzProvider', v)} options={[
                {label: 'IANA Database', value: 'iana'}, {label: 'Google Maps API', value: 'google'}
              ]} />
              <SelectControl label="Geocoding" value={localState.geoProvider} onChange={(v:any) => updateLocal('geoProvider', v)} options={[
                {label: 'OSM Nominatim', value: 'nominatim'}, {label: 'Mapbox', value: 'mapbox'}
              ]} />
            </>
          )}

          {activeSection === 'islamic' && (
            <>
              <SliderControl label="Hijri Adjustment" value={config.hijriAdjustmentDays} min={-2} max={2} step={1} onChange={(v:any) => updateConfig({ hijriAdjustmentDays: v })} unit=" days" />
              <ToggleSwitch label="Important Days Highlights" checked={localState.islamicDays} onChange={(v:any) => updateLocal('islamicDays', v)} />
              <ToggleSwitch label="Hijri New Month Alerts" checked={localState.hijriNotif} onChange={(v:any) => updateLocal('hijriNotif', v)} />
            </>
          )}

          {activeSection === 'prayerQibla' && (
            <>
              <SelectControl label="Prayer Method" value={config.prayerMethod} onChange={(v:any) => updateConfig({ prayerMethod: v })} options={[
                {label: 'Muslim World League', value: 'MWL'}, {label: 'ISNA', value: 'ISNA'}, {label: 'Umm al-Qura', value: 'Umm_al_Qura'}, {label: 'Karachi', value: 'Karachi'}, {label: 'Egypt', value: 'Egypt'}
              ]} />
              <SelectControl label="Asr Juristic" value={config.asrJuristic} onChange={(v:any) => updateConfig({ asrJuristic: v })} options={[
                {label: 'Standard (Shafii/Maliki)', value: 'standard'}, {label: 'Hanafi', value: 'hanafi'}
              ]} />
              <ToggleSwitch label="Qibla Compass Widget" checked={localState.qiblaCompass} onChange={(v:any) => updateLocal('qiblaCompass', v)} />
            </>
          )}

          {activeSection === 'aiSettings' && (
            <>
              <SelectControl label="AI Provider" value={localState.aiProvider} onChange={(v:any) => updateLocal('aiProvider', v)} options={[
                {label: 'Google Gemini', value: 'gemini'}, {label: 'Anthropic Claude', value: 'claude'}, {label: 'OpenAI GPT-4', value: 'openai'}
              ]} />
              <SelectControl label="Explanation Depth" value={config.predictionDetailLevel} onChange={(v:any) => updateConfig({ predictionDetailLevel: v })} options={[
                {label: 'Brief', value: 'brief'}, {label: 'Standard', value: 'standard'}, {label: 'Detailed Scholarly', value: 'detailed'}
              ]} />
            </>
          )}

          {activeSection === 'reportSettings' && (
            <>
              <SelectControl label="Export Format" value={localState.reportFormat} onChange={(v:any) => updateLocal('reportFormat', v)} options={[
                {label: 'PDF Document', value: 'pdf'}, {label: 'HTML Web', value: 'html'}, {label: 'JSON Data', value: 'json'}
              ]} />
              <ToggleSwitch label="Include Watermark" checked={localState.reportWatermark} onChange={(v:any) => updateLocal('reportWatermark', v)} />
            </>
          )}

          {activeSection === 'dashboard' && (
            <>
              <SelectControl label="Layout Preset" value={localState.dashPreset} onChange={(v:any) => updateLocal('dashPreset', v)} options={[
                {label: 'Vedic Pro', value: 'vedic'}, {label: 'Western Pro', value: 'western'}, {label: 'Islamic Suite', value: 'islamic'}
              ]} />
              <SelectControl label="UI Density" value={config.uiDensity} onChange={(v:any) => updateConfig({ uiDensity: v })} options={[
                {label: 'Comfortable', value: 'comfortable'}, {label: 'Compact', value: 'compact'}, {label: 'Spacious', value: 'spacious'}
              ]} />
              <ToggleSwitch label="Auto-refresh Widgets" checked={localState.dashAutoRef} onChange={(v:any) => updateLocal('dashAutoRef', v)} />
            </>
          )}

          {activeSection === 'notifications' && (
            <>
              <InputControl label="Quiet Hours" value={localState.notifQuietHours} onChange={(v:any) => updateLocal('notifQuietHours', v)} description="Format: HH:MM-HH:MM" />
              <ToggleSwitch label="Play Sounds" checked={localState.notifSound} onChange={(v:any) => updateLocal('notifSound', v)} />
            </>
          )}

          {activeSection === 'email' && (
            <>
              <InputControl label="Email Address" type="email" value={localState.emailAddress} onChange={(v:any) => updateLocal('emailAddress', v)} />
              <SelectControl label="Report Frequency" value={localState.emailFreq} onChange={(v:any) => updateLocal('emailFreq', v)} options={[
                {label: 'Weekly', value: 'weekly'}, {label: 'Monthly', value: 'monthly'}, {label: 'Disabled', value: 'disabled'}
              ]} />
            </>
          )}

          {activeSection === 'theme' && (
            <>
              <SelectControl label="Color Palette" value={config.themeMode} onChange={(v:any) => updateConfig({ themeMode: v })} options={[
                {label: 'Cosmic (Default)', value: 'cosmic'}, {label: 'Dark', value: 'dark'}, {label: 'Gold', value: 'gold'}
              ]} />
              <SliderControl label="Border Radius" value={localState.themeRadius} min={0} max={24} step={4} onChange={(v:any) => updateLocal('themeRadius', v)} unit="px" />
            </>
          )}

          {activeSection === 'animation' && (
            <>
              <ToggleSwitch label="Reduced Motion" checked={config.reducedMotion} onChange={(v:any) => updateConfig({ reducedMotion: v })} />
              <SliderControl label="Transition Speed" value={localState.animSpeed} min={100} max={1000} step={100} onChange={(v:any) => updateLocal('animSpeed', v)} unit="ms" />
              <ToggleSwitch label="Particle Effects" checked={localState.animParticles} onChange={(v:any) => updateLocal('animParticles', v)} />
            </>
          )}

          {activeSection === 'accessibility' && (
            <>
              <SliderControl label="Font Scaling" value={localState.fontScaling} min={80} max={150} step={10} onChange={(v:any) => updateLocal('fontScaling', v)} unit="%" />
              <SelectControl label="Color Blind Mode" value={localState.colorBlind} onChange={(v:any) => updateLocal('colorBlind', v)} options={[
                {label: 'None', value: 'none'}, {label: 'Protanopia', value: 'protanopia'}, {label: 'Deuteranopia', value: 'deuteranopia'}
              ]} />
              <ToggleSwitch label="Keyboard Nav Highlight" checked={localState.keyboardNav} onChange={(v:any) => updateLocal('keyboardNav', v)} />
            </>
          )}

          {activeSection === 'privacy' && (
            <>
              <ToggleSwitch label="End-to-End Encryption" checked={localState.privEncrypt} onChange={(v:any) => updateLocal('privEncrypt', v)} />
              <ToggleSwitch label="Analytics Opt-out" checked={localState.privAnalytics} onChange={(v:any) => updateLocal('privAnalytics', v)} />
              <SelectControl label="Data Retention" value={localState.privDataReten} onChange={(v:any) => updateLocal('privDataReten', v)} options={[
                {label: '30 Days', value: '30'}, {label: '90 Days', value: '90'}, {label: 'Indefinite', value: 'indefinite'}
              ]} />
            </>
          )}

          {activeSection === 'dataExport' && (
            <div className="col-span-1 md:col-span-2 lg:col-span-3 flex flex-col gap-4">
              <button className="p-4 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center gap-2 hover:bg-slate-800 text-blue-400 font-bold transition-all">
                <Download className="w-5 h-5" /> Export Profile Data (JSON)
              </button>
              <button className="p-4 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center gap-2 hover:bg-slate-800 text-emerald-400 font-bold transition-all">
                <Upload className="w-5 h-5" /> Import Profile Data (JSON)
              </button>
            </div>
          )}

          {activeSection === 'apiEngine' && (
            <div className="col-span-1 md:col-span-2 lg:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-700 flex flex-col items-center justify-center gap-2">
                <StatusDot status="green" />
                <span className="text-xs font-bold text-slate-300">Ephemeris Engine</span>
                <span className="text-[10px] text-slate-500">12ms latency</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-700 flex flex-col items-center justify-center gap-2">
                <StatusDot status="green" />
                <span className="text-xs font-bold text-slate-300">Geocoding API</span>
                <span className="text-[10px] text-slate-500">Online</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-700 flex flex-col items-center justify-center gap-2">
                <StatusDot status="yellow" />
                <span className="text-xs font-bold text-slate-300">AI Provider</span>
                <span className="text-[10px] text-slate-500">Rate limited (Gemini)</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-700 flex flex-col items-center justify-center gap-2">
                <StatusDot status="green" />
                <span className="text-xs font-bold text-slate-300">Sync Service</span>
                <span className="text-[10px] text-slate-500">Synced 2 mins ago</span>
              </div>
            </div>
          )}

          {activeSection === 'developer' && (
            <>
              <ToggleSwitch label="Debug Mode" checked={localState.devDebug} onChange={(v:any) => updateLocal('devDebug', v)} />
              <ToggleSwitch label="Performance Profiler" checked={localState.devProf} onChange={(v:any) => updateLocal('devProf', v)} />
              <div className="p-3 bg-slate-900 border border-slate-700 rounded-xl overflow-hidden">
                <span className="text-xs font-bold text-slate-400">Config State Hash</span>
                <div className="text-[10px] font-mono text-emerald-400 mt-1 break-all">{btoa(JSON.stringify(config)).substring(0, 32)}...</div>
              </div>
            </>
          )}

          {activeSection === 'presets' && (
            <div className="col-span-1 md:col-span-2 lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4">
              <button className="p-4 rounded-xl bg-slate-900 border border-amber-500/30 hover:bg-amber-900/20 text-left transition-colors">
                <div className="text-amber-400 font-bold mb-1">Traditional Vedic Scholar</div>
                <div className="text-xs text-slate-400">Lahiri, North Indian chart, 5-level Dasha.</div>
              </button>
              <button className="p-4 rounded-xl bg-slate-900 border border-blue-500/30 hover:bg-blue-900/20 text-left transition-colors">
                <div className="text-blue-400 font-bold mb-1">Modern Western Astrologer</div>
                <div className="text-xs text-slate-400">Tropical, Placidus, Aspect grid emphasis.</div>
              </button>
            </div>
          )}

          {activeSection === 'resetBackup' && (
            <div className="col-span-1 md:col-span-2 lg:col-span-3 flex flex-col gap-4">
              <button onClick={() => resetConfig()} className="p-4 rounded-xl bg-red-950/40 border border-red-500/50 flex items-center justify-center gap-2 hover:bg-red-900/60 text-red-400 font-bold transition-all shadow-lg shadow-red-500/10">
                <AlertCircle className="w-5 h-5" /> Factory Reset All Settings
              </button>
              <div className="text-xs text-center text-slate-500">This action cannot be undone. All custom layouts and preferences will be lost.</div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
