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
import {Extension} from "../interface/types.ts";

export default defineComponent({
  setup() {
    const extensions = ref([]);

    const fetchExtensions = async (newExtension) => {
      try {
        const response = await axiosInstance.get(import.meta.env.VITE_APP_API_BASE_URL + '/task/extension/top');
        extensions.value = response.data.body.data.map(extension => {
          const isTopExtension = response.data.body.data.some((topExtension) =>
              topExtension.extensionName === extension.extensionName);
          if (extension.extensionName === newExtension && isTopExtension) {
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

        if(extension.checked === 'Y') {
          const addResponse = await axiosInstance.post<Extension>(import.meta.env.VITE_APP_API_BASE_URL + '/task/extension/add', { extensionName: extension.extensionName });
          const extensionIndex : bigint= addResponse.data.body.data;
          const addHistoryResponse = await axiosInstance.post<bigint>(import.meta.env.VITE_APP_API_BASE_URL + '/task/extension/addHistory', { extensionIndex: extensionIndex});

          if(addHistoryResponse.data.header.status === 200) {
            console.log('History successfully added');
          } else {
            console.log('Failed to add history');
          }
        } else {
          const delHistoryResponse = await axiosInstance.post(`${import.meta.env.VITE_APP_API_BASE_URL}/task/extension/deleteHistory`, { extensionIndex: extension.extensionIndex });
          if(delHistoryResponse.data.header.status === 200) {
            console.log('History successfully deleted');
          } else {
            console.log('Failed to delete history');
          }
        }
        const payload = { extensionIndex: extension.extensionIndex, checked: extension.checked };
        const response = await axiosInstance.post(import.meta.env.VITE_APP_API_BASE_URL + '/task/extension/check', payload);
        fetchExtensions(null);
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