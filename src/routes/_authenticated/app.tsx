import { createFileRoute } from '@tanstack/react-router';
import { PlaneTakeoff } from 'lucide-react';
import { SiteHeader, SiteFooter } from '@/components/SiteHeader';

export const Route = createFileRoute('/_authenticated/app')({
  head: () => ({ meta: [
    { title: '我的儀表板｜Flight Price Notifier' },
    { name: 'description', content: '你的 Flight Price Notifier 航線追蹤儀表板。' },
    { property: 'og:title', content: '我的儀表板｜Flight Price Notifier' },
    { property: 'og:description', content: '你的航線追蹤儀表板即將上線。' },
    { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'robots', content: 'noindex' },
  ] }),
  component: App,
});

function App() {
  const { user } = Route.useRouteContext();
  return <div className="site-page"><SiteHeader /><main className="dashboard page-width"><span className="section-eyebrow">YOUR TRAVEL SPACE</span><h1>Hi {user.email}</h1><div className="dashboard-empty fade-in"><div className="dashboard-symbol"><PlaneTakeoff size={32} /></div><h2>你的航線追蹤儀表板即將上線</h2><p>下一個里程碑會加上訂閱航線的功能。</p><p>Your dashboard is coming soon.<br />Route-subscription will be added in the next milestone.</p></div></main><SiteFooter /></div>;
}