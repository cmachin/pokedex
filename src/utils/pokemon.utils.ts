/* Get tag color based on pokemon type */
export const getTagColor = (type: string) => {
  const colorMap: Record<string, string> = {
    normal: '#9fa19f',
    fire: '#e42829',
    water: '#3e81f2',
    grass: '#4da11c',
    electric: '#f4bf00',
    psychic: '#e43f78',
    ice: '#5bcff5',
    dragon: '#5060E1',
    dark: '#5f4c4d',
    fairy: '#e770f1',
    fighting: '#f67f00',
    flying: '#88b9f1',
    poison: '#8e42ce',
    ground: '#8c501b',
    rock: '#aea97f',
    bug: '#a8b820',
    ghost: '#6d4171',
    steel: '#69a2ba',
    stellar: '#53b4a4',
    unknown: '#68A090',
  };
  return colorMap[type.toLowerCase()] ?? colorMap.unknown;
};
