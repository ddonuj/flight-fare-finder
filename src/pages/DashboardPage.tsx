import { PlaneTakeoff } from 'lucide-react';
import { SiteHeader, SiteFooter } from '@/components/SiteHeader';
import { useProtectedUser } from '@/components/ProtectedRoute';
import { usePageMeta } from '@/hooks/use-page-meta';

export function DashboardPage() {
  usePageMeta({ title: '我的儀表板｜Flight Price Notifier', description: '你的 Flight Price Notifier 航線追蹤儀表板。', noindex: true });
  const user = useProtectedUser();
  return <div className="site-page"><SiteHeader /><main className="dashboard page-width"><span className="section-eyebrow">YOUR TRAVEL SPACE</span><h1>Hi {user.email}</h1><div className="dashboard-empty fade-in"><div className="dashboard-symbol"><PlaneTakeoff size={32} /></div><h2>你的航線追蹤儀表板即將上線</h2><p>下一個里程碑會加上訂閱航線的功能。</p><p>Your dashboard is coming soon.<br />Route-subscription will be added in the next milestone.</p></div></main><SiteFooter /></div>;
}