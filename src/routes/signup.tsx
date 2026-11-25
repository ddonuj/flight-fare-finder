import { createFileRoute } from '@tanstack/react-router';
import { AuthForm } from '@/components/AuthForm';

export const Route = createFileRoute('/signup')({
  head: () => ({ meta: [
    { title: '建立帳號｜Flight Price Notifier' },
    { name: 'description', content: '使用 Email 建立 Flight Price Notifier 帳號。' },
    { property: 'og:title', content: '建立帳號｜Flight Price Notifier' },
    { property: 'og:description', content: '開始期待，下一趟旅程。' },
    { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: () => <AuthForm signup />,
});