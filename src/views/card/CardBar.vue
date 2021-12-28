<template>
  <section>
    <!--是否登录-->
    <login-welcome />

    <!--常识-->
    <tip-card />

    <!--网站链接-->
    <PromotionCard />
  </section>
</template>

<script>
import TipCard from '@/views/card/Tip'
import PromotionCard from '@/views/card/Promotion'
import LoginWelcome from '@/views/card/LoginWelcome'

export default {
  name: 'CardBar',
  components: { LoginWelcome, PromotionCard, TipCard }
}
</script>

<style scoped>
</style>
