import { useState } from 'react';
import { User, Shield, Database, FileText, Wallet, Key, Building2, Heart, Car, Briefcase, Home, Scale, Smartphone, CheckCircle, Bell } from 'lucide-react';

export default function UKDigitalWalletArchitecture() {
  const [selectedFlow, setSelectedFlow] = useState('consent-share');
  const [flowStep, setFlowStep] = useState(0);
  
  const addressChangeSteps = [
    {
      step: 0,
      title: "Meet Joe: The Problem",
      description: "Joe Bloggs, a single parent with chronic migraines, needs to apply for disability benefits",
      highlight: "wallet",
      story: "Joe Bloggs has been struggling with chronic migraines for years. His doctor has prescribed various medications, but the condition affects his ability to work full-time. He needs to apply for Personal Independence Payment (PIP) through the Department for Work and Pensions. Today, this means requesting medical records from his GP, waiting weeks for them to arrive, filling out a 40-page form, and hoping DWP receives everything. Often, claims are delayed because medical evidence is incomplete or arrives separately. Joe is anxious about the process."
    },
    {
      step: 1,
      title: "Joe Opens His Digital Wallet",
      description: "One app, secure login with GOV.UK One Login, all his information in one place",
      highlight: "wallet",
      story: "Instead, Joe opens his UK Digital Wallet app on his phone. He logs in securely using GOV.UK One Login - the same login he uses for other government services. Inside his wallet, he can see his NHS records, his prescriptions, his appointments - everything in one place. He navigates to the 'Apply for Benefits' section and selects 'Personal Independence Payment (PIP)'."
    },
    {
      step: 2,
      title: "Granting Consent: Joe's Choice",
      description: "Joe chooses exactly what to share with DWP and for how long",
      highlight: "orchestration",
      story: "The app shows Joe exactly what DWP needs: 'To assess your claim, DWP needs access to your prescription history from the last 12 months.' Joe sees a clear list - Sumatriptan for migraines, pain medication, his GP visit records. He's in control. He can see exactly what will be shared. He taps 'Grant Access for 3 months' - long enough for DWP to process his claim, but not forever. The Orchestration API verifies his identity, stores this consent decision securely, and prepares to make it happen."
    },
    {
      step: 3,
      title: "Events Flow Through Kafka",
      description: "Joe's consent becomes an event - the trigger for everything that follows",
      highlight: "kafka",
      story: "When Joe grants consent, a 'consent.granted' event is published to Apache Kafka with his citizen ID, what data he's sharing (prescriptions), who can access it (DWP), and for how long (3 months). At the same time, NHS prescription data is continuously flowing into Kafka as 'nhs.prescription.issued' events - every prescription for every patient, all the time. These are separate streams of data, but they're about to be intelligently combined."
    },
    {
      step: 4,
      title: "The Gatekeeper: Intelligent Filtering",
      description: "Only Joe's data, only with his consent, only to DWP",
      highlight: "streams",
      story: "Here's where the magic happens. The Consent Gatekeeper is a Kafka Streams application that's always running, watching these data flows. It reads the raw NHS prescription stream - thousands of prescriptions for thousands of patients. It joins this stream with Joe's consent event. It filters out everything except: prescriptions for Joe (citizenId match), that he's consented to share, with DWP specifically. Think of it as an intelligent filter sitting between the raw data and the government agencies. Without Joe's consent, his data doesn't flow through. With consent, only what he authorized goes through, and only to who he authorized."
    },
    {
      step: 5,
      title: "DWP Receives Only What They Need",
      description: "Joe's prescription history arrives at DWP instantly, securely, with his permission",
      highlight: "services",
      story: "The filtered data is written to a 'views.permitted.dwp' topic - a clean, consent-approved view of Joe's prescriptions. DWP's case management system subscribes to this topic. Within seconds, Joe's case worker sees his prescription history appear in the system: Sumatriptan 50mg prescribed monthly for the past year, evidence of a chronic condition. No waiting for GP letters. No missing documents. No delays. The case worker can now assess Joe's claim with complete, verified medical evidence."
    },
    {
      step: 6,
      title: "Joe's in Control, Always",
      description: "Full transparency, audit trail, and the ability to revoke access anytime",
      highlight: "wallet",
      story: "Back in his wallet, Joe sees: 'DWP accessed your prescription data on 15th March 2025 at 14:32.' He has full visibility. If his claim is processed and he no longer wants DWP to have access, he taps 'Revoke Access' and instantly, the Gatekeeper stops filtering his data through. Three months later, the consent automatically expires anyway. Joe has applied for benefits in 5 minutes instead of 5 weeks. DWP has the evidence they need instantly. Everyone wins. This is the power of consent-driven, event-based architecture."
    }
  ];

  const currentStep = addressChangeSteps[flowStep];
  
  // Professional gradient arrow component
  type GradientArrowProps = { label?: string | null; highlight?: boolean };
  const GradientArrow = ({ label, highlight }: GradientArrowProps) => {
    return (
      <div className="relative py-4 flex justify-center">
        <svg width="60" height="40" viewBox="0 0 60 40" className="overflow-visible">
          <defs>
            <linearGradient id={`arrowGradient-${label || 'default'}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#6366f1" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="1" />
            </linearGradient>
            <filter id={`glow-${label || 'default'}`}>
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Arrow shaft */}
          <rect 
            x="26" 
            y="0" 
            width="8" 
            height="25" 
            fill={`url(#arrowGradient-${label || 'default'})`}
            filter={highlight ? `url(#glow-${label || 'default'})` : ""}
          />
          
          {/* Arrow head - triangle pointing down */}
          <polygon 
            points="30,40 15,25 45,25" 
            fill={`url(#arrowGradient-${label || 'default'})`}
            filter={highlight ? `url(#glow-${label || 'default'})` : ""}
          />
        </svg>
        
        {label && highlight && (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 px-4 py-2 rounded-lg font-bold text-xs shadow-2xl border-2 border-yellow-300 whitespace-nowrap">
              {label}
            </div>
          </div>
        )}
      </div>
    );
  };
  
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4">
      <div className="max-w-[2000px] mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">UK Digital Wallet Platform</h1>
          <p className="text-lg text-blue-200 mb-1">Centralised Citizen Identity & Data Sharing Architecture</p>
          <p className="text-slate-400 text-sm">Event-driven synchronisation across all government services</p>
        </div>

        {/* Flow Selector */}
        <div className="flex justify-center gap-3 mb-6">
          {/* <button 
            onClick={() => setSelectedFlow('consent-share')}
            className={`px-5 py-2 rounded-lg font-semibold transition-all text-sm ${selectedFlow === 'consent-share' ? 'bg-purple-600 text-white shadow-lg' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
          >
            System Overview
          </button> */}
          <button 
            onClick={() => setSelectedFlow('address-change')}
            className={`px-5 py-2 rounded-lg font-semibold transition-all text-sm ${selectedFlow === 'address-change' ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
          >
            System Overview
          </button>
          <button 
            onClick={() => setSelectedFlow('interaction')}
            className={`px-5 py-2 rounded-lg font-semibold transition-all text-sm ${selectedFlow === 'interaction' ? 'bg-green-600 text-white shadow-lg' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
          >
            Technical Flow
          </button>
        </div>

        {/* Address Change Flow Controls */}
        {selectedFlow === 'address-change' && (
          <div className="mb-6 bg-gradient-to-r from-blue-900 to-purple-900 rounded-lg p-4 border-2 border-blue-500">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-bold text-white">Joe's Journey: From Problem to Solution</h3>
              <div className="flex gap-2">
                <button 
                  onClick={() => setFlowStep(Math.max(0, flowStep - 1))}
                  disabled={flowStep === 0}
                  className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm font-semibold disabled:bg-slate-600 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
                >
                  ← Previous
                </button>
                <button 
                  onClick={() => setFlowStep(Math.min(addressChangeSteps.length - 1, flowStep + 1))}
                  disabled={flowStep === addressChangeSteps.length - 1}
                  className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm font-semibold disabled:bg-slate-600 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
                >
                  Next →
                </button>
                <button 
                  onClick={() => setFlowStep(0)}
                  className="px-3 py-1 bg-purple-600 text-white rounded-lg text-sm font-semibold hover:bg-purple-700 transition-colors"
                >
                  Start Over
                </button>
              </div>
            </div>
            
            <div className="bg-blue-950/50 rounded-lg p-3 border border-blue-400">
              <div className="flex items-center justify-between mb-2">
                <div className="text-blue-300 font-bold text-base">{currentStep.title}</div>
                <div className="text-blue-400 text-xs">Chapter {flowStep + 1} of {addressChangeSteps.length}</div>
              </div>
              <div className="text-blue-100 text-sm mb-2">{currentStep.description}</div>
              <div className="mt-3 pt-3 border-t border-blue-700">
                <div className="text-blue-300 font-semibold mb-1 flex items-center gap-2 text-sm">
                  The Full Story:
                </div>
                <div className="text-blue-100 text-xs leading-relaxed">{currentStep.story}</div>
              </div>
            </div>
            
            <div className="mt-3 flex justify-center gap-2">
              {addressChangeSteps.map((_, idx) => (
                <div 
                  key={idx}
                  onClick={() => setFlowStep(idx)}
                  className={`w-10 h-1.5 rounded-full cursor-pointer transition-all ${idx === flowStep ? 'bg-blue-400 w-12' : 'bg-blue-700 hover:bg-blue-600'}`}
                ></div>
              ))}
            </div>
          </div>
        )}

        {/* Main Architecture */}
        {selectedFlow !== 'interaction' && (
        <div className="bg-slate-800 rounded-xl p-6 shadow-2xl">
          
          {/* Top Layer - Citizen & Wallet */}
          <div className="mb-4">
            <div className="flex items-center justify-center gap-8">
              {/* Citizen */}
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl shadow-xl flex items-center justify-center mb-2">
                  <User className="w-12 h-12 text-white" />
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-white">UK Citizen</div>
                  <div className="text-slate-400 text-xs">Single Identity</div>
                </div>
              </div>

              {/* Connection */}
              <div className="flex items-center">
                <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                <div className="w-0 h-0 border-t-6 border-t-transparent border-b-6 border-b-transparent border-l-8 border-l-purple-500"></div>
              </div>

              {/* Digital Wallet */}
              <div className="relative">
                <div className={`w-64 bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl shadow-xl p-4 transition-all ${selectedFlow === 'address-change' && (currentStep.highlight === 'wallet') ? 'ring-4 ring-yellow-400 scale-105' : ''}`}>
                  <div className="flex items-center gap-3 mb-3">
                    <Wallet className="w-8 h-8 text-white" />
                    <div>
                      <div className="text-xl font-bold text-white">UK Digital Wallet</div>
                      <div className="text-purple-200 text-xs">GOV.UK One Login</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    <div className="bg-purple-700/50 rounded p-2 text-center">
                      <Heart className="w-4 h-4 text-white mx-auto mb-1" />
                      <div className="text-xs text-purple-100">Health</div>
                    </div>
                    <div className="bg-purple-700/50 rounded p-2 text-center">
                      <Car className="w-4 h-4 text-white mx-auto mb-1" />
                      <div className="text-xs text-purple-100">Driving</div>
                    </div>
                    <div className="bg-purple-700/50 rounded p-2 text-center">
                      <Briefcase className="w-4 h-4 text-white mx-auto mb-1" />
                      <div className="text-xs text-purple-100">Work</div>
                    </div>
                    <div className="bg-purple-700/50 rounded p-2 text-center">
                      <Home className="w-4 h-4 text-white mx-auto mb-1" />
                      <div className="text-xs text-purple-100">Benefits</div>
                    </div>
                    <div className="bg-purple-700/50 rounded p-2 text-center">
                      <FileText className="w-4 h-4 text-white mx-auto mb-1" />
                      <div className="text-xs text-purple-100">Travel</div>
                    </div>
                    <div className="bg-purple-700/50 rounded p-2 text-center">
                      <Scale className="w-4 h-4 text-white mx-auto mb-1" />
                      <div className="text-xs text-purple-100">Legal</div>
                    </div>
                  </div>
                  
                  <div className="bg-purple-900/50 rounded p-2 text-xs text-purple-100 space-y-1">
                    <div>✓ View all credentials</div>
                    <div>✓ Manage consent</div>
                    <div>✓ Update personal data</div>
                    <div>✓ Share with 3rd parties</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Professional Arrow from Wallet to Orchestration */}
          <GradientArrow 
            label={selectedFlow === 'address-change' && flowStep === 2 ? "Consent event published" : null}
            highlight={selectedFlow === 'address-change' && flowStep === 2}
          />

          {/* Middle Layer - Orchestration */}
          <div className="mb-4">
            <div className="flex justify-center">
              <div className={`w-full max-w-3xl bg-gradient-to-br from-slate-600 to-slate-700 rounded-xl shadow-xl p-4 border-2 border-purple-500 transition-all ${selectedFlow === 'address-change' && currentStep.highlight === 'orchestration' ? 'ring-4 ring-yellow-400 scale-105' : ''}`}>
                <div className="flex items-center gap-3 mb-3">
                  <Shield className="w-8 h-8 text-purple-400" />
                  <div>
                    <div className="text-xl font-bold text-white">Orchestration & Consent Management API</div>
                    <div className="text-slate-300 text-xs">User-facing API layer - handles requests from wallet</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-slate-800 rounded p-3">
                    <div className="text-purple-400 font-bold text-sm mb-1 flex items-center gap-2">
                      <Key className="w-4 h-4" />
                      Identity Service
                    </div>
                    <div className="text-xs text-slate-300 space-y-1">
                      <div>• GOV.UK One Login auth</div>
                      <div>• Verify user credentials</div>
                      <div>• Issue JWT tokens</div>
                      <div>• Link NHS/NI numbers</div>
                    </div>
                  </div>
                  
                  <div className="bg-slate-800 rounded p-3">
                    <div className="text-purple-400 font-bold text-sm mb-1 flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      Consent Manager
                    </div>
                    <div className="text-xs text-slate-300 space-y-1">
                      <div>• <strong>STORE</strong> consent in DB</div>
                      <div>• <strong>PUBLISH</strong> consent.events</div>
                      <div>• Handle revocations</div>
                      <div>• Audit trail (who/when)</div>
                    </div>
                  </div>
                  
                  <div className="bg-slate-800 rounded p-3">
                    <div className="text-purple-400 font-bold text-sm mb-1 flex items-center gap-2">
                      <Bell className="w-4 h-4" />
                      Event Publisher
                    </div>
                    <div className="text-xs text-slate-300 space-y-1">
                      <div>• Validate user changes</div>
                      <div>• Publish to Kafka topics</div>
                      <div>• Ensure delivery</div>
                      <div>• Schema validation</div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-3 bg-purple-900/30 border border-purple-500 rounded p-2 text-xs text-purple-100">
                  <strong>Role:</strong> Synchronous request/response API. Receives wallet requests, stores decisions, publishes events to Kafka.
                </div>
              </div>
            </div>
          </div>

          {/* Professional Arrow from Orchestration to Kafka */}
          <GradientArrow 
            label={selectedFlow === 'address-change' && flowStep === 3 ? "Data flows to Kafka Event Backbone" : null}
            highlight={selectedFlow === 'address-change' && flowStep === 3}
          />

          {/* Kafka Event Backbone */}
          <div className="mb-4">
            <div className={`bg-gradient-to-br from-slate-700 to-slate-900 rounded-xl p-5 shadow-xl border-2 border-blue-500 transition-all ${selectedFlow === 'address-change' && currentStep.highlight === 'kafka' ? 'ring-4 ring-yellow-400 scale-105' : ''}`}>
              <div className="flex items-center gap-3 mb-4 justify-center">
                <Database className="w-10 h-10 text-blue-400" />
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">Apache Kafka Event Backbone</div>
                  <div className="text-slate-300 text-sm">Single source of truth for all citizen data changes</div>
                </div>
              </div>
              
              <div className="grid grid-cols-4 gap-3">
                {/* Personal Data Events */}
                <div className="bg-blue-900/40 border border-blue-500 rounded-lg p-3">
                  <div className="text-blue-300 font-bold text-sm mb-2 text-center">Personal Data Topics</div>
                  <div className="space-y-1 text-xs text-blue-100">
                    <div className="bg-blue-950/50 p-1.5 rounded">citizen.address.changed</div>
                    <div className="bg-blue-950/50 p-1.5 rounded">citizen.name.changed</div>
                    <div className="bg-blue-950/50 p-1.5 rounded">citizen.dob.changed</div>
                    <div className="bg-blue-950/50 p-1.5 rounded">citizen.contact.changed</div>
                  </div>
                </div>
                
                {/* Health Events */}
                <div className="bg-red-900/40 border border-red-500 rounded-lg p-3">
                  <div className="text-red-300 font-bold text-sm mb-2 text-center">Health Topics</div>
                  <div className="space-y-1 text-xs text-red-100">
                    <div className="bg-red-950/50 p-1.5 rounded">nhs.prescriptions</div>
                    <div className="bg-red-950/50 p-1.5 rounded">nhs.appointments</div>
                    <div className="bg-red-950/50 p-1.5 rounded">nhs.records</div>
                    <div className="bg-red-950/50 p-1.5 rounded">nhs.vaccinations</div>
                  </div>
                </div>
                
                {/* Work & Tax Events */}
                <div className="bg-green-900/40 border border-green-500 rounded-lg p-3">
                  <div className="text-green-300 font-bold text-sm mb-2 text-center">Work & Tax Topics</div>
                  <div className="space-y-1 text-xs text-green-100">
                    <div className="bg-green-950/50 p-1.5 rounded">hmrc.employment</div>
                    <div className="bg-green-950/50 p-1.5 rounded">hmrc.tax.status</div>
                    <div className="bg-green-950/50 p-1.5 rounded">dwp.pension</div>
                    <div className="bg-green-950/50 p-1.5 rounded">rtw.verification</div>
                  </div>
                </div>
                
                {/* Credentials & Docs */}
                <div className="bg-purple-900/40 border border-purple-500 rounded-lg p-3">
                  <div className="text-purple-300 font-bold text-sm mb-2 text-center">Credential Topics</div>
                  <div className="space-y-1 text-xs text-purple-100">
                    <div className="bg-purple-950/50 p-1.5 rounded">dvla.licence</div>
                    <div className="bg-purple-950/50 p-1.5 rounded">hmpo.passport</div>
                    <div className="bg-purple-950/50 p-1.5 rounded">consent.granted</div>
                    <div className="bg-purple-950/50 p-1.5 rounded">consent.revoked</div>
                  </div>
                </div>
              </div>
              
              <div className="mt-3 bg-blue-950/30 border border-blue-600 rounded p-3">
                <div className="text-blue-200 text-xs">
                  <strong className="text-blue-300">What are Topics?</strong> Kafka topics are durable, ordered logs of events. Each topic is partitioned by citizen ID for parallel processing and replicated across multiple brokers for fault tolerance. Events are retained for 30 days (configurable) for audit and replay. All government services publish to and consume from these topics - it's a true publish/subscribe event bus.
                </div>
              </div>
            </div>
          </div>

          {/* Professional Arrow from Kafka to Streams Processing */}
          <GradientArrow 
            label={selectedFlow === 'address-change' && flowStep === 4 ? "Real-time stream processing" : null}
            highlight={selectedFlow === 'address-change' && flowStep === 4}
          />

          {/* Kafka Streams Processing Layer */}
          <div className="mb-4">
            <div className="text-center mb-3">
              <div className="text-xl font-bold text-white mb-1">Kafka Streams Processing Layer</div>
              <div className="text-slate-400 text-xs">Real-time consent-based data filtering</div>
            </div>
            
            <div className="flex justify-center">
              {/* Gatekeeper Streams - Centered */}
              <div className={`w-full max-w-2xl bg-gradient-to-br from-pink-600 to-pink-800 rounded-lg p-4 shadow-lg border-2 border-pink-400 transition-all ${selectedFlow === 'address-change' && currentStep.highlight === 'streams' ? 'ring-4 ring-yellow-400 scale-105' : ''}`}>
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-6 h-6 text-white" />
                  <div>
                    <div className="text-base font-bold text-white">Consent Gatekeeper</div>
                    <div className="text-xs text-pink-200">Enforce consent on data</div>
                  </div>
                </div>
                <div className="bg-pink-900/50 rounded p-2 text-xs text-pink-100 space-y-1">
                  <div className="font-semibold text-pink-200 mb-1">Processing:</div>
                  <div>→ <strong>READ</strong> RAW health topics</div>
                  <div>→ <strong>JOIN</strong> with consent.events</div>
                  <div>→ <strong>FILTER</strong> by citizen permissions</div>
                  <div>→ <strong>WRITE</strong> to filtered VIEW topics</div>
                  <div className="mt-2 pt-2 border-t border-pink-700 text-pink-200">
                    <strong>Topology:</strong> Stream-Table Join<br/>
                    <strong>Role:</strong> Data enforcement layer
                  </div>
                </div>
              </div>
            </div>
            
            {/* Streams Architecture Details */}
            <div className="mt-4 bg-slate-700 rounded-lg p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-white font-bold text-sm mb-2 flex items-center gap-2">
                    <Database className="w-4 h-4 text-blue-400" />
                    State Stores (Local + Kafka-backed)
                  </h4>
                  <div className="text-xs text-slate-300 space-y-1">
                    <div className="bg-slate-800 rounded p-2">
                      <strong className="text-blue-400">consent-store</strong> - KTable of active consents
                      <div className="text-xs text-slate-400 mt-1">Stored in RocksDB on Gatekeeper instances + changelog topic in Kafka for recovery</div>
                    </div>
                  </div>
                  <div className="mt-2 bg-blue-950/30 border border-blue-700 rounded p-2 text-xs text-blue-200">
                    <strong>Storage Architecture:</strong> Each Gatekeeper instance maintains local RocksDB state stores for fast lookups. All state changes are written to Kafka changelog topics. If a Gatekeeper crashes, a new instance can restore its state from Kafka.
                  </div>
                </div>
                
                <div>
                  <h4 className="text-white font-bold text-sm mb-2 flex items-center gap-2">
                    <Key className="w-4 h-4 text-yellow-400" />
                    Key Features
                  </h4>
                  <div className="text-xs text-slate-300 space-y-1">
                    <div className="flex items-start gap-2">
                      <div className="text-green-400">✓</div>
                      <div><strong>Exactly-once semantics</strong> - No duplicate processing</div>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="text-green-400">✓</div>
                      <div><strong>Stateful processing</strong> - RocksDB local stores</div>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="text-green-400">✓</div>
                      <div><strong>Auto-scaling</strong> - Partition-based parallelism</div>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="text-green-400">✓</div>
                      <div><strong>Fault-tolerant</strong> - Changelog topics for recovery</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Clear separation explanation */}
              <div className="mt-3 bg-gradient-to-r from-purple-900 to-pink-900 border border-yellow-500 rounded p-3">
                <h5 className="text-yellow-300 font-bold text-xs mb-2 text-center">🔑 Key Distinction: API Layer vs Stream Processing Layer</h5>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-purple-950/50 rounded p-2">
                    <div className="text-purple-300 font-bold mb-1">Orchestration API (Purple Box Above)</div>
                    <div className="text-purple-100 space-y-0.5">
                      <div>• <strong>Request/Response</strong> - User clicks button</div>
                      <div>• <strong>Stores</strong> consent in PostgreSQL/Neo4j</div>
                      <div>• <strong>Publishes</strong> consent.events to Kafka</div>
                      <div>• Returns immediate response to user</div>
                      <div>• Stateless REST API</div>
                    </div>
                  </div>
                  <div className="bg-pink-950/50 rounded p-2">
                    <div className="text-pink-300 font-bold mb-1">Gatekeeper Streams (Pink Box Here)</div>
                    <div className="text-pink-100 space-y-0.5">
                      <div>• <strong>Continuous Processing</strong> - Always running</div>
                      <div>• <strong>Reads</strong> consent.events, builds KTable</div>
                      <div>• <strong>Filters</strong> actual health data streams</div>
                      <div>• Runs asynchronously, no user interaction</div>
                      <div>• Stateful stream processor</div>
                    </div>
                  </div>
                </div>
                <div className="mt-2 text-center text-yellow-200 text-xs">
                  <strong>Flow:</strong> User → Orchestration API (stores & publishes) → Kafka → Gatekeeper Streams (filters data) → Government Services
                </div>
              </div>
            </div>
          </div>

          {/* Professional Arrow from Streams to Services */}
          <GradientArrow 
            label={selectedFlow === 'address-change' && flowStep === 5 ? "Filtered data to government services" : null}
            highlight={selectedFlow === 'address-change' && flowStep === 5}
          />

          {/* Government Services & Agencies */}
          <div>
            <div className="text-center mb-4">
              <div className="text-xl font-bold text-white mb-1">Government Services & Agencies</div>
              <div className="text-slate-400 text-xs">Subscribe to relevant events, maintain local databases synchronized</div>
            </div>
            
            <div className={`grid grid-cols-4 gap-4 transition-all ${selectedFlow === 'address-change' && currentStep.highlight === 'services' ? 'ring-4 ring-yellow-400 rounded-xl p-3' : ''}`}>
              {/* NHS */}
              <div className="bg-gradient-to-br from-red-600 to-red-800 rounded-lg p-3 shadow-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Heart className="w-6 h-6 text-white" />
                  <div>
                    <div className="text-sm font-bold text-white">NHS</div>
                    <div className="text-xs text-red-200">Health Services</div>
                  </div>
                </div>
                <div className="bg-red-900/50 rounded p-2 text-xs text-red-100 space-y-0.5">
                  <div className="font-semibold mb-1">Subscribes to:</div>
                  <div>• citizen.address.*</div>
                  <div>• citizen.contact.*</div>
                  <div>• consent.health.*</div>
                  <div className="font-semibold mt-1 mb-0.5">Publishes:</div>
                  <div>• nhs.prescriptions</div>
                  <div>• nhs.appointments</div>
                </div>
              </div>
              
              {/* DVLA */}
              <div className="bg-gradient-to-br from-orange-600 to-orange-800 rounded-lg p-3 shadow-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Car className="w-6 h-6 text-white" />
                  <div>
                    <div className="text-sm font-bold text-white">DVLA</div>
                    <div className="text-xs text-orange-200">Driving Licences</div>
                  </div>
                </div>
                <div className="bg-orange-900/50 rounded p-2 text-xs text-orange-100 space-y-0.5">
                  <div className="font-semibold mb-1">Subscribes to:</div>
                  <div>• citizen.address.*</div>
                  <div>• citizen.name.*</div>
                  <div>• nhs.medical.fitness</div>
                  <div className="font-semibold mt-1 mb-0.5">Publishes:</div>
                  <div>• dvla.licence.issued</div>
                  <div>• dvla.licence.renewed</div>
                </div>
              </div>
              
              {/* DWP */}
              <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-lg p-3 shadow-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Home className="w-6 h-6 text-white" />
                  <div>
                    <div className="text-sm font-bold text-white">DWP</div>
                    <div className="text-xs text-green-200">Benefits & Pensions</div>
                  </div>
                </div>
                <div className="bg-green-900/50 rounded p-2 text-xs text-green-100 space-y-0.5">
                  <div className="font-semibold mb-1">Subscribes to:</div>
                  <div>• citizen.address.*</div>
                  <div>• nhs.health.* (consent)</div>
                  <div>• hmrc.employment.*</div>
                  <div className="font-semibold mt-1 mb-0.5">Publishes:</div>
                  <div>• dwp.pension.payment</div>
                  <div>• dwp.benefit.decision</div>
                </div>
              </div>
              
              {/* HMRC */}
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg p-3 shadow-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Briefcase className="w-6 h-6 text-white" />
                  <div>
                    <div className="text-sm font-bold text-white">HMRC</div>
                    <div className="text-xs text-blue-200">Tax & Revenue</div>
                  </div>
                </div>
                <div className="bg-blue-900/50 rounded p-2 text-xs text-blue-100 space-y-0.5">
                  <div className="font-semibold mb-1">Subscribes to:</div>
                  <div>• citizen.address.*</div>
                  <div>• citizen.employment.*</div>
                  <div>• dwp.pension.*</div>
                  <div className="font-semibold mt-1 mb-0.5">Publishes:</div>
                  <div>• hmrc.tax.code</div>
                  <div>• hmrc.paye.status</div>
                </div>
              </div>
              
              {/* Home Office */}
              <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg p-3 shadow-lg">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="w-6 h-6 text-white" />
                  <div>
                    <div className="text-sm font-bold text-white">Home Office</div>
                    <div className="text-xs text-purple-200">Passports & Immigration</div>
                  </div>
                </div>
                <div className="bg-purple-900/50 rounded p-2 text-xs text-purple-100 space-y-0.5">
                  <div className="font-semibold mb-1">Subscribes to:</div>
                  <div>• citizen.address.*</div>
                  <div>• citizen.name.*</div>
                  <div>• dvla.photo</div>
                  <div className="font-semibold mt-1 mb-0.5">Publishes:</div>
                  <div>• hmpo.passport.issued</div>
                  <div>• hmpo.rtw.verified</div>
                </div>
              </div>
              
              {/* Local Authorities */}
              <div className="bg-gradient-to-br from-yellow-600 to-yellow-800 rounded-lg p-3 shadow-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Building2 className="w-6 h-6 text-white" />
                  <div>
                    <div className="text-sm font-bold text-white">Local Councils</div>
                    <div className="text-xs text-yellow-200">Council Services</div>
                  </div>
                </div>
                <div className="bg-yellow-900/50 rounded p-2 text-xs text-yellow-100 space-y-0.5">
                  <div className="font-semibold mb-1">Subscribes to:</div>
                  <div>• citizen.address.*</div>
                  <div>• citizen.household.*</div>
                  <div>• dwp.benefit.status</div>
                  <div className="font-semibold mt-1 mb-0.5">Publishes:</div>
                  <div>• council.tax.bill</div>
                  <div>• council.housing</div>
                </div>
              </div>
              
              {/* Courts */}
              <div className="bg-gradient-to-br from-slate-600 to-slate-800 rounded-lg p-3 shadow-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Scale className="w-6 h-6 text-white" />
                  <div>
                    <div className="text-sm font-bold text-white">Courts & Legal</div>
                    <div className="text-xs text-slate-200">Justice System</div>
                  </div>
                </div>
                <div className="bg-slate-700/50 rounded p-2 text-xs text-slate-100 space-y-0.5">
                  <div className="font-semibold mb-1">Subscribes to:</div>
                  <div>• citizen.address.*</div>
                  <div>• citizen.identity.*</div>
                  <div>• consent.legal.*</div>
                  <div className="font-semibold mt-1 mb-0.5">Publishes:</div>
                  <div>• courts.conviction</div>
                  <div>• courts.summons</div>
                </div>
              </div>
              
              {/* Third Parties */}
              <div className="bg-gradient-to-br from-pink-600 to-pink-800 rounded-lg p-3 shadow-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Building2 className="w-6 h-6 text-white" />
                  <div>
                    <div className="text-sm font-bold text-white">Third Parties</div>
                    <div className="text-xs text-pink-200">Banks, Employers, etc.</div>
                  </div>
                </div>
                <div className="bg-pink-900/50 rounded p-2 text-xs text-pink-100 space-y-0.5">
                  <div className="font-semibold mb-1">Subscribes to:</div>
                  <div>• Consent-based only</div>
                  <div>• User explicitly shares</div>
                  <div>• Time-limited access</div>
                  <div className="font-semibold mt-1 mb-0.5">Examples:</div>
                  <div>• Bank identity checks</div>
                  <div>• Employer RTW verify</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        )}

        {/* Flow Example */}
        {selectedFlow === 'address-change' && (
          <div className="mt-6 bg-gradient-to-r from-grey-900 to-emerald-900 rounded-xl p-4 border-2 border-green-500">
            <h3 className="text-xl font-bold text-white mb-3 text-center">The Impact: What This Means for Citizens Like Joe</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-green-950/50 rounded-lg p-4 text-center border border-green-600">
                <div className="text-4xl mb-2">⚡</div>
                <div className="text-lg font-bold text-green-300 mb-1">5 Minutes</div>
                <div className="text-green-100 text-xs">Instead of 5 weeks to apply for benefits</div>
              </div>
              <div className="bg-green-950/50 rounded-lg p-4 text-center border border-green-600">
                <div className="text-4xl mb-2">🎯</div>
                <div className="text-lg font-bold text-green-300 mb-1">100% Control</div>
                <div className="text-green-100 text-xs">Joe decides what to share, when, and with whom</div>
              </div>
              <div className="bg-green-950/50 rounded-lg p-4 text-center border border-green-600">
                <div className="text-4xl mb-2">🔒</div>
                <div className="text-lg font-bold text-green-300 mb-1">Privacy First</div>
                <div className="text-green-100 text-xs">Data never flows without explicit consent</div>
              </div>
            </div>
            
            
          </div>
        )}

        {/* Interaction Flow Diagram */}
        {selectedFlow === 'interaction' && (
          <div className="bg-slate-800 rounded-xl p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">Joe's Benefit Application - Technical Flow</h2>
              <p className="text-slate-400">Detailed sequence showing how prescription data flows from NHS to DWP with citizen consent</p>
            </div>

            {/* Phase 0: Real World Trigger */}
            <div className="mb-12">
              <div className="inline-block bg-amber-500 text-white px-4 py-1.5 rounded-full font-bold mb-4 text-sm">
                PHASE 0: REAL-WORLD TRIGGER
              </div>
              
              <div className="flex items-center justify-between gap-6 mb-8">
                <div className="flex flex-col items-center flex-1">
                  <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl shadow-xl flex items-center justify-center mb-2">
                    <User className="w-10 h-10 text-white" />
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-white">Patient</div>
                    <div className="text-xs text-slate-400">Joe Bloggs</div>
                  </div>
                </div>

                <div className="flex-1 relative">
                  <div className="h-0.5 bg-gradient-to-r from-amber-500 to-orange-500"></div>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-6 border-t-transparent border-b-6 border-b-transparent border-l-8 border-l-orange-500"></div>
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-amber-900 text-white px-2 py-1 rounded text-xs font-semibold whitespace-nowrap shadow-lg">
                    1. GP Appointment
                  </div>
                </div>

                <div className="flex flex-col items-center flex-1">
                  <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl shadow-xl flex items-center justify-center mb-2">
                    <div className="text-3xl">🏥</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-white">GP Surgery</div>
                    <div className="text-xs text-slate-400">NHS Provider</div>
                  </div>
                  <div className="mt-2 bg-orange-900/50 border border-orange-500 rounded p-2 text-xs text-orange-200 text-center">
                    2. Prescribes<br/>Sumatriptan
                  </div>
                </div>

                <div className="flex-1 relative">
                  <div className="h-0.5 bg-gradient-to-r from-orange-500 to-red-500"></div>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-6 border-t-transparent border-b-6 border-b-transparent border-l-8 border-l-red-500"></div>
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-orange-900 text-white px-2 py-1 rounded text-xs font-semibold whitespace-nowrap shadow-lg">
                    3. Records in NHS
                  </div>
                </div>

                <div className="flex flex-col items-center flex-1">
                  <div className="w-20 h-20 bg-gradient-to-br from-red-400 to-red-600 rounded-xl shadow-xl flex items-center justify-center mb-2">
                    <Database className="w-10 h-10 text-white" />
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-white">NHS Database</div>
                    <div className="text-xs text-slate-400">EHR System</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-6">
                <div className="flex-1 max-w-xl">
                  <div className="bg-yellow-900/50 border border-yellow-500 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 text-lg">
                        💼
                      </div>
                      <div>
                        <div className="text-sm font-bold text-yellow-200 mb-1">4. Patient Applies for Disability Benefits</div>
                        <div className="text-xs text-yellow-100">
                          Patient contacts DWP to apply for PIP due to chronic migraines. DWP requests medical evidence.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-700 my-8"></div>

            {/* Phase 1: Consent Grant */}
            <div className="mb-12">
              <div className="inline-block bg-blue-500 text-white px-4 py-1.5 rounded-full font-bold mb-4 text-sm">
                PHASE 1: CONSENT GRANT
              </div>
              
              <div className="flex items-center justify-between gap-6">
                <div className="flex flex-col items-center flex-1">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl shadow-xl flex items-center justify-center mb-2">
                    <User className="w-10 h-10 text-white" />
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-white">Patient/Citizen</div>
                    <div className="text-xs text-slate-400">Joe Bloggs</div>
                  </div>
                </div>

                <div className="flex-1 relative">
                  <div className="h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500"></div>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-6 border-t-transparent border-b-6 border-b-transparent border-l-8 border-l-indigo-500"></div>
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-blue-900 text-white px-2 py-1 rounded text-xs font-semibold whitespace-nowrap shadow-lg">
                    5. Open app & authenticate
                  </div>
                </div>

                <div className="flex flex-col items-center flex-1">
                  <div className="w-20 h-20 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-xl shadow-xl flex items-center justify-center mb-2">
                    <Smartphone className="w-10 h-10 text-white" />
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-white">Digital Wallet</div>
                    <div className="text-xs text-slate-400">Mobile App</div>
                  </div>
                </div>

                <div className="flex-1 relative">
                  <div className="h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-6 border-t-transparent border-b-6 border-b-transparent border-l-8 border-l-purple-500"></div>
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-indigo-900 text-white px-2 py-1 rounded text-xs font-semibold whitespace-nowrap shadow-lg">
                    6. Share with DWP
                  </div>
                </div>

                <div className="flex flex-col items-center flex-1">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl shadow-xl flex items-center justify-center mb-2">
                    <Shield className="w-10 h-10 text-white" />
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-white">Consent Service</div>
                    <div className="text-xs text-slate-400">API Layer</div>
                  </div>
                  <div className="mt-2 bg-purple-900/50 border border-purple-500 rounded p-2 text-xs text-purple-200">
                    7-11. Verify & emit<br/>consent events
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-700 my-8"></div>

            {/* Phase 2: NHS Data Publication */}
            <div className="mb-12">
              <div className="inline-block bg-orange-500 text-white px-4 py-1.5 rounded-full font-bold mb-4 text-sm">
                PHASE 2: NHS DATA PUBLICATION
              </div>
              
              <div className="flex items-start gap-6">
                <div className="flex flex-col items-center flex-1">
                  <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl shadow-xl flex items-center justify-center mb-2">
                    <Database className="w-10 h-10 text-white" />
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-white">NHS England</div>
                    <div className="text-xs text-slate-400">FHIR API</div>
                  </div>
                </div>

                <div className="flex-1 relative mt-10">
                  <div className="h-0.5 bg-gradient-to-r from-orange-500 to-red-500"></div>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-6 border-t-transparent border-b-6 border-b-transparent border-l-8 border-l-red-500"></div>
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-orange-900 text-white px-2 py-1 rounded text-xs font-semibold whitespace-nowrap shadow-lg">
                    10. CDC streams
                  </div>
                </div>

                <div className="flex-1">
                  <div className="bg-gradient-to-br from-red-600 to-red-800 rounded-lg p-4 shadow-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <Database className="w-5 h-5 text-red-200" />
                      <div>
                        <div className="text-sm font-bold text-white">nhs.raw.prescriptions</div>
                        <div className="text-xs text-red-200">RAW TOPIC</div>
                      </div>
                    </div>
                    <div className="bg-red-950/50 rounded p-2 text-xs text-red-100 space-y-1 font-mono">
                      <div>E1: Joe-Bloggs-ID | Sumatriptan</div>
                      <div>E2: Patient-456 | Omeprazole</div>
                      <div>E3: Joe-Bloggs-ID | Paracetamol</div>
                    </div>
                    <div className="mt-2 text-xs text-red-200">
                      🔒 Gatekeeper only
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-700 my-8"></div>

            {/* Phase 3: Gatekeeper Filtering */}
            <div className="mb-12">
              <div className="inline-block bg-pink-500 text-white px-4 py-1.5 rounded-full font-bold mb-4 text-sm">
                PHASE 3: CONSENT-BASED FILTERING
              </div>
              
              <div className="flex items-center gap-6">
                <div className="flex-1">
                  <div className="bg-slate-700 rounded-lg p-4 shadow-xl mb-3">
                    <div className="text-sm font-bold text-purple-300 mb-2">consent.events</div>
                    <div className="bg-purple-950/30 border border-purple-500 rounded p-2 text-xs text-purple-200 font-mono">
                      citizenId: Joe-Bloggs-ID<br/>
                      grantedTo: DWP<br/>
                      scope: prescriptions
                    </div>
                  </div>
                  <div className="bg-slate-700 rounded-lg p-4 shadow-xl">
                    <div className="text-sm font-bold text-red-300 mb-2">nhs.raw.prescriptions</div>
                    <div className="bg-red-950/30 border border-red-500 rounded p-2 text-xs text-red-200 font-mono">
                      [E1, E2, E3, E4...]
                    </div>
                  </div>
                </div>

                <div className="relative flex flex-col items-center">
                  <div className="w-0.5 h-24 bg-gradient-to-b from-pink-500 to-pink-600"></div>
                  <div className="w-0 h-0 border-l-6 border-l-transparent border-r-6 border-r-transparent border-t-8 border-t-pink-600"></div>
                  <div className="mt-2 bg-pink-900 text-white px-2 py-1 rounded text-xs font-semibold whitespace-nowrap shadow-lg">
                    13. Filter
                  </div>
                </div>

                <div className="flex-1">
                  <div className="bg-gradient-to-br from-slate-600 to-slate-700 rounded-lg p-4 shadow-xl border-2 border-pink-500">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-lg">
                        🔍
                      </div>
                      <div>
                        <div className="text-base font-bold text-white">Gatekeeper</div>
                        <div className="text-xs text-slate-300">Filter Engine</div>
                      </div>
                    </div>
                    <div className="bg-slate-800 rounded p-3 space-y-1 text-xs text-slate-200">
                      <div className="flex items-center gap-1">
                        <CheckCircle className="w-3 h-3 text-green-400" />
                        <div>Read RAW topic</div>
                      </div>
                      <div className="flex items-center gap-1">
                        <CheckCircle className="w-3 h-3 text-green-400" />
                        <div>Match consent</div>
                      </div>
                      <div className="flex items-center gap-1">
                        <CheckCircle className="w-3 h-3 text-green-400" />
                        <div>Filter by citizen ID</div>
                      </div>
                      <div className="flex items-center gap-1">
                        <CheckCircle className="w-3 h-3 text-green-400" />
                        <div>Write to VIEW</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative flex flex-col items-center">
                  <div className="w-0.5 h-24 bg-gradient-to-b from-cyan-500 to-cyan-600"></div>
                  <div className="w-0 h-0 border-l-6 border-l-transparent border-r-6 border-r-transparent border-t-8 border-t-cyan-600"></div>
                  <div className="mt-2 bg-cyan-900 text-white px-2 py-1 rounded text-xs font-semibold whitespace-nowrap shadow-lg">
                    14. Publish
                  </div>
                </div>

                <div className="flex-1">
                  <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-lg p-4 shadow-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-5 h-5 text-green-200" />
                      <div>
                        <div className="text-sm font-bold text-white">views.permitted.dwp</div>
                        <div className="text-xs text-green-200">VIEW TOPIC</div>
                      </div>
                    </div>
                    <div className="bg-green-950/50 rounded p-2 text-xs text-green-100 font-mono">
                      <div>E3: Joe-Bloggs-ID | Paracetamol</div>
                    </div>
                    <div className="text-green-300 mt-2 text-xs">
                      ✓ Only permitted data
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-700 my-8"></div>

            {/* Phase 4: DWP Consumption */}
            <div className="mb-8">
              <div className="inline-block bg-green-500 text-white px-4 py-1.5 rounded-full font-bold mb-4 text-sm">
                PHASE 4: DWP CONSUMPTION
              </div>
              
              <div className="flex items-center justify-between gap-6">
                <div className="flex-1">
                  <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-lg p-4 shadow-xl">
                    <div className="text-sm font-bold text-white mb-1">views.permitted.dwp</div>
                    <div className="text-xs text-green-200">Filtered events ready</div>
                  </div>
                </div>

                <div className="flex-1 relative">
                  <div className="h-0.5 bg-gradient-to-r from-green-500 to-emerald-500"></div>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-6 border-t-transparent border-b-6 border-b-transparent border-l-8 border-l-emerald-500"></div>
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-green-900 text-white px-2 py-1 rounded text-xs font-semibold whitespace-nowrap shadow-lg">
                    15. Subscribe with JWT
                  </div>
                </div>

                <div className="flex flex-col items-center flex-1">
                  <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl shadow-xl flex items-center justify-center mb-2">
                    <FileText className="w-10 h-10 text-white" />
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-white">DWP Case App</div>
                    <div className="text-xs text-slate-400">Benefits Assessment</div>
                  </div>
                  <div className="mt-2 bg-emerald-900/50 border border-emerald-500 rounded p-2 text-xs text-emerald-200">
                    16-18. Process & decide
                  </div>
                </div>
              </div>
            </div>

            {/* Key Points */}
            <div className="mt-6 grid grid-cols-4 gap-4">
              <div className="bg-blue-900 rounded-lg p-3">
                <div className="text-blue-300 font-bold mb-1 flex items-center gap-2 text-sm">
                  <Shield className="w-4 h-4" />
                  Consent First
                </div>
                <div className="text-xs text-blue-200">
                  Nothing flows without explicit approval
                </div>
              </div>
              <div className="bg-red-900 rounded-lg p-3">
                <div className="text-red-300 font-bold mb-1 flex items-center gap-2 text-sm">
                  🔒 RAW Locked
                </div>
                <div className="text-xs text-red-200">
                  Read-only, 7-day retention
                </div>
              </div>
              <div className="bg-green-900 rounded-lg p-3">
                <div className="text-green-300 font-bold mb-1 flex items-center gap-2 text-sm">
                  ✓ VIEW Filtered
                </div>
                <div className="text-xs text-green-200">
                  Only permitted data per agency
                </div>
              </div>
              <div className="bg-purple-900 rounded-lg p-3">
                <div className="text-purple-300 font-bold mb-1 text-sm">
                  Abbreviations
                </div>
                <div className="text-xs text-purple-200">
                  DWP = Benefits<br/>
                  PIP = Disability Payment<br/>
                  CDC = Data Capture
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Key Benefits */}
        {selectedFlow !== 'interaction' && (
          <div className="mt-6 grid grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-green-900 to-green-950 rounded-lg p-4 border border-green-500">
              <div className="text-lg font-bold text-green-300 mb-2">✅ Single Source of Truth</div>
              <div className="text-green-100 text-xs">
                Kafka is the central event backbone. All data changes flow through it. Every service stays synchronized automatically.
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-900 to-blue-950 rounded-lg p-4 border border-blue-500">
              <div className="text-lg font-bold text-blue-300 mb-2">🔒 Citizen Control</div>
              <div className="text-blue-100 text-xs">
                Citizens control ALL data sharing via consent. View credentials, grant/revoke access, see audit trail of who accessed what.
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-900 to-purple-950 rounded-lg p-4 border border-purple-500">
              <div className="text-lg font-bold text-purple-300 mb-2">⚡ Real-Time Sync</div>
              <div className="text-purple-100 text-xs">
                Update once, propagate everywhere. No more form filling. No more data inconsistency. One change = instant sync across government.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}