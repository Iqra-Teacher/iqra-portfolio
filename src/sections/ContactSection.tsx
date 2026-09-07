import React, { useState } from 'react';
import { MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import emailjs from '@emailjs/browser';
import { TEACHER_INFO } from '../data/teacherData';
import { BotanicalDecoration } from '../components/BotanicalDecoration';

const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  email: z.union([z.string().email('Please enter a valid email address'), z.literal('')]).optional(),
  subject: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters long'),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export const ContactSection: React.FC = () => {
  const [submitting, setSubmitting] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
    setSentSuccess(false);
    setErrorMessage(null);

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error('Email service is not configured. Please set VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY in your environment variables.');
      }

      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: data.name,
          name: data.name,
          phone: data.phone,
          email: data.email || 'Not provided',
          reply_to: data.email || '',
          subject: data.subject || 'New Contact Inquiry',
          message: data.message,
        },
        publicKey
      );

      setSentSuccess(true);
      reset();
    } catch (err: any) {
      console.error('Contact form submission error:', err);
      const msg = typeof err === 'string' 
        ? err 
        : err?.text || err?.message || 'Failed to send message. Please try again later.';
      setErrorMessage(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-20 md:py-28 bg-academic-pattern">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto mb-16 space-y-3 text-center">
          <span className="text-xs font-bold uppercase tracking-super-wide text-gold">
            GET IN TOUCH
          </span>
          <h2 className="font-serif text-3xl font-bold sm:text-4xl md:text-5xl text-charcoal">
            Let's Connect & Collaborate
          </h2>
          <BotanicalDecoration position="divider" />
        </div>

        <div className="grid items-start grid-cols-1 gap-10 lg:grid-cols-12">
          
          {/* Left Column: Direct Contact Info */}
          <div className="space-y-8 lg:col-span-5">
            
            <div className="relative p-8 space-y-6 academic-card rounded-2xl">
              <BotanicalDecoration position="top-right" size={40} />

              <h3 className="pb-3 font-serif text-2xl font-bold border-b text-charcoal border-gold-subtle">
                Contact Information
              </h3>

              <p className="text-xs leading-relaxed text-charcoal-medium">
                Feel free to reach out using the contact form regarding teaching opportunities, school consultations, or academic collaborations.
              </p>

              <div className="space-y-5 text-xs">
                
                {/* Location Address (Commented out for future use)
                <div className="flex items-start gap-4 p-3 border rounded-xl bg-cream-50 border-gold-subtle">
                  <div className="p-2.5 rounded-full bg-gold/15 text-gold shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-charcoal uppercase tracking-wider text-[10px]">Location Address</h4>
                    <p className="mt-1 leading-relaxed text-charcoal-medium">{TEACHER_INFO.address}</p>
                  </div>
                </div>
                */}

              </div>

            </div>

          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="relative p-8 academic-card rounded-2xl sm:p-10">
              <BotanicalDecoration position="top-right" size={44} />

              <h3 className="mb-2 font-serif text-2xl font-bold text-charcoal">
                Send a Message
              </h3>
              <p className="mb-6 text-xs text-charcoal-muted">
                Fill out the form below to directly contact Iqra Hasan.
              </p>

              {sentSuccess && (
                <div className="flex items-center gap-3 p-4 mb-6 text-xs border rounded-xl bg-cream-100 border-gold text-charcoal">
                  <CheckCircle className="w-5 h-5 text-gold shrink-0" />
                  <div>
                    <p className="font-bold">Message Delivered!</p>
                    <p>Thank you for reaching out. Iqra Hasan will respond to your query shortly.</p>
                  </div>
                </div>
              )}

              {errorMessage && (
                <div className="flex items-center gap-3 p-4 mb-6 text-xs border rounded-xl bg-red-50 border-red-300 text-red-800">
                  <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                  <div>
                    <p className="font-bold">Failed to Send Message</p>
                    <p>{errorMessage}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 text-left">
                
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {/* Name */}
                  <div className="space-y-1">
                    <label className="block text-xs font-bold tracking-wider uppercase text-charcoal">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Abdul Qadir"
                      {...register('name')}
                      className="w-full px-4 py-2.5 rounded-xl border border-gold-subtle bg-cream-50 text-charcoal text-xs focus:ring-1 focus:ring-gold focus:border-gold"
                    />
                    {errors.name && (
                      <span className="text-[11px] text-red-600">{errors.name.message}</span>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div className="space-y-1">
                    <label className="block text-xs font-bold tracking-wider uppercase text-charcoal">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. +91 9876543210"
                      {...register('phone')}
                      className="w-full px-4 py-2.5 rounded-xl border border-gold-subtle bg-cream-50 text-charcoal text-xs focus:ring-1 focus:ring-gold focus:border-gold"
                    />
                    {errors.phone && (
                      <span className="text-[11px] text-red-600">{errors.phone.message}</span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {/* Email */}
                  <div className="space-y-1">
                    <label className="block text-xs font-bold tracking-wider uppercase text-charcoal">
                      Your Email (Optional)
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

                  {/* Subject */}
                  <div className="space-y-1">
                    <label className="block text-xs font-bold tracking-wider uppercase text-charcoal">
                      Subject (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Teaching Inquiry / School Event"
                      {...register('subject')}
                      className="w-full px-4 py-2.5 rounded-xl border border-gold-subtle bg-cream-50 text-charcoal text-xs focus:ring-1 focus:ring-gold focus:border-gold"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold tracking-wider uppercase text-charcoal">
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
