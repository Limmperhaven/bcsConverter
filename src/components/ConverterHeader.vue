<template>
  <header>
    <div class="container">
      <img src="../../public/bcs.svg" id="logo-image" @click="$router.push('/')">
      <div class="menu">
        <div class="header__button" @click="$router.push('/')">
          <img src="../../public/img/exchanger.svg" class="button__image">
          <span>Converter</span>
        </div>
        <div class="header__button" @click="$router.push('/stock')">
          <img src="../../public/img/stock.svg" class="button__image">
          <span>My Stock</span>
        </div>
      </div>
    </div>
  </header>
  <div id="border"></div>
</template>

<script>
export default {
  name: 'ConverterHeader'
}
</script>

<style scoped>
  header {
    width: 100%;
    height: 80px;
  }
  .container{
    margin: auto auto;
    align-items: center;
    display: flex;
    height: 100%;
    width: calc(1800%/1920*100);
    justify-content: space-between;
  }
  .menu {
    display: flex;
    align-items: center;
  }
  .header__button {
    display: flex;
    align-items: center;
    color: #846C5A;
    padding-left: 50px;
    font-size: 14px;
    cursor: pointer;
  }
  .header__button span {
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
  .button__image {
    margin-right: 5px;
    height: 30px;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.35));
  }
  #logo-image {
    cursor: pointer;
    height: 60px;
  }
  #border {
    width: 100%;
    height: 6px;
    background-color: #846C5A;
    box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.4);
  }
</style>
