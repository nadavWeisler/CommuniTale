import os
from typing import List, Dict

import openai

from BookGenerator.PromptGenerator import PromptGenerator


class TextGenerator:
    
    def __init__(self):
        openai.api_key = os.getenv("GPT_API_KEY")

    def getStoriesFromPrompt(self, messages: List[Dict[str, str]], n=1) -> List[Dict[str,str]]:
        """
        Main entry point for TextGenerator, will get a string with a prompt and should return a story that fits the prompt
        :param n:
        :param messages:
        :return:
        """
        response = openai.ChatCompletion.create(
            model="gpt-4-0314",  # model types: gpt-3.5-turbo, gpt-4-0314, gpt-4, gpt-3.5-turbo-0301
            messages=[{"role": "system", "content": "you are a childerns book writer"}]
            + messages,
            temperature=0.5,
            max_tokens=1000,
            n=n,
        )

        story_lst = []
        for i in range(n):
            choices_dict = response["choices"][i]
            story_msg = choices_dict["message"]["content"]
            story_lst.append(story_msg)
        
        story_list_of_dicts = []
        for story in story_lst:
            splited_lst = story.split('"')
            story_dict = {"title": splited_lst[1], "story": " ".join(splited_lst[2:])[2:]}
            story_list_of_dicts.append(story_dict)
        return story_list_of_dicts
    


if __name__ == "__main__":
    prompt_gen = PromptGenerator()
    prompt_dict = prompt_gen.getTextPromptFromRequest()
    text_gen = TextGenerator()
    story_output = text_gen.getStoriesFromPrompt(prompt_dict)
    print(story_output)
