<template>
  <div class="container">
    <ul class="list-unstyled d-flex page-box mb-4">
      <li class="page-item">
        <router-link to="/devices/devicesManger" class="page-link fs-4">裝置列表</router-link>
      </li>
      <li class="page-item">
        <router-link to="/devices/locationManger" class="page-link  fs-4">點位列表</router-link>
      </li>
    </ul>
    <section class="bg-white-box mb-2">
      <form class="d-flex justify-content-between align-items-end">
        <div class="d-flex gap-2">
          <div class="">
            <label for="exampleFormControlInput1" class="form-label"
              >裝置ID、裝置名稱</label
            >
            <input
              type="text"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder="請輸入ID、名稱"
            />
          </div>
          <div class="">
            <label for="country" class="form-label">裝置類型</label>
            <select class="form-select" id="country" required="">
              <option value="">請選擇裝置類型</option>
              <option>United States</option>
            </select>
            <div class="invalid-feedback">Please select a valid country.</div>
          </div>
          <div class="">
            <label for="country2" class="form-label">啟用狀態</label>
            <select class="form-select" id="country2" required="">
              <option value="">請選擇啟用狀態</option>
              <option>United States</option>
            </select>
            <div class="invalid-feedback">Please select a valid country.</div>
          </div>
          <div class="">
            <label for="country2" class="form-label">連線狀態</label>
            <select class="form-select" id="country2" required="">
              <option value="">請選擇連線狀態</option>
              <option>United States</option>
            </select>
            <div class="invalid-feedback">Please select a valid country.</div>
          </div>
        </div>
        <div class="d-flex gap-2">
          <button type="submit" class="btn btn-outline-gray fw-semibold">
            清除
          </button>
          <button type="submit" class="btn btn-gray fw-semibold text-white">
            搜尋
          </button>
        </div>
      </form>
    </section>
    <section>
      <div class="d-flex justify-content-between align-items-end mb-2">
        <h4 class="fw-semibold">列表</h4>
        <div class="d-flex gap-2 align-items-center me-2">
          <p class="mb-0 me-2">共計：12 筆</p>
          <button
            class="btn btn-outline-primary fw-semibold"
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
                <th scope="col" class="miw-140">啟用狀態</th>
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
                  <select class="form-select" id="country" required="" :value="deviceData.enabled_status">
              <option value="true">啟用中</option>
              <option value="false">停用中</option>
            </select>
                </td>
                <td>
                  <span class="device-statu device-link" v-if="deviceData.device_status">連線中</span>
                  <span class="device-statu" v-else>斷線中</span>
                </td>
                <td>
                  <div class="ps-2">
                    <button
                      type="button"
                      class="btn btn-outline-primary border-0 fw-semibold"
                    >
                      編輯
                    </button>
                    <button
                      type="button"
                      class="btn btn-outline-danger border-0 fw-semibold"
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
    :add-modal-element="addModalElement"
    :device-edit-element="deviceEditElement"/>
</template>

<script setup>
import data from '../../assets/sampleData.json'
import deviceEdit from '@/components/deviceEditOffcanvas.vue'
import { ref, onMounted } from 'vue'
import * as bootstrap from 'bootstrap'
const deviceDatas = data.deviceDatas
const deviceEditElement = ref(null)
// const tempArray = ref(null)
const isNew = ref(null)
const tempObject = ref(null)

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
onMounted(() => {
  deviceEditElement.value = new bootstrap.Offcanvas('#deviceEditOffcanvas',
    {
      keyboard: false
    }
  )
})
</script>
