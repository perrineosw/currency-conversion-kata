using System.ComponentModel;
using Kata.External;

namespace Kata.Model;

public enum Currency
{
    [Description("€")]
    Euro,
    [Description("$")]
    Dollar,
    [Description("£")]
    Pound,
    [Description("¥")]
    Yen
}

public static class CurrencyExtensionMethods {

    public static CurrencyIsoCode ToIsoCode(this Currency currency)
    {
        return currency switch
        {
            Currency.Euro => CurrencyIsoCode.EUR,
            Currency.Dollar => CurrencyIsoCode.USD,
            Currency.Pound => CurrencyIsoCode.GBP,
            Currency.Yen => CurrencyIsoCode.JPY,
            _ => throw new ArgumentOutOfRangeException(nameof(currency), currency, null)
        };
    }
}