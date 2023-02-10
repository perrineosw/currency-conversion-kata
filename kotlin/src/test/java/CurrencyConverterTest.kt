import external.conversionRateApi.ConversionRateApi
import model.Currency
import model.Money
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.Test

class CurrencyConverterTest {
    @Test
    fun shouldWork() {
        Assertions.assertEquals(3, 1 + 2)
    }

    @Test
    fun sum_shouldFail() {
        val converter = CurrencyConverter(ConversionRateApi())

        // This does not work. Make it work please ^_^"
        val (amount, currency) = converter.sum(Currency.EURO, Money(1.0, Currency.DOLLAR))
        assert("$amount$currency" == "0.0EURO")
    }
}