<template>
  <div>
    <h3>가장 많이 추가된 확장자</h3>
    <div v-for="extension in extensions" :key="extension.extensionIndex">
      {{ extension.extensionName }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import axios from 'axios';
import { Extension } from '../interface/types';

export default defineComponent({
  name: 'TopExtensions',
  setup() {
    const extensions = ref<Array<Extension>>([]);

    const fetchTopExtensions = async () => {
      try {
        const response = await axios.get<Array<Extension>>('/extension/top');
        extensions.value = response.data;
      } catch (error) {
        console.error("An error occurred while fetching top extensions: ", error);
      }
    };

    onMounted(fetchTopExtensions);

    return {
      extensions,
    };
  },
});
</script>