import os

from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import Paragraph, SimpleDocTemplate, Image, PageBreak

class Book:
    def __init__(self, textPages, images, title):
        self.textPages = textPages
        self.images = images
        self.title = title

    def generate(self):
        doc = SimpleDocTemplate("output.pdf", pagesize=letter)
        for ind, text in enumerate(self.textPages):
            content = []

            title_style = getSampleStyleSheet()["Title"]
            paragraph_style = getSampleStyleSheet()["BodyText"]

            page_title = Paragraph(self.title[ind], title_style)
            content.append(page_title)

            paragraph_text = text
            paragraph = Paragraph(paragraph_text, paragraph_style)
            content.append(paragraph)

            content.append(PageBreak())

            image = Image(self.images[ind])
            image.drawHeight = 500
            image.drawWidth = 500
            content.append(image)

        doc.build(content)


if __name__ == "__main__":
    texts = ["Story about a dog", "Stoty about a cat", "Stoty about a horse"]
    images = ["../Pics/dog.png", "../Pics/cat.png", "../Pics/horse.png"]
    titles = ["Dog", "Cat", "Horse"]
    book = Book(texts, images, titles)
    book.generate()
    os.startfile("output.pdf")
