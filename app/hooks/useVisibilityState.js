import { useState } from 'react';

export function useVisibilityState() {
  const [visibleKeys, setVisibleKeys] = useState(new Set());
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [deleteKey, setDeleteKey] = useState(null);
  const [editKey, setEditKey] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleKeyVisibility = (id) => {
    setVisibleKeys(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const formatKey = (key, isVisible) => {
    return isVisible ? key : key.slice(0, 5) + '********************************';
  };

  return {
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
  };
} 