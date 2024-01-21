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
            <VField class="form-control" id="device_id" name="device_id" type="text" rules="required" required placeholder="請輸入裝置ID"
              v-model="userObject.device_id" />
            <ErrorMessage as="p" class="invalid-feedback d-block mb-0" name="device_id" />
          </div>
          <div class="col-8">
            <label for="device_name" class="form-label">裝置名稱：</label>
            <VField class="form-control" id="device_name" name="device_name" type="text" required rules="required"
              placeholder="請輸入裝置名稱" v-model="userObject.device_name"/>
            <ErrorMessage as="p" class="invalid-feedback d-block mb-0" name="device_name" />
          </div>
          <div class="col-8">
            <label for="address" class="form-label">Address：</label>
            <VField class="form-control" id="address" name="address" type="text" required rules="required"
              placeholder="請輸入Address" v-model="userObject.address"/>
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
              <button type="button" class="btn btn-outline-primary text-nowrap" @click="addModal('department')">
                新增
              </button>
            </div>
            <div class="col-2">
              <button type="button" class="btn btn-outline-primary text-nowrap" @click="addModal('department')">
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
          <span v-if="isNew"><button class="btn btn-primary w-50" :class="[!meta.valid ? 'btn-gray' : 'btn-primary']" :disabled="!meta.valid"
            type="button" @click="userFormSubmit()">
            下一步
          </button></span>
          <span v-else><button class="btn btn-primary w-50" :class="[!meta.valid ? 'btn-gray' : 'btn-primary']" :disabled="!meta.valid"
            type="button" @click="saveUserData()">
            儲存
          </button></span>
        </div>
      </VForm>
    </div>
  </div>

  <!-- Add Modal -->
  <AddModal :temp-array="tempArray" :array-name="arrayName" @dataAdjusted="handleDataAdjusted" />
  <!-- <setPasswordCanvas :set-password-element="setPasswordElement" :account-edit-element="deviceEditElement" /> -->
  <deviceEdit2/>
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

function addModal (addType) {
  props.addModalElement.show()
  if (addType === 'title') {
    arrayName.value = 'title'
    tempArray.value = [...titlesRef.value]
  } else {
    arrayName.value = 'department'
    tempArray.value = [...departmentsRef.value]
  }
}
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
  setPasswordElement.value = new bootstrap.Offcanvas(
    document.querySelector('#setPasswordCanvas'),
    {
      keyboard: false
    }
  )
})
</script>
