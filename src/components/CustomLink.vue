<template>
  <router-link :to="link.to" v-slot="{href, isActive}">
    <a :href="href" :class="isActive ? 'isActive':'normal-link'">{{ link.name }}</a>
  </router-link>

</template>

<script>
export default {
  props: {
    link:{
      type: Object,
      required: true
    }
  },
}
</script>

<style scoped>
.isActive {
  color: #42B983;
}
.normal-link {
  color: #C6C5C5
}
</style>