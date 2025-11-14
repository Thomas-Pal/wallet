import { useState } from 'react';
import { User, Shield, Key, FileCheck, Wallet, CheckCircle, Database, Smartphone, Building2, ShoppingCart, Lock, Bitcoin } from 'lucide-react';

export default function DIDWalletArchitecture() {
  const [selectedFlow, setSelectedFlow] = useState('did-creation');
  
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 px-4 py-8">
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">UK Digital Identity Wallet Platform</h1>
          <p className="text-base text-purple-200 mb-1">Decentralised Identity System with DID:ION on Bitcoin</p>
          <p className="text-slate-400 text-sm">Self-sovereign identity with verifiable credentials</p>
        </div>

        {/* Flow Selector */}
        <div className="flex justify-center gap-3 mb-6 flex-wrap">
          <button
            onClick={() => setSelectedFlow('did-creation')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${selectedFlow === 'did-creation' ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
          >
            DID Creation Flow
          </button>
          <button
            onClick={() => setSelectedFlow('vc-issuance')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${selectedFlow === 'vc-issuance' ? 'bg-green-600 text-white shadow-lg' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
          >
            VC Issuance Flow
          </button>
          <button
            onClick={() => setSelectedFlow('vp-verification')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${selectedFlow === 'vp-verification' ? 'bg-orange-600 text-white shadow-lg' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
          >
            VP Verification Flow
          </button>
        </div>

        {/* Main Architecture */}
        <div className="bg-slate-900/70 rounded-2xl p-6 shadow-xl border border-slate-800">
          
          {/* DID CREATION FLOW */}
          {selectedFlow === 'did-creation' && (
            <div>
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">DID Creation & Registration Flow</h2>
                <p className="text-slate-400 text-base">Citizen creates decentralized identifier anchored on Bitcoin via ION</p>
              </div>

              {/* Step 1: Citizen & Wallet App */}
              <div className="mb-8">
                <div className="flex items-center justify-center gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-3xl shadow-xl flex items-center justify-center mb-3">
                      <User className="w-12 h-12 text-white" />
                    </div>
                    <div className="text-center">
                      <div className="text-base font-bold text-white">UK Citizen</div>
                      <div className="text-slate-400 text-sm">Downloads wallet app</div>
                    </div>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="text-2xl mb-3">→</div>
                    <div className="text-slate-400 text-xs">Downloads</div>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-purple-700 rounded-3xl shadow-xl flex items-center justify-center mb-3">
                      <Smartphone className="w-12 h-12 text-white" />
                    </div>
                    <div className="text-center">
                      <div className="text-base font-bold text-white">Wallet App</div>
                      <div className="text-slate-400 text-sm">iOS / Android / Desktop</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-700 my-6"></div>

              {/* Step 2: GOV.UK One Login */}
              <div className="mb-8">
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-5 border-2 border-blue-500">
                  <div className="flex items-center gap-3 mb-4">
                    <Shield className="w-10 h-10 text-blue-400" />
                    <div>
                      <div className="text-xl font-bold text-white">Step 1: GOV.UK One Login Authentication</div>
                      <div className="text-slate-300 text-sm">Initial identity verification via existing government system</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="bg-slate-900/50 rounded-xl p-4">
                      <div className="text-blue-400 font-bold mb-2 text-base">1. Login Request</div>
                      <div className="text-slate-300 text-sm space-y-2">
                        <div>→ User clicks Login with GOV.UK</div>
                        <div>→ Redirected to One Login portal</div>
                        <div>→ Enter credentials</div>
                        <div>→ 2FA verification</div>
                      </div>
                    </div>

                    <div className="bg-slate-900/50 rounded-xl p-4">
                      <div className="text-blue-400 font-bold mb-2 text-base">2. Identity Verified</div>
                      <div className="text-slate-300 text-sm space-y-2">
                        <div>→ One Login validates identity</div>
                        <div>→ Level of assurance confirmed</div>
                        <div>→ Returns ID token (JWT)</div>
                        <div>→ Contains: Name, DOB, NHS number</div>
                      </div>
                    </div>

                    <div className="bg-slate-900/50 rounded-xl p-4">
                      <div className="text-blue-400 font-bold mb-2 text-base">3. Wallet Session</div>
                      <div className="text-slate-300 text-sm space-y-2">
                        <div>→ Wallet receives auth token</div>
                        <div>→ Stores session securely</div>
                        <div>→ Links to user profile</div>
                        <div>→ Ready for DID creation</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-700 my-6"></div>

              {/* Step 3: DID Generation */}
              <div className="mb-8">
                <div className="bg-gradient-to-br from-purple-800 to-purple-950 rounded-2xl p-5 border-2 border-purple-400">
                  <div className="flex items-center gap-3 mb-4">
                    <Key className="w-10 h-10 text-purple-300" />
                    <div>
                      <div className="text-xl font-bold text-white">Step 2: DID Generation (Client-Side)</div>
                      <div className="text-purple-200 text-sm">Wallet generates cryptographic keypair and DID document</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="bg-purple-950/50 rounded-xl p-4">
                      <div className="text-purple-300 font-bold mb-3 text-base flex items-center gap-2">
                        <Lock className="w-5 h-5" />
                        Keypair Generation
                      </div>
                      <div className="bg-purple-900/50 rounded p-3 mb-3 text-xs font-mono text-purple-100">
                        <div>const keypair = generateKeyPair();</div>
                        <div className="mt-2">Private Key: secp256k1</div>
                        <div>Public Key: compressed format</div>
                      </div>
                      <div className="text-purple-200 text-sm space-y-2">
                        <div>✓ Generated locally in wallet</div>
                        <div>✓ Private key stored in secure enclave</div>
                        <div>✓ Never leaves device</div>
                        <div>✓ Used for signing operations</div>
                      </div>
                    </div>

                    <div className="bg-purple-950/50 rounded-xl p-4">
                      <div className="text-purple-300 font-bold mb-3 text-base flex items-center gap-2">
                        <FileCheck className="w-5 h-5" />
                        DID Document Created
                      </div>
                      <div className="bg-purple-900/50 rounded p-3 mb-3 text-xs font-mono text-purple-100 overflow-x-auto">
                        <div>id: did:ion:EiD...</div>
                        <div>verificationMethod:</div>
                        <div>  - id: key-1</div>
                        <div>  - type: EcdsaSecp256k1</div>
                        <div>  - publicKeyJwk: ...</div>
                      </div>
                      <div className="text-purple-200 text-sm space-y-2">
                        <div>✓ Includes public key</div>
                        <div>✓ Authentication methods</div>
                        <div>✓ Service endpoints (optional)</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 bg-purple-900/30 border border-purple-400 rounded-lg p-3">
                    <div className="text-center text-purple-100 text-sm">
                      <strong className="text-purple-300">Generated DID (temporary):</strong> did:ion:EiD8yD4Wz3X... (not yet on blockchain)
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-700 my-6"></div>

              {/* Step 4: ION Network */}
              <div className="mb-8">
                <div className="bg-gradient-to-br from-orange-800 to-orange-900 rounded-2xl p-5 border-2 border-orange-400">
                  <div className="flex items-center gap-3 mb-4">
                    <Database className="w-10 h-10 text-orange-300" />
                    <div>
                      <div className="text-2xl font-bold text-white">Step 3: ION (Identity Overlay Network)</div>
                      <div className="text-orange-200 text-sm">Layer 2 DID network running on Bitcoin</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="bg-orange-950/50 rounded-xl p-4">
                      <div className="text-orange-300 font-bold mb-2 text-base">1. Submit to ION Node</div>
                      <div className="text-orange-100 text-sm space-y-2">
                        <div>→ Wallet sends DID operation</div>
                        <div>→ ION node receives create request</div>
                        <div>→ Operation added to queue</div>
                        <div>→ Validated by node</div>
                      </div>
                      <div className="mt-3 bg-orange-900/50 rounded p-3 text-xs">
                        <strong>Operation Type:</strong> CREATE<br/>
                        <strong>Payload:</strong> DID Document + Proof
                      </div>
                    </div>

                    <div className="bg-orange-950/50 rounded-xl p-4">
                      <div className="text-orange-300 font-bold mb-2 text-base">2. Batch Operations</div>
                      <div className="text-orange-100 text-sm space-y-2">
                        <div>→ ION batches multiple DIDs</div>
                        <div>→ Creates Merkle tree</div>
                        <div>→ Generates batch file</div>
                        <div>→ Stored in IPFS/CAS</div>
                      </div>
                      <div className="mt-3 bg-orange-900/50 rounded p-3 text-xs">
                        <strong>Batch Size:</strong> ~10,000 ops<br/>
                        <strong>Frequency:</strong> Every ~10 mins<br/>
                        <strong>Storage:</strong> Content-addressable
                      </div>
                    </div>

                    <div className="bg-orange-950/50 rounded-xl p-4">
                      <div className="text-orange-300 font-bold mb-2 text-base">3. Merkle Root Hash</div>
                      <div className="text-orange-100 text-sm space-y-2">
                        <div>→ Calculate root hash</div>
                        <div>→ Represents entire batch</div>
                        <div>→ Cryptographic proof</div>
                        <div>→ Ready for blockchain</div>
                      </div>
                      <div className="mt-3 bg-orange-900/50 rounded p-3 text-xs font-mono">
                        Root: 0x7a3f2e9d...<br/>
                        IPFS: Qm8Xk7Pw3...
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 bg-gradient-to-r from-orange-900 to-yellow-900 rounded-lg p-3">
                    <div className="text-center text-orange-100 text-sm">
                      <strong className="text-yellow-300">Efficiency:</strong> Batching thousands of DID operations into a single Bitcoin transaction reduces cost and improves scalability
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-700 my-6"></div>

              {/* Step 5: Bitcoin Blockchain */}
              <div className="mb-8">
                <div className="bg-gradient-to-br from-yellow-700 to-yellow-900 rounded-2xl p-5 border-2 border-yellow-400">
                  <div className="flex items-center gap-3 mb-4">
                    <Bitcoin className="w-10 h-10 text-yellow-300" />
                    <div>
                      <div className="text-2xl font-bold text-white">Step 4: Bitcoin Blockchain Anchoring</div>
                      <div className="text-yellow-200 text-sm">Immutable, decentralized ledger for DID operations</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <div className="bg-yellow-950/50 rounded-xl p-4">
                      <div className="text-yellow-300 font-bold mb-2 text-center text-sm">Transaction Created</div>
                      <div className="text-yellow-100 text-xs space-y-1.5">
                        <div>• ION node creates Bitcoin TX</div>
                        <div>• OP_RETURN with Merkle root</div>
                        <div>• IPFS hash included</div>
                        <div>• Signed and broadcast</div>
                      </div>
                    </div>

                    <div className="bg-yellow-950/50 rounded-xl p-4">
                      <div className="text-yellow-300 font-bold mb-2 text-center text-sm">Mempool</div>
                      <div className="text-yellow-100 text-xs space-y-1.5">
                        <div>• TX enters mempool</div>
                        <div>• Awaiting confirmation</div>
                        <div>• Miners prioritize by fee</div>
                        <div>• ~10-60 min wait</div>
                      </div>
                    </div>

                    <div className="bg-yellow-950/50 rounded-xl p-4">
                      <div className="text-yellow-300 font-bold mb-2 text-center text-sm">Block Inclusion</div>
                      <div className="text-yellow-100 text-xs space-y-1.5">
                        <div>• TX included in block</div>
                        <div>• Block height recorded</div>
                        <div>• First confirmation</div>
                        <div>• Timestamp locked</div>
                      </div>
                    </div>

                    <div className="bg-yellow-950/50 rounded-xl p-4">
                      <div className="text-yellow-300 font-bold mb-2 text-center text-sm">Confirmed</div>
                      <div className="text-yellow-100 text-xs space-y-1.5">
                        <div>• 6+ confirmations</div>
                        <div>• ~1 hour total</div>
                        <div>• Immutable record</div>
                        <div>• Globally visible</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 bg-yellow-950/30 border border-yellow-500 rounded-lg p-3">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div>
                        <div className="text-yellow-300 font-bold mb-2 text-sm">Transaction Example:</div>
                        <div className="bg-yellow-900/50 rounded p-3 text-xs font-mono text-yellow-100">
                          <div>TxID: 3f7a2b9e4c...</div>
                          <div>Block: 825,432</div>
                          <div>OP_RETURN: 0x7a3f2e9d...</div>
                          <div>Fee: 0.00005 BTC</div>
                        </div>
                      </div>
                      <div>
                        <div className="text-yellow-300 font-bold mb-2 text-sm">What's Stored:</div>
                        <div className="text-yellow-100 text-xs space-y-1.5">
                          <div>✓ Merkle root hash (32 bytes)</div>
                          <div>✓ Reference to IPFS batch file</div>
                          <div>✓ Timestamp of operation</div>
                          <div>✗ NOT the full DID documents</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-700 my-6"></div>

              {/* Step 6: DID Resolution */}
              <div className="mb-8">
                <div className="bg-gradient-to-br from-green-700 to-green-900 rounded-2xl p-5 border-2 border-green-400">
                  <div className="flex items-center gap-3 mb-4">
                    <CheckCircle className="w-10 h-10 text-green-300" />
                    <div>
                      <div className="text-2xl font-bold text-white">Step 5: DID Resolution and Verification</div>
                      <div className="text-green-200 text-sm">Anyone can now resolve and verify the DID</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="bg-green-950/50 rounded-xl p-4">
                      <div className="text-green-300 font-bold mb-2 text-base">1. Resolution Request</div>
                      <div className="text-green-100 text-sm space-y-2">
                        <div>→ Query: did:ion:EiD8yD...</div>
                        <div>→ ION resolver parses DID</div>
                        <div>→ Looks up on Bitcoin</div>
                        <div>→ Finds transaction hash</div>
                      </div>
                    </div>

                    <div className="bg-green-950/50 rounded-xl p-4">
                      <div className="text-green-300 font-bold mb-2 text-base">2. Retrieve from IPFS</div>
                      <div className="text-green-100 text-sm space-y-2">
                        <div>→ Get batch file from CAS</div>
                        <div>→ Extract DID operation</div>
                        <div>→ Verify Merkle proof</div>
                        <div>→ Reconstruct DID doc</div>
                      </div>
                    </div>

                    <div className="bg-green-950/50 rounded-xl p-4">
                      <div className="text-green-300 font-bold mb-2 text-base">3. Return DID Document</div>
                      <div className="text-green-100 text-sm space-y-2">
                        <div>→ Full DID document returned</div>
                        <div>→ Includes public keys</div>
                        <div>→ Service endpoints</div>
                        <div>→ Verification methods</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 bg-green-900/30 border border-green-400 rounded-lg p-3">
                    <div className="text-center text-green-100 text-sm">
                      <div className="text-base font-bold text-green-300 mb-1">✅ DID is now LIVE and RESOLVABLE!</div>
                      <div>Any verifier can look up this DID and verify credentials signed with it</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* VC ISSUANCE FLOW */}
          {selectedFlow === 'vc-issuance' && (
            <div>
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">Verifiable Credential (VC) Issuance Flow</h2>
                <p className="text-slate-400 text-base">Government institutions issue cryptographically signed credentials to citizen wallets</p>
              </div>

              {/* Issuer Section */}
              <div className="mb-8">
                <div className="bg-gradient-to-br from-blue-700 to-blue-900 rounded-2xl p-5 border-2 border-blue-400">
                  <div className="flex items-center gap-3 mb-4">
                    <Building2 className="w-10 h-10 text-blue-300" />
                    <div>
                      <div className="text-2xl font-bold text-white">Credential Issuers</div>
                      <div className="text-blue-200 text-sm">Trusted government institutions with their own DIDs</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <div className="bg-blue-950/50 rounded-xl p-4">
                      <div className="text-2xl mb-2">🏥</div>
                      <div className="text-blue-300 font-bold mb-2">NHS</div>
                      <div className="text-blue-100 text-xs space-y-1">
                        <div>• Medical records</div>
                        <div>• Prescriptions</div>
                        <div>• Vaccination status</div>
                        <div>• Organ donor status</div>
                      </div>
                      <div className="mt-3 text-[10px] text-blue-300 font-mono">did:ion:nhs...</div>
                    </div>
                    
                    <div className="bg-blue-950/50 rounded-xl p-4">
                      <div className="text-2xl mb-2">🚗</div>
                      <div className="text-blue-300 font-bold mb-2">DVLA</div>
                      <div className="text-blue-100 text-xs space-y-1">
                        <div>• Driving licence</div>
                        <div>• Vehicle ownership</div>
                        <div>• Penalty points</div>
                        <div>• Licence categories</div>
                      </div>
                      <div className="mt-3 text-[10px] text-blue-300 font-mono">did:ion:dvla...</div>
                    </div>
                    
                    <div className="bg-blue-950/50 rounded-xl p-4">
                      <div className="text-2xl mb-2">✈️</div>
                      <div className="text-blue-300 font-bold mb-2">Home Office</div>
                      <div className="text-blue-100 text-xs space-y-1">
                        <div>• Passport</div>
                        <div>• Right to work</div>
                        <div>• Visa status</div>
                        <div>• Citizenship</div>
                      </div>
                      <div className="mt-3 text-[10px] text-blue-300 font-mono">did:ion:hmpo...</div>
                    </div>
                    
                    <div className="bg-blue-950/50 rounded-xl p-4">
                      <div className="text-2xl mb-2">💼</div>
                      <div className="text-blue-300 font-bold mb-2">HMRC</div>
                      <div className="text-blue-100 text-xs space-y-1">
                        <div>• Tax code</div>
                        <div>• Employment status</div>
                        <div>• National Insurance</div>
                        <div>• Income verification</div>
                      </div>
                      <div className="mt-3 text-[10px] text-blue-300 font-mono">did:ion:hmrc...</div>
                    </div>
                  </div>

                  <div className="mt-6 bg-blue-900/30 rounded-lg p-4 text-blue-100 text-sm">
                    <strong>Important:</strong> Each issuer has their own DID registered on ION. Citizens can verify the authenticity of credentials by checking the issuer's DID.
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-700 my-6"></div>

              {/* VC Creation Process */}
              <div className="mb-8">
                <div className="bg-gradient-to-br from-purple-700 to-purple-900 rounded-2xl p-5 border-2 border-purple-400">
                  <div className="flex items-center gap-4 mb-6">
                    <FileCheck className="w-12 h-12 text-purple-300" />
                    <div>
                      <div className="text-2xl font-bold text-white">VC Creation and Signing Process</div>
                      <div className="text-purple-200">Example: DVLA issues a driving licence credential</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-5 gap-4">
                    <div className="bg-purple-950/50 rounded-xl p-5">
                      <div className="text-purple-300 font-bold mb-3 text-center text-sm">1. Citizen Requests</div>
                      <div className="text-purple-100 text-xs space-y-2">
                        <div>→ Applies for licence</div>
                        <div>→ Passes driving test</div>
                        <div>→ Provides DID</div>
                        <div>→ Authorizes issuance</div>
                      </div>
                    </div>
                    
                    <div className="bg-purple-950/50 rounded-xl p-5">
                      <div className="text-purple-300 font-bold mb-3 text-center text-sm">2. DVLA Creates VC</div>
                      <div className="text-purple-100 text-xs space-y-2">
                        <div>→ Verifies entitlement</div>
                        <div>→ Creates VC JSON</div>
                        <div>→ Adds claims</div>
                        <div>→ Links to citizen DID</div>
                      </div>
                    </div>
                    
                    <div className="bg-purple-950/50 rounded-xl p-5">
                      <div className="text-purple-300 font-bold mb-3 text-center text-sm">3. DVLA Signs VC</div>
                      <div className="text-purple-100 text-xs space-y-2">
                        <div>→ Signs with private key</div>
                        <div>→ Creates proof object</div>
                        <div>→ Adds DVLA DID</div>
                        <div>→ Sets expiration</div>
                      </div>
                    </div>
                    
                    <div className="bg-purple-950/50 rounded-xl p-5">
                      <div className="text-purple-300 font-bold mb-3 text-center text-sm">4. VC Transmitted</div>
                      <div className="text-purple-100 text-xs space-y-2">
                        <div>→ Sent to wallet app</div>
                        <div>→ Secure channel</div>
                        <div>→ QR code or link</div>
                        <div>→ Encrypted</div>
                      </div>
                    </div>
                    
                    <div className="bg-purple-950/50 rounded-xl p-5">
                      <div className="text-purple-300 font-bold mb-3 text-center text-sm">5. Wallet Stores</div>
                      <div className="text-purple-100 text-xs space-y-2">
                        <div>→ VC received</div>
                        <div>→ Verified signature</div>
                        <div>→ Stored locally</div>
                        <div>→ Ready to use</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 bg-purple-900/30 border-2 border-purple-400 rounded-lg p-4">
                    <div className="text-purple-300 font-bold mb-3">Example VC Structure (Driving Licence):</div>
                    <div className="bg-purple-950/50 rounded p-4 text-xs font-mono text-purple-100 overflow-x-auto">
                      <div>type: [VerifiableCredential, DrivingLicence]</div>
                      <div>issuer: did:ion:dvla...</div>
                      <div>credentialSubject:</div>
                      <div>  id: did:ion:EiD8yD... (citizen)</div>
                      <div>  licenceNumber: SMITH123456AB7CD</div>
                      <div>  categories: [B, BE]</div>
                      <div>  dateOfBirth: 1990-05-15</div>
                      <div>  over18: true</div>
                      <div>proof:</div>
                      <div>  type: JsonWebSignature2020</div>
                      <div>  created: 2025-11-06T10:30:00Z</div>
                      <div>  proofPurpose: assertionMethod</div>
                      <div>  verificationMethod: did:ion:dvla...#key-1</div>
                      <div>  jws: eyJhbGc...</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-700 my-6"></div>

              {/* Citizen Wallet View */}
              <div className="mb-8">
                <div className="bg-gradient-to-br from-green-700 to-green-900 rounded-2xl p-5 border-2 border-green-400">
                  <div className="flex items-center gap-4 mb-6">
                    <Wallet className="w-12 h-12 text-green-300" />
                    <div>
                      <div className="text-2xl font-bold text-white">Credentials in Citizen Wallet</div>
                      <div className="text-green-200">User now has possession of verifiable credential</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-green-950/50 rounded-xl p-6 border-2 border-green-400">
                      <div className="text-green-300 font-bold mb-4 text-base">Driving Licence VC</div>
                      <div className="text-green-100 text-sm space-y-3">
                        <div className="flex justify-between">
                          <span className="text-green-400">Issuer:</span>
                          <span>DVLA</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-green-400">Status:</span>
                          <span>✓ Valid</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-green-400">Issued:</span>
                          <span>06 Nov 2025</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-green-400">Expires:</span>
                          <span>06 Nov 2035</span>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-green-700 text-xs text-green-200">
                        <div className="font-bold mb-2">Claims Available:</div>
                        <div>• Full name</div>
                        <div>• Date of birth</div>
                        <div>• Over 18 status</div>
                        <div>• Licence categories</div>
                        <div>• Photo</div>
                      </div>
                    </div>

                    <div className="bg-green-950/50 rounded-xl p-6 border-2 border-green-400">
                      <div className="text-green-300 font-bold mb-4 text-base">NHS Health VC</div>
                      <div className="text-green-100 text-sm space-y-3">
                        <div className="flex justify-between">
                          <span className="text-green-400">Issuer:</span>
                          <span>NHS</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-green-400">Status:</span>
                          <span>✓ Valid</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-green-400">Issued:</span>
                          <span>15 Oct 2025</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-green-400">Expires:</span>
                          <span>Never</span>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-green-700 text-xs text-green-200">
                        <div className="font-bold mb-2">Claims Available:</div>
                        <div>• NHS number</div>
                        <div>• Blood type</div>
                        <div>• Vaccination records</div>
                        <div>• Organ donor status</div>
                      </div>
                    </div>

                    <div className="bg-green-950/50 rounded-xl p-6 border-2 border-green-400">
                      <div className="text-green-300 font-bold mb-4 text-base">Passport VC</div>
                      <div className="text-green-100 text-sm space-y-3">
                        <div className="flex justify-between">
                          <span className="text-green-400">Issuer:</span>
                          <span>Home Office</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-green-400">Status:</span>
                          <span>✓ Valid</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-green-400">Issued:</span>
                          <span>20 Jan 2025</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-green-400">Expires:</span>
                          <span>20 Jan 2035</span>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-green-700 text-xs text-green-200">
                        <div className="font-bold mb-2">Claims Available:</div>
                        <div>• Passport number</div>
                        <div>• Nationality</div>
                        <div>• Right to work</div>
                        <div>• Travel history</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 bg-green-900/30 border-2 border-green-400 rounded-lg p-4">
                    <div className="text-center text-green-100">
                      <div className="text-xl font-bold text-green-300 mb-2">🔐 Self-Sovereign Identity</div>
                      <div>Citizen holds all credentials in their wallet. No central database. Full control over sharing.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* VP VERIFICATION FLOW */}
          {selectedFlow === 'vp-verification' && (
            <div>
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold text-white mb-3">Verifiable Presentation (VP) and Verification Flow</h2>
                <p className="text-slate-400 text-base">Citizen creates selective disclosure presentation and verifier checks validity</p>
              </div>

              {/* Scenario Setup */}
              <div className="mb-8">
                <div className="bg-gradient-to-br from-orange-700 to-orange-900 rounded-2xl p-5 border-2 border-orange-400">
                  <div className="flex items-center gap-4 mb-6">
                    <ShoppingCart className="w-12 h-12 text-orange-300" />
                    <div>
                      <div className="text-2xl font-bold text-white">Use Case: Age Verification at Alcohol Shop</div>
                      <div className="text-orange-200">Customer needs to prove they are 18+ without revealing full details</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-8">
                    <div className="bg-orange-950/50 rounded-xl p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <User className="w-8 h-8 text-orange-300" />
                        <div className="text-orange-300 font-bold text-xl">Holder (Customer)</div>
                      </div>
                      <div className="text-orange-100 text-sm space-y-2">
                        <div>✓ Has driving licence VC in wallet</div>
                        <div>✓ VC contains: name, DOB, address, photo, over18 claim</div>
                        <div>✓ Wants to buy alcohol</div>
                        <div>✓ Only needs to prove age, not share everything</div>
                      </div>
                    </div>

                    <div className="bg-orange-950/50 rounded-xl p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <Building2 className="w-8 h-8 text-orange-300" />
                        <div className="text-orange-300 font-bold text-xl">Verifier (Shop)</div>
                      </div>
                      <div className="text-orange-100 text-sm space-y-2">
                        <div>✓ Needs to verify customer is 18+</div>
                        <div>✓ Does NOT need full name or address</div>
                        <div>✓ Must verify credential is from DVLA</div>
                        <div>✓ Must verify it belongs to this person</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-700 my-6"></div>

              {/* VP Creation */}
              <div className="mb-8">
                <div className="bg-gradient-to-br from-purple-700 to-purple-900 rounded-2xl p-5 border-2 border-purple-400">
                  <div className="flex items-center gap-4 mb-6">
                    <FileCheck className="w-12 h-12 text-purple-300" />
                    <div>
                      <div className="text-2xl font-bold text-white">Step 1: Creating Verifiable Presentation (VP)</div>
                      <div className="text-purple-200">Selective disclosure - share only what's needed</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-4">
                    <div className="bg-purple-950/50 rounded-xl p-5">
                      <div className="text-purple-300 font-bold mb-3 text-center text-sm">1. Request Scan</div>
                      <div className="text-purple-100 text-xs space-y-2">
                        <div>→ Shop displays QR code</div>
                        <div>→ Requests: over18 claim</div>
                        <div>→ Customer scans with wallet</div>
                        <div>→ Wallet shows request</div>
                      </div>
                    </div>
                    
                    <div className="bg-purple-950/50 rounded-xl p-5">
                      <div className="text-purple-300 font-bold mb-3 text-center text-sm">2. Select Claims</div>
                      <div className="text-purple-100 text-xs space-y-2">
                        <div>→ Wallet shows available VCs</div>
                        <div>→ User selects driving licence</div>
                        <div>→ Chooses ONLY over18 claim</div>
                        <div>→ Hides name, address, DOB</div>
                      </div>
                    </div>
                    
                    <div className="bg-purple-950/50 rounded-xl p-5">
                      <div className="text-purple-300 font-bold mb-3 text-center text-sm">3. Create VP</div>
                      <div className="text-purple-100 text-xs space-y-2">
                        <div>→ Wallet creates VP document</div>
                        <div>→ Includes selected claims</div>
                        <div>→ Preserves VC signature</div>
                        <div>→ Adds presentation proof</div>
                      </div>
                    </div>
                    
                    <div className="bg-purple-950/50 rounded-xl p-5">
                      <div className="text-purple-300 font-bold mb-3 text-center text-sm">4. Sign VP</div>
                      <div className="text-purple-100 text-xs space-y-2">
                        <div>→ User signs with their DID</div>
                        <div>→ Proves possession of VC</div>
                        <div>→ Links VP to their identity</div>
                        <div>→ Ready to share</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 bg-purple-900/30 border-2 border-purple-400 rounded-lg p-4">
                    <div className="text-purple-300 font-bold mb-3">VP Structure (Selective Disclosure):</div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-purple-200 text-sm mb-2">Full VC (in wallet):</div>
                        <div className="bg-purple-950/50 rounded p-3 text-xs font-mono text-purple-100">
                          <div>credentialSubject:</div>
                          <div>  name: John Smith</div>
                          <div>  dateOfBirth: 1990-05-15</div>
                          <div>  address: 123 High St...</div>
                          <div className="text-purple-400">  over18: true</div>
                          <div>  photo: base64...</div>
                          <div>  licenceNumber: SMITH...</div>
                        </div>
                      </div>
                      <div>
                        <div className="text-purple-200 text-sm mb-2">VP (shared to shop):</div>
                        <div className="bg-purple-950/50 rounded p-3 text-xs font-mono text-purple-100">
                          <div>verifiableCredential:</div>
                          <div>  issuer: did:ion:dvla...</div>
                          <div>  subject: did:ion:EiD8...</div>
                          <div className="text-purple-400">  over18: true</div>
                          <div>  (other claims hidden)</div>
                          <div>proof:</div>
                          <div>  signed by citizen DID</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-700 my-6"></div>

              {/* Verification Process */}
              <div className="mb-12">
                <div className="bg-gradient-to-br from-blue-700 to-blue-900 rounded-2xl p-5 border-2 border-blue-400">
                  <div className="flex items-center gap-4 mb-6">
                    <Shield className="w-12 h-12 text-blue-300" />
                    <div>
                      <div className="text-2xl font-bold text-white">Step 2: Verification Process</div>
                      <div className="text-blue-200">Shop verifies the VP authenticity and validity</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-5 gap-4">
                    <div className="bg-blue-950/50 rounded-xl p-5">
                      <div className="text-blue-300 font-bold mb-3 text-center text-sm">1. Receive VP</div>
                      <div className="text-blue-100 text-xs space-y-2">
                        <div>→ Shop scanner receives VP</div>
                        <div>→ Extracts claims</div>
                        <div>→ Sees over18: true</div>
                        <div>→ Starts verification</div>
                      </div>
                    </div>
                    
                    <div className="bg-blue-950/50 rounded-xl p-5">
                      <div className="text-blue-300 font-bold mb-3 text-center text-sm">2. Verify Issuer</div>
                      <div className="text-blue-100 text-xs space-y-2">
                        <div>→ Extract issuer DID</div>
                        <div>→ Resolve did:ion:dvla...</div>
                        <div>→ Get DVLA public key</div>
                        <div>→ Confirm trusted issuer</div>
                      </div>
                    </div>
                    
                    <div className="bg-blue-950/50 rounded-xl p-5">
                      <div className="text-blue-300 font-bold mb-3 text-center text-sm">3. Verify VC Signature</div>
                      <div className="text-blue-100 text-xs space-y-2">
                        <div>→ Check VC signature</div>
                        <div>→ Verify with DVLA key</div>
                        <div>→ Ensure not tampered</div>
                        <div>→ Check expiration</div>
                      </div>
                    </div>
                    
                    <div className="bg-blue-950/50 rounded-xl p-5">
                      <div className="text-blue-300 font-bold mb-3 text-center text-sm">4. Verify Subject</div>
                      <div className="text-blue-100 text-xs space-y-2">
                        <div>→ Extract subject DID</div>
                        <div>→ Resolve citizen DID</div>
                        <div>→ Get public key</div>
                        <div>→ Verify VP signature</div>
                      </div>
                    </div>
                    
                    <div className="bg-blue-950/50 rounded-xl p-5">
                      <div className="text-blue-300 font-bold mb-3 text-center text-sm">5. Decision</div>
                      <div className="text-blue-100 text-xs space-y-2">
                        <div>→ All checks passed</div>
                        <div>→ over18 = true</div>
                        <div>→ Valid credential</div>
                        <div>→ ✅ Approved</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 bg-blue-900/30 border-2 border-blue-400 rounded-lg p-4">
                    <div className="text-blue-300 font-bold mb-3 text-center">Verification Checks:</div>
                    <div className="grid grid-cols-3 gap-4 text-sm text-blue-100">
                      <div>
                        <div className="font-bold mb-2">1. Issuer Trust</div>
                        <div className="text-xs">✓ Is DVLA DID valid?</div>
                        <div className="text-xs">✓ Is DVLA trusted issuer?</div>
                        <div className="text-xs">✓ Public key matches?</div>
                      </div>
                      <div>
                        <div className="font-bold mb-2">2. Credential Validity</div>
                        <div className="text-xs">✓ Signature valid?</div>
                        <div className="text-xs">✓ Not expired?</div>
                        <div className="text-xs">✓ Not revoked?</div>
                      </div>
                      <div>
                        <div className="font-bold mb-2">3. Holder Proof</div>
                        <div className="text-xs">✓ Subject DID valid?</div>
                        <div className="text-xs">✓ VP signed by subject?</div>
                        <div className="text-xs">✓ Holder possesses credential?</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t-2 border-slate-600 my-8"></div>

              {/* Technical Deep Dive */}
              <div className="mb-8">
                <div className="bg-gradient-to-br from-green-700 to-green-900 rounded-2xl p-5 border-2 border-green-400">
                  <div className="flex items-center gap-4 mb-6">
                    <CheckCircle className="w-12 h-12 text-green-300" />
                    <div>
                      <div className="text-2xl font-bold text-white">Technical Verification Flow</div>
                      <div className="text-green-200">Cryptographic proof chain from Bitcoin to presentation</div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="bg-green-950/50 rounded-xl p-6">
                      <div className="text-green-300 font-bold mb-4 text-base flex items-center gap-2">
                        <Database className="w-6 h-6" />
                        Issuer DID Resolution (DVLA)
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-xs text-green-100">
                        <div>
                          <div className="font-bold text-green-300 mb-2">1. Query ION</div>
                          <div>→ did:ion:dvla...</div>
                          <div>→ Lookup on Bitcoin</div>
                          <div>→ Find anchor TX</div>
                        </div>
                        <div>
                          <div className="font-bold text-green-300 mb-2">2. Retrieve Document</div>
                          <div>→ Get from IPFS</div>
                          <div>→ Verify Merkle proof</div>
                          <div>→ Reconstruct DID doc</div>
                        </div>
                        <div>
                          <div className="font-bold text-green-300 mb-2">3. Extract Key</div>
                          <div>→ Get public key</div>
                          <div>→ Verification method</div>
                          <div>→ Ready to verify VC</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-950/50 rounded-xl p-6">
                      <div className="text-green-300 font-bold mb-4 text-base flex items-center gap-2">
                        <Key className="w-6 h-6" />
                        VC Signature Verification
                      </div>
                      <div className="bg-green-900/50 rounded p-4 mb-4 text-xs font-mono text-green-100">
                        <div>1. Extract VC proof.jws</div>
                        <div>2. Decode JWT signature</div>
                        <div>3. Get DVLA public key from DID doc</div>
                        <div>4. Verify signature matches:</div>
                        <div>   verify(jws, dvlaPublicKey, vcPayload)</div>
                        <div>5. Check expiration date</div>
                        <div>6. Result: ✅ VC is authentic and signed by DVLA</div>
                      </div>
                    </div>

                    <div className="bg-green-950/50 rounded-xl p-6">
                      <div className="text-green-300 font-bold mb-4 text-base flex items-center gap-2">
                        <User className="w-6 h-6" />
                        Subject DID Resolution (Citizen)
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-xs text-green-100">
                        <div>
                          <div className="font-bold text-green-300 mb-2">1. Query ION</div>
                          <div>→ did:ion:EiD8yD...</div>
                          <div>→ Citizen's DID</div>
                          <div>→ Lookup on Bitcoin</div>
                        </div>
                        <div>
                          <div className="font-bold text-green-300 mb-2">2. Retrieve Document</div>
                          <div>→ Get from IPFS</div>
                          <div>→ Get public key</div>
                          <div>→ Verification method</div>
                        </div>
                        <div>
                          <div className="font-bold text-green-300 mb-2">3. Verify VP Signature</div>
                          <div>→ Check VP proof</div>
                          <div>→ Signed by citizen</div>
                          <div>→ Proves possession</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 bg-green-900/30 border-2 border-green-400 rounded-lg p-4">
                    <div className="text-center text-green-100">
                      <div className="text-xl font-bold text-green-300 mb-2">✅ Complete Trust Chain Verified!</div>
                      <div className="mb-3">Bitcoin → ION → DVLA DID → VC Signature → Citizen DID → VP Signature</div>
                      <div className="text-sm">Shop can trust the over18 claim without knowing customer's full identity</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Key Benefits */}
        <div className="mt-8 grid grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-blue-900 to-blue-950 rounded-xl p-6 border-2 border-blue-500">
            <div className="text-2xl font-bold text-blue-300 mb-3">🔐 Decentralized Trust</div>
            <div className="text-blue-100 text-sm">
              No central authority controls identity. Bitcoin provides immutable anchoring. ION enables scalable DID operations. Users control their own identity.
            </div>
          </div>
          <div className="bg-gradient-to-br from-purple-900 to-purple-950 rounded-xl p-6 border-2 border-purple-500">
            <div className="text-2xl font-bold text-purple-300 mb-3">🎯 Selective Disclosure</div>
            <div className="text-purple-100 text-sm">
              Share only what's needed. Prove age without revealing DOB. Prove employment without showing salary. Privacy-preserving verification.
            </div>
          </div>
          <div className="bg-gradient-to-br from-green-900 to-green-950 rounded-xl p-6 border-2 border-green-500">
            <div className="text-2xl font-bold text-green-300 mb-3">✅ Cryptographic Proof</div>
            <div className="text-green-100 text-sm">
              Every credential cryptographically signed. Verifiable on-chain via Bitcoin. Tamper-proof. No reliance on online databases for verification.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}