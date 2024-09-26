""""
Description: A class to represent Rectangle objects.
Author: {Student Name}
Date: {Date}
"""

from activity_2.shape.shape import Shape


class Rectangle(Shape):
    """
    A Rectangle class that inherits from Shape, representing a rectangle
    with a length, width, and color.
    """
    def __init__(self, color, length, width):
        """
        Initialize the rectangle with its color, length, and width.

        :param color: The color of the rectangle.
        :param length: The length of the rectangle.
        :param width: The width of the rectangle.
        :raises ValueError: If length or width is not numeric.
        """
        super().__init__(color)
        if not isinstance(length, int):
            raise ValueError("Length must be numeric.")
        if not isinstance(width, int):
            raise ValueError("Width must be numeric.")

        self._length = length
        self._width = width

    def __str__(self) -> str:
        """Return a string representation of the rectangle's dimensions."""
        parts = [
            super().__str__(),
            f"This rectangle has four sides with lengths of {self._length}, "
            f"{self._width}, {self._length}, and {self._width} centimeters."
        ]
        return "\n".join(parts)

    def calculate_area(self):
        """Calculate the area of the rectangle."""
        area = self._length * self._width
        return area

    def calculate_perimeter(self):
        """Calculate the perimeter of the rectangle."""
        perimeter = 2 * (self._length + self._width)
        return perimeter
