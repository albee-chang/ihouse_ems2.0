<template>
  <div class="container">
    <ul class="list-unstyled d-flex page-box mb-4">
      <li class="page-item">
        <router-link to="/access/accountManger" class="page-link fs-4"
          >帳號</router-link
        >
      </li>
      <li class="page-item">
        <router-link to="/access/pageManger" class="page-link fs-4"
          >頁面</router-link
        >
      </li>
    </ul>
    <section class="bg-white-box mb-2">
      <form class="d-flex justify-content-between align-items-end">
        <div class="d-flex gap-2">
          <div class="">
            <label for="exampleFormControlInput1" class="form-label"
              >頁面名稱</label
            >
            <input
              type="text"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder="頁面名稱"
            />
          </div>
          <div class="">
            <label for="country2" class="form-label">建立者</label>
            <select class="form-select" id="country2" required="">
              <option value="">請選擇建立者</option>
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
        </div>
      </div>
      <!-- table area -->
      <div class="bg-white-box">
        <div class="table-responsive">
          <table class="table table-hover">
            <thead class="table-head">
              <tr>
                <th scope="col">排序</th>
                <th scope="col">
                  <p class="border-start border-2 ps-2 mb-0">頁面名稱</p>
                </th>
                <th class="table-img-col" scope="col">
                  <p class="border-start border-2 ps-2 mb-0">建立者</p>
                </th>
                <th scope="col">
                  <p class="border-start border-2 ps-2 mb-0">共用者</p>
                </th>
                <th scope="col">
                  <p class="border-start border-2 ps-2 mb-0">操作</p>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" class="text-center">1</th>
                <td>
                  <div class="ps-2 d-flex align-items-center">
                    <img
                      class="table-img-icon me-1"
                      src="/src/assets/image/icons/home.png"
                      alt=""
                    />
                    <p class="mb-0">首頁</p>
                  </div>
                </td>
                <td>
                  <div class="ps-2">
                    <img
                      class="table-img-head"
                      src="/src/assets/image/head/Ellipse600.png"
                      alt=""
                    />
                  </div>
                </td>
                <td>
                  <div class="ps-2 d-flex align-items-center">
                    <img
                      class="table-img-head "
                      style="z-index: 9"
                      src="/src/assets/image/head/Ellipse603.png"
                      alt=""
                    />
                    <img
                      class="table-img-head ms-n10px "
                      style="z-index: 8"
                      src="/src/assets/image/head/Ellipse604.png"
                      alt=""
                    />
                    <img
                      class="table-img-head ms-n10px "
                      style="z-index: 7"
                      src="/src/assets/image/icons/photo_icon.png"
                      alt=""
                    />
                    <img
                      class="table-img-head ms-n10px "
                      style="z-index: 6"
                      src="/src/assets/image/icons/photo_icon.png"
                      alt=""
                    />
                    <img
                      class="table-img-head ms-n10px "
                      style="z-index: 5"
                      src="/src/assets/image/head/Ellipse607.png"
                      alt=""
                    />
                    <img
                      class="table-img-head ms-n10px "
                      style="z-index: 4"
                      src="/src/assets/image/head/Ellipse608.png"
                      alt=""
                    />
                  </div>
                </td>
                <td>
                  <div class="ps-2">
                    <button
                      class="btn btn-outline-primary border-0 fw-semibold"
                      type="button"
                      data-bs-toggle="modal"
                data-bs-target="#exampleModal"
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
            <h2 class="mb-0 fw-semibold">編輯「用電管理」頁面權限</h2>
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
            <label for="inputField" class="form-label">單位名稱：</label>
            <input
              type="text"
              class="form-control"
              id="inputField"
              placeholder="請輸入單位名稱"
            />
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

<script setup></script>
