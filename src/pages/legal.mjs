/* Privacy Policy, Terms of Use, and Accessibility Statement.
   Names, location, contact email and effective date come from SITE.LEGAL in
   src/config.mjs. Read these pages after any change to how the site collects
   data (a new form, a new tool, a new payment method) and update them to match. */

import {url, SITE} from '../config.mjs';
import {PageHero} from '../lib/components.mjs';
import {LAUNCH} from '../data/training.mjs';

const L = SITE.LEGAL;
const mail = `<a href="mailto:${L.contactEmail}">${L.contactEmail}</a>`;

const doc = (sections) => `<section class="sec-tight"><div class="wrap-narrow legal">
  <p class="tiny muted">Effective ${L.effectiveDate}</p>
  ${sections.map(([h, body]) => `<h2>${h}</h2>${body}`).join('\n  ')}
</div></section>`;

export function viewPrivacy(){
  return PageHero('Privacy Policy','What we collect, and what we do with it',
    `Plain English, no surprises. ${L.operator} collects only what it needs to answer you, organize classes, and send the newsletter you asked for.`)
  + doc([
    ['Who we are', `<p>This website is operated by ${L.operator}, based in ${L.location}. In this policy, “we” and “us” mean ${L.operator}. Questions about your information go to ${mail}.</p>`],

    ['What we collect, form by form', `<ul>
      <li><strong>Class interest list</strong> (<a href="${url('/ai-training/join/')}">join page</a>): your name, email, learning group, role, organization (optional), the task you want help with, format preference, how many people may be interested, and location/time zone/availability (optional). If you arrived from a link that carries campaign tags (for example <code>utm_source</code>), we record those tags so we know which announcement worked. We never record anything else from the link.</li>
      <li><strong>Newsletter</strong>: your first name, email, and an optional topic of interest.</li>
      <li><strong>Contact form</strong>: your name, email, topic, and message.</li>
      <li><strong>Starting-point assessment</strong>: your answers stay in your browser. Nothing is sent to us.</li>
    </ul>
    <p>Please don’t put client records, student data, account numbers, health or financial details, or anything confidential into any form.</p>`],

    ['How we use it', `<ul>
      <li>To match you with a class group, tell you when ${LAUNCH.minimum} people have asked for your class, and confirm the date, format, and price.</li>
      <li>To reply to messages you send us.</li>
      <li>To send the newsletter and class announcements, only if you signed up for them. The interest list does not sign you up for the newsletter.</li>
    </ul>
    <p>We do not sell, rent, or trade your information, and we don’t use it for advertising.</p>`],

    ['Where it is stored and who helps us', `<p>We use a small number of service providers. Each only receives what it needs to do its job:</p>
    <ul>
      <li><strong>Cloudflare</strong> runs the form handler and stores submissions in a database in our Cloudflare account.</li>
      <li><strong>Resend</strong> sends us an email notification when a form is submitted, and sends email on our behalf.</li>
      <li><strong>Stripe</strong> processes payment when you enroll in a confirmed class. You pay on Stripe’s checkout page; we never see or store your card number. Stripe’s own privacy policy applies to that page.</li>
      <li><strong>GitHub Pages</strong> hosts the website itself.</li>
      <li><strong>Google Fonts and Unsplash</strong> currently serve the site’s typefaces and some photographs. Loading a page asks their servers for those files, which shares your IP address and browser type with them. We plan to host these files ourselves.</li>
    </ul>`],

    ['Cookies and analytics', `<p>This site sets no advertising or tracking cookies. ${SITE.ANALYTICS_TOKEN
      ? 'We use Cloudflare Web Analytics to count visits and see which pages are useful. It does not use cookies and does not identify you personally.'
      : 'If we add visit counting, we will use a cookieless, privacy-focused tool such as Cloudflare Web Analytics and update this page.'}</p>`],

    ['How long we keep it', `<p>We keep interest-list and contact details while they’re useful for organizing classes and answering you. Newsletter details are kept until you unsubscribe. You can ask us to delete your information at any time and we will do so promptly.</p>`],

    ['Your choices and rights', `<p>Email ${mail} to see what we hold about you, correct it, or have it deleted. Every newsletter includes an unsubscribe link. We’ll respond within 30 days, and usually much sooner.</p>`],

    ['Children', `<p>This site and our classes are intended for adults. We don’t knowingly collect information from children under 13. Family-learning content is meant to be used by a parent or guardian.</p>`],

    ['Changes to this policy', `<p>If we change how we handle information, we’ll update this page and the effective date above. Significant changes will be announced to people on our lists.</p>`]
  ]);
}

export function viewTerms(){
  return PageHero('Terms of Use','The ground rules for this site and our classes',
    `Short and readable. By using this website or enrolling in a class, you agree to these terms.`)
  + doc([
    ['About these terms', `<p>This website is operated by ${L.operator}, based in ${L.location}. Questions about these terms go to ${mail}.</p>`],

    ['Interest lists are not registration', `<p>Joining an interest list is free and doesn’t reserve a seat or commit you to anything. A class is scheduled when ${LAUNCH.minimum} people ask for the same class. We then send the date, length, format, tool requirements, and price, and you decide whether to enroll. We can’t guarantee that any particular class will be scheduled.</p>`],

    ['Prices, enrollment, and payment', `<p>Classes are typically ${LAUNCH.typicalPrice} per seat. The final price for each class is confirmed before you pay. Enrollment is complete when your payment through our Stripe checkout link succeeds. Seats are limited and are filled in the order payments are received.</p>`],

    ['Cancellations, rescheduling, and refunds', `<ul>
      <li><strong>If you cancel</strong> at least 48 hours before the class starts, you receive a full refund. Inside 48 hours, we’ll offer a seat in a future session of the same class instead.</li>
      <li><strong>If we cancel or reschedule</strong> and the new date doesn’t work for you, you receive a full refund.</li>
      <li>To cancel, email ${mail}. Refunds go back to the original payment method.</li>
    </ul>`],

    ['Educational content, not professional advice', `<p>Our classes, articles, prompts, and materials teach general skills for using AI tools. They are not legal, tax, financial, insurance, medical, or other professional advice. AI tools make mistakes. You are responsible for reviewing anything an AI tool produces before you rely on it or share it, and for following your employer’s or institution’s policies about which tools and data you may use.</p>`],

    ['Third-party AI tools', `<p>Classes use tools made by other companies (for example ChatGPT, Claude, Gemini, or Microsoft Copilot). Those companies’ terms and privacy policies apply when you use their tools, and some features may require your own paid account. We’ll tell you about any requirements before you enroll.</p>`],

    ['Using our materials', `<p>You’re welcome to use the free prompts, worksheets, and handouts for your own work and to share them with credit to ${L.operator}. Class materials are for enrolled participants. Please don’t resell or republish our content as your own.</p>`],

    ['Acceptable use', `<p>Please don’t misuse the site: no spam, automated form submissions, attempts to break security, or content that is unlawful or harassing. We may remove anyone from a class who disrupts it for others, with a prorated refund.</p>`],

    ['Limitation of liability', `<p>We work hard to keep the site and classes accurate and useful, but they are provided “as is.” To the extent the law allows, ${L.operator} is not liable for indirect or consequential losses arising from use of the site, our materials, or AI tools, and our total liability for any class is limited to the amount you paid for it.</p>`],

    ['Governing law and changes', `<p>These terms are governed by the laws of the State of ${L.governingState}. We may update them; the effective date above shows the current version, and the terms in place when you enroll apply to that class.</p>`]
  ]);
}

export function viewAccessibility(){
  return PageHero('Accessibility','Built to be usable by everyone',
    `Our learners include people of every age and ability. If anything on this site gets in your way, we want to know.`)
  + doc([
    ['Our goal', `<p>We aim for this website to meet the Web Content Accessibility Guidelines (WCAG) 2.2 at level AA.</p>`],

    ['What we’ve done', `<ul>
      <li>Every image has a text description, and every form field has a visible label.</li>
      <li>The site can be used with a keyboard alone, with a visible focus outline and a “Skip to content” link.</li>
      <li>Headings follow a logical order so screen readers can navigate by section.</li>
      <li>Animation is reduced when your device asks for reduced motion.</li>
    </ul>`],

    ['Known limitations', `<ul>
      <li>Some printable workshop handouts are PDFs that may not be fully tagged for screen readers. We’ll send an accessible version on request.</li>
      <li>Some smaller text, such as fine print and labels, is below our preferred size. We’re working on it.</li>
    </ul>`],

    ['Classes', `<p>If you need an accommodation for a class, such as captions, a larger-print handout, extra time, or a particular format, tell us on the interest form or by email and we’ll work it out with you before the class.</p>`],

    ['Contact us', `<p>Email ${mail} and describe the page and what got in the way. We’ll reply within five business days and offer the information in another format if we can’t fix the page right away.</p>`]
  ]);
}
