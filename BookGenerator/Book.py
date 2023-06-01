import os
from typing import List
import requests

from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.platypus import Paragraph, SimpleDocTemplate, Image, PageBreak


class Book:
    def __init__(
        self, text_pages: List[str], images_url_lst: List[str], title: List[str]
    ):
        self.text_pages = text_pages
        self.images_lst = [self.convert_url_to_png(url) for url in images_url_lst]
        self.title = title
        self.image_counter = 0

    def convert_url_to_png(self, url: str) -> str:
        """
        Convert url to png
        :param url: url of image
        :return: path to png
        """
        image_url = requests.get(url, timeout=5)
        with open(f"{self.image_counter}image.png", "wb") as f:
            f.write(image_url.content)
        self.image_counter += 1

    def generate(self):
        doc = SimpleDocTemplate("output.pdf", pagesize=letter)
        content = []
        for ind, text in enumerate(self.text_pages):
            title_style = getSampleStyleSheet()["Title"]
            paragraph_style = getSampleStyleSheet()["BodyText"]

            page_title = Paragraph(self.title[ind], title_style)
            content.append(page_title)

            paragraph_text = text
            paragraph = Paragraph(paragraph_text, paragraph_style)
            content.append(paragraph)

            content.append(PageBreak())

            image = Image(self.images_lst[ind])
            image.drawHeight = 500
            image.drawWidth = 500
            content.append(image)

            content.append(PageBreak())

        doc.build(content)


if __name__ == "__main__":
    texts = ["Story about a dog", "Stoty about a cat", "Stoty about a horse"]
    images = ["../Pics/dog.png", "../Pics/cat.png", "../Pics/horse.png"]
    titles = ["Dog", "Cat", "Horse"]
    book = Book(texts, images, titles)
    book.generate()
    os.startfile("output.pdf")
