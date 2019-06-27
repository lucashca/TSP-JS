import sys
from random import randint as r


nodes = {}

totalnode = int(sys.argv[1],10)
name = sys.argv[2]
fileName = name +".txt"
print(fileName)
arq = open(fileName, "w")
arq.write(str(totalnode))
arq.write("\n")        
for i in range(1,totalnode+1):
    for j in range(2):
        no = i
        no2 =  r(1,totalnode) 
        while (no == no2):
            no2 =  r(1,totalnode) 
        weight =  r(1,10) 
    
        if(j == 0):
            nodes[no] = []
            nodes[no].append(no2)
        else:
            res = nodes.get(no)
            contais = False
            for j in range(0,len(res)):
                if(res[j] == no2):contais = True
            if(not contais):        
                nodes[no].append(no2)
            

        line = str(no)+" "+str(no2)+" "+str(weight)
        arq.write(line)
        arq.write("\n")   
print(nodes)



for i in range(1,totalnode+1):
    res = nodes.get(i)
    if not res :
        no = i 
        no2 = i 
        while (no == no2):
            no2 =  r(1,totalnode) 
        weight =  r(1,10) 
        nodes[no] = []
        nodes[no].append(no2)
        line = str(no)+" "+str(no2)+" "+str(weight)
        arq.write(line)
        arq.write("\n")     
        
print(nodes)
arq.close()

    #para inserir quebra de linha
    
