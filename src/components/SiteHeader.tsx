import { Link, useNavigate } from '@tanstack/react-router';
import { useQueryClient } from '@tanstack/react-query';
import { Plane, ArrowUpRight, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from './AuthContext';
import { supabase } from '@/integrations/supabase/client';

export function SiteHeader() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    const { error } = await supabase.auth.signOut();
    if (error) return;
    await navigate({ to: '/auth', replace: true });
  }
  return <header className="site-header"><div className="page-width header-inner">
    <Link to="/" className="brand" aria-label="Flight Price Notifier 首頁"><span className="brand-icon"><Plane /></span><span>Flight Price <span className="brand-light">Notifier</span></span></Link>
    <div className="header-actions">{user ? <><Button variant="ghost" asChild><Link to="/app">我的儀表板</Link></Button><Button variant="outline" onClick={signOut}><LogOut />Sign Out / 登出</Button></> : <Button asChild disabled={loading}><Link to="/auth">Sign in / 登入<ArrowUpRight /></Link></Button>}</div>
  </div></header>;
}

export function SiteFooter() {
  return <footer className="site-footer page-width"><span>© 2026 Flight Price Notifier</span><span className="footer-note"><Plane size={14} /> Your next trip, at your price.</span></footer>;
}