import React, { useState } from "react";
import Input from "./Input";
import { useInput } from "../hooks/useInput";

import dollar from "@assets/icon-dollar.svg";
import person from "@assets/icon-person.svg";
import Check from "./Check";

const tips = {
  t5: 5,
  t10: 10,
  t15: 15,
  t25: 25,
  t50: 50,
};

type TipKey = keyof typeof tips;

function isTipKey(key: string): key is TipKey {
  return key in tips;
}

function getTipValue(tip: string) {
  if (!isTipKey(tip)) {
    return 0;
  }
  return tips[tip];
}

function getTipAmount(bill: number, tip: string) {
  if (!isTipKey(tip)) {
    return 0;
  }
  const tipValue: number = tips[tip];
  return (bill * tipValue) / 100;
}

function getPeopleInputErrorMessage (value: number): string {
  if (value === 0) {
    return "Can't be zero";
  }

  if (value < 0) {
    return "Can't be negative";
  }

  if (value % 1 !== 0) return "Can't be decimal";

  return "";
};

function formatCurrency(value: number): string {
  let currencyValue = value;

  if (!currencyValue) {
    currencyValue = 0;
  }

  if (currencyValue < 0) {
    currencyValue = 0;
  }

  if (!Number.isFinite(currencyValue)) {
    currencyValue = 0;
  }

  console.log(currencyValue);

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(currencyValue);
}

const TipCalculator: React.FC = () => {
  const [selectedTip, setSelectedTip] = useState<string | null>(null);
  const bill = useInput(null);
  const people = useInput(null);
  const customTip = useInput(null);

  const tipAmount: number =
    selectedTip === "custom"
      ? customTip.value
      : getTipAmount(bill.value, selectedTip ?? "");
  const tipAmountPerPerson: number = tipAmount / people.value;
  const totalPerPerson = (bill.value + tipAmount) / people.value;

  const reset = () => {
    setSelectedTip(null);
    bill.reset();
  };

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-4 rounded-3xl bg-white p-6 shadow-md md:w-3/5 lg:flex-row">
      <form>
        <Input label="Bill" iconSrc={dollar} onChange={bill.onChange} />
        <div>
          <h3 className="mb-4 text-lg font-semibold text-gray-500">
            Select Tip %
          </h3>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
            {Object.keys(tips).map((tip) => (
              <Check
                key={tip}
                value={tip}
                text={`${getTipValue(tip)}%`}
                selected={selectedTip === tip}
                onChange={setSelectedTip}
              />
            ))}
            <Input
              placeholder="Custom"
              slack={selectedTip !== "custom"}
              className={`${
                selectedTip === "custom" ? "text-secondary-light" : ""
              }`}
              onChange={(e) => {
                setSelectedTip("custom");
                customTip.onChange(e);
              }}
            />
          </div>
        </div>
        <Input
          label="Number of People"
          errorMessage={getPeopleInputErrorMessage(people.value)}
          iconSrc={person}
          onChange={people.onChange}
        />
      </form>
      <div className="flex flex-col justify-between rounded-lg bg-primary-dark p-4 lg:w-3/4">
        <body>
          {[
            {
              text: "Tip Amount",
              value: tipAmountPerPerson,
            },
            {
              text: "Total",
              value: totalPerPerson,
            },
          ].map(({ text, value }) => (
            <div className="flex justify-between" key={text}>
              <p className="mb-4 flex flex-col font-extrabold text-white">
                {text}
                <span className="font-normal text-secondary-light">
                  / person
                </span>
              </p>
              <div className="text-4xl font-bold text-primary">
                {formatCurrency(value)}
              </div>
            </div>
          ))}
        </body>
        <footer>
          <button
            onClick={reset}
            type="button"
            className="w-full rounded bg-primary px-4 py-2 font-semibold text-primary-dark"
          >
            RESET
          </button>
        </footer>
      </div>
      <style>
        {`
        form > * {
          margin-bottom: 2rem;
        }
        `}
      </style>
    </div>
  );
};

export default TipCalculator;
