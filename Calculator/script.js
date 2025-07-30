class Calculator {
            constructor() {
                this.display = document.getElementById('display');
                this.history = document.getElementById('history');
                this.memoryIndicator = document.getElementById('memoryIndicator');

                this.currentInput = '0';
                this.previousInput = '';
                this.operator = null;
                this.waitingForOperand = false;
                this.memory = 0;
                this.lastOperation = '';

                this.initializeEventListeners();
                this.updateDisplay();
                this.updateMemoryIndicator();
            }

            initializeEventListeners() {
                // Button clicks
                document.querySelectorAll('.btn').forEach(button => {
                    button.addEventListener('click', (e) => {
                        this.handleButtonClick(e.target);
                        this.animateButton(e.target);
                    });
                });

                // Keyboard support
                document.addEventListener('keydown', (e) => {
                    this.handleKeyPress(e);
                });

                // Prevent context menu on buttons
                document.querySelectorAll('.btn').forEach(button => {
                    button.addEventListener('contextmenu', (e) => e.preventDefault());
                });
            }

            handleButtonClick(button) {
                const number = button.dataset.number;
                const action = button.dataset.action;

                if (number !== undefined) {
                    this.inputNumber(number);
                } else if (action) {
                    this.performAction(action);
                }
            }

            handleKeyPress(e) {
                e.preventDefault();

                const key = e.key;
                const keyMap = {
                    '0': '0', '1': '1', '2': '2', '3': '3', '4': '4',
                    '5': '5', '6': '6', '7': '7', '8': '8', '9': '9',
                    '.': 'decimal',
                    '+': 'add',
                    '-': 'subtract',
                    '*': 'multiply',
                    '/': 'divide',
                    '%': 'percent',
                    'Enter': 'equals',
                    '=': 'equals',
                    'Escape': 'clear',
                    'Backspace': 'backspace',
                    'Delete': 'clear-entry'
                };

                if (keyMap[key]) {
                    if (key >= '0' && key <= '9') {
                        this.inputNumber(key);
                    } else {
                        this.performAction(keyMap[key]);
                    }

                    // Animate corresponding button
                    this.animateCorrespondingButton(key);
                }
            }

            animateCorrespondingButton(key) {
                let selector = '';

                if (key >= '0' && key <= '9') {
                    selector = `[data-number="${key}"]`;
                }
                else {
                    const actionMap = {
                        '.': '[data-action="decimal"]',
                        '+': '[data-action="add"]',
                        '-': '[data-action="subtract"]',
                        '*': '[data-action="multiply"]',
                        '/': '[data-action="divide"]',
                        '%': '[data-action="percent"]',
                        'Enter': '[data-action="equals"]',
                        '=': '[data-action="equals"]',
                        'Escape': '[data-action="clear"]',
                        'Backspace': '[data-action="backspace"]',
                        'Delete': '[data-action="clear-entry"]'
                    };
                    selector = actionMap[key];
                }

                if (selector) {
                    const button = document.querySelector(selector);
                    if (button) {
                        this.animateButton(button);
                    }
                }
            }

            animateButton(button) {
                button.classList.add('btn-pressed');
                setTimeout(() => {
                    button.classList.remove('btn-pressed');
                }, 100);
            }

            inputNumber(num) {
                if (this.waitingForOperand) {
                    this.currentInput = num;
                    this.waitingForOperand = false;
                } else {
                    this.currentInput = this.currentInput === '0' ? num : this.currentInput + num;
                }

                this.updateDisplay();
            }

            performAction(action) {
                const current = parseFloat(this.currentInput);

                switch (action) {
                    case 'clear':
                        this.clear();
                        break;
                    case 'clear-entry':
                        this.clearEntry();
                        break;
                    case 'backspace':
                        this.backspace();
                        break;
                    case 'decimal':
                        this.inputDecimal();
                        break;
                    case 'add':
                    case 'subtract':
                    case 'multiply':
                    case 'divide':
                    case 'percent':
                        this.inputOperator(action);
                        break;
                    case 'equals':
                        this.calculate();
                        break;
                    case 'memory-store':
                        this.memoryStore();
                        break;
                    case 'memory-recall':
                        this.memoryRecall();
                        break;
                    case 'memory-clear':
                        this.memoryClear();
                        break;
                }
            }

            clear() {
                this.currentInput = '0';
                this.previousInput = '';
                this.operator = null;
                this.waitingForOperand = false;
                this.lastOperation = '';
                this.updateDisplay();
                this.updateHistory('');
            }

            clearEntry() {
                this.currentInput = '0';
                this.updateDisplay();
            }

            backspace() {
                if (this.currentInput.length > 1) {
                    this.currentInput = this.currentInput.slice(0, -1);
                } else {
                    this.currentInput = '0';
                }
                this.updateDisplay();
            }

            inputDecimal() {
                if (this.waitingForOperand) {
                    this.currentInput = '0.';
                    this.waitingForOperand = false;
                } else if (this.currentInput.indexOf('.') === -1) {
                    this.currentInput += '.';
                }
                this.updateDisplay();
            }

            inputOperator(nextOperator) {
                const inputValue = parseFloat(this.currentInput);

                if (this.previousInput === '') {
                    this.previousInput = inputValue;
                } else if (this.operator) {
                    const currentValue = this.previousInput || 0;
                    const newValue = this.performCalculation(this.operator, currentValue, inputValue);

                    this.currentInput = String(newValue);
                    this.previousInput = newValue;
                    this.updateDisplay();
                }

                this.waitingForOperand = true;
                this.operator = nextOperator;

                const operatorSymbols = {
                    'add': '+',
                    'subtract': '−',
                    'multiply': '×',
                    'divide': '÷',
                    'percent': '%'
                };

                this.updateHistory(`${this.previousInput} ${operatorSymbols[nextOperator]}`);
                this.updateOperatorButtons(nextOperator);
            }

            calculate() {
                const inputValue = parseFloat(this.currentInput);

                if (this.previousInput !== '' && this.operator) {
                    const currentValue = this.previousInput || 0;
                    const newValue = this.performCalculation(this.operator, currentValue, inputValue);

                    const operatorSymbols = {
                        'add': '+',
                        'subtract': '−',
                        'multiply': '×',
                        'divide': '÷',
                        'percent': '%'
                    };

                    this.lastOperation = `${currentValue} ${operatorSymbols[this.operator]} ${inputValue} =`;
                    this.updateHistory(this.lastOperation);

                    this.currentInput = String(newValue);
                    this.previousInput = '';
                    this.operator = null;
                    this.waitingForOperand = true;

                    this.updateDisplay();
                    this.updateOperatorButtons(null);
                }
            }

            performCalculation(operator, firstOperand, secondOperand) {
                let result;

                switch (operator) {
                    case 'add':
                        result = firstOperand + secondOperand;
                        break;
                    case 'subtract':
                        result = firstOperand - secondOperand;
                        break;
                    case 'multiply':
                        result = firstOperand * secondOperand;
                        break;
                    case 'divide':
                        if (secondOperand === 0) {
                            this.showError(); // Error handling for division by zero
                            return 0;  // Return 0 after the error to prevent further calculations
                        }
                        result = firstOperand / secondOperand;
                        break;
                    case 'percent':
                        result = firstOperand * (secondOperand / 100);
                        break;
                    default:
                        return secondOperand;
                }

                return Math.round((result + Number.EPSILON) * 100000000) / 100000000;  // Handling precision
            }


            updateDisplay() {
                let displayValue = this.currentInput;

                if (Math.abs(parseFloat(displayValue)) >= 1000000000) {
                    displayValue = parseFloat(displayValue).toExponential(6);
                } else if (displayValue.length > 12) {
                    displayValue = parseFloat(displayValue).toPrecision(12);
                }

                this.display.value = displayValue;
                this.adjustDisplayFontSize();
            }

            updateHistory(text) {
                this.history.textContent = text;
            }

            updateOperatorButtons(activeOperator) {
                document.querySelectorAll('.btn-operator').forEach(btn => {
                    btn.classList.remove('active');
                });

                if (activeOperator) {
                    const activeBtn = document.querySelector(`[data-action="${activeOperator}"]`);
                    if (activeBtn) {
                        activeBtn.classList.add('active');
                    }
                }
            }

            adjustDisplayFontSize() {
                const length = this.display.value.length;
                let fontSize = '2.5rem';

                if (length > 8) {
                    fontSize = '2rem';
                } else if (length > 12) {
                    fontSize = '1.5rem';
                }

                this.display.style.fontSize = fontSize;
            }

            showError() {
                this.display.classList.add('error');
                this.display.value = 'Error';

                setTimeout(() => {
                    this.display.classList.remove('error');
                    this.clear();
                }, 1500);
            }

            updateMemoryIndicator() {
                if (this.memory !== 0) {
                    this.memoryIndicator.classList.add('active');
                } else {
                    this.memoryIndicator.classList.remove('active');
                }
            }

            memoryStore() {
                this.memory = parseFloat(this.currentInput);
                this.updateMemoryIndicator();
            }

            memoryRecall() {
                this.currentInput = String(this.memory);
                this.updateDisplay();
            }

            memoryClear() {
                this.memory = 0;
                this.updateMemoryIndicator();
            }
        }

        // Initialize calculator when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            new Calculator();
        });