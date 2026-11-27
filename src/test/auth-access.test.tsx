import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { routes } from '@/routes';

const { getUser } = vi.hoisted(() => ({ getUser: vi.fn() }));
vi.mock('@/integrations/supabase/client', () => ({
  supabase: { auth: { getUser, onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }) } },
}));

function renderAt(path: string) {
  const router = createMemoryRouter(routes, { initialEntries: [path] });
  render(<QueryClientProvider client={new QueryClient()}><RouterProvider router={router} /></QueryClientProvider>);
  return router;
}

describe('Private dashboard access', () => {
  beforeEach(() => getUser.mockReset());

  it('redirects signed-out visitors from /app to /auth', async () => {
    getUser.mockResolvedValue({ data: { user: null }, error: null });
    const router = renderAt('/app');
    await waitFor(() => expect(router.state.location.pathname).toBe('/auth'));
  });

  it('allows a verified account to enter /app', async () => {
    getUser.mockResolvedValue({ data: { user: { id: 'test-user', email: 'user@example.com' } }, error: null });
    const router = renderAt('/app');
    expect(await screen.findByText('Hi user@example.com')).toBeInTheDocument();
    expect(router.state.location.pathname).toBe('/app');
  });

  it('rejects an account when verification fails', async () => {
    getUser.mockResolvedValue({ data: { user: { id: 'test-user', email: 'user@example.com' } }, error: new Error('Invalid session') });
    const router = renderAt('/app');
    await waitFor(() => expect(router.state.location.pathname).toBe('/auth'));
  });
});
