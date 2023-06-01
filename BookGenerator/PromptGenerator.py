from typing import List, Dict
import openai

import os
class PromptGenerator:
    MOCK_REQUEST = {
        "age": "10",
        "gender": "male",
        "setting": "Superheroes",
        "issue": "pronouncing the sound of the letter 's'",
    }
    default_messages = [
        {"role": "system",
         "content": "You are a children speech therapist.You are also an expert in Dalle-2 and prompt engineering."},
        {"role": "user",
         "content": "Tell me what types of problems can be treated by reading stories accompanied with pictures together, and for what ages does this apply"},
        {"role": "assistant", "content": """Reading stories accompanied with pictures can be helpful in treating several speech and language-related problems in children, typically for ages between 2 to 7 years old. However, older children with specific challenges may also benefit from this approach. Some of the problems that can be treated include:

    1. Expressive language difficulties: Through storytelling, children can learn new vocabulary and sentence structure, thus improving their ability to express themselves.

    2. Receptive language difficulties: Listening and following along with a story can help children improve their understanding of words and phrases, enhancing their receptive language skills.

    3. Articulation issues: While reading the story, the therapist can focus on specific sounds or words that the child has difficulty with, allowing for opportunities to practice correct pronunciation.

    4. Phonological awareness: Picture books can be helpful in teaching children about the sound structure of words and developing their skills in identifying and manipulating sounds, which is crucial for reading development.

    5. Auditory processing and memory: Following along with a story can help children practice listening to and remembering information, which is crucial for language development.

    6. Fluency (stuttering): Reading stories can provide opportunities for structured practice for children with fluency disorders to work on their speech pacing, pausing, and intonation."""},
        {"role": "user",
         "content": "Expand on 3, and give me an example accompanied with a short story you can read with a child to help with this problem"},
        {"role": "assistant", "content": """3. Articulation issues: Reading stories together can provide opportunities for the child to practice specific sounds or words that they have difficulty pronouncing. The therapist and child can work on targeted sounds and words by listening to the therapist model proper articulation and by the child mimicking the sound or word. 

    Example: Let's say a child struggles with the "s" sound. Here's a short story that focuses on that sound:

    Title: "Sammy the Silly Seal"

    Once upon a time, there was a silly seal named Sammy. Sammy loved to swim in the sparkling sea. One sunny day, Sammy was splashing and playing with his friend, Sally the seagull. They swam and soared beside the sweet, salty shore.

    Sammy liked to collect seashells and surprise Sally with them. Sally would swoop down and snatch the beautiful shells from Sammy's slippery flipper. Together, they made a stunning seashell collection.

    Sammy and Sally spent many sunny days exploring the seaside, searching for shiny seashells and singing songs. Their laughter and smiles spread joy to all the sea creatures who lived nearby. And everyone agreed, Sammy was the silliest seal they had ever seen!

    """},
        {"role": "user", "content": "create this as a short story that can fit in a small page"},
        {"role": "assistant", "content": """Title: "Silly Sammy Seal"

    Sammy, the silly seal, swam in the sparkling sea.
    He played with Sally Seagull, with shells and so much glee.

    Swishing by the shore, they searched for shiny shells,
    Sammy and Sally smiled, as their collection swelled.

    Together, they sang sweet songs, spreading joy around.
    Sammy, the silliest seal, was a friend they'd always found."""},
        {"role": "user",
         "content": """create a prompt suitable for dalle-2 to generate a picture from the above story. Don't use names. use the digital art smooth descriptors and other suitable descriptors. Add objects or details about the background. Keep the prompt short"""},
        {"role": "assistant",
         "content": """A colorful, smooth digital illustration of a playful seal and a happy seagull together at a sunny beach, surrounded by sparkling water, with a collection of shiny seashells nearby."""},
        {"role": "user",
         "content": "Create another short story in the same style, while still focusing on the 's' sound"},
        {"role": "assistant", "content": """Title: "Sasha's Starry Sky"

    Sasha, the small squirrel, loved strolling near the stream.
    Each night, she'd scamper 'neath the stars that brightly gleamed.

    She danced on swaying branches, under silver, starry light,
    Gazing at the sky above, a dazzling, sparkling sight.

    As Sasha scurried, she'd softly hum a song of sweet delight,
    For every single shining star lit up her world each night."""},
        {"role": "user",
         "content": "create a prompt suitable for dalle-2 to generate a picture from the above story. Don't use names. use the digital art smooth descriptors and other suitable descriptors. Add objects or details about the background. Keep the prompt short"},
        {"role": "assistant",
         "content": """A whimsical, smooth digital illustration of a cheerful squirrel dancing on tree branches by a serene stream, under a starry night sky filled with bright, shining stars."""},
        {"role": "user",
         "content": "Create another short story in the same style, while still focusing on the 's' sound"},
        {"role": "assistant", "content": """Title: "Sophie's Sweet Surprise"

    Sophie, the shy snail, slid slowly through the garden,
    Admiring special blossoms, seeking one to pardon.

    A splendid, scarlet flower caught her tiny eyes,
    She slid up its stem, a sweet surprise to find.

    Safe inside the petals, she savored the scent so rare,
    Sophie, the shy snail, found her secret garden lair."""},
        {"role": "user",
         "content": "create a prompt suitable for dalle-2 to generate a picture from the above story. Don't use names. use the digital art smooth descriptors and other suitable descriptors. Add objects or details about the background. Keep the prompt short"},
        {"role": "assistant",
         "content": """A charming, smooth digital illustration of a small, content snail nestled within the petals of a vibrant scarlet flower in a lush, serene garden."""},
    ]
    def __init__(self):
        openai.api_key = os.getenv("GPT_API_KEY")

    def getTextPromptFromRequest(self, request: dict = MOCK_REQUEST) -> List[Dict[str, str]]:
        """
        Gets a request with parameters for a book, returns a prompt for gpt that will create a story based on
        the parameters.
        :param request:
        :return:
        """
        params = {
            'child': "The story should be suitable for reading to a " + request['age'] + "year old " + request['gender'] + ".",
            'setting': "The story should revolve around " + request['theme'],
            'issue': self.getIssue(request)
        }

        new_messages = [{"role": "user", "content": "Create another short story in the same style. " +
                         params['child'] +
                         params['setting'] +
                         params['issue']}]
        return self.default_messages + new_messages


    def getImagePromptFromStory(self, story: str) -> str:
        """
        BookGenerator will call this method with the text of a story, this should generate a prompt for an Image that
        fits the story.
        :param story:
        :return:
        """
        chat_prompt = self.default_messages + [{"role": "user", "content": "create another story"},
                                               {"role": "assistant", "content": story},
                                               {"role": "user", "content": "create a prompt suitable for dalle-2 to generate a picture from the above story. Don't use names. use the digital art smooth descriptors and other suitable descriptors. Add objects or details about the background. Keep the prompt short"},]
        return openai.ChatCompletion.create(
            model="gpt-4-0314",
            messages=chat_prompt,
            temperature=0.5,
            max_tokens=1000,
            n=1
        )['choices'][0]['message']['content']
        # return """A joyful, smooth digital illustration of a playful lamb leaping in a lush, green meadow under a vivid, colorful rainbow stretching across the sky."""

    def getIssue(self, request):
        if 'pronouncing' in request['issue']:
            return "The story should focus on " + request['issue']
        elif 'flexibility' in request['issue']:
            return "The story should focus on thought flexibility and problem solving"
        else:
            return "The story should focus on improving language skills"


if __name__ == "__main__":
    prompt_generator = PromptGenerator()
    print(prompt_generator.getImagePromptFromStory("""Title: "Lily's Lovely Rainbow"

Lily, the lively lamb, loved to leap and run,
Through rolling, green meadows, underneath the glowing sun.

A lovely rainbow arched across the vibrant sky,
Lily raced beneath it, her spirits soaring high.

With radiant colors lingering, the lamb let out a cheer,
For Lily knew the beauty of each lovely rainbow near."""))
