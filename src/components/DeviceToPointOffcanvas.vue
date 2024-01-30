<template>
  <div class="offcanvas offcanvas-end p-3" tabindex="-1" data-bs-backdrop="static" id="deviceToPoint"
    aria-labelledby="deviceToPointOffcanvas">
    <div class="offcanvas-header justify-content-end">
      <button type="button" class="btn-close rounded-5 bg-gray" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="title-word mt-1">
      <span class="colr-block"></span>
      <h2 class="mb-0 fw-semibold">編輯裝置</h2>
    </div>
    <div class="offcanvas-body">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h3 class=" fw-semibold">對應點位</h3>
        <button type="button" class="btn btn-outline-primary" @click="editPoint('new')">
          新增節點
        </button>
      </div>
      <div class="table-responsive">
        <table class="table table-hover">
          <thead class="table-head">
            <tr>
              <th scope="col">點位ID</th>
              <th scope="col">點位類型</th>
              <th scope="col">起始暫存器</th>
              <th scope="col">功能碼</th>
              <th scope="col">交換模式</th>
              <th scope="col">
                <p class="border-start border-2 ps-2 mb-0">操作</p>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>t</td>
              <td>float</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>
                <div class="ps-2">
                  <button class="btn btn-outline-primary border-0 fw-semibold" type="button" @click="editBtn">
                    編輯
                  </button>
                  <button class="btn btn-outline-danger border-0 fw-semibold" type="button" @click="delBtn">
                    刪除
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
    <div class="offcanvs-footer">
            <div class="btn-set d-flex flex-column  align-items-center">
        <div class="mt-5 d-flex gap-2 mb-3 w-75 ">
          <button class="btn btn-outline-gray text-black w-50" type="button" @click="backBtn()">
            上一步
          </button>
          <button class="btn btn-primary w-50" type="button" @click="userFormSubmit(value)">
            完成
          </button>
        </div>
        <div class="btn-group w-50" role="group" aria-label="Basic outlined">
          <button type="button" class="btn btn-outline-black fs-5 border-0">匯出設定</button>
          <button type="button" class="btn btn-outline-black fs-5 border-0 border-start">匯入設定</button>
        </div>
      </div>
    </div>
  </div>
  <PointEditModal :control-element="editPointElement"/>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as bootstrap from 'bootstrap'
import commonFunction from '../assets/js/commonFunctions.js'
import PointEditModal from './PointEditModal.vue'
const { swalSuccess } = commonFunction.setup()

const setPasswordForm = ref(null)

const editPointElement = ref(null)
const props = defineProps([
  'deviceToPointElement', 'deviceEditElement'
])

function userFormSubmit (value) {
  setPasswordForm.value.resetForm()
  props.deviceToPointElement.hide()
  props.deviceEditElement.hide()
  swalSuccess('已完成')
}

function editPoint (isNew) {
  if (isNew === 'new') {
    console.log('new')
  } else {
    console.log('Notnew')
  }
  editPointElement.value.show()
}
function backBtn () {
  props.deviceToPointElement.hide()
}

function editBtn () {
  console.log('edit Click')
}

function delBtn () {
  console.log('delete Click')
}

onMounted(() => {
  editPointElement.value = new bootstrap.Modal(
    document.querySelector('#editPointModal'),
    {
      keyboard: false
    }
  )
})
</script>
