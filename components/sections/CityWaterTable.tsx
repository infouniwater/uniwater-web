import { Section } from '@/components/ui/Section';
import { Eyebrow, Heading, Body, Caption } from '@/components/ui/Typography';
import { CITY_WATER_DATA, formatPpmRange } from '@/content/city-water-data';

/**
 * Per-city water-data section. Renders a real table on desktop and stacked
 * cards on mobile, sourced from content/city-water-data.ts.
 *
 * Renders NOTHING when the city has no locality data yet — no empty shell.
 * All seeded data is currently indicative (verified: false), so the section
 * carries a visible note to that effect.
 *
 * Optional props:
 *   - `note`: overrides the default note copy. The pillar page passes the
 *     brief-required "Indicative ranges based on Uniwater survey data --
 *     confirmed on site." string; city pages get the longer default that
 *     differentiates Kolkata field experience from published studies.
 */
interface CityWaterTableProps {
  citySlug: string;
  cityName: string;
  note?: string;
}

export function CityWaterTable({ citySlug, cityName, note }: CityWaterTableProps) {
  const rows = CITY_WATER_DATA[citySlug] ?? [];
  if (rows.length === 0) return null;

  const defaultNote =
    'Indicative ranges only — Kolkata from our field experience, other cities from published regional groundwater studies. Groundwater varies borehole to borehole, so the number that sizes your system is the one our engineer measures at your address, not the band below.';

  // Render a Supply column only if any row in this city carries supply
  // metadata. Keeps cities that don't track supply yet (every city except
  // Kolkata, currently) on the original 6-column layout untouched.
  const showSupply = rows.some((r) => !!r.supply);

  return (
    <Section padding="default">
      <div className="mb-10 max-w-3xl">
        <Eyebrow className="mb-4">Water by locality</Eyebrow>
        <Heading level={2}>What the water reads, area by area in {cityName}.</Heading>
        <Body className="text-mute mt-4">{note ?? defaultNote}</Body>
      </div>

      {/* Desktop: real table */}
      <div className="hidden md:block border border-hairline overflow-hidden">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-subtle border-b border-hairline">
              <th className="p-4 text-eyebrow font-medium uppercase tracking-wide text-mute">Locality</th>
              {showSupply && (
                <th className="p-4 text-eyebrow font-medium uppercase tracking-wide text-mute">Supply</th>
              )}
              <th className="p-4 text-eyebrow font-medium uppercase tracking-wide text-mute">Iron</th>
              <th className="p-4 text-eyebrow font-medium uppercase tracking-wide text-mute">Hardness</th>
              <th className="p-4 text-eyebrow font-medium uppercase tracking-wide text-mute">TDS</th>
              <th className="p-4 text-eyebrow font-medium uppercase tracking-wide text-mute">Dominant issue</th>
              <th className="p-4 text-eyebrow font-medium uppercase tracking-wide text-mute">Typical system</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.area} className="border-b border-hairline last:border-b-0 bg-offwhite align-top">
                <td className="p-4 text-ink font-medium whitespace-nowrap">{row.area}</td>
                {showSupply && (
                  <td className="p-4 text-mute whitespace-nowrap">{row.supply ?? '—'}</td>
                )}
                <td className="p-4 text-ink whitespace-nowrap">{formatPpmRange(row.ironPpm)}</td>
                <td className="p-4 text-ink whitespace-nowrap">{formatPpmRange(row.hardnessPpm)}</td>
                <td className="p-4 text-ink whitespace-nowrap">{formatPpmRange(row.tdsPpm)}</td>
                <td className="p-4 text-mute max-w-xs">{row.dominantIssue}</td>
                <td className="p-4 text-mute max-w-xs">{row.typicalSystem}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile: stacked cards */}
      <div className="md:hidden flex flex-col gap-4">
        {rows.map((row) => (
          <div key={row.area} className="border border-hairline bg-offwhite p-5">
            <h3 className="text-h3 font-medium text-navy mb-3">{row.area}</h3>
            {showSupply && row.supply && (
              <Caption className="text-mute block mb-3">Supply: {row.supply}</Caption>
            )}
            <dl className="grid grid-cols-3 gap-3 mb-4">
              <div>
                <dt className="text-eyebrow font-medium uppercase tracking-wide text-mute mb-1">Iron</dt>
                <dd className="text-caption text-ink">{formatPpmRange(row.ironPpm)}</dd>
              </div>
              <div>
                <dt className="text-eyebrow font-medium uppercase tracking-wide text-mute mb-1">Hardness</dt>
                <dd className="text-caption text-ink">{formatPpmRange(row.hardnessPpm)}</dd>
              </div>
              <div>
                <dt className="text-eyebrow font-medium uppercase tracking-wide text-mute mb-1">TDS</dt>
                <dd className="text-caption text-ink">{formatPpmRange(row.tdsPpm)}</dd>
              </div>
            </dl>
            <Caption className="text-mute block mb-2">{row.dominantIssue}</Caption>
            <Caption className="text-navy font-medium block">{row.typicalSystem}</Caption>
          </div>
        ))}
      </div>

      {/* BIS reference -- IS 10500 (Drinking Water Specification) acceptable
          limits for the three readings the table carries. A visitor reads
          the bands above against these limits without having to look them
          up. */}
      <Caption className="text-mute mt-6 block">
        BIS acceptable limits (IS 10500): iron 0.3, hardness 200, TDS 500 mg/L.
      </Caption>
    </Section>
  );
}
