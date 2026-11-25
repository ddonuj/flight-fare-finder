import { createFileRoute } from '@tanstack/react-router';
import { AuthForm } from '@/components/AuthForm';

export const Route = createFileRoute('/auth')({
  head: () => ({ meta: [
    { title: '登入｜Flight Price Notifier' },
    { name: 'description', content: '登入你的 Flight Price Notifier 帳號。' },
    { property: 'og:title', content: '登入｜Flight Price Notifier' },
    { property: 'og:description', content: '旅程，從這裡繼續。' },
    { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: () => <AuthForm />,
});