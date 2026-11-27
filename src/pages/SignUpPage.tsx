import { AuthForm } from '@/components/AuthForm';
import { usePageMeta } from '@/hooks/use-page-meta';

export function SignUpPage() {
  usePageMeta({ title: '建立帳號｜Flight Price Notifier', description: '使用 Email 建立 Flight Price Notifier 帳號。' });
  return <AuthForm signup />;
}
