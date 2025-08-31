<script setup lang="ts">
type GroupMeta = {
  fullName: string
  shortName?: string
  organizers?: string[]
  description?: string
  discordRole?: string
  // Optional extras you might add later:
  logo?: string
  tags?: string[]
}

type GroupItem = GroupMeta & {
  slug: string           // e.g., "bsdq"
  href: string           // "/groups/bsdq/"
  id: string             // stable key
  hasLogo: boolean
}

const modules = import.meta.glob('/**/groups/**/_group.json', {
  eager: true,
  import: 'default'
}) as Record<string, GroupMeta>

// Turn file path → group slug (folder name)
function toSlug(filePath: string): string {
  // e.g., "/.../groups/bsdq/_group.json" → "bsdq"
  const parts = filePath.split('/')
  const idx = parts.lastIndexOf('groups')
  return idx >= 0 && parts.length > idx + 1 ? parts[idx + 1] : ''
}

// Build the list
const groups: GroupItem[] = Object.entries(modules)
  .map(([path, meta]) => {
    const slug = toSlug(path)
    const href = slug ? `/groups/${slug}/` : '#'
    const id = `${slug}::${path}`
    const hasLogo = !!meta.logo
    return {
      slug,
      href,
      id,
      hasLogo,
      ...meta
    }
  })
  // Filter out malformed entries (missing slug or fullName)
  .filter(g => g.slug && g.fullName)
  // Example: sort by full name
  .sort((a, b) => a.fullName.localeCompare(b.fullName))
</script>

<template>
  <div class="group-grid">
    <a
      v-for="g in groups"
      :key="g.id"
      class="group-card"
      :href="g.href"
    >
      <div class="card-header">
        <div class="logo" v-if="g.hasLogo">
          <img :src="g.logo" :alt="`${g.fullName} logo`" />
        </div>
        <div class="titles">
          <h3 class="name">{{ g.fullName }}</h3>
          <p v-if="g.shortName" class="short">{{ g.shortName }}</p>
        </div>
      </div>

      <p v-if="g.description" class="desc">{{ g.description }}</p>

      <div class="meta">
        <span v-if="g.organizers?.length" class="chip">
          👤 {{ g.organizers.join(', ') }}
        </span>
        <span v-if="g.discordRole" class="chip">
          💬 Discord: {{ g.discordRole }}
        </span>
      </div>
    </a>
  </div>
</template>

<style scoped>
.group-grid {
  display: grid;
  grid-template-columns: repeat( auto-fit, minmax(260px, 1fr) );
  gap: 1rem;
}
.group-card {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 1rem;
  text-decoration: none;
  color: inherit;
  background: var(--vp-c-bg-soft);
  transition: transform .12s ease, box-shadow .12s ease, border-color .12s ease;
}
.group-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0,0,0,.08);
  border-color: var(--vp-c-brand-1);
}
.card-header {
  display: flex;
  gap: .75rem;
  align-items: center;
  margin-bottom: .5rem;
}
.logo {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
  background: #fff;
  flex: 0 0 auto;
}
.logo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.titles .name {
  font-size: 1.05rem;
  margin: 0;
}
.titles .short {
  margin: 0;
  opacity: .7;
  font-size: .9rem;
}
.desc {
  margin: .5rem 0 .75rem;
  opacity: .9;
  line-height: 1.4;
}
.meta {
  display: flex;
  flex-wrap: wrap;
  gap: .5rem;
  margin-top: auto;
}
.chip {
  border: 1px solid var(--vp-c-divider);
  padding: .25rem .5rem;
  border-radius: 999px;
  font-size: .85rem;
  background: var(--vp-c-bg);
}
</style>
