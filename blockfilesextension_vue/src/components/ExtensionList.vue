<template>
  <div class="container">
    <button class="extension-chip" v-for="extension in extensions" :key="extension.historyIndex">
      {{ extension.extensionName }}
      <span class="delete-btn" @click.stop="removeExtension(extension.extensionIndex)">X</span>
    </button>
    <strong>{{ extensions.length }}/{{ maxExtensions }}</strong>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import {axiosInstance} from '../api/api';

export default defineComponent({
  props: {
    maxExtensions: {
      type: Number,
      default: 20
    }
  },
  setup(_, { emit }) {
    const extensions = ref([]);

    const fetchExtensions = async () => {
      try {
        const allExtensionsResponse = await axiosInstance.get(import.meta.env.VITE_APP_API_BASE_URL + '/task/extension/top');
        const allExtensions = allExtensionsResponse.data.body.data;

        const sessionExtensionsResponse = await axiosInstance.get(import.meta.env.VITE_APP_API_BASE_URL + '/task/extension/history');
        const sessionExtensions = sessionExtensionsResponse.data.body.data;

        // filter out top extensions
        extensions.value = sessionExtensions.filter(sessionExtension => {
          const isTopExtension = allExtensions.some(topExtension => topExtension.extensionIndex === sessionExtension.extensionIndex);
          return !isTopExtension;
        });

      } catch (error) {
        console.error(error);
      }
    };
    onMounted(fetchExtensions);

    const removeExtension = async (extensionIndex) => {
      try {
        await axiosInstance.post(`${import.meta.env.VITE_APP_API_BASE_URL}/task/extension/deleteHistory`, { extensionIndex: extensionIndex });
        extensions.value = extensions.value.filter(extension => extension.extensionIndex !== extensionIndex);
        emit('extension-removed');
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