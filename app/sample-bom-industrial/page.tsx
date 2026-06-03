import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sample BOM — building inlet WTP',
  description:
    'A representative Uniwater bill of materials for a 12,000 LPH building WTP. Vessels, media, controls, piping — every line transparent. Sample reference.',
};

/**
 * Sample BOM — public, print-friendly reference document linked from
 * /industrial. Demonstrates the "transparent itemised BOM for B2B"
 * differentiator (no Indian competitor in the benchmarked set offers
 * this). Per marketing TODO #18.
 *
 * Example covers a 12K LPH building inlet WTP for a 60-flat residential
 * complex — the modal procurement case for Uniwater's B2B funnel. Numbers
 * are representative; real quotes vary with site survey.
 */
export default function SampleBomPage() {
  return (
    <>
      <style>{`
        @media print {
          @page { size: A4; margin: 14mm 14mm; }
          header[role="banner"], footer, .no-print { display: none !important; }
          .bom-page { box-shadow: none !important; padding: 0 !important; max-width: none !important; }
          body { background: #fff !important; }
        }
      `}</style>

      <main className="bg-subtle min-h-screen py-10 print:py-0 print:bg-offwhite">
        <div className="container-uw">
          <div className="no-print mb-8 max-w-4xl mx-auto">
            <p className="text-eyebrow font-medium uppercase text-teal mb-2">Sample BOM</p>
            <h1 className="font-sans text-h2 font-light text-navy mb-2">This is what a Uniwater B2B quote looks like.</h1>
            <p className="text-mute text-body">
              Below is a representative bill of materials for a 12,000 LPH building inlet water-treatment plant serving a 60-flat residential complex. Every line is named: vessel, media, control, piping, electrical, instrumentation. The real BOM your project receives carries the same level of detail, sized to your survey.
            </p>
            <p className="text-caption text-mute mt-4">
              Press <kbd className="px-2 py-0.5 text-[11px] font-mono bg-subtle border border-hairline">Ctrl/Cmd + P</kbd> to save as PDF.
            </p>
          </div>

          <article className="bom-page max-w-4xl mx-auto bg-offwhite border border-hairline p-10 md:p-12 print:border-0 print:p-0">
            <header className="flex items-baseline justify-between border-b border-hairline pb-4 mb-8">
              <div>
                <div className="text-eyebrow font-medium uppercase text-teal tracking-wide">Bill of materials</div>
                <div className="text-h3 font-semibold text-navy mt-1">12,000 LPH building WTP</div>
                <div className="text-caption text-mute mt-1">Sample BOM · for reference only · 2026 catalogue pricing</div>
              </div>
              <div className="text-right text-caption text-mute">
                <div className="font-medium text-navy">Uniwater</div>
                <div>Reference: SAMPLE-WTP-12K-2026</div>
              </div>
            </header>

            <section className="grid grid-cols-2 gap-8 mb-10">
              <div>
                <div className="text-eyebrow text-mute uppercase mb-2 text-xs">Application</div>
                <div className="text-body text-navy leading-snug">
                  Residential complex inlet treatment<br />
                  60 flats · ~270 daily occupants<br />
                  Peak 1,500 LPH; daily 12,000 L
                </div>
              </div>
              <div>
                <div className="text-eyebrow text-mute uppercase mb-2 text-xs">Source water</div>
                <div className="text-body text-navy leading-snug">
                  Borewell + municipal blend<br />
                  TDS 480 ppm · Hardness 320 ppm CaCO₃<br />
                  Iron 0.8 ppm · pH 7.6
                </div>
              </div>
            </section>

            {/* BOM table */}
            <section className="mb-10">
              <h2 className="font-sans text-h3 font-semibold text-navy mb-4">Treatment train</h2>
              <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
              <table className="w-full text-caption border-collapse min-w-[760px] sm:min-w-0">
                <thead>
                  <tr className="bg-subtle text-mute uppercase text-[11px] tracking-wide">
                    <th className="text-left p-3 border border-hairline">#</th>
                    <th className="text-left p-3 border border-hairline">Item</th>
                    <th className="text-left p-3 border border-hairline">Spec</th>
                    <th className="text-right p-3 border border-hairline">Qty</th>
                    <th className="text-right p-3 border border-hairline">Unit ₹</th>
                    <th className="text-right p-3 border border-hairline">Line ₹</th>
                  </tr>
                </thead>
                <tbody className="text-navy">
                  <tr>
                    <td className="p-3 border border-hairline">01</td>
                    <td className="p-3 border border-hairline">Multi-grade filter (MGF)</td>
                    <td className="p-3 border border-hairline">FRP 24&quot; × 72&quot;, automatic multiport valve, silica sand + anthracite + supporting gravels</td>
                    <td className="p-3 border border-hairline text-right">1</td>
                    <td className="p-3 border border-hairline text-right">1,18,000</td>
                    <td className="p-3 border border-hairline text-right">1,18,000</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-hairline">02</td>
                    <td className="p-3 border border-hairline">Iron-removal filter</td>
                    <td className="p-3 border border-hairline">FRP 24&quot; × 72&quot;, Katalox Light catalytic media, automatic regen</td>
                    <td className="p-3 border border-hairline text-right">1</td>
                    <td className="p-3 border border-hairline text-right">1,46,000</td>
                    <td className="p-3 border border-hairline text-right">1,46,000</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-hairline">03</td>
                    <td className="p-3 border border-hairline">Activated carbon filter</td>
                    <td className="p-3 border border-hairline">FRP 24&quot; × 72&quot;, IV 900 coconut-shell carbon, automatic multiport</td>
                    <td className="p-3 border border-hairline text-right">1</td>
                    <td className="p-3 border border-hairline text-right">96,000</td>
                    <td className="p-3 border border-hairline text-right">96,000</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-hairline">04</td>
                    <td className="p-3 border border-hairline">Water softener</td>
                    <td className="p-3 border border-hairline">FRP 24&quot; × 72&quot;, strong-acid cation resin (Tulsion T-42), brine tank 200 L, auto-regen</td>
                    <td className="p-3 border border-hairline text-right">1</td>
                    <td className="p-3 border border-hairline text-right">1,38,000</td>
                    <td className="p-3 border border-hairline text-right">1,38,000</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-hairline">05</td>
                    <td className="p-3 border border-hairline">Inlet booster pump</td>
                    <td className="p-3 border border-hairline">Wilo / Grundfos 1.5 HP, pressure-switched</td>
                    <td className="p-3 border border-hairline text-right">1</td>
                    <td className="p-3 border border-hairline text-right">42,000</td>
                    <td className="p-3 border border-hairline text-right">42,000</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-hairline">06</td>
                    <td className="p-3 border border-hairline">Control panel cabinet</td>
                    <td className="p-3 border border-hairline">IP55, MCB protection, indicator lights, SCADA-ready dry contacts</td>
                    <td className="p-3 border border-hairline text-right">1</td>
                    <td className="p-3 border border-hairline text-right">38,000</td>
                    <td className="p-3 border border-hairline text-right">38,000</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-hairline">07</td>
                    <td className="p-3 border border-hairline">Pressure gauges + sample taps</td>
                    <td className="p-3 border border-hairline">SS316, 0–6 bar, between every stage; 6 sample taps total</td>
                    <td className="p-3 border border-hairline text-right">1</td>
                    <td className="p-3 border border-hairline text-right">18,000</td>
                    <td className="p-3 border border-hairline text-right">18,000</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-hairline">08</td>
                    <td className="p-3 border border-hairline">Interconnecting piping &amp; fittings</td>
                    <td className="p-3 border border-hairline">UPVC ASTM 80, schedule 80, ball valves, unions, 30 m allowance</td>
                    <td className="p-3 border border-hairline text-right">1</td>
                    <td className="p-3 border border-hairline text-right">42,000</td>
                    <td className="p-3 border border-hairline text-right">42,000</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-hairline">09</td>
                    <td className="p-3 border border-hairline">Electrical fitting kit</td>
                    <td className="p-3 border border-hairline">Cabling from control panel to all vessels + pump; conduit + earthing</td>
                    <td className="p-3 border border-hairline text-right">1</td>
                    <td className="p-3 border border-hairline text-right">28,000</td>
                    <td className="p-3 border border-hairline text-right">28,000</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-hairline">10</td>
                    <td className="p-3 border border-hairline">Installation &amp; commissioning</td>
                    <td className="p-3 border border-hairline">Mechanical + electrical + plumbing labour, 5 working days, on-site supervision</td>
                    <td className="p-3 border border-hairline text-right">1</td>
                    <td className="p-3 border border-hairline text-right">85,000</td>
                    <td className="p-3 border border-hairline text-right">85,000</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-hairline">11</td>
                    <td className="p-3 border border-hairline">Initial media charge + start-up chemicals</td>
                    <td className="p-3 border border-hairline">All media for stages 01–04; antiscalant; commissioning chemicals</td>
                    <td className="p-3 border border-hairline text-right">1</td>
                    <td className="p-3 border border-hairline text-right">62,000</td>
                    <td className="p-3 border border-hairline text-right">62,000</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr className="text-navy font-medium">
                    <td colSpan={5} className="p-3 border border-hairline text-right uppercase text-eyebrow text-mute">Subtotal (₹)</td>
                    <td className="p-3 border border-hairline text-right">8,13,000</td>
                  </tr>
                  <tr className="text-mute">
                    <td colSpan={5} className="p-3 border border-hairline text-right">GST @ 18%</td>
                    <td className="p-3 border border-hairline text-right">1,46,340</td>
                  </tr>
                  <tr className="text-navy font-semibold bg-tint/30">
                    <td colSpan={5} className="p-3 border border-hairline text-right uppercase text-eyebrow">Total (₹, including GST)</td>
                    <td className="p-3 border border-hairline text-right">9,59,340</td>
                  </tr>
                </tfoot>
              </table>
              </div>
            </section>

            {/* Bundled / excluded */}
            <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mb-10">
              <div>
                <div className="text-eyebrow text-mute uppercase mb-2 text-xs">Bundled in the line items</div>
                <ul className="text-caption text-navy leading-snug flex flex-col gap-1">
                  <li>— Vessel + media + automatic multiport valve</li>
                  <li>— Floor stand, mounting bracket</li>
                  <li>— Inlet/outlet unions + bypass valve</li>
                  <li>— 1 m connecting hose between adjacent vessels</li>
                  <li>— Installation manual + commissioning report</li>
                </ul>
              </div>
              <div>
                <div className="text-eyebrow text-mute uppercase mb-2 text-xs">Excluded (customer scope)</div>
                <ul className="text-caption text-mute leading-snug flex flex-col gap-1">
                  <li>— Raw / treated water storage tanks</li>
                  <li>— Distribution piping beyond the plant room</li>
                  <li>— Civil work / plant room construction</li>
                  <li>— Power supply to the plant room</li>
                  <li>— Building approvals / pollution-board NOC if required</li>
                </ul>
              </div>
            </section>

            {/* AMC */}
            <section className="mb-10 border-t border-hairline pt-6">
              <h2 className="font-sans text-h3 font-semibold text-navy mb-3">Annual Maintenance Contract — priced at handover</h2>
              <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
              <table className="w-full text-caption border-collapse min-w-[560px] sm:min-w-0">
                <thead>
                  <tr className="bg-subtle text-mute uppercase text-[11px] tracking-wide">
                    <th className="text-left p-3 border border-hairline">Tier</th>
                    <th className="text-left p-3 border border-hairline">Visit frequency</th>
                    <th className="text-left p-3 border border-hairline">Scope</th>
                    <th className="text-right p-3 border border-hairline">Annual ₹</th>
                  </tr>
                </thead>
                <tbody className="text-navy">
                  <tr><td className="p-3 border border-hairline">Standard</td><td className="p-3 border border-hairline">Quarterly</td><td className="p-3 border border-hairline">Inspection + sample testing + media top-up at cost</td><td className="p-3 border border-hairline text-right">72,000</td></tr>
                  <tr><td className="p-3 border border-hairline">Comprehensive</td><td className="p-3 border border-hairline">Monthly</td><td className="p-3 border border-hairline">All of Standard + monthly report + media replacements included</td><td className="p-3 border border-hairline text-right">1,44,000</td></tr>
                  <tr><td className="p-3 border border-hairline">Premium</td><td className="p-3 border border-hairline">Monthly + 24-hr SLA</td><td className="p-3 border border-hairline">All of Comprehensive + 24-hour fault response + remote alerts</td><td className="p-3 border border-hairline text-right">2,16,000</td></tr>
                </tbody>
              </table>
              </div>
              <p className="text-caption text-mute mt-3 italic">AMC starts on day 31 after handover; first 30 days covered free under installation warranty.</p>
            </section>

            <footer className="border-t border-hairline pt-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="text-caption text-mute uppercase tracking-wide text-[11px]">Prepared by</div>
                <div className="text-body text-navy font-medium mt-1">Uniwater engineering team</div>
                <div className="text-caption text-mute">Validity: 30 days from quote date · final BOM after site survey</div>
              </div>
              <div className="text-caption text-mute sm:text-right">
                <div>support@uniwater.co.in</div>
                <div>+91 97487 45193</div>
                <div>uniwater.co.in</div>
              </div>
            </footer>
          </article>

          <div className="no-print max-w-4xl mx-auto mt-10 text-caption text-mute">
            <p>
              This is a representative BOM. The real BOM your project receives carries (a) your project name, (b) survey-confirmed source-water parameters, and (c) line-item pricing valid for 30 days from the survey date. Every component is named — no &quot;package&quot; line items, no &quot;misc.&quot; bundling.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
