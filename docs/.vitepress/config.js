/**
* @type {import('vitepress').UserConfig}
*/
export default {
  title: "BSDG Inc",
  description: "Boise Software Developers Group, Inc.",

  head: [
    ['link', { rel: 'icon', href: 'https://avatars.githubusercontent.com/u/8630126?s=400&u=2e5cdbb82946dbb4f1ae8db01b1e816b7756021a&v=4' }]
  ],
  sitemap: {
    hostname: 'https://bsdg.dev',
  },

  themeConfig: {

    search: {
      provider: 'local'
    },

    nav: [
      { text: 'Home', link: '/' },
      { text: 'About', link: '/about' },
      { text: 'Events', link: '/events/' }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/bsdg' },
      { icon: 'facebook', link: 'https://www.facebook.com/boisecodecamp' },
      { icon: 'discord', link: 'https://discord.gg/traxpMBsNn' },
      { icon: 'bluesky', link: 'https://bsky.app/profile/bsdg.dev' },
      { icon: 'linkedin', link: 'https://linkedin.com/company/boise-software-developer-group' },
    ],

    outline: {
      level: [2, 3],
    },

    lastUpdated: false,




    ignoreDeadLinks: [
      /^https?:\/\/localhost/
    ],

    footer: {
      message: 'Copyright © 2023 Boise Software Developers Group',
    }


  }
};
