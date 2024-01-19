<template>
  <div>
    <div class="row">
      <div class="col-lg-6">
        <div class="d-flex justify-content-center">
          <div class="col-lg-10 row">
            <div class="row mb-3">
              <input id="sex-male" v-model="sex" autocomplete="off" class="btn-check" name="sex" type="radio" value="male">
              <label class="btn btn-outline-secondary sex-button d-flex flex-column align-content-center align-items-center justify-content-center" for="sex-male">
                <span class="material-symbols-outlined">face</span>
                <span>Mężczyzna</span>
              </label>
              <input id="sex-female" v-model="sex" autocomplete="off" class="btn-check" name="sex" type="radio" value="female">
              <label class="btn btn-outline-secondary sex-button d-flex flex-column align-content-center align-items-center justify-content-center" for="sex-female">
                <span class="material-symbols-outlined">face_3</span>
                <span>Kobieta</span>
              </label>
            </div>
            <div class="row mb-3">
              <div class="col-8">
                <label class="form-label" for="age">Wiek</label>
                <input id="ageRange" v-model="age" class="form-range" max="80" min="18" step="1" type="range">
              </div>
              <div class="col-4 text-center d-flex align-items-center">
                <div class="w-100">
                  <div class="input-group mb-2">
                    <input id="age" v-model="age" class="form-control" max="80" min="18" name="age" type="number">
                    <span class="input-group-text">lat</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="row mb-3">
              <div class="col-8">
                <label class="form-label" for="height">Wzrost</label>
                <input id="heightRange" v-model="height" class="form-range" max="220" min="130" step="1" type="range">
              </div>
              <div class="col-4 text-center d-flex align-items-center">
                <div class="w-100">
                  <div class="input-group mb-2">
                    <input id="height" v-model="height" class="form-control" max="220" min="130" name="height" type="number">
                    <span class="input-group-text">cm</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="row mb-3">
              <div class="col-8">
                <label class="form-label" for="weight">Waga</label>
                <input v-model="weight" class="form-range" max="250" min="30" name="weightRange" step="1" type="range">
              </div>
              <div class="col-4 text-center d-flex align-items-center">
                <div class="w-100">
                  <div class="input-group mb-2">
                    <input id="weight" v-model="weight" class="form-control" max="250" min="30" name="weight" type="number">
                    <span class="input-group-text">kg</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <span v-if="!ageValid" class="text-danger">Wiek musi być w przedziale 18-80 lat.</span>
              <span v-if="!heightValid" class="text-danger">Wzrost musi być w przedziale 130-220 cm.</span>
              <span v-if="!weightValid" class="text-danger">Waga musi być w przedziale 30-250 kg.</span>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-6">
        <div class="d-flex flex-column">
          <div class="w-100 mb-5">
            <span class="green-text">Kalkulator BMI (Body Mass Index)</span> jest narzędziem, które pozwala obliczyć wskaźnik masy ciała. BMI to miara, która określa, czy nasza waga dla naszego wzrostu jest odpowiednia.
          </div>
          <div class="w-100">
            <h5>Wynik:</h5>
            <div class="bmi-result">{{ bmi ?? '-' }} BMI<span class="fs-6 text-danger" v-if="!sex"> (wybierz płeć)</span></div>
          </div>
          <div class="w-100">
            <div ref="bmiLine" class="d-flex flex-row justify-content-center bmi-line-wrapper">
              <div v-if="bmi !== null"
                   ref="bmiYouTag"
                   :style="{ 'right' : bmiTag.location + '%' }"
                   class="bmi-line-you-tag text-nowrap">
                {{ bmiTag.text }}
              </div>
              <div v-if="bmi !== null"
                   ref="bmiResult"
                   :style="{ 'right' : bmiTag.markerLocation + '%' }"
                   class="bmi-line bmi-line-result"></div>
              <div v-for="(line, index) in bmiLineDetails" :key="index" :class="line.class" :style="line.style"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BmiCalculator',
  data() {
    return {
      sex: null,
      age: 26,
      ageValid: true,
      height: 170,
      heightValid: true,
      weight: 70,
      weightValid: true,
      bmi: null,
      bmiLineDetails: [],
      bmiTag: {
        text: '',
        location: 50,
        markerLocation: 50,
      },
    };
  },
  methods: {
    isValidNumber(value, min, max) {
      return min <= value && value <= max;
    },
    ageIsValid() {
      const ageRange = {min: 18, max: 80};
      this.ageValid = this.isValidNumber(this.age, ageRange.min, ageRange.max);
      return this.ageValid;
    },
    heightIsValid() {
      const heightRange = {min: 130, max: 220};
      this.heightValid = this.isValidNumber(this.height, heightRange.min, heightRange.max);
      return this.heightValid;
    },
    weightIsValid() {
      const weightRange = {min: 30, max: 250};
      this.weightValid = this.isValidNumber(this.weight, weightRange.min, weightRange.max);
      return this.weightValid;
    },
    isInputValid() {
      return this.sex && this.ageValid && this.heightValid && this.weightValid;
    },
    calculateBMI() {
      if (!this.isInputValid()) {
        this.bmi = null;
        return;
      }

      this.bmi = Math.round(this.weight / ((this.height / 100) ** 2));
      this.$nextTick(this.updateBmiTag);
    },
    calculateBmiLine() {
      const colors = ['#4DA1C4', '#4DA1C4', '#85C44D', '#C48D4D', '#C44D55', '#745557', '#745557'];
      const widthLine = this.$refs.bmiLine?.clientWidth || 0;
      const categories = this.getCategoriesForSexAndAge(this.sex, this.age);
      const min = categories[0];
      const max = categories[categories.length - 1];

      return categories.slice(0, -1).map((from, index) => {
        const to = categories[index + 1];
        const proportion = (to - from) / (max - min);
        const width = widthLine * proportion;

        return {
          class: `bmi-line bmi-line-${index}`,
          style: `background-color: ${colors[index]}; width: ${width}px;`,
        };
      });
    },
    updateBmiLine() {
      this.bmiLineDetails = this.calculateBmiLine();
    },
    updateBmiTag() {
      if (this.bmi === null) {
        return;
      }

      const categories = this.getCategoriesForSexAndAge(this.sex, this.age);
      const minBmi = categories[0];
      const maxBmi = categories[categories.length - 1];
      const relativeBmiPosition = (this.bmi - minBmi) / (maxBmi - minBmi);

      this.bmiTag.markerLocation = Math.min(100, Math.max(0, 100 - (relativeBmiPosition * 100)));

      const bmiLabels = [
        {maxRange: categories[2], text: 'Niedowaga'},
        {maxRange: categories[3], text: 'Normalna waga'},
        {maxRange: categories[4], text: 'Nadwaga'},
        {maxRange: categories[5], text: 'Otyłość'},
        {maxRange: Infinity, text: 'Ciężka otyłość'},
      ];

      this.bmiTag.text = bmiLabels.find((range) => this.bmi <= range.maxRange).text;

      this.$nextTick(() => this.bmiTag.location = this.bmiTag.markerLocation - (this.$refs.bmiYouTag.clientWidth / 12));
    },
    getCategoriesForSexAndAge(sex, age) {
      const ageRanges = [
        {maxAge: 24, categories: {female: [16, 16, 19, 24, 29, 39, 42, 42], male: [17, 17, 20, 25, 30, 40, 43, 43]}},
        {maxAge: 34, categories: {female: [17, 17, 20, 25, 30, 40, 43, 43], male: [18, 18, 21, 26, 31, 41, 44, 44]}},
        {maxAge: 44, categories: {female: [18, 18, 21, 26, 31, 41, 44, 44], male: [19, 19, 22, 27, 32, 42, 45, 45]}},
        {maxAge: 54, categories: {female: [19, 19, 22, 27, 32, 42, 45, 45], male: [20, 20, 23, 28, 33, 43, 46, 46]}},
        {maxAge: 64, categories: {female: [20, 20, 23, 28, 33, 43, 46, 46], male: [21, 21, 24, 29, 34, 44, 47, 47]}},
        {maxAge: Infinity, categories: {female: [21, 21, 24, 29, 34, 44, 47, 47], male: [22, 22, 25, 30, 35, 45, 48, 48]}},
      ];

      return ageRanges.find((range) => age <= range.maxAge).categories[sex === 'female' ? 'female' : 'male'];
    },
  },
  mounted() {
    this.calculateBMI();
    this.updateBmiLine();
  },
  watch: {
    sex: function () {
      this.calculateBMI();
      this.updateBmiLine();
    },
    age: function () {
      this.ageIsValid();
      this.calculateBMI();
      this.updateBmiLine();
    },
    height: function () {
      this.heightIsValid();
      this.calculateBMI();
    },
    weight: function () {
      this.weightIsValid();
      this.calculateBMI();
    },
  },
}
</script>

<style>
.sex-button {
  border-radius: var(--default-border-radius);
  border-width: var(--default-border-width);
  border-color: var(--color-border);
  border-style: dashed;
  padding: 15px 5px;
  color: var(--color-main-text);
  margin: 6px;
  width: calc(50% - 12px);
}

.btn-outline-secondary {
  --bs-btn-active-bg: var(--green);
}

.bmi-result {
  font-size: 4em;
  margin-left: 20px;
}

.bmi-line-wrapper {
  position: relative;
  border-width: var(--default-border-width);
  border-color: var(--color-border);
  border-style: solid;
}

.bmi-line {
  height: 25px
}

.bmi-line-result {
  position: absolute;
  background-color: #000000;
  width: 4px;
  transition: right 150ms ease-in-out 0s;
}

.bmi-line-you-tag {
  position: absolute;
  top: 2em;
  background-color: var(--color-main-background);
  border-radius: var(--default-border-radius);
  border-width: var(--default-border-width);
  border-color: var(--color-border);
  padding-left: 5px;
  padding-right: 5px;
  border-style: dashed;
  transition: right 150ms ease-in-out 0s;
}
</style>
