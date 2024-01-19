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
          </div>
          <div class="">
            <label for="country2" class="form-label">職稱</label>
            <select class="form-select" id="country2" required>
              <option value="">請選擇職稱</option>
              <option>總管理部</option>
            </select>
          </div>
        </div>
        <div class="d-flex gap-2">
          <button
            type="submit"
            class="btn btn-outline-gray fw-semibold"
            @click="clearBtn()"
          >
            清除
          </button>
          <button
            type="submit"
            class="btn btn-gray fw-semibold"
            @click="searchBtn()"
          >
            搜尋
          </button>
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
            data-bs-target="#accountEditOffcanvas"
            aria-controls="accountEditOffcanvas"
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
                      @click="editBtn(userData)"
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
    :add-modal-element="addModalElement"
    @close="closeAccountEdit"
  ></AccountEdit>
</template>

<script setup>
import data from '../../assets/pageAccess.json'

import AccountEdit from '@/components/AccountEditOffcanvas.vue'
import { ref, onMounted } from 'vue'
import * as bootstrap from 'bootstrap'
const { userDatas, departments, titles } = data
const userDatasRef = ref(userDatas)
const tempArray = ref(null)
// function onSubmit (values) {
//   console.log(values)
// }

// 判斷權限角色
function getSystemAccessDisplay (access) {
  switch (access) {
    case 'Admin':
      return '系統管理員'
    case 'editor':
      return '編輯者'
    case 'onlyView':
      return '僅檢視'
    default:
      return '無' // 其他想要的預設值
  }
}
const addModalElement = ref(null)
const delUserModalElement = ref(null)
// const addForm = ref(null)
// function addData () {
//   addAray.value.push(newData.value)
//   addModalElement.value.hide()
//   newData.value = null
// }
// function handleDataAdjusted (dataAdjusted) {
//   const { arrayName, adjustedArray } = dataAdjusted
//   switch (arrayName) {
//     case 'title':
//       titlesRef.value = adjustedArray
//       break
//     case 'department':
//       departmentsRef.value = adjustedArray
//       break
//     default:
//       console.error(dataAdjusted)
//       break
//   }
//   addModalElement.value.hide()
// }
// function addModal (addType) {
//   addModalElement.value.show()
//   if (addType === 'title') {
//     arrayName.value = 'title'
//     tempArray.value = [...titlesRef.value]
//   } else {
//     arrayName.value = 'department'
//     tempArray.value = [...departmentsRef.value]
//   }
// }

// 開啟編輯帳號 AccountEdit 元件
function editBtn (item) {
  console.log(item)
  // addModalElement.value.show()
  // if (addType === 'title') {
  //   arrayName.value = 'title'
  //   tempArray.value = [...titlesRef.value]
  // } else {
  //   arrayName.value = 'department'
  //   tempArray.value = [...departmentsRef.value]
  // }
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
}

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
