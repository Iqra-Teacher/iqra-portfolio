import React, { useState, useEffect } from 'react';
import { Star, MessageSquareQuote, Send, CheckCircle, ShieldCheck } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Testimonial } from '../types';
import { getApprovedTestimonials, submitPublicTestimonial } from '../services/store';
import { BotanicalDecoration } from '../components/BotanicalDecoration';

const testimonialSchema = z.object({
  name: z.string().min(2, 'Name is required (at least 2 characters)'),
  role: z.string().optional(),
  rating: z.number().min(1, 'Please select a rating').max(5),
  message: z.string().min(10, 'Message must be at least 10 characters long').max(1000, 'Message is too long'),
});

type TestimonialFormValues = z.infer<typeof testimonialSchema>;

export const TestimonialsSection: React.FC = () => {
  const [approvedTestimonials, setApprovedTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitFeedback, setSubmitFeedback] = useState<{ success: boolean; message: string } | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<TestimonialFormValues>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: {
      rating: 5,
      role: '',
    },
  });

  const selectedRating = watch('rating');

  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const data = await getApprovedTestimonials();
      setApprovedTestimonials(data);
    } catch (err) {
      console.error('Error loading testimonials:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const onSubmit = async (values: TestimonialFormValues) => {
    setSubmitting(true);
    setSubmitFeedback(null);
    try {
      const result = await submitPublicTestimonial({
        name: values.name,
        role: values.role || 'Parent / Visitor',
        rating: values.rating,
        message: values.message,
      });

      setSubmitFeedback(result);
      if (result.success) {
        reset({ rating: 5, role: '', name: '', message: '' });
      }
    } catch (err) {
      setSubmitFeedback({
        success: false,
        message: 'An unexpected error occurred while submitting feedback.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="testimonials" className="py-20 md:py-28 bg-cream-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span className="text-xs uppercase tracking-super-wide text-gold font-bold">
            FEEDBACK & TESTIMONIALS
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal">
            Words of Appreciation
          </h2>
          <BotanicalDecoration position="divider" />
        </div>

        {/* Top: Public Testimonials Display Grid */}
        <div className="mb-20">
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2].map((n) => (
                <div key={n} className="academic-card rounded-2xl h-44 animate-pulse bg-cream-200" />
              ))}
            </div>
          )}

          {/* Empty State requirement */}
          {!loading && approvedTestimonials.length === 0 && (
            <div className="text-center py-12 px-6 academic-card rounded-2xl max-w-lg mx-auto space-y-3">
              <MessageSquareQuote className="w-10 h-10 text-gold mx-auto" />
              <h3 className="font-serif text-2xl font-bold text-charcoal">
                Be the first to share your experience.
              </h3>
              <p className="text-xs text-charcoal-muted leading-relaxed">
                Parents, colleagues, and visitors are invited to share their feedback below. All submissions undergo teacher approval before appearing here.
              </p>
            </div>
          )}

          {/* Testimonials Showcase Grid */}
          {!loading && approvedTestimonials.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {approvedTestimonials.map((item) => (
                <div
                  key={item.id}
                  className="academic-card rounded-2xl p-7 relative flex flex-col justify-between space-y-4 group hover:border-gold"
                >
                  <BotanicalDecoration position="top-right" size={32} />

                  <div className="space-y-3">
                    {/* Star Rating */}
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            star <= item.rating
                              ? 'text-gold fill-gold'
                              : 'text-cream-300'
                          }`}
                        />
                      ))}
                    </div>

                    <p className="text-sm text-charcoal-medium leading-relaxed italic">
                      "{item.message}"
                    </p>
                  </div>

                  <div className="pt-4 border-t border-cream-200 flex items-center justify-between">
                    <div>
                      <h4 className="font-serif font-bold text-charcoal text-base">
                        {item.name}
                      </h4>
                      <p className="text-[11px] uppercase tracking-wider text-gold font-semibold">
                        {item.role}
                      </p>
                    </div>
                    <span title="Verified Testimonial">
                      <ShieldCheck className="w-4 h-4 text-gold/60" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom: Public Testimonial Submission Form */}
        <div className="max-w-2xl mx-auto">
          <div className="academic-card rounded-2xl p-8 sm:p-10 border-gold/40 relative">
            <BotanicalDecoration position="top-right" size={44} />

            <div className="text-center space-y-2 mb-8">
              <span className="text-[11px] uppercase tracking-widest text-gold font-bold">
                NO ACCOUNT REQUIRED
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal">
                Share Your Feedback
              </h3>
              <p className="text-xs text-charcoal-muted">
                Your feedback helps inspire continuous academic improvement.
              </p>
            </div>

            {submitFeedback && (
              <div
                className={`mb-6 p-4 rounded-xl text-xs flex items-start gap-3 border ${
                  submitFeedback.success
                    ? 'bg-cream-100 border-gold text-charcoal'
                    : 'bg-red-50 border-red-200 text-red-800'
                }`}
              >
                {submitFeedback.success && <CheckCircle className="w-5 h-5 text-gold shrink-0 mt-0.5" />}
                <div>
                  <p className="font-bold">{submitFeedback.success ? 'Submission Received' : 'Error'}</p>
                  <p>{submitFeedback.message}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div className="space-y-1 text-left">
                  <label className="block text-xs uppercase tracking-wider font-bold text-charcoal">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Mrs. Sharma / Parent"
                    {...register('name')}
                    className="w-full px-4 py-2.5 rounded-xl border border-gold-subtle bg-cream-50 text-charcoal text-xs focus:ring-1 focus:ring-gold focus:border-gold"
                  />
                  {errors.name && (
                    <span className="text-[11px] text-red-600">{errors.name.message}</span>
                  )}
                </div>

                {/* Role / Relation */}
                <div className="space-y-1 text-left">
                  <label className="block text-xs uppercase tracking-wider font-bold text-charcoal">
                    Role / Relationship (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Parent of Grade 6 Student"
                    {...register('role')}
                    className="w-full px-4 py-2.5 rounded-xl border border-gold-subtle bg-cream-50 text-charcoal text-xs focus:ring-1 focus:ring-gold focus:border-gold"
                  />
                </div>
              </div>

              {/* Rating 1-5 selection */}
              <div className="space-y-1 text-left">
                <label className="block text-xs uppercase tracking-wider font-bold text-charcoal">
                  Rating *
                </label>
                <div className="flex items-center gap-2 pt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setValue('rating', star)}
                      className="p-1 text-gold focus:outline-none transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= selectedRating ? 'text-gold fill-gold' : 'text-cream-300'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs text-gold font-semibold ml-2">
                    {selectedRating} / 5 Stars
                  </span>
                </div>
                {errors.rating && (
                  <span className="text-[11px] text-red-600">{errors.rating.message}</span>
                )}
              </div>

              {/* Message */}
              <div className="space-y-1 text-left">
                <label className="block text-xs uppercase tracking-wider font-bold text-charcoal">
                  Your Message *
                </label>
                <textarea
                  rows={4}
                  placeholder="Share your experience working with Iqra Hasan or observing her teaching..."
                  {...register('message')}
                  className="w-full px-4 py-2.5 rounded-xl border border-gold-subtle bg-cream-50 text-charcoal text-xs focus:ring-1 focus:ring-gold focus:border-gold resize-none"
                />
                {errors.message && (
                  <span className="text-[11px] text-red-600">{errors.message.message}</span>
                )}
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 rounded-full border border-gold bg-gold text-cream-50 text-xs uppercase tracking-widest font-bold hover:bg-gold-dark transition-all duration-300 shadow-sm flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <span>Submitting...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Share Feedback</span>
                  </>
                )}
              </button>

              <p className="text-[10px] text-charcoal-muted text-center pt-2">
                🔒 Security Note: Submissions are held in moderation queue and will only be displayed upon teacher review.
              </p>

            </form>
          </div>
        </div>

      </div>
    </section>
  );
};
