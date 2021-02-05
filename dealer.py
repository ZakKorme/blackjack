class Dealer:
    def __init__(self):
        self._hand = []

    def hand_add(self, card):
        self._hand.append(card)

    def hand_count(self):
        count = 0
        for k in range(len(self._hand)):
            count += self._hand[k][1]

        return count

    def hand_clear(self):
        self._hand.clear()

    def over_21(self):
        return self.hand_count() > 21
