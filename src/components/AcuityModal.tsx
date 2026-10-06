import { useEffect } from "react";
import { X } from "lucide-react";

interface AcuityModalProps {
  open: boolean;
  onClose: () => void;
}

const ACUITY_URL = "https://catarinaveigaagendamento.as.me/";

const AcuityModal = ({ open, onClose }: AcuityModalProps) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl h-[85vh] mx-4 bg-ivory rounded-sm overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-foreground hover:text-amber transition-colors"
          aria-label="Fechar"
        >
          <X size={24} />
        </button>
        <iframe
          src={ACUITY_URL}
          title="Marcar consulta"
          className="w-full h-full border-0"
        />
      </div>
    </div>
  );
};

export default AcuityModal;
