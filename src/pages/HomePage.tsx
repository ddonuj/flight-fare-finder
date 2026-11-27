import { Link } from 'react-router';
import { ArrowRight, BellRing, Radar, Mail, CircleCheck, Plane } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SiteHeader, SiteFooter } from '@/components/SiteHeader';
import { useAuth } from '@/components/AuthContext';
import hero from '@/assets/flight-sunrise.png.asset.json';
import { usePageMeta } from '@/hooks/use-page-meta';

const features = [
  { icon: Radar, title: '盯緊熱門航線', english: 'Always-on route watching', description: '持續監控台北出發的熱門航線（東京、首爾），自動抓最低票價。' },
  { icon: Mail, title: '達標自動通知', english: 'Target-price email alerts', description: '低於你設定的目標價，就寄 email 提醒你，附上立即訂購連結。' },
  { icon: CircleCheck, title: '隨時取消', english: 'Cancel anytime', description: '月訂閱制，不想用隨時停，沒有綁約。' },
];

export function HomePage() {
  usePageMeta({ title: 'Flight Price Notifier｜機票降價通知', description: '設定航線與目標價，機票降價就通知你。追蹤台北出發的熱門航線，等到你的理想價格。' });
  const { user } = useAuth();
  return <div className="site-page"><SiteHeader /><main>
    <section className="hero"><img className="hero-image" src={hero.url} alt="日出時分，飛機機翼掠過雲海" /><div className="hero-overlay" />
      <div className="page-width hero-content fade-in"><span className="hero-eyebrow"><BellRing size={13} /> 好價格，值得等待。</span>
        <h1>Flight Price<br /><span>Notifier</span></h1>
        <p className="hero-value">設定航線與目標價，<br />機票降價就通知你</p>
        <p className="hero-subtitle">Set a route and a target price —<br />we email you when the fare drops.</p>
        <Button asChild size="lg" className="hero-cta"><Link to={user ? '/app' : '/signup'}>{user ? '前往我的儀表板' : '開啟你的下一趟旅程'}<ArrowRight /></Link></Button>
        <p className="hero-detail"><Plane size={13} /> 台北出發 · 東京、首爾 · 為你的預算而飛</p>
      </div>
    </section>
    <section className="features page-width"><div className="section-heading"><div><span className="section-eyebrow">LESS SEARCHING. MORE TRAVELING.</span><h2>不用天天查票價，把期待留給旅行。</h2></div><p>你的預算，我們幫你盯緊。</p></div>
      <div className="feature-grid">{features.map((feature, index) => <article className="feature-card" key={feature.title}><div className="feature-top"><span className="feature-icon"><feature.icon /></span><span className="feature-number">0{index + 1}</span></div><h3>{feature.title}</h3><p className="feature-english">{feature.english}</p><p className="feature-description">{feature.description}</p></article>)}</div>
    </section>
  </main><SiteFooter /></div>;
}
