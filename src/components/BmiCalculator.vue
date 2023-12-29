<template>
  <div>
    <div class="row">
      <div class="col-lg-6">
        <div class="d-flex justify-content-center">
          <div class="col-lg-10 row">
            <div class="row mb-3">
              <input v-model="sex" type="radio" class="btn-check" name="sex" id="sex-male" autocomplete="off" value="male">
              <label class="btn btn-outline-secondary sex-button d-flex flex-column align-content-center align-items-center justify-content-center" for="sex-male">
                <span class="material-symbols-outlined">face</span>
                <span>Mężczyzna</span>
              </label>
              <input v-model="sex" type="radio" class="btn-check" name="sex" id="sex-female" autocomplete="off" value="female">
              <label class="btn btn-outline-secondary sex-button d-flex flex-column align-content-center align-items-center justify-content-center" for="sex-female">
                <span class="material-symbols-outlined">face_3</span>
                <span>Kobieta</span>
              </label>
            </div>
            <div class="row mb-3">
              <div class="col-8">
                <label for="height" class="form-label">Wzrost</label>
                <input v-model="age" type="range" id="heightRange" min="18" max="80" step="1" class="form-range">
              </div>
              <div class="col-4 text-center d-flex align-items-center">
                <div class="w-100">
                  <div class="input-group mb-3">
                    <input v-model="age" type="number" name="height" id="height" min="18" max="80" class="form-control">
                    <span class="input-group-text">lat</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="row mb-3">
              <div class="col-8">
                <label for="height" class="form-label">Wzrost</label>
                <input v-model="height" type="range" id="heightRange" min="130" max="220" step="1" class="form-range">
              </div>
              <div class="col-4 text-center d-flex align-items-center">
                <div class="w-100">
                  <div class="input-group mb-3">
                    <input v-model="height" type="number" name="height" id="height" min="130" max="220" class="form-control">
                    <span class="input-group-text">cm</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="row mb-3">
              <div class="col-8">
                <label for="weight" class="form-label">Waga</label>
                <input v-model="weight" type="range" name="weightRange" min="30" max="250" step="1" class="form-range">
              </div>
              <div class="col-4 text-center d-flex align-items-center">
                <div class="w-100">
                  <div class="input-group mb-3">
                    <input v-model="weight" type="number" name="weight" id="weight" min="30" max="250" class="form-control">
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
            <div class="d-flex flex-row justify-content-center bmi-line-wrapper" style="position: relative;">
              <div class="bmi-line-you-tag" style="position: absolute;">Twój wynik</div>
              <div class="bmi-line bmi-line-result" style="background-color:#000000;position: absolute;"></div>
              <div class="bmi-line bmi-line-1" style="background-color:#4DA1C4"></div>
              <div class="bmi-line bmi-line-2" style="background-color:#4DA1C4"></div>
              <div class="bmi-line bmi-line-3" style="background-color:#85C44D"></div>
              <div class="bmi-line bmi-line-4" style="background-color:#C48D4D"></div>
              <div class="bmi-line bmi-line-5" style="background-color:#C44D55"></div>
              <div class="bmi-line bmi-line-6" style="background-color:#745557"></div>
              <div class="bmi-line bmi-line-7" style="background-color:#745557"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

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
    border-width: var(--default-border-width);
    border-color: var(--color-border);
    border-style: solid;
  }

  .bmi-line {
    height: 25px
  }

  .bmi-line-result {
    width: 4px;
    transition: right 150ms ease-in-out 0s;
  }

  .bmi-line-you-tag {
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
      };
    },
    methods: {
      ageIsValid() {
        const max = 80;
        const min = 18;

        this.ageValid = this.age && min <= this.age && this.age <= max;
        return this.ageValid;
      },
      heightIsValid() {
        const max = 220;
        const min = 130;

        this.heightValid = this.height && min <= this.height && this.height <= max;
        return this.heightValid;
      },
      weightIsValid() {
        const max = 250;
        const min = 30;

        this.weightValid = this.weight && min <= this.weight && this.weight <= max
        return this.weightValid;
      },
      calculateBMI() {
        if (this.sex && this.ageValid && this.heightValid && this.weightValid) {
          this.bmi = Math.round(this.weight / ((this.height / 100) ** 2));
          $('.bmi-line-you-tag').show();
          $('.bmi-line-result').show();
          this.updateBmiTag();
        } else {
          this.bmi = null;
          $('.bmi-line-you-tag').hide();
          $('.bmi-line-result').hide();
        }
      },
      renderBmiLine() {
        const widthLine = $('.bmi-line-wrapper').width();
        const categories = this.getCategoriesForSexAndAge(this.sex, this.age);
        const min = categories[0];
        const max = categories[categories.length - 1];

        categories.forEach(function (from, index) {
          let to = categories[index+1];
          if (! to) {
            return;
          }
          let width = widthLine * ((to-from)/(max-min));

          $('.bmi-line-' + (index + 1)).css('width', width + 'px');
        });
      },
      updateBmiTag() {
        const bmiLineYouTag = $('.bmi-line-you-tag');
        const categories = this.getCategoriesForSexAndAge(this.sex, this.age);
        const min = categories[0];
        const max = categories[categories.length - 1];

        let location = Math.min(Math.max(100 - ((this.bmi - min) / (max - min) * 100), 0), 100);
        $('.bmi-line-result').css('right', (location) + '%');

        if(this.bmi < categories[2]) {
          bmiLineYouTag.html('Niedowaga');
        } else if (this.bmi < categories[3]) {
          bmiLineYouTag.html('Normalna waga');
        } else if (this.bmi < categories[4]) {
          bmiLineYouTag.html('Nadwaga');
        } else if (this.bmi < categories[5]) {
          bmiLineYouTag.html('Otyłość');
        } else {
          bmiLineYouTag.html('Ciężka otyłość');
        }

        location = location - ($('.bmi-line-you-tag').width() / 12);
        bmiLineYouTag.css('right', (location) + '%');
        bmiLineYouTag.css('top', '2em');
      },
      getCategoriesForSexAndAge(sex, age) {
        if (sex === 'female') {
          if (age <= 24) {
            return [16, 16, 19 ,24, 29, 39, 42, 42]
          } else if (age <= 34) {
            return [17, 17, 20, 25, 30, 40, 43, 43]
          } else if (age <= 44) {
            return [18, 18, 21, 26, 31, 41, 44, 44]
          } else if (age <= 54) {
            return [19, 19, 22, 27, 32, 42, 45, 45]
          } else if (age <= 64) {
            return [20, 20, 23, 28, 33, 43, 46, 46]
          } else {
            return [21, 21, 24, 29, 34, 44, 47, 47]
          }
        } else {
          if (age <= 24) {
            return [17, 17, 20, 25, 30, 40, 43, 43]
          } else if (age <= 34) {
            return [18, 18, 21, 26, 31, 41, 44, 44]
          } else if (age <= 44) {
            return [19, 19, 22, 27, 32, 42, 45, 45]
          } else if (age <= 54) {
            return [20, 20, 23, 28, 33, 43, 46, 46]
          } else if (age <= 64) {
            return [21, 21, 24, 29, 34, 44, 47, 47]
          } else {
            return [22, 22, 25, 30, 35, 45, 48, 48]
          }
        }
      }
    },
    mounted() {
      this.calculateBMI();
      this.renderBmiLine();
    },
    watch: {
      sex: function () {
        this.calculateBMI();
        this.renderBmiLine();
      },
      age: function () {
        this.ageIsValid();
        this.calculateBMI();
        this.renderBmiLine();
      },
      height: function () {
        this.heightIsValid();
        this.calculateBMI();
      },
      weight: function () {
        this.weightIsValid();
        this.calculateBMI();
      },
    }
  }
</script>
