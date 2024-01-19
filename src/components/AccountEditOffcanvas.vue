<!-- 建立新帳號的 offcanvas -->
<template>
  <div
    class="offcanvas offcanvas-end account-offcanvas"
    tabindex="-1"
    data-bs-backdrop="static"
    id="accountEditOffcanvas"
    aria-labelledby="accountEditOffcanvasLabel"
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
      <h2 class="mb-0 fw-semibold">建立新帳號</h2>
    </div>
    <div class="offcanvas-body">
      <VForm class="needs-validation" novalidate>
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
        <div class="col-4 mt-2">
          <button type="button" class="btn btn-outline-gray">新增頁面</button>
        </div>
        <div class="mt-5 text-center">
          <button class="btn btn-primary w-50" type="submit">下一步</button>
        </div>
      </VForm>
    </div>
  </div>
    <!-- Add Modal -->
    <AddModal
    :temp-array="tempArray"
    :array-name="arrayName"
    @dataAdjusted="handleDataAdjusted"
  ></AddModal>
</template>

<script setup>
import { ref } from 'vue'
import AddModal from '@/components/AddModal.vue'
const props = defineProps(['departments', 'titles', 'addModalElement'])
const tempArray = ref(null)
const arrayName = ref(null)
const departmentsRef = ref(props.departments)
const titlesRef = ref(props.titles)
function addModal (addType) {
  props.addModalElement.show()
  if (addType === 'title') {
    arrayName.value = 'title'
    tempArray.value = [...titlesRef.value]
  } else {
    arrayName.value = 'department'
    tempArray.value = [...departmentsRef.value]
  }
}

function handleDataAdjusted (dataAdjusted) {
  const { arrayName, adjustedArray } = dataAdjusted
  switch (arrayName) {
    case 'title':
      titlesRef.value = adjustedArray
      break
    case 'department':
      departmentsRef.value = adjustedArray
      break
    default:
      console.error(dataAdjusted)
      break
  }
  props.addModalElement.hide()
}
</script>
