from src.currency import Currency


class Money:
    def __init__(self, amount: float, currency: Currency):
        self.amount = amount
        self.currency = currency
