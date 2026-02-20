import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Plane, Users, Radio } from 'lucide-react';

const roles = [
  {
    id: 'flight-deck',
    title: 'Flight Deck',
    description: 'Command the skies as a virtual pilot. Operate advanced aircraft and navigate complex routes.',
    image: '/assets/generated/flight-deck-role.dim_400x300.png',
    icon: Plane,
    externalForm: 'https://docs.google.com/forms/d/e/1FAIpQLSdHbu3uQxKbs4du8DKS17rvnxW_GS7byy3deho6Nr_XgMPMiw/viewform',
  },
  {
    id: 'cabin-crew',
    title: 'Cabin Crew',
    description: 'Deliver exceptional service to passengers. Ensure safety and comfort throughout the flight.',
    image: '/assets/generated/cabin-crew-role.dim_400x300.png',
    icon: Users,
    externalForm: null,
  },
  {
    id: 'atc',
    title: 'Air Traffic Control',
    description: 'Manage airspace and coordinate flight operations. Guide aircraft safely through their journey.',
    image: '/assets/generated/atc-role.dim_400x300.png',
    icon: Radio,
    externalForm: null,
  },
];

export default function Careers() {
  const navigate = useNavigate();

  const handleApply = (roleId: string, externalForm: string | null) => {
    if (externalForm) {
      window.open(externalForm, '_blank', 'noopener,noreferrer');
    } else {
      navigate({ to: '/apply', search: { role: roleId } });
    }
  };

  return (
    <div className="space-y-8">
      <div className="glass-light rounded-2xl p-8 text-center border border-white/20">
        <h2 className="text-4xl font-bold text-slate-900 mb-3">Join Our Crew</h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Become part of Air Canada Virtual's professional team. Choose your path and start your virtual aviation career today.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {roles.map((role) => {
          const Icon = role.icon;
          return (
            <div
              key={role.id}
              className="glass-light rounded-2xl overflow-hidden border border-white/20 hover:border-airCanadaRed/30 transition-all hover:shadow-xl group"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={role.image}
                  alt={role.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                <div className="absolute bottom-4 left-4 flex items-center gap-2">
                  <div className="bg-airCanadaRed rounded-lg p-2">
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">{role.title}</h3>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <p className="text-slate-600 text-sm leading-relaxed">{role.description}</p>

                <Button
                  onClick={() => handleApply(role.id, role.externalForm)}
                  className="w-full bg-airCanadaRed hover:bg-airCanadaRed/90 text-white font-semibold"
                >
                  Apply Now
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
