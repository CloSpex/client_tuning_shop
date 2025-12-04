import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { FaqService } from "../services/faqService";
import type { FAQ as FAQType } from "../types/faq.types";

interface FAQItemProps {
  faq: FAQType;
}

const FAQItem: React.FC<FAQItemProps> = ({ faq }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 dark:border-gray-700">
      <button
        className="w-full py-4 px-6 text-left flex justify-between items-center transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-semibold text-gray-900 dark:text-white">
          {faq.question || "No question provided"}
        </span>
        <span className="text-gray-600 dark:text-gray-400">
          {isOpen ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </span>
      </button>

      {isOpen && (
        <div className="px-6 pb-4 pt-2 text-gray-700 dark:text-gray-300">
          <p>{faq.answer || "Answer pending..."}</p>
        </div>
      )}
    </div>
  );
};

const FAQ: React.FC = () => {
  const [faqs, setFaqs] = useState<FAQType[]>([]);
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    setLoading(true);
    setError(null);
    const result = await FaqService.getAllFaqs();

    if (result.success) {
      setFaqs(result.data);
    } else {
      setError(
        result.message ?? "An unknown error occurred while fetching FAQs."
      );
    }
    setLoading(false);
  };

  if (loading && faqs.length === 0) {
    return (
      <div className="p-8 text-center dark:text-gray-300">Loading FAQs...</div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4 dark:text-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white text-center">
        Frequently Asked Questions
      </h1>

      {error && (
        <div className="p-4 mb-4 text-red-700 bg-red-100 border border-red-200 rounded text-center">
          Error loading FAQs: {error}
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl">
        {faqs.length > 0 ? (
          faqs.map((faq) => <FAQItem key={faq.id} faq={faq} />)
        ) : (
          <div className="p-6 text-center text-gray-500 dark:text-gray-400">
            No frequently asked questions are available at this time.
          </div>
        )}
      </div>
    </div>
  );
};

export default FAQ;
