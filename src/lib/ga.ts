/* eslint-disable @next/next/no-before-interactive-script-outside-document */

export function maybeInitGA() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  if (!gaId) return;
  if (typeof window === 'undefined') return;

  // Avoid injecting the script multiple times during client transitions.
  if (document.getElementById('ga-script')) return;

  const script = document.createElement('script');
  script.id = 'ga-script';
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
  document.head.appendChild(script);

  (window as any).dataLayer = (window as any).dataLayer || [];
  const gtag = (...args: any[]) => {
    (window as any).dataLayer.push(args);
  };
  (window as any).gtag = gtag;
  gtag('js', new Date());
  gtag('config', gaId, { page_path: window.location.pathname });
}

export function maybeSendPageView(pathname: string) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  if (!gaId) return;
  if (typeof window === 'undefined') return;

  const gtagFn = (window as any).gtag as undefined | ((...args: any[]) => void);
  if (!gtagFn) return;
  gtagFn('config', gaId, { page_path: pathname });
}

