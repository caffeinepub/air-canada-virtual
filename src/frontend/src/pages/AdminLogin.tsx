import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useActor } from '../hooks/useActor';
import { Lock, AlertCircle } from 'lucide-react';

export default function AdminLogin() {
  const { actor } = useActor();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (!actor) {
        setError('System not initialized. Please refresh the page.');
        setIsLoading(false);
        return;
      }

      await actor.authenticate(password);
      console.log('Access Granted: Terminal 415 Active');
      navigate({ to: '/admin-ops/dashboard' });
    } catch (err) {
      setError('Invalid Credentials. Security notified.');
      setPassword('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="glass-light rounded-2xl p-8 border border-white/20">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-airCanadaRed/10 rounded-full mb-4">
              <Lock className="h-8 w-8 text-airCanadaRed" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Staff Access</h2>
            <p className="text-slate-600 text-sm mt-2">Enter your credentials to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-700">
                Access Code
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white/50 border-slate-300"
                placeholder="Enter access code"
                autoComplete="off"
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                <p className="text-sm text-red-600 font-medium">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading || !password}
              className="w-full bg-airCanadaRed hover:bg-airCanadaRed/90 text-white font-semibold"
            >
              {isLoading ? 'Verifying...' : 'Access Terminal'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
