export function getHtmlTemplate(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{patient_name}} - Treatment Plan</title>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Reenie+Beanie&display=swap" rel="stylesheet">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Outfit', sans-serif;
      background-color: #FDFCF8;
      color: #292524;
      overflow-x: hidden;
    }

    /* Grain overlay */
    body::before {
      content: "";
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' seed='2' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.35'/%3E%3C/svg%3E");
      pointer-events: none;
      z-index: 50;
      mix-blend-mode: overlay;
      opacity: 0.35;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }

    /* Navigation */
    nav {
      display: flex;
      justify-content: center;
      padding: 40px 20px;
    }

    .nav-pill {
      display: inline-flex;
      gap: 30px;
      background: rgba(255, 255, 255, 0.8);
      backdrop-filter: blur(10px);
      padding: 12px 30px;
      border-radius: 50px;
      border: 1px solid rgba(41, 37, 36, 0.1);
    }

    .nav-pill a {
      text-decoration: none;
      color: #78716C;
      font-size: 14px;
      transition: color 0.3s;
    }

    .nav-pill a:hover {
      color: #FFB7B2;
    }

    /* Hamburger Menu */
    .hamburger {
      display: none;
      flex-direction: column;
      cursor: pointer;
      gap: 5px;
      background: none;
      border: none;
      padding: 10px;
    }

    .hamburger span {
      width: 25px;
      height: 3px;
      background-color: #292524;
      border-radius: 2px;
      transition: all 0.3s ease;
    }

    .hamburger.active span:nth-child(1) {
      transform: rotate(45deg) translate(10px, 10px);
    }

    .hamburger.active span:nth-child(2) {
      opacity: 0;
    }

    .hamburger.active span:nth-child(3) {
      transform: rotate(-45deg) translate(7px, -7px);
    }

    /* Mobile Navigation */
    .mobile-nav {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
      background: rgba(253, 252, 248, 0.98);
      backdrop-filter: blur(10px);
      flex-direction: column;
      justify-content: flex-start;
      padding-top: 80px;
      z-index: 999;
      gap: 0;
    }

    .mobile-nav.active {
      display: flex;
    }

    .mobile-nav a {
      padding: 20px 30px;
      text-decoration: none;
      color: #292524;
      font-size: 18px;
      border-bottom: 1px solid rgba(41, 37, 36, 0.1);
      transition: background-color 0.3s;
    }

    .mobile-nav a:hover {
      background-color: rgba(255, 183, 178, 0.1);
      color: #FFB7B2;
    }

    /* Hero Section */
    .hero {
      position: relative;
      padding: 80px 20px;
      text-align: center;
    }

    .hero-blob {
      position: absolute;
      top: -100px;
      right: 10%;
      width: 400px;
      height: 400px;
      background: radial-gradient(circle, rgba(255, 183, 178, 0.3) 0%, rgba(255, 183, 178, 0) 70%);
      border-radius: 50%;
      filter: blur(80px);
      z-index: -1;
    }

    .hero h1 {
      font-size: clamp(2.5rem, 8vw, 4.5rem);
      font-weight: 700;
      line-height: 1.1;
      margin-bottom: 20px;
      color: #292524;
    }

    .hero-accent {
      color: #FFB7B2;
      font-family: 'Reenie Beanie', cursive;
      font-size: 1.1em;
      font-weight: 400;
    }

    .hero p {
      font-size: 18px;
      color: #78716C;
      max-width: 600px;
      margin: 0 auto;
    }

    /* Trust Bar */
    .trust-bar {
      display: flex;
      justify-content: center;
      gap: 60px;
      padding: 60px 20px;
      flex-wrap: wrap;
    }

    .trust-item {
      text-align: center;
    }

    .trust-item-label {
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #78716C;
      margin-bottom: 8px;
      font-weight: 600;
    }

    .trust-item-value {
      font-size: 24px;
      font-weight: 700;
      color: #FFB7B2;
    }

    /* Patient Profile */
    .patient-profile {
      margin: 60px 0;
      padding: 40px;
      background: white;
      border-radius: 24px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
    }

    .patient-profile h2 {
      font-size: 24px;
      margin-bottom: 30px;
      color: #292524;
    }

    .profile-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 30px;
    }

    .profile-item {
      padding: 20px;
      background: #FDFCF8;
      border-radius: 12px;
      border-left: 4px solid #FFB7B2;
    }

    .profile-label {
      font-size: 12px;
      text-transform: uppercase;
      color: #78716C;
      margin-bottom: 8px;
      font-weight: 600;
      letter-spacing: 0.5px;
    }

    .profile-value {
      font-size: 16px;
      font-weight: 500;
      color: #292524;
    }

    /* Treatment Plans Grid */
    .treatment-plans {
      margin: 80px 0;
    }

    .section-label {
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #FFB7B2;
      margin-bottom: 20px;
      font-weight: 600;
    }

    .section-title {
      font-size: 36px;
      font-weight: 700;
      margin-bottom: 50px;
      color: #292524;
    }

    .plans-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 30px;
      margin-bottom: 60px;
    }

    .plan-card {
      background: white;
      border-radius: 20px;
      padding: 40px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
      border: 2px solid transparent;
      transition: all 0.3s ease;
      display: flex;
      flex-direction: column;
    }

    .plan-card:hover {
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.1);
      border-color: rgba(255, 183, 178, 0.3);
    }

    .plan-card.featured {
      border-color: #FFB7B2;
      background: rgba(255, 183, 178, 0.02);
      position: relative;
      transform: scale(1.02);
    }

    .plan-card.featured::before {
      content: "RECOMMENDED";
      position: absolute;
      top: -12px;
      left: 20px;
      background: #FFB7B2;
      color: white;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.5px;
    }

    .plan-title {
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 20px;
      color: #292524;
    }

    .plan-info {
      flex: 1;
      margin-bottom: 30px;
    }

    .plan-info-item {
      margin-bottom: 16px;
      font-size: 14px;
      color: #78716C;
    }

    .plan-info-label {
      font-weight: 600;
      color: #292524;
      display: block;
      margin-bottom: 4px;
    }

    .plan-price {
      font-size: 32px;
      font-weight: 700;
      color: #FFB7B2;
      margin-bottom: 30px;
    }

    .cta-button {
      background: #FFB7B2;
      color: white;
      border: none;
      padding: 16px 32px;
      border-radius: 50px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      text-decoration: none;
      display: block;
      text-align: center;
    }

    .cta-button:hover {
      background: #FF9D98;
      transform: scale(1.05);
    }

    /* IV Therapy Section */
    .iv-therapy {
      margin: 80px 0;
      padding: 60px 40px;
      background: linear-gradient(135deg, rgba(255, 183, 178, 0.05) 0%, rgba(230, 230, 250, 0.05) 100%);
      border-radius: 24px;
    }

    .therapy-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 30px;
      margin-top: 40px;
    }

    .therapy-card {
      text-align: center;
    }

    .therapy-emoji {
      font-size: 48px;
      margin-bottom: 12px;
    }

    .therapy-name {
      font-size: 16px;
      font-weight: 600;
      color: #292524;
      margin-bottom: 8px;
    }

    .therapy-description {
      font-size: 14px;
      color: #78716C;
      line-height: 1.5;
    }

    /* FAQ Section */
    .faq {
      margin: 80px 0;
    }

    .faq-items {
      max-width: 800px;
      margin: 0 auto;
    }

    .faq-item {
      margin-bottom: 20px;
      border-bottom: 1px solid rgba(41, 37, 36, 0.1);
    }

    .faq-question {
      padding: 24px 0;
      font-size: 16px;
      font-weight: 600;
      color: #292524;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      user-select: none;
    }

    .faq-question:hover {
      color: #FFB7B2;
    }

    .faq-toggle {
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      transition: transform 0.3s ease;
    }

    .faq-item.active .faq-toggle {
      transform: rotate(180deg);
    }

    .faq-answer {
      display: none;
      padding-bottom: 24px;
      font-size: 14px;
      color: #78716C;
      line-height: 1.7;
    }

    .faq-item.active .faq-answer {
      display: block;
    }

    /* CTA Section */
    .cta-section {
      margin: 100px 0 80px;
      text-align: center;
      padding: 60px 20px;
      background: white;
      border-radius: 24px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
    }

    .cta-section h2 {
      font-size: 36px;
      font-weight: 700;
      margin-bottom: 20px;
      color: #292524;
    }

    .cta-section p {
      font-size: 18px;
      color: #78716C;
      margin-bottom: 40px;
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
    }

    /* Footer */
    footer {
      background: #292524;
      color: white;
      padding: 60px 20px 40px;
      text-align: center;
    }

    .footer-content {
      max-width: 800px;
      margin: 0 auto 40px;
    }

    .disclaimer {
      font-size: 12px;
      color: rgba(255, 255, 255, 0.6);
      line-height: 1.6;
      margin-bottom: 30px;
    }

    .footer-links {
      display: flex;
      justify-content: center;
      gap: 30px;
      flex-wrap: wrap;
      margin-bottom: 30px;
    }

    .footer-links a {
      color: #FFB7B2;
      text-decoration: none;
      font-size: 14px;
      transition: color 0.3s;
    }

    .footer-links a:hover {
      color: white;
    }

    .footer-bottom {
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      padding-top: 30px;
      font-size: 12px;
      color: rgba(255, 255, 255, 0.4);
    }

    /* Responsive */
    @media (max-width: 768px) {
      nav {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        padding: 15px 20px;
        background: rgba(253, 252, 248, 0.95);
        backdrop-filter: blur(10px);
        z-index: 1000;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .nav-pill {
        display: none;
      }

      .hamburger {
        display: flex;
      }

      .hero {
        padding: 100px 20px 60px;
      }

      .hero h1 {
        font-size: 2rem;
      }

      .trust-bar {
        gap: 30px;
      }

      .plans-grid {
        grid-template-columns: 1fr;
      }

      .plan-card.featured {
        transform: scale(1);
      }

      .therapy-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  </style>
</head>
<body>
  <!-- Navigation -->
  <nav>
    <div class="nav-pill">
      <a href="#plans">Treatment Plans</a>
      <a href="#therapy">IV Therapy</a>
      <a href="#faq">FAQ</a>
    </div>
    <button class="hamburger" id="hamburger">
      <span></span>
      <span></span>
      <span></span>
    </button>
  </nav>

  <!-- Mobile Navigation -->
  <div class="mobile-nav" id="mobileNav">
    <a href="#plans">Treatment Plans</a>
    <a href="#therapy">IV Therapy</a>
    <a href="#faq">FAQ</a>
  </div>

  <div class="container">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-blob"></div>
      <h1>
        {{patient_name}}
        <br>
        <span class="hero-accent">Personalized Treatment</span>
      </h1>
      <p>{{treatment_overview}}</p>
    </section>

    <!-- Trust Bar -->
    <div class="trust-bar">
      <div class="trust-item">
        <div class="trust-item-label">Clinic</div>
        <div class="trust-item-value">{{company}}</div>
      </div>
      <div class="trust-item">
        <div class="trust-item-label">Treatment Options</div>
        <div class="trust-item-value">{{treatment_option_count}}</div>
      </div>
      <div class="trust-item">
        <div class="trust-item-label">Therapy Components</div>
        <div class="trust-item-value">{{micronutrient_count}}</div>
      </div>
    </div>

    <!-- Patient Profile -->
    <div class="patient-profile">
      <h2>Patient Information</h2>
      <div class="profile-grid">
        <div class="profile-item">
          <div class="profile-label">Patient Name</div>
          <div class="profile-value">{{patient_name}}</div>
        </div>
        <div class="profile-item">
          <div class="profile-label">Email</div>
          <div class="profile-value">{{patient_email}}</div>
        </div>
        <div class="profile-item">
          <div class="profile-label">Medical Facility</div>
          <div class="profile-value">{{company}}</div>
        </div>
      </div>
    </div>

    <!-- Treatment Plans -->
    <section class="treatment-plans" id="plans">
      <div class="section-label">Your Options</div>
      <h2 class="section-title">Treatment Plans</h2>
      <div class="plans-grid">
        {{treatment_options_html}}
      </div>
    </section>

    <!-- IV Therapy Section -->
    <section class="iv-therapy" id="therapy">
      <div class="section-label">Therapy Components</div>
      <h2 class="section-title">Micronutrient Therapy</h2>
      <div class="therapy-grid">
        {{micronutrient_therapy_html}}
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="faq" id="faq">
      <div class="section-label">Questions</div>
      <h2 class="section-title">FAQ</h2>
      <div class="faq-items">
        {{faq_items_html}}
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <h2>Ready to Get Started?</h2>
      <p>Choose your personalized treatment plan and proceed to secure payment</p>
    </section>
  </div>

  <!-- Footer -->
  <footer>
    <div class="footer-content">
      <div class="disclaimer">
        <strong>Medical Disclaimer:</strong> This treatment plan has been prepared by qualified medical professionals at {{company}}. This information is for educational purposes only and does not constitute medical advice. Please consult with your healthcare provider before beginning any treatment. Results may vary based on individual health conditions and lifestyle factors.
      </div>
      <div class="footer-links">
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Service</a>
        <a href="#">Contact</a>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; {{year}} {{company}}. All rights reserved. | Powered by Treatment Plan Generator</p>
    </div>
  </footer>

  <script>
    // Hamburger menu toggle
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobileNav');

    if (hamburger && mobileNav) {
      hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileNav.classList.toggle('active');
      });

      // Close menu when clicking on a link
      mobileNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          hamburger.classList.remove('active');
          mobileNav.classList.remove('active');
        });
      });

      // Close menu when clicking outside
      document.addEventListener('click', (event) => {
        if (!event.target.closest('nav') && !event.target.closest('.mobile-nav')) {
          hamburger.classList.remove('active');
          mobileNav.classList.remove('active');
        }
      });
    }

    // FAQ toggle
    document.querySelectorAll('.faq-question').forEach(question => {
      question.addEventListener('click', () => {
        const item = question.parentElement;
        item.classList.toggle('active');
      });
    });
  </script>
</body>
</html>`;
}

export interface TreatmentOption {
  title: string;
  duration: string;
  stem_cell_quantity: string;
  exosome_quantity: string;
  micronutrient_therapy: string;
  protocol_details: string;
  pricing: number;
  stripe_payment_link: string;
  recommended: boolean;
}

export interface MicronutrientTherapy {
  name: string;
  emoji: string;
  description: string;
}

export interface ExtractedPlanData {
  patient_name: string;
  patient_email: string;
  company: string;
  treatment_overview: string;
  treatment_options: TreatmentOption[];
  micronutrient_therapy: MicronutrientTherapy[];
}

export function fillTemplate(
  template: string,
  data: ExtractedPlanData & { stripe_links: Record<number, string> }
): string {
  let html = template;

  // Basic replacements
  html = html.replace(/{{patient_name}}/g, data.patient_name || "Patient");
  html = html.replace(/{{patient_email}}/g, data.patient_email || "Not provided");
  html = html.replace(/{{company}}/g, data.company || "Medical Facility");
  html = html.replace(/{{treatment_overview}}/g, data.treatment_overview || "");
  html = html.replace(/{{year}}/g, new Date().getFullYear().toString());
  html = html.replace(/{{treatment_option_count}}/g, data.treatment_options.length.toString());
  html = html.replace(/{{micronutrient_count}}/g, data.micronutrient_therapy.length.toString());

  // Treatment options grid
  const treatmentOptionsHtml = data.treatment_options
    .map((option, idx) => {
      const stripeLink = data.stripe_links[idx] || "#";
      const featured = option.recommended ? "featured" : "";
      return `
        <div class="plan-card ${featured}">
          <div class="plan-title">${option.title}</div>
          <div class="plan-info">
            <div class="plan-info-item">
              <span class="plan-info-label">Duration:</span>
              ${option.duration}
            </div>
            <div class="plan-info-item">
              <span class="plan-info-label">Stem Cells:</span>
              ${option.stem_cell_quantity}
            </div>
            <div class="plan-info-item">
              <span class="plan-info-label">Exosomes:</span>
              ${option.exosome_quantity}
            </div>
            <div class="plan-info-item">
              <span class="plan-info-label">Protocol:</span>
              ${option.protocol_details}
            </div>
          </div>
          <div class="plan-price">$${option.pricing.toLocaleString()}</div>
          <a href="${stripeLink}" class="cta-button">Select This Plan</a>
        </div>
      `;
    })
    .join("");
  html = html.replace("{{treatment_options_html}}", treatmentOptionsHtml);

  // Micronutrient therapy
  const micronutrientHtml = data.micronutrient_therapy
    .map(
      (nutrient) => `
        <div class="therapy-card">
          <div class="therapy-emoji">${nutrient.emoji}</div>
          <div class="therapy-name">${nutrient.name}</div>
          <div class="therapy-description">${nutrient.description}</div>
        </div>
      `
    )
    .join("");
  html = html.replace("{{micronutrient_therapy_html}}", micronutrientHtml);

  // FAQ (default questions)
  const faqItems = [
    {
      question: "What are stem cells and how do they work in this treatment?",
      answer:
        "Stem cells are undifferentiated cells capable of self-renewal and differentiation. In regenerative medicine, they promote healing by reducing inflammation, supporting tissue repair, and enhancing the body's natural healing processes.",
    },
    {
      question: "What are exosomes and why are they important?",
      answer:
        "Exosomes are tiny extracellular vesicles that carry bioactive molecules. They enhance the therapeutic effects of stem cell treatment by improving cellular communication, reducing inflammation, and supporting tissue regeneration.",
    },
    {
      question: "How long does the treatment take and what can I expect?",
      answer:
        "Treatment duration varies based on your selected plan. Most patients experience initial improvements within weeks, with optimal results appearing over 2-3 months. Your medical team will provide detailed timeline expectations during your consultation.",
    },
  ];

  const faqHtml = faqItems
    .map(
      (item) => `
        <div class="faq-item">
          <div class="faq-question">
            <span>${item.question}</span>
            <div class="faq-toggle">▼</div>
          </div>
          <div class="faq-answer">${item.answer}</div>
        </div>
      `
    )
    .join("");
  html = html.replace("{{faq_items_html}}", faqHtml);

  return html;
}
