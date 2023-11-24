import './index.css'

const Category = props => {
  const {value, onChange} = props

  const changeCategory = id => {
    onChange(id)
  }
  return (
    <li>
    <button onClick={changeCategory(value.menu_category_id)}>
    {value.menu_category}
    </button>
    </li>
  )
}
export default Category
