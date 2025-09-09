
import React, { useState, useCallback } from 'react';
import { SeoStrategyFormData } from './types';
import { generateSeoStrategy } from './services/geminiService';
import InputForm from './components/InputForm';
import ReportDisplay from './components/ReportDisplay';
import Loader from './components/Loader';
import { HeaderIcon } from './components/icons/HeaderIcon';

const App: React.FC = () => {
  const [formData, setFormData] = useState<SeoStrategyFormData>({
    companyName: '',
    websiteUrl: '',
    industry: '',
    targetMarkets: '',
    productsServices: '',
    currentSeoPerformance: '',
    businessGoals: '',
    targetAudience: '',
    competitors: '',
    contentStrategy: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [seoReport, setSeoReport] = useState<string | null>(null);

  const handleFormChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSeoReport(null);

    try {
      const report = await generateSeoStrategy(formData);
      setSeoReport(report);
    } catch (err) {
      setError(err instanceof Error ? `Failed to generate strategy: ${err.message}` : 'An unknown error occurred.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      companyName: '',
      websiteUrl: '',
      industry: '',
      targetMarkets: '',
      productsServices: '',
      currentSeoPerformance: '',
      businessGoals: '',
      targetAudience: '',
      competitors: '',
      contentStrategy: '',
    });
    setSeoReport(null);
    setError(null);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen font-sans text-gray-800 dark:text-gray-200">
      <header className="bg-white dark:bg-gray-800 shadow-md p-4 sticky top-0 z-10">
        <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-3">
                <HeaderIcon />
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">SEO Strategy Generator</h1>
            </div>
            {seoReport && (
                <button
                    onClick={handleReset}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                >
                    Start New Strategy
                </button>
            )}
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-8">
        {!seoReport && !isLoading && (
          <InputForm
            formData={formData}
            onFormChange={handleFormChange}
            onSubmit={handleSubmit}
          />
        )}
        
        {isLoading && <Loader />}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative max-w-4xl mx-auto" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        
        {seoReport && <ReportDisplay report={seoReport} />}
      </main>
    </div>
  );
};

export default App;
