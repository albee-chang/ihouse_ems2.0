<template>
  <div class="container">
    <ul class="list-unstyled d-flex page-box mb-4">
      <li class="page-item">
        <router-link to="/devices/devicesManger" class="page-link  fs-4">裝置列表</router-link>
      </li>
      <li class="page-item">
        <router-link to="/devices/locationManger" class="page-link fs-4">點位列表</router-link>
      </li>
    </ul>
    <section class="bg-white-box mb-2">
      <form class="d-flex justify-content-between align-items-end">
        <div class="d-flex gap-2">
          <div class="">
            <label for="exampleFormControlInput1" class="form-label">點位ID、點位名稱</label>
            <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="請輸入ID、名稱" />
          </div>
          <div class="">
            <label for="country" class="form-label">裝置</label>
            <select class="form-select" id="country" required="">
              <option value="">請選擇裝置</option>
              <option>United States</option>
            </select>
            <div class="invalid-feedback">Please select a valid country.</div>
          </div>
          <div class="">
            <label for="country2" class="form-label">點位類型</label>
            <select class="form-select" id="country2" required="">
              <option value="">請選擇狀態</option>
              <option>United States</option>
            </select>
            <div class="invalid-feedback">Please select a valid country.</div>
          </div>
          <div class="">
            <label for="country2" class="form-label">狀態</label>
            <select class="form-select" id="country2" required="">
              <option value="">請選擇狀態</option>
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
                    <button class="btn btn-outline-primary border-0 fw-lighter" type="button"
                    @click="editLocation">
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

  <div class="offcanvas offcanvas-end account-offcanvas" tabindex="-1" data-bs-backdrop="staticSS" id="locationEditOffcanvas"
    aria-labelledby="locationEditOffcanvasLabel">
    <div class="offcanvas-header justify-content-end">
      <button type="button" class="btn-close rounded-5 bg-gray" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="title-word mt-1">
      <span class="colr-block"></span>
      <h2 class="mb-0 fw-lighter">編輯點位 </h2>
    </div>
    <div class="offcanvas-body">
      <h3 class="fw-lighter">點位基本資料</h3>
      <form class="needs-validation" novalidate="">
        <div class="row g-3">
          <div class="col-8">
            <label for="account" class="form-label">點位類型：</label>
            <input type="text" class="form-control" id="account" value="" required="" placeholder="請輸入點位類型" />
            <div class="invalid-feedback">Account is required.</div>
          </div>
          <div class="col-8">
            <label for="system-access" class="form-label">點位節點：</label>
            <select class="form-select" id="system-access" required="">
              <option value="">請選擇點位節點</option>
              <option>1</option>
            </select>
            <div class="invalid-feedback">Please select a valid country.</div>
          </div>
          <div class="col-8">
            <label for="name" class="form-label">點位名稱：</label>
            <input type="text" class="form-control" id="name" placeholder="請輸入點位名稱" />
            <div class="invalid-feedback">Name is required.</div>
          </div>
          <div class="col-8">
            <label for="tel" class="form-label">資料數值：
            </label>
            <input type="text" class="form-control" id="tel" placeholder="請輸入資料數值" />
            <div class="invalid-feedback">
              Please enter a valid email address for shipping updates.
            </div>
          </div>
          <div class="col-12 d-flex align-items-end gap-2">
            <div class="col-8">
              <label for="department" class="form-label">設定數值：

              </label>
              <select class="form-select" id="department" required="">
                <option value="">請輸入設定數值</option>
                <option>1</option>
              </select>
              <div class="invalid-feedback">
                Please select a valid department.
              </div>
            </div>
            <div class="col-4">
              <button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                點位復歸
              </button>
            </div>
          </div>
          <div class="col-8">
            <label for="system-access" class="form-label">緊急通知：</label>
            <select class="form-select" id="system-access" required="">
              <option value="">請選擇是否需要緊急通知</option>
              <option>1</option>
            </select>
            <div class="invalid-feedback">Please select a valid country.</div>
          </div>
          <div class="col-8">
            <label for="system-access" class="form-label">連動攝影機：</label>
            <select class="form-select" id="system-access" required="">
              <option value="">請選擇攝影機</option>
              <option>1</option>
            </select>
            <div class="invalid-feedback">Please select a valid country.</div>
          </div>
        </div>

        <div class="mt-5 text-center">
          <button class="btn btn-primary w-50" type="submit">儲存</button>
        </div>
      </form>
    </div>
  </div>

  <!-- Modal -->
  <div class="modal fade" id="exampleModal" data-bs-backdrop="static" tabindex="-1" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content bg-white-box">
        <div class="modal-header border-0">
          <div class="title-word">
            <span class="colr-block"></span>
            <h2 class="mb-0 fw-semibold">新增節點</h2>
          </div>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>

        <div class="modal-body">
          <!-- Input field in the modal body -->
          <div class="mb-3">
            <div class="col-6">
              <label for="inputField" class="form-label fs-5">單位名稱：</label>
              <input type="text" class="form-control" id="inputField" placeholder="請輸入單位名稱" />
            </div>
            <div class="col-6">
              <label for="inputField" class="form-label fs-5">單位名稱：</label>
              <input type="text" class="form-control" id="inputField" placeholder="請輸入單位名稱" />
            </div>
          </div>
          <div class="text-center">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              儲存
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import data from '../../assets/sampleData.json'
import * as bootstrap from 'bootstrap'
import { ref, onMounted } from 'vue'
const { locationPointDatas } = data
function editLocation () {
  locationEditElement.value.show()
}
const locationEditElement = ref(null)
onMounted(() => {
  locationEditElement.value = new bootstrap.Offcanvas('#locationEditOffcanvas',
    {
      keyboard: false
    }
  )
})
</script>
