import "./globals.css";

export const metadata = {
  title: "DeskStudio — AI automation, crafted for you",
  description:
    "DeskStudio is an AI automation agency. We design AI agents, workflows, and integrations that quietly do the work for you.",
  openGraph: {
    title: "DeskStudio — AI automation, crafted for you",
    description:
      "An AI automation agency. We design AI agents, workflows, and integrations that quietly do the work for you.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&family=Kalam:wght@300;400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
