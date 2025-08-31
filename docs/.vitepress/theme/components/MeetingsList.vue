<script setup>
import { computed } from 'vue'
import { useRoute } from 'vitepress'
import MeetingsCard from './MeetingsCard.vue'

const props = defineProps({
  // "./meetings" or "/groups/<group>/meetings"
  path: { type: String, default: '' },
  // 0 = no limit
  limit: { type: Number, default: 0 }
})

/* ---------- discover meeting pages ---------- */
function merge(...objs) { return objs.reduce((a, o) => ({ ...a, ...o }), {}) }

// Import the full MD modules; we'll read named export __pageData off them
const m1 = import.meta.glob('/groups/*/meetings/*.md', { eager: true })
const m2 = import.meta.glob('/docs/groups/*/meetings/*.md', { eager: true })
const m3 = import.meta.glob('../../groups/*/meetings/*.md', { eager: true })
const modules = merge(m1, m2, m3)

/* ---------- helpers ---------- */
function fileToSitePath(file) {
  return file.replace(/^.*\/groups\//, '/groups/').replace(/\.md$/, '')
}

// Support YYYY-MM-DD, YYYYMMDD, or MMDDYYYY filenames
function parseDateFromPath(p) {
  const slug = p.split('/').pop() || '' // e.g., "2025-08-31"
  // YYYY-MM-DD
  let m = slug.match(/^(\d{4})-(\d{2})-(\d{2})$/)
  if (m) return toUtcDate(m[1], m[2], m[3])
  // YYYYMMDD
  m = slug.match(/^(\d{4})(\d{2})(\d{2})$/)
  if (m && Number(m[1]) > 1900) return toUtcDate(m[1], m[2], m[3])
  // MMDDYYYY
  m = slug.match(/^(\d{2})(\d{2})(\d{4})$/)
  if (m) return toUtcDate(m[3], m[1], m[2])
  return null
}
function toUtcDate(y, mm, dd) {
  const dt = new Date(`${y}-${mm}-${dd}T00:00:00Z`)
  return isNaN(dt.getTime()) ? null : dt
}
function fmtDate(dt) {
  try {
    return new Intl.DateTimeFormat(undefined, { year: 'numeric', month: 'short', day: '2-digit' }).format(dt)
  } catch { return '' }
}

/* base path resolution (handles "./meetings") */
const route = useRoute()
const norm = (p = '') => p ? (p.startsWith('/') ? p : `/${p}`).replace(/\/$/, '') : ''
function resolveBasePath(propPath) {
  if (!propPath) return ''
  const currentDir = route.path.replace(/\/[^/]*$/, '') // drop trailing page segment
  if (propPath.startsWith('/')) return norm(propPath)
  return norm(`${currentDir}/${propPath.replace(/^\.\//, '')}`)
}

/* ---------- build items from __pageData ---------- */
const allItems = Object.entries(modules).map(([file, mod]) => {
  const href = fileToSitePath(file)
  const data = mod?.__pageData ?? mod?.default?.__pageData ?? {}
  const fm = data.frontmatter ?? {}

  const dt = parseDateFromPath(href)
  const date = dt ? fmtDate(dt) : ''

  const segs = href.split('/')
  const fileName = segs[segs.length - 1]

  const title = fm.title || data.title || fileName
  const subtitle = fm.subtitle || fm.summary || fm.description || ''
  const location = fm.location || ''
  const speakers = Array.isArray(fm.speakers) ? fm.speakers
    : (fm.speakers ? String(fm.speakers).split(',').map(s => s.trim()).filter(Boolean) : [])
  const tags = Array.isArray(fm.tags) ? fm.tags
    : (fm.tags ? String(fm.tags).split(',').map(t => t.trim()).filter(Boolean) : [])

  return {
    href, title, subtitle, date, location, speakers, tags,
    sortKey: dt ? dt.getTime() : 0
  }
}).sort((a, b) => b.sortKey - a.sortKey || b.href.localeCompare(a.href))

const base = computed(() => resolveBasePath(props.path))
const items = computed(() => {
  let list = allItems
  const b = base.value
  if (b) list = list.filter(({ href }) => href === b || href.startsWith(`${b}/`))
  if (props.limit > 0) list = list.slice(0, props.limit)
  return list
})
</script>

<template>
  <div v-if="!items.length" class="meetings-empty">
    <p>No meetings found.</p>
  </div>
  <div v-else class="meetings-list">
    <MeetingsCard
      v-for="m in items"
      :key="m.href"
      :href="m.href"
      :title="m.title"
      :subtitle="m.subtitle"
      :date="m.date"
      :location="m.location"
      :speakers="m.speakers"
      :tags="m.tags"
    />
  </div>
</template>

<style scoped>
.meetings-empty {
  padding: .75rem;
  border: 1px dashed var(--vp-c-divider);
  border-radius: 8px;
}
.meetings-list {
  display: flex;
  flex-direction: column; /* rows */
  gap: .75rem;
}
</style>
