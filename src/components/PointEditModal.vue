<template>
  <div
    class="modal fade"
    id="editPointModal"
    data-bs-backdrop="static"
    tabindex="-1"
    aria-labelledby="editPointModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content bg-white-box p-2">
        <div class="modal-header border-0">
          <div class="title-word">
            <span class="colr-block"></span>
            <h2 class="mb-0 fw-semibold">新增節點</h2>
          </div>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <VForm ref="editPointForm" @submit="editPointSubmit" v-slot="{ meta }">
            <div class="row g-3 mb-3">
              <div class="col-sm-6">
                <label for="point_id" class="form-label fs-5">點位ID：</label>
            <VField type="text" class="form-control" name="point_id" id="point_id" placeholder="請輸入點位ID" />
              </div>
              <div class="col-sm-6">
                <label for="modBus" class="form-label fs-5">起始暫存器：</label>
            <VField type="text" class="form-control" name="modBus" id="modBus" placeholder="請輸入名稱" />

              </div>
              <div class="col-sm-6">
                <label for="type" class="form-label fs-5">類型：</label>
                <VField
                class="form-select"
                id="type"
                name="type"
                as="select"
                required
              >
                <option value="" disabled>請選擇類型</option>
                <option value="1">1</option>
              </VField>
              </div>
              <div class="col-sm-6">
                <label for="swapMode" class="form-label fs-5">Swap Mode：</label>
                <VField
                class="form-select"
                id="swapMode"
                name="swapMode"
                as="select"
                required
              >
                <option value="" disabled>請選擇Swap Mode</option>
                <option value="1">1</option>
              </VField>
              </div>
              <div class="col-sm-6">
                <label for="functionCode" class="form-label fs-5">Function Code：</label>
                <VField
                class="form-select"
                id="functionCode"
                name="functionCode"
                as="select"
                required
              >
                <option value="" disabled>請選擇Function Code</option>
                <option value="1">1</option>
              </VField>
              </div>
              <div class="col-sm-6">
                <label for="divisor" class="form-label fs-5">除數：</label>
            <VField type="text" class="form-control" name="divisor" id="divisor" placeholder="請輸入數值" />
              </div>
              <div class="col-sm-6">
                <label for="reverse" class="form-label fs-5">Reverse：</label>
                <VField
                class="form-select"
                id="reverse"
                name="reverse"
                as="select"
                required
              >
                <option value="" disabled>請選擇Reverse</option>
                <option value="1">1</option>
              </VField>
              </div>
              <div class="col-sm-6">
                <label for="virtualPointType" class="form-label fs-5">虛擬節點類型：</label>
                <VField
                class="form-select"
                id="virtualPointType"
                name="virtualPointType"
                as="select"
                required
              >
                <option value="" disabled>請選擇類型</option>
                <option value="1">1</option>
              </VField>
              </div>
              <div class="col-sm-6">
                <label for="dataLength" class="form-label fs-5">資料長度：</label>
                <VField
                class="form-select"
                id="dataLength"
                name="dataLength"
                as="select"
                required
              >
                <option value="" disabled>請選擇資料長度</option>
                <option value="1">1</option>
              </VField>
              </div>
              <div class="col-sm-6">
                <label for="renewTime" class="form-label fs-5">資料刷新時間（ms）：</label>
            <VField type="text" class="form-control" name="renewTime" id="renewTime" placeholder="請輸入時間" />
              </div>
            </div>
            <div class="text-center my-4">
              <button type="submit" class="fw-semibold col-4 btn" :class="[!meta.valid ? 'btn-gray' : 'btn-primary']"
              :disabled="!meta.valid">
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
const props = defineProps([
  'controlElement'
])
function editPointSubmit (values) {
  console.log(values)
  props.controlElement.hide()
}
</script>
