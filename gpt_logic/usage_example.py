from GPTLogic import GPTLogic
import os

if __name__ == "__main__":
    logic = GPTLogic(os.getenv("GPTKEY"))
    if logic.getBool("Were you developed by OpenAI?"):
        print("GPT was developed by OpenAI!")
    else:
        print("GPT was not developed by OpenAI")

    if logic.getInt("2+2") == 4:
        print("2+2 equals 4")
    else:
        print("2+2 does not equal 4")
