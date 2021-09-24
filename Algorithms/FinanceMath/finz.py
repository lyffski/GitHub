import math
import re


class Annuitätentilgung:
    def __init__ (self, k_o, p, n):
        self.k_o = k_o
        self.p = p 
        self.n = n 
        self.q = 1+p/100
        self.a = round(self.k_o * self.q**self.n * (self.q-1) / ( self.q ** self.n - 1), 2)
        self.t_1 = round((self.k_o * (self.q-1)) / (self.q**self.n -1), 2)
        
    def zinsd(self):
        ls = []
        for v in range (1,self.n+1,1):
            z_v = (self.k_o * (self.q-1) * (self.q**self.n - self.q**(v-1))) / (self.q**self.n -1)
            ls.append(z_v)
        return ls

    def annui(self):
        ls = []
        for v in range (1,self.n+1,1):
            self.t_v = self.t_1 * self.q**(v-1)
            ls.append(self.t_v)
        return ls
        
    def restz(self):
        ls = []
        for v in range (1,self.n,1):
            self.k_v = self.k_o * self.q**v - (self.a * (self.q**v -1)) / (self.q-1)
            ls.append(self.k_v)
        return ls

    def show_matrix(self):
        x1 = ann.annui()
        x2 = ann.zinsd()
        x3 = ann.restz()
        print(x1)
        print(x2)
        print(x3)
        print(self.a)

ann = Annuitätentilgung(75000, 4.5, 5)
ann.show_matrix()



def zins(ls):
    '''
    Input: zins(K_n;K_o;p;n)
    Note: if you use the 1st instance make sure to have space between operators
    '''
    ls = ls.split(";")
    if ls[0] == "K_n":
        #parsing input
        #fK_n = float(ls[0])= missing 
        K_o = float(ls[1])
        p = float(ls[2])
        n = float(ls[3])
        K_n = K_o * (1+p/100)**n
        return round(K_n,2)

    if ls[1] == "K_o":
        #parsing input
        K_n = float(ls[0])
        #K_o = float(ls[1]) = missing
        p = float(ls[2])
        n = float(ls[3])
        #calc
        K_o = K_n / (1+p/100)**n
        return round(K_o,2)

    if ls[2] == "p":
        #parsing input
        K_n = float(ls[0])
        K_o = float(ls[1])
        #p = float(ls[2]) = missing
        n = float(ls[3])
        #calc
        q = (K_n / K_o)**(1/n)
        p = (q-1) *100
        return round(p,2)

    if ls[3] == "n":
        #parsing input
        K_n = float(ls[0])
        K_o = float(ls[1])
        p = float(ls[2])
        #n = float(ls[3]) missing
        #calc
        K = K_n / K_o
        q = 1+q/100
        n = math.log(K,10) / math.log(q,10)
        return round(n,2)



def rent(K_o, r, q, n, o1=True, o2=False, o3=True):
    '''
    Input: K_o (=owned Capital >> 0 if not); r (=rent); q (=rate); t (=time)
    Option: o1(=if in advance or afterwords); o2 (= if a Capital already own); o3 (=if increase or decrease)
    '''
    q = (1+q/100)
    if o1 == True: # if True => in advance
        if o2 == True: # if K_o owned
            if o3 == True: # if increase or decrease
                K_n = K_o * q**n + (r * q * ((q**n - 1) / (q - 1)))
            else: 
                K_n = K_o * q**n - (r * q * ((q**n - 1) / (q - 1)))
        else: K_n = r * q * ((q**n -1) / (q-1))
        return round(K_n,2)

    if o1 == False: # if False => afterword
        if o2 == True: # if K_o owned
            if o3 == True: # if increase or decrease
                K_n = K_o * q**n + (r * ((q**n - 1) / (q - 1)))
            else: 
                K_n = K_o * q**n - (r * ((q**n - 1) / (q - 1)))
        else: K_n = r * ((q**n -1) / (q-1))
        return round(K_n,2)


def effi(ks, p, t, disagio):
    '''
    Input: ks = capital_sum; p = percentage (whole number); t = time (in days); disagio = the disagio rate (whole number)
    '''
    disagio = (disagio/100)
    z_n = (ks * p * t) / (100 * 360)
    kk = z_n + (ks * disagio)
    az = ks - (ks * disagio)
    p_eff = (kk * 360 * 100) / (az * t)
    return round(p_eff,2)



# print(effi.___doc__)
x = effi(60000, 6, 1440, 4)
print(x)

# print(zins.__doc__)
x = zins("K_n;50000;2.4;5") 
print(x)

# print(rent.__doc__)
x = rent(0,50,2.25,3)
print(x)

