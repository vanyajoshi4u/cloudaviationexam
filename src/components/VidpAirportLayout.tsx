interface VidpAirportLayoutProps {
  runwayLeft?: string;
  runwayRight?: string;
  title?: string;
  standLeft?: string;
  standRight?: string;
  taxiwayLeft?: string;
  holdingPointLabel?: string;
}

const VidpAirportLayout = ({ runwayLeft = "09", runwayRight = "27", title = "VIDP DELHI AIRPORT / AERODROME LAYOUT", standLeft = "5", standRight = "6", taxiwayLeft = "D", holdingPointLabel = "D" }: VidpAirportLayoutProps) => (
  <svg viewBox="0 0 600 500" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    {/* Title */}
    <text x="300" y="24" textAnchor="middle" className="fill-foreground" fontSize="14" fontWeight="bold" textDecoration="underline">
      {title}
    </text>

    {/* Terminal Building */}
    <rect x="120" y="45" width="360" height="130" rx="4" fill="none" stroke="currentColor" strokeWidth="1.5" className="stroke-border" />
    <rect x="180" y="55" width="180" height="28" rx="2" className="fill-muted stroke-border" strokeWidth="1" />
    <text x="270" y="74" textAnchor="middle" className="fill-foreground" fontSize="11" fontWeight="600">Terminal Building</text>

    {/* Stand 5 */}
    <rect x="175" y="100" width="60" height="60" rx="2" className="fill-muted-foreground/20 stroke-border" strokeWidth="1" />
    <text x="205" y="135" textAnchor="middle" className="fill-foreground" fontSize="12" fontWeight="bold">{standLeft}</text>

    {/* Aircraft icon at center */}
    <g transform="translate(290, 130)">
      <path d="M0,-22 L0,18 M-18,0 L18,0 M-8,16 L8,16" stroke="currentColor" strokeWidth="3" fill="none" className="stroke-foreground" strokeLinecap="round" />
      <circle cx="0" cy="-22" r="4" className="fill-foreground" />
    </g>

    {/* Stand 6 */}
    <rect x="340" y="100" width="60" height="60" rx="2" className="fill-muted-foreground/20 stroke-border" strokeWidth="1" />
    <text x="370" y="135" textAnchor="middle" className="fill-foreground" fontSize="12" fontWeight="bold">6</text>

    {/* Taxiway C */}
    <line x1="120" y1="230" x2="480" y2="230" className="stroke-primary/40" strokeWidth="20" />
    <rect x="230" y="220" width="40" height="20" rx="2" className="fill-card stroke-border" strokeWidth="1" />
    <text x="250" y="234" textAnchor="middle" className="fill-foreground" fontSize="11" fontWeight="bold">C</text>

    {/* Taxiway B1 label */}
    <rect x="380" y="220" width="35" height="20" rx="2" className="fill-card stroke-border" strokeWidth="1" />
    <text x="397" y="234" textAnchor="middle" className="fill-foreground" fontSize="10" fontWeight="bold">B1</text>

    {/* Taxiway D (vertical left) */}
    <line x1="145" y1="230" x2="145" y2="420" className="stroke-primary/40" strokeWidth="18" />
    <rect x="200" y="310" width="35" height="20" rx="2" className="fill-card stroke-border" strokeWidth="1" />
    <text x="217" y="324" textAnchor="middle" className="fill-foreground" fontSize="11" fontWeight="bold">D</text>

    {/* Taxiway B (vertical right) */}
    <line x1="400" y1="230" x2="400" y2="420" className="stroke-primary/40" strokeWidth="18" />
    <rect x="380" y="340" width="35" height="20" rx="2" className="fill-card stroke-border" strokeWidth="1" />
    <text x="397" y="354" textAnchor="middle" className="fill-foreground" fontSize="11" fontWeight="bold">B</text>

    {/* Holding Point D label */}
    <rect x="95" y="400" width="30" height="20" rx="2" className="fill-card stroke-border" strokeWidth="1" />
    <text x="110" y="414" textAnchor="middle" className="fill-foreground" fontSize="10" fontWeight="bold">D</text>
    <rect x="50" y="425" width="75" height="22" rx="2" className="fill-accent/20 stroke-accent" strokeWidth="1" />
    <text x="87" y="440" textAnchor="middle" className="fill-foreground" fontSize="9" fontWeight="600">Holding Point</text>

    {/* Runway */}
    <rect x="100" y="420" width="480" height="40" rx="2" className="fill-muted-foreground/15 stroke-border" strokeWidth="1.5" />
    <text x="340" y="445" textAnchor="middle" className="fill-foreground" fontSize="14" fontWeight="bold" letterSpacing="4">RUNWAY</text>

    {/* Runway left designation */}
    <rect x="100" y="420" width="30" height="40" rx="2" className="fill-primary/20" />
    <text x="115" y="445" textAnchor="middle" className="fill-primary" fontSize="11" fontWeight="bold">{runwayLeft}</text>

    {/* Runway right designation */}
    <rect x="550" y="420" width="30" height="40" rx="2" className="fill-primary/20" />
    <text x="565" y="445" textAnchor="middle" className="fill-primary" fontSize="11" fontWeight="bold">{runwayRight}</text>

    {/* Dashed centerline */}
    <line x1="140" y1="440" x2="540" y2="440" stroke="currentColor" strokeWidth="1" strokeDasharray="8,6" className="stroke-muted-foreground/40" />
  </svg>
);

export default VidpAirportLayout;
