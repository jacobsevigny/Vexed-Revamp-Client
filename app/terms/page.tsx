import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Read the Vexed Sports Terms of Service. Understand the rules and guidelines for using our free daily sports trivia platform.",
  openGraph: { url: "https://vexedsports.com/terms" },
}

export default function TermsPage() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4" style={{ backgroundColor: "#2eaafd" }}>
      <div className="container mx-auto max-w-5xl">
        <div className="bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-2xl p-8 md:p-12 shadow-xl">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 text-center">
            Vexed Sports – Terms and Conditions
          </h1>
          <p className="text-white/70 text-center mb-8">Last Updated: November 5, 2025</p>

          <div className="space-y-6 text-white/90 leading-relaxed">
            <p>
              Welcome to Vexed Sports ("Vexed Sports", "we", "our", or "us"). These Terms and Conditions ("Terms")
              govern your access to and use of vexedsports.com and any related games, leaderboards, or features
              (collectively, the "Site" or "Service").
            </p>

            <p>
              By accessing or using Vexed Sports, you agree to these Terms and our Privacy Policy. If you do not agree,
              please do not use the Site.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">1. Eligibility</h2>
            <p>You must be at least 13 years old to use Vexed Sports.</p>
            <p>
              If you are under 18, you may only use the Site with the consent of a parent or legal guardian who agrees
              to these Terms on your behalf.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">2. Your Account</h2>
            <p>To access certain features, you may be required to create an account.</p>
            <p>By creating an account, you agree to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Provide accurate and complete information.</li>
              <li>Keep your login credentials secure.</li>
              <li>Be responsible for all activity under your account.</li>
            </ul>
            <p className="mt-4">
              We reserve the right to suspend or terminate accounts that violate these Terms or engage in suspicious,
              abusive, or fraudulent behavior.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">3. Acceptable Use</h2>
            <p>You agree to use Vexed Sports only for lawful purposes and to respect other users. You must not:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Use cheats, bots, or scripts to gain unfair advantages.</li>
              <li>Upload or share inappropriate, harmful, or misleading content.</li>
              <li>Attempt to hack, exploit, or reverse engineer any part of the Site.</li>
              <li>Interfere with the operation, security, or integrity of the Site.</li>
              <li>Impersonate another person or misrepresent your affiliation.</li>
            </ul>
            <p className="mt-4">
              We reserve the right to remove content or restrict access if we believe you have violated these rules.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">4. Intellectual Property</h2>
            <p>
              All content on Vexed Sports — including logos, design, text, images, games, databases, and code — is owned
              or licensed by us and protected by copyright and intellectual property laws.
            </p>
            <p className="mt-4">You may:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Access and use the Site for personal, non-commercial purposes.</li>
            </ul>
            <p className="mt-4">You may not:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Copy, modify, distribute, or publicly display our content without written permission.</li>
              <li>Use our name, logo, or branding for any commercial purpose without authorization.</li>
            </ul>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">5. User Content</h2>
            <p>
              When you post or submit content (such as trivia answers, comments, or messages), you grant us a
              non-exclusive, royalty-free, worldwide license to use, display, and distribute that content as necessary
              to operate and improve the Site.
            </p>
            <p className="mt-4">
              You retain ownership of your content but are responsible for ensuring it does not infringe the rights of
              others or violate any laws.
            </p>
            <p className="mt-4">
              We reserve the right to remove any content that we consider inappropriate or in violation of these Terms.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">6. Disclaimer of Warranties</h2>
            <p>
              Vexed Sports is provided "as is" and "as available" without warranties of any kind, either express or
              implied. We do not guarantee that:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>The Site will always be available, error-free, or secure.</li>
              <li>The content is accurate, reliable, or complete.</li>
            </ul>
            <p className="mt-4">Your use of the Site is at your own risk.</p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">7. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, Vexed Sports and its team are not liable for any indirect,
              incidental, or consequential damages resulting from your use of (or inability to use) the Site — including
              but not limited to loss of data, revenue, or goodwill.
            </p>
            <p className="mt-4">
              If you are dissatisfied with any part of the Site, your sole remedy is to stop using it.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">8. Third-Party Links and Services</h2>
            <p>
              Vexed Sports may contain links or integrations with third-party sites (such as TikTok, YouTube, or
              advertising networks). We are not responsible for the content, policies, or practices of those third
              parties. Your interactions with them are governed by their own terms and privacy policies.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">9. Advertising and Sponsorships</h2>
            <p>We may display ads through partners like Google AdSense, Freestar, or others.</p>
            <p>By using the Site, you acknowledge that:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Ads may be personalized based on cookies or device data.</li>
              <li>We do not control the content of third-party ads.</li>
              <li>Clicking on ads or sponsored links takes you to external sites beyond our control.</li>
            </ul>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">10. Termination</h2>
            <p>
              We reserve the right to suspend or terminate your account or access at any time, with or without notice,
              for conduct that violates these Terms or is otherwise harmful to the Site or other users.
            </p>
            <p className="mt-4">Upon termination:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Your right to use the Site ceases immediately.</li>
              <li>
                Certain provisions (such as Intellectual Property, Limitation of Liability, and Governing Law) will
                continue to apply.
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">11. Indemnification</h2>
            <p>
              You agree to indemnify and hold harmless Vexed Sports, its affiliates, and team members from any claims,
              damages, or expenses (including legal fees) arising from:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Your use of the Site,</li>
              <li>Your content or actions,</li>
              <li>Or your violation of these Terms or any applicable law.</li>
            </ul>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">12. Changes to These Terms</h2>
            <p>
              We may modify these Terms at any time. Updates will be posted on this page with a new "Last Updated" date.
              Your continued use of the Site after changes means you accept the revised Terms.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">13. Governing Law</h2>
            <p>
              These Terms are governed by the laws of Ontario, Canada, without regard to its conflict of law principles.
              Any disputes will be handled in the courts located in Ottawa, Ontario.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">14. Contact Us</h2>
            <p>For questions about these Terms, please contact us at:</p>
            <p className="mt-4">
              📧{" "}
              <a href="mailto:contact@vexedsports.com" className="text-white hover:underline">
                contact@vexedsports.com
              </a>
            </p>
            <p>
              🌐{" "}
              <a
                href="https://vexedsports.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:underline"
              >
                https://vexedsports.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
