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
              rules="confirmed:@password" placeholder="請再次輸入密碼" v-model="userObject.password" />
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
import { ref } from 'vue'
import Swal from 'sweetalert2'

const setPasswordForm = ref(null)

const props = defineProps([
  'setPasswordElement', 'accountEditElement'
])

function userFormSubmit (value) {
  setPasswordForm.value.resetForm()
  props.setPasswordElement.hide()
  props.accountEditElement.hide()
  Swal.fire({
    icon: 'success',
    title: '已建立',
    showConfirmButton: false,
    timer: 2000
  })
}

const userObject = {
  account: '',
  name: '',
  phone: '',
  department: '',
  title: '',
  systemAccess: '',
  page: ''
}
</script>
