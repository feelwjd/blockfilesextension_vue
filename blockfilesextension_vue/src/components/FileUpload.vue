<template>
  <div class="file-upload-container">
    <input type="file" @change="uploadFile"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { axiosInstance } from '../api/api';

export default defineComponent({
  name: 'FileUpload',
  methods: {
    async uploadFile(e) {
      const file = e.target.files[0];
      let formData = new FormData();
      formData.append('file', file);

      try {
        const fileUpload = await axiosInstance.post(import.meta.env.VITE_APP_API_BASE_URL + '/file/uploadFile', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        if(fileUpload.data.header.status === 200) {
          alert(fileUpload.data.header.message);
        } else {
          alert(fileUpload.data.header.message);
        }
      } catch (err) {
        console.error(err);
        alert("Failed to upload the file.");
      }
    }
  },
});
</script>

<style scoped>

</style>