import os

import openai


class TextGenerator:
    def __init__(self):
        openai.api_key = os.getenv('GPT_API_KEY')

    def getStoryFromPrompt(self, prompt: str) -> str:
        """
        Main entry point for TextGenerator, will get a string with a prompt and should return a story that fits the prompt
        :param prompt:
        :return:
        """
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "you are a childerns book writer"},
                {"role": "user", "content": prompt},
            ],
            temperature=0.5,
            max_tokens=1000,
        )
        return response


if __name__ == "__main__":
    generator = TextGenerator()
    response_dict = generator.getStoryFromPrompt("tell me a story about a dog")
    choices_dict = response_dict["choices"][0]
    story = choices_dict["message"]["content"]
    print(story)
