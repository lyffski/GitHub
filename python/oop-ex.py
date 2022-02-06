import math, random

from matplotlib.figure import Figure

class Warrior:
    def __init__(self, name, health, max_attc, max_block):
        self.name = name
        self.health = health
        self.max_attc = max_attc
        self.max_block = max_block
    
    def attact(self):
        attc_amt = self.max_attc * math.ceil(random.random() + .5)
        return attc_amt

    def block(self):
        block_amt = self.max_block * math.ceil(random.random() + .5)
        return block_amt


class Fight:
    #@staticmethod can not use, cuz fight_start func. uses a method within this class "get_action_result"
    def fight_start(self, warriorA, warriorB):
        while True:
            if self.get_action_result(warriorA, warriorB) == "Game Over": #before furhter code execute, it firest execute #self need, cuz we are within a Class, so to call a mehod from this Class, self.needed 
                print("Game Over")
                break
            if self.get_action_result(warriorB, warriorA) == "Game Over": #here same func. but just we change the actors, thus func. can be reuse, the same with
                print("Game Over")
                break

    @staticmethod #staticmethod resesonabe, cuz the method do not use any outside func. for now
    def get_action_result(warrior1, warrior2): # actors change, from war.A is eigher war.1 or war.2, dep on which upper var is assigend to in fight_start()
        dmg_dealt_to_warrior2 = warrior1.attact() - warrior2.block()
        warrior2.health = warrior2.health - dmg_dealt_to_warrior2

        print("{} dealt by {} to {}".format(dmg_dealt_to_warrior2, warrior1.name, warrior2.name))
        print("{} have {} left".format(warrior2.name, warrior2.health))

        if warrior2.health <= 0:
            print("{} has died".format(warrior2.name))
            return "Game Over"
        else:
            return ("it does not matter what to return string, is cuz, only valid return, which will allow to end the whole loop, is \"Game Over\"")



def main():
    layt = Warrior("Layt", 50, 20, 10)
    lify = Warrior("Lify", 50, 20, 10)
    fight = Fight()
    fight.fight_start(layt, lify)

main()



class Hi():
    def __init__(self, tame="kali", name="ka"):
        self.__tame = tame
        self.name = name

    def prt(self):
        print(self.__tame)

o1 = Hi()
o1.prt()
print(o1.name)
print(o1.__tame)