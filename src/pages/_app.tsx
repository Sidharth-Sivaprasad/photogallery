import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Aboreto } from "@next/font/google";

const inter = Aboreto({
	subsets: ["latin"],
	weight: "400",
	variable: "--font-aboreto",
});

export default function App({ Component, pageProps }: AppProps) {
	return (
		<div className={`${inter.variable} font-sans h-full`}>
			<Component {...pageProps} />
		</div>
	);
}
