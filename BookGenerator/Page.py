from BookGenerator.BookImage import BookImage
from BookGenerator.PageText import PageText


class Page:
    def __init__(self, text: PageText, image: BookImage):
        self.text:PageText = text
        self.image:BookImage = image


if __name__ == "__main__":
    print("Hello, World!")
