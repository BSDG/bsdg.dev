import defaultTheme from 'vitepress/theme'
import './index.css'

import LinksList from './components/LinksList.vue'


export default {
  ...defaultTheme,
  enhanceApp({ app, router, siteData }) {
    app.component('LinksList', LinksList)

  }
}