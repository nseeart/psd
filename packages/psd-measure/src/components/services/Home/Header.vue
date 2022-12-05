<template>
    <header class="header">
        <div class="main">
            <h1 class="left logo">PSD.work</h1>
            <ul class="right li-left user-nav">
                <li>
                    <router-link to="/demo">demo</router-link>
                </li>
                <li>
                    <a href="javacript:void(0)">Login</a>
                </li>
            </ul>
        </div>
    </header>
</template>

<style lang="scss" scoped>
@import "base";
.header {
    background-color: #fff;
    line-height: px2rem(120);
    border-bottom: 1px solid #dddddd;
}
.main {
    max-width: px2rem(2400);
    margin: 0 auto;
    padding: 0 px2rem(32);
}
.logo {
    color: #0295e1;
    font-size: px2rem(44);
}
.user-nav {
    font-size: px2rem(32);
    a {
        color: #666666;
    }
    li {
        padding: 0 px2rem(32);
    }
}
</style>
