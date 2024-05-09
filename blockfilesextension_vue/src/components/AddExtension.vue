<template>
  <div>
    <input v-model="input" type="text" maxlength="20" placeholder="확장자 추가 (20자이내)">
    <button @click="addExtension">추가</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import axios from 'axios';
import { Extension } from '../interface/types';

export default defineComponent({
  name: 'AddExtension',
  setup() {
    const input = ref('');

    const addExtension = async () => {
      if (input.value.trim()) {
        try {
          const response = await axios.post<Extension>('/extension/add', { extension: input.value.trim() });
          input.value = '';
          console.log(response.data);
        } catch (error) {
          console.error("An error occurred while adding the extension: ", error);
        }
      }
    };

    return {
      input,
      addExtension,
    };
  },
});
</script>