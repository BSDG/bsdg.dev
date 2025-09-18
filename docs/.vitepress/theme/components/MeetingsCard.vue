<script setup>
const props = defineProps({
  href: { type: String, required: true },
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  date: { type: String, default: '' },
  location: { type: String, default: '' },
  speakers: { type: Array, default: () => [] },
  tags: { type: Array, default: () => [] }
})
</script>

<template>
  <a class="meeting-card" :href="href">
    <div class="line">
      <span v-if="date" class="pill">{{ date }}</span>
      <span class="title">{{ title }}</span>
      <span v-if="location" class="muted">· {{ location }}</span>
      <span v-if="speakers.length" class="muted">· {{ speakers.join(', ') }}</span>
    </div>
    <div v-if="subtitle" class="subtitle">{{ subtitle }}</div>
    <div v-if="tags.length" class="tags">
      <span v-for="t in tags" :key="t" class="tag">#{{ t }}</span>
    </div>
  </a>
</template>

<style scoped>
.meeting-card {
  display:block; padding:.65rem .8rem;
  border:1px solid var(--vp-c-divider); border-radius:10px;
  background:var(--vp-c-bg-soft); text-decoration:none; color:inherit;
  transition: transform .12s ease, box-shadow .12s ease, border-color .12s ease, background .12s ease;
}
.meeting-card:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 16px rgba(0,0,0,.07);
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-bg);
}
.line { display:flex; align-items:baseline; gap:.5rem; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.pill { font-size:.75rem; border:1px solid var(--vp-c-divider); border-radius:999px; padding:.1rem .5rem; line-height:1.2; background:var(--vp-c-bg); flex:0 0 auto; }
.title { font-weight:600; overflow:hidden; text-overflow:ellipsis; }
.muted { opacity:.7; overflow:hidden; text-overflow:ellipsis; }
.subtitle { margin-top:.2rem; opacity:.9; overflow:hidden; text-overflow:ellipsis; display:-webkit-box; -webkit-line-clamp:1; -webkit-box-orient:vertical; }
.tags { margin-top:.3rem; display:flex; flex-wrap:wrap; gap:.35rem; }
.tag { font-size:.75rem; opacity:.85; }
</style>
