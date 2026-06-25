from services.llm_service import ask_llm


def generate_description(features, price):

    prompt = f"""
Write an attractive professional real estate description.

Property Features:
{features}

Price: ₹{price}

Keep it short, attractive, and suitable for a property listing website.
"""

    return ask_llm(prompt)