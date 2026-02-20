import { Link, useNavigate } from '@tanstack/react-router';
import FlightStatusTicker from './FlightStatusTicker';
import FlightStatusIndicator from './FlightStatusIndicator';

export default function Layout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header with glassmorphism */}
      <header className="sticky top-0 z-50 glass-dark border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 group">
              <img
                src="/assets/download.png"
                alt="Air Canada"
                className="h-12 w-12 transition-transform group-hover:scale-110"
              />
              <div>
                <h1 className="text-xl font-bold text-white tracking-tight">Air Canada</h1>
                <p className="text-xs text-blue-200/70">Virtual Airline Operations</p>
              </div>
            </Link>

            <nav className="flex items-center gap-6">
              <Link
                to="/departures"
                className="text-sm font-medium text-white/80 hover:text-white transition-colors"
              >
                Departures
              </Link>
              <Link
                to="/careers"
                className="text-sm font-medium text-white/80 hover:text-white transition-colors"
              >
                Careers
              </Link>
              <FlightStatusIndicator />
            </nav>
          </div>
        </div>
      </header>

      {/* Flight Status Ticker */}
      <FlightStatusTicker />

      {/* Hero Section - Redesigned with "Where can we take you?" */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/40 to-slate-900 z-10" />
        <img
          src="/assets/image.png"
          alt="Air Canada Virtual Fleet"
          className="w-full h-[500px] object-cover"
        />
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="text-center space-y-6 px-4">
            <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tight drop-shadow-2xl">
              Where can we take you?
            </h2>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto drop-shadow-lg">
              Experience professional virtual aviation with Air Canada Virtual
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">{children}</main>

      {/* Footer */}
      <footer className="glass-dark border-t border-white/10 mt-auto">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-white/60">
              © {new Date().getFullYear()} Air Canada Virtual. Built with love using{' '}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                  window.location.hostname
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-airCanadaRed hover:text-airCanadaRed/80 transition-colors"
              >
                caffeine.ai
              </a>
            </p>
            <button
              onClick={() => navigate({ to: '/admin-ops' })}
              className="text-xs text-white/30 hover:text-white/50 transition-colors"
            >
              Staff Login
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
