import os
cmd="wmic PROCESS WHERE name='LeagueClientUx.exe' GET commandline"
# 'r' 消除转义符带来的影响,即'\'
retValue = os.popen(cmd,'r')
res = retValue.read()
print(res)