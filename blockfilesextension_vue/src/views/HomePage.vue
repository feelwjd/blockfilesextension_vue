<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold">◎ 파일 확장자 차단</h1>
    <hr class="border-2 my-2">
    <h2 class="text-2xl">파일확장자에 따라 특정 형식의 파일을 첨부하거나 전송하지 못하도록 제한</h2>

    <div class="mt-6">
      <h3 class="text-xl font-bold">고정 확장자</h3>
      <TopExtensions />
    </div>

    <div class="mt-6">
      <h3 class="text-xl font-bold">커스텀 확장자</h3>
      <AddExtension @extension-added="refreshList" />
      <ExtensionList ref="extensionList" /> <!-- Adding ref here -->
    </div>
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
  methods: {
    refreshList() {
      this.$refs.extensionList.fetchExtensions();
    }
  },
});
</script>