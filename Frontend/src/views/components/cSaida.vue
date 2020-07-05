<template>
  <span>
    <div
      role="dd_note"
      class="float-right waves-circle waves-effect mx-1"
      title="Sair"
      style="background-color:#555; color:#fff;"
      @click="sair()"
    >
      <span class="fa fa-sign-out fa-lg ml-1" style="padding-top:12px"></span>
    </div>
  </span>
</template>
<script>
import router from "@/router/index";
export default {
  methods: {
    sair() {
      localStorage.usertoken = "";
      router.push({ name: "pLogin" });
    }
  }
};
</script>