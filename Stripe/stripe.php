<?php
// use Dotenv\Dotenv;
// use Stripe\Stripe;
// use Stripe\StripeClient;

//* securisation de la clef secret avec la lib phpdotenv
//* composer require vlucas/phpdotenv
//* Lib stripe
//* composer require stripe/stripe-php
    //recupération de la cles secrete
$dotenv = Dotenv::createImmutable(__DIR__, '.env');
$dotenv->load();
$stripeKey = $_ENV['SK_TEST_KEY'];
    //
$stripe = new StripeClient(
    $stripeKey
);

//TODO paiement mensualisé
$stripe->subscriptions->create([
    'customer' => $id,// id du client
    'items' => [
        ['price' => $price],
    ],
]);;



//? paiement unique
$stripe->charges->create([
    'amount' => $price,
    'currency' => 'eur',
    'source' => 'tok_visa',
    'description' => 'paiement de test',
]);
return $response->withRedirect('/');


