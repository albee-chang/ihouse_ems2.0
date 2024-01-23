<template>
  <div class="offcanvas offcanvas-end account-offcanvas" data-bs-backdrop="static" tabindex="-1" id="accountEditOffcanvas"
    aria-labelledby="staticBackdropLabel">
    <div class="offcanvas-header">
      <h2 class="offcanvas-title fw-semibold" id="staticBackdropLabel">
        <div class="title-word mt-1">
          <span class="colr-block"></span>
          <span v-if="isNew">建立新帳號</span>
          <span v-else>編輯帳號</span>
        </div>
      </h2>
      <button type="button" class="btn-close rounded-5 bg-gray" aria-label="Close" @click="closOffcanvas()"></button>
    </div>

    <div class="offcanvas-body">
      <div>
        <img src="../assets/image/icons/uploadPhoto.png" alt="uploadPhoto" />
      </div>
      <VForm ref="editUserForm" class="needs-validation" v-slot="{ meta }">
        <div class="row g-3">
          <div class="col-8">
            <label for="account" class="form-label">帳號：</label>
            <VField class="form-control" id="account" name="account" type="text" rules="required" required
              placeholder="請輸入帳號" v-model="userObject.account" :disabled="!isNew" />
            <ErrorMessage as="p" class="invalid-feedback d-block mb-0" name="account" />
          </div>
          <div class="col-8">
            <label for="name" class="form-label">姓名：</label>
            <VField class="form-control" id="name" name="name" type="text" rules="required" required placeholder="請輸入姓名"
              v-model="userObject.name" />
            <ErrorMessage as="p" class="invalid-feedback d-block mb-0" name="name" />
          </div>
          <div class="col-8">
            <label for="tel" class="form-label">電話：</label>
            <VField class="form-control" id="tel" name="phone" type="tel" required rules="required|digits:10|numeric"
              placeholder="請輸入電話" v-model="userObject.phone" :disabled="!isNew" />
            <ErrorMessage as="p" class="invalid-feedback d-block mb-0" name="phone" />
          </div>
          <div class="col-12 d-flex select-lable-aligin gap-2">
            <div class="col-8">
              <label for="department" class="form-label">單位：</label>
              <VField id="department" name="department" as="select" class="form-select" required rules="required"
                v-model="userObject.department">
                <option value="" disabled>請選擇單位</option>
                <option v-for="department in departmentsRef" :key="department" :value="department">
                  {{ department }}
                </option>
              </VField>

              <ErrorMessage as="p" class="invalid-feedback d-block mb-0" name="department" />
            </div>
            <div class="col-4">
              <button type="button" class="btn btn-outline-primary" @click="addModal('department')">
                建立新單位
              </button>
            </div>
          </div>
          <div class="col-12 d-flex select-lable-aligin gap-2">
            <div class="col-8">
              <label for="title" class="form-label">職稱：</label>
              <VField id="title" name="title" as="select" class="form-select" required rules="required"
                v-model="userObject.title">
                <option value="" disabled>請選擇職稱</option>
                <option v-for="title in titlesRef" :key="title" :value="title">
                  {{ title }}
                </option>
              </VField>

              <ErrorMessage as="p" class="invalid-feedback d-block mb-0" name="title" />
            </div>
            <div class="col-4">
              <button type="button" class="btn btn-outline-primary" @click="addModal('title')">
                建立新職稱
              </button>
            </div>
          </div>
          <div class="col-8">
            <label for="system-access" class="form-label">系統權限：</label>
            <VField id="system-access" name="system-access" as="select" class="form-select" required rules="required"
              v-model="userObject.systemAccess">
              <option value="" disabled>請選擇權限</option>
              <option v-for="systemAccess in systemAccesss" :key="systemAccess" :value="systemAccess">
                {{ getSystemAccess(systemAccess) }}
              </option>
            </VField>
            <ErrorMessage as="p" class="invalid-feedback d-block mb-0" name="system-access" />
          </div>
        </div>

        <hr class="my-4" />
        <h3>頁面權限</h3>
        <div v-for="(access, index) in pageAccessArray" :key="access.key"
          class="col-12 d-flex align-items-start gap-2 mb-3">
          <div class="col-8">
            <VField :id="`page-${index}`" :name="`page-${index}`" as="select" class="form-select" required
              rules="required" v-model="access.page" :disabled="access.page !== ''">
              <option value="" disabled>請選擇頁面</option>
              <option v-for="page in webPages" :key="page" :value="page">
                {{ page }}
              </option>

                       </VField>
            <ErrorMessage as="p" class="invalid-feedback d-block mb-0" :name="`page-${index}`" />
          </div>
          <div class="col-4">
            <VField :id="`page-access-${index}`" :name="`page-access-${index}`" as="select" class="form-select" required
              rules="required" v-model="access.access">
              <option value="" disabled>請選擇權限</option>
              <option v-for="pageAccess in pageAccesss" :key="pageAccess" :value="pageAccess">
                {{ getPageAccess(pageAccess) }}
              </option>
              <option> <button type="button" @click="delePageAccess">移除權限</button></option>
            </VField>
            <ErrorMessage as="p" class="invalid-feedback d-block mb-0" :name="`page-access-${index}`" />
          </div>
        </div>

        <div class="col-4">
          <button type="button" class="btn" @click="addNewPage" :class="{
            'btn-outline-gray': (pageAccessArray && pageAccessArray[pageAccessArray.length - 1].page === ''),
            'btn-outline-primary': !(pageAccessArray && pageAccessArray[pageAccessArray.length - 1].page === '')
          }" :disabled="pageAccessArray && pageAccessArray[pageAccessArray.length - 1].page === ''">新增頁面</button>
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
  <AddModal :temp-array="tempArray" :array-name="arrayName" @dataAdjusted="handleDataAdjusted"></AddModal>
  <setPasswordCanvas :set-password-element="setPasswordElement" :account-edit-element="accountEditElement">
  </setPasswordCanvas>
</template>

<script setup>
import { ref, watch, onMounted, reactive } from 'vue'
import Swal from 'sweetalert2'
import setPasswordCanvas from '@/components/AccountSetPassword.vue'
import AddModal from '@/components/AddModal.vue'
import data from '../assets/sampleData.json'
import * as bootstrap from 'bootstrap'

const props = defineProps([
  'departments',
  'titles',
  'systemAccesss',
  'addModalElement',
  'accountEditElement',
  'isNew',
  'tempObject'
])

const tempArray = ref(null)
const arrayName = ref(null)
const departmentsRef = ref(props.departments)
const titlesRef = ref(props.titles)
const editUserForm = ref(null)
const webPages = data.webPages
const pageAccesss = data.pageAccesss

// 使用 reactive 使 userObject 成為響應式
const userObject = reactive({
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
})

let pageAccessArray = reactive([{
  page: '',
  access: ''
}])

// 監聽 props.tempObject 和 props.isNew 的變化
watch(() => props.tempObject, (newVal) => {
  if (newVal !== null) {
    Object.assign(userObject, newVal) // 覆蓋 userObject
    pageAccessArray = newVal.pageAccess // 更新 pageAccessArray
  }
}, { immediate: true })

watch(() => props.isNew, (newVal) => {
  if (newVal) {
    resetForm() // 重設表單為初始狀態
  }
})

const resetForm = () => {
  userObject.account = ''
  userObject.name = ''
  userObject.phone = ''
  userObject.department = ''
  userObject.title = ''
  userObject.systemAccess = ''
  userObject.pageAccess = [{ page: '', access: '' }]
  pageAccessArray = [{ page: '', access: '' }]
}

const addNewPage = () => {
  pageAccessArray.push({
    page: '',
    access: ''
  })
}
// watchEffect(() => {
//   if (!props.isNew) {
//     userObject = { ...props.tempObject }
//     pageAccessArray = userObject.pageAccess
//   } else {
//     pageAccessArray = [{
//       page: '',
//       access: ''
//     }]
//   }
// })

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
  props.accountEditElement.hide()
}

function delePageAccess () {
  Swal.fire({
    icon: 'success',
    title: '已移除',
    showConfirmButton: false,
    timer: 2000
  })
}

function closOffcanvas () {
  props.accountEditElement.hide()
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
