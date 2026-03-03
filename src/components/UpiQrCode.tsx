import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { AlertTriangle, RefreshCw } from "lucide-react";

const UPI_IDS = [
  { id: "6396927089-2@ybl", label: "Primary UPI" },
  { id: "8873373305@ptsbi", label: "Backup UPI" },
];

const PAYEE_NAME = "CloudAviation Exams";

interface UpiQrCodeProps {
  amount: number;
}

const UpiQrCode = ({ amount }: UpiQrCodeProps) => {
  const [upiIndex, setUpiIndex] = useState(0);

  const currentUpi = UPI_IDS[upiIndex];
  const upiLink = `upi://pay?pa=${encodeURIComponent(currentUpi.id)}&pn=${encodeURIComponent(PAYEE_NAME)}&am=${amount}&cu=INR`;

  const switchUpi = () => {
    setUpiIndex((prev) => (prev + 1) % UPI_IDS.length);
  };

  return (
    <div className="text-center">
      <p className="text-sm font-medium text-foreground mb-3">
        Scan QR Code to Pay ₹{amount}
      </p>
      <div className="inline-block bg-white p-4 rounded-xl">
        <QRCodeSVG value={upiLink} size={192} level="H" />
      </div>
      <p className="text-xs text-muted-foreground mt-2">
        UPI ID: <span className="font-mono text-foreground">{currentUpi.id}</span>
      </p>

      {upiIndex === 0 && (
        <button
          type="button"
          onClick={switchUpi}
          className="mt-3 inline-flex items-center gap-1.5 text-xs text-primary hover:underline"
        >
          <AlertTriangle className="w-3 h-3" />
          Facing bank error? Try backup UPI
        </button>
      )}
      {upiIndex === 1 && (
        <div className="mt-3 space-y-1">
          <p className="text-[10px] text-amber-500 flex items-center justify-center gap-1">
            <RefreshCw className="w-3 h-3" />
            Using backup UPI
          </p>
          <button
            type="button"
            onClick={switchUpi}
            className="text-xs text-primary hover:underline"
          >
            Switch back to primary
          </button>
        </div>
      )}
    </div>
  );
};

export default UpiQrCode;
