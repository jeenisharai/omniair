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
          ? 'bg-[#060b08]/85 backdrop-blur-xl border-b border-emerald-500/20 shadow-2xl shadow-black/60 py-3.5'
          : 'bg-[#060b08]/50 backdrop-blur-md border-b border-emerald-500/10 py-5'
      }`}
      style={{ position: 'fixed' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Logo */}
        <a
          href="#home"
          onClick={(e) => handleScrollTo(e, '#home')}
          className="flex items-center gap-3 group text-left cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-emerald-950/70 border border-emerald-500/30 flex items-center justify-center relative overflow-hidden group-hover:border-emerald-400 transition-colors">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-lichen-pulse"></span>
            <span className="absolute inset-0 bg-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></span>
          </div>
          <div>
            <div className="text-sm font-semibold tracking-wider text-slate-100 uppercase font-mono flex items-center gap-2">
              OmniAir
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/25 text-emerald-400 font-sans tracking-normal font-normal">
                Tsetlin Edge
              </span>
            </div>
            <div className="text-[11px] text-slate-400 tracking-tight hidden sm:block">
              Planetary Lichen Intelligence
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
                className={`relative px-3 py-1.5 rounded-md text-xs lg:text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'text-emerald-300 bg-emerald-950/40 border border-emerald-500/25 shadow-sm shadow-emerald-900/30'
                    : 'text-slate-300 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Action Button */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#impact"
            onClick={(e) => handleScrollTo(e, '#impact')}
            className="px-4 py-2 rounded-lg text-xs font-medium tracking-wide text-emerald-100 bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-500/30 hover:border-emerald-400 transition-all duration-200 shadow-md shadow-emerald-950/50 flex items-center gap-2 group cursor-pointer"
          >
            <Activity className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
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
            {mobileOpen ? <X className="w-5 h-5 text-emerald-400" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden mt-2 px-4 pt-3 pb-6 bg-[#060b08]/95 backdrop-blur-2xl border-b border-emerald-500/20 space-y-2 animate-in fade-in slide-in-from-top-3 duration-200">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleScrollTo(e, item.href)}
                className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-emerald-300 bg-emerald-950/50 border border-emerald-500/30'
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
              className="w-full py-2.5 px-4 rounded-lg text-sm font-medium text-center text-emerald-100 bg-emerald-900/70 border border-emerald-500/40 flex items-center justify-center gap-2"
            >
              <Activity className="w-4 h-4 text-emerald-400" />
              <span>Get Started</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

