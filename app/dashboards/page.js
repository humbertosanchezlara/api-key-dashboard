'use client';
import Link from 'next/link';
import CreateKeyModal from '../components/CreateKeyModal';
import DeleteConfirmModal from '../components/DeleteConfirmModal';
import EditKeyModal from '../components/EditKeyModal';
import Toast from '../components/Toast';
import Sidebar from '../components/Sidebar';
import { useApiKeys } from '../hooks/useApiKeys';
import { useVisibilityState } from '../hooks/useVisibilityState';
import { 
  Eye, 
  EyeOff, 
  Copy, 
  Pencil, 
  Trash2,
  Menu
} from 'lucide-react';

export default function Dashboard() {
  const {
    apiKeys,
    isLoading,
    error,
    toast,
    createApiKey,
    updateApiKey,
    deleteApiKey,
    showToast
  } = useApiKeys();

  const {
    visibleKeys,
    isCreateModalOpen,
    deleteKey,
    editKey,
    isSidebarOpen,
    setIsCreateModalOpen,
    setDeleteKey,
    setEditKey,
    setIsSidebarOpen,
    toggleKeyVisibility,
    formatKey
  } = useVisibilityState();

  const handleCopyToClipboard = async (apiKey) => {
    try {
      await navigator.clipboard.writeText(apiKey.key);
      showToast('API key copied to clipboard!', 'success');
    } catch (err) {
      console.error('Failed to copy text: ', err);
      showToast('Failed to copy API key', 'error');
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteKey) return;
    const success = await deleteApiKey(deleteKey.id);
    if (success) {
      setDeleteKey(null);
    }
  };

  const handleEditSubmit = async (updatedKey) => {
    const success = await updateApiKey(updatedKey.id, updatedKey.name);
    if (success) {
      setEditKey(null);
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className={`fixed md:relative transition-all duration-300 z-20 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:-translate-x-64'
      }`}>
        <Sidebar />
      </div>

      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className={`fixed md:absolute top-4 transition-all duration-300 p-2 rounded-md hover:bg-gray-100 z-30 ${
          isSidebarOpen 
            ? 'left-4 md:left-[272px]'
            : 'left-4'
        }`}
        aria-label="Toggle sidebar"
      >
        <Menu className="h-5 w-5 text-gray-600" />
      </button>

      <div className="flex-1 min-h-screen">
        <div className="h-16" />
        <div className="px-8 pb-8">
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="flex items-center text-sm">
              <Link href="/" className="text-gray-500 hover:text-gray-900">Pages</Link>
              <span className="mx-2 text-gray-500">/</span>
              <span>Overview</span>
            </div>

            <h1 className="text-2xl font-bold">Overview</h1>

            <div className="rounded-lg overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 via-purple-400 to-pink-300 p-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-4">
                    <div className="text-white">
                      <div className="text-sm mb-1">CURRENT PLAN</div>
                      <div className="text-2xl font-semibold">Researcher</div>
                    </div>
                    
                    <div className="text-white/90">
                      <div className="text-sm mb-1">API Limit</div>
                      <div className="w-full bg-white/20 rounded-full h-2">
                        <div className="bg-white rounded-full h-2 w-[10%]"></div>
                      </div>
                      <div className="text-sm mt-1">24/1,000 Requests</div>
                    </div>
                  </div>

                  <button className="bg-white/10 text-white px-4 py-2 rounded-md text-sm hover:bg-white/20">
                    Manage Plan
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold">API Keys</h2>
                  <button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="text-sm flex items-center gap-2 text-gray-700 hover:text-gray-900"
                  >
                    <span>+</span> New Key
                  </button>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  The key is used to authenticate your requests to the Research API. To learn more, see the documentation page.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 text-xs uppercase">
                    <tr>
                      <th className="px-6 py-3 text-left text-gray-500">Name</th>
                      <th className="px-6 py-3 text-left text-gray-500">Usage</th>
                      <th className="px-6 py-3 text-left text-gray-500">Key</th>
                      <th className="px-6 py-3 text-right text-gray-500">Options</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {apiKeys.map((apiKey) => (
                      <tr key={apiKey.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm">{apiKey.name}</td>
                        <td className="px-6 py-4 text-sm">{apiKey.usage}</td>
                        <td className="px-6 py-4 text-sm font-mono">
                          {formatKey(apiKey.key, visibleKeys.has(apiKey.id))}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex justify-end gap-2">
                            <button 
                              onClick={() => toggleKeyVisibility(apiKey.id)}
                              className={`p-1 ${
                                visibleKeys.has(apiKey.id) 
                                  ? 'text-blue-600 hover:text-blue-800' 
                                  : 'text-gray-400 hover:text-gray-600'
                              }`}
                              title={visibleKeys.has(apiKey.id) ? "Hide API key" : "Show API key"}
                            >
                              {visibleKeys.has(apiKey.id) ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </button>
                            <button 
                              onClick={() => handleCopyToClipboard(apiKey)}
                              className="p-1 text-gray-400 hover:text-gray-600" 
                              title="Copy to clipboard"
                            >
                              <Copy className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={() => setEditKey(apiKey)}
                              className="p-1 text-gray-400 hover:text-gray-600" 
                              title="Edit key"
                            >
                              <Pencil className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={() => setDeleteKey(apiKey)}
                              className="p-1 text-gray-400 hover:text-red-600" 
                              title="Delete key"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <CreateKeyModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={createApiKey}
        />

        <DeleteConfirmModal
          isOpen={deleteKey !== null}
          onClose={() => setDeleteKey(null)}
          onConfirm={handleDeleteConfirm}
          keyName={deleteKey?.name}
        />

        <EditKeyModal
          isOpen={editKey !== null}
          onClose={() => setEditKey(null)}
          onSubmit={handleEditSubmit}
          apiKey={editKey}
        />

        {toast && (
          <Toast 
            message={toast.message} 
            type={toast.type}
            onClose={() => setToast(null)} 
          />
        )}
      </div>
    </div>
  );
} 