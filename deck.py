import random


deck = [
    ["spades", 2, "2 of spades"],
    ["spades", 3, "3 of spades"],
    ["spades", 4, "4 of spades"],
    ["spades", 5, "5 of spades"],
    ["spades", 6, "6 of spades"],
    ["spades", 7, "7 of spades"],
    ["spades", 8, "8 of spades"],
    ["spades", 9, "9 of spades"],
    ["spades", 10, "10 of spades"],
    ["spades", 10, "Jack of spades"],
    ["spades", 10, "Queen of spades"],
    ["spades", 10, "King of spades"],
    ["spades", 11, "Ace of spades"],
    ["diamond", 2, "2 of diamond"],
    ["diamond", 3, "3 of diamond"],
    ["diamond", 4, "4 of diamond"],
    ["diamond", 5, "5 of diamond"],
    ["diamond", 6, "6 of diamond"],
    ["diamond", 7, "7 of diamond"],
    ["diamond", 8, "8 of diamond"],
    ["diamond", 9, "9 of diamond"],
    ["diamond", 10, "10 of diamond"],
    ["diamond", 10, "Jack of diamond"],
    ["diamond", 10, "Queen of diamond"],
    ["diamond", 10, "King of diamond"],
    ["diamond", 11, "Ace of diamond"],
    ["hearts", 2, "2 of hearts"],
    ["hearts", 3, "3 of hearts"],
    ["hearts", 4, "4 of hearts"],
    ["hearts", 5, "5 of hearts"],
    ["hearts", 6, "6 of hearts"],
    ["hearts", 7, "7 of hearts"],
    ["hearts", 8, "8 of hearts"],
    ["hearts", 9, "9 of hearts"],
    ["hearts", 10, "10 of hearts"],
    ["hearts", 10, "Jack of hearts"],
    ["hearts", 10, "Queen of hearts"],
    ["hearts", 10, "King of hearts"],
    ["hearts", 11, "Ace of hearts"],
    ["clubs", 2, "2 of clubs"],
    ["clubs", 3, "3 of clubs"],
    ["clubs", 4, "4 of clubs"],
    ["clubs", 5, "5 of clubs"],
    ["clubs", 6, "6 of clubs"],
    ["clubs", 7, "7 of clubs"],
    ["clubs", 8, "8 of clubs"],
    ["clubs", 9, "9 of clubs"],
    ["clubs", 10, "10 of clubs"],
    ["clubs", 10, "Jack of clubs"],
    ["clubs", 10, "Queen of clubs"],
    ["clubs", 10, "King of clubs"],
    ["clubs", 11, "Ace of clubs"]
]


class Deck:
    def __init__(self):
        self._deck = deck
        self._current_deck = deck

    def shuffle(self):
        random.shuffle(self._current_deck)

    def deal(self):
        return self._current_deck.pop()

    def reset(self):
        self._current_deck = self._deck

    def __len__(self):
        return len(self._current_deck)
