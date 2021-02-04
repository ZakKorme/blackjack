class Player:
    def __init__(self):
        self._hand = []
        self._cash = 0

    def hand_add(self, card):
        self._hand.append(card)

    def hand_count(self):
        count = 0
        for k in range(self._hand):
            count += self._hand[k][1]

        return count

    def hand_clear(self):
        self._hand.clear()

    def set_cash(self, amount):
        self._cash = amount

    def cash_remove(self, amount):
        self._cash -= amount

    def cash_add(self, amount):
        self._cash += amount
