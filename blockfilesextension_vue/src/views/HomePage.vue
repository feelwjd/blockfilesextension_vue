<template>
  <div>
    <AddExtension />
    <ExtensionList />
    <TopExtensions />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AddExtension from '../components/AddExtension.vue';
import ExtensionList from '../components/ExtensionList.vue';
import TopExtensions from '../components/TopExtensions.vue';

export default defineComponent({
  name: 'HomePage',
  components: {
    AddExtension,
    ExtensionList,
    TopExtensions
  },
});
</script>