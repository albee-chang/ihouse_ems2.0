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
      <VForm ref="editDeviceForm" class="needs-validation" v-slot="{ meta }">
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
              <button type="button" class="btn btn-outline-primary text-nowrap" @click="openEditLink('new')">
                新增
              </button>
            </div>
            <div class="col-2">
              <button type="button" class="btn btn-outline-primary text-nowrap" @click="openEditLink()">
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
          <button class="btn btn-primary w-50" :class="[!meta.valid ? 'btn-gray' : 'btn-primary']"
              :disabled="!meta.valid" type="button" @click="userFormSubmit()">
              下一步
            </button>
        </div>
      </VForm>
    </div>
  </div>

  <!-- Add Modal -->
  <!-- <AddModal :temp-array="tempArray" :array-name="arrayName" @dataAdjusted="handleDataAdjusted" /> -->
  <!-- <setPasswordCanvas :set-password-element="setPasswordElement" :account-edit-element="deviceEditElement" /> -->
  <!-- <deviceEdit2 /> -->
  <!-- addLink Modal -->
  <EditLinkFnModal :temp-array="tempArray" :is-new="isAddNew" :control-element="editLinkElement" @dataAdjusted="handleDataAdjusted" />
  <DeviceToPointOffcanvas :device-to-point-element="deviceToPointElement" :device-edit-element="deviceEditElement"/>
</template>

<script setup>
import { ref, reactive, watch, onMounted } from 'vue'
import EditLinkFnModal from './LinkFnEditModal.vue'
import DeviceToPointOffcanvas from './DeviceToPointOffcanvas.vue'
import * as bootstrap from 'bootstrap'
const props = defineProps([
  'deviceEditElement',
  'isNew',
  'tempObject'
])
const emit = defineEmits(['updateUserObject'])
const isAddNew = ref(null)
const tempArray = ref(null)
// const arrayName = ref(null)
const departmentsRef = ref(props.departments)
const titlesRef = ref(props.titles)
const editDeviceForm = ref(null)
const editLinkElement = ref(null)
const deviceToPointElement = ref(null)
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

function openEditLink (isNew) {
  if (isNew === 'new') {
    isAddNew.value = true
  } else {
    isAddNew.value = false
  }
  editLinkElement.value.show()
}

/**
 * 建立新的使用者資料（按鈕下一步）
 * 先行建立資料後 -> 再去 製作密碼的 offcanvas
 */
function userFormSubmit () {
  // 請在這裡接要新增使用者的 API
  console.log(userObject)
  emit('updateUserObject', userObject)
  editDeviceForm.value.resetForm()
  deviceToPointElement.value.show()
}
/**
 * 關閉 offcanvas
 */
function closOffcanvas () {
  props.deviceEditElement.hide()
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
  // props.addModalElement.hide()
}

onMounted(() => {
  editLinkElement.value = new bootstrap.Modal(
    document.querySelector('#editLinkModal'),
    {
      keyboard: false
    }
  )
  deviceToPointElement.value = new bootstrap.Offcanvas(
    document.querySelector('#deviceToPoint'),
    {
      keyboard: false
    }
  )
})
watch(
  () => props.tempObject,
  (newVal) => {
    if (newVal !== null) {
      Object.assign(userObject, newVal)
    }
  },
  { immediate: true }
)

watch(
  () => props.isNew,
  (newVal) => {
    if (newVal) {
      editDeviceForm.value.resetForm()
    }
  }
)

</script>
