import player
import deck
import dealer


# Starting Capital and Initializing Game

player_name = input("What is your name? ")
starting_cash = int(input("How much will you be playing with tonight? "))
player1 = player.Player()
player1.set_cash(starting_cash)

# Initialize Deck
deck = deck.Deck()


# Initialize Dealer
dealer = dealer.Dealer()


found_winner = False

while not found_winner:

    # Bet Amount
    print("Your Balance is: ", player1._cash)
    bet = int(input("How much would like to bet? "))

    # Shuffle Deck
    deck.shuffle()

    # Draw Cards for both Dealer and Player
    draw_card_1_player = deck.deal()
    draw_card_2_player = deck.deal()

    draw_card_1_dealer = deck.deal()
    draw_card_2_dealer = deck.deal()

    # Add cards to Player's hand
    player1.hand_add(draw_card_1_player)
    player1.hand_add(draw_card_2_player)

    # Add cards to Dealer's hand
    dealer.hand_add(draw_card_1_dealer)
    dealer.hand_add(draw_card_2_dealer)

    print("The dealer is passing cards out...")
    print("\n")
    print("Your hand is:", player1._hand)

    # If you're dealt the perfect hand
    if player1.hand_count() == 21:
        print("WOW! You got a perfect hand. You've Won this Round!!")
        found_winner = True

    print("\n")
    print("The dealers first card is:", draw_card_1_dealer)
    print("\n")
    print("What is your next move?")
    print("\n")

    next_move = input("Hit or Pass? ")

    # Player will draw another card
    if next_move == "Hit":

        while player1.hand_count() <= 21:
            # Draw New Card
            hit_draw_card_player1 = deck.deal()
            player1.hand_add(hit_draw_card_player1)

            if player1.hand_count() > 21:
                print("Sorry, the dealer wins this round. You went over 21.")
                player1.cash_remove(bet)
                found_winner = True
                break

            elif player1.hand_count() == 21:
                print("WOW! You got a perfect hand. You've Won this Round!!")
                player1.cash_add(bet * 1.50)
                found_winner = True
                break

            print("Your hand is:", player1._hand)
            print("What is your next move?")
            print("\n")

            next_move = input("Hit or Pass? ")

            # If player passes, count hand, else draw again
            if next_move == "Pass":
                if dealer.hand_count() >= player1.hand_count() and not dealer.over_21():
                    print("Sorry, you've lost this round..")
                    player1.cash_remove(bet)
                    found_winner = True
                    break

                else:
                    print("You've Won this Round!!")
                    player1.cash_add(bet * 1.50)
                    found_winner = True
                    break

    else:
        if dealer.hand_count() >= player1.hand_count() and not dealer.over_21():
            print("Sorry, you've lost this round..")
            player1.cash_remove(bet)
            found_winner = True

        else:
            print("You've Won this Round!!")
            player1.cash_add(bet * 1.50)
            found_winner = True

    print("Would you like to play again?")
    new_game = input("Yes or No? ")

    if new_game == "Yes":
        player1.hand_clear()
        dealer.hand_clear()
        deck.reset()
        found_winner = False
