
import React from 'react';

interface ReportDisplayProps {
  report: string;
}

const parseMarkdown = (text: string) => {
    const lines = text.split('\n');
    const elements: React.ReactNode[] = [];
    let inTable = false;
    let tableHeaders: string[] = [];
    let tableRows: string[][] = [];

    const renderTable = () => {
        if (tableHeaders.length > 0 && tableRows.length > 0) {
            elements.push(
                <div key={`table-${elements.length}`} className="overflow-x-auto my-4">
                    <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg">
                        <thead className="bg-gray-100 dark:bg-gray-700">
                            <tr>
                                {tableHeaders.map((header, index) => (
                                    <th key={index} className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{header.trim()}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                            {tableRows.map((row, rowIndex) => (
                                <tr key={rowIndex} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                    {row.map((cell, cellIndex) => (
                                        <td key={cellIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{cell.trim()}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );
        }
        tableHeaders = [];
        tableRows = [];
        inTable = false;
    };

    lines.forEach((line, index) => {
        line = line.trim();

        if (line.startsWith('|') && line.endsWith('|')) {
            if (!inTable) {
                inTable = true;
                tableHeaders = line.split('|').slice(1, -1).map(h => h.trim());
            } else if (!line.includes('---')) {
                 tableRows.push(line.split('|').slice(1, -1).map(c => c.trim()));
            }
            return;
        } 
        
        if (inTable) {
            renderTable();
        }

        if (line.startsWith('# ')) {
            elements.push(<h1 key={index} className="text-3xl font-bold mt-6 mb-4 text-gray-900 dark:text-white pb-2 border-b-2 border-indigo-500">{line.substring(2)}</h1>);
        } else if (line.startsWith('## ')) {
            elements.push(<h2 key={index} className="text-2xl font-semibold mt-6 mb-3 text-gray-900 dark:text-white">{line.substring(3)}</h2>);
        } else if (line.startsWith('### ')) {
            elements.push(<h3 key={index} className="text-xl font-semibold mt-5 mb-2 text-gray-800 dark:text-gray-100">{line.substring(4)}</h3>);
        } else if (line.startsWith('- ') || line.startsWith('* ')) {
            const content = line.substring(2).replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900 dark:text-white">$1</strong>');
            elements.push(<li key={index} className="ml-5 list-disc" dangerouslySetInnerHTML={{ __html: content }} />);
        } else if (line.match(/^\d+\.\s/)) {
            const content = line.replace(/^\d+\.\s/, '').replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900 dark:text-white">$1</strong>');
             elements.push(<li key={index} className="ml-5 list-decimal" dangerouslySetInnerHTML={{ __html: content }} />);
        } else if (line) {
            const content = line.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900 dark:text-white">$1</strong>');
            elements.push(<p key={index} className="my-2" dangerouslySetInnerHTML={{ __html: content }} />);
        }
    });
    
    if (inTable) {
        renderTable();
    }

    return elements;
};


const ReportDisplay: React.FC<ReportDisplayProps> = ({ report }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-lg shadow-lg prose-lg max-w-4xl mx-auto text-gray-700 dark:text-gray-300">
      {parseMarkdown(report)}
    </div>
  );
};

export default ReportDisplay;
