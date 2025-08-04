import { Config } from 'tailwindcss';

export default {
    plugins: {
        '@tailwindcss/postcss': {
            config: {
                content: ['./src/**/*.tsx']
            } satisfies Config
        },
        autoprefixer: {},
        cssnano: {}
    }
};
