import { useState, type FC, type MouseEvent } from 'react';
import { Menu, X, Activity } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  isScrolled: boolean;
}

export const Navbar: FC<NavbarProps> = ({ activeSection, isScrolled }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'Platform', href: '#platform', id: 'platform' },
    { label: 'Live Intelligence', href: '#live-intelligence', id: 'live-intelligence' },
    { label: 'Bio-Mesh', href: '#bio-mesh', id: 'bio-mesh' },
    { label: 'Explainability', href: '#explainability', id: 'explainability' },
    { label: 'Impact', href: '#impact', id: 'impact' },
  ];

  const handleScrollTo = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 pointer-events-auto ${
        isScrolled
          ? 'bg-[#050a0c]/90 backdrop-blur-xl border-b border-[#1fd4a4]/20 shadow-2xl shadow-black/70 py-3.5'
          : 'bg-[#050a0c]/50 backdrop-blur-md border-b border-[#1fd4a4]/10 py-5'
      }`}
      style={{ position: 'fixed' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand: Circular teal "OA" badge + OMNI AIR wordmark */}
        <a
          href="#home"
          onClick={(e) => handleScrollTo(e, '#home')}
          className="flex items-center gap-3 group text-left cursor-pointer"
        >
          <div className="w-8 h-8 rounded-full bg-[#071914] border border-[#1fd4a4]/40 flex items-center justify-center relative overflow-hidden group-hover:border-[#1fd4a4] transition-colors shadow-sm shadow-[#1fd4a4]/20">
            <span className="text-[11px] font-mono font-bold text-[#1fd4a4] tracking-tight">OA</span>
            <span className="absolute inset-0 bg-[#1fd4a4]/10 opacity-0 group-hover:opacity-100 transition-opacity"></span>
          </div>
          <div>
            <div className="text-sm font-bold tracking-wider uppercase font-sans flex items-center gap-1.5">
              <span className="text-white">OMNI</span>
              <span className="text-[#1fd4a4] text-teal-glow">AIR</span>
            </div>
            <div className="text-[10px] font-mono text-slate-400 tracking-wider uppercase hidden sm:block">
              Planetary Intelligence Network
            </div>
          </div>
        </a>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleScrollTo(e, item.href)}
                className={`relative px-3 py-1.5 rounded-lg text-xs lg:text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'text-[#1fd4a4] bg-[#071914]/60 border border-[#1fd4a4]/30 shadow-sm shadow-[#1fd4a4]/10'
                    : 'text-slate-300 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-gradient-to-r from-[#1fd4a4] to-[#8be9ff] rounded-full shadow-sm shadow-[#1fd4a4]" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Action Button: Dark green fill, teal border, subtle glow */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#impact"
            onClick={(e) => handleScrollTo(e, '#impact')}
            className="px-4 py-2 rounded-lg text-xs font-medium tracking-wide text-white bg-[#071914] hover:bg-[#0b241d] border border-[#1fd4a4]/40 hover:border-[#1fd4a4] transition-all duration-200 shadow-md shadow-[#1fd4a4]/15 flex items-center gap-2 group cursor-pointer"
          >
            <Activity className="w-3.5 h-3.5 text-[#1fd4a4] group-hover:scale-110 transition-transform" />
            <span>Get Started</span>
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="md:hidden flex items-center gap-2">
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-lg text-slate-300 hover:text-white bg-slate-900/60 border border-slate-800 focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileOpen ? <X className="w-5 h-5 text-[#1fd4a4]" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden mt-2 px-4 pt-3 pb-6 bg-[#050a0c]/98 backdrop-blur-2xl border-b border-[#1fd4a4]/20 space-y-2 animate-in fade-in slide-in-from-top-3 duration-200">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleScrollTo(e, item.href)}
                className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-[#1fd4a4] bg-[#071914]/80 border border-[#1fd4a4]/30'
                    : 'text-slate-300 hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                {item.label}
              </a>
            );
          })}
          <div className="pt-2">
            <a
              href="#impact"
              onClick={(e) => handleScrollTo(e, '#impact')}
              className="w-full py-2.5 px-4 rounded-lg text-sm font-medium text-center text-white bg-[#071914] border border-[#1fd4a4]/40 flex items-center justify-center gap-2"
            >
              <Activity className="w-4 h-4 text-[#1fd4a4]" />
              <span>Get Started</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
