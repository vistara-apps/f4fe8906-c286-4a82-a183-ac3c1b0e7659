'use client';

import { useState } from 'react';
import { TrustedContact } from '@/lib/types';
import { ContentCard } from './ContentCard';
import { 
  Users, 
  Plus, 
  Trash2, 
  Phone, 
  Mail, 
  X,
  Check
} from 'lucide-react';

interface TrustedContactsManagerProps {
  contacts: TrustedContact[];
  onAddContact: (contact: Omit<TrustedContact, 'id'>) => Promise<void>;
  onRemoveContact: (contactId: string) => Promise<void>;
  loading?: boolean;
}

export function TrustedContactsManager({ 
  contacts, 
  onAddContact, 
  onRemoveContact, 
  loading = false 
}: TrustedContactsManagerProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s\-\(\)]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    try {
      await onAddContact({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim() || undefined
      });
      
      // Reset form
      setFormData({ name: '', phone: '', email: '' });
      setShowAddForm(false);
      setErrors({});
    } catch (error) {
      console.error('Failed to add contact:', error);
      setErrors({ submit: 'Failed to add contact. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRemove = async (contactId: string) => {
    if (confirm('Are you sure you want to remove this trusted contact?')) {
      try {
        await onRemoveContact(contactId);
      } catch (error) {
        console.error('Failed to remove contact:', error);
        alert('Failed to remove contact. Please try again.');
      }
    }
  };

  const formatPhoneNumber = (phone: string) => {
    // Simple phone number formatting
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    }
    return phone;
  };

  return (
    <ContentCard>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Users className="w-6 h-6 text-blue-400" />
            <h3 className="text-xl font-semibold text-white">Trusted Contacts</h3>
          </div>
          
          {!showAddForm && (
            <button
              onClick={() => setShowAddForm(true)}
              className="btn-primary flex items-center space-x-2"
              disabled={loading}
            >
              <Plus className="w-4 h-4" />
              <span>Add Contact</span>
            </button>
          )}
        </div>

        {/* Add Contact Form */}
        {showAddForm && (
          <div className="bg-black bg-opacity-20 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-medium text-white">Add Trusted Contact</h4>
              <button
                onClick={() => {
                  setShowAddForm(false);
                  setFormData({ name: '', phone: '', email: '' });
                  setErrors({});
                }}
                className="p-1 hover:bg-white hover:bg-opacity-10 rounded"
              >
                <X className="w-4 h-4 text-gray-300" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Enter contact name"
                  disabled={isSubmitting}
                />
                {errors.name && (
                  <p className="text-red-400 text-sm mt-1">{errors.name}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="(555) 123-4567"
                  disabled={isSubmitting}
                />
                {errors.phone && (
                  <p className="text-red-400 text-sm mt-1">{errors.phone}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Email (Optional)
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="contact@example.com"
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                )}
              </div>
              
              {errors.submit && (
                <p className="text-red-400 text-sm">{errors.submit}</p>
              )}
              
              <div className="flex items-center space-x-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary flex items-center space-x-2 disabled:opacity-50"
                >
                  <Check className="w-4 h-4" />
                  <span>{isSubmitting ? 'Adding...' : 'Add Contact'}</span>
                </button>
                
                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false);
                    setFormData({ name: '', phone: '', email: '' });
                    setErrors({});
                  }}
                  className="btn-secondary"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Contacts List */}
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse bg-black bg-opacity-20 rounded-lg p-4">
                <div className="h-4 bg-white bg-opacity-20 rounded w-1/3 mb-2"></div>
                <div className="h-3 bg-white bg-opacity-20 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : contacts.length === 0 ? (
          <div className="text-center py-8">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-300 mb-4">No trusted contacts added yet.</p>
            <p className="text-gray-400 text-sm">
              Add trusted contacts to receive emergency alerts when you need help.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                className="bg-black bg-opacity-20 rounded-lg p-4 flex items-center justify-between"
              >
                <div className="flex-1">
                  <div className="text-white font-medium mb-1">{contact.name}</div>
                  <div className="flex items-center space-x-4 text-sm text-gray-300">
                    <div className="flex items-center space-x-1">
                      <Phone className="w-3 h-3" />
                      <span>{formatPhoneNumber(contact.phone)}</span>
                    </div>
                    {contact.email && (
                      <div className="flex items-center space-x-1">
                        <Mail className="w-3 h-3" />
                        <span>{contact.email}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <button
                  onClick={() => handleRemove(contact.id)}
                  className="p-2 hover:bg-red-500 hover:bg-opacity-20 rounded-lg transition-colors duration-200 text-red-400 hover:text-red-300"
                  title="Remove contact"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        {contacts.length > 0 && (
          <div className="text-xs text-gray-400 text-center">
            These contacts will receive emergency alerts when you use the alert feature.
          </div>
        )}
      </div>
    </ContentCard>
  );
}
