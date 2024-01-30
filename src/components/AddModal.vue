<template>
  <div
    class="modal fade"
    id="addModal"
    data-bs-backdrop="static"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content bg-white-box">
        <div class="modal-header border-0">
          <div class="title-word">
            <span class="colr-block"></span>
            <h2 class="mb-0 fw-semibold">建立新{{ typeName }}</h2>
          </div>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>

        <div class="modal-body">
          <VForm ref="addForm" @submit="addData">
            <div class="mb-3">
              <label for="inputField" class="form-label"
                >{{ typeName }}：</label
              >
              <VField
                class="form-control"
                id="inputField"
                name="data"
                type="test"
                rules="required"
                v-model="newData"
                :placeholder="`${placeholder}`"
              />
              <ErrorMessage
                as="p"
                class="invalid-feedback d-block mb-0"
                name="data"
              />
            </div>
            <div class="text-center">
              <button
                type="submit"
                class="fw-semibold btn"
                :class="[!newData ? 'btn-gray' : 'btn-primary']"
                :disabled="!newData"
              >
                儲存
              </button>
            </div>
          </VForm>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
import commonFunction from '../assets/js/commonFunctions.js'
const { swalSuccess } = commonFunction.setup()

const props = defineProps(['tempArray', 'arrayName'])
const emit = defineEmits(['dataAdjusted'])
const newData = ref(null)
const typeName = ref(null)
const placeholder = ref(null)
const addForm = ref(null)

/**
 * 將輸入欄位帶入相對應的變數
 * @param {String} name 父層元件 帶入的參數
 */
function getTypeNames (name) {
  switch (name) {
    case 'title':
      typeName.value = '職稱'
      placeholder.value = '請輸入職稱'
      break
    default:
      typeName.value = '單位'
      placeholder.value = '請輸入單位名稱'
      break
  }
}
/**
 * 將新增的職稱 / 單位名稱傳回父元素、建立新資料
 */
function addData () {
  // 請在這裡接 新增 職稱 or 單位名稱 的 API
  const isExist = props.tempArray.findIndex(item => item === newData.value)
  const adjustedArray = [...props.tempArray]
  if (isExist === -1) {
    swalSuccess('建立失敗')
  } else {
    swalSuccess('已建立')
    adjustedArray.push(newData.value)
  }
  emit('dataAdjusted', { arrayName: props.arrayName, adjustedArray })
  addForm.value.resetForm()
}
watchEffect(() => {
  getTypeNames(props.arrayName)
})

</script>
