"""
Description: Unit tests for the BankAccount class.
Author: ACE Faculty
Modified by: {Student Name}
Date: {Date}
Usage: To execute all tests in the terminal execute 
the following command:
    python -m unittest tests/test_bank_account.py
"""

import unittest
from bank_account.bank_account import BankAccount


class TestBankAccount(unittest.TestCase):
    def setUp(self):
        """Set up a BankAccount instance for testing."""
        self.account = BankAccount(12345, 67890, 1000.00)

    def test_init_attributes_set_to_input_values(self):
        """Test that attributes are set to input values."""
        self.assertEqual(self.account.account_number, 12345)
        self.assertEqual(self.account.client_number, 67890)
        self.assertEqual(self.account.balance, 1000.00)

    def test_init_balance_set_to_zero_when_non_numeric_balance(self):
        """Test balance is set to 0 when non-numeric balance is provided."""
        account = BankAccount(12345, 67890, "non-numeric")
        self.assertEqual(account.balance, 0.0)

    def test_init_value_error_when_non_numeric_account_number(self):
        """Test ValueError is raised for non-numeric account number."""
        with self.assertRaises(ValueError):
            BankAccount("non-numeric", 67890, 1000.00)

    def test_init_value_error_when_non_numeric_client_number(self):
        """Test ValueError is raised for non-numeric client number."""
        with self.assertRaises(ValueError):
            BankAccount(12345, "non-numeric", 1000.00)

    def test_account_number_getter(self):
        """Test getter for account_number."""
        self.assertEqual(self.account.account_number, 12345)

    def test_client_number_getter(self):
        """Test getter for client_number."""
        self.assertEqual(self.account.client_number, 67890)

    def test_balance_getter(self):
        """Test getter for balance."""
        self.assertEqual(self.account.balance, 1000.00)

    def test_update_balance_positive_amount(self):
        """Test update_balance with a positive amount."""
        self.account.update_balance(500.00)
        self.assertEqual(self.account.balance, 1500.00)

    def test_update_balance_negative_amount(self):
        """Test update_balance with a negative amount."""
        self.account.update_balance(-300.00)
        self.assertEqual(self.account.balance, 700.00)

    def test_update_balance_non_numeric_amount(self):
        """Test update_balance with a non-numeric amount."""
        self.account.update_balance("non-numeric")
        self.assertEqual(self.account.balance, 1000.00)

    def test_deposit_valid_amount(self):
        """Test deposit with a valid amount."""
        self.account.deposit(200.00)
        self.assertEqual(self.account.balance, 1200.00)

    def test_deposit_negative_amount(self):
        """Test deposit with a negative amount."""
        with self.assertRaises(ValueError):
            self.account.deposit(-100.00)

    def test_withdraw_valid_amount(self):
        """Test withdraw with a valid amount."""
        self.account.withdraw(150.00)
        self.assertEqual(self.account.balance, 850.00)

    def test_withdraw_negative_amount(self):
        """Test withdraw with a negative amount."""
        with self.assertRaises(ValueError):
            self.account.withdraw(-50.00)

    def test_withdraw_amount_exceeds_balance(self):
        """Test withdraw when amount exceeds balance."""
        with self.assertRaises(ValueError):
            self.account.withdraw(1200.00)

    def test_str_method(self):
        """Test __str__ method."""
        self.assertEqual(str(self.account), "Account Number: 12345 Balance: $1,000.00\n")


if __name__ == "__main__":
    unittest.main()
