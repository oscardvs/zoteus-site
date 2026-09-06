import type { Metadata } from 'next';
import Link from 'next/link';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/lib/layout.shared';
import { SiteFooter } from '@/components/site-footer';

export const metadata: Metadata = {
  title: 'Page not found',
};

export default function NotFound() {
  return (
    <HomeLayout {...baseOptions()}>
      <main className="z-notfound flex flex-1 flex-col">
        <div className="z-container z-section flex-1">
          <p className="z-label">404</p>
          <h1 className="z-display z-h1 mt-3">Page not found.</h1>
          <p className="z-lead mt-5 max-w-xl">
            There is nothing at this address. The link may be out of date, or the page may have moved.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/" className="z-btn z-btn-primary">Back to the home page</Link>
            <Link href="/docs" className="z-btn z-btn-secondary">Read the docs</Link>
          </div>
        </div>
        <SiteFooter />
      </main>
    </HomeLayout>
  );
}
