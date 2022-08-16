using Kata.External;
using Kata.Model;

namespace Kata
{
    public class CurrencyConverter
    {
        private readonly ConversionRateApi _conversionRateApi;
        public CurrencyConverter(ConversionRateApi conversionRateApi)
        {
            _conversionRateApi = conversionRateApi;
        }
        
        public double Sum(Currency target, params Money[] moneys)
        {
            var amount = 0.0;

            var knownRates = new Dictionary<Currency, double>();
            knownRates.Add(target, 1.0);

            foreach (var m in moneys)
            {
                if (!knownRates.ContainsKey(m.Currency))
                {
                    var rate = _conversionRateApi.GetRate(m.Currency.ToIsoCode(), target.ToIsoCode());
                    knownRates.Add(m.Currency, rate);
                }

                amount += m.Amount * knownRates[m.Currency];
            }

            return amount;
        }
    }
}