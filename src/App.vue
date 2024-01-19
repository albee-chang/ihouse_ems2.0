<template>
  <div class="container-fluid">
    <div class="title-box">
      <a class="btn btn-white back-icon" href="#" role="button"
        ><span class="material-icons"> navigate_before </span>
        <!-- <img src="./src/assets/image/icons/arrow_back.svg" alt="arrow_back"> -->
      </a>
      <div class="title-word ms-44px">
        <span class="colr-block"></span>
        <h2 class="mb-0 fw-semibold">設定</h2>
      </div>
      <ul class="function-box list-unstyled">
        <li>
          <router-link
            to="/access"
            name=""
            id=""
            class="btn btn-white rounded-5"
            role="button"
          >
            權限管理
          </router-link>
        </li>
        <li>
          <router-link
            to="/devices"
            name=""
            id=""
            class="btn btn-white rounded-5"
            role="button"
          >
            設備管理
          </router-link>
        </li>
        <li>
          <router-link
            to="/others"
            name=""
            id=""
            class="btn btn-white rounded-5"
            role="button"
          >
            其他
          </router-link>
        </li>
      </ul>
    </div>
  </div>
  <router-view />
</template>
