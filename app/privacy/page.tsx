import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read the Vexed Sports Privacy Policy. Learn how we collect, use, and protect your data when you play our free daily sports trivia games.",
  openGraph: { url: "https://vexedsports.com/privacy" },
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4" style={{ backgroundColor: "#2eaafd" }}>
      <div className="container mx-auto max-w-5xl">
        <div className="bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-2xl p-8 md:p-12 shadow-xl">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 text-center">Vexed Sports Privacy Policy</h1>
          <p className="text-white/70 text-center mb-8">Last Updated: November 5, 2025</p>

          <div className="space-y-6 text-white/90 leading-relaxed">
            <p>
              Welcome to Vexed Sports ("we", "our", or "us"). Your privacy is important to us. This Privacy Policy
              explains how we collect, use, and protect your personal information when you visit or interact with
              vexedsports.com and its related games and services (collectively, the "Site").
            </p>

            <p>By using Vexed Sports, you agree to the terms of this Privacy Policy.</p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">1. Information We Collect</h2>
            <p>We collect the following types of information to provide and improve your experience:</p>

            <h3 className="text-xl font-bold text-white mt-6 mb-3">a. Information You Provide</h3>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                <strong>Account Information:</strong> When you create an account, we collect your username, email
                address, and password.
              </li>
              <li>
                <strong>Profile Details:</strong> Optional information such as a profile photo, display name, and other
                preferences you choose to share.
              </li>
              <li>
                <strong>User Content:</strong> Any content you post, such as game answers, comments, or messages.
              </li>
              <li>
                <strong>Contact Information:</strong> When you reach out to us (e.g., support inquiries or feedback
                forms), we collect the information you provide.
              </li>
            </ul>

            <h3 className="text-xl font-bold text-white mt-6 mb-3">b. Automatically Collected Information</h3>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                <strong>Usage Data:</strong> Information about your interactions with the site, such as pages visited,
                games played, and time spent.
              </li>
              <li>
                <strong>Device & Technical Data:</strong> Browser type, operating system, IP address, and similar
                analytics information.
              </li>
              <li>
                <strong>Cookies & Tracking Technologies:</strong> We use cookies and similar technologies for
                authentication, analytics, and personalization.
              </li>
            </ul>

            <h3 className="text-xl font-bold text-white mt-6 mb-3">c. Third-Party Services</h3>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                <strong>Analytics:</strong> We use Google Analytics or similar tools to track engagement and improve
                site performance.
              </li>
              <li>
                <strong>Advertising:</strong> We may use Google AdSense, Freestar, or other ad networks that collect
                data through cookies and web beacons to serve personalized ads.
              </li>
              <li>
                <strong>Social Media Links:</strong> If you interact with social links or embeds (e.g., TikTok,
                YouTube), those platforms may collect information in accordance with their own privacy policies.
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">2. How We Use Your Information</h2>
            <p>We use your information to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Provide, maintain, and improve the Site and its games.</li>
              <li>Create and manage your user account.</li>
              <li>Personalize your experience and content.</li>
              <li>Display leaderboards, stats, and friend connections.</li>
              <li>Communicate with you (e.g., account updates, security alerts).</li>
              <li>Monitor for abuse, cheating, or violations of our Terms of Service.</li>
              <li>Comply with legal obligations and enforce our policies.</li>
            </ul>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">3. How We Share Information</h2>
            <p>We do not sell your personal data. We may share your information in limited situations:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                <strong>Service Providers:</strong> With trusted partners that help us operate the site (e.g., hosting,
                analytics, email, ads).
              </li>
              <li>
                <strong>Legal Requirements:</strong> When required by law, subpoena, or to protect our rights and users'
                safety.
              </li>
              <li>
                <strong>Business Changes:</strong> In the event of a merger, acquisition, or asset sale, your data may
                be transferred as part of that transaction.
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">4. Cookies and Tracking</h2>
            <p>Cookies are small files stored on your device. We use:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                <strong>Essential Cookies:</strong> Required for site functionality and login.
              </li>
              <li>
                <strong>Performance Cookies:</strong> To measure usage and performance (e.g., via Google Analytics).
              </li>
              <li>
                <strong>Advertising Cookies:</strong> To serve personalized ads where applicable.
              </li>
            </ul>
            <p className="mt-4">
              You can manage or disable cookies through your browser settings, but some features may not function
              properly without them.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">5. Data Retention</h2>
            <p>
              We retain your personal information for as long as necessary to provide our services and comply with legal
              obligations. You may request deletion of your account and associated data at any time by contacting us.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">6. Security</h2>
            <p>
              We take reasonable technical and organizational measures to protect your data against unauthorized access,
              loss, or misuse. However, no method of transmission over the internet is completely secure.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">7. Your Rights</h2>
            <p>Depending on your location, you may have rights to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Access, correct, or delete your personal information.</li>
              <li>Request data portability.</li>
              <li>Withdraw consent for certain processing activities.</li>
            </ul>
            <p className="mt-4">To exercise your rights, contact us using the details below.</p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">8. Children's Privacy</h2>
            <p>
              Vexed Sports is intended for users aged 13 and older. We do not knowingly collect data from children under
              13. If you believe a child has provided us information, please contact us immediately.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">9. International Users</h2>
            <p>
              Our servers are hosted in North America. If you access the site from outside Canada or the U.S., your data
              may be transferred and processed in these countries.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">10. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy periodically. The "Last Updated" date at the top indicates the latest
              version. Continued use of the Site after any update constitutes acceptance of the revised policy.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">11. Contact Us</h2>
            <p>If you have any questions or requests about this Privacy Policy, you can contact us at:</p>
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
