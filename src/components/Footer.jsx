import { Code2, Mail } from "lucide-react";
import React from "react";

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-[#18181b] dark:to-[#1c1c20] border-t border-yellow-200/50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Brand and Tagline */}
          <div className="flex flex-col items-center md:items-start space-y-2">
            <div className="flex items-center space-x-2">
              <Code2 className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-600 to-amber-600 dark:from-yellow-400 dark:to-amber-400">
                CodERA
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 italic">
              Transforming ideas into digital reality
            </p>
          </div>

          {/* Contact and Links */}
          <div className="flex flex-col items-center gap-6">
            {/* GitHub */}
            <a
              href="https://github.com/N4M154/Design_Project-I-SWE-4506"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center space-x-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-yellow-200 dark:hover:bg-yellow-900 transition-all duration-300"
            >
              
            </a>

            {/* Contact Section */}
            <div className="flex flex-col items-center gap-4">
              <span className="font-medium text-gray-700 dark:text-gray-300 text-sm uppercase tracking-wider">
                Connect with our team
              </span>
              <div className="flex flex-wrap justify-center gap-4">
                {/* Faiza's Email */}
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=namisa.najah.raisa@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800 transition-colors duration-300"
                >
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">Faiza Maliat</span>
                </a>

                {/* Namisa's Email */}
                <a
                  href="mailto:namisa.najah.raisa@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800 transition-colors duration-300"
                >
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">Namisa Najah</span>
                </a>

                 {/* Ishmaam's Email */}
                 <a
                  href="mailto:Ishmaam@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800 transition-colors duration-300"
                >
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">Ishmaam Iftekhar Khan</span>
                </a>

                 {/* Tuli's Email */}
                 <a
                  href="mailto:Tuli@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800 transition-colors duration-300"
                >
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">Nusrat Siddique</span>
                </a>


              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} CodERA. All rights reserved. Building tomorrow's solutions today.
        </div>
      </div>
    </footer>
  );
}