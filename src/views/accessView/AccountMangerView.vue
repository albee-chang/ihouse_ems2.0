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
              >姓名、電話、帳號</label
            >
            <input
              type="text"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder="請輸入姓名、電話、帳號"
            />
          </div>
          <div class="">
            <label for="country" class="form-label">單位</label>
            <select class="form-select" id="country" required>
              <option value="">請選擇單位</option>
              <option>United States</option>
            </select>
            <div class="invalid-feedback d-none">
              Please select a valid country.
            </div>

          </div>
          <div class="">
            <label for="country2" class="form-label">職稱</label>
            <select class="form-select" id="country2" required>
              <option value="">請選擇職稱</option>
              <option>總管理部</option>

            </select>
            <div class="invalid-feedback d-none">
              Please select a valid country.
            </div>
          </div>
        </div>
        <div class="d-flex gap-2">
          <button type="submit" class="btn btn-outline-gray fw-semibold"
          @click="clearBtn()"
          >
            清除
          </button>
          <button type="submit" class="btn btn-gray fw-semibold"
          @click="searchBtn()"
          >搜尋</button>
        </div>
      </form>
    </section>
    <section>
      <div class="d-flex justify-content-between align-items-end mb-2">
        <h4 class="fw-semibold">列表</h4>
        <div class="d-flex gap-2 align-items-center me-2">
          <p class="mb-0 me-2">共計：{{ userDatasRef.length }} 筆</p>
          <button
            class="btn btn-outline-primary fw-semibold"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasExample"
            aria-controls="offcanvasExample"
          >
            建立新帳號
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
                  <p class="border-start border-2 ps-2 mb-0">頭像</p>
                </th>
                <th scope="col">單位</th>
                <th scope="col">職稱</th>
                <th scope="col">姓名</th>
                <th scope="col">電話</th>
                <th scope="col">帳號</th>
                <th scope="col">系統權限</th>
                <th scope="col">
                  <p class="border-start border-2 ps-2 mb-0">權限頁面</p>
                </th>
                <th scope="col">
                  <p class="border-start border-2 ps-2 mb-0">操作</p>
                </th>
              </tr>
            </thead>
            <tbody v-for="userData in userDatasRef" :key="userData.id">
              <tr>
                <th scope="row" class="text-center">{{ userData.id }}</th>
                <td>
                  <div class="ps-2">
                    <img class="table-img-head" :src="userData.photo" alt="" />
                  </div>
                </td>
                <td>{{ userData.department }}</td>
                <td>{{ userData.title }}</td>
                <td>{{ userData.name }}</td>
                <td>{{ userData.phone }}</td>
                <td>{{ userData.account }}</td>
                <td>{{ getSystemAccessDisplay(userData.systemAccess) }}</td>
                <td>
                  <p class="ps-2 mb-0">
                    <template v-for="(item, index) in userData.pageAccess">
                      {{ index > 0 ? "、" : "" }}{{ item }}
                    </template>
                  </p>
                </td>
                <td>
                  <div class="ps-2">
                    <button
                      type="button"
                      class="btn btn-outline-primary border-0 fw-semibold"
                      data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasEditUser"
            aria-controls="offcanvasEditUser"
                      @click="editUserBtn(userData)"
                    >
                      編輯
                    </button>
                    <button
                      type="button"
                      class="btn btn-outline-danger border-0 fw-semibold"
                      @click="delUserBtn(userData)"
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
  <!-- 新增帳號的 offcanvas -->
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
    <div class="title-word mt-1 mb-3">
      <span class="colr-block"></span>
      <h2 class="mb-0 fw-semibold">建立新帳號</h2>
    </div>
    <div class="offcanvas-body">
      <VForm class="needs-validation" @submit="onSubmit" novalidate>
        <div class="row g-3">
          <div class="col-8">
            <label for="account" class="form-label">帳號：</label>
            <VField
              class="form-control"
              id="account"
              name="account"
              type="text"
              rules="required"
              placeholder="請輸入帳號"
            />
            <ErrorMessage
              as="p"
              class="invalid-feedback d-block mb-0"
              name="account"
            />
          </div>
          <div class="col-8">
            <label for="name" class="form-label">姓名：</label>
            <VField
              class="form-control"
              id="name"
              name="name"
              type="text"
              rules="required"
              placeholder="請輸入姓名"
            />
            <ErrorMessage
              as="p"
              class="invalid-feedback d-block mb-0"
              name="name"
            />
          </div>
          <div class="col-8">
            <label for="tel" class="form-label">電話：</label>
            <VField
              class="form-control"
              id="tel"
              name="phone"
              type="tel"
              rules="required|digits:10|numeric"
              placeholder="請輸入電話"
            />
            <ErrorMessage
              as="p"
              class="invalid-feedback d-block mb-0"
              name="phone"
            />
          </div>
          <div class="col-12 d-flex align-items-end gap-2">
            <div class="col-8">
              <label for="department" class="form-label">單位：</label>
              <VField
                id="department"
                name="department"
                as="select"
                class="form-select"
                required
                rules="required"
              >
                <option value="" disabled>請選擇單位</option>
                <option
                  v-for="department in departmentsRef"
                  :key="department"
                  :value="department"
                >
                  {{ department }}
                </option>
              </VField>

              <ErrorMessage
                as="p"
                class="invalid-feedback d-block mb-0"
                name="department"
              />
            </div>
            <div class="col-4">
              <button
                type="button"
                class="btn btn-outline-primary"
                @click="addModal('department')"
              >
                建立新單位
              </button>
            </div>
          </div>
          <div class="col-12 d-flex align-items-end gap-2">
            <div class="col-8">
              <label for="title" class="form-label">職稱：</label>
              <VField
                id="title"
                name="title"
                as="select"
                class="form-select"
                required
                rules="required"
              >
                <option value="" disabled>請選擇職稱</option>
                <option v-for="title in titlesRef" :key="title" :value="title">
                  {{ title }}
                </option>
              </VField>

              <ErrorMessage
                as="p"
                class="invalid-feedback d-block mb-0"
                name="職稱"
              />
            </div>
            <div class="col-4">
              <button
                type="button"
                class="btn btn-outline-primary"
                @click="addModal('title')"
              >
                建立新職稱
              </button>
            </div>
          </div>
          <div class="col-8">
            <label for="system-access" class="form-label">系統權限：</label>
            <VField
              id="system-access"
              name="系統權限"
              as="select"
              class="form-select"
              required
              rules="required"
            >
              <option value="" disabled>請選擇權限</option>
              <option value="1">1</option>
            </VField>

            <ErrorMessage
              as="p"
              class="invalid-feedback d-block mb-0"
              name="系統權限"
            />
          </div>
        </div>

        <hr class="my-4" />
        <h3>頁面權限</h3>
        <div class="col-12 d-flex align-items-end gap-2">
          <div class="col-8">
            <VField
              id="page"
              name="頁面"
              as="select"
              class="form-select"
              required
              rules="required"
            >
              <option value="" disabled>請選擇頁面</option>
              <option value="1">1</option>
            </VField>

            <ErrorMessage
              as="p"
              class="invalid-feedback d-block mb-0"
              name="頁面"
            />
          </div>
          <div class="col-4">
            <VField
              id="page"
              name="權限"
              as="select"
              class="form-select"
              required
              rules="required"
            >
              <option value="" disabled>請選擇</option>
              <option value="1">1</option>
            </VField>

            <ErrorMessage
              as="p"
              class="invalid-feedback d-block mb-0"
              name="權限"
            />
          </div>
        </div>
        <div class="col-4 my-2">
          <button type="button" class="btn btn-outline-gray">新增頁面</button>
        </div>
        <div class="mt-5 text-center">
          <button class="btn btn-primary w-50" type="submit">下一步</button>
        </div>
      </VForm>
    </div>
  </div>

  <!-- 編輯帳號的 offcanvas -->
  <div
    class="offcanvas offcanvas-end account-offcanvas"
    tabindex="-1"
    data-bs-backdrop="staticSS"
    id="offcanvasEditUser"
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
    <div class="title-word mt-1 mb-3">
      <span class="colr-block"></span>
      <h2 class="mb-0 fw-semibold">編輯帳號</h2>
    </div>
    <div class="offcanvas-body">
      <VForm class="needs-validation" @submit="onSubmit" novalidate>
        <div class="row g-3">
          <div class="col-8">
            <label for="account" class="form-label">帳號：</label>
            <VField
              class="form-control"
              id="account"
              name="account"
              type="text"
              rules="required"
              placeholder="請輸入帳號"
            />
            <ErrorMessage
              as="p"
              class="invalid-feedback d-block mb-0"
              name="account"
            />
          </div>
          <div class="col-8">
            <label for="name" class="form-label">姓名：</label>
            <VField
              class="form-control"
              id="name"
              name="name"
              type="text"
              rules="required"
              placeholder="請輸入姓名"
            />
            <ErrorMessage
              as="p"
              class="invalid-feedback d-block mb-0"
              name="name"
            />
          </div>
          <div class="col-8">
            <label for="tel" class="form-label">電話：</label>
            <VField
              class="form-control"
              id="tel"
              name="phone"
              type="tel"
              rules="required|digits:10|numeric"
              placeholder="請輸入電話"
            />
            <ErrorMessage
              as="p"
              class="invalid-feedback d-block mb-0"
              name="phone"
            />
          </div>
          <div class="col-12 d-flex align-items-end gap-2">
            <div class="col-8">
              <label for="department" class="form-label">單位：</label>
              <VField
                id="department"
                name="department"
                as="select"
                class="form-select"
                required
                rules="required"
              >

                <option value="" disabled>請選擇單位</option>
                <option
                  v-for="department in departmentsRef"
                  :key="department"
                  :value="department"
                >
                  {{ department }}
                </option>
              </VField>
            </div>
            <div class="col-4">
              <button
                type="button"
                class="btn btn-outline-primary"
                @click="addModal('department')"
              >
                建立新單位
              </button>
            </div>
          </div>
          <div class="col-12 d-flex align-items-end gap-2">
            <div class="col-8">
              <label for="title" class="form-label">職稱：</label>
              <VField
                id="title"
                name="title"
                as="select"
                class="form-select"
                required
                rules="required"
              >
                <option value="" disabled>請選擇職稱</option>
                <option v-for="title in titlesRef" :key="title" :value="title">
                  {{ title }}
                </option>
              </VField>

              <ErrorMessage
                as="p"
                class="invalid-feedback d-block mb-0"
                name="職稱"
              />
            </div>
            <div class="col-4">
              <button
                type="button"
                class="btn btn-outline-primary"
                @click="addModal('title')"
              >
                建立新職稱
              </button>
            </div>
          </div>
          <div class="col-8">
            <label for="system-access" class="form-label">系統權限：</label>
            <VField
              id="system-access"
              name="系統權限"
              as="select"
              class="form-select"
              required
              rules="required"
            >
              <option value="" disabled>請選擇權限</option>
              <option value="編輯者"> 編輯者 </option>
              <option value="檢視者"> 檢視者 </option>
              <option value="移除權限"> 移除權限 </option>
            </VField>

            <ErrorMessage
              as="p"
              class="invalid-feedback d-block mb-0"
              name="系統權限"
            />

          </div>
        </div>
        <hr class="my-4" />
        <h3>頁面權限</h3>
        <div class="col-12 d-flex align-items-end gap-2">
          <div class="col-8">
            <VField
              id="page"
              name="頁面"
              as="select"
              class="form-select"
              required
              rules="required"
            >
              <option value="" disabled>請選擇頁面</option>
              <option v-for="page in userDatasRef[0].pageAccess" :key="page" :value="page">
                {{ page }} </option>
            </VField>

            <ErrorMessage
              as="p"
              class="invalid-feedback d-block mb-0"
              name="頁面"
            />
          </div>
          <div class="col-4">
            <VField
              id="page"
              name="權限"
              as="select"
              class="form-select"
              required
              rules="required"
            >
              <option value="" disabled>請選擇</option>
              <option value="編輯者"> 編輯者 </option>
              <option value="檢視者"> 檢視者 </option>
              <option value="移除權限"> 移除權限 </option>
            </VField>

            <ErrorMessage
              as="p"
              class="invalid-feedback d-block mb-0"
              name="權限"
            />
          </div>
        </div>
        <div class="col-4 my-2">
          <button type="button" class="btn btn-outline-gray">新增頁面</button>
        </div>
        <div class="mt-5 text-center">
          <button class="btn btn-primary w-50" type="submit">下一步</button>
        </div>
      </VForm>
    </div>
  </div>

  <!-- Modal -->
  <div
    class="modal fade"
    id="addModal"
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
            <h2 class="mb-0 fw-semibold">建立新{{ typeName }}</h2>
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
          <VForm ref="addForm" @submit="addData">
            <div class="mb-3">
              <label for="inputField" class="form-label"
                >{{ typeName }}：</label
              >
              <VField
                class="form-control"
                id="inputField"
                name="data"
                type="test"
                rules="required"
                v-model="newData"
                :placeholder="`請輸入${typeName}`"
              />
              <ErrorMessage
                as="p"
                class="invalid-feedback d-block mb-0"
                name="data"
              />
            </div>
            <div class="text-center">
              <button
                type="submit"
                class="fw-semibold"
                :class="['btn', !newData ? 'btn-gray' : 'btn-primary']"
                :disabled="!newData"
              >
                儲存
              </button>
            </div>
          </VForm>
        </div>
      </div>
    </div>
  </div>


  <!-- Delete Modal -->
  <div
    class="modal fade"
    id="delUserModal"
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
            <h2 class="mb-0 fw-semibold">刪除帳號</h2>
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
          <p>確定要刪除 <span class="fw-semibold">{{tempArray?.name}}</span> 的帳號嗎？</p>
          <div class="d-flex gap-2 justify-content-center">
              <button
                type="submit"
                class="fw-semibold btn btn-danger w-50"
                @click="checkDelUser(tempArray?.id)"
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
import data from "/src/assets/pageAccess.json";
import { ref, onMounted } from "vue";
import * as bootstrap from "bootstrap";
const { userDatas, departments, titles } = data;
const userDatasRef = ref(userDatas);
const departmentsRef = ref(departments);
const titlesRef = ref(titles);
const newData = ref(null);
const tempArray = ref(null);
const typeName = ref(null);
let addAray = "";
function onSubmit(values) {
  console.log(values);
}

const addModalElement = ref(null);
const delUserModalElement = ref(null);
const addForm = ref(null);
function addData() {
  addAray.value.push(newData.value);
  addModalElement.value.hide();
  newData.value = null;
}
//新增單位或職稱
function addModal(addType) {
  addModalElement.value.show();
  if (addType === "title") {
    typeName.value = "職稱";
    addAray = titlesRef;
  } else {
    typeName.value = "單位名稱";
    addAray = departmentsRef;
  }
}

//清除按鈕
function delUserBtn(item){
  delUserModalElement.value.show();
  tempArray.value = {...item}

}
//刪除使用者
function checkDelUser(id){  
  userDatasRef.value = userDatasRef.value.filter((item, index) => item.id !== id);
  tempArray.value = null;
  delUserModalElement.value.hide();

}
//判斷權限角色
function getSystemAccessDisplay(access) {
    switch (access) {
      case 'Admin':
        return '系統管理員';
      case 'editor':
        return '編輯者';
      case 'onlyView':
        return '僅檢視';
      default:
        return '無'; // 其他想要的預設值
    }
  }

onMounted(() => {
  addModalElement.value = new bootstrap.Modal(
    document.querySelector("#addModal"),
    {
      keyboard: false,
    }
  );
  delUserModalElement.value = new bootstrap.Modal(
    document.querySelector("#delUserModal"),
    {
      keyboard: false,
    }
  );
});
</script>
