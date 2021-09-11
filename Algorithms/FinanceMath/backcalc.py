import numpy as np
import math 

class Backcalc:
    def __init__(self, x1, lr, lsk, bkz, hkz, win, ks, kr):
        self.x1 = x1
        #self.ust = ust
        self.kr = kr
        self.ks = ks
        self.win = win
        self.hkz = hkz
        self.bkz = bkz
        self.lsk = lsk
        self.lr = lr


    def calc(self):
        netto_vkp = round(self.x1 / 1.19, 2)
        kr = round(netto_vkp * self.kr / 100, 2)
        ziel_vkp = netto_vkp - kr
        ks = round(ziel_vkp * self.ks / 100, 2)
        bar_vkp = ziel_vkp - ks
        slb_cost = round(bar_vkp / (1+(self.win/100)),2)
        win = bar_vkp - slb_cost
        bzk_cost = round(slb_cost / (1+(self.hkz/100)),2)
        hkz = slb_cost - bzk_cost
        bar_ekp = bzk_cost - self.bkz
        lsk = abs(round(bar_ekp / (1-(100/self.lsk)),2))
        ziel_ekp = bar_ekp + lsk
        lr = abs(round(ziel_ekp / (1-(100/self.lr)),2))
        netto_ekp = ziel_ekp + lr
        print(netto_ekp)





obj1 = Backcalc(157.77, 0, 3, 3.5, 17, 25, 2, 5)
obj1.calc()