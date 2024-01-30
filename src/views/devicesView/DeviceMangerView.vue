<template>
  <div class="container">
    <ItemNav :nav-where = "'devices'"/>
    <section class="bg-white-box mb-2">
      <VForm class="d-flex justify-content-between align-items-end"   ref="searchForm" @submit="searchFormSubmit">
        <div class="d-flex gap-2">
          <div class="">
            <label for="searchInput" class="form-label"
              >裝置ID、裝置名稱</label
            >
            <VField type="text" class="form-control" name="searchInput" id="searchInput" placeholder="請輸入ID、名稱" />
          </div>
          <div class="">
            <label for="device" class="form-label">裝置</label>
            <VField
                class="form-select"
                id="device"
                name="device"
                as="select"
                required
              >
                <option value="" disabled>請選擇裝置類型</option>
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
                name="device"
              />
          </div>
          <div class="">
            <label for="enabled-state" class="form-label">啟用狀態</label>
            <VField
                class="form-select" id="enabled-state"
                name="enabled-state"
                as="select"
                required
              >
                <option value="" disabled>請選擇啟用狀態</option>
                <option value="up" >啟用中</option>
                <option value="down" >停用中</option>
              </VField>

              <ErrorMessage
                as="p"
                class="invalid-feedback d-block mb-0"
                name="enabled-state"
              />
          </div>
          <div class="">
            <label for="link-state" class="form-label">連線狀態</label>
            <VField
                class="form-select" id="link-state"
                name="link-state"
                as="select"
                required
              >
                <option value="" disabled>請選擇連線狀態</option>
                <option value="" disabled>123</option>
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
                name="link-state"
              />
          </div>
        </div>
        <div class="d-flex gap-2">
          <button type="button" class="btn btn-outline-gray fw-semibold" @click="searchFormClean()">
            清除
          </button>
          <button type="submit" class="btn btn-gray fw-semibold text-white">
            搜尋
          </button>
        </div>
      </VForm>
    </section>
    <section>
      <div class="d-flex justify-content-between align-items-end mb-2">
        <h4 class=" fw-lighter">列表</h4>
        <div class="d-flex gap-2 align-items-center me-2">
          <p class="mb-0 me-2">共計：{{deviceDatas.length}} 筆</p>
          <button
            class="btn btn-outline-primary  fw-lighter"
            type="button"
            @click="editDevice(tempObject, 'new')"
          >
          新增裝置
          </button>

        </div>
      </div>
      <!-- table area -->
      <div class="bg-white-box">
        <div class="table-responsive">
          <table class="table table-hover">
            <thead class="table-head">
              <tr>
                <th scope="col">排序</th>
                <th class="table-img-col" scope="col">
                  <p class="border-start border-2 ps-2 mb-0">裝置ID</p>
                </th>
                <th scope="col">裝置名稱</th>
                <th scope="col">裝置類型</th>
                <th scope="col">連線ID</th>
                <th scope="col">站號</th>
                <th scope="col">啟用狀態</th>
                <th scope="col">連線狀態</th>
                <th scope="col">
                  <p class="border-start border-2 ps-2 mb-0">操作</p>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(deviceData, index) in deviceDatas" :key="deviceData.id">
                <th scope="row" class="text-center">{{ index+1 }}</th>
                <td>{{deviceData.device_id}}</td>
                <td>{{deviceData.device_name}}</td>
                <td>{{deviceData.device_type}}</td>
                <td>{{deviceData.connect_id}}</td>
                <td>{{ deviceData.station_id }}</td>
                <td>
                  <template v-if="deviceData.enabled_status === true">
                      啟用中
                  </template>
                  <template v-else>
                    停用中
                  </template>
                </td>
                <td>
                  <span class="device-statu device-link" v-if="deviceData.device_status">連線中</span>
                  <span class="device-statu" v-else>斷線中</span>
                </td>
                <td>
                  <div class="ps-2">
                    <button
                      type="button"
                      class="btn btn-outline-primary border-0 fw-light"
                      @click="editDevice(deviceData)"
                    >
                      編輯
                    </button>
                    <button
                      type="button"
                      class="btn btn-outline-danger border-0 fw-light"
                      @click="delBtn(deviceData)"
                    >
                      刪除
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  </div>

  <deviceEdit
    :is-new="isNew"
    :temp-object="tempObject"
    :device-edit-element="deviceEditElement"/>

      <!-- Delete Modal -->
  <div
    class="modal fade"
    id="delModal"
    data-bs-backdrop="static"
    tabindex="-1"
    aria-labelledby="delModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content bg-white-box">
        <div class="modal-header border-0">
          <div class="title-word">
            <span class="colr-block"></span>
            <h2 class="mb-0 fw-semibold">刪除裝置</h2>
          </div>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>

        <div class="modal-body">
          <!-- Input field in the modal body -->
          <p>
            確定要刪除
            <span class="fw-semibold">{{ tempArray?.device_name }}</span> 裝置嗎？
          </p>
          <div class="d-flex gap-2 justify-content-center">
            <button
              type="submit"
              class="fw-semibold btn btn-danger w-50"
              @click="checkDel(tempArray?.id)"
            >
              確定刪除
            </button>
            <button
              type="submit"
              class="fw-semibold btn btn-outline-black w-50"
              data-bs-dismiss="modal"
            >
              取消
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import data from '@/assets/sampleData.json'
import deviceEdit from '@/components/deviceEditOffcanvas.vue'
import ItemNav from '@/components/ItemNav.vue'
import { ref, onMounted } from 'vue'
import * as bootstrap from 'bootstrap'
import commonFunction from '../../assets/js/commonFunctions.js'
const { swalSuccess } = commonFunction.setup()
const deviceDatas = ref(data.deviceDatas)
const deviceEditElement = ref(null)
const delModalElement = ref(null)
// const tempArray = ref(null)
const isNew = ref(null)
const tempObject = ref(null)
const tempArray = ref(null)

const searchForm = ref(null)

/**
 * 搜尋函式，串接 搜尋按鈕後需要進行的動作，用來更新畫面
 */
function searchFormSubmit (values) {
// 請串接 搜尋後的 API
// 按鈕資料如下
//   {
//     "searchInput": "testInput",
//     "department": "總管理部",
//     "title": "總經理"
// }
  console.log(values)
}

/**
 * 清除表單內容，為套件 API
 */
function searchFormClean () {
  searchForm.value.resetForm()
}
/**
 * 開啟編輯裝置的 offcanvas 函數，透過帶入裝置物件與按鈕為新增或是編輯。將資料帶入指定 offcanvas
 * @param {Object} object 帶入需編輯的物件，或是新的空值物件
 * @param {*} modalStatus 欲開啟的編輯狀態
 */
function editDevice (object, modalStatus) {
  if (modalStatus === 'new') {
    isNew.value = true
    tempObject.value = {
      id: '',
      device_id: '',
      device_name: '',
      device_type: '',
      connect_id: '',
      station_id: '',
      enabled_status: false,
      device_status: false
    }
  } else {
    isNew.value = false
    tempObject.value = { ...object }
  }
  deviceEditElement.value.show()
}

/**
 * 將使用者傳入 彈跳視窗，同時開啟 確認刪除的畫面
 * @param {Object} item 要刪除的物件資料
 */
function delBtn (item) {
  delModalElement.value.show()
  tempArray.value = { ...item }
}

/**
 * 確認刪除 按鈕後 的動作
 * @param {number} id 要刪除的 ID，預設 NUMBER 等後續 API 確認調整
 */
function checkDel (id) {
  // 這裡請串接 刪除 裝置 API
  deviceDatas.value = deviceDatas.value.filter(
    (item, index) => item.id !== id
  )
  tempArray.value = null
  delModalElement.value.hide()
  swalSuccess('已刪除')
}

// 掛載 bootstrap 內建的 彈跳視窗綁定 ID
onMounted(() => {
  deviceEditElement.value = new bootstrap.Offcanvas('#deviceEditOffcanvas',
    {
      keyboard: false
    }
  )
  delModalElement.value = new bootstrap.Modal('#delModal',
    {
      keyboard: false
    }
  )
})
</script>
