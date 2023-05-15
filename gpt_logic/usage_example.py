from GPTLogic import GPTLogic
import os

if __name__ == "__main__":
    logic = GPTLogic(os.getenv("GPTKEY"))
    if logic.getBool("Were you developed by OpenAI?"):
        print("GPT was developed by OpenAI!")
    else:
        print("GPT was not developed by OpenAI")
