'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FormField from './FormField';
import Modal from './Modal';
import { WhatsAppIcon, MailIcon } from './Icons';
import { appendSubmission } from '@/lib/localStorage-utils';
import { notify } from '@/lib/notify';
import { submitContact } from '@/lib/db';
import { waLink } from '@/data/site';

interface ContactData {
  name: string;
  email: string;
  phone: string;
  dogId: string;
  dogName: string;
  address: string;
  message: string;
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[+\d][\d\s()-]{6,}$/;

interface Props {
  /** Reservable puppies for the "Puppy of Interest" dropdown. */
  dogs?: { id: string; name: string }[];
  /** Pre-selected puppy id, e.g. from a "Contact Us Now" link's `?dog=` param. */
  initialDogId?: string;
}

export default function ContactForm({ dogs, initialDogId }: Props) {
  const initialDog = dogs?.find((d) => d.id === initialDogId);
  const empty: ContactData = {
    name: '',
    email: '',
    phone: '',
    dogId: initialDog?.id ?? '',
    dogName: initialDog?.name ?? '',
    address: '',
    message: '',
  };
  const [data, setData] = useState<ContactData>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactData, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [choosingChannel, setChoosingChannel] = useState(false);

  const update = (key: keyof ContactData, value: string) => {
    setData((d) => ({ ...d, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const chooseDog = (id: string) => {
    const chosen = dogs?.find((d) => d.id === id);
    update('dogId', id);
    setData((d) => ({ ...d, dogName: chosen?.name ?? '' }));
  };

  const validate = (): boolean => {
    const next: typeof errors = {};
    if (!data.name.trim()) next.name = 'Please tell us your name.';
    if (!data.email.trim()) next.email = 'An email address is required.';
    else if (!emailPattern.test(data.email)) next.email = 'Please enter a valid email.';
    if (data.phone && !phonePattern.test(data.phone)) next.phone = 'Please enter a valid phone number.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setChoosingChannel(true);
  };

  const sendViaWhatsApp = async () => {
    setChoosingChannel(false);
    setSubmitting(true);
    const subject = data.dogName ? `Puppy inquiry – ${data.dogName}` : 'General inquiry';
    const waMessage = `Hi, I'm ${data.name}. ${data.dogName ? `I'm interested in ${data.dogName}. ` : ''}${data.message.trim()}\nEmail: ${data.email}${data.phone ? `\nPhone: ${data.phone}` : ''}`.replace(/\s+\n/, '\n');
    await submitContact({ name: data.name, email: data.email, phone: data.phone, subject, message: data.message }).catch(() => {});
    appendSubmission('ilb:contact', data);
    window.open(waLink(waMessage), '_blank', 'noopener,noreferrer');
    setSubmitting(false);
    setData(empty);
  };

  const sendViaMessage = async () => {
    setChoosingChannel(false);
    setSubmitting(true);
    const subject = data.dogName ? `Puppy inquiry – ${data.dogName}` : 'General inquiry';
    await Promise.all([
      notify({ type: 'contact', name: data.name, email: data.email, phone: data.phone, subject, dogName: data.dogName || 'Not specified', address: data.address || 'Not provided', message: data.message }),
      submitContact({ name: data.name, email: data.email, phone: data.phone, subject, message: data.message }).catch(() => {}),
    ]);
    appendSubmission('ilb:contact', data);
    setSubmitting(false);
    setSuccess(true);
    setData(empty);
  };

  const inputCls = (field: keyof ContactData) => `input ${errors[field] ? 'input-error' : ''}`;

  return (
    <>
      <form onSubmit={onSubmit} noValidate className="card p-6 sm:p-8">
        <div className="grid gap-5 sm:grid-cols-2">
          <FormField label="Name" htmlFor="c-name" required error={errors.name}>
            <input id="c-name" className={inputCls('name')} value={data.name} onChange={(e) => update('name', e.target.value)} autoComplete="name" />
          </FormField>

          <FormField label="Email" htmlFor="c-email" required error={errors.email}>
            <input id="c-email" type="email" className={inputCls('email')} value={data.email} onChange={(e) => update('email', e.target.value)} autoComplete="email" />
          </FormField>

          <FormField label="Your Phone" htmlFor="c-phone" error={errors.phone} hint="Optional" className="sm:col-span-2">
            <input id="c-phone" type="tel" className={inputCls('phone')} value={data.phone} onChange={(e) => update('phone', e.target.value)} autoComplete="tel" />
          </FormField>

          {dogs && dogs.length > 0 && (
            <FormField label="Puppy of Interest" htmlFor="c-dog" className="sm:col-span-2">
              <select id="c-dog" className="input" value={data.dogId} onChange={(e) => chooseDog(e.target.value)}>
                <option value="">General inquiry</option>
                {dogs.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
            </FormField>
          )}

          <FormField label="Address" htmlFor="c-address" hint="Optional" className="sm:col-span-2">
            <input id="c-address" className="input" value={data.address} onChange={(e) => update('address', e.target.value)} autoComplete="street-address" />
          </FormField>
        </div>

        <FormField label="Message" htmlFor="c-message" hint="Optional" error={errors.message} className="mt-5">
          <textarea id="c-message" rows={5} className={inputCls('message')} value={data.message} onChange={(e) => update('message', e.target.value)} placeholder="How can we help?" />
        </FormField>

        <motion.button
          type="submit"
          whileTap={{ scale: 0.98 }}
          disabled={submitting}
          className="btn-accent mt-6 w-full text-base disabled:cursor-not-allowed disabled:opacity-70"
        >
          {submitting ? (
            <>
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
              Sending…
            </>
          ) : (
            'Send Message'
          )}
        </motion.button>
      </form>

      <AnimatePresence>
        {choosingChannel && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div
              className="absolute inset-0 bg-ink/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setChoosingChannel(false)}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Choose how to send your message"
              className="card relative z-10 w-full max-w-md p-7 text-center"
              initial={{ opacity: 0, scale: 0.9, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 8 }}
              transition={{ type: 'spring', stiffness: 280, damping: 26 }}
            >
              <h3 className="text-2xl font-extrabold text-forest-800">How should we send this?</h3>
              <p className="mt-2 text-muted">Choose how you&apos;d like to reach us.</p>
              <div className="mt-6 flex flex-col gap-3">
                <button type="button" onClick={sendViaWhatsApp} className="btn-accent inline-flex items-center justify-center gap-2">
                  <WhatsAppIcon className="h-5 w-5" /> WhatsApp
                </button>
                <button type="button" onClick={sendViaMessage} className="btn-primary inline-flex items-center justify-center gap-2">
                  <MailIcon className="h-5 w-5" /> Message us
                </button>
                <button type="button" onClick={() => setChoosingChannel(false)} className="btn-ghost">
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Modal open={success} onClose={() => setSuccess(false)} title="Message sent!">
        Thank you for getting in touch. We&apos;ll reply within 24 hours.
      </Modal>
    </>
  );
}
