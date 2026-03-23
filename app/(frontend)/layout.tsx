import Header from "@/app/(frontend)/components/Header";
import config from "@/payload.config";
import { ThemeModeScript } from "flowbite-react";
import type { Metadata } from "next";
import { Geist, Michroma } from 'next/font/google';
import { getPayload } from "payload";
import Footer from "./components/Footer";
import GoogleCaptchaProvider from "./components/GoogleCaptchaProvider";
import "./globals.css";
import { SocialsType } from "./types/collections/Socials";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const michroma = Michroma({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-michroma',
	weight: ['400'],
});

export const metadata: Metadata = {
	title: "Yematawerk Lema",
	description: "Personal portfolio of Yematawerk Lema. A Digital Marketer, Graphic Designer and Youtube Strategist.",
	icons: '../favicon.ico'
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {

	const payload = await getPayload({ config });

	const headerGlobal: any = await payload.findGlobal({ slug: 'header' } as any);
	const socialsCollection = await payload.find({ collection: 'socials' } as any);

	const socials = (socialsCollection.docs as any)?.map((social: SocialsType) => {
		return {
			id: social.id,
			label: social.label,
			url: social.url,
			icon: social.icon
		}
	});

	return (
		<html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${michroma.variable}`}>
			<head>
				<ThemeModeScript />
			</head>
			<body>
				{
					headerGlobal && <Header data={headerGlobal} />
				}
				<div className="max-w-450 mx-auto">
					<GoogleCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_FRONTEND_KEY || ''}>
						{children}
					</GoogleCaptchaProvider>
				</div>
				{
					headerGlobal && socials && <Footer data={headerGlobal} socials={socials} />
				}
			</body>
		</html >
	);
}

export const dynamic = 'force-dynamic';