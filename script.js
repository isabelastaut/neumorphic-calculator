const $input = document.querySelector("input");

document.querySelectorAll(".number_key").forEach(
    el => {
        el.onclick = () => $input.value = $input.value !== "0" ? $input.value + el.innerText : el.innerText;
    }
));

const buffer = [];

const operatorCallback = operatorName => () => {
    let currentValue = parseFloat($input.value);

    if (operatorName === "percent") {
        currentValue += 0.01;
        $input.value = currentValue;
    }
    else {
        if (buffer && buffer.length) {
            buffer.push({ value: currentValue });

            const result = evaluate(buffer);

            buffer.push({ value: result });
            buffer.push({ value: operatorName});

            $input.value = "";
        }
        else {
            buffer.push({ value: currentValue });
            buffer.push({ value: operatorName});
            $input.value = "";
        }
    }
}

const evaluate = buffer => {
    const secondOperand = buffer.pop().value;
    const operator = buffer.pop().value;
    const firstOperand = buffer.pop().value;

    switch (operator) {
        case "add":
            return firstOperand + secondOperand;
            break;
        case "subtract":
            return firstOperand - secondOperand;
            break;
        case "multiply":
            return firstOperand * secondOperand;
            break;
        case "divide":
            return firstOperand / secondOperand;
            break;
        default:
            return secondOperand;
    }
};

for (const operatorName of ["add", "subtract", "multiply", "divide", "percent"]) {
    document.querySelector('.operator_key[op=${operatorName}]').onclick = operatorCallback(operatorName);
}

document.querySelector(".equal_key").onclick = () => {
    if (buffer && buffer.length) {
        buffer.push({ value: parseFloat($input.value)});
        $input.value = evaluate(buffer);
    }
};

document.querySelector("operator_key[op=clear]").onclick = () => {
    $input.value = 0;
    buffer.length = 0;
};

document.querySelector(".operator_key[op=negate]").onclick = () => $input.value = -parseFloat($input.value);