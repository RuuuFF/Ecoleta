//Estados e Cidades
function populateUFs() {
  const ufSelect = document
    .querySelector("select[name=uf]")

  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then(res => res.json())
    .then(states => {
      for (state of states) {
        ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
      } /*for*/
    }) /*.then states*/
} /*function populateUFs*/

populateUFs()

function getCities(event) {
  const citySelect = document
    .querySelector("[name=city]")
  const stateInput = document
    .querySelector("[name=state]")

  const ufValue = event.target.value

  const indexOfSelectedState = event.target.selectedIndex
  stateInput.value = event.target.options[indexOfSelectedState].text

  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`


  /*limpa as cidades depois de selecionar outro estado*/
  citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
  citySelect.disabled = true

  fetch(url)
    .then(res => res.json())
    .then(cities => {
      for (city of cities) {
        citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
      } /*for*/
      citySelect.disabled = false
    }) /*.then cities*/
} /* function getCities */

document
  .querySelector("select[name=uf]")
  .addEventListener("change", getCities)



//Itens de coleta
//Pegar todos os li's
const itemsToCollect = document
  .querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
  item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document
  .querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event) {
  const itemLi = event.target

  //adicionar ou remover uma classe com javascritp
  itemLi.classList.toggle("selected")
  const itemId = itemLi.dataset.id


  //verificar se existem itens selecionados, se sim         
  //pegar os itens selecionados
  const alreadySelected = selectedItems
    .findIndex(item => {
      const itemFound = item == itemId //t ou f
      return itemFound
    })

  //se ja estiver selecionado,
  if (alreadySelected >= 0) {
    //tirar da seleção
    const filteredItems = selectedItems
      .filter(item => {
        const itemIsDifferent = item != itemId
        return itemIsDifferent
      })
    selectedItems = filteredItems
  } else {
    //se não estiver selecionado
    //adicionar a seleção
    selectedItems.push(itemId)
  }

  /*console.log(selectedItems)*/

  //atualizar o campo escondido com os itens     
  //selecionados
  collectedItems.value = selectedItems
}