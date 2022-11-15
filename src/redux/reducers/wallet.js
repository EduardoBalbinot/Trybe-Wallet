// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { REQUEST_CURRENCIES, GET_CURRENCIES, START_SAVING, END_SAVING } from '../actions';

const initialState = {
  currencies: [],
  expenseIndex: 0,
  expenses: [],
  editor: false,
  idToEdit: 0,
  isFetching: false,
  isSaving: false,
};

const wallet = (state = initialState, action) => {
  switch (action.type) {
  case REQUEST_CURRENCIES:
    return {
      ...state,
      isFetching: true,
    };
  case GET_CURRENCIES:
    return {
      ...state,
      currencies: action.payload,
      isFetching: false,
    };
  case START_SAVING:
    return {
      ...state,
      isSaving: true,
    };
  case END_SAVING:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
      isSaving: false,
      expenseIndex: state.expenseIndex + 1,
    };
  default:
    return state;
  }
};

export default wallet;
