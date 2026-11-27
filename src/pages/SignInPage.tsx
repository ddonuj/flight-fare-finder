import { AuthForm } from '@/components/AuthForm';
import { usePageMeta } from '@/hooks/use-page-meta';

export function SignInPage() {
  usePageMeta({ title: '登入｜Flight Price Notifier', description: '登入你的 Flight Price Notifier 帳號。' });
  return <AuthForm />;
}
