import { QueryClient } from '@tanstack/react-query';
import { createMemoryHistory, createRouter } from '@tanstack/react-router';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { routeTree } from '@/routeTree.gen';

const { getUser } = vi.hoisted(() => ({ getUser: vi.fn() }));
vi.mock('@/integrations/supabase/client', () => ({ supabase: { auth: { getUser } } }));

function appRouter() {
  return createRouter({ routeTree, history: createMemoryHistory({ initialEntries: ['/app'] }), context: { queryClient: new QueryClient() } });
}

describe('Private dashboard access', () => {
  beforeEach(() => getUser.mockReset());

  it('redirects signed-out visitors from /app to /auth', async () => {
    getUser.mockResolvedValue({ data: { user: null }, error: null });
    const router = appRouter();
    await router.load();
    expect(router.state.location.pathname).toBe('/auth');
  });

  it('allows a verified account to enter /app', async () => {
    getUser.mockResolvedValue({ data: { user: { id: 'test-user', email: 'user@example.com' } }, error: null });
    const router = appRouter();
    await router.load();
    expect(router.state.location.pathname).toBe('/app');
    expect(router.state.matches.at(-1)?.status).toBe('success');
    expect(getUser).toHaveBeenCalledOnce();
  });

  it('rejects an account when verification fails', async () => {
    getUser.mockResolvedValue({ data: { user: { id: 'test-user', email: 'user@example.com' } }, error: new Error('Invalid session') });
    const router = appRouter();
    await router.load();
    expect(router.state.location.pathname).toBe('/auth');
  });
});