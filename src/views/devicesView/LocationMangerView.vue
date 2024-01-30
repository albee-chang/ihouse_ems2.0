<template>
  <div class="container">
    <ItemNav :nav-where = "'devices'"/>
    <section class="bg-white-box mb-2">
      <VForm class="d-flex justify-content-between align-items-end" ref="searchForm" @submit="searchFormSubmit">
        <div class="d-flex gap-2">
          <div class="">
            <label for="searchInput" class="form-label">點位ID、點位名稱</label>
            <VField type="text" class="form-control" name="searchInput" id="searchInput" placeholder="請輸入ID、名稱" />
          </div>
          <div class="">
            <label for="device" class="form-label">裝置</label>
            <VField class="form-select" id="device" name="device" as="select" required>
              <option value="" disabled>請選擇裝置</option>
              <option value="test">測試</option>
              <!-- <option
                  v-for="department in departments"
                  :key="department"
                  :value="department"
                >
                  {{ department }}
                </option> -->
            </VField>

            <ErrorMessage as="p" class="invalid-feedback d-block mb-0" name="device" />
          </div>
          <div class="">
            <label for="point-type" class="form-label">點位類型</label>
            <VField class="form-select" id="point-type" name="point-type" as="select" required>
              <option value="" disabled>請選擇狀態</option>
              <option v-for="pointType in getPointTypes()" :key="pointType" :value="pointType">
                {{ pointType }}
              </option>
            </VField>

            <ErrorMessage as="p" class="invalid-feedback d-block mb-0" name="location-type" />
          </div>
          <div class="">
            <label for="status" class="form-label">狀態</label>
            <VField class="form-select" id="status" name="status" as="select" required>
              <option value="" disabled>請選擇狀態</option>
              <option value="link">連線中</option>
              <option value="unLink">斷線中</option>
              <!-- <option
                  v-for="department in departments"
                  :key="department"
                  :value="department"
                >
                  {{ department }}
                </option> -->
            </VField>

            <ErrorMessage as="p" class="invalid-feedback d-block mb-0" name="status" />
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
        <div class="d-flex gap-2 align-items-center me-2 mt-1 mb-2">
          <p class="mb-0 me-2 fw-lighter">共計：{{ locationPointDatas.length }} 筆</p>

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
                  <p class="border-start border-2 ps-2 mb-0">點位ID</p>
                </th>
                <th scope="col">點位名稱</th>
                <th scope="col">點位類型</th>
                <th scope="col">Reg</th>
                <th scope="col">方法</th>
                <th scope="col">狀態</th>
                <th scope="col">數值</th>
                <th scope="col">
                  <p class="border-start border-2 ps-2 mb-0">操作</p>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(locationPoint, index) in locationPointDatas" :key="locationPoint.id">
                <th scope="row" class="text-center">{{ index + 1 }}</th>
                <td>{{ locationPoint.point_id }}</td>
                <td>{{ locationPoint.point_name }}</td>
                <td>{{ locationPoint.point_type }}</td>
                <td>{{ locationPoint.reg }}</td>
                <td>{{ locationPoint.method }}</td>
                <td>
                  <span class="device-statu device-link" v-if="locationPoint.status">連線中</span>
                  <span class="device-statu" v-else>斷線中</span>
                </td>
                <td>{{ locationPoint.value }}</td>
                <td>
                  <div class="ps-2">
                    <button class="btn btn-outline-primary border-0 fw-lighter" type="button" @click="editLocation(locationPoint)">
                      編輯
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
<EditOffcanvas :tempObject="tempObject" :element-control="locationEditElement" />
</template>

<script setup>
import data from '@/assets/sampleData.json'
import ItemNav from '@/components/ItemNav.vue'
import EditOffcanvas from '@/components/LocationEditOffcanvas.vue'
import * as bootstrap from 'bootstrap'
import { ref, onMounted } from 'vue'

const { locationPointDatas } = data
const locationEditElement = ref(null)
const searchForm = ref(null)
const tempObject = ref(null)

/**
 * 傳入需要修改的點位資料，開啟Offcanvas 進行修改編輯
 * @param {Object} object 點位資料物件
 */
function editLocation (object) {
  tempObject.value = { ...object }
  locationEditElement.value.show()
}
/**
 * 搜尋函式，串接 搜尋按鈕後需要進行的動作，用來更新畫面
 */
function searchFormSubmit (values) {
  // 請串接  API
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
 * 將資料內有的點位類型，整理陣列。
 * 以供搜尋視窗使用
 */
function getPointTypes () {
  const pointTypes = []

  locationPointDatas.forEach(data => {
    const exist = pointTypes.findIndex(item => item === data.point_type)
    if (exist) {
      pointTypes.push(data.point_type)
    }
  })
  return pointTypes
}

onMounted(() => {
  locationEditElement.value = new bootstrap.Offcanvas('#locationEditOffcanvas',
    {
      keyboard: false
    }
  )
})
</script>
