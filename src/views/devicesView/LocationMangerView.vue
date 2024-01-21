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
        <h4 class="fw-semibold">列表</h4>
        <div class="d-flex gap-2 align-items-center me-2 mt-1 mb-2">
          <p class="mb-0 me-2">共計：12 筆</p>

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
                <td>
                  連線中
                </td>
                <td>0</td>
                <td>
                  <div class="ps-2">
                    <button
            class="btn btn-outline-primary border-0 fw-semibold"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasExample"
            aria-controls="offcanvasExample"
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

  <div
    class="offcanvas offcanvas-end account-offcanvas"
    tabindex="-1"
    data-bs-backdrop="staticSS"
    id="offcanvasExample"
    aria-labelledby="offcanvasExampleLabel"
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
      <h2 class="mb-0 fw-semibold">編輯點位 </h2>
    </div>
    <div class="offcanvas-body">
      <form class="needs-validation" novalidate="">
        <div class="row g-3">
          <div class="col-8">
            <label for="account" class="form-label">帳號：</label>
            <input
              type="text"
              class="form-control"
              id="account"
              value=""
              required=""
              placeholder="請輸入帳號"
            />
            <div class="invalid-feedback">Account is required.</div>
          </div>
          <div class="col-8">
            <label for="name" class="form-label">姓名：</label>
            <input
              type="text"
              class="form-control"
              id="name"
              placeholder="請輸入姓名"
            />
            <div class="invalid-feedback">Name is required.</div>
          </div>
          <div class="col-8">
            <label for="tel" class="form-label">電話：</label>
            <input
              type="tel"
              class="form-control"
              id="tel"
              placeholder="請輸入電話"
            />
            <div class="invalid-feedback">
              Please enter a valid email address for shipping updates.
            </div>
          </div>
          <div class="col-12 d-flex align-items-end gap-2">
            <div class="col-8">
              <label for="department" class="form-label">單位：</label>
              <select class="form-select" id="department" required="">
                <option value="">請選擇單位</option>
                <option>United States</option>
              </select>
              <div class="invalid-feedback">
                Please select a valid department.
              </div>
            </div>
            <div class="col-4">
              <button
                type="button"
                class="btn btn-outline-primary"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                建立新單位
              </button>
            </div>
          </div>
          <div class="col-12 d-flex align-items-end gap-2">
            <div class="col-8">
              <label for="title" class="form-label">職稱：</label>
              <select class="form-select" id="title" required="">
                <option value="">請選擇職稱</option>
                <option>United States</option>
              </select>
              <div class="invalid-feedback">Please select a valid title.</div>
            </div>
            <div class="col-4">
              <button
                type="button"
                class="btn btn-outline-primary"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                建立新職稱
              </button>
            </div>
          </div>
          <div class="col-8">
            <label for="system-access" class="form-label">系統權限：</label>
            <select class="form-select" id="system-access" required="">
              <option value="">請選擇權限</option>
              <option>United States</option>
            </select>
            <div class="invalid-feedback">Please select a valid country.</div>
          </div>
        </div>

        <hr class="my-4" />
        <h3>頁面權限</h3>
        <div class="col-12 d-flex align-items-end gap-2">
          <div class="col-8">
            <select class="form-select" id="country" required="">
              <option value="">Choose...</option>
              <option>United States</option>
            </select>
            <div class="invalid-feedback">Please select a valid country.</div>
          </div>
          <div class="col-4">
            <select class="form-select" id="country" required="">
              <option value="">Choose...</option>
              <option>United States</option>
            </select>
          </div>
        </div>
        <div class="col-4">
          <button type="button" class="btn btn-outline-gray">新增頁面</button>
        </div>
        <div class="mt-5 text-center">
          <button class="btn btn-primary w-50" type="submit">下一步</button>
        </div>
      </form>
    </div>
  </div>

  <!-- Modal -->
  <div
    class="modal fade"
    id="exampleModal"
    data-bs-backdrop="static"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content bg-white-box">
        <div class="modal-header border-0">
          <div class="title-word">
            <span class="colr-block"></span>
            <h2 class="mb-0 fw-semibold">新增節點</h2>
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
          <div class="mb-3">
            <div class="col-6">
              <label for="inputField" class="form-label fs-5">單位名稱：</label>
              <input
                type="text"
                class="form-control"
                id="inputField"
                placeholder="請輸入單位名稱"
              />
            </div>            <div class="col-6">
              <label for="inputField" class="form-label fs-5">單位名稱：</label>
              <input
                type="text"
                class="form-control"
                id="inputField"
                placeholder="請輸入單位名稱"
              />
            </div>
          </div>
          <div class="text-center">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              儲存
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

</script>
