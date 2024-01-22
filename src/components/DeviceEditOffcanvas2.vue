<template>
  <div class="offcanvas offcanvas-end p-3" tabindex="-1" data-bs-backdrop="static" id="setPasswordCanvas"
    aria-labelledby="accountEditOffcanvasLabel">
    <div class="offcanvas-header justify-content-end">
      <button type="button" class="btn-close rounded-5 bg-gray" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="title-word mt-1">
      <span class="colr-block"></span>
      <h2 class="mb-0 fw-semibold">編輯裝置</h2>
    </div>
    <div class="offcanvas-body">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h3 class="fw-lighter">對應點位</h3>
        <button type="button" class="btn btn-outline-primary" @click="openModal">
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
                  <button class="btn btn-outline-primary border-0 fw-lighter" type="button" data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
                    編輯
                  </button>
                  <button class="btn btn-outline-danger border-0 fw-lighter" type="button" data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
                    刪除
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="btn-set d-flex flex-column  align-items-center">
        <div class="mt-5 d-flex gap-2 mb-3 w-75 ">
          <button class="btn btn-outline-gray text-black w-50" type="button" @click="userFormSubmit()">
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
  <!-- addPoint Modal -->
  <div class="modal fade" id="addPointModal" data-bs-backdrop="static" tabindex="-1" aria-labelledby="addPointModalLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content bg-white-box p-2">
        <div class="modal-header border-0">
          <div class="title-word">
            <span class="colr-block"></span>
            <h2 class="mb-0 fw-lighter">新增節點</h2>
          </div>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <VForm ref="addPointForm" @submit="addPoint">
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
              <div class="col-sm-6">
                <label for="inputField" class="form-label fs-5">點位ID：</label>
                <input type="text" class="form-control" id="inputField" placeholder="請輸入點位ID" />
              </div>
              <div class="col-sm-6">
                <label for="inputField" class="form-label fs-5">起始暫存器：</label>
                <input type="text" class="form-control" id="inputField" placeholder="請輸入名稱" />
              </div>
              <div class="col-sm-6">
                <label for="inputField" class="form-label fs-5">類型：</label>
                <select class="form-select" id="" required="">
                  <option value="">請選擇類型</option>
                  <option>1</option>
                </select>
              </div>
              <div class="col-sm-6">
                <label for="inputField" class="form-label fs-5">Swap Mode：</label>
                <select class="form-select" id="" required="">
                  <option value="">請選擇Swap Mode</option>
                  <option>1</option>
                </select>
              </div>
              <div class="col-sm-6">
                <label for="inputField" class="form-label fs-5">Function Code：</label>
                <select class="form-select" id="" required="">
                  <option value="">請選擇Function Code</option>
                  <option>1</option>
                </select>
              </div>
              <div class="col-sm-6">
                <label for="inputField" class="form-label fs-5">除數：</label>
                <input type="text" class="form-control" id="inputField" placeholder="請輸入名稱" />
              </div>
              <div class="col-sm-6">
                <label for="inputField" class="form-label fs-5">Reverse：</label>
                <select class="form-select" id="" required="">
                  <option value="">請選擇Reverse </option>
                  <option>1</option>
                </select>
              </div>
              <div class="col-sm-6">
                <label for="inputField" class="form-label fs-5">虛擬節點類型：</label>
                <select class="form-select" id="" required="">
                  <option value="">請選擇類型</option>
                  <option>1</option>
                </select>
              </div>
              <div class="col-sm-6">
                <label for="inputField" class="form-label fs-5">資料長度：</label>
                <select class="form-select" id="" required="">
                  <option value="">請選擇資料長度</option>
                  <option>1</option>
                </select>
              </div>
              <div class="col-sm-6">
                <label for="inputField" class="form-label fs-5">資料刷新時間（ms）：</label>
                <input type="text" class="form-control" id="inputField" placeholder="請輸入時間" />
              </div>
            </div>
            <div class="text-center">
              <button type="submit" class=" fw-lighter btn" :class="[!newData ? 'btn-gray' : 'btn-primary']"
                :disabled="!newData">
                完成
              </button>
            </div>
          </VForm>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Swal from 'sweetalert2'
import * as bootstrap from 'bootstrap'

const setPasswordForm = ref(null)

const addPointElement = ref(null)
const props = defineProps([
  'setPasswordElement', 'accountEditElement'
])

function userFormSubmit (value) {
  setPasswordForm.value.resetForm()
  props.setPasswordElement.hide()
  props.accountEditElement.hide()
  Swal.fire({
    icon: 'success',
    title: '已建立',
    showConfirmButton: false,
    timer: 2000
  })
}

const userObject = {
  account: '',
  name: '',
  phone: '',
  department: '',
  title: '',
  systemAccess: '',
  page: ''
}
console.log(userObject)
const openModal = () => {
  addPointElement.value.show()
}
const addPoint = () => {
  addPointElement.value.hide()
  Swal.fire({
    icon: 'success',
    title: '已新增',
    showConfirmButton: false,
    timer: 2000
  })
}

onMounted(() => {
  addPointElement.value = new bootstrap.Modal(
    document.querySelector('#addPointModal'),
    {
      keyboard: false
    }
  )
})
</script>
