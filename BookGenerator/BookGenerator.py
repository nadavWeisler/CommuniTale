from BookGenerator.TextGenerator import TextGenerator
from BookGenerator.PromptGenerator import PromptGenerator
from BookGenerator.ImageGenerator import ImageGenerator
from BookGenerator.Book import Book


class BookGenerator:
    def __init__(self):
        self.storyPrompt = ""
        self.stories = []
        self.imagePrompts = []
        self.images = []

    def getBook(self, request: dict, numPages=5):
        """
        main entry point for BookGenerator. will get a string with a GPT prompt for a story, should not return anything
        :param request:
        :param numPages:
        :return:
        """
        self.getBookAssets(numPages, request)

        return self.generateBook()

    def getBookAssets(self, numPages, request):
        textPrompt = PromptGenerator().getTextPromptFromRequest(request)
        self.stories = TextGenerator().getStoryFromPrompt(textPrompt, numPages)
        self.imagePrompts = [PromptGenerator().getImagePromptFromStory(story) for story in self.stories]
        self.images = [ImageGenerator().getImageFromPrompt(imagePrompt) for imagePrompt in self.imagePrompts]

    def generateBook(self):
        book = Book(self.stories, self.images, [""]*len(self.stories)).generate()
        return book


if __name__ == "__main__":
    print("Hello, World!")
