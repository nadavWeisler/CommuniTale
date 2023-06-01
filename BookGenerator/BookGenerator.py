from TextGenerator import TextGenerator
from PromptGenerator import PromptGenerator
from ImageGenerator import ImageGenerator
from Book import Book

class BookGenerator:
    def __init__(self):
        self.stories = []
        self.imagePrompts = []
        self.images = []
        pass

    def getBook(self, textPrompt: str, numPages=5):
        """
        main entry point for BookGenerator. will get a string with a GPT prompt for a story, should not return anything
        :param numPages:
        :param textPrompt:
        :return:
        """
        self.getBookAssets(numPages, textPrompt)
        
        return self.generateBook()

    def getBookAssets(self, numPages, textPrompt):
        self.stories = [TextGenerator().getStoryFromPrompt(textPrompt) for _ in range(numPages)]
        self.imagePrompts = [PromptGenerator().getImagePromptFromStory(story) for story in self.stories]
        self.images = [ImageGenerator().getImageFromPrompt(imagePrompt) for imagePrompt in self.imagePrompts]

    def generateBook(self):
        book = Book(self.stories, self.images)
        return book


if __name__ == "__main__":
    print("Hello, World!")
