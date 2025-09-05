'use client';

import { useState, useEffect } from 'react';
import { useMiniKit } from '@coinbase/onchainkit/minikit';
import { AppShell } from '@/components/AppShell';
import { ContentCard } from '@/components/ContentCard';
import { StateSelector } from '@/components/StateSelector';
import { ScriptViewer } from '@/components/ScriptViewer';
import { RecordingButton } from '@/components/RecordingButton';
import { AlertButton } from '@/components/AlertButton';
import { ActionChip } from '@/components/ActionChip';
import { useUser, useStateLaw, useScripts } from '@/lib/hooks';
import { stateLaws, scripts } from '@/lib/data';
import { 
  BookOpen, 
  FileText, 
  Shield, 
  Users, 
  TrendingUp,
  BarChart3,
  PieChart
} from 'lucide-react';

export default function HomePage() {
  const { setFrameReady } = useMiniKit();
  const { user, loading: userLoading, updateUser } = useUser();
  const [selectedState, setSelectedState] = useState<string>('CA');
  const [activeTab, setActiveTab] = useState<'overview' | 'scripts' | 'record' | 'alert'>('overview');
  const { stateLaw, loading: lawLoading } = useStateLaw(selectedState);
  const { scripts: scriptList, loading: scriptsLoading } = useScripts();

  useEffect(() => {
    setFrameReady();
  }, [setFrameReady]);

  const handleStateChange = (stateCode: string) => {
    setSelectedState(stateCode);
    if (user) {
      updateUser({ currentLocation: stateCode });
    }
  };

  if (userLoading) {
    return (
      <AppShell>
        <div className="space-y-6">
          {/* Loading skeleton */}
          <div className="animate-pulse space-y-4">
            <div className="glass-card p-6 rounded-lg">
              <div className="h-8 bg-white bg-opacity-20 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-white bg-opacity-20 rounded w-full mb-2"></div>
              <div className="h-4 bg-white bg-opacity-20 rounded w-2/3"></div>
            </div>
          </div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="space-y-6 pb-24">
        {/* Hero Section */}
        <ContentCard variant="highlight">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold">Know Your Rights Cards</h2>
            <p className="text-white text-opacity-90">
              Instant legal scripts and rights summaries in your pocket. 
              Stay informed and protected during any interaction.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <ActionChip 
                variant={activeTab === 'overview' ? 'selected' : 'default'}
                onClick={() => setActiveTab('overview')}
                icon={<Shield className="w-4 h-4" />}
              >
                State Laws
              </ActionChip>
              <ActionChip 
                variant={activeTab === 'scripts' ? 'selected' : 'default'}
                onClick={() => setActiveTab('scripts')}
                icon={<FileText className="w-4 h-4" />}
              >
                Scripts
              </ActionChip>
            </div>
          </div>
        </ContentCard>

        {/* State Selector */}
        <StateSelector 
          selectedState={selectedState}
          onStateChange={handleStateChange}
        />

        {/* Main Content Based on Active Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Legal Data Dashboard */}
            <ContentCard>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-white">Legal Data</h3>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">$46,000</div>
                    <div className="text-sm text-gray-300">vs $51,000</div>
                  </div>
                </div>
                
                {/* Chart placeholder */}
                <div className="bg-black bg-opacity-20 rounded-lg p-4 h-32 flex items-center justify-center">
                  <BarChart3 className="w-8 h-8 text-gray-400" />
                  <span className="ml-2 text-gray-400">Usage Analytics</span>
                </div>
              </div>
            </ContentCard>

            {/* State Law Summary */}
            {stateLaw && (
              <ContentCard>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <BookOpen className="w-6 h-6 text-orange-400" />
                    <h3 className="text-xl font-semibold text-white">{stateLaw.title}</h3>
                  </div>
                  
                  <p className="text-gray-300">{stateLaw.summary}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-green-500 bg-opacity-20 rounded-lg p-4">
                      <h4 className="font-semibold text-green-400 mb-2">Your Rights</h4>
                      <ul className="space-y-1 text-sm text-green-300">
                        {stateLaw.rights.map((right, index) => (
                          <li key={index}>• {right}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="bg-red-500 bg-opacity-20 rounded-lg p-4">
                      <h4 className="font-semibold text-red-400 mb-2">Avoid These Actions</h4>
                      <ul className="space-y-1 text-sm text-red-300">
                        {stateLaw.prohibitedActions.map((action, index) => (
                          <li key={index}>• {action}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </ContentCard>
            )}

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <ContentCard>
                <div className="text-center space-y-2">
                  <TrendingUp className="w-8 h-8 text-orange-400 mx-auto" />
                  <div className="text-2xl font-bold text-white">1%</div>
                  <div className="text-sm text-gray-300">Encounter Rate</div>
                </div>
              </ContentCard>
              
              <ContentCard>
                <div className="text-center space-y-2">
                  <PieChart className="w-8 h-8 text-blue-400 mx-auto" />
                  <div className="text-2xl font-bold text-white">95%</div>
                  <div className="text-sm text-gray-300">Success Rate</div>
                </div>
              </ContentCard>
            </div>
          </div>
        )}

        {activeTab === 'scripts' && (
          <div className="space-y-6">
            {scriptsLoading ? (
              <div className="animate-pulse">
                <div className="glass-card p-6 rounded-lg">
                  <div className="h-6 bg-white bg-opacity-20 rounded w-1/2 mb-4"></div>
                  <div className="h-32 bg-white bg-opacity-20 rounded"></div>
                </div>
              </div>
            ) : (
              scriptList.map((script) => (
                <ScriptViewer key={script.scriptId} script={script} />
              ))
            )}
          </div>
        )}

        {activeTab === 'record' && (
          <div className="space-y-6">
            <ContentCard>
              <div className="text-center space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Audio Recording</h3>
                  <p className="text-gray-300">
                    Discreetly record interactions for your protection and documentation.
                  </p>
                </div>
                
                <RecordingButton />
                
                <div className="text-xs text-gray-400 max-w-sm mx-auto">
                  Recordings are stored locally on your device. Always check local laws regarding recording consent.
                </div>
              </div>
            </ContentCard>
          </div>
        )}

        {activeTab === 'alert' && (
          <div className="space-y-6">
            <AlertButton trustedContacts={user?.trustedContacts || []} />
            
            <ContentCard>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Users className="w-6 h-6 text-blue-400" />
                  <h3 className="text-xl font-semibold text-white">Trusted Contacts</h3>
                </div>
                
                {user?.trustedContacts.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-300 mb-4">No trusted contacts set up yet.</p>
                    <button className="btn-primary">
                      Add Trusted Contact
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {user?.trustedContacts.map((contact) => (
                      <div key={contact.id} className="bg-black bg-opacity-20 rounded-lg p-3 flex items-center justify-between">
                        <div>
                          <div className="text-white font-medium">{contact.name}</div>
                          <div className="text-gray-300 text-sm">{contact.phone}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </ContentCard>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="fixed bottom-20 left-4 right-4 max-w-screen-sm mx-auto">
          <div className="glass-card p-2 rounded-lg">
            <div className="grid grid-cols-4 gap-1">
              <button
                onClick={() => setActiveTab('overview')}
                className={`p-3 rounded-lg transition-colors duration-200 ${
                  activeTab === 'overview' 
                    ? 'bg-orange-500 text-white' 
                    : 'text-gray-300 hover:bg-white hover:bg-opacity-10'
                }`}
              >
                <Shield className="w-5 h-5 mx-auto mb-1" />
                <div className="text-xs">Overview</div>
              </button>
              
              <button
                onClick={() => setActiveTab('scripts')}
                className={`p-3 rounded-lg transition-colors duration-200 ${
                  activeTab === 'scripts' 
                    ? 'bg-orange-500 text-white' 
                    : 'text-gray-300 hover:bg-white hover:bg-opacity-10'
                }`}
              >
                <FileText className="w-5 h-5 mx-auto mb-1" />
                <div className="text-xs">Scripts</div>
              </button>
              
              <button
                onClick={() => setActiveTab('record')}
                className={`p-3 rounded-lg transition-colors duration-200 ${
                  activeTab === 'record' 
                    ? 'bg-orange-500 text-white' 
                    : 'text-gray-300 hover:bg-white hover:bg-opacity-10'
                }`}
              >
                <div className="w-5 h-5 mx-auto mb-1 bg-red-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div className="text-xs">Record</div>
              </button>
              
              <button
                onClick={() => setActiveTab('alert')}
                className={`p-3 rounded-lg transition-colors duration-200 ${
                  activeTab === 'alert' 
                    ? 'bg-orange-500 text-white' 
                    : 'text-gray-300 hover:bg-white hover:bg-opacity-10'
                }`}
              >
                <Users className="w-5 h-5 mx-auto mb-1" />
                <div className="text-xs">Alert</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
