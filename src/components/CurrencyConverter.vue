<template>
  <div>
    <div class="row">
      <div class="col-lg-6">
        <div class="d-flex justify-content-center">
          <div class="col-lg-10 row">
            <div class="row mb-3">
              <div class="col-12">
                <label class="form-label" for="amount">Kwota</label>
              </div>
              <div class="col-12">
                <div class="text-center d-flex align-items-center">
                  <div class="w-100">
                    <div class="input-group mb-3">
                      <input id="amount" v-model="amount" class="form-control" min="0" name="amount" type="number">
                      <span class="input-group-text">PLN</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row mb-3">
              <div class="col-12">
                <label class="form-label" for="selectedCurrency">Wybierz walutę</label>
              </div>
              <div class="col-12 text-center d-flex align-items-center">
                <div class="w-100">
                  <div class="input-group mb-3">
                    <select id="selectedCurrency" v-model="selectedCurrency" class="form-control" name="selectedCurrency">
                      <option v-for="currency in currencies" :value="currency.value">{{ currency.text }}</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div class="row mb-3">
              <div class="col-12">
                <button class="btn btn-primary w-100" @click="convertCurrency()">
                  Przelicz na {{ getSelectedCurrencyName() }}
                </button>
              </div>
            </div>
            <div class="row">
              <span v-if="! amountValid" class="text-danger">Kwota musi być większa lub równe 0.01<template v-if="this.amount > 9007199254740991"> oraz mniejsze niż 9007199254740991</template>.</span>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-6">
        <div class="d-flex flex-column">
          <div v-if="showSummary && amountValid" class="summary">
            <div class="row mb-5">
              <div class="col-lg-12">Aktualne kursy na dzień {{ currentCurrency.effectiveDate }}</div>
              <div class="col-lg-6">
                Kupno {{ currentCurrency.text }} (Ask): <span class="green-text fs-5">{{ currentCurrency.ask }}</span>
              </div>
              <div class="col-lg-6">
                Sprzedaż {{ currentCurrency.text }} (Bid): <span class="green-text fs-5">{{ currentCurrency.bid }}</span>
              </div>
            </div>
            <div>
              <p>Za <span class="green-text fs-5">{{ amount }} PLN</span> możesz kupić <span class="green-text fs-5">{{ (amount / currentCurrency.ask).toFixed(2) }} {{ currentCurrency.text }}</span></p>
              <p>Możesz sprzedać <span class="green-text fs-5">{{ (amount / currentCurrency.bid).toFixed(2) }} {{ currentCurrency.text }}</span> za <span class="green-text fs-5">{{ amount }} PLN</span></p>
            </div>
          </div>
          <div v-else class="summary d-flex flex-column align-items-center">
            <div>
              Tutaj pojawi się wynik po przeliczeniu.
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>

<script>
export default {
  name: 'CurrencyConverter',
  data() {
    return {
      amount: 1,
      amountValid: true,
      selectedCurrency: 'usd',
      currentCurrency: null,
      currencies: [
        {text: 'USD', value: 'usd', bid: null, ask: null, effectiveDate: null},
        {text: 'EUR', value: 'eur', bid: null, ask: null, effectiveDate: null},
        {text: 'GBP', value: 'gbp', bid: null, ask: null, effectiveDate: null},
        {text: 'CHF', value: 'chf', bid: null, ask: null, effectiveDate: null},
        {text: 'NOK', value: 'nok', bid: null, ask: null, effectiveDate: null},
        {text: 'JPY', value: 'jpy', bid: null, ask: null, effectiveDate: null},
      ],
      showSummary: false,
    };
  },
  methods: {
    getCurrency(currency) {
      return this.currencies.find(c => c.value === currency);
    },
    getSelectedCurrency() {
      return this.getCurrency(this.selectedCurrency);
    },
    getSelectedCurrencyName() {
      return this.getSelectedCurrency().text;
    },
    updateCurrentCurrency() {
      this.currentCurrency = this.getSelectedCurrency();
    },
    async fetchCurrencyData(currency) {
      const url = `https://api.nbp.pl/api/exchangerates/rates/c/${currency.value}`;
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Accept': 'application/xml',
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const xmlResponse = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlResponse, "application/xml");

        const bidNode = xmlDoc.getElementsByTagName("Bid")[0];
        currency.bid = bidNode ? parseFloat(bidNode.textContent) : null;

        const askNode = xmlDoc.getElementsByTagName("Ask")[0];
        currency.ask = askNode ? parseFloat(askNode.textContent) : null;

        const effectiveDateNode = xmlDoc.getElementsByTagName("EffectiveDate")[0];
        currency.effectiveDate = effectiveDateNode ? effectiveDateNode.textContent : null;

        if (currency.bid === null || currency.ask === null || currency.effectiveDate === null) {
          throw new Error('Some currency data could not be parsed.');
        }
      } catch (error) {
        console.error('Error fetching the currency data:', error);
      }
    },
    async convertCurrency() {
      if (!this.currentCurrency.bid || !this.currentCurrency.ask) {
        await this.fetchCurrencyData(this.currentCurrency);
      }

      this.showSummary = true;
    },
  },
  mounted() {
    this.updateCurrentCurrency();
  },
  watch: {
    selectedCurrency: function () {
      this.showSummary = false;
      this.updateCurrentCurrency();
    },
    amount: function () {
      this.amountValid = this.amount >= 0.01 && this.amount <= 9007199254740991;
    },
  },
};
</script>

