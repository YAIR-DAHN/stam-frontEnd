<template>
  <div class="login">
    <LogInFrom/>
  </div>
</template>

<script>
import LogInFrom from '@/components/users/LogInFrom.vue';

export default {
  name: 'LoginView',
  components: {
    LogInFrom

  }
}
</script>
