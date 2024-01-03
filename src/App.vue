<template>
  <div class="main">
    <div id="content" class="main">
      <div class="container">
        <ul id="myTab" class="nav nav-tabs" role="tablist">
          <li class="nav-item w-50" role="presentation">
            <button id="bmi-tab" aria-controls="bmi" aria-selected="true" class="nav-link w-100 active" data-bs-target="#bmi" data-bs-toggle="tab" role="tab" type="button">
              Kalkulator BMI
            </button>
          </li>
          <li class="nav-item w-50" role="presentation">
            <button id="currencies-tab" aria-controls="currencies" aria-selected="false" class="nav-link w-100" data-bs-target="#currencies" data-bs-toggle="tab" role="tab" type="button">
              Kantor Walutowy
            </button>
          </li>
        </ul>
        <div id="myTabContent" class="tab-content content">
          <div id="bmi" aria-labelledby="bmi-tab" class="tab-pane fade show active" role="tabpanel">
            <BmiCalculator></BmiCalculator>
          </div>
          <div id="currencies" aria-labelledby="currencies-tab" class="tab-pane fade" role="tabpanel">
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

.content {
  padding: 15px;
}
</style>

<script>
import BmiCalculator from "@/components/BmiCalculator.vue";
import CurrencyConverter from "@/components/CurrencyConverter.vue";

export default {
  components: {BmiCalculator, CurrencyConverter},
}
</script>
