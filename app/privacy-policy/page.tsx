import type { Metadata } from "next"

export const metadata: Metadata = {
	title: "Privacy Policy — KazCheck Safety",
	description: "How KazCheck Safety collects, uses, and protects your personal data.",
}

const LAST_UPDATED = "May 15, 2025"
const APP_NAME = "Tekser"
const COMPANY = "TekserTeam"
const CONTACT_EMAIL = "abdurrauf.sakenov@proton.me"

const sections = [
	{
		id: "overview",
		title: "Overview",
		content: `${APP_NAME} (also known as ${COMPANY}) is a mobile safety application available on Android and iOS, designed to help users in Kazakhstan identify and report phone scams, financial fraud, and spam calls. This Privacy Policy explains what personal data we collect, why we collect it, how it is used, and your rights regarding that data. By using the app, you agree to the practices described in this document.`,
	},
	{
		id: "data-collected",
		title: "Data We Collect",
		items: [
			{
				label: "Phone Number & Full Name",
				text: "When you register or log in, we collect your phone number and full name. The phone number is used for authentication via One-Time Password (OTP). Your name is used to personalize your experience within the app. We do not sell or share this information with third parties for marketing purposes.",
			},
			{
				label: "Phone Numbers You Check",
				text: "When you manually enter a phone number to verify its risk level, that query is logged in our database under your account. This is used to enforce subscription plan limits (free vs. premium), maintain your personal search history, and improve our fraud detection models over time.",
			},
			{
				label: "Community Reports",
				text: "When you submit a report about a suspicious number, we collect the phone number being reported, the fraud category you selected (e.g., spam, scam, credit fraud, investment fraud), the region you specify, and any text description you provide. These reports are used to calculate risk scores and populate the scam statistics shown within the app.",
			},
			{
				label: "AI Chat History",
				text: "Our in-app AI Support Assistant (powered by Google Gemini 2.5 Flash) stores your chat interactions in our database to maintain conversational context. Chat data is processed securely via our backend and is not used to train third-party AI models. Only your chat messages are shared with the AI provider — no other personal data is sent.",
			},
			{
				label: "App Activity & Usage",
				text: "We track how many phone numbers you have checked and how many reports you have submitted within a billing period. This data is used exclusively to enforce the limits of your subscription plan (Free or Premium). It is not shared with advertisers or analytics platforms.",
			},
		],
	},
	{
		id: "how-we-use",
		title: "How We Use Your Data",
		items: [
			{ label: "Authentication", text: "Your phone number is used to verify your identity via OTP when you sign in." },
			{ label: "Fraud Detection", text: "Search queries and community reports feed into our risk scoring engine to generate fraud likelihood scores for phone numbers." },
			{ label: "Subscription Enforcement", text: "Usage counts (checks and reports) are tracked to enforce the limits of your Free or Premium plan." },
			{ label: "AI Support", text: "Chat history is stored to allow the AI assistant to maintain context across your support conversations within the app." },
			{ label: "Service Improvement", text: "Aggregated, anonymized data may be used to improve the accuracy of our scam detection algorithms and regional statistics." },
		],
	},
	{
		id: "data-sharing",
		title: "Data Sharing & Third Parties",
		content: `We do not sell your personal data. We share data only with the following categories of service providers who are necessary for operating ${APP_NAME}:`,
		items: [
			{ label: "Supabase (Database & Authentication)", text: "Our database and authentication infrastructure runs on Supabase, which uses PostgreSQL. Your account data and activity logs are stored here." },
			{ label: "Google Gemini (AI Chat)", text: "Chat messages sent to the AI support assistant are processed by Google's Gemini 2.5 Flash model via our secure backend. Only the message content is forwarded — no account identifiers are shared with Google." },
			{ label: "Legal Compliance", text: "We may disclose data if required by applicable law, court order, or regulatory authority in Kazakhstan." },
		],
	},
	{
		id: "retention",
		title: "Data Retention",
		content: `We retain your personal data for as long as your account is active. Specifically:`,
		items: [
			{ label: "Account Data", text: "Retained for the lifetime of your account. Deleted within 30 days of account deletion." },
			{ label: "Search History", text: "Retained indefinitely while your account is active. You may request deletion at any time." },
			{ label: "Community Reports", text: "Reports are retained as part of our fraud database. Anonymized report data may be retained even after account deletion to preserve the integrity of our scam detection system." },
			{ label: "AI Chat Logs", text: "Retained for the lifetime of your account. Deleted upon account deletion." },
		],
	},
	{
		id: "security",
		title: "Security",
		content: `We take reasonable technical and organizational measures to protect your data against unauthorized access, loss, or misuse. This includes encrypted connections (HTTPS/TLS), secure backend API architecture, and access controls on our database. However, no method of electronic storage or transmission is 100% secure, and we cannot guarantee absolute security.`,
	},
	{
		id: "your-rights",
		title: "Your Rights",
		content: `As a user of ${APP_NAME}, you have the following rights regarding your personal data:`,
		items: [
			{ label: "Access", text: "You may request a copy of the personal data we hold about you." },
			{ label: "Correction", text: "You may request correction of inaccurate data." },
			{ label: "Deletion", text: "You may request deletion of your account and associated personal data. Note that anonymized, aggregated report data may be retained." },
			{ label: "Portability", text: "You may request an export of your data in a machine-readable format." },
			{ label: "Objection", text: "You may object to certain types of data processing, including profiling." },
		],
	},
	{
		id: "subscriptions",
		title: "In-App Purchases & Subscriptions",
		content: `${APP_NAME} offers a Free plan and a Premium subscription. Payment processing for Premium subscriptions is handled by the Google Play Store or Apple App Store, depending on your device platform. We do not collect or store your payment card information. Subscription status is verified through the respective platform's billing APIs.`,
	},
	{
		id: "children",
		title: "Children's Privacy",
		content: `${APP_NAME} is not directed at children under the age of 13. We do not knowingly collect personal data from children. If you believe a child has provided us with personal data, please contact us immediately so we can delete it.`,
	},
	{
		id: "changes",
		title: "Changes to This Policy",
		content: `We may update this Privacy Policy from time to time to reflect changes in our practices or applicable law. When we make material changes, we will notify you through the app or via the contact information associated with your account. Continued use of the app after an update constitutes your acceptance of the revised policy.`,
	},
	{
		id: "contact",
		title: "Contact Us",
		content: `If you have questions, concerns, or requests regarding this Privacy Policy or your personal data, please contact us at:`,
		contact: true,
	},
]

export default function PrivacyPolicyPage() {
	return (
		<div
			className="min-h-screen bg-[#0a0c10] text-[#e6edf3]"
			style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
		>
			{/* Google Font */}
			<style>{`@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;600&family=IBM+Plex+Sans:wght@300;400;500;600&display=swap');`}</style>

			{/* Top bar */}
			<div className="border-b border-[#21262d] px-6 py-4 flex items-center gap-3">
				<div className="w-7 h-7 rounded bg-orange-500 flex items-center justify-center text-white text-xs font-bold shrink-0">K</div>
				<span className="text-[14px] font-medium text-white">{APP_NAME}</span>
				<span className="text-[#656d76] text-[14px]">/</span>
				<span className="text-[14px] text-[#8b949e]">Privacy Policy</span>
			</div>

			<div className="max-w-3xl mx-auto px-6 py-16">
				{/* Hero */}
				<div className="mb-14">
					<div
						className="inline-block text-[11px] font-medium tracking-widest uppercase px-3 py-1 rounded-full border border-orange-500/30 text-orange-400 mb-6"
						style={{ fontFamily: "'IBM Plex Mono', monospace" }}
					>
						Legal Document
					</div>
					<h1 className="text-4xl font-semibold text-white leading-tight mb-4">
						Privacy Policy
					</h1>
					<p className="text-[#8b949e] text-[15px] leading-relaxed">
						This policy describes how <strong className="text-white font-medium">{APP_NAME}</strong> ({COMPANY}) collects, uses, and protects your personal information when you use our mobile application.
					</p>
					<div
						className="mt-5 text-[12px] text-[#656d76]"
						style={{ fontFamily: "'IBM Plex Mono', monospace" }}
					>
						Last updated: {LAST_UPDATED}
					</div>
				</div>

				{/* TOC */}
				<div className="mb-14 p-5 rounded-xl border border-[#21262d] bg-[#0d1117]">
					<div
						className="text-[11px] uppercase tracking-widest text-[#656d76] mb-3"
						style={{ fontFamily: "'IBM Plex Mono', monospace" }}
					>
						Contents
					</div>
					<ol className="flex flex-col gap-1.5">
						{sections.map((s, i) => (
							<li key={s.id}>
								<a
									href={`#${s.id}`}
									className="flex items-center gap-3 text-[13px] text-[#8b949e] hover:text-orange-400 transition-colors group"
								>
									<span
										className="text-[11px] text-[#656d76] w-5 shrink-0"
										style={{ fontFamily: "'IBM Plex Mono', monospace" }}
									>
										{String(i + 1).padStart(2, "0")}
									</span>
									<span className="group-hover:translate-x-0.5 transition-transform">{s.title}</span>
								</a>
							</li>
						))}
					</ol>
				</div>

				{/* Sections */}
				<div className="flex flex-col gap-12">
					{sections.map((s, i) => (
						<section key={s.id} id={s.id} className="scroll-mt-8">
							<div className="flex items-start gap-4 mb-4">
								<span
									className="text-[11px] text-[#656d76] mt-1 shrink-0 w-7"
									style={{ fontFamily: "'IBM Plex Mono', monospace" }}
								>
									{String(i + 1).padStart(2, "0")}
								</span>
								<h2 className="text-[18px] font-semibold text-white">{s.title}</h2>
							</div>

							<div className="ml-11 flex flex-col gap-4">
								{s.content && (
									<p className="text-[14px] text-[#8b949e] leading-relaxed">{s.content}</p>
								)}

								{s.items && (
									<div className="flex flex-col gap-3">
										{s.items.map((item) => (
											<div
												key={item.label}
												className="rounded-lg border border-[#21262d] bg-[#0d1117] p-4"
											>
												<div className="text-[13px] font-medium text-white mb-1.5">{item.label}</div>
												<div className="text-[13px] text-[#8b949e] leading-relaxed">{item.text}</div>
											</div>
										))}
									</div>
								)}

								{s.contact && (
									<div className="rounded-lg border border-orange-500/20 bg-orange-500/5 p-4">
										<div className="text-[13px] text-[#8b949e] mb-1">Email</div>
										<a
											href={`mailto:${CONTACT_EMAIL}`}
											className="text-orange-400 hover:text-orange-300 text-[14px] font-medium transition-colors"
											style={{ fontFamily: "'IBM Plex Mono', monospace" }}
										>
											{CONTACT_EMAIL}
										</a>
										<div className="text-[13px] text-[#8b949e] mt-3 mb-1">Company</div>
										<div className="text-[14px] text-white">{COMPANY}</div>
										<div className="text-[13px] text-[#8b949e] mt-3 mb-1">Country</div>
										<div className="text-[14px] text-white">Republic of Kazakhstan</div>
									</div>
								)}
							</div>

							{i < sections.length - 1 && (
								<div className="mt-12 ml-11 border-t border-[#21262d]" />
							)}
						</section>
					))}
				</div>

				{/* Footer */}
				<div className="mt-20 pt-8 border-t border-[#21262d] flex items-center justify-between">
					<span className="text-[12px] text-[#656d76]" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
						© {new Date().getFullYear()} {COMPANY}
					</span>
					<span className="text-[12px] text-[#656d76]" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
						v1.0 · EN
					</span>
				</div>
			</div>
		</div>
	)
}