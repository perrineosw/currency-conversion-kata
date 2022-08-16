using Kata.External;
using Kata.Model;
using Moq;
using Xunit;

namespace Kata.Tests;

public class CurrencyConverterTests
{
    [Fact]
    public void Should_Work() {
        Assert.Equal(3, 1 + 2);
    }

    [Fact]
    public void Should_Fail()
    {
        var converter = new CurrencyConverter(new ConversionRateApi());

        // This does not work, it generates an except. We obviously need a test double
        converter.Sum(Currency.Euro, new Money(1, Currency.Dollar));
    }
}