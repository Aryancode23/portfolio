# Aryan Singh (Max) — Premium Portfolio

A cinematic, motion-heavy portfolio built with plain HTML, CSS and JavaScript.

## Run it

1. Open this folder in VS Code.
2. Install the **Live Server** extension if you don't already have it.
3. Right-click `index.html` → **Open with Live Server**.

No npm/build step is required.

## What changed in this pass

- **Identity**: presented as Aryan Singh, going by Max — introduced in the hero photo badge and the About section.
- **Certificate privacy**: the certificate image now shown is `assets/copa-certificate-redacted.png`, with date of birth, parents' names, registration number and home address blanked out. Name, trade, institute, dates and the certificate number are still visible so it reads as genuine. The original, unredacted certificate was **not** included in this export — if you need it, keep it somewhere private and never swap it back into the live site.
- **Projects reframed** as personal learning experiments rather than shipped products (copy updated across all four project cards and the Work section intro).
- **Skills** replaced with exactly: HTML, Python, UI / Web Designing, Teaching, Problem Solving, Leadership.
- **Profile photo** is now circular (pure CSS — `border-radius: 50%` with `object-fit: cover`), with an "AKA MAX" badge and the existing orbit rings around it.
- **New "Journey" section** between Skills and the manifesto — a scroll-animated timeline (Aug 2025 → now) with a line that fills and a glowing dot that travels down it as you scroll.
- **Contact section rebuilt**: GitHub (`Aryancode23`), Instagram (`@max_aryan_1`) and Gmail (`ind23234589@gmail.com`) links with icons, plus a real contact form.

## About the contact form

The form posts to [FormSubmit](https://formsubmit.co) (`https://formsubmit.co/ind23234589@gmail.com`), a free service that forwards form submissions to an inbox with no backend or signup required. JavaScript submits it in the background so visitors see an inline "Message sent" note instead of leaving the page.

**One-time setup:** the *first* message anyone sends will trigger an activation email from FormSubmit to `ind23234589@gmail.com`. Open that email and click the confirmation link once — after that, every future submission is forwarded automatically. Until it's confirmed, the first submission won't arrive as an actual email (the sender won't be told this).

If you'd rather not depend on a third-party service, swap the form's `action` for your own backend, Formspree, or a `mailto:` link.

## Before publishing

- Double-check `assets/copa-certificate-redacted.png` doesn't need any further redaction for your comfort (e.g. the certificate number or QR code) before it goes live publicly.
- Confirm the GitHub, Instagram and Gmail links are correct and active.
- Update project descriptions if a project status has changed since writing.

## Included

- Animated intro loader
- Kinetic typography
- Infinite marquees
- Smooth scrolling with Lenis
- GSAP scroll animations, including a scroll-scrubbed timeline in the Journey section
- Magnetic buttons
- Custom cursor
- 3D hover tilt
- Animated statistics
- Interactive skill pills
- Circular profile photo with orbit rings
- Working contact form (FormSubmit) with inline status
- Responsive mobile layout
- Redacted COPA certificate section
