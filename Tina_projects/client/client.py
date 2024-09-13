from email_validator import validate_email, EmailNotValidError

class Client:
    """
    This class will handle the client side of the application.
    """

    def __init__(self, client_number, first_name, last_name, email_address):
        self.client_number = client_number
        self.first_name = first_name
        self.last_name = last_name
        self.email_address = email_address

    @property
    def client_number(self):
        return self.__client_number

    @client_number.setter
    def client_number(self, value):
        if not isinstance(value, int):
            raise ValueError("Client number must be an integer.")
        self.__client_number = value

    @property
    def first_name(self):
        return self.__first_name

    @first_name.setter
    def first_name(self, value):
        stripped_value = value.strip()
        if not stripped_value:
            raise ValueError("First name cannot be blank.")
        self.__first_name = stripped_value
    
    @property
    def last_name(self):
        return self.__last_name

    @last_name.setter
    def last_name(self, value):
        stripped_value = value.strip()
        if not stripped_value:
            raise ValueError("Last name cannot be blank.")
        self.__last_name = stripped_value

    @property
    def email_address(self):
        return self.__email_address

    @email_address.setter
    def email_address(self, value):
        try:
            valid_email = validate_email(value, check_deliverability=False).email
            self.__email_address = valid_email
        except EmailNotValidError as e:
            raise ValueError(f"Invalid email address: {value}") from e

    def __str__(self):
        return f"{self.__last_name}, {self.__first_name} [{self.__client_number}] - {self.__email_address}\n"
