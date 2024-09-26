"""
Description: Unit tests for the Rectangle class.
Author: {Student Name}
Date: {Date}
Usage: To execute all tests in the terminal execute 
the following command:
    python -m unittest tests/shape/rectangle.py
"""

import unittest
from activity_2.shape.rectangle import Rectangle


class TestRectangle(unittest.TestCase):
    """
    Test cases written for Rectangle class implementation
    """
    
    def test_init_attribute_set_to_input_values(self):
        """Test if attributes are set to input values."""
        rectangle = Rectangle("red", 4, 5)
        self.assertEqual(rectangle._length, 4)
        self.assertEqual(rectangle._width, 5)
        self.assertEqual(rectangle._color, "red")

    def test_init_exception_raised_when_color_is_blank(self):
        """Test if ValueError is raised when color is blank."""
        with self.assertRaises(ValueError) as context:
            Rectangle("", 4, 5)
        self.assertEqual(str(context.exception), "Color cannot be blank.")

    def test_init_exception_raised_when_length_is_not_integer(self):
        """Test if ValueError is raised when length is not an integer."""
        with self.assertRaises(ValueError) as context:
            Rectangle("blue", "four", 5)
        self.assertEqual(str(context.exception), "Length must be numeric.")

    def test_init_exception_raised_when_width_is_not_integer(self):
        """Test if ValueError is raised when width is not an integer."""
        with self.assertRaises(ValueError) as context:
            Rectangle("green", 4, "five")
        self.assertEqual(str(context.exception), "Width must be numeric.")

    def test_str_returns_string_formatted_appropriately(self):
        """Test the string representation of the rectangle."""
        rectangle = Rectangle("red", 4, 5)
        self.assertEqual(str(rectangle), "The shape color is red.\nThis rectangle has four sides with lengths of 4, 5, 4, and 5 centimeters.")

    def test_calculate_area_returns_correct_calculated_value(self):
        """Test if the calculate_area method returns the correct area."""
        rectangle = Rectangle("blue", 4, 5)
        self.assertEqual(rectangle.calculate_area(), 20)

    def test_calculate_perimeter_returns_correct_calculated_value(self):
        """Test if the calculate_perimeter method returns the correct perimeter."""
        rectangle = Rectangle("green", 4, 5)
        self.assertEqual(rectangle.calculate_perimeter(), 18)

if __name__ == "__main__":
    unittest.main()
