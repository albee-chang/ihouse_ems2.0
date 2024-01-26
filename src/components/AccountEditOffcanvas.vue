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
                {{ getSystemAccessChinese(systemAccess) }}
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
            <button type="button" class="btn btn-outline-gray dropdown-toggle" :class="[access.access !== '' ? 'text-black' : '']" data-bs-toggle="dropdown"
              aria-expanded="false">
              {{
                access.access !== ""
                ? getPageAccessChinese(access.access)
                : "請選擇權限"
              }}
            </button>
            <ul class="dropdown-menu access-box">
              <template v-for="pageAccess in pageAccesss" :key="pageAccess">
                <li class="d-flex">
                  <img src="../assets/image/icons/tick.svg" :class="[pageAccess === access.access ? 'visible' : '']" alt="tick">
                  <a class="dropdown-item" href="#" @click.prevent="selectPageAccess(access,pageAccess)">
                    {{ getPageAccessChinese(pageAccess) }}
                  </a>
                </li>
              </template>

              <li class="d-flex">
                <img src="../assets/image/icons/tick.svg"  alt="tick">
                <a class="dropdown-item text-danger border-0" href="#" @click.prevent="delePageAccess(access)">移除權限</a>
              </li>
            </ul>
          </div>
        </div>

        <div class="col-4">
          <button type="button" class="btn" @click="addNewPage" :class="{
            'btn-outline-gray':
              pageAccessArray &&
              pageAccessArray[pageAccessArray.length - 1].page === '',
            'btn-outline-primary': !(
              pageAccessArray &&
              pageAccessArray[pageAccessArray.length - 1].page === ''
            ),
          }" :disabled="pageAccessArray &&
  pageAccessArray[pageAccessArray.length - 1].page === ''
  ">
            新增頁面
          </button>
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
  <AddModal :temp-array="tempArray" :array-name="arrayName" @dataAdjusted="handleDataAdjusted"></AddModal>
  <setPasswordCanvas :user-object="userObject" :set-password-element="setPasswordElement" :account-edit-element="accountEditElement">
  </setPasswordCanvas>
</template>

<script setup>
import { ref, reactive, watch, onMounted } from 'vue'
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
const emit = defineEmits(['updateUserObject'])
const tempArray = ref(null)
const arrayName = ref(null)
const departmentsRef = ref(props.departments)
const titlesRef = ref(props.titles)
const editUserForm = ref(null)
const webPages = data.webPages
const pageAccesss = data.pageAccesss
const userObject = reactive({
  id: '',
  account: '',
  name: '',
  phone: '',
  department: '',
  title: '',
  systemAccess: '',
  pageAccess: [
    {
      page: '',
      access: ''
    }
  ]
})

let pageAccessArray = reactive([
  {
    page: '',
    access: ''
  }
])

watch(
  () => props.tempObject,
  (newVal) => {
    if (newVal !== null) {
      Object.assign(userObject, newVal)
      pageAccessArray = newVal.pageAccess
    }
  },
  { immediate: true }
)

watch(
  () => props.isNew,
  (newVal) => {
    if (newVal) {
      editUserForm.value.resetForm()
    }
  }
)

/**
 * 新增一個空頁面的物件，供表單選擇用
 */
function addNewPage () {
  pageAccessArray.push({
    page: '',
    access: ''
  })
}

/**
 * 建立新的使用者資料（按鈕下一步）
 * 先行建立資料後 -> 再去 製作密碼的 offcanvas
 */
function userFormSubmit () {
  // 請在這裡接要新增使用者的 API
  console.log(userObject)
  emit('updateUserObject', userObject)
  editUserForm.value.resetForm()
  setPasswordElement.value.show()
}

/**
 * 更新使用者資料使用 function
 * 將 userObject PUT 到 Server 端
 * emit 為模擬資料，傳送回主頁面
 */
function saveUserData () {
  // 請在這裡接 PUT 修改使用者的 API
  emit('updateUserObject', userObject)
  Swal.fire({
    icon: 'success',
    title: '已儲存',
    position: 'top',
    showConfirmButton: false,
    timer: 2000
  })
  props.accountEditElement.hide()
}

/**
 * 刪除頁面權限使用
 */
function delePageAccess (access) {
  // 請在這裡接 刪除 使用者頁面權限 的 API
  Swal.fire({
    icon: 'success',
    title: '已移除',
    position: 'top',
    showConfirmButton: false,
    timer: 2000
  })
}

/**
 * Bs5 btnGroup 製成下拉選單，變更頁面使用權限
 * @param {Object} access 要更改的頁面權限物件
 * @param {String} pageAccess 更改後的權限
 */
function selectPageAccess (access, pageAccess) {
  // 請在這裡接 變更 使用者頁面權限 的 API

  const index = userObject.pageAccess.findIndex(userObjectPage => userObjectPage.page === access.page)
  userObject.pageAccess[index].access = pageAccess
}

/**
 * 新增職稱、部門的 modal，用以控制開啟 modal 與帶入陣列資料
 * @param {String} addType 新增的類別，用以帶入相關資料陣列
 */
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
/**
 * 關閉 offcanvas
 */
function closOffcanvas () {
  props.accountEditElement.hide()
}

/**
 * 將系統權限從英文轉換為中文，若沒有規範，則傳回原始資料
 * @param {String} access 英文之系統權限名
 */
function getSystemAccessChinese (access) {
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

/**
 * 將頁面權限從英文轉換為中文，若沒有規範，則傳回原始資料
 * @param {String} access 英文之頁面權限
 */
function getPageAccessChinese (access) {
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
