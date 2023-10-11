let pokemonList = [
  {name: "Bulbasaur", height: 0.7, types: ["grass", "poison"]},
  {name: "Charizard", height: 1.7, types: ["fire", "flying"]},
  {name: "Beedrill", height: 0.4, types: ["bug", "poison"]},
];

for (let i = 0; i < pokemonList.length; i++) {
  if (pokemonList[i].height > 1.0)
   {document.write(pokemonList[i].name + "  " + "(height:"+ "  " +  pokemonList[i].height + " ) " + "- Wow. That\'s big!"+ "<br>"); 
} else {
document.write(pokemonList[i].name + "  " + "(height:"+ "  " +  pokemonList[i].height + " ) " + "<br>");}
}




