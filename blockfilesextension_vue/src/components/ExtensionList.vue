<template>
  <div class="container">
    <button class="extension-chip" v-for="extension in extensions" :key="extension.historyIndex">
      {{ extension.extensionName }}
      <span class="delete-btn" @click.stop="removeExtension(extension.extensionIndex)">X</span>
    </button>
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
        const response = await axiosInstance.get(import.meta.env.VITE_APP_API_BASE_URL + '/task/extension/history');
        extensions.value = response.data.body.data;
      } catch (error) {
        console.error(error);
      }
    };
    onMounted(fetchExtensions);

    const removeExtension = async (extensionIndex) => {
      try {
        await axiosInstance.post(`${import.meta.env.VITE_APP_API_BASE_URL}/task/extension/deleteHistory`, { extensionIndex: extensionIndex });
        extensions.value = extensions.value.filter(extension => extension.extensionIndex !== extensionIndex);
      } catch (error) {
        console.error(error);
      }
    };
    return { extensions, removeExtension, fetchExtensions };
  },
});
</script>

<style scoped>
.extension-chip {
  display: inline-block;
  padding: 10px;
  background-color: #f2f2f2;
  margin: 5px;
  border-radius: 15px;
  color: black;
  border: 1px solid black;
  font-size: 16px;
  cursor: pointer;
}

.delete-btn {
  margin-left: 5px;
  color: black;
}

.container {
  display: flex;
  flex-wrap: wrap;
}

</style>