import external.ConversionRateApi;
import model.Currency;
import model.Money;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class CurrencyConverterTest {

    @Test
    void shouldWork() {
        assertEquals(3, 1+2);
    }

    @Test
    void sum_shouldFail() {
        var converter = new CurrencyConverter(new ConversionRateApi());

        // This does not work. Make it work please ^_^"
        var result = converter.sum(Currency.Euro, new Money(1, Currency.Dollar));
    }
}