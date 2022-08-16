<?php

use kata\CurrencyConverter;
use kata\external\ConversionRateApi;
use kata\model\Currency;
use kata\model\Money;
use PHPUnit\Framework\TestCase;

class CurrencyConverterTest extends TestCase
{

    public function testShouldWork() : void {
        $this->assertEquals(3, 1 + 2);
    }

    /**
     * @throws Exception
     */
    public function testShouldWorkButItFails() : void {
        $converter = new CurrencyConverter(new ConversionRateApi());

        //  This call does not work. A test double is probably necessary
        $converter->sum(Currency::Euro, [new Money(1, Currency::Dollar)]);
    }

}
