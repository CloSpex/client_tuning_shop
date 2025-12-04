import React from "react";
import Navigation from "./Navigation";
import type { LayoutProps } from "./Layout.types";

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navigation />
      <main className="max-w-5xl mx-auto p-6">{children}</main>
      <footer className="fixed bottom-0 left-0 right-0 z-40 h-16 shadow-lg border-t border-gray-300 dark:border-gray-600">
        <div className="max-w-5xl mx-auto px-6 h-full flex items-center justify-center text-sm text-gray-700 dark:text-gray-300">
          {new Date().getFullYear()} TuningStore Klemensas Barauskas
        </div>
      </footer>
    </div>
  );
};

export default Layout;
