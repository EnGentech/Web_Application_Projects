""""
Description: A class to represent Triangle objects.
Author: {Student Name}
Date: {Date}
"""

import math
from activity_2.shape.shape import Shape


class Triangle(Shape):
    """
    A Triangle class that inherits from Shape, representing
    a triangle with three sides and a color.
    """
    def __init__(self, color, side_1, side_2, side_3):
        """
        Initialize the triangle with color and side lengths.

        :param color: The color of the triangle.
        :param side_1: Length of the first side.
        :param side_2: Length of the second side.
        :param side_3: Length of the third side.
        :raises ValueError: If any side is not numeric.
        """
        super().__init__(color)
        if not isinstance(side_1, int):
            raise ValueError("Side 1 must be numeric.")
        if not isinstance(side_2, int):
            raise ValueError("Side 2 must be numeric.")
        if not isinstance(side_3, int):
            raise ValueError("Side 3 must be numeric.")

        self._side_1 = side_1
        self._side_2 = side_2
        self._side_3 = side_3

    def __str__(self) -> str:
        """Return a string representation of the triangle's sides."""
        parts = [
              super().__str__(),
              f"This triangle has three sides with lengths of {self._side_1}, "
              f"{self._side_2}, and {self._side_3} centimeters."
        ]
        return "\n".join(parts)
        
    def calculate_area(self):
        """Calculate the area of the triangle using Heron's formula."""
        semi_perimeter = (self._side_1 + self._side_2 + self._side_3) / 2
        area = math.sqrt(semi_perimeter *
                         (semi_perimeter - self._side_1) *
                         (semi_perimeter - self._side_2) *
                         (semi_perimeter - self._side_3))
        return area

    def calculate_perimeter(self):
        """Calculate the perimeter of the triangle."""
        perimeter = self._side_1 + self._side_2 + self._side_3
        return perimeter
