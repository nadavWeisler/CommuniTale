import openai
from gpt_logic.Exceptions import *


class GPTLogic:
    def __init__(self, API_KEY, model="gpt-3.5-turbo"):
        openai.api_key = API_KEY
        self.model = model

    def getBool(self, prompt, n=1) -> bool:
        """
        gets a boolean from a GPT prompt, the n parameter will ask for several responses from GPT and return the bool
        that returned from the most responses, this results in more accurate responses.
        :param prompt:
        :param n:
        :return:
        """
        completion = openai.ChatCompletion.create(
            model=self.model,
            messages=[
                {"role": "system", "content": "You can respond only with \"True\", \"False\" or \"Non-Applicable\"."},
                {"role": "user", "content": prompt}
            ],
            n=n
        )
        results = {
            "true": 0,
            "false": 0,
            "invalid": 0
        }

        for choice in completion.choices:
            if "True" in choice.message["content"]:
                results["true"] += 1
            elif "False" in choice.message["content"]:
                results["false"] += 1
            else:
                results["invalid"] += 1

        result = max(*results.items(), key=lambda x: x[1])[0]
        if result == "true":
            return True
        elif result == "false":
            return False
        else:
            print("Raw response: ", results)
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
