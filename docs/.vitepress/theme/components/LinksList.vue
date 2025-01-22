<script setup>
import { ref } from 'vue';
import metadata from '../../metadata.json';

const links = ref([]);
const props = defineProps({
  path: {
    type: String,
    default: () => []
  }
});

function fetchLinks() {
  links.value = props.path.length
    ? metadata.filter(item => {
      if (item.path.endsWith('index')) {
        return false
      }
      return item.path.startsWith(`/${props.path.startsWith('/') ? props.path.slice(1) : props.path}`)
    }
    )
    : metadata;
};

fetchLinks();
</script>

<template>
  <ul>
    <li v-for="link in links" :key="link.path">
      <a :href="link.path">{{ link.name }}</a>
      <p v-if="link.description">{{ link.description }}</p>
    </li>
  </ul>
</template>
