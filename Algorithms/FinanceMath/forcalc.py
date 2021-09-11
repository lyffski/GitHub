import math
import numpy as np

class Forecalc:
    def __init__(self, x1, lr, lsk, bzk, hkz, win, ks, kr):
        #self.x1 = float(input("Netto: "))
        #self.lr = float(input("Supplier Discout: "))
        #self.lsk = float(input("Supplier Skonto: "))
        #self.bzk = float(input("Bezugskosten: "))
        #self.hkz = float(input("Handlungskosten: "))
        #self.win = float(input("Gewinnantiel: "))
        #self.ks = float(input("Kundenskonto: "))
        #self.kr = float(input("Kundenrabatt: "))
        self.x1 = x1
        self.lr = lr
        self.lsk = lsk
        self.bzk = bzk
        self.hkz = hkz
        self.win = win
        self.ks = ks
        self.kr = kr
        
    def cast(self):
        ls0 = np.array([self.lr, self.lsk, self.hkz, self.win])
        ls1 = []
        for i in range(len(ls0)):
            x = ls0[i]/100
            ls1.append(x)
        return ls1

    def calc(self):
        lr_pt = round(self.lr / 100, 2) 
        lsk_pt = round(self.lsk / 100, 2)
        hkz_pt =round(self.hkz / 100, 2)
        win_pt =round(self.win / 100, 2)
        ks_pt = self.ks / (100 - self.ks)
        kr_pt = self.kr / (100 - self.kr)

        lr = round(self.x1 * lr_pt, 4)
        ziel_ekp = self.x1 - lr
        lsk = round(ziel_ekp * lsk_pt, 2)
        bar_ek = ziel_ekp - lsk
        bzg_preis = bar_ek + self.bzk
        hkz = round(bzg_preis * hkz_pt, 2)
        slb_cost = bzg_preis + hkz
        win = round(slb_cost * win_pt, 2)
        bar_vkp = slb_cost + win
        ks = round(bar_vkp * ks_pt, 2)
        ziel_vkp = bar_vkp + ks
        kr = round(ziel_vkp * kr_pt, 2)
        netto_vkp = ziel_vkp + kr
        brutto_vkp = round(netto_vkp + (netto_vkp * 0.19), 2)

        print("Listeneinkaufspreis netto: ", self.x1, "\nLieffererrabtt: -", lr, "\nZieleinkaufspreis: ", ziel_ekp, "\nLieferskonto: -", lsk, "\nBarverkaufspreis: ", bar_ek, "\nBezugskosten: +", self.bzk, "\nBezugspreis: ", bzg_preis, "\nHandlungskosten: +",hkz,  "\nSelbstkosten: ", slb_cost, "\nGewinn: +", win, "\nBarverkaufspreis: " ,bar_vkp,  "\nKundenskonto: +", ks, "\nZielverkaufspreis: " ,ziel_vkp,  "\nKundenrabatt: +", kr, "\nNettoverkaufspreis: ", netto_vkp, "\nBruttoverkaufspreis: ", brutto_vkp, "")

        #print("Lek: {x1}\nMegfdk: {x2}".format(x1=self.x1, x2=lr))



obj1 = Forecalc(83.4, 0, 3, 3.5, 17, 25, 2, 5)
obj1.calc()




