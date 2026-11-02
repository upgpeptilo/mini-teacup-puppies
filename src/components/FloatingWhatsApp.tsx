import { WhatsAppIcon } from '@/components/Icons';
import { waLink } from '@/data/site';

export default function FloatingWhatsApp() {
  return (
    <a
      href={waLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed left-4 z-40 inline-flex h-14 items-center gap-2 rounded-full bg-[#075E54] px-4 text-white shadow-lg transition hover:bg-[#064d44] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#075E54] sm:left-6"
      style={{ bottom: 'max(1.5rem, env(safe-area-inset-bottom))' }}
    >
      <WhatsAppIcon className="h-7 w-7 shrink-0" />
      <span className="text-sm font-semibold">WhatsApp</span>
    </a>
  );
}
