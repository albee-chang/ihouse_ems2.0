<template>
  <div class="offcanvas offcanvas-end account-offcanvas" data-bs-backdrop="static" tabindex="-1" id="deviceEditOffcanvas"
    aria-labelledby="staticBackdropLabel">
    <div class="offcanvas-header">
      <h2 class="offcanvas-title fw-semibold" id="staticBackdropLabel">
        <div class="title-word mt-1">
          <span class="colr-block"></span>
          <span v-if="isNew">新增裝置</span>
          <span v-else>編輯裝置</span>
        </div>
      </h2>
      <button type="button" class="btn-close rounded-5 bg-gray" aria-label="Close" @click="closOffcanvas()"></button>
    </div>

    <div class="offcanvas-body">
      <div class="mb-3">
        <h3 class="fw-lighter">裝置類型</h3>
      </div>
      <VForm ref="editUserForm" class="needs-validation" v-slot="{ meta }">
        <div class="row g-3">
          <div class="col-8">
            <label for="device-model" class="form-label fs-5">型號：</label>
            <VField id="device-model" name="device-model" as="select" class="form-select" required rules="required"
              v-model="userObject.model">
              <option value="" disabled>請選擇型號</option>
              <option value="1">1</option>
              <!-- <option v-for="title in titlesRef" :key="title" :value="title">
                  {{ title }}
                </option> -->
            </VField>
            <ErrorMessage as="p" class="invalid-feedback d-block mb-0" name="device-model" />
          </div>
          <div class="separator"></div>
          <div class="col-8">
            <label for="device_id" class="form-label">裝置ID：</label>
            <VField class="form-control" id="device_id" name="device_id" type="text" rules="required" required
              placeholder="請輸入裝置ID" v-model="userObject.device_id" />
            <ErrorMessage as="p" class="invalid-feedback d-block mb-0" name="device_id" />
          </div>
          <div class="col-8">
            <label for="device_name" class="form-label">裝置名稱：</label>
            <VField class="form-control" id="device_name" name="device_name" type="text" required rules="required"
              placeholder="請輸入裝置名稱" v-model="userObject.device_name" />
            <ErrorMessage as="p" class="invalid-feedback d-block mb-0" name="device_name" />
          </div>
          <div class="col-8">
            <label for="address" class="form-label">Address：</label>
            <VField class="form-control" id="address" name="address" type="text" required rules="required"
              placeholder="請輸入Address" v-model="userObject.address" />
            <ErrorMessage as="p" class="invalid-feedback d-block mb-0" name="address" />
          </div>
          <div class="col-12 d-flex select-lable-aligin gap-1">
            <div class="col-8">
              <label for="department" class="form-label">連線方式：</label>
              <VField id="department" name="department" as="select" class="form-select" required rules="required"
                v-model="userObject.department">
                <option value="" disabled>請選擇連線方式</option>
                <option value="1">1</option>
                <!-- <option v-for="department in departmentsRef" :key="department" :value="department">
                  {{ department }}
                </option> -->
              </VField>

              <ErrorMessage as="p" class="invalid-feedback d-block mb-0" name="department" />
            </div>
            <div class="col-2">
              <button type="button" class="btn btn-outline-primary text-nowrap" @click="openAddLink()">
                新增
              </button>
            </div>
            <div class="col-2">
              <button type="button" class="btn btn-outline-primary text-nowrap" @click="openeditLink()">
                編輯
              </button>
            </div>
          </div>
          <div class="col-8">
            <label for="statu" class="form-label">狀態：</label>
            <VField id="statu" name="statu" as="select" class="form-select" required rules="required"
              v-model="userObject.device_status">
              <option value="" disabled>請選擇狀態</option>
              <option value="1">1</option>

              <!-- <option v-for="title in titlesRef" :key="title" :value="title">
                  {{ title }}
                </option> -->
            </VField>
            <ErrorMessage as="p" class="invalid-feedback d-block mb-0" name="statu" />
          </div>
          <div class="col-8">
            <label for="baudrate" class="form-label">Baudrate：</label>
            <VField id="baudrate" name="baudrate" as="select" class="form-select" required rules="required"
              v-model="userObject.baudrate">
              <option value="" disabled>請選擇</option>
              <option value="1">1</option>

              <!-- <option v-for="title in titlesRef" :key="title" :value="title">
                  {{ title }}
                </option> -->
            </VField>
            <ErrorMessage as="p" class="invalid-feedback d-block mb-0" name="baudrate" />
          </div>
        </div>
        <div class="mt-5 text-center">
          <span v-if="isNew"><button class="btn btn-primary w-50" :class="[!meta.valid ? 'btn-gray' : 'btn-primary']"
              :disabled="!meta.valid" type="button" @click="userFormSubmit()">
              下一步
            </button></span>
          <span v-else><button class="btn btn-primary w-50" :class="[!meta.valid ? 'btn-gray' : 'btn-primary']"
              :disabled="!meta.valid" type="button" @click="saveUserData()">
              儲存
            </button></span>
        </div>
      </VForm>
    </div>
  </div>

  <!-- Add Modal -->
  <AddModal :temp-array="tempArray" :array-name="arrayName" @dataAdjusted="handleDataAdjusted" />
  <!-- <setPasswordCanvas :set-password-element="setPasswordElement" :account-edit-element="deviceEditElement" /> -->
  <deviceEdit2 />
  <!-- addLink Modal -->
  <div class="modal fade" id="addLinkModal" data-bs-backdrop="static" tabindex="-1" aria-labelledby="addLinkModalLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content bg-white-box p-2">
        <div class="modal-header border-0">
          <div class="title-word">
            <span class="colr-block"></span>
            <h2 class="mb-0 fw-lighter">新增連線方式</h2>
          </div>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <VForm ref="addPointForm" @submit="addLink">
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
              <div class="col-12 bg-light mb-2 p-3">
                <label for="inputField" class="form-label fs-5 fw-lighter">連線方式：</label>
                <select class="form-select" id="" required="">
                  <option value="">請選擇連線方式</option>
                  <option>1</option>
                </select>
              </div>
              <div class="col-12">
                <label for="inputField" class="form-label fs-5">連線ID：</label>
                <input type="text" class="form-control" id="inputField" placeholder="請輸入連線ID" />
              </div>
              <div class="col-12">
                <label for="inputField" class="form-label fs-5">連線名稱：</label>
                <select class="form-select" id="" required="">
                  <option value="">請輸入連線名稱</option>
                  <option>1</option>
                </select>
              </div>
              <div class="col-12">
                <label for="inputField" class="form-label fs-5">Port：</label>
                <select class="form-select" id="" required="">
                  <option value="">請選擇Port</option>
                  <option>1</option>
                </select>
              </div>
              <div class="col-12">
                <label for="inputField" class="form-label fs-5">Baudrate：</label>
                <input type="text" class="form-control" id="inputField" placeholder="請輸入Baudrate" />
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

    <!-- editLink Modal -->
    <div class="modal fade" id="editLinkModal" data-bs-backdrop="static" tabindex="-1" aria-labelledby="editLinkModalLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content bg-white-box p-2">
        <div class="modal-header border-0">
          <div class="title-word">
            <span class="colr-block"></span>
            <h2 class="mb-0 fw-lighter">編輯連線方式</h2>
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
              <div class="col-12 bg-light mb-2 p-3">
                <label for="inputField" class="form-label fs-5 fw-lighter">連線方式：</label>
                <select class="form-select" id="" required="">
                  <option value="">請選擇連線方式</option>
                  <option>1</option>
                </select>
              </div>
              <div class="col-12">
                <label for="inputField" class="form-label fs-5">連線ID：</label>
                <input type="text" class="form-control" id="inputField" placeholder="請輸入連線ID" />
              </div>
              <div class="col-12">
                <label for="inputField" class="form-label fs-5">連線名稱：</label>
                <select class="form-select" id="" required="">
                  <option value="">請輸入連線名稱</option>
                  <option>1</option>
                </select>
              </div>
              <div class="col-12">
                <label for="inputField" class="form-label fs-5">Port：</label>
                <select class="form-select" id="" required="">
                  <option value="">請選擇Port</option>
                  <option>1</option>
                </select>
              </div>
              <div class="col-12">
                <label for="inputField" class="form-label fs-5">Baudrate：</label>
                <input type="text" class="form-control" id="inputField" placeholder="請輸入Baudrate" />
              </div>
            </div>
            <div class="text-center d-flex gap-3 justify-content-center">
              <button type="submit" class=" fw-lighter btn btn-outline-danger"
                >
                刪除
              </button>
              <button type="submit" class=" fw-lighter btn" :class="[!newData ? 'btn-gray' : 'btn-primary']"
                :disabled="!newData">
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
import { ref, onMounted, watchEffect } from 'vue'
import Swal from 'sweetalert2'
import deviceEdit2 from '@/components/DeviceEditOffcanvas2.vue'
import AddModal from '@/components/AddModal.vue'
import data from '../assets/sampleData.json'
import * as bootstrap from 'bootstrap'
const props = defineProps([
  'departments',
  'titles',
  'systemAccesss',
  'addModalElement',
  'deviceEditElement',
  'isNew',
  'tempObject'
])
const tempArray = ref(null)
const arrayName = ref(null)
const departmentsRef = ref(props.departments)
const titlesRef = ref(props.titles)
const editUserForm = ref(null)
const webPages = data.webPages
const editLinkElement = ref(null)
const openeditLink = () => {
  editLinkElement.value.show()
}
const editLink = () => {
  editLinkElement.value.hide()
  Swal.fire({
    icon: 'success',
    title: '已儲存',
    showConfirmButton: false,
    timer: 2000
  })
}
const addLinkElement = ref(null)
const openAddLink = () => {
  addLinkElement.value.show()
}
const addLink = () => {
  addLinkElement.value.hide()
  Swal.fire({
    icon: 'success',
    title: '已新增',
    showConfirmButton: false,
    timer: 2000
  })
}
console.log(webPages)
const pageAccesss = data.pageAccesss
console.log(pageAccesss)
let pageAccessArray = [{
  page: '',
  access: ''
}]

let userObject = {
  account: '',
  name: '',
  phone: '',
  department: '',
  title: '',
  systemAccess: '',
  pageAccess: [{
    page: '',
    access: ''
  }]
}

if (props.tempObject !== null) {
  console.log('temp Not Null')
  userObject = { ...props.tempObject }
  pageAccessArray = userObject.pageAccess
}

const addNewPage = () => {
  pageAccessArray.push({
    page: '',
    access: ''
  })
}
addNewPage()
watchEffect(() => {
  if (!props.isNew) {
    userObject = { ...props.tempObject }
    pageAccessArray = userObject.pageAccess
  } else {
    pageAccessArray = [{
      page: '',
      access: ''
    }]
  }
})

function userFormSubmit (vaue) {
  editUserForm.value.resetForm()
  setPasswordElement.value.show()
}

function saveUserData (vaue) {
  Swal.fire({
    icon: 'success',
    title: '已儲存',
    showConfirmButton: false,
    timer: 2000
  })
  props.deviceEditElement.hide()
}

function delePageAccess () {
  Swal.fire({
    icon: 'success',
    title: '已移除',
    showConfirmButton: false,
    timer: 2000
  })
}
delePageAccess()
function closOffcanvas () {
  props.deviceEditElement.hide()
}

// function addModal (addType) {
//   props.addModalElement.show()
//   if (addType === 'title') {
//     arrayName.value = 'title'
//     tempArray.value = [...titlesRef.value]
//   } else {
//     arrayName.value = 'department'
//     tempArray.value = [...departmentsRef.value]
//   }
// }
function getSystemAccess (access) {
  switch (access) {
    case 'Admin':
      return '系統管理員'
    case 'editable':
      return '可編輯'
    case 'onlyView':
      return '僅檢視'
    case 'deactivate':
      return '停用中'
    default:
      return access
  }
}
getSystemAccess()
function getPageAccess (access) {
  switch (access) {
    case 'editable':
      return '編輯者'
    case 'onlyView':
      return '檢視者'
    case 'del':
      return '移除權限'
    default:
      return access
  }
}
getPageAccess()
function handleDataAdjusted (dataAdjusted) {
  const { arrayName, adjustedArray } = dataAdjusted
  switch (arrayName) {
    case 'title':
      titlesRef.value = adjustedArray
      break
    case 'department':
      departmentsRef.value = adjustedArray
      break
    default:
      console.error(dataAdjusted)
      break
  }
  props.addModalElement.hide()
}
const setPasswordElement = ref(null)

onMounted(() => {
  addLinkElement.value = new bootstrap.Modal(
    document.querySelector('#addLinkModal'),
    {
      keyboard: false
    }
  )
  editLinkElement.value = new bootstrap.Modal(
    document.querySelector('#editLinkModal'),
    {
      keyboard: false
    }
  )
  setPasswordElement.value = new bootstrap.Offcanvas(
    document.querySelector('#setPasswordCanvas'),
    {
      keyboard: false
    }
  )
})
</script>
