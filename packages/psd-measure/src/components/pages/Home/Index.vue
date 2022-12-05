<template>
    <div class="home-page">
        <Header />
        <Banner />
        <Mainer />
        <Footer />
    </div>
</template>

<script lang="ts" setup>
import Header from "@services/Home/Header.vue";
import Banner from "@services/Home/Banner.vue";
import Mainer from "@services/Home/Mainer.vue";
import Footer from "@services/Home/Footer.vue";
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "base";
.home-page {
    height: 100%;
    width: 100%;
    position: relative;
}
</style>
