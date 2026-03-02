declare module 'ziggy-js' {
    import { Config } from 'ziggy-js';
    export function route(
        name: string,
        params?: Record<string, string | number | boolean | undefined>,
        absolute?: boolean,
        config?: Config
    ): string;
}
