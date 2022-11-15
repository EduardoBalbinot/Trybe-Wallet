// Coloque aqui suas actions
export const SAVE_EMAIL = 'SAVE_EMAIL';

export const saveEmail = (email) => ({
  type: SAVE_EMAIL,
  payload: email,
});

export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
export const GET_CURRENCIES = 'GET_CURRENCIES';

export const requestCurrencies = () => ({
  type: REQUEST_CURRENCIES,
});

export const getCurrencies = (currencies) => ({
  type: GET_CURRENCIES,
  payload: currencies,
});

export const fetchCurrencies = () => (dispatch) => {
  dispatch(requestCurrencies());
  const url = 'https://economia.awesomeapi.com.br/json/all';
  fetch(url)
    .then((response) => response.json())
    .then((json) => {
      let currenciesArray = Object.keys(json);
      currenciesArray = currenciesArray.filter((c) => c !== 'USDT');
      dispatch(getCurrencies(currenciesArray));
    });
};

export const START_SAVING = 'START_SAVING';
export const END_SAVING = 'END_SAVING';

export const startSaving = {
  type: START_SAVING,
};

export const endSaving = (payload) => ({
  type: END_SAVING,
  payload,
});

export const saveExpense = (expense) => async (dispatch) => {
  dispatch(startSaving);
  const url = 'https://economia.awesomeapi.com.br/json/all';
  fetch(url)
    .then((response) => response.json())
    .then((json) => {
      expense.exchangeRates = json;
      dispatch(endSaving(expense));
    })
    .catch((error) => {
      console.log('Erro : ', error);
    });
};
