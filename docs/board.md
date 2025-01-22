<script setup>
import { VPTeamMembers } from 'vitepress/theme'

const members = [
  {

    avatar: 'https://avatars.githubusercontent.com/u/2841945?v=4',
    name: 'Ryan Coates',
    title: 'President',
    links: [
      { icon: 'linkedin', link: 'https://www.linkedin.com/in/ryandcoates/' },
      { icon: 'github', link: 'https://github.com/ryandcoates'}
    ]

  }, 
  {

    avatar: 'https://avatars.githubusercontent.com/u/30130519?v=4',
    name: 'Doug Reece',
    title: 'Treasurer',
    links: [
      { icon: 'linkedin', link: 'https://www.linkedin.com/in/douglasjreece/' },
      { icon: 'github', link: 'https://github.com/douglasjreece'}
    ]

  }, 
  {

    avatar: 'https://avatars.githubusercontent.com/u/821930?v=4',
    name: 'Jim McKeeth',
    title: 'Secretary',
    links: [
      { icon: 'linkedin', link: 'https://www.linkedin.com/in/jimmckeeth/' },
      { icon: 'github', link: 'https://github.com/jimmckeeth'}
    ]

  }, 
  {

    avatar: 'https://avatars.githubusercontent.com/u/3642147?v=4',
    name: 'Tom Day',
    title: 'Sponsor Coordinator',
    links: [
      { icon: 'linkedin', link: 'https://www.linkedin.com/in/javaday/' },
      { icon: 'github', link: 'https://github.com/javaday'}
    ]

  }, 
  {

    avatar: 'https://avatars.githubusercontent.com/u/184080?v=4',
    name: 'Andrew Hansen',
    title: 'Speaker Coordinator',
    links: [
      { icon: 'linkedin', link: 'https://www.linkedin.com/in/andrewhanson/' },
      { icon: 'github', link: 'https://github.com/andrewhanson'}
    ]

  }, 
  {

    avatar: 'https://avatars.githubusercontent.com/u/7350663?v=4',
    name: 'Jake Overall',
    title: 'Outreach Coordinator',
    links: [
      { icon: 'linkedin', link: 'https://www.linkedin.com/in/jakeoverall/' },
      { icon: 'github', link: 'https://github.com/jakeoverall'}
    ]

  }
]
</script>

## The BSDG Board

Say hello to our awesome team.

<VPTeamMembers size="small" :members="members" />
