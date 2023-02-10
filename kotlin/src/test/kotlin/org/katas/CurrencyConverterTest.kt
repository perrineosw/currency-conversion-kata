package org.katas

import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.Test
import org.katas.external.conversionRateApi.ConversionRateApi
import org.katas.model.Currency
import org.katas.model.Money

class CurrencyConverterTest {
    @Test
    fun shouldWork() {
        Assertions.assertEquals(3, 1 + 2)
    }

    @Test
    fun sum_shouldFail() {
        val converter = CurrencyConverter(ConversionRateApi())

        // This does not work. Make it work please ^_^"
        val result = converter.sum(Currency.EURO, Money(1.0, Currency.DOLLAR))
    }
}