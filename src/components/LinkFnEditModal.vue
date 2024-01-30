<template>
  <div class="modal fade" id="editLinkModal" data-bs-backdrop="static" tabindex="-1" aria-labelledby="editLinkModalLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content bg-white-box p-2">
        <div class="modal-header border-0">
          <div class="title-word">
            <span class="colr-block"></span>
            <h2 class="mb-0 fw-lighter">
              <span v-if="isNew">新增連線方式</span>
              <span v-else>編輯連線方式</span>
            </h2>
          </div>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <VForm ref="addPointForm" @submit="editLink">
            <!-- <div class="mb-3">
              <div class="col-6">
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
              <div class="col-6">
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
            </div> -->
            <div class="row g-3 mb-3">
              <div class="col-12 bg-light-box mb-2 p-3">
                <label for="linkMode" class="form-label fs-5 fw-lighter">連線方式：</label>
                <VField id="linkMode" name="linkMode" as="select" class="form-select" required>
                  <option value="" disabled>請選擇連線方式</option>
                  <option value="1">1</option>

                  <!-- <option v-for="title in titlesRef" :key="title" :value="title">
                  {{ title }}
                </option> -->
                </VField>
              </div>
              <div class="col-12">
                <label for="linkID" class="form-label fs-5">連線ID：</label>
                <VField type="text" class="form-control" name="linkID" id="linkID" placeholder="請輸入連線ID" />
              </div>
              <div class="col-12">
                <label for="linkName" class="form-label fs-5">連線名稱：</label>
                <VField type="text" class="form-control" name="linkName" id="linkName" placeholder="請輸入連線名稱" />
              </div>
              <div class="col-12">
                <label for="port" class="form-label fs-5">Port：</label>
                <VField id="port" name="port" as="select" class="form-select" required>
                  <option value="" disabled>請選擇Port</option>
                  <option value="1">1</option>

                  <!-- <option v-for="title in titlesRef" :key="title" :value="title">
                  {{ title }}
                </option> -->
                </VField>
              </div>
              <div class="col-12">
                <label for="baudrate" class="form-label fs-5">Baudrate：</label>
                <VField type="text" class="form-control" name="baudrate" id="baudrate" placeholder="請輸入Baudrate" />
              </div>
            </div>
            <div class="text-center my-4" v-if="isNew">
              <button type="submit" class=" fw-semibold btn btn-gray col-4">
                完成
              </button>
            </div>
            <div class="text-center my-4 d-flex gap-2 justify-content-center" v-else>
              <button type="button" class=" fw-semibold btn btn-outline-danger col-4">
                刪除
              </button>
              <button type="submit" class=" fw-semibold btn btn-primary col-4">
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
import { ref, watch } from 'vue'
import commonFunction from '../assets/js/commonFunctions.js'
const { swalSuccess } = commonFunction.setup()
const props = defineProps([
  'tempObject', 'isNew', 'controlElement'
])
const addPointForm = ref(null)

/**
 * 按下完成 / 儲存 按鈕後要執行的動作
 * @param {Object} value VForm 預設綁定傳出參數
 */
function editLink (value) {
  if (props.isNew) {
    // 串接新增 連線方式 API
    swalSuccess('已新增')
  } else {
    // 串接新增 編輯連線方式 API
    swalSuccess('已儲存')
  }
  console.log(value)
  props.controlElement.hide()
}
watch(
  () => props.isNew,
  (newVal) => {
    if (newVal) {
      addPointForm.value.resetForm()
    }
  }
)
</script>
