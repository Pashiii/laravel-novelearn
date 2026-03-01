declare module 'ziggy-js' {
    import { Config } from 'ziggy-js';
    export function route(
        name: string,
        params?: Record<string, any>,
        absolute?: boolean,
        config?: Config
    ): string;
}
