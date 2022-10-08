from unittest.mock import MagicMock

from src.currency import Currency
from src.currency_converter import CurrencyConverter
from src.external.conversion_rate_api import ConversionRateApi
from src.money import Money


def test_converter():
    rate_api = ConversionRateApi()
    rate_api.get_rate = MagicMock(return_value=2)
    converter = CurrencyConverter(rate_api)

    result = converter.sum(Currency.Dollar, Money(1.0, Currency.Euro))

    assert result.amount == 2.0
    assert result.currency == Currency.Dollar
