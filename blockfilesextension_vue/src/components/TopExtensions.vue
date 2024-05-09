<template>
  <div>
    <div v-for="extension in extensions" :key="extension.id">
      <input type="checkbox" :id="`extension-${extension.id}`">
      <label :for="`extension-${extension.id}`">{{ extension.extensionName }}</label>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import {axiosInstance} from '../api/api';

export default defineComponent({
  setup() {
    const extensions = ref([]);

    const fetchExtensions = async () => {
      try {
        const response = await axiosInstance.get(import.meta.env.VITE_APP_API_BASE_URL + '/task/extension/top');
        extensions.value = response.data;
      } catch (error) {
        console.error(error);
      }
    };

    onMounted(fetchExtensions);

    return { extensions };
  },
});
</script>