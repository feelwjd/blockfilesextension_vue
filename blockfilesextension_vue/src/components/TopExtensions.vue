<template>
  <div class="container">
    <div v-for="extension in extensions" :key="extension.extensionIndex" class="extension-item">
      <input type="checkbox" :id="`extension-${extension.extensionIndex}`" :checked="extension.checked === 'Y' ? true : false" @change="updateExtension($event, extension)">
      <label :for="`extension-${extension.extensionIndex}`">{{ extension.extensionName }}</label>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import {axiosInstance} from '../api/api';

export default defineComponent({
  setup() {
    const extensions = ref([]);

    const fetchExtensions = async (newExtension) => {
      try {
        const response = await axiosInstance.get(import.meta.env.VITE_APP_API_BASE_URL + '/task/extension/top');
        if (newExtension && !response.data.body.data.some(extension => extension.extensionName === newExtension)) {
          response.data.body.data.push({ extensionName: newExtension, checked: 'Y' });
        }
        extensions.value = response.data.body.data.map(extension => {
          if (extension.extensionName === newExtension) {
            updateExtension({ target: { checked: true } }, extension);
            return { ...extension, checked: 'Y' };
          } else {
            return extension;
          }
        });
      } catch (error) {
        console.error(error);
      }
    };

    onMounted(fetchExtensions);

    const updateExtension = async (event, extension) => {
      try {
        extension.checked = event.target.checked ? 'Y' : 'N';
        const payload = { extensionIndex: extension.extensionIndex, checked: extension.checked };
        const response = await axiosInstance.post(import.meta.env.VITE_APP_API_BASE_URL + '/task/extension/check', payload);
        console.log(response.data.body.data);
      } catch (error) {
        console.error(error);
      }
    };

    onMounted(fetchExtensions);

    return { extensions, updateExtension, fetchExtensions};
  },
});
</script>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
}

.extension-item {
  margin: 5px;
}

</style>