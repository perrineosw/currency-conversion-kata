import { CurrencyConverter } from "./currency-converter";
import { Currency } from "./model/currency";
import { Money } from "./model/money";
import { ConversionRateApi } from "./external/conversion-rate-api";
import { CurrencyIsoCode } from "./external/currency-iso-code";

// Mocking de l'API avec Jest
jest.mock('./external/conversion-rate-api', () => {
  return {
    ConversionRateApi: jest.fn().mockImplementation(() => {
      return {
        getRate: jest.fn((source: CurrencyIsoCode, target: CurrencyIsoCode): number => {
          const rates: Record<CurrencyIsoCode, Record<CurrencyIsoCode, number>> = {
            USD: {
              EUR: 0.9, GBP: 0.8, JPY: 110,
              [CurrencyIsoCode.USD]: 0
            },
            EUR: {
              USD: 1.1, GBP: 0.9, JPY: 120,
              [CurrencyIsoCode.EUR]: 0
            },
            GBP: {
              USD: 1.25, EUR: 1.11, JPY: 137,
              [CurrencyIsoCode.GBP]: 0
            },
            JPY: {
              USD: 0.009, EUR: 0.008, GBP: 0.0073,
              [CurrencyIsoCode.JPY]: 0
            },
          };
          return rates[source][target] || 1;
        }),
      };
    }),
  };
});

// Création d'un faux service de conversion de monnaie
class FakeConversionRateApi {
  getRate(source: CurrencyIsoCode, target: CurrencyIsoCode): number {
    const rates: Record<CurrencyIsoCode, Record<CurrencyIsoCode, number>> = {
      USD: {
        EUR: 0.9, GBP: 0.8, JPY: 110,
        [CurrencyIsoCode.USD]: 0
      },
      EUR: {
        USD: 1.1, GBP: 0.9, JPY: 120,
        [CurrencyIsoCode.EUR]: 0
      },
      GBP: {
        USD: 1.25, EUR: 1.11, JPY: 137,
        [CurrencyIsoCode.GBP]: 0
      },
      JPY: {
        USD: 0.009, EUR: 0.008, GBP: 0.0073,
        [CurrencyIsoCode.JPY]: 0
      },
    };
    return rates[source][target] || 1;
  }
}

describe("CurrencyConverter", () => {
  let converter: CurrencyConverter;
  let mockGetRate: jest.Mock;

  beforeEach(() => {
    const mockApi = new ConversionRateApi();
    mockGetRate = mockApi.getRate as jest.Mock;
    converter = new CurrencyConverter(mockApi);
  });

  it("is initialized", () => {
    const converter = new CurrencyConverter(new ConversionRateApi());
    expect(converter).toBeTruthy();
  });

  it("converts and sums amounts correctly with Jest mock", () => {
    const converter = new CurrencyConverter(new ConversionRateApi());
    const result = converter.sum(Currency.Euro, new Money(2, Currency.Dollar));
    expect(result.amount).toEqual(1.8); // 2 dollars * 0.9 taux de conversion
    expect(result.currency).toEqual(Currency.Euro);
  });

  it("converts and sums amounts correctly with fake API", () => {
    const fakeApi = new FakeConversionRateApi();
    const converter = new CurrencyConverter(fakeApi);
    const result = converter.sum(Currency.Euro, new Money(2, Currency.Dollar));
    expect(result.amount).toEqual(1.8); // 2 dollars * 0.9 taux de conversion
    expect(result.currency).toEqual(Currency.Euro);
  });

  it("gère correctement une exception lors de la récupération du taux de change", () => {
    mockGetRate.mockImplementation(() => {
      throw new Error("Network error");
    });

    expect(() => {
      converter.sum(Currency.Euro, new Money(10, Currency.Dollar));
    }).toThrow("Network error");
  });

  it("gère correctement un taux de change non défini", () => {
    mockGetRate.mockReturnValue(undefined);

    expect(() => {
      converter.sum(Currency.Euro, new Money(10, Currency.Dollar));
    });
  });

  it("calcule correctement la somme avec des montants dans différentes devises", () => {
    mockGetRate.mockImplementation((source, target) => {
      if (source === CurrencyIsoCode.USD && target === CurrencyIsoCode.EUR) {
        return 0.9;
      } else if (source === CurrencyIsoCode.GBP && target === CurrencyIsoCode.EUR) {
        return 1.1;
      }
      return 1;
    });

    const result = converter.sum(
      Currency.Euro,
      new Money(10, Currency.Dollar), // 9 EUR
      new Money(5, Currency.Pound)    // 5.5 EUR
    );

    expect(result.amount).toEqual(14.5);
    expect(result.currency).toEqual(Currency.Euro);
  });

  it("traite les montants nuls ou négatifs", () => {
    mockGetRate.mockReturnValue(1);

    const resultZero = converter.sum(Currency.Euro, new Money(0, Currency.Dollar));
    expect(resultZero.amount).toEqual(0);
    expect(resultZero.currency).toEqual(Currency.Euro);

    const resultNegative = converter.sum(Currency.Euro, new Money(-10, Currency.Dollar));
    expect(resultNegative.amount).toEqual(-10);
    expect(resultNegative.currency).toEqual(Currency.Euro);
  });

  it("ne convertit pas si la devise en entrée est la même que la devise cible", () => {
    const result = converter.sum(Currency.Euro, new Money(10, Currency.Euro));
    expect(result.amount).toEqual(10);
    expect(result.currency).toEqual(Currency.Euro);
  });
});

describe('ConversionRateApi interactions', () => {
  let converter: CurrencyConverter;
  let mockApi: jest.Mocked<ConversionRateApi>;

  beforeEach(() => {
    mockApi = new ConversionRateApi() as jest.Mocked<ConversionRateApi>;
    converter = new CurrencyConverter(mockApi);
  });

  it('appelle getRate pour la conversion de USD à EUR', () => {
    converter.sum(Currency.Euro, new Money(10, Currency.Dollar));
    expect(mockApi.getRate).toHaveBeenCalledWith(CurrencyIsoCode.USD, CurrencyIsoCode.EUR);
  });

  it('appelle getRate pour la conversion de EUR à USD', () => {
    converter.sum(Currency.Dollar, new Money(10, Currency.Euro));
    expect(mockApi.getRate).toHaveBeenCalledWith(CurrencyIsoCode.EUR, CurrencyIsoCode.USD);
  });
});