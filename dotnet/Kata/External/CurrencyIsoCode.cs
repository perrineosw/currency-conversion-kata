using System.ComponentModel;
using System.Reflection;

namespace Kata.External;

public enum CurrencyIsoCode
{
    [Description("USD")]
    USD,
    [Description("GBP")]
    GBP,
    [Description("EUR")]
    EUR,
    [Description("JPY")]
    JPY
}

static class CurrencyIsoCodeExtensions
{
    public static string GetDescription(this CurrencyIsoCode value)
    {
        FieldInfo field = value.GetType().GetField(value.ToString())!;

        DescriptionAttribute? attribute
            = Attribute.GetCustomAttribute(field, typeof(DescriptionAttribute))
                as DescriptionAttribute;

        return attribute == null ? value.ToString() : attribute.Description;
    }
}