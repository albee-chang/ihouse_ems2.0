<template>
  <div class="container">
    <ul class="list-unstyled d-flex page-box mb-4">
      <li class="page-item">
        <router-link to="/access/accountManger" class="page-link fs-4">帳號</router-link>
      </li>
      <li class="page-item">
        <router-link to="/access/pageManger" class="page-link fs-4">頁面</router-link>
      </li>
    </ul>
    <section class="bg-white-box mb-2">
      <VForm class="d-flex justify-content-between align-items-end" ref="searchForm" @submit="searchFormSubmit">
        <div class="d-flex gap-2">
          <div class="">
            <label for="searchInput" class="form-label"
              >頁面名稱</label
            >
            <VField
            class="form-creator" name="searchInput" type="text"
              id="searchInput"
              placeholder="請輸入頁面名稱"
            />

          </div>
          <div class="">
            <label for="search-creator" class="form-label">建立者</label>
            <VField
                id="search-creator"
                name="creator"
                as="select"
                class="form-select"
              >
                <option value="" disabled>請選擇建立者</option>
                <!-- <option
                  v-for="department in departments"
                  :key="department"
                  :value="department"
                >
                  {{ department }}
                </option> -->
              </VField>

              <ErrorMessage
                as="p"
                class="invalid-feedback d-block mb-0"
                name="creator"
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
          <p class="mb-0 me-2">共計：{{ paageUserAccessRef.length }} 筆</p>
        </div>
      </div>
      <!-- table area -->
      <div class="bg-white-box h-100">
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
            <tbody v-if="paageUserAccessRef.length > 0">
              <tr v-for="(pageAccess, index) in paageUserAccessRef" :key="pageAccess.id">
                <th scope="row" class="text-center">{{ index + 1 }}</th>
                <td>
                  <div class="ps-2 d-flex align-items-center">
                    <img class="table-img-icon me-1" :src="getPageIcon(pageAccess.pageName)" alt="" />
                    <p class="mb-0">{{ pageAccess.pageName }}</p>
                  </div>
                </td>
                <td>
                  <div class="ps-2">
                    <img class="table-img-head" :src="pageAccess.createUser.photo" alt="" />
                  </div>
                </td>
                <td>
                  <div class="ps-2 d-flex align-items-center table-img-box">
                    <template v-for="(item, index) in pageAccess.shareUser" :key="index">
                      <img class="table-img-head" :src="item.photo" alt="" />
                    </template>
                  </div>
                </td>
                <td>
                  <div class="ps-2">
                    <button class="btn btn-outline-primary border-0 fw-semibold" type="button"
                    @click="editPageBtn(pageAccess)">
                      編輯
                    </button>
                    <button type="button" class="btn btn-outline-danger border-0 fw-semibold"
                      @click="delPageBtn(pageAccess)">
                      刪除
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <span v-if="paageUserAccessRef.length <= 0">
            <p style="text-align: center; padding-bottom: 32vh">尚無資料</p>
          </span>
        </div>
      </div>
    </section>
  </div>
  <!-- Edit Modal -->
  <div class="modal fade" id="pageEditModal" data-bs-backdrop="static" tabindex="-1" aria-labelledby="pageEditModalLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content bg-white-box p-2">
        <div class="modal-header border-0">
          <div class="title-word">
            <span class="colr-block"></span>
            <h2 class="mb-0 fw-semibold">編輯「用電管理」頁面權限</h2>
          </div>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="bg-white-box bg-light p-3 mb-4">
            <p class="fs-5">新增使用者：</p>
            <div class="d-flex gap-1">
              <div class="">
                <input type="text" class="form-control" id="userInput" placeholder="請輸入使用者名稱、帳號或Email" />
              </div>
              <div class="">
                <select class="form-select" aria-label="Default select example">
                  <option selected>單位</option>
                  <option value="1">One</option>
                </select>
              </div>
              <div class="">
                <select class="form-select" aria-label="Default select example">
                  <option selected>職稱</option>
                  <option value="1">One</option>
                </select>
              </div>
              <div class="">
                <p class="mb-0">篩選</p>
              </div>
            </div>
          </div>
          <div class="mb-3">
            <p class=" fw-light">建立者：</p>
            <div class="d-flex">
              <img class="table-img-head me-2" :src="pageTempArray?.createUser.photo" :alt=" pageTempArray?.createUser.name">
              <div class="d-flex flex-column justify-content-between">
                <p class="fs-5 fw-light mb-0">{{ pageTempArray?.createUser.name }}</p>
                <p class="fs-5 mb-0">{{ pageTempArray?.createUser.phone }}</p>
              </div>
            </div>
          </div>
          <div class="mb-3">
            <div class="d-flex justify-content-between">
              <p class=" fw-light">具有權限的使用者：</p>
              <p class="fs-5 fw-light">共計：{{ pageTempArray?.shareUser.length }} 位</p>
            </div>
            <template v-for="(user,index) in pageTempArray?.shareUser" :key=user.id>
              <div class="separator" v-if="index !=0"></div>
            <div class="d-flex justify-content-between"  >
              <div class="d-flex">
                <img class="table-img-head me-2" :src="user.photo" alt="">
                <div class="d-flex flex-column justify-content-between">
                  <p class="fs-5 fw-light mb-0">{{user.name}}</p>
                  <p class="fs-5 mb-0">{{user.phone}}</p>
                </div>
              </div>
              {{ user }}
              {{ pageTempArray }}
              {{ getPageAccess(pageTempArray, user) }}
              <!-- <div class="col-3">
            <button type="button" class="btn btn-outline-gray dropdown-toggle" :class="[access.access !== '' ? 'text-black' : '']" data-bs-toggle="dropdown"
              aria-expanded="false">
              {{
                access.access !== ""
                ? getPageAccess(access.access)
                : "請選擇權限"
              }}
            </button>
            <ul class="dropdown-menu access-box">
              <template v-for="pageAccess in pageAccesss" :key="pageAccess">
                <li class="d-flex">
                  <img src="../assets/image/icons/tick.svg" :class="[pageAccess === access.access ? 'visible' : '']" alt="tick">
                  <a class="dropdown-item" href="#" @click.prevent="selectPageAccess(access,pageAccess)">
                    {{ getPageAccess(pageAccess) }}
                  </a>
                </li>
              </template>

              <li class="d-flex">
                <img src="../assets/image/icons/tick.svg"  alt="tick">
                <a class="dropdown-item text-danger border-0" href="#" @click.prevent="delePageAccess(access)">移除權限</a>
              </li>
            </ul>
          </div> -->
            </div>
          </template>
          </div>
          <div class="text-center">
            <button
              type="button"
              class="btn btn-primary w-50"
              @click="editFinalBtn()"
            >
              完成
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Delete Modal -->
  <div class="modal fade" id="delPageModal" data-bs-backdrop="static" tabindex="-1" aria-labelledby="delPageModalLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content bg-white-box">
        <div class="modal-header border-0">
          <div class="title-word">
            <span class="colr-block"></span>
            <h2 class="mb-0 fw-semibold">刪除頁面</h2>
          </div>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>

        <div class="modal-body">
          <p>
            確定要刪除
            <span class="fw-semibold">{{ tempArray?.pageName }}</span>
            與頁面內容嗎？
          </p>
          <div class="d-flex gap-2 justify-content-center">
            <button type="submit" class="fw-semibold btn btn-danger w-50" @click="checkDelPage(tempArray?.id)">
              確定刪除
            </button>
            <button type="submit" class="fw-semibold btn btn-outline-black w-50" data-bs-dismiss="modal">
              取消
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
import Swal from 'sweetalert2'
import { onMounted, ref } from 'vue'
const paageUserAccessRef = ref(null)
const editElement = ref(null)
const delElement = ref(null)
const tempArray = ref(null)
const pageTempArray = ref(null)
const { userDatas } = data
// const pageAccesss = data.pageAccesss
const searchForm = ref(null)

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

const delPageBtn = (item) => {
  delElement.value.show()
  tempArray.value = { ...item }
}
function checkDelPage (id) {
  paageUserAccessRef.value = paageUserAccessRef.value.filter(
    (item, index) => item.id !== id
  )
  tempArray.value = null
  delElement.value.hide()
  Swal.fire({
    icon: 'success',
    title: '已刪除',
    showConfirmButton: false,
    timer: 2000
  })
}

const editPageBtn = (item) => {
  editElement.value.show()
  pageTempArray.value = { ...item }
}
const editFinalBtn = () => {
  editElement.value.hide()
}
const pageUserAccesss = () => {
  const bindPageUser = []
  userDatas.forEach((user) => {
    user.pageAccess.forEach((pageAccess) => {
      const existingPageData = bindPageUser.find(
        (data) => data.pageName === pageAccess.page
      )
      if (existingPageData) {
        existingPageData.shareUser.push({ ...user })
      } else {
        const newPageData = {
          id: bindPageUser.length + 1,
          pageName: pageAccess.page,
          createUser: { ...user },
          shareUser: [{ ...user }]
        }
        bindPageUser.push(newPageData)
      }
    })
  })
  paageUserAccessRef.value = bindPageUser
}
pageUserAccesss()
const getPageIcon = (page) => {
  switch (page) {
    case '首頁':
      return '/src/assets/image/icons/home.png'
    case '用電分析':
      return '/src/assets/image/icons/power.png'
    case '目標管理':
      return '/src/assets/image/icons/target.png'
    case '能源管理':
      return '/src/assets/image/icons/energy.png'
    case '人流監控':
      return '/src/assets/image/icons/people.png'

    default:
      return '/src/assets/image/icons/home.png'
  }
}
onMounted(() => {
  editElement.value = new bootstrap.Modal('#pageEditModal', {
    keyboard: false
  })
  delElement.value = new bootstrap.Modal('#delPageModal', {
    keyboard: false
  })
})
/**
 * 將頁面權限從英文轉換為中文，若沒有規範，則傳回原始資料
 * @param {String} access 英文之頁面權限
 */
// function getPageAccessChinese (access) {
//   switch (access) {
//     case 'editable':
//       return '編輯者'
//     case 'onlyView':
//       return '檢視者'
//     case 'del':
//       return '移除權限'
//     default:
//       return access
//   }
// }
function getPageAccess (pageTempArray, userData) {
  const pageName = pageTempArray.pageName
  const userPage = userData.pageAccess
  const access = userPage.filter(page => page.page === pageName)
  console.log(access.access, userData)
}
</script>
