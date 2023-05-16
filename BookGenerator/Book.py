from typing import List

from BookGenerator.BookImage import BookImage
from BookGenerator.PageText import PageText
from BookGenerator.BookTheme import BookTheme


class Book:
    def __init__(self):
        self.pageTexts: List[PageText] = []
        self.images: List[BookImage] = []


if __name__ == "__main__":
    print("Hello, World!")
