import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, CheckCircle, Loader2 } from 'lucide-react';
import { useActor } from '../hooks/useActor';
import { toast } from 'sonner';

export default function ApplicationForm() {
  const navigate = useNavigate();
  const search = useSearch({ strict: false }) as { role?: string };
  const { actor } = useActor();
  const queryClient = useQueryClient();
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    applicantName: '',
    discordUsername: '',
    robloxUsername: '',
    experience: '',
    motivation: '',
    // Cabin Crew specific
    availability: '',
    languages: '',
    previousRoles: '',
    trainingReceived: '',
    customerServiceSkills: '',
    // ATC specific
    preferredPosition: '',
    understandingOfAtcProcedures: '',
  });

  const roleNames: Record<string, string> = {
    'flight-deck': 'Flight Deck',
    'cabin-crew': 'Cabin Crew',
    atc: 'Air Traffic Control',
  };

  const roleName = search.role ? roleNames[search.role] || 'Position' : 'Position';

  const submitApplicationMutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error('Actor not available');

      if (search.role === 'cabin-crew') {
        await actor.submitCabinCrewApplication(
          formData.applicantName,
          formData.discordUsername,
          formData.robloxUsername,
          formData.experience,
          formData.motivation,
          formData.availability,
          formData.languages,
          formData.previousRoles,
          formData.trainingReceived,
          formData.customerServiceSkills
        );
      } else if (search.role === 'atc') {
        await actor.submitAtcApplication(
          formData.applicantName,
          formData.discordUsername,
          formData.robloxUsername,
          formData.experience,
          formData.motivation,
          formData.preferredPosition,
          formData.availability,
          formData.understandingOfAtcProcedures,
          formData.previousRoles
        );
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['applications'] });
      setSubmitted(true);
      toast.success('Application submitted successfully!');
    },
    onError: (error) => {
      toast.error(`Application failed: ${error.message}`);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitApplicationMutation.mutate();
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="glass-light rounded-2xl p-12 text-center border border-white/20">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-slate-900 mb-3">Application Submitted!</h2>
          <p className="text-slate-600 mb-6">
            Thank you for your interest in joining Air Canada Virtual. Our recruitment team will review your application and contact you soon.
          </p>
          <Button
            onClick={() => navigate({ to: '/careers' })}
            className="bg-airCanadaRed hover:bg-airCanadaRed/90"
          >
            Back to Careers
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Button
        variant="ghost"
        onClick={() => navigate({ to: '/careers' })}
        className="text-white/80 hover:text-white"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Careers
      </Button>

      <div className="glass-light rounded-2xl p-8 border border-white/20">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Apply for {roleName}</h2>
        <p className="text-slate-600 mb-6">Fill out the form below to submit your application</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-800 border-b border-slate-200 pb-2">
              Basic Information
            </h3>

            <div className="space-y-2">
              <Label htmlFor="applicantName" className="text-slate-700">
                Full Name *
              </Label>
              <Input
                id="applicantName"
                required
                value={formData.applicantName}
                onChange={(e) => setFormData({ ...formData, applicantName: e.target.value })}
                className="bg-white/50 border-slate-300"
                placeholder="John Doe"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="discordUsername" className="text-slate-700">
                Discord Username *
              </Label>
              <Input
                id="discordUsername"
                required
                value={formData.discordUsername}
                onChange={(e) => setFormData({ ...formData, discordUsername: e.target.value })}
                className="bg-white/50 border-slate-300"
                placeholder="username#1234"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="robloxUsername" className="text-slate-700">
                Roblox Username *
              </Label>
              <Input
                id="robloxUsername"
                required
                value={formData.robloxUsername}
                onChange={(e) => setFormData({ ...formData, robloxUsername: e.target.value })}
                className="bg-white/50 border-slate-300"
                placeholder="RobloxUser123"
              />
            </div>
          </div>

          {/* Experience & Motivation */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-800 border-b border-slate-200 pb-2">
              Experience & Motivation
            </h3>

            <div className="space-y-2">
              <Label htmlFor="experience" className="text-slate-700">
                Relevant Experience *
              </Label>
              <Textarea
                id="experience"
                required
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                className="bg-white/50 border-slate-300 min-h-[100px]"
                placeholder="Describe your aviation experience..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="motivation" className="text-slate-700">
                Why do you want to join Air Canada Virtual? *
              </Label>
              <Textarea
                id="motivation"
                required
                value={formData.motivation}
                onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                className="bg-white/50 border-slate-300 min-h-[100px]"
                placeholder="Tell us about your motivation..."
              />
            </div>
          </div>

          {/* Role-Specific Fields */}
          {search.role === 'cabin-crew' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-800 border-b border-slate-200 pb-2">
                Cabin Crew Specific
              </h3>

              <div className="space-y-2">
                <Label htmlFor="availability" className="text-slate-700">
                  Availability *
                </Label>
                <Input
                  id="availability"
                  required
                  value={formData.availability}
                  onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                  className="bg-white/50 border-slate-300"
                  placeholder="e.g., Weekdays 6PM-10PM EST"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="languages" className="text-slate-700">
                  Languages Spoken *
                </Label>
                <Input
                  id="languages"
                  required
                  value={formData.languages}
                  onChange={(e) => setFormData({ ...formData, languages: e.target.value })}
                  className="bg-white/50 border-slate-300"
                  placeholder="e.g., English, French, Spanish"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="previousRoles" className="text-slate-700">
                  Previous Virtual Airline Roles *
                </Label>
                <Textarea
                  id="previousRoles"
                  required
                  value={formData.previousRoles}
                  onChange={(e) => setFormData({ ...formData, previousRoles: e.target.value })}
                  className="bg-white/50 border-slate-300 min-h-[80px]"
                  placeholder="List any previous roles in virtual airlines..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="trainingReceived" className="text-slate-700">
                  Training & Certifications *
                </Label>
                <Textarea
                  id="trainingReceived"
                  required
                  value={formData.trainingReceived}
                  onChange={(e) => setFormData({ ...formData, trainingReceived: e.target.value })}
                  className="bg-white/50 border-slate-300 min-h-[80px]"
                  placeholder="Describe any relevant training or certifications..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="customerServiceSkills" className="text-slate-700">
                  Customer Service Skills *
                </Label>
                <Textarea
                  id="customerServiceSkills"
                  required
                  value={formData.customerServiceSkills}
                  onChange={(e) =>
                    setFormData({ ...formData, customerServiceSkills: e.target.value })
                  }
                  className="bg-white/50 border-slate-300 min-h-[80px]"
                  placeholder="Describe your customer service experience and skills..."
                />
              </div>
            </div>
          )}

          {search.role === 'atc' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-800 border-b border-slate-200 pb-2">
                Air Traffic Control Specific
              </h3>

              <div className="space-y-2">
                <Label htmlFor="preferredPosition" className="text-slate-700">
                  Preferred ATC Position *
                </Label>
                <Input
                  id="preferredPosition"
                  required
                  value={formData.preferredPosition}
                  onChange={(e) => setFormData({ ...formData, preferredPosition: e.target.value })}
                  className="bg-white/50 border-slate-300"
                  placeholder="e.g., Tower, Ground, Approach, Center"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="availability" className="text-slate-700">
                  Availability *
                </Label>
                <Input
                  id="availability"
                  required
                  value={formData.availability}
                  onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                  className="bg-white/50 border-slate-300"
                  placeholder="e.g., Weekdays 6PM-10PM EST"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="understandingOfAtcProcedures" className="text-slate-700">
                  Understanding of ATC Procedures *
                </Label>
                <Textarea
                  id="understandingOfAtcProcedures"
                  required
                  value={formData.understandingOfAtcProcedures}
                  onChange={(e) =>
                    setFormData({ ...formData, understandingOfAtcProcedures: e.target.value })
                  }
                  className="bg-white/50 border-slate-300 min-h-[100px]"
                  placeholder="Describe your knowledge of ATC procedures and phraseology..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="previousRoles" className="text-slate-700">
                  Previous ATC Experience *
                </Label>
                <Textarea
                  id="previousRoles"
                  required
                  value={formData.previousRoles}
                  onChange={(e) => setFormData({ ...formData, previousRoles: e.target.value })}
                  className="bg-white/50 border-slate-300 min-h-[80px]"
                  placeholder="List any previous ATC roles or training..."
                />
              </div>
            </div>
          )}

          <Button
            type="submit"
            disabled={submitApplicationMutation.isPending}
            className="w-full bg-airCanadaRed hover:bg-airCanadaRed/90 text-white font-semibold"
          >
            {submitApplicationMutation.isPending ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              'Submit Application'
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
