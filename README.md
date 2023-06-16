# CLI Clach
It will fight with all hero pairs and emulate 1000 battels with each pair. It will show the win:loss ratio for the pairs. 
# How to run
```
git clone git@github.com:peti2001/cli_clash.git
cd cli_clash
npm install
npm run compile
node build/src/index.js
```

After that, you are supposed to see the combat log of the last fight and the win:loss ratio table.

# Example win:loss table
```
┌─────────┬───────────┬───────────┬────────────────────────────────┬──────────────────────────────┬───────────────────────────┬────────────────────────────────┐
│ (index) │     0     │     1     │               2                │              3               │             4             │               5                │
├─────────┼───────────┼───────────┼────────────────────────────────┼──────────────────────────────┼───────────────────────────┼────────────────────────────────┤
│    0    │    ''     │ 'Warrior' │            'Priest'            │            'Mage'            │          'Rogue'          │            'Archer'            │
│    1    │ 'Warrior' │           │ '{"Priest":844,"Warrior":156}' │ '{"Warrior":758,"Mage":242}' │    '{"Warrior":1000}'     │ '{"Warrior":886,"Archer":114}' │
│    2    │ 'Priest'  │           │                                │  '{"Priest":908,"Mage":92}'  │     '{"Priest":1000}'     │  '{"Priest":953,"Archer":47}'  │
│    3    │  'Mage'   │           │                                │                              │ '{"Mage":984,"Rogue":16}' │  '{"Mage":577,"Archer":423}'   │
│    4    │  'Rogue'  │           │                                │                              │                           │  '{"Archer":975,"Rogue":25}'   │
│    5    │ 'Archer'  │           │                                │                              │                           │                                │
└─────────┴───────────┴───────────┴────────────────────────────────┴──────────────────────────────┴───────────────────────────┴────────────────────────────────┘
```
