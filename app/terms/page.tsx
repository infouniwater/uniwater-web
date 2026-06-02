import type { Metadata } from 'next';
import { Section } from '@/components/ui/Section';
import { Eyebrow, Display, Heading, Body, Caption } from '@/components/ui/Typography';
import { SITE, CONTACT } from '@/content/site';

export const metadata: Metadata = {
  title: 'Terms of service',
  description: 'The terms under which Uniwater surveys, designs, installs, and services water systems. Survey, payment, install, warranty, AMC, and dispute resolution covered.',
};

/**
 * Terms of service — drafted in-house. Reviewed against the Indian
 * Consumer Protection Act 2019, the Sale of Goods Act 1930, and IT Act
 * 2000 provisions for electronic agreement. Legal counsel sign-off
 * required for warranty representations, AMC obligations, and the
 * cancellation/refund terms before public launch.
 */
export default function TermsPage() {
  return (
    <>
      <section className="bg-offwhite border-b border-hairline">
        <div className="container-uw py-16 md:py-24 max-w-4xl">
          <Eyebrow className="mb-4">Terms</Eyebrow>
          <Display>Terms of service.</Display>
          <Caption className="text-mute mt-6">
            Effective from 1 June 2026. Last updated: 19 May 2026. These terms govern the relationship between Uniwater and anyone using {SITE.domain} or purchasing our products and services in India.
          </Caption>
        </div>
      </section>

      <Section padding="default">
        <div className="max-w-reading mx-auto flex flex-col gap-10">
          <Body className="text-mute text-lede font-light">
            By using {SITE.domain} or engaging Uniwater for a survey, an installation, or an Annual Maintenance Contract, you accept these terms. Read them in full. If anything is unclear, write to <a href={`mailto:${CONTACT.emails.support}`} className="text-teal underline underline-offset-4">{CONTACT.emails.support}</a> before you proceed.
          </Body>

          <div>
            <Heading level={2} className="mb-3">1. Who we are.</Heading>
            <Body className="text-mute">
              {SITE.legalName}, a private limited company incorporated in India, with registered office at {CONTACT.address.line1}, {CONTACT.address.city} {CONTACT.address.pin}. GSTIN: 19AADCU6172B1ZD. We operate the brand &ldquo;Uniwater&rdquo; and the website {SITE.domain}.
            </Body>
          </div>

          <div>
            <Heading level={2} className="mb-3">2. What you&rsquo;re agreeing to.</Heading>
            <Body className="text-mute">
              These terms cover: (a) your use of the website and any forms submitted through it; (b) the free water survey we conduct at your property; (c) the sale, installation, and commissioning of any water-treatment system you purchase from us; and (d) the Annual Maintenance Contract (AMC) you sign for service after handover. Different sections of these terms apply to each stage.
            </Body>
          </div>

          <div>
            <Heading level={2} className="mb-3">3. The free water survey.</Heading>
            <ul className="flex flex-col gap-3 text-body text-mute pl-5">
              <li>— The survey is free of cost and creates no obligation to purchase.</li>
              <li>— A Uniwater engineer will visit at a scheduled time, test your water (TDS, hardness, iron, pH at minimum, plus parameters relevant to your reported symptoms), audit your plumbing and available installation space, and prepare a system recommendation.</li>
              <li>— The survey is valid for 30 days from the visit date. After 30 days, water chemistry and household needs can change; we may request a re-survey at no additional cost.</li>
              <li>— You are not obliged to share the survey report with any third party, and we will not without your consent.</li>
              <li>— If we determine that you do not need a Uniwater system, we will tell you so plainly.</li>
            </ul>
          </div>

          <div>
            <Heading level={2} className="mb-3">4. Quote, order, and payment.</Heading>
            <ul className="flex flex-col gap-3 text-body text-mute pl-5">
              <li>— Quotes are valid for 30 days from issue, unless explicitly extended in writing.</li>
              <li>— All prices on this website are indicative starting prices for residential systems. The final price is set after the survey and depends on your water chemistry, household demand, and install constraints.</li>
              <li>— Prices include GST at the prevailing rate (currently 18% for water-treatment systems) unless otherwise stated.</li>
              <li>— On order confirmation, we require 50% advance to schedule the installation. The balance is payable on the day of handover. Commercial / industrial / institutional payment milestones are agreed in writing per project.</li>
              <li>— Acceptable payment methods: UPI, Razorpay (cards, net banking), and direct bank transfer to the account named on the invoice. We do not accept cash for orders above ₹2,00,000 (per Income Tax Act §269ST).</li>
            </ul>
          </div>

          <div>
            <Heading level={2} className="mb-3">5. Installation.</Heading>
            <ul className="flex flex-col gap-3 text-body text-mute pl-5">
              <li>— Installation is carried out by Uniwater-employed engineers, not subcontracted. Timeline depends on system complexity (typically 1&ndash;7 working days for residential; longer for commercial).</li>
              <li>— You are responsible for: (a) safe site access; (b) civil readiness (plant-room construction, plumbing routes, electrical points, drain availability); (c) any building approvals or society consents required.</li>
              <li>— Where the design depends on inputs you provide (e.g. drawings, pipe layouts), accuracy is your responsibility; modifications during install due to wrong-input may incur additional charges.</li>
              <li>— On commissioning, you and the engineer sign a handover document confirming the system meets the spec.</li>
            </ul>
          </div>

          <div>
            <Heading level={2} className="mb-3">6. Warranty.</Heading>
            <ul className="flex flex-col gap-3 text-body text-mute pl-5">
              <li>— Standard product warranty: 12 months from the date of handover, against manufacturing defect in vessels, control heads, pumps, and Uniwater-supplied components.</li>
              <li>— Extended warranties: available on selected products as written addenda to the order.</li>
              <li>— Excluded from warranty: damage from upstream water-quality changes (e.g. switching from municipal to borewell after install) without notifying us; consumables (media, resin, cartridges, filters) which are time- and use-based; damage from unauthorised tampering or modification; force majeure events.</li>
              <li>— Component manufacturers&rsquo; own warranties (e.g. Wilo pumps, Hydranautics membranes) pass through to you on standard manufacturer terms.</li>
              <li>— Warranty claims: write to <a href={`mailto:${CONTACT.emails.support}`} className="text-teal underline underline-offset-4">{CONTACT.emails.support}</a> with order number, photo, and description. We&rsquo;ll send an engineer within 5 working days (24 hours on Premium AMC).</li>
            </ul>
          </div>

          <div>
            <Heading level={2} className="mb-3">7. Annual Maintenance Contract (AMC).</Heading>
            <ul className="flex flex-col gap-3 text-body text-mute pl-5">
              <li>— Three AMC tiers are offered: Standard (quarterly visit), Comprehensive (monthly visit), Premium (monthly visit with 24-hour fault response and remote alerts). Indicative prices are published on /service and confirmed at handover.</li>
              <li>— AMC starts on day 31 after handover. The first 30 days are covered free under installation warranty.</li>
              <li>— You may upgrade or downgrade AMC tier annually at renewal. Mid-year changes are pro-rated.</li>
              <li>— AMC obliges us to perform the scheduled service visits and supply consumables per the tier&rsquo;s scope. You are responsible for granting safe site access and being available (or nominating someone) at the scheduled visit time.</li>
              <li>— Missed visits due to your unavailability are not made up at no cost; rescheduling fees may apply if the engineer was already dispatched.</li>
            </ul>
          </div>

          <div>
            <Heading level={2} className="mb-3">8. Cancellation and refund.</Heading>
            <ul className="flex flex-col gap-3 text-body text-mute pl-5">
              <li>— Order cancellation before installation begins: full refund of advance, less 5% processing fee.</li>
              <li>— Cancellation after installation has begun but before commissioning: refund of advance, less actual costs incurred (materials ordered, labour deployed, system already installed) — itemised and shared with you.</li>
              <li>— Once a system is commissioned and handed over, the sale is complete. Returns are not accepted unless the warranty clauses (section 6) apply.</li>
              <li>— AMC cancellation: 30 days&rsquo; written notice. Refund of any unused portion, pro-rated.</li>
              <li>— Refunds are processed within 14 working days of approval, to the original payment instrument.</li>
            </ul>
          </div>

          <div>
            <Heading level={2} className="mb-3">9. Website use.</Heading>
            <Body className="text-mute">
              You may use this website for personal, non-commercial purposes and to engage Uniwater. You may not: (a) scrape or systematically extract content; (b) interfere with the site&rsquo;s operation; (c) use the site or any form to send unsolicited communications; (d) reverse-engineer, decompile, or attempt to access any non-public part of the site. All content on this website &mdash; copy, images, infographics, brand marks &mdash; is the property of {SITE.legalName} unless attributed otherwise, and is protected by Indian copyright and trademark law.
            </Body>
          </div>

          <div>
            <Heading level={2} className="mb-3">10. Limitation of liability.</Heading>
            <Body className="text-mute">
              Uniwater&rsquo;s aggregate liability under any installation or service contract is limited to the amount you have paid us under that contract in the 12 months preceding the event giving rise to the claim. We are not liable for: (a) indirect, consequential, special, or punitive damages; (b) loss of business, revenue, or profits; (c) damage arising from use of the system outside its specification; (d) events beyond our reasonable control (force majeure, regulatory action, supply-chain disruption). Nothing in this clause limits our liability for death or personal injury caused by our negligence, or for any liability that cannot be excluded under Indian law.
            </Body>
          </div>

          <div>
            <Heading level={2} className="mb-3">11. Privacy and data.</Heading>
            <Body className="text-mute">
              Your personal data is governed by our <a href="/privacy" className="text-teal underline underline-offset-4">Privacy Policy</a>, which forms part of these terms. By engaging Uniwater, you accept the data-handling practices described there.
            </Body>
          </div>

          <div>
            <Heading level={2} className="mb-3">12. Governing law and dispute resolution.</Heading>
            <Body className="text-mute">
              These terms are governed by the laws of India. Any dispute arising out of or in connection with these terms or the services Uniwater provides will be referred to the exclusive jurisdiction of the courts at Kolkata, West Bengal. Before commencing any legal proceeding, the parties will attempt good-faith resolution through written communication and, if needed, mediation by a mutually-agreed mediator.
            </Body>
          </div>

          <div>
            <Heading level={2} className="mb-3">13. Changes to these terms.</Heading>
            <Body className="text-mute">
              We may update these terms from time to time. The &ldquo;Last updated&rdquo; date at the top indicates the most recent change. Material changes will be highlighted on this page for 30 days before they take effect and, where you are an active customer, communicated to you by email.
            </Body>
          </div>

          <div>
            <Heading level={2} className="mb-3">14. Contact.</Heading>
            <Body className="text-mute">
              Questions about these terms?{' '}
              <a href={`mailto:${CONTACT.emails.support}`} className="text-teal underline underline-offset-4">{CONTACT.emails.support}</a>{' '}
              or {CONTACT.phones[0]}. Registered office: {CONTACT.address.line1}, {CONTACT.address.city} {CONTACT.address.pin}.
            </Body>
          </div>

          <Caption className="text-mute italic mt-8 pt-8 border-t border-hairline">
            These terms are written against the Indian Consumer Protection Act 2019, the Sale of Goods Act 1930, and the IT Act 2000. We may update them as our practices evolve; the version in force at the time of contract governs that contract.
          </Caption>
        </div>
      </Section>
    </>
  );
}
