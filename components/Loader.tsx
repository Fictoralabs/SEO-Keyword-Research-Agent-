
import React from 'react';

const Loader: React.FC = () => {
    const messages = [
        "Analyzing competitors...",
        "Researching keywords...",
        "Assessing search intent...",
        "Building topic clusters...",
        "Crafting content roadmap...",
        "Finalizing technical recommendations..."
    ];

    const [message, setMessage] = React.useState(messages[0]);

    React.useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            index = (index + 1) % messages.length;
            setMessage(messages[index]);
        }, 3000);

        return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-indigo-500"></div>
      <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">Generating Your Strategy...</h2>
      <p className="text-gray-500 dark:text-gray-400">{message}</p>
    </div>
  );
};

export default Loader;
