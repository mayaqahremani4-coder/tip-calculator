import './style.css'

// my code 

type TipResult = {
  tipAmount: number;
  total: number;
};

function calculateTip(
  bill: number,
  percent: number,
  people: number
): TipResult {
  const tip = bill * (percent / 100);

  const tipAmount = tip / people;

  const total = (bill + tip) / people;

  return {
    tipAmount,
    total,
  };
}
const billInput = document.querySelector<HTMLInputElement>('#bill');

const peopleInput = document.querySelector<HTMLInputElement>('#people');

const customTipInput = document.querySelector<HTMLInputElement>('#custom-tip');

const tipAmountOutput = document.querySelector<HTMLOutputElement>('#tip-amount');

const totalOutput = document.querySelector<HTMLOutputElement>('#total-amount');

const resetButton = document.querySelector<HTMLButtonElement>('#reset');

const tipButtons  = document.querySelectorAll<HTMLButtonElement>('[data-tip]');

let selectedTip = 0;

function updateCalculator() {
  const bill = Number(billInput?.value);
  const people = Number(peopleInput?.value);
  if (people <= 0) return;
  const percent = selectedTip;
  const result = calculateTip(bill, percent, people);
  if (tipAmountOutput) {
  tipAmountOutput.textContent = result.tipAmount.toFixed(2);
}

if (totalOutput) {
  totalOutput.textContent = result.total.toFixed(2);
}
}

tipButtons.forEach((button) => {
  button.addEventListener('click', () => {
    selectedTip = Number(button.dataset.tip);

    updateCalculator();
  });
});

billInput?.addEventListener('input', updateCalculator);

peopleInput?.addEventListener('input', updateCalculator);

customTipInput?.addEventListener('input', () => {
  selectedTip = Number(customTipInput.value);
  updateCalculator();
});


resetButton?.addEventListener('click', () => {
 if (billInput) billInput.value = '';
if (peopleInput) peopleInput.value = '';
if (customTipInput) customTipInput.value = '';

  selectedTip = 0;

  if (tipAmountOutput) {
    tipAmountOutput.textContent = '0.00';
  }

  if (totalOutput) {
    totalOutput.textContent = '0.00';
  }
});

