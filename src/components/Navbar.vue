<template>
  <div>
    <CustomLink
      v-for="link in links"
      :key="link.to"
      :link="link"
    />
  </div>
</template>

<script>
import CustomLink from "./CustomLink.vue";
export default {
  data(){
    return {
      links: [
        {
          to: '/student',
          name: 'Alumnos'
        },
        {
          to: '/subject',
          name: 'Materias'
        }
      ]
    }
  },
  components: {CustomLink}
}
</script>

<style scoped>
div {
  padding: 0 30px;
}

div a {
  font-weight: bold;
  color: #2C3E50;
  margin: 0 10px;
}

div .router-link-exact-active {
  color: #42B983
}
</style>