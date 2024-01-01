<template>
  <div class="main">
    <div id="content" class="main">
      <div class="container">
        <ul class="nav nav-tabs" id="myTab" role="tablist">
          <li class="nav-item w-50" role="presentation">
            <button class="nav-link w-100 active" id="bmi-tab" data-bs-toggle="tab" data-bs-target="#bmi" type="button" role="tab" aria-controls="bmi" aria-selected="true">Kalkulator BMI</button>
          </li>
          <li class="nav-item w-50" role="presentation">
            <button class="nav-link w-100" id="currencies-tab" data-bs-toggle="tab" data-bs-target="#currencies" type="button" role="tab" aria-controls="currencies" aria-selected="false">Kantor Walutowy</button>
          </li>
        </ul>
        <div class="tab-content content" id="myTabContent">
          <!-- BMI -->
          <div class="tab-pane fade show active" id="bmi" role="tabpanel" aria-labelledby="bmi-tab">
            <BmiCalculator></BmiCalculator>
          </div>
          <!-- Kalkulator walutowy -->
          <div class="tab-pane fade" id="currencies" role="tabpanel" aria-labelledby="currencies-tab">
            <CurrencyConverter></CurrencyConverter>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .container {
    margin-top: 5vh;
    min-height: 550px;
    background-color: var(--color-main-background);
    border-radius: var(--default-border-radius);
    -webkit-box-shadow: 0 6px 20px 0 var(--color-box-shadow);
    -moz-box-shadow: 0 6px 20px 0 var(--color-box-shadow);
    box-shadow: 0 6px 20px 0 var(--color-box-shadow);
    padding-right: 0;
    padding-left: 0;
  }

  .content-header {
    border-bottom-color: var(--color-border);
    border-bottom-style: dashed;
    padding: 10px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-content: center;
    justify-content: space-between;
    align-items: center
  }

  .content-header-title {
    font-weight: bold;
    font-size: calc(var(--default-font-size) * 1.5);
  }

  .content {
    padding: 15px;
  }
</style>

<script>
  import BmiCalculator from "@/components/BmiCalculator.vue";
  import CurrencyConverter from "@/components/CurrencyConverter.vue";

  export default {
    components: {BmiCalculator, CurrencyConverter},
    data() {
    },
    methods: {
    },
    mounted() {
    },
  }
</script>
