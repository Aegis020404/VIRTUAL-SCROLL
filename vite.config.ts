import vuePlugin from '@vitejs/plugin-vue';
import svgLoader from 'vite-svg-loader';

export default {
  plugins: [vuePlugin(), svgLoader()],
};
