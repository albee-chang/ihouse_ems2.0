<template>
  <div class="container">
    <ul class="list-unstyled d-flex page-box mb-4">
      <li class="page-item">
        <router-link to="/devices/devicesManger" class="page-link fs-4"
          >裝置列表</router-link
        >
      </li>
      <li class="page-item">
        <router-link to="/devices/locationManger" class="page-link fs-4"
          >點位列表</router-link
        >
      </li>
    </ul>
    <section class="bg-white-box mb-2">
      <form class="d-flex justify-content-between align-items-end">
        <div class="d-flex gap-2">
          <div class="">
            <label for="exampleFormControlInput1" class="form-label"
              >點位ID、點位名稱</label
            >
            <input
              type="text"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder="請輸入ID、名稱"
            />
          </div>
          <div class="">
            <label for="device" class="form-label">裝置</label>
            <select class="form-select" id="device" required="">
              <option value="">請選擇裝置</option>
              <option>United States</option>
            </select>
            <div class="invalid-feedback">Please select a valid country.</div>
          </div>
          <div class="">
            <label for="point_type" class="form-label">點位類型</label>
            <select class="form-select" id="point_type" required="">
              <option value="">請選擇狀態</option>
              <option>United States</option>
            </select>
            <div class="invalid-feedback">Please select a valid country.</div>
          </div>
          <div class="">
            <label for="status" class="form-label">狀態</label>
            <select class="form-select" id="status" required="">
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
        <h4 class="fw-semibold">列表</h4>
        <div class="d-flex gap-2 align-items-center me-2">
          <p class="mb-0 me-2">共計： {{ data }} 筆</p>
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
              <tr>
                <th scope="row" class="text-center">1</th>
                <td>Vavg</td>
                <td>MP_Electricity_Vavg</td>
                <td>AI_FLOAT</td>
                <td>1416</td>
                <td>3</td>
                <td>連線中</td>
                <td>0</td>
                <td>
                  <div class="ps-2">
                    <button
                      class="btn btn-outline-primary border-0 fw-semibold"
                      type="button"
                      data-bs-toggle="offcanvas"
                      data-bs-target="#deviceEditOffcanvas"
                      aria-controls="deviceEditOffcanvas"
                    >
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
  <!-- 編輯裝置的 offcanvas  -->
  <div
    class="offcanvas offcanvas-end account-offcanvas"
    tabindex="-1"
    data-bs-backdrop="staticSS"
    id="deviceEditOffcanvas"
    aria-labelledby="deviceEditOffcanvasLabel"
  >
    <div class="offcanvas-header justify-content-end">
      <button
        type="button"
        class="btn-close rounded-5 bg-gray"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>
    <div class="title-word mt-1">
      <span class="colr-block"></span>
      <h2 class="mb-0 fw-semibold">編輯點位</h2>
    </div>
    <div class="offcanvas-body">
      <div class="title-word my-2 justify-content-between">
        <h4 class="mb-0 fw-semibold">對應點位</h4>
          <button class="btn btn-outline-primary">新增節點</button>
      </div>
      <!-- table area -->
      <div class="table-responsive">
        <table class="table table-hover">
          <thead class="table-head">
            <tr>
              <th scope="col">點位ID</th>
              <th scope="col">點位類型</th>
              <th scope="col">起始暫存器</th>
              <th scope="col">功能碼</th>
              <th scope="col">交換模式</th>
              <th scope="col"><p class="border-start border-2 ps-2 mb-0">操作</p></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>t</td>
              <td>float</td>
              <td>—</td>
              <td>—</td>
              <td>—</td>
              <td>
                <button
                  type="button"
                  class="btn text-primary text-sm"
                  data-bs-toggle="modal"
                  data-bs-target="#editNodeModal"
                >
                  編輯
                </button>
                <button type="button" class="btn text-danger text-sm">
                  刪除
                </button>
              </td>
            </tr>
            <tr>
              <td>h</td>
              <td>str</td>
              <td>—</td>
              <td>—</td>
              <td>—</td>
              <td>
                <button type="button" class="btn text-primary text-sm">
                  編輯
                </button>
                <button type="button" class="btn text-danger text-sm">
                  刪除
                </button>
              </td>
            </tr>
            <tr>
              <td>do</td>
              <td>dio</td>
              <td>—</td>
              <td>—</td>
              <td>—</td>
              <td>
                <button type="button" class="btn text-primary text-sm">
                  編輯
                </button>
                <button type="button" class="btn text-danger text-sm">
                  刪除
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- 編輯節點 Modal  -->
  <div
    class="modal fade"
    id="editNodeModal"
    data-bs-backdrop="static"
    tabindex="-1"
    aria-labelledby="editNodeModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content bg-white-box">
        <div class="modal-header border-0 justify-content-around">
          <div class="title-word mt-1">
            <span class="colr-block"></span>
            <h2 class="mb-0 fw-semibold">編輯節點</h2>
          </div>
          <button
            type="button"
            class="btn-close rounded-5 bg-gray"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row g-3 mb-2">
            <div class="col-6">
              <label class="form-label">點位ID：</label>
              <div class="input-group">
                <input
                  type="text"
                  class="form-control"
                  value="tempSetting"
                  readonly
                />
              </div>
            </div>
            <div class="col-6">
              <label class="form-label">起始暫存器：</label>
              <div class="input-group">
                <input type="text" class="form-control" value="6003" readonly />
              </div>
            </div>
          </div>
          <div class="row g-3 mb-2">
            <div class="col">
              <label class="form-label">類型：</label>
              <select class="form-select">
                <option selected>浮點數</option>
              </select>
            </div>
            <div class="col">
              <label class="form-label">Swap Mode：</label>
              <select class="form-select">
                <option selected>不調換順序（整數轉換）</option>
              </select>
            </div>
          </div>
          <div class="row g-3 mb-2">
            <div class="col">
              <label class="form-label">Function Code：</label>
              <select class="form-select">
                <option selected>3</option>
              </select>
            </div>
            <div class="col">
              <label class="form-label">除數：</label>
              <select class="form-select">
                <option selected>1</option>
              </select>
            </div>
          </div>
          <div class="row g-3 mb-2">
            <div class="col">
              <label class="form-label">Reverse：</label>
              <select class="form-select" disabled>
                <option value="">請選擇Reverse</option>
              </select>
            </div>
            <div class="col">
              <label class="form-label">虛擬節點類型：</label>
              <select class="form-select" disabled>
                <option value="">請選擇類型</option>
              </select>
            </div>
          </div>
          <div class="row g-3 mb-2">
            <div class="col">
              <label class="form-label">資料長度：</label>
              <select class="form-select">
                <option selected>1</option>
              </select>
            </div>
            <div class="col">
              <label class="form-label">資料刷新時間(ms)：</label>
              <select class="form-select">
                <option selected>1000</option>
              </select>
            </div>
          </div>
        </div>
        <div class="mt-5 text-center">
          <button class="btn btn-primary w-50" type="submit">下一步</button>
        </div>
      </div>
    </div>
  </div>
  <!-- 編輯節點 Modal 結束  -->
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as bootstrap from 'bootstrap'
const addModalElement = ref(null)
const delUserModalElement = ref(null)
onMounted(() => {
  addModalElement.value = new bootstrap.Modal(
    document.querySelector('#addModal'),
    {
      keyboard: false
    }
  )
  delUserModalElement.value = new bootstrap.Modal(
    document.querySelector('#delUserModal'),
    {
      keyboard: false
    }
  )
})
</script>
