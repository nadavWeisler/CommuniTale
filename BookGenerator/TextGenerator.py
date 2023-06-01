import os
from typing import List, Dict

import openai


class TextGenerator:
    def __init__(self):
        openai.api_key = os.getenv('GPT_API_KEY')

    def getStoriesFromPrompt(self, messages: List[Dict[str, str]], n=1) -> List[str]:
        """
        Main entry point for TextGenerator, will get a string with a prompt and should return a story that fits the prompt
        :param n:
        :param messages:
        :return:
        """
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                         {"role": "system", "content": "you are a childerns book writer"}
                     ] + messages,
            temperature=0.5,
            max_tokens=1000,
            n=n
        )
        return response


if __name__ == "__main__":
    generator = TextGenerator()
    response_dict = generator.getStoriesFromPrompt([{"role": "user", "content": "tell me a story about a dog"}])
    choices_dict = response_dict["choices"][0]
    story = choices_dict["message"]["content"]
    print(story)
