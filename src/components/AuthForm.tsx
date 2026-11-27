import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router';
import { ArrowRight, Eye, EyeOff, LockKeyhole, LoaderCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { SiteHeader, SiteFooter } from './SiteHeader';

export function AuthForm({ signup = false }: { signup?: boolean }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');
  const [confirmation, setConfirmation] = useState(false);
  const navigate = useNavigate();
  async function submit(event: FormEvent) {
    event.preventDefault(); setPending(true); setError('');
    try {
      const result = signup ? await supabase.auth.signUp({ email, password, options: { emailRedirectTo: window.location.origin } }) : await supabase.auth.signInWithPassword({ email, password });
      if (result.error) { setError(result.error.message === 'Invalid login credentials' ? 'Email 或密碼不正確，請再試一次。' : result.error.message); return; }
      if (!result.data.session) { setConfirmation(true); return; }
      await navigate('/app', { replace: true });
    } catch { setError('目前無法連線，請稍後再試。'); } finally { setPending(false); }
  }
  return <div className="site-page"><SiteHeader /><main className="auth-main"><div className="auth-panel">
    <span className="section-eyebrow"><LockKeyhole size={14} /> {signup ? 'YOUR NEXT ADVENTURE STARTS HERE' : 'WELCOME BACK'}</span>
    <h1>{signup ? '開始期待，下一趟旅程。' : '旅程，從這裡繼續。'}</h1>
    <p className="auth-description">{signup ? '建立帳號 / Create your account' : '登入 Flight Price Notifier'}</p>
    {confirmation ? <div role="status" className="confirmation">請查看 Email，點擊確認連結後即可登入。</div> : <form onSubmit={submit} className="auth-form">
      <label htmlFor="email">Email</label><Input id="email" type="email" autoComplete="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
      <label htmlFor="password">密碼 / Password</label><div className="password-field"><Input id="password" type={showPassword ? 'text' : 'password'} autoComplete={signup ? 'new-password' : 'current-password'} placeholder={signup ? '至少 6 個字元' : '輸入你的密碼'} minLength={6} value={password} onChange={e => setPassword(e.target.value)} required /><Button type="button" variant="ghost" size="icon" aria-label={showPassword ? '隱藏密碼' : '顯示密碼'} onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff /> : <Eye />}</Button></div>
      {error && <p className="form-error" role="alert">{error}</p>}
      <Button type="submit" size="lg" disabled={pending}>{pending ? <LoaderCircle className="animate-spin" /> : <>{signup ? 'Sign up / 註冊' : 'Sign in / 登入'}<ArrowRight /></>}</Button>
    </form>}
    <p className="auth-switch">{signup ? '已經有帳號？' : '還沒有帳號？'} <Button variant="link" asChild><Link to={signup ? '/auth' : '/signup'}>{signup ? '登入' : '建立帳號'}<ArrowRight /></Link></Button></p>
  </div></main><SiteFooter /></div>;
}