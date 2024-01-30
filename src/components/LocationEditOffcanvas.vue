<template>
  <div class="offcanvas offcanvas-end account-offcanvas" tabindex="-1" data-bs-backdrop="static"
    id="locationEditOffcanvas" aria-labelledby="locationEditOffcanvasLabel">
    <div class="offcanvas-header justify-content-end">
      <button type="button" class="btn-close rounded-5 bg-gray" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="title-word mt-1">
      <span class="colr-block"></span>
      <h2 class="mb-0 fw-lighter">編輯點位 </h2>
    </div>
    <div class="offcanvas-body">
      <h3 class="fw-lighter">點位基本資料</h3>
      <VForm class="needs-validation" ref="editLocationForm" @submit="saveLocation">
        <div class="row g-3">
          <VField type="hidden" class="form-control" name="id" id="id" v-model="dataObjectRef.id" disabled/>
          <div class="col-8">
            <label for="pointType" class="form-label">點位類型：</label>
            <VField type="text" class="form-control" name="pointType" id="pointType" placeholder="請輸入點位類型"/>
          </div>
          <div class="col-8">
            <label for="locationPoint" class="form-label">點位節點：</label>
            <VField
                class="form-select"
                id="locationPoint"
                name="locationPoint"
                as="select"
                required
              >
                <option value="" disabled>請選擇點位節點</option>
                <option value="1">1</option>
              </VField>

              <ErrorMessage
                as="p"
                class="invalid-feedback d-block mb-0"
                name="locationPoint"
              />
          </div>
          <div class="col-8">
            <label for="pointName" class="form-label">點位名稱：</label>
            <VField type="text" class="form-control" name="pointName" id="pointName" placeholder="請輸入點位名稱" v-model="dataObjectRef.point_name"/>

          </div>
          <div class="col-8">
            <label for="reg" class="form-label">資料數值：
            </label>
            <VField type="text" class="form-control" name="reg" id="reg" placeholder="請輸入資料數值" v-model="dataObjectRef.reg" />
          </div>
          <div class="col-12 d-flex align-items-end gap-2">
            <div class="col-8">
              <label for="value" class="form-label">設定數值：</label>
              <VField
                class="form-select"
                id="value"
                name="value"
                as="select"
                required
              >
                <option value="" disabled>請輸入設定數值</option>
                <option value="1">1</option>
              </VField>

              <ErrorMessage
                as="p"
                class="invalid-feedback d-block mb-0"
                name="value"
              />
            </div>
            <div class="col-4">
              <button type="button" class="btn btn-outline-primary">
                點位復歸
              </button>

            </div>
          </div>
          <div class="col-8">
            <label for="emegencyNotify" class="form-label">緊急通知：</label>
            <VField
                class="form-select"
                id="emegencyNotify"
                name="emegencyNotify"
                as="select"
                required
              >
                <option value="" disabled>請選擇是否需要緊急通知</option>
                <option value="yes">是</option>
              <option value="no">否</option>
              </VField>

              <ErrorMessage
                as="p"
                class="invalid-feedback d-block mb-0"
                name="emegencyNotify"
              />
          </div>
          <div class="col-8">
            <label for="linkCamera" class="form-label">連動攝影機：</label>
            <VField
                class="form-select"
                id="linkCamera"
                name="linkCamera"
                as="select"
                required
              >
                <option value="" disabled>請選擇攝影機</option>
                <option value="testCamera" >test Data</option>
                <!-- <option
                  v-for="department in departments"
                  :key="department"
                  :value="department"
                >
                  {{ department }}
                </option> -->
              </VField>

              <ErrorMessage
                as="p"
                class="invalid-feedback d-block mb-0"
                name="linkCamera"
              />
          </div>
        </div>

        <div class="mt-5 text-center">
          <button class="btn btn-primary w-50" type="submit">儲存</button>
        </div>
      </VForm>
    </div>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue'
import commonFunction from '../assets/js/commonFunctions.js'
const { swalSuccess } = commonFunction.setup()
const props = defineProps([
  'tempObject', 'elementControl'
])

const dataObjectRef = reactive({
  id: '',
  point_id: '',
  point_name: '',
  point_type: true,
  reg: '',
  method: '',
  status: true,
  value: 0
})
watch(
  () => props.tempObject,
  (newVal) => {
    if (newVal !== null) {
      Object.assign(dataObjectRef, newVal)
    }
  },
  { immediate: true }
)

function saveLocation (values) {
  // 請串接儲存後，修改的 API
  console.log(values)
  props.elementControl.hide()

  swalSuccess('修改成功')
}

</script>
