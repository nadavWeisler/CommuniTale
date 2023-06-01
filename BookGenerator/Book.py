import os
from typing import List, Dict
import requests

import random

from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.platypus import Paragraph, SimpleDocTemplate, Image, PageBreak


class Book:
    def __init__(self, text_pages: List[Dict[str, str]], images_url_lst: List[str]):
        self.text_pages = text_pages
        self.images_lst = [self.convert_url_to_png(url) for url in images_url_lst]

    def convert_url_to_png(self, url: str) -> str:
        """
        Convert url of an image to png file
        """
        random_id = random.randint(0, 10000)
        image_url = requests.get(url, timeout=5)
        with open(f"{random_id}image.png", "wb") as f:
            f.write(image_url.content)
        return f"{random_id}image.png"

    def generate(self):
        """
        Generate pdf file with text and images
        """
        doc = SimpleDocTemplate("output.pdf", pagesize=letter)
        content = []
        for ind, text in enumerate(self.text_pages):
            title_style = getSampleStyleSheet()["Title"]
            paragraph_style = getSampleStyleSheet()["BodyText"]

            page_title = Paragraph(text["title"], title_style)
            content.append(page_title)

            paragraph_text = text["story"]
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
    texts = [
        {"title": "Dog", "story": "Story about a dog"},
        {"title": "Cat", "story": "Stoty about a cat"},
        {"title": "Horse", "story": "Stoty about a horse"},
    ]
    images = [
        "https://www.freepnglogos.com/uploads/dog-png/bow-wow-gourmet-dog-treats-are-healthy-natural-low-4.png",
        "https://e7.pngegg.com/pngimages/549/292/png-clipart-cat-food-kitten-dog-adorable-cat-mammal-cat-like-mammal-thumbnail.png",
        "https://parspng.com/wp-content/uploads/2022/08/horsepng.parspng.com-2.png",
    ]
    book = Book(texts, images)
    book.generate()
    os.startfile("output.pdf")
