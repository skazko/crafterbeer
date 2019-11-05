const sortBeers = (state, action) => {
  if (state === undefined) {
    return 'breweryDesc'
  }

  switch (action.type) {

    case 'SORT_BEERS':
      return action.payload;

    default:
      return state.sortingOption;
  }
}

export default sortBeers;