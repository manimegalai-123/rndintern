import json
from services.llm_service import ask_llm


def recommendation_agent(state):

    print("Recommendation Agent Started")

    with open("database/buyers.json", "r") as f:
        buyers = json.load(f)

    matched_buyers = []

    property_location = state["location"]
    property_price = state["price"]
    bedrooms = state["features"]["bedroom"]

    for buyer in buyers:

        prompt = f"""
Property:
Location = {property_location}
Price = {property_price}
Bedrooms = {bedrooms}

Buyer:
Location = {buyer["location"]}
Budget = {buyer["budget"]}
Bedrooms = {buyer["bedrooms"]}

Give output exactly like:

Score: xx
Reason: xxxx
"""

        answer = ask_llm(prompt)

        print(answer)

        matched_buyers.append(
            {
                "name": buyer["buyer_name"],
                "phone": buyer["phone"],
                "email": buyer["email"],
                "analysis": answer
            }
        )

    state["recommended_buyers"] = matched_buyers

    return state
