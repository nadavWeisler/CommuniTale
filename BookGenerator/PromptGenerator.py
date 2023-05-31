class PromptGenerator:
    def __init__(self):
        pass

    def createBook(self, request: dict):
        """
        main entry point of the book generation process.
        Should generate a prompt for the text of the book, and call GetBook from book generator with the prompt
        :param request:
        :return:
        """
        pass

    def getImagePromptFromStory(self, story: str) -> str:
        """
        BookGenerator will call this method with the text of a story, this should generate a prompt for an Image that
        fits the story.
        :param story:
        :return:
        """
        pass
if __name__ == "__main__":
    print("Hello, World!")
