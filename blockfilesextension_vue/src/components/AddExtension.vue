<template>
  <div>
    <input v-model="input" type="text" placeholder="확장자 입력" />
    <button @click="addExtension" class="add-button">+추가</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import {axiosInstance} from '../api/api';
import { Extension } from '../interface/types';

export default defineComponent({
  name: 'AddExtension',
  setup(_, { emit }) {
    const input = ref('');

    const addExtension = async () => {
      if (input.value.trim()) {
        try {
          const historyResponse = await axiosInstance.get(
              import.meta.env.VITE_APP_API_BASE_URL + '/task/extension/history',
              { params: {} },
          );

          const extensionExists = historyResponse.data.body.data.some((extension) =>
              extension.extensionName === input.value.trim());
          if (!extensionExists) {

            const addResponse = await axiosInstance.post<Extension>(import.meta.env.VITE_APP_API_BASE_URL + '/task/extension/add', { extensionName: input.value.trim() });
            const extensionIndex : bigint= addResponse.data.body.data;
            const addHistoryResponse = await axiosInstance.post<bigint>(import.meta.env.VITE_APP_API_BASE_URL + '/task/extension/addHistory', { extensionIndex: extensionIndex});

            if(addHistoryResponse.status === 200) {
              console.log('History successfully added');
              emit('extension-added');
            } else {
              console.log('Failed to add history');
            }

            input.value = '';
            console.log(addResponse.data);
          } else {
            alert('이미 존재하는 확장자입니다.');
          }
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

<style scoped>
.add-button {
  background-color: #808080;
  color: #ffffff;
  border: none;
  padding: 10px 24px;
  text-decoration: none;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 5px;
}
</style>