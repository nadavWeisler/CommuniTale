import os
from typing import List, Dict
import requests

from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.platypus import Paragraph, SimpleDocTemplate, Image, PageBreak


class Book:
    def __init__(self, text_pages: List[Dict[str, str]], images_url_lst: List[str]):
        self.text_pages = text_pages
        self.image_urls = images_url_lst
        self.images_lst = [
            self.convert_url_to_png(url, ind) for ind, url in enumerate(images_url_lst)
        ]

    def convert_url_to_png(self, url: str, num_of_img: int) -> str:
        """
        Convert url of an image to png file
        """
        print(f"Received URL for image number: {num_of_img}")
        print("Converting to PNG")
        imageLocation = f"tmpAssets/Images/{num_of_img}image.png"
        image_url = requests.get(url, timeout=5)
        with open(imageLocation, "wb") as f:
            f.write(image_url.content)
        return imageLocation

    def generate(self):
        """
        Generate pdf file with text and images
        """
        print("Generating PDF of book")
        doc = SimpleDocTemplate("tmpAssets/output.pdf", pagesize=letter)
        content = []
        for ind, text in enumerate(self.text_pages):
            image, page_title, paragraph = self.buildContent(ind, text)
            content.append(page_title)
            content.append(paragraph)
            content.append(PageBreak())
            content.append(image)
            content.append(PageBreak())

        doc.build(content)

    def buildContent(self, ind, text):
        page_title, paragraph = self.buildText(text)
        image = self.buildImage(ind)
        return image, page_title, paragraph

    def buildImage(self, ind):
        image = Image(self.images_lst[ind])
        image.drawHeight = 500
        image.drawWidth = 500
        return image

    def buildText(self, text):
        font_name = "Helvetica"
        title_style = getSampleStyleSheet()["Title"]
        title_style.fontSize = 35
        title_style.fontName = font_name
        #
        paragraph_style = getSampleStyleSheet()["BodyText"]
        paragraph_style.fontSize = 25
        paragraph_style.leading = 22
        paragraph_style.fontName = font_name
        page_title = Paragraph(
            text["title"] + "<br/><br/><br/>", title_style
        )
        paragraph_text = text["story"].replace(".", ".<br/><br/><br/>")
        paragraph = Paragraph(paragraph_text, paragraph_style)
        return page_title, paragraph

    def to_dict(self):
        print("Converting book data to dict")
        return {
            "text_pages": self.text_pages,
            "image_urls": self.image_urls
        }
    def cleanAssets(self):
        print("Deleting image files")
        for imageFile in self.images_lst:
            os.remove(imageFile)


if __name__ == "__main__":
    texts = [
        {
            "title": "Dog",
            "story": "Story about a dog Story about a dog Story about a dog. Story about a dog Story about a dog Story about a dog. Story about a dog Story about a dog Story about a dog. Story about a dog v Story about a dog. Story about a dog Story about a dog. Story about a dog Story about a dog",
        },
        {
            "title": "Cat",
            "story": "Story about a cat Story about a cat Story about a cat Story about a cat Story about a cat",
        },
        {
            "title": "Horse",
            "story": "Story about a horse Story about a horse Story about a horse Story about a horse ",
        },
    ]
    images = [
        "https://www.freepnglogos.com/uploads/dog-png/bow-wow-gourmet-dog-treats-are-healthy-natural-low-4.png",
        "https://e7.pngegg.com/pngimages/549/292/png-clipart-cat-food-kitten-dog-adorable-cat-mammal-cat-like-mammal-thumbnail.png",
        "https://parspng.com/wp-content/uploads/2022/08/horsepng.parspng.com-2.png",
    ]
    book = Book(texts, images)
    book.generate()