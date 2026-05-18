import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sample monthly service report',
  description:
    'A representative UNIWATER monthly service report — Before, On site, After. The parameters logged, the work performed, the discipline that decides year four.',
};

/**
 * Sample monthly service report — a public, print-friendly URL that the
 * homepage and /service can link to as proof. Composed as a single A4
 * page with a print stylesheet so a browser's "Print → Save as PDF" produces
 * a clean handout.
 *
 * Per marketing TODO #17. Replace the example client name / parameter
 * numbers with a real anonymised report when one is ready; until then,
 * this is generated from typical readings.
 */
export default function SampleServiceReportPage() {
  return (
    <>
      <style>{`
        @media print {
          @page { size: A4; margin: 14mm 14mm; }
          header[role="banner"], footer, .no-print { display: none !important; }
          .report-page { box-shadow: none !important; padding: 0 !important; max-width: none !important; }
          body { background: #fff !important; }
        }
      `}</style>

      <main className="bg-subtle min-h-screen py-10 print:py-0 print:bg-offwhite">
        <div className="container-uw">
          <div className="no-print mb-8 max-w-3xl mx-auto">
            <p className="text-eyebrow font-medium uppercase text-teal mb-2">Sample report</p>
            <h1 className="text-h2 font-light text-navy mb-2">This is what the monthly report looks like.</h1>
            <p className="text-mute text-body">
              Every UNIWATER service contract produces one of these on the same day as the engineer&rsquo;s visit. Below is a representative example for a 3-BHK in Salt Lake, Kolkata on its 14th monthly service.
            </p>
            <p className="text-caption text-mute mt-4">
              Press <kbd className="px-2 py-0.5 text-[11px] font-mono bg-subtle border border-hairline">Ctrl/Cmd + P</kbd> to save this report as a PDF.
            </p>
          </div>

          <article className="report-page max-w-3xl mx-auto bg-offwhite border border-hairline p-10 md:p-12 print:border-0 print:p-0">
            {/* Header */}
            <header className="flex items-baseline justify-between border-b border-hairline pb-4 mb-8">
              <div>
                <div className="text-eyebrow font-medium uppercase text-teal tracking-wide">Monthly service report</div>
                <div className="text-h3 font-semibold text-navy mt-1">Visit #14</div>
              </div>
              <div className="text-right text-caption text-mute">
                <div className="font-medium text-navy">UNIWATER</div>
                <div>Salt Lake, Kolkata</div>
                <div>2026-05-18</div>
              </div>
            </header>

            {/* Site + system */}
            <section className="grid grid-cols-2 gap-8 mb-10">
              <div>
                <div className="text-eyebrow text-mute uppercase mb-2 text-xs">Site</div>
                <div className="text-body text-navy leading-snug">
                  3-BHK apartment<br />
                  Salt Lake CK Block<br />
                  Kolkata, 700091
                </div>
              </div>
              <div>
                <div className="text-eyebrow text-mute uppercase mb-2 text-xs">System</div>
                <div className="text-body text-navy leading-snug">
                  HomeSoft 2K LPH Automatic<br />
                  4-stage train · FRP vessels<br />
                  Installed 2025-03-14
                </div>
              </div>
            </section>

            {/* Parameter table */}
            <section className="mb-10">
              <h2 className="text-h3 font-semibold text-navy mb-4">Parameters logged</h2>
              <table className="w-full text-caption border-collapse">
                <thead>
                  <tr className="bg-subtle text-mute uppercase text-[11px] tracking-wide">
                    <th className="text-left p-3 border border-hairline">Parameter</th>
                    <th className="text-left p-3 border border-hairline">Before</th>
                    <th className="text-left p-3 border border-hairline">After</th>
                    <th className="text-left p-3 border border-hairline">Target</th>
                    <th className="text-left p-3 border border-hairline">Status</th>
                  </tr>
                </thead>
                <tbody className="text-navy">
                  <tr><td className="p-3 border border-hairline">TDS (ppm)</td><td className="p-3 border border-hairline">412</td><td className="p-3 border border-hairline">388</td><td className="p-3 border border-hairline">&lt; 500</td><td className="p-3 border border-hairline text-teal font-medium">OK</td></tr>
                  <tr><td className="p-3 border border-hairline">Hardness (ppm CaCO₃)</td><td className="p-3 border border-hairline">38</td><td className="p-3 border border-hairline">22</td><td className="p-3 border border-hairline">&lt; 60</td><td className="p-3 border border-hairline text-teal font-medium">OK</td></tr>
                  <tr><td className="p-3 border border-hairline">Iron (ppm)</td><td className="p-3 border border-hairline">0.09</td><td className="p-3 border border-hairline">&lt; 0.03</td><td className="p-3 border border-hairline">&lt; 0.10</td><td className="p-3 border border-hairline text-teal font-medium">OK</td></tr>
                  <tr><td className="p-3 border border-hairline">pH</td><td className="p-3 border border-hairline">7.4</td><td className="p-3 border border-hairline">7.3</td><td className="p-3 border border-hairline">6.5–8.5</td><td className="p-3 border border-hairline text-teal font-medium">OK</td></tr>
                  <tr><td className="p-3 border border-hairline">Free residual chlorine (ppm)</td><td className="p-3 border border-hairline">0.4</td><td className="p-3 border border-hairline">&lt; 0.05</td><td className="p-3 border border-hairline">&lt; 0.1 post-treatment</td><td className="p-3 border border-hairline text-teal font-medium">OK</td></tr>
                  <tr><td className="p-3 border border-hairline">Inlet pressure (bar)</td><td className="p-3 border border-hairline">2.1</td><td className="p-3 border border-hairline">2.1</td><td className="p-3 border border-hairline">1.8–3.5</td><td className="p-3 border border-hairline text-teal font-medium">OK</td></tr>
                  <tr><td className="p-3 border border-hairline">Outlet pressure (bar)</td><td className="p-3 border border-hairline">1.8</td><td className="p-3 border border-hairline">1.9</td><td className="p-3 border border-hairline">&gt; 1.5</td><td className="p-3 border border-hairline text-teal font-medium">OK</td></tr>
                </tbody>
              </table>
            </section>

            {/* Work performed */}
            <section className="mb-10">
              <h2 className="text-h3 font-semibold text-navy mb-4">Work performed</h2>
              <ul className="flex flex-col gap-2 text-body text-navy">
                <li className="flex gap-3"><span className="text-teal flex-shrink-0">—</span><span>Inlet sediment pre-filter inspected, backwashed. No replacement needed.</span></li>
                <li className="flex gap-3"><span className="text-teal flex-shrink-0">—</span><span>Iron filter regen cycle verified. Media bed depth measured at 320 mm (target 300–350). No top-up required this visit.</span></li>
                <li className="flex gap-3"><span className="text-teal flex-shrink-0">—</span><span>Activated carbon filter — chlorine breakthrough test passed (post-stage residual &lt; 0.05 ppm). Carbon life remaining ~9 months.</span></li>
                <li className="flex gap-3"><span className="text-teal flex-shrink-0">—</span><span>Softener resin — hardness leakage test passed. Salt tank checked, refilled 22 kg (next refill ~ Aug 2026).</span></li>
                <li className="flex gap-3"><span className="text-teal flex-shrink-0">—</span><span>Multiport valve seal inspected, lubricated. No leak.</span></li>
                <li className="flex gap-3"><span className="text-teal flex-shrink-0">—</span><span>Drain line clear. Bypass valve operates correctly.</span></li>
              </ul>
            </section>

            {/* Flags */}
            <section className="mb-10">
              <h2 className="text-h3 font-semibold text-navy mb-4">Flags raised</h2>
              <p className="text-body text-mute leading-relaxed">
                None this visit. Carbon filter life is projected to fall below 6 months by the next visit — we&rsquo;ll plan the replacement on visit #15 in line with the AMC schedule. No customer action required.
              </p>
            </section>

            {/* Next visit */}
            <section className="mb-10 border-t border-hairline pt-6">
              <h2 className="text-h3 font-semibold text-navy mb-3">Next visit</h2>
              <p className="text-body text-navy"><span className="font-medium">Visit #15 — scheduled 2026-06-17</span></p>
              <p className="text-caption text-mute mt-1">Same engineer. Same time slot. We&rsquo;ll WhatsApp you the day before to confirm.</p>
            </section>

            {/* Engineer signature */}
            <footer className="border-t border-hairline pt-6 flex items-end justify-between">
              <div>
                <div className="text-caption text-mute uppercase tracking-wide text-[11px]">Engineer</div>
                <div className="text-body text-navy font-medium mt-1">Suman Saha</div>
                <div className="text-caption text-mute">Senior service engineer · UNIWATER Kolkata</div>
              </div>
              <div className="text-right">
                <div className="text-caption text-mute uppercase tracking-wide text-[11px]">Customer signature</div>
                <div className="mt-1 border-b border-navy w-44 h-6"></div>
              </div>
            </footer>
          </article>

          <div className="no-print max-w-3xl mx-auto mt-10 text-caption text-mute">
            <p>
              This is a representative report. Real reports carry the actual customer name, address, and the engineer&rsquo;s digital signature. The customer receives the PDF on the same day as the service visit.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
