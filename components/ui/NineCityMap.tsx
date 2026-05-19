/**
 * Nine-city constellation — a clean inline SVG showing UNIWATER's 9
 * operating cities as teal pins on a navy field, with the names rendered
 * at SVG-text size so they stay sharp at any viewport width.
 *
 * Replaces the busy "where-we-work" PNG that was being aliased into the
 * map slot — that asset's micro-typography was illegible at the rendered
 * size on the home page.
 *
 * Geometry: longitudes 70 → 95, latitudes 37 → 8 mapped into a 100×72
 * viewBox so the visual maintains roughly cartographic spacing without
 * pretending to be a real map. No country outline — the pin arrangement
 * carries the geography.
 */

interface Pin {
  name: string;
  country: 'India' | 'Nepal';
  /** SVG viewBox coords (0–100, 0–72). */
  x: number;
  y: number;
  /** Side the label sits on, so it doesn't collide with neighbours. */
  anchor?: 'start' | 'end';
  /** Vertical nudge (in SVG units) for label readability. */
  dy?: number;
}

const PINS: Pin[] = [
  // Coords derived from lon/lat: longitudes 70 → 95 ↦ x 0–100, latitudes 37 → 8 ↦ y 0–72.
  { name: 'Noida',      country: 'India', x: 28.8, y: 20.9, anchor: 'start' },   // ~28.6°N 77.2°E (NCR)
  { name: 'Kathmandu',  country: 'Nepal', x: 61.3, y: 23.0, anchor: 'end',   dy: -2 },
  { name: 'Biratnagar', country: 'Nepal', x: 69.1, y: 26.0, anchor: 'end',   dy: 4 },
  { name: 'Siliguri',   country: 'India', x: 73.7, y: 26.0, anchor: 'start' },
  { name: 'Guwahati',   country: 'India', x: 86.9, y: 28.0, anchor: 'start' },
  { name: 'Ranchi',     country: 'India', x: 61.2, y: 34.0, anchor: 'end' },
  { name: 'Rourkela',   country: 'India', x: 59.4, y: 37.0, anchor: 'end' },
  { name: 'Kolkata',    country: 'India', x: 73.4, y: 36.0, anchor: 'start' },
  { name: 'Bhubaneswar',country: 'India', x: 63.3, y: 42.0, anchor: 'start', dy: 4 },
];

export function NineCityMap() {
  return (
    <figure
      aria-label="Nine UNIWATER operating cities — Noida, Kolkata, Bhubaneswar, Ranchi, Rourkela, Siliguri, Guwahati in India; Kathmandu, Biratnagar in Nepal."
      className="w-full"
    >
      <svg
        viewBox="0 0 100 72"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        className="block w-full h-auto"
      >
        {/* Subtle grid — gives a sense of cartographic space without claiming
            to be a map. */}
        <defs>
          <pattern id="ncm-grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#FAFAF7" strokeOpacity="0.06" strokeWidth="0.15" />
          </pattern>
        </defs>
        <rect width="100" height="72" fill="url(#ncm-grid)" />

        {/* Connecting hairlines — every pin to its nearest neighbour, suggests
            the operating network. */}
        <g stroke="#87D0CD" strokeOpacity="0.18" strokeWidth="0.15">
          {/* Noida → Kathmandu (the western anchor reaching the cluster) */}
          <line x1="28.8" y1="20.9" x2="61.3" y2="23.0" />
          {/* Kathmandu ↔ neighbours */}
          <line x1="61.3" y1="23.0" x2="69.1" y2="26.0" />
          <line x1="69.1" y1="26.0" x2="73.7" y2="26.0" />
          <line x1="73.7" y1="26.0" x2="86.9" y2="28.0" />
          <line x1="73.7" y1="26.0" x2="73.4" y2="36.0" />
          <line x1="73.4" y1="36.0" x2="63.3" y2="42.0" />
          <line x1="73.4" y1="36.0" x2="61.2" y2="34.0" />
          <line x1="61.2" y1="34.0" x2="59.4" y2="37.0" />
          <line x1="59.4" y1="37.0" x2="63.3" y2="42.0" />
          <line x1="61.3" y1="23.0" x2="61.2" y2="34.0" />
        </g>

        {/* Pins — solid teal dot, faint outer ring for "service area" feel. */}
        {PINS.map((p) => (
          <g key={p.name}>
            <circle cx={p.x} cy={p.y} r="2.8" fill="#1B9BB4" fillOpacity="0.18" />
            <circle cx={p.x} cy={p.y} r="1.2" fill="#1B9BB4" />
          </g>
        ))}

        {/* City labels — kept large enough to read at any rendered width. */}
        {PINS.map((p) => {
          const labelX = p.anchor === 'end' ? p.x - 2.5 : p.x + 2.5;
          const labelY = p.y + (p.dy ?? 1.2);
          return (
            <text
              key={`${p.name}-label`}
              x={labelX}
              y={labelY}
              fontSize="2.4"
              fontFamily="system-ui, -apple-system, 'Segoe UI', sans-serif"
              fontWeight="500"
              textAnchor={p.anchor ?? 'start'}
              fill="#FAFAF7"
              opacity="0.92"
            >
              {p.name}
              <tspan
                x={labelX}
                dy="2.6"
                fontSize="1.6"
                fontWeight="400"
                fill="#87D0CD"
                opacity="0.8"
              >
                {p.country}
              </tspan>
            </text>
          );
        })}
      </svg>

      <figcaption className="sr-only">
        UNIWATER operates with its own engineering teams in seven cities across India (Kolkata, Bhubaneswar, Ranchi, Rourkela, Siliguri, Guwahati, Noida) and two cities in Nepal (Kathmandu, Biratnagar).
      </figcaption>
    </figure>
  );
}
