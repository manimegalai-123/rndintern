import requests

HF_URL = "https://manimegalaisivakumar-room-classifier.hf.space"


def predict_room(image_path):

    with open(image_path, "rb") as f:

        response = requests.post(
            HF_URL,
            files={"file": f}
        )

    result = response.json()

    return result["label"]