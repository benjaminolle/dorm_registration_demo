import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";
import "@/app/globals.css";


const sourceSans3 = Source_Sans_3({
    variable: "--font-source-sans",
    weight: ["300", "400", "500", "600", "700"],
    subsets: ["latin"]
});

export const metadata: Metadata = {
    title: "Dorm Registration Portal",
    description: "Assign rooms conveniently and track records.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={`${sourceSans3.variable} h-full antialiased`}>
            <body className="min-h-full flex flex-col">
                {children}
            </body>
        </html>
    );
}