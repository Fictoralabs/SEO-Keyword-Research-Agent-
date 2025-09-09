
import React from 'react';
import type { SeoStrategyFormData } from '../types';
import { BusinessIcon } from './icons/BusinessIcon';
import { SeoIcon } from './icons/SeoIcon';

interface InputFormProps {
  formData: SeoStrategyFormData;
  onFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const FormSection: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
            {icon}
            <span className="ml-3">{title}</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {children}
        </div>
    </div>
);

const FormField: React.FC<{ name: keyof SeoStrategyFormData; label: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void; placeholder?: string; type?: 'input' | 'textarea'; required?: boolean, className?: string }> = ({ name, label, value, onChange, placeholder, type = 'input', required = true, className = '' }) => (
    <div className={className}>
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {label}
        </label>
        {type === 'textarea' ? (
            <textarea
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                rows={4}
                className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 dark:text-gray-100"
            />
        ) : (
            <input
                type="text"
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 dark:text-gray-100"
            />
        )}
    </div>
);

const InputForm: React.FC<InputFormProps> = ({ formData, onFormChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="max-w-4xl mx-auto">
        <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
            Provide the details below to generate a comprehensive SEO Keyword Strategy. The more detailed your input, the better the AI-generated strategy will be.
        </p>
      <FormSection title="Business Information" icon={<BusinessIcon />}>
        <FormField name="companyName" label="Company Name" value={formData.companyName} onChange={onFormChange} placeholder="e.g., Artisan Coffee Roasters" />
        <FormField name="websiteUrl" label="Website URL" value={formData.websiteUrl} onChange={onFormChange} placeholder="e.g., https://www.artisancoffee.com" />
        <FormField name="industry" label="Industry & Focus" value={formData.industry} onChange={onFormChange} placeholder="e.g., Specialty coffee, e-commerce" className="md:col-span-2" />
        <FormField name="targetMarkets" label="Target Geographic Markets" value={formData.targetMarkets} onChange={onFormChange} placeholder="e.g., USA, Canada, UK" />
        <FormField name="productsServices" label="Primary Products/Services" value={formData.productsServices} onChange={onFormChange} placeholder="e.g., Single-origin coffee beans, subscriptions" />
        <FormField name="businessGoals" label="Main Business Goals" value={formData.businessGoals} onChange={onFormChange} placeholder="e.g., Increase online sales by 20%" type="textarea" className="md:col-span-2" />
        <FormField name="targetAudience" label="Target Audience / Personas" value={formData.targetAudience} onChange={onFormChange} placeholder="e.g., Coffee connoisseurs, home baristas" type="textarea" className="md:col-span-2" />
      </FormSection>

      <FormSection title="Current SEO Status" icon={<SeoIcon />}>
        <FormField name="currentSeoPerformance" label="Current SEO Performance" value={formData.currentSeoPerformance} onChange={onFormChange} placeholder="e.g., Ranking for some brand terms, low non-brand traffic" type="textarea" className="md:col-span-2" />
        <FormField name="competitors" label="Competitor Websites" value={formData.competitors} onChange={onFormChange} placeholder="e.g., bluebottlecoffee.com, intelligentsia.com" type="textarea" className="md:col-span-2" />
        <FormField name="contentStrategy" label="Current Content Strategy" value={formData.contentStrategy} onChange={onFormChange} placeholder="e.g., Weekly blog posts about brewing methods" type="textarea" className="md:col-span-2" />
      </FormSection>

      <div className="text-center">
        <button type="submit" className="w-full md:w-auto px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 ease-in-out">
          Generate SEO Strategy
        </button>
      </div>
    </form>
  );
};

export default InputForm;
