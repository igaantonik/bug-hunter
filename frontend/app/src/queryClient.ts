import { QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            throwOnError: false,
        },
        mutations: {
            throwOnError: false,
        },
    },
});

export default queryClient;
