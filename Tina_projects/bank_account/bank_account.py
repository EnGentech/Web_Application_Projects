class BankAccount:
    """
    A class to represent a bank account.
    """
    def __init__(self, account_number, client_number, balance):
        self.account_number = account_number
        self.client_number = client_number
        self.balance = balance

    @property
    def account_number(self):
        return self.__account_number

    @account_number.setter
    def account_number(self, value):
        if not isinstance(value, int):
            raise ValueError("Account number must be an integer.")
        self.__account_number = value

    @property
    def client_number(self):
        return self.__client_number

    @client_number.setter
    def client_number(self, value):
        if not isinstance(value, int):
            raise ValueError("Client number must be an integer.")
        self.__client_number = value

    @property
    def balance(self):
        return self.__balance

    @balance.setter
    def balance(self, value):
        try:
            self.__balance = float(value)
        except ValueError:
            self.__balance = 0.0

    def update_balance(self, amount):
        try:
            self.__balance += float(amount)
        except ValueError:
            pass

    def deposit(self, amount):
        if not isinstance(amount, (int, float)):
            raise ValueError(f"Deposit amount: {amount} must be numeric.")
        if amount <= 0:
            raise ValueError(f"Deposit amount: {amount} must be positive.")
        self.update_balance(amount)

    def withdraw(self, amount):
        if not isinstance(amount, (int, float)):
            raise ValueError(f"Withdraw amount: {amount} must be numeric.")
        if amount <= 0:
            raise ValueError(f"Withdrawal amount: {amount} must be positive.")
        if amount > self.__balance:
            raise ValueError(f"Withdrawal amount: {amount} must not exceed the account balance: {self.__balance}")
        self.update_balance(-amount)

    def __str__(self):
        return f"Account Number: {self.__account_number} Balance: ${self.__balance:,.2f}\n"
