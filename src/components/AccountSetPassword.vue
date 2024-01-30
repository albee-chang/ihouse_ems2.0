<template>
  <div class="offcanvas offcanvas-end account-offcanvas" tabindex="-1" data-bs-backdrop="static" id="setPasswordCanvas"
    aria-labelledby="accountEditOffcanvasLabel">
    <div class="offcanvas-header justify-content-end">
      <button type="button" class="btn-close rounded-5 bg-gray" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="title-word mt-1">
      <span class="colr-block"></span>
      <h2 class="mb-0 fw-semibold">設定密碼</h2>
    </div>
    <div class="offcanvas-body">
      <div></div>
      <VForm ref="setPasswordForm" class="needs-validation h-100 d-flex flex-column justify-content-between"
        v-slot="{ meta }" novalidate>
        <div class="row g-3">
          <div class="col-8">
            <label for="password" class="form-label">密碼：</label>
            <VField class="form-control" id="password" name="password" type="password" rules="required"
              placeholder="請輸入密碼" />
            <ErrorMessage as="p" class="invalid-feedback d-block mb-0" name="password" />
          </div>
          <div class="col-8">
            <label for="password-chcek" class="form-label">確認密碼：</label>
            <VField class="form-control" id="password-chcek" name="password-chcek" type="password"
              rules="confirmed:@password" placeholder="請再次輸入密碼" v-model="userObjectRef.password" />
            <ErrorMessage as="p" class="invalid-feedback d-block mb-0" name="password-chcek" />
          </div>
        </div>
        <div class="mt-5 text-center d-flex gap-2">
          <button class="btn btn-outline-gray text-black w-50" type="button" @click="userFormSubmit()">
            上一步
          </button>
          <button class="btn btn-primary w-50" :disabled="!meta.valid" type="button" @click="userFormSubmit(value)">
            完成
          </button>
        </div>
      </VForm>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import commonFunction from '../assets/js/commonFunctions.js'
const { swalSuccess } = commonFunction.setup()

const setPasswordForm = ref(null)

const props = defineProps([
  'userObject', 'setPasswordElement', 'accountEditElement'
])

const userObjectRef = reactive(props.userObject)

/**
 * 送出表單，完成密碼設定。同時關閉 offcanvas
 */
function userFormSubmit () {
  // 請在這裡接要設定密碼的 API
  setPasswordForm.value.resetForm()
  props.setPasswordElement.hide()
  props.accountEditElement.hide()
  swalSuccess('已建立')
}

</script>
