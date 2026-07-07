'use client';

import { ReactNode, useState } from 'react';
import { ThemeProvider } from 'next-themes';
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ApiError } from '@/network/base';
import { Snackbar, snackbar } from '@/components/core/snackbar/index';

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60_000,
            refetchOnWindowFocus: false,
          },
        },
        queryCache: new QueryCache({
          onError: (error) => {
            // 401은 clientFetch가 처리하므로 중복 toast 방지
            if (error instanceof ApiError && error.status === 401) return;
            snackbar.error(
              error instanceof ApiError ? error.message : '문제가 발생했어요. 잠시 후 다시 시도해 주세요.',
            );
          },
        }),
        mutationCache: new MutationCache({
          onError: (error) => {
            if (error instanceof ApiError && error.status === 401) return;
            snackbar.error(
              error instanceof ApiError ? error.message : '요청을 처리하지 못했어요.',
            );
          },
        }),
      }),
  );

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <QueryClientProvider client={queryClient}>
        {children}
        <Snackbar />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
