import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import "./index.css";
import { setSearchValueReference } from "../../store/slice/searchSlice";
const MenuItems = () => {
    const dispatch = useDispatch();
  const searchResults = useSelector((state) => state.search);
  const { value, isLoading, isError } = searchResults;

  const selectData = (data) =>() =>{
    dispatch(setSearchValueReference(data));

  }

  return (
    <div className="wrapper">
      {isLoading && <p>loading.....</p>}
      {isError && <p>Something want wrong</p>}
      {value.length > 0 ? (
        <MenuList>
          {value.map((menu) => (
            <MenuItem sx={{ color: "black", padding: "12px" }} onClick={selectData(menu.name)}>
              {menu.name}
            </MenuItem>
          ))}
        </MenuList>
      ) : (
        isLoading && isError && <p>No results found</p>
      )}
    </div>
  );
};
export default MenuItems;
