""""
Description: A class to represent generic Shape objects.
Author: {Student Name}
Date: {Date}
"""

from abc import ABC, abstractmethod


class Shape(ABC):
    """
    Abstract base class representing a geometric shape.

    The Shape class provides a blueprint for creating shape objects,
    including a color attribute and methods to calculate the
    area and perimeter.
    Since this is an abstract class, it cannot be instantiated
    directly, and its subclasses must implement the
    calculate_area and calculate_perimeter methods.

    Attributes:
        _color (str): The color of the shape, stored as a protected attribute.

    Methods:
        __init__(color): Initializes the color attribute of the shape.
        __str__(): Returns a string representation of the shape's color.
        calculate_area(): Abstract method to calculate the area of the shape.
        calculate_perimeter(): Abstract method to
        calculate the perimeter of the shape.
    """

    def __init__(self, color):
        """
        Initialize the Shape class with a color attribute.

        :param color: The color of the shape (cannot be blank)
        :raises ValueError: If the color is blank or only contains whitespace.
        """
        if len(color.strip()) == 0:
            raise ValueError("Color cannot be blank.")
        self._color = color.strip()

    def __str__(self):
        """Return a string representation of the shape's color."""
        return f"The shape color is {self._color}."

    @abstractmethod
    def calculate_area(self):
        """Calculate the area of the shape."""
        pass

    @abstractmethod
    def calculate_perimeter(self):
        """Calculate the perimeter of the shape."""
        pass
