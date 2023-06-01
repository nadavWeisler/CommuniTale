class PromptGenerator:
    def __init__(self):
        pass

    def getTextPromptFromRequest(self, request) -> str:
        """
        Gets a request with parameters for a book, returns a prompt for gpt that will create a story based on
        the parameters.
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
