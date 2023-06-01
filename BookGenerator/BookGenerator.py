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
        default_request = {
            "age": "4",
            "gender": "girl",
            "theme": "Animals",
            "issue": "pronouncing the sound of the letter 'r'",
        }
        try:
            textPrompts = PromptGenerator().getTextPromptFromRequest(request)
        except KeyError:
            print("Request did not include all required keys")
            print("falling back to default request")
            textPrompts = PromptGenerator().getTextPromptFromRequest(default_request)

        self.stories = TextGenerator().getStoriesFromPrompt(messages=textPrompts, n=numPages)
        self.imagePrompts = [PromptGenerator().getImagePromptFromStory(story['story']) for story in self.stories]
        self.images = [ImageGenerator().getImageFromPrompt(imagePrompt) for imagePrompt in self.imagePrompts]

    def generateBook(self):
        book = Book(self.stories, self.images)
        book.generate()
        return book


if __name__ == "__main__":
    print("Hello, World!")
