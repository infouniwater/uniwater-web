import type { Metadata } from 'next';
import { Section } from '@/components/ui/Section';
import { Eyebrow, Display, Heading, Body, Caption } from '@/components/ui/Typography';
import { SITE, CONTACT } from '@/content/site';

export const metadata: Metadata = {
  title: 'Privacy policy',
  description: 'How UNIWATER collects, uses, and protects the personal information you share through the site, the survey form, and the service relationship.',
};

/**
 * Privacy policy — drafted in-house to be DPDP Act 2023 aligned. To be
 * reviewed by legal counsel before launch (clear-cut compliance language
 * is fine; representations about retention, grievance officer, and
 * cross-border transfer require sign-off).
 */
export default function PrivacyPage() {
  return (
    <>
      <section className="bg-offwhite border-b border-hairline">
        <div className="container-uw py-16 md:py-24 max-w-4xl">
          <Eyebrow className="mb-4">Privacy</Eyebrow>
          <Display>Privacy policy.</Display>
          <Caption className="text-mute mt-6">
            Effective from 1 June 2026. Last updated: 19 May 2026. Aligned with the Digital Personal Data Protection Act, 2023 (India).
          </Caption>
        </div>
      </section>

      <Section padding="default">
        <div className="max-w-reading mx-auto flex flex-col gap-10">
          <Body className="text-mute text-lede font-light">
            {SITE.legalName} (&ldquo;Uniwater&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) operates {SITE.domain} and provides residential and commercial water-treatment products and services across India and Nepal. This policy explains what personal data we collect, why we collect it, how long we keep it, who we share it with, and how you can exercise your rights.
          </Body>

          <div>
            <Heading level={2} className="mb-3">1. What personal data we collect.</Heading>
            <Body className="text-mute mb-4">
              We collect the following categories of personal data, only when you choose to share them with us:
            </Body>
            <ul className="flex flex-col gap-3 text-body text-mute pl-5">
              <li>— <span className="text-navy font-medium">Identity:</span> name, salutation, profession (when relevant).</li>
              <li>— <span className="text-navy font-medium">Contact:</span> mobile number, email address, postal address, locality, pincode.</li>
              <li>— <span className="text-navy font-medium">Property &amp; water context:</span> property type (apartment / villa / institutional), bedrooms, bathrooms, water source (municipal / borewell / mixed), reported symptoms, and any water-test results you share.</li>
              <li>— <span className="text-navy font-medium">B2B / RFQ data:</span> organisation name, application, capacity required, site location, project timeline, drawings or test reports you email to us.</li>
              <li>— <span className="text-navy font-medium">Service history:</span> once you become a customer, the date, parameters, and outcome of every monthly service visit; the engineer assigned; the AMC tier in force.</li>
              <li>— <span className="text-navy font-medium">Technical:</span> IP address, browser type, device, pages viewed, referring URL. Collected via cookies and analytics (see section 8).</li>
            </ul>
            <Body className="text-mute mt-4">
              We do not knowingly collect personal data from children under the age of 18. If a child&rsquo;s data has been provided to us, please contact our Grievance Officer (section 11) and we will delete it.
            </Body>
          </div>

          <div>
            <Heading level={2} className="mb-3">2. Why we collect it (purposes).</Heading>
            <Body className="text-mute mb-3">
              We process personal data for the following specific, lawful purposes, in line with Section 4 of the DPDP Act:
            </Body>
            <ul className="flex flex-col gap-3 text-body text-mute pl-5">
              <li>— To schedule and conduct your free water survey at your property.</li>
              <li>— To prepare a tailored system design, bill of materials, and quote.</li>
              <li>— To install, commission, and hand over the water system you purchase.</li>
              <li>— To provide monthly service visits, prepare service reports, and maintain your system over the life of the contract.</li>
              <li>— To respond to enquiries, RFQs, and remote-survey submissions.</li>
              <li>— To send service confirmations, renewal reminders, and AMC notices.</li>
              <li>— To comply with applicable Indian tax, accounting, consumer-protection, and legal-record-keeping requirements.</li>
              <li>— To improve the website and our service quality (analytics, anonymised).</li>
            </ul>
            <Body className="text-mute mt-4">
              We will not use your data for any purpose materially different from the one for which it was collected without your specific consent.
            </Body>
          </div>

          <div>
            <Heading level={2} className="mb-3">3. Legal basis (consent).</Heading>
            <Body className="text-mute">
              Where you submit a form on this website, you provide explicit, informed, free, specific, and unambiguous consent for us to process the data you share, for the purposes listed in section 2. Where we process service-history data, the basis is the contract between you and Uniwater. You may withdraw consent at any time (see section 6); withdrawal does not affect lawful processing already carried out.
            </Body>
          </div>

          <div>
            <Heading level={2} className="mb-3">4. How long we keep your data (retention).</Heading>
            <ul className="flex flex-col gap-3 text-body text-mute pl-5">
              <li>— <span className="text-navy font-medium">Form submissions where no customer relationship follows:</span> 24 months from submission, after which they are deleted or anonymised.</li>
              <li>— <span className="text-navy font-medium">Customer records and service history:</span> for the life of the service contract plus 7 years (to comply with Indian tax, accounting, and consumer-protection record-keeping requirements).</li>
              <li>— <span className="text-navy font-medium">Marketing communication preferences:</span> until you withdraw consent or 24 months from the last interaction.</li>
              <li>— <span className="text-navy font-medium">Analytics and cookie data:</span> aggregated and retained for a maximum of 26 months.</li>
            </ul>
          </div>

          <div>
            <Heading level={2} className="mb-3">5. Who we share data with.</Heading>
            <Body className="text-mute mb-3">
              We do not sell, rent, or trade personal information. We share data only with the following parties, only as needed for the purposes in section 2:
            </Body>
            <ul className="flex flex-col gap-3 text-body text-mute pl-5">
              <li>— <span className="text-navy font-medium">Odoo SaaS (CRM):</span> our customer-relationship system. Lead, customer, and service-visit data is stored here. Odoo S.A. (Belgium) is the data processor; data is stored in Odoo&rsquo;s data centres. <span className="italic">Cross-border transfer note:</span> data may be processed outside India. By submitting a form you consent to this transfer.</li>
              <li>— <span className="text-navy font-medium">Vercel and Cloudflare:</span> website hosting and CDN. They process technical metadata (IP, request headers); no form-submission data is stored on their infrastructure.</li>
              <li>— <span className="text-navy font-medium">Google Analytics 4 and Google Tag Manager:</span> aggregated website analytics. No PII shared (see section 8).</li>
              <li>— <span className="text-navy font-medium">WhatsApp Business (Meta):</span> when you initiate a chat with us via the WhatsApp link, the conversation is governed by WhatsApp&rsquo;s own privacy policy.</li>
              <li>— <span className="text-navy font-medium">Legal authorities:</span> if compelled by a valid Indian court order, government notice, or law-enforcement request.</li>
              <li>— <span className="text-navy font-medium">Field engineers and service partners:</span> only the data needed for them to deliver your service visit (your address, contact, system configuration, service history).</li>
            </ul>
          </div>

          <div>
            <Heading level={2} className="mb-3">6. Your rights (as a Data Principal under the DPDP Act).</Heading>
            <Body className="text-mute mb-3">
              You have the following rights with respect to your personal data:
            </Body>
            <ul className="flex flex-col gap-3 text-body text-mute pl-5">
              <li>— <span className="text-navy font-medium">Right to access:</span> request a copy of the personal data we hold about you.</li>
              <li>— <span className="text-navy font-medium">Right to correction:</span> ask us to correct inaccurate or incomplete data.</li>
              <li>— <span className="text-navy font-medium">Right to erasure:</span> ask us to delete your data, subject to our retention obligations under section 4.</li>
              <li>— <span className="text-navy font-medium">Right to withdraw consent:</span> withdraw consent for any processing you previously authorised.</li>
              <li>— <span className="text-navy font-medium">Right to nominate:</span> nominate another person to exercise your rights in the event of death or incapacity.</li>
              <li>— <span className="text-navy font-medium">Right to grievance redressal:</span> raise a grievance with our Grievance Officer (section 11). If unresolved within 30 days, you may approach the Data Protection Board of India.</li>
            </ul>
            <Body className="text-mute mt-4">
              To exercise any right, email <a href={`mailto:${CONTACT.emails.support}`} className="text-teal underline underline-offset-4">{CONTACT.emails.support}</a> with the subject &ldquo;DPDP request — [your name]&rdquo;. We will respond within 30 days.
            </Body>
          </div>

          <div>
            <Heading level={2} className="mb-3">7. How we secure your data.</Heading>
            <Body className="text-mute">
              We use industry-standard safeguards: TLS encryption for all data in transit, restricted access controls within our CRM, strong-password and 2FA requirements for staff accounts, encrypted storage of customer files at rest, and a documented incident-response procedure. Despite these measures, no transmission over the internet is fully secure; we cannot guarantee absolute security. If we become aware of a personal-data breach affecting your data, we will notify you and the Data Protection Board of India within the statutory timeframe.
            </Body>
          </div>

          <div>
            <Heading level={2} className="mb-3">8. Cookies and analytics.</Heading>
            <Body className="text-mute">
              We use essential cookies to maintain session state (e.g. the pincode-serviceability check, the exit-intent state). We use analytics cookies via Google Analytics 4 to understand aggregated visitor behaviour — these can be declined via your browser&rsquo;s cookie controls. We do not use behavioural-advertising cookies or third-party retargeting pixels. We do not transfer your IP address in identifiable form to Google; IP anonymisation is enabled.
            </Body>
          </div>

          <div>
            <Heading level={2} className="mb-3">9. Cross-border transfer.</Heading>
            <Body className="text-mute">
              Our CRM (Odoo SaaS) and hosting infrastructure (Vercel) may store and process data outside India, in countries with data-protection regimes that may differ from India&rsquo;s. By submitting a form you consent to such transfer. We require all data processors to maintain contractual safeguards consistent with the DPDP Act.
            </Body>
          </div>

          <div>
            <Heading level={2} className="mb-3">10. Changes to this policy.</Heading>
            <Body className="text-mute">
              We may update this policy from time to time. The &ldquo;Last updated&rdquo; date at the top of the page indicates when the most recent change was made. Material changes will be highlighted on this page for 30 days before they take effect.
            </Body>
          </div>

          <div>
            <Heading level={2} className="mb-3">11. Grievance officer.</Heading>
            <Body className="text-mute">
              Designated under Section 8(9) of the DPDP Act, 2023:
            </Body>
            <ul className="mt-3 flex flex-col gap-1 text-body text-navy">
              <li>Grievance Officer — {SITE.legalName}</li>
              <li>{CONTACT.address.line1}</li>
              <li>{CONTACT.address.city} {CONTACT.address.pin}, India</li>
              <li>Email: <a href={`mailto:${CONTACT.emails.support}`} className="text-teal underline underline-offset-4">{CONTACT.emails.support}</a></li>
              <li>Phone: {CONTACT.phones[0]}</li>
              <li>Response time: 30 days from receipt of a written grievance.</li>
            </ul>
          </div>

          <div>
            <Heading level={2} className="mb-3">12. Contact us.</Heading>
            <Body className="text-mute">
              General questions about this policy, our practices, or your data:
              {' '}<a href={`mailto:${CONTACT.emails.support}`} className="text-teal underline underline-offset-4">{CONTACT.emails.support}</a>
              {' '}or {CONTACT.phones[0]}.
            </Body>
          </div>

          <Caption className="text-mute italic mt-8 pt-8 border-t border-hairline">
            This privacy policy was drafted in-house against the Digital Personal Data Protection Act, 2023. It is a working draft pending review by retained legal counsel. Material representations about retention periods, grievance-officer designation, and cross-border data transfer will be reconfirmed before public launch.
          </Caption>
        </div>
      </Section>
    </>
  );
}
