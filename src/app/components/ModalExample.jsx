'use client';

import { useState } from 'react';
import Modal from './Modal';

const ModalExample = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSize, setModalSize] = useState('medium');

  const openModal = (size) => {
    setModalSize(size);
    setIsModalOpen(true);
  };

  return (
    <div className="p-4">
      <div className="flex flex-wrap gap-4 mb-8">
        <button
          onClick={() => openModal('small')}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
        >
          Open Small Modal
        </button>
        
        <button
          onClick={() => openModal('medium')}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
        >
          Open Medium Modal
        </button>
        
        <button
          onClick={() => openModal('large')}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
        >
          Open Large Modal
        </button>
        
        <button
          onClick={() => openModal('fullWidth')}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
        >
          Open Full Width Modal
        </button>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title={`${modalSize.charAt(0).toUpperCase() + modalSize.slice(1)} Modal Example`}
        size={modalSize}
      >
        <div className="space-y-4">
          <p>
            This is an example modal with {modalSize} size. The modal component supports:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Responsive design for all device sizes</li>
            <li>Dark/light mode support</li>
            <li>Close on outside click</li>
            <li>Close on ESC key press</li>
            <li>Multiple size options</li>
            <li>Customizable content</li>
          </ul>
          
          <div className="pt-4 flex justify-end space-x-3">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Confirm
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ModalExample;