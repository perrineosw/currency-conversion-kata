namespace Kata.External;

public class ConversionRateApi
{
    public double GetRate(CurrencyIsoCode source, CurrencyIsoCode target)
    {
        Console.WriteLine($"Getting rate from {source.GetDescription()} to {target.GetDescription()}");
        throw new ArgumentException(
            "401 - Unauthorized, IP not recognized. Are you trying to call us via a unit test?");
    }
}