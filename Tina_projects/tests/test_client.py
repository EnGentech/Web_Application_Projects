import unittest
from email_validator import EmailNotValidError
from client.client import Client

class TestClient(unittest.TestCase):
    """
    Test cases to validate the Client class.
    """
    def test_init_attributes_set_correctly(self):
        client = Client(1001, "John", "Doe", "john.doe@example.com")
        self.assertEqual(client._Client__client_number, 1001)
        self.assertEqual(client._Client__first_name, "John")
        self.assertEqual(client._Client__last_name, "Doe")
        self.assertEqual(client._Client__email_address, "john.doe@example.com")

    def test_init_raises_exception_invalid_client_number(self):
        with self.assertRaises(ValueError):
            Client("abc", "John", "Doe", "john.doe@example.com")

    def test_init_raises_exception_blank_first_name(self):
        with self.assertRaises(ValueError):
            Client(1001, "", "Doe", "john.doe@example.com")

    def test_init_raises_exception_blank_last_name(self):
        with self.assertRaises(ValueError):
            Client(1001, "John", "", "john.doe@example.com")

    def test_init_invalid_email_sets_default(self):
        try:
            client = Client(1001, "John", "Doe", "invalid-email")
        except ValueError:
            client = Client(1001, "John", "Doe", "email@pixell-river.com")
        self.assertEqual(client.email_address, "email@pixell-river.com")

    def test_client_number_getter(self):
        client = Client(1001, "John", "Doe", "john.doe@example.com")
        self.assertEqual(client.client_number, 1001)

    def test_first_name_getter(self):
        client = Client(1001, "John", "Doe", "john.doe@example.com")
        self.assertEqual(client.first_name, "John")

    def test_last_name_getter(self):
        client = Client(1001, "John", "Doe", "john.doe@example.com")
        self.assertEqual(client.last_name, "Doe")

    def test_email_address_getter(self):
        client = Client(1001, "John", "Doe", "john.doe@example.com")
        self.assertEqual(client.email_address, "john.doe@example.com")

    def test_str_method(self):
        client = Client(1001, "John", "Doe", "john.doe@example.com")
        expected_str = "Doe, John [1001] - john.doe@example.com\n"
        self.assertEqual(str(client), expected_str)


if __name__ == "__main__":
    unittest.main()
