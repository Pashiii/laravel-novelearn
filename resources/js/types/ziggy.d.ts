declare module 'ziggy-js' {
    import { Config } from 'ziggy-js';
    export function route(
        name: string,
        params?: Record<string, string | number> | (string | number)[],
        absolute?: boolean,
        config?: Config
    ): string;
}
