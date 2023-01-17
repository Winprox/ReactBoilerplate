import tw from 'tailwindcss';
import twConf from './tailwind.config.cjs';
import prefixer from 'autoprefixer';
import nano from 'cssnano';

export const plugins = { plugins: [tw(twConf), prefixer(), nano()] };
export default plugins;
