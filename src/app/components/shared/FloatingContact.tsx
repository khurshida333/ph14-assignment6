'use client';

import { useState, useEffect } from 'react';
import { Phone, X, Mail, Copy, Check } from 'lucide-react';

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [buttonBottom, setButtonBottom] = useState(24);

  // Dynamically adjust bottom position when reaching the footer so it stops right above it
  useEffect(() => {
    const handleScroll = () => {
      const footer = document.querySelector('footer');
      if (footer) {
        const footerRect = footer.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        // How much of the footer is visible from the bottom of the viewport
        const footerOverlap = windowHeight - footerRect.top;

        if (footerOverlap > 0) {
          // Push the button up by the overlap amount plus a 24px gap
          setButtonBottom(footerOverlap + 24);
        } else {
          setButtonBottom(24);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed left-6 z-50 flex flex-col items-start transition-all duration-75"
      style={{ bottom: `${buttonBottom}px` }}
    >
      {/* Pop-up Card (Opens towards the right so it stays on screen) */}
      {isOpen && (
        <div className="mb-3 w-72 bg-[#15171c] border border-white/10 rounded-2xl p-4 shadow-2xl animate-in fade-in slide-in-from-bottom-3 duration-200 text-left">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/10">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider">
              Contact Info
            </h4>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3 text-xs">
            {/* Email */}
            <div className="flex items-start gap-2.5">
              <Mail className="w-4 h-4 text-[#ccff00] mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-gray-400">Email</p>
                <a
                  href="mailto:akhurshida70@gmail.com"
                  className="text-white font-medium hover:text-[#ccff00] transition-colors break-all"
                >
                  akhurshida70@gmail.com
                </a>
              </div>
            </div>

            {/* Phone Number */}
            <div className="flex items-center justify-between">
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#ccff00] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-400">Phone</p>
                  <a
                    href="tel:+8801568973717"
                    className="text-white font-medium hover:text-[#ccff00] transition-colors"
                  >
                    +8801568973717
                  </a>
                </div>
              </div>
              <button
                onClick={() => copyToClipboard('+8801568973717')}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 transition-colors"
                title="Copy phone"
              >
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-[#ccff00]" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-black border border-white/20 rounded-full flex items-center justify-center text-white shadow-lg hover:border-[#ccff00] hover:scale-105 transition-all duration-300 group"
        title="Contact Us"
      >
        <Phone className="w-6 h-6 text-[#ccff00] group-hover:rotate-12 transition-transform" />
      </button>
    </div>
  );
}