import { useState, useEffect } from 'react';
import { apiKeyService } from '../services/apiKeyService';

export function useApiKeys() {
  const [apiKeys, setApiKeys] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    fetchApiKeys();
  }, []);

  const fetchApiKeys = async () => {
    try {
      const data = await apiKeyService.fetchApiKeys();
      setApiKeys(data);
    } catch (err) {
      setError('Failed to fetch API keys');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const createApiKey = async (formData) => {
    try {
      const newKey = await apiKeyService.createApiKey(formData.name);
      setApiKeys([newKey, ...apiKeys]);
      showToast('API key created successfully!', 'success');
      return true;
    } catch (err) {
      showToast('Failed to create API key', 'error');
      console.error('Error:', err);
      return false;
    }
  };

  const updateApiKey = async (id, name) => {
    try {
      await apiKeyService.updateApiKey(id, name);
      setApiKeys(apiKeys.map(key => 
        key.id === id ? { ...key, name } : key
      ));
      showToast('API key updated successfully', 'success');
      return true;
    } catch (err) {
      showToast('Failed to update API key', 'error');
      console.error('Error:', err);
      return false;
    }
  };

  const deleteApiKey = async (id) => {
    try {
      await apiKeyService.deleteApiKey(id);
      setApiKeys(apiKeys.filter(key => key.id !== id));
      showToast('API key deleted successfully', 'error');
      return true;
    } catch (err) {
      showToast('Failed to delete API key', 'error');
      console.error('Error:', err);
      return false;
    }
  };

  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  return {
    apiKeys,
    isLoading,
    error,
    toast,
    createApiKey,
    updateApiKey,
    deleteApiKey,
    showToast
  };
} 