import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, MessageSquare, CheckCircle, ExternalLink } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { TEACHER_INFO } from '../data/teacherData';
import { BotanicalDecoration } from '../components/BotanicalDecoration';

const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters long'),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export const ContactSection: React.FC = () => {
  const [submitting, setSubmitting] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    setSubmitting(true);
    try {
      // Simulate EmailJS or server dispatch
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSentSuccess(true);
      reset();
    } catch (err) {
      console.error('Contact form submission error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const whatsappUrl = `https://wa.me/918077241972?text=${encodeURIComponent('Hello Iqra Hasan, I visited your teaching portfolio website and would like to get in touch.')}`;

  return (
    <section id="contact" className="py-20 md:py-28 bg-academic-pattern relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span className="text-xs uppercase tracking-super-wide text-gold font-bold">
            GET IN TOUCH
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal">
            Let's Connect & Collaborate
          </h2>
          <BotanicalDecoration position="divider" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Contact Info & Quick CTAs */}
          <div className="lg:col-span-5 space-y-8">
            
            <div className="academic-card rounded-2xl p-8 space-y-6 relative">
              <BotanicalDecoration position="top-right" size={40} />

              <h3 className="font-serif text-2xl font-bold text-charcoal border-b border-gold-subtle pb-3">
                Contact Information
              </h3>

              <p className="text-xs text-charcoal-medium leading-relaxed">
                Feel free to reach out regarding teaching opportunities, school consultations, or academic collaborations.
              </p>

              <div className="space-y-5 text-xs">
                
                {/* Address */}
                <div className="flex items-start gap-4 p-3 rounded-xl bg-cream-50 border border-gold-subtle">
                  <div className="p-2.5 rounded-full bg-gold/15 text-gold shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-charcoal uppercase tracking-wider text-[10px]">Location Address</h4>
                    <p className="text-charcoal-medium mt-1 leading-relaxed">{TEACHER_INFO.address}</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4 p-3 rounded-xl bg-cream-50 border border-gold-subtle">
                  <div className="p-2.5 rounded-full bg-gold/15 text-gold shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-charcoal uppercase tracking-wider text-[10px]">Direct Phone</h4>
                    <a href={`tel:${TEACHER_INFO.phone}`} className="text-gold font-semibold mt-1 block hover:underline">
                      {TEACHER_INFO.phone}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4 p-3 rounded-xl bg-cream-50 border border-gold-subtle">
                  <div className="p-2.5 rounded-full bg-gold/15 text-gold shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-charcoal uppercase tracking-wider text-[10px]">Email Address</h4>
                    <a href={`mailto:${TEACHER_INFO.email}`} className="text-gold font-semibold mt-1 block hover:underline">
                      {TEACHER_INFO.email}
                    </a>
                  </div>
                </div>

              </div>

              {/* Direct Quick Action CTAs */}
              <div className="pt-2 space-y-3">
                <h4 className="text-xs uppercase tracking-widest text-charcoal-muted font-bold">Quick Messaging Actions:</h4>
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-gold bg-cream-50 text-charcoal text-xs font-bold hover:bg-gold hover:text-cream-50 transition-colors shadow-sm"
                  >
                    <MessageSquare className="w-4 h-4 text-gold group-hover:text-cream-50" />
                    <span>WhatsApp</span>
                  </a>

                  <a
                    href={`mailto:${TEACHER_INFO.email}`}
                    className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-gold/40 bg-gold text-cream-50 text-xs font-bold hover:bg-gold-dark transition-colors shadow-sm"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Send Email</span>
                  </a>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="academic-card rounded-2xl p-8 sm:p-10 relative">
              <BotanicalDecoration position="top-right" size={44} />

              <h3 className="font-serif text-2xl font-bold text-charcoal mb-2">
                Send a Message
              </h3>
              <p className="text-xs text-charcoal-muted mb-6">
                Fill out the form below to directly contact Iqra Hasan.
              </p>

              {sentSuccess && (
                <div className="mb-6 p-4 rounded-xl bg-cream-100 border border-gold text-charcoal text-xs flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-gold shrink-0" />
                  <div>
                    <p className="font-bold">Message Delivered!</p>
                    <p>Thank you for reaching out. Iqra Hasan will respond to your query shortly.</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 text-left">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-1">
                    <label className="block text-xs uppercase tracking-wider font-bold text-charcoal">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Rahul Sharma"
                      {...register('name')}
                      className="w-full px-4 py-2.5 rounded-xl border border-gold-subtle bg-cream-50 text-charcoal text-xs focus:ring-1 focus:ring-gold focus:border-gold"
                    />
                    {errors.name && (
                      <span className="text-[11px] text-red-600">{errors.name.message}</span>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-1">
                    <label className="block text-xs uppercase tracking-wider font-bold text-charcoal">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      {...register('email')}
                      className="w-full px-4 py-2.5 rounded-xl border border-gold-subtle bg-cream-50 text-charcoal text-xs focus:ring-1 focus:ring-gold focus:border-gold"
                    />
                    {errors.email && (
                      <span className="text-[11px] text-red-600">{errors.email.message}</span>
                    )}
                  </div>
                </div>

                {/* Subject */}
                <div className="space-y-1">
                  <label className="block text-xs uppercase tracking-wider font-bold text-charcoal">
                    Subject (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Teaching Inquiry / School Event"
                    {...register('subject')}
                    className="w-full px-4 py-2.5 rounded-xl border border-gold-subtle bg-cream-50 text-charcoal text-xs focus:ring-1 focus:ring-gold focus:border-gold"
                  />
                </div>

                {/* Message */}
                <div className="space-y-1">
                  <label className="block text-xs uppercase tracking-wider font-bold text-charcoal">
                    Your Message *
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Write your message or inquiry here..."
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
                    <span>Sending Message...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>

              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
