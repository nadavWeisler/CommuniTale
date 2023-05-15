import openai
from Exceptions import *


class GPTLogic:
    def __init__(self, API_KEY, model):
        openai.organization = "org-skb20jFo5HaLMpp59vTNxFu9"
        openai.api_key = API_KEY
        self.model = model
        pass

    def getBool(self, prompt) -> bool:
        completion = openai.ChatCompletion.create(
            model=self.model,
            messages=[
                {"role":"system", "content": "You can respond only with \"True\", \"False\" or \"Non-Applicable\"."},
                {"role":"user", "content":prompt}
            ]
        )
        response = completion.choices[0].message["content"]
        if "True" in response:
            return True
        elif "False" in response:
            return False
        else:
            print("Raw response: ",response)
            raise NonApplicableException("Failure to parse response into boolean")

    def getInt(self, prompt) -> int:
        pass

    def getFloat(self, prompt) -> float:
        pass

    def getString(self, prompt:str, role="user") -> str:
        completion = openai.ChatCompletion.create(
            model = self.model,
            messages = [
                {"role":role, "content":prompt}
            ]
        )
        return completion.choices[0].message["content"]

    def getList(self, prompt) -> list:
        pass
