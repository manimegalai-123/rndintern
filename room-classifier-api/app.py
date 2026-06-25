from fastapi import FastAPI, UploadFile, File
from PIL import Image
import torch
import torch.nn as nn
from torchvision.models import efficientnet_b0
from torchvision import transforms

app = FastAPI()

classes = [
    "bathroom",
    "bedroom",
    "dining",
    "gaming",
    "kitchen",
    "laundry",
    "living",
    "office",
    "terrace",
    "yard"
]

transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor()
])

model = efficientnet_b0(weights=None)

model.classifier[1] = nn.Linear(
    model.classifier[1].in_features,
    10
)

model.load_state_dict(
    torch.load(
        "room1_model.pth",
        map_location="cpu"
    )
)

model.eval()


@app.get("/")
def home():
    return {"message": "Classifier Running"}


@app.post("/predict")
async def predict(file: UploadFile = File(...)):

    image = Image.open(file.file).convert("RGB")

    image = transform(image)
    image = image.unsqueeze(0)

    with torch.no_grad():
        output = model(image)
        pred = torch.argmax(output, dim=1)

    return {
        "label": classes[pred.item()]
    }