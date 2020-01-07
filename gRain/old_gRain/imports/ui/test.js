

// dice[0] = {die._id:1}
dice: [
  { _id: 0, value: '', used: 'f' },
  { _id: 1, value: '', used: 'f' },
  { _id: 2, value: '', used: 'f' },
  { _id: 3, value: '', used: 'f' },
  { _id: 4, value: '', used: 'f' },
  { _id: 5, value: '', used: 'f' }
],
diceRolled: 'false',
// assignedStats[0] = {stat._id}
assignedStats: [
  { _id: 'str', value: null },
  { _id: 'dex', value: null },
  { _id: 'con', value: null },
  { _id: 'int', value: null },
  { _id: 'wis', value: null },
  { _id: 'cha', value: null }
]

// Roll is clicked. Method for rolling and assigning is selected.



/*******
 * Functions for assignment
 * 
 */

assignStats = async (e) => {
  const { dice, assignedStats, assignMethodSel } = this.state;
  const tempStats = copyObjArr(assignedStats);
  const tempDice = copyObjArr(dice);
  const pick = setPick(assignMethodSel);

  const abilitySelection = () => {
    return new Promise(resolve => {
      const { selectedAbility } = this.state;
      if (selectedAbility !== null) {
        resolve(selectedAbility);
      } else {
        console.log('Abi not selected');
        setTimeout(abilitySelection, 2000);
      }
    });
  };

  const selected = await abilitySelection();

  

}
