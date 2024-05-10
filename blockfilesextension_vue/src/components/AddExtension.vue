<template>
  <div class="container">
    <input :value="input" @input="handleInput" @keydown.space.prevent @keydown="handleKeydown" type="text" placeholder="확장자 입력" maxlength="20"/>
    <button @click="addExtension" class="add-button">+추가</button>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';
import {axiosInstance} from '../api/api';
import { Extension } from '../interface/types';

export default defineComponent({
  name: 'AddExtension',
  setup(_, { emit }) {
    const input = ref('');

    const handleInput = function(event) {
      const inputValue = event.target.value;
      const lastValue = this.input;

      let normalizedValue = inputValue.replace(/[^a-z.]/g, '');

      if (normalizedValue !== inputValue) {
        alert('잘못된 입력입니다. 영소문자으로만 입력 가능합니다.');
        event.target.value = lastValue; // reset
      } else {
        this.input = normalizedValue; // update
      }
    };

    const handleKeydown = (event) => {
      if ((event.key === ' ' || (event.key === '.' && event.target.selectionStart !== 0)) &&
          !(event.key === 'ArrowDown' || event.key === 'ArrowUp' || event.key === 'ArrowLeft' || event.key === 'ArrowRight')) {
        event.preventDefault();
      }
    };

    const addExtension = async () => {
      if (input.value.trim()) {
        let extensionInput = input.value.trim();

        // Validate
        const regex = RegExp('^[.a-z]+$');
        if (!regex.test(extensionInput)) {
          alert("잘못된 입력입니다. 영소문자로만 입력 가능합니다.");
          return;
        }

        //  '.' 추가
        if (!extensionInput.startsWith('.')) {
          extensionInput = '.' + extensionInput;
        }

        try {
          const historyResponse = await axiosInstance.get(
              import.meta.env.VITE_APP_API_BASE_URL + '/task/extension/history',
              { params: {} },
          );

          const extensionExists = historyResponse.data.body.data.some((extension) =>
              extension.extensionName === extensionInput);
          if (!extensionExists) {

            const addResponse = await axiosInstance.post<Extension>(import.meta.env.VITE_APP_API_BASE_URL + '/task/extension/add', { extensionName: extensionInput });
            const extensionIndex : bigint= addResponse.data.body.data;
            const addHistoryResponse = await axiosInstance.post<bigint>(import.meta.env.VITE_APP_API_BASE_URL + '/task/extension/addHistory', { extensionIndex: extensionIndex});

            if(addHistoryResponse.status === 200) {
              console.log('History successfully added');
              emit('extension-added', extensionInput);
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
      handleInput,
      addExtension,
      handleKeydown,
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

.container {
  display: flex;
  flex-wrap: wrap;
}

</style>