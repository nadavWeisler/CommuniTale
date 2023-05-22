import openai
from Exceptions import *


class GPTLogic:
    def __init__(self, API_KEY, model="gpt-3.5-turbo"):
        openai.organization = "org-skb20jFo5HaLMpp59vTNxFu9"
        openai.api_key = API_KEY
        self.model = model

    def getBool(self, prompt) -> bool:
        completion = openai.ChatCompletion.create(
            model=self.model,
            messages=[
                {"role": "system", "content": "You can respond only with \"True\", \"False\" or \"Non-Applicable\"."},
                {"role": "user", "content": prompt}
            ]
        )
        response = completion.choices[0].message["content"]
        if "True" in response:
            return True
        elif "False" in response:
            return False
        else:
            print("Raw response: ", response)
            raise NonApplicableException("Failure to parse response into boolean")

    def getInt(self, prompt) -> int:
        # TODO: add tests
        completion = openai.ChatCompletion.create(
            model=self.model,
            messages=[
                {"role": "system",
                 "content": "Please respond only with an integer in digits, if the result is a floating point, please truncate it. if you cannot meaningfully respond with an integer, please respond with \"Non-Applicable\"."},
                {"role": "user", "content": prompt}
            ]
        )
        response = completion.choices[0].message["content"]
        if "Non-Applicable" in response:
            print("Raw response: ", response)
            raise NonApplicableException("Failure to parse response into an integer")
        else:
            return int(response)

    def getFloat(self, prompt) -> float:
        # TODO: add tests
        completion = openai.ChatCompletion.create(
            model=self.model,
            messages=[
                {"role": "system",
                 "content": "Please respond only with a floating point number using digits. if you cannot meaningfully respond with an integer, please respond with \"Non-Applicable\"."},
                {"role": "user", "content": prompt}
            ]
        )
        response = completion.choices[0].message["content"]
        if "Non-Applicable" in response:
            print("Raw response: ", response)
            raise NonApplicableException("Failure to parse response into an integer")
        else:
            return float(response)

    def getString(self, prompt: str, role="user") -> str:
        completion = openai.ChatCompletion.create(
            model=self.model,
            messages=[
                {"role": role, "content": prompt}
            ]
        )
        return completion.choices[0].message["content"]

    def getList(self, prompt) -> list:
        # TODO: add tests
        completion = openai.ChatCompletion.create(
            model=self.model,
            messages=[
                {"role": "system",
                 "content": "Please respond with a list of strings,"
                            "the strings should be separated only by a single comma,"
                            "Please wrap the list in square brackets."
                            "if you cannot meaningfully respond with a list,"
                            "please respond with \"Non-Applicable\" without wrapping the response in brackets."},
                {"role": "user", "content": prompt}
            ]
        )
        response = completion.choices[0].message["content"]
        if response[0] == "[" and response[-1] == "]":
            return response[1:-1].split(",")
        else:
            print("Raw response: ", response)
            raise NonApplicableException("Failure to parse response into an integer")

