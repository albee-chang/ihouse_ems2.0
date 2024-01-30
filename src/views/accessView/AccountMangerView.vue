<template>
  <div class="container">
    <ItemNav :nav-where = "'access'"/>
    <section class="bg-white-box mb-2">
      <VForm class="d-flex justify-content-between align-items-end" ref="searchForm" @submit="searchFormSubmit">
        <div class="d-flex gap-2">
          <div class="">
            <label for="searchInput" class="form-label"
              >姓名、電話、帳號</label
            >
            <VField
            class="form-control" name="searchInput" type="text"
              id="searchInput"
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
              >
                <option value="" disabled>請選擇職稱</option>
                <option v-for="title in titles" :key="title" :value="title">
                  {{ title }}
                </option>
              </VField>

              <ErrorMessage
                as="p"
                class="invalid-feedback d-block mb-0"
                name="title"
              />
          </div>
        </div>
        <div class="d-flex gap-2">
          <button type="button" class="btn btn-outline-gray fw-semibold" @click="searchFormClean">
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
    @update-user-Object="updateUserObject"
  />
</template>
<script setup>
import data from '../../assets/sampleData.json'
import AccountEdit from '@/components/AccountEditOffcanvas.vue'
import ItemNav from '@/components/ItemNav.vue'
import { ref, onMounted } from 'vue'
import * as bootstrap from 'bootstrap'
import commonFunction from '../../assets/js/commonFunctions.js'
const { swalSuccess } = commonFunction.setup()
const { userDatas, departments, titles, systemAccesss } = data
const userDatasRef = ref(userDatas)
const tempArray = ref(null)
const isNew = ref(null)
const tempObject = ref(null)
const addModalElement = ref(null)
const accountEditElement = ref(null)
const delUserModalElement = ref(null)
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
 * 取得 系統權限 中文顯示資料，若無設定傳回原值
 * @param {String} access 資料庫紀載之英文 權限
 */
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
  }
  accountEditElement.value.show()
}
/**
 * 此為模擬資料使用，正式上線。於 AccountEditOffcanvas @click 觸發 API 即可
 * @param {Object} userObject component 回傳的 Object
 */
function updateUserObject (userObject) {
  if (isNew.value) {
    const lastData = userDatasRef.value[userDatasRef.value.length - 1]
    const lastId = lastData ? parseInt(lastData.id, 10) : 0
    const id = isNaN(lastId) ? 1 : lastId + 1
    userObject.id = id
    userDatasRef.value.push(userObject)
  } else {
    const index = userDatasRef.value.findIndex(userData => userData.id === userObject.id)
    if (index !== -1) {
      userDatasRef.value[index] = userObject
    }
  }
}
/**
 * 將使用者傳入 彈跳視窗，同時開啟 確認刪除使用者的畫面
 * @param {Object} item 使用者的物件資料
 */
function delUserBtn (item) {
  delUserModalElement.value.show()
  tempArray.value = { ...item }
}

/**
 * 確認刪除使用者 按鈕後 的動作
 * @param {number} id 使用者ID，預設 NUMBER 等後續 API 確認調整
 */
function checkDelUser (id) {
  // 這裡請串接 刪除 使用者 API
  userDatasRef.value = userDatasRef.value.filter(
    (item, index) => item.id !== id
  )
  tempArray.value = null
  delUserModalElement.value.hide()
  swalSuccess('已刪除')
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
