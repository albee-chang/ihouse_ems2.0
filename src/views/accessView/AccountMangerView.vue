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
      <VForm class="d-flex justify-content-between align-items-end">
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
            <label for="search-department" class="form-label">單位</label>
            <VField
                id="search-department"
                name="department"
                as="select"
                class="form-select"
                required
                rules="required"
              >
                <option value="" disabled>請選擇單位</option>
                <option
                  v-for="department in departments"
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
          <div class="">
            <label for="search-title" class="form-label">職稱</label>
            <VField
                id="search-title"
                name="title"
                as="select"
                class="form-select"
                required
                rules="required"
              >
                <option value="" disabled>請選擇職稱</option>
                <option v-for="title in titles" :key="title" :value="title">
                  {{ title }}
                </option>
              </VField>

              <ErrorMessage
                as="p"
                class="invalid-feedback d-block mb-0"
                name="職稱"
              />
          </div>
        </div>
        <div class="d-flex gap-2">
          <button type="submit" class="btn btn-outline-gray fw-semibold">
            清除
          </button>
          <button type="submit" class="btn btn-gray fw-semibold">搜尋</button>
        </div>
      </VForm>
    </section>
    <section>
      <div class="d-flex justify-content-between align-items-end mb-2">
        <h4 class="fw-semibold">列表</h4>
        <div class="d-flex gap-2 align-items-center me-2">
          <p class="mb-0 me-2">共計：{{ userDatasRef.length }} 筆</p>
          <button
            class="btn btn-outline-primary fw-semibold"
            type="button"
            aria-controls="staticBackdrop"
            @click="editAccount(tempObject, 'new')"
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
                <th scope="col">單位</th>
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
            <tbody v-for="(userData, index) in userDatasRef" :key="userData.id">
              <tr>
                <th scope="row" class="text-center">{{ index + 1 }}</th>
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
                <td>{{ getSystemAccess (userData.systemAccess) }}</td>
                <td>
                  <p class="ps-2 mb-0">
                    <template v-for="(item, index) in userData.pageAccess">
                      {{ index > 0 ? "、" : "" }}{{ item.page }}
                    </template>
                  </p>
                </td>
                <td>
                  <div class="ps-2">
                    <button
                      type="button"
                      class="btn btn-outline-primary border-0 fw-semibold"
                      aria-controls="staticBackdrop"
                      @click="editAccount(userData, 'edit')"
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
          <p>
            確定要刪除
            <span class="fw-semibold">{{ tempArray?.name }}</span> 的帳號嗎？
          </p>
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
  <!-- 帳號編輯 Modal -->
  <AccountEdit
    :titles="titles"
    :departments="departments"
    :system-accesss="systemAccesss"
    :is-new="isNew"
    :temp-object="tempObject"
    :add-modal-element="addModalElement"
    :account-edit-element="accountEditElement"
  />
</template>
<script setup>
import data from '../../assets/sampleData.json'
import AccountEdit from '@/components/AccountEditOffcanvas.vue'
import Swal from 'sweetalert2'
import { ref, onMounted } from 'vue'
import * as bootstrap from 'bootstrap'
const { userDatas, departments, titles, systemAccesss } = data
const userDatasRef = ref(userDatas)
const tempArray = ref(null)
const isNew = ref(null)
const tempObject = ref(null)
const addModalElement = ref(null)
const accountEditElement = ref(null)
const delUserModalElement = ref(null)

function getSystemAccess (access) {
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

function editAccount (object, modalStatus) {
  if (modalStatus === 'new') {
    isNew.value = true
    tempObject.value = {
      account: '',
      name: '',
      phone: '',
      department: '',
      title: '',
      systemAccess: '',
      pageAccess: [{
        page: '',
        access: ''
      }]
    }
  } else {
    isNew.value = false
    tempObject.value = { ...object }
    console.log(tempObject.value)
  }
  accountEditElement.value.show()
}
function delUserBtn (item) {
  delUserModalElement.value.show()
  tempArray.value = { ...item }
}

function checkDelUser (id) {
  userDatasRef.value = userDatasRef.value.filter(
    (item, index) => item.id !== id
  )
  tempArray.value = null
  delUserModalElement.value.hide()
  Swal.fire({
    icon: 'success',
    title: '已刪除',
    showConfirmButton: false,
    timer: 2000
  })
}
onMounted(() => {
  accountEditElement.value = new bootstrap.Offcanvas('#accountEditOffcanvas',
    {
      keyboard: false
    }
  )
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
