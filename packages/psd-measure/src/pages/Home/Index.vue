<template>
    <div class="home-page">
        <Header />
        <Banner />
        <Mainer />
        <Footer />
    </div>
</template>

<script lang="ts" setup>
import Header from "@/components/Home/Header.vue";
import Banner from "@/components/Home/Banner.vue";
import Mainer from "@/components/Home/Mainer.vue";
import Footer from "@/components/Home/Footer.vue";
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
