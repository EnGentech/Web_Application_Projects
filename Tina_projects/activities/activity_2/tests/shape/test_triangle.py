"""
Description: Unit tests for the Book class.
Author: {Student Name}
Date: {Date}
Usage: To execute all tests in the terminal execute 
the following command:
    python -m unittest tests/shape/test_triangle.py
"""

import unittest
from activity_2.shape.triangle import Triangle

class TestTriangle(unittest.TestCase):
    
    def test_init_attribute_set_to_input_values(self):
        """Test if attributes are set to input values."""
        triangle = Triangle("red", 3, 4, 5)
        self.assertEqual(triangle._side_1, 3)
        self.assertEqual(triangle._side_2, 4)
        self.assertEqual(triangle._side_3, 5)
        self.assertEqual(triangle._color, "red")

    def test_init_exception_raised_when_color_is_blank(self):
        """Test if ValueError is raised when color is blank."""
        with self.assertRaises(ValueError) as context:
            Triangle("", 3, 4, 5)
        self.assertEqual(str(context.exception), "Color cannot be blank.")

    def test_init_exception_raised_when_side_1_is_not_integer(self):
        """Test if ValueError is raised when side_1 is not an integer."""
        with self.assertRaises(ValueError) as context:
            Triangle("blue", "three", 4, 5)
        self.assertEqual(str(context.exception), "Side 1 must be numeric.")

    def test_init_exception_raised_when_side_2_is_not_integer(self):
        """Test if ValueError is raised when side_2 is not an integer."""
        with self.assertRaises(ValueError) as context:
            Triangle("green", 3, "four", 5)
        self.assertEqual(str(context.exception), "Side 2 must be numeric.")

    def test_init_exception_raised_when_side_3_is_not_integer(self):
        """Test if ValueError is raised when side_3 is not an integer."""
        with self.assertRaises(ValueError) as context:
            Triangle("yellow", 3, 4, "five")
        self.assertEqual(str(context.exception), "Side 3 must be numeric.")

    def test_str_returns_string_formatted_appropriately(self):
        """Test the string representation of the triangle."""
        triangle = Triangle("red", 3, 4, 5)
        self.assertEqual(str(triangle), "The shape color is red.\nThis triangle has three sides with lengths of 3, 4, and 5 centimeters.")

    def test_calculate_area_returns_correct_calculated_value(self):
        """Test if the calculate_area method returns the correct area."""
        triangle = Triangle("blue", 3, 4, 5)
        self.assertAlmostEqual(triangle.calculate_area(), 6.0)

    def test_calculate_perimeter_returns_correct_calculated_value(self):
        """Test if the calculate_perimeter method returns the correct perimeter."""
        triangle = Triangle("green", 3, 4, 5)
        self.assertEqual(triangle.calculate_perimeter(), 12)

if __name__ == "__main__":
    unittest.main()

