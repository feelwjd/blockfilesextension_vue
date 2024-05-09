<template>
  <div>
    <div v-for="extension in extensions" :key="extension.extensionIndex">
      <input type="checkbox">{{ extension.extensionName }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import axios from 'axios';
import { Extension } from '../interface/types';

export default defineComponent({
  name: 'ExtensionList',
  setup() {
    const extensions = ref<Array<Extension>>([]);

    const fetchExtensions = async () => {
      try {
        const response = await axios.get<Array<Extension>>('/extension/all');
        extensions.value = response.data;
      } catch (error) {
        console.error("An error occurred while fetching extensions: ", error);
      }
    };

    onMounted(fetchExtensions);

    return {
      extensions,
    };
  },
});
</script>