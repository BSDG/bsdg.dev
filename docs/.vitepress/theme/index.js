import defaultTheme from 'vitepress/theme'
import './index.css'

import LinksList from './components/LinksList.vue'
import GroupCards from './components/GroupCards.vue'
import MeetingsList from './components/MeetingsList.vue'



export default {
  ...defaultTheme,
  enhanceApp({ app, router, siteData }) {
    app.component('LinksList', LinksList)
    app.component('GroupCards', GroupCards)
    app.component('MeetingsList', MeetingsList)



  }
}