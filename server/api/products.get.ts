export default defineEventHandler(async (event) => {

  await new Promise((res) => setTimeout(res, 2000))

	const products = [
    { id: 1, name: "Xiaomi Robot Vacuum S10", quantity: "", price: "" },
    { id: 2, name: "Фильтр HEPA", quantity: "", price: "" },
    { id: 3, name: "Сменная щетка", quantity: "", price: "" },
    { id: 4, name: "Швабра-насадка", quantity: "", price: "" },
    { id: 5, name: "Контейнер для пыли", quantity: "", price: "" },
  ]
  
  // Список цветов для опций
  const colorOptions = [
    { label: "Белый", value: "white" },
    { label: "Черный", value: "black" },
    { label: "Серый", value: "gray" },
    { label: "Красный", value: "red" },
    { label: "Синий", value: "blue" },
  ]
  
  // Добавляем поля model и options
  const productsWithColors = products.map(item => ({
    ...item,
    model: "",       // пустое поле для выбора модели
    options: colorOptions
  }))

  return productsWithColors
});
