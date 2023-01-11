import normalize from 'postcss-normalize';
import prefixer from 'autoprefixer';
import nano from 'cssnano';

export default {
  plugins: [normalize({ browsers: 'defaults' }), prefixer(), nano({ preset: 'default' })],
};
