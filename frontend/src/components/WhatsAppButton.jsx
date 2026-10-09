export const WhatsAppButton = () => (
  <a
    href="https://wa.me/919313938006?text=Hi%20Plantstiks%2C%20I%27d%20like%20to%20discuss%20plant-based%20packaging."
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Chat with Plantstiks on WhatsApp"
    data-testid="whatsapp-cta"
    className="group fixed bottom-5 right-5 z-40 block"
  >
    <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-30" />
    <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-teal/25 transition-transform duration-300 group-hover:scale-110">
      <svg viewBox="0 0 24 24" fill="currentColor" width="26" height="26" aria-hidden="true">
        <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2Zm5.3 14.1c-.2.6-1.2 1.2-1.7 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5.2.5.7 1.8.8 1.9.1.2.1.4 0 .6-.3.6-.7.9-.5 1.2.7 1.2 1.6 2 2.8 2.6.3.2.5.1.7-.1l.9-1.1c.2-.3.4-.2.7-.1l2 1c.3.1.5.2.5.4 0 .1 0 .8-.2 1.4Z" />
      </svg>
    </span>
  </a>
);
