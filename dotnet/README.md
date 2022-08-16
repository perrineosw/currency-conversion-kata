# Currency converter - Dotnet

This kata should help you go on with test doubles through XUnit & Moq.

Check [root README](../README.md) for details on what to implement

Additional tip:
* Moq does not work to stub methods that are not virtual. You therefore won't be able to create a Mock of the ConversionRateApi. What you probably need is an interface...

## Installing

This starter uses dotnet 6. If you have not installed it, you can get it from [Dotnet download page](https://dotnet.microsoft.com/en-us/download)

## Running tests

Your IDE can generally do it, but if you need command line:

> dotnet test

The first time you run it, one of the tests should fail.

## Coverage

Better ask your IDE for it, it's much simpler, but if you feel brave, you first need to install a report generator: 
> dotnet tool install -g dotnet-reportgenerator-globaltool

Then run the test with coverage gathering __from the `Kata/Tests` folder__:
> dotnet test --collect:"XPlat Code Coverage"

A `TestResults folder` should have appeared with a guid. Then run: 
> reportgenerator -reports:"TestResults\{guid}\coverage.cobertura.xml" -targetdir:"TestResults/coveragereport" -reporttypes:Html