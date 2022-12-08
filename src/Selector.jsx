import { useEffect, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";

const Selector = () => {

    const [users, setUsers] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [selected, setSelected] = useState("");
    const [open, setOpen] = useState(false);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(data => setUsers(data))
    }, [])

    return (
        <div className="w-72 font-medium h-80">
            <div 
                className={`bg-white w-full p-2 flex items-center justify-between rounded-md cursor-pointer ${!selected && 'text-gray-700'}`}
                onClick={() => setOpen(!open)}
            >
                { selected 
                    ? selected.length > 20
                        ? selected.substring(0, 20) + '...'
                        : selected
                    : 'Select Country'
                }
                <BiChevronDown 
                    size={20}
                    className={open && 'rotate-180 transition-all duration-300'}
                />
            </div>
            <ul className={`bg-white mt-2 overflow-auto ${
                    open ? 'max-h-[180px]' : 'max-h-0'
                }`}
            >
                <div className="flex items-center px-2 bg-white sticky top-0">
                    <AiOutlineSearch size={20} className="text-gray-700" />
                    <input 
                        type="text"
                        placeholder="Enter user name"
                        value={inputValue}
                        onChange={(e)=> setInputValue(e.target.value.toLowerCase())}
                        className="placeholder:text-gray-700 p-2 outline-none"
                    />
                </div>
                {
                    users.map((user) => (
                        <li
                            key={ user.id }
                            className={`p-2 text-sm hover:bg-[#37bbf5] hover:text-white cursor-pointer ${user?.name?.toLowerCase().startsWith(inputValue) ? 'block' : 'hidden'}
                            ${(user?.name?.toLowerCase() === selected.toLowerCase()) && 'bg-[#37bbf5] text-white'}  
                            `
                            }
                            onClick={() => {
                                if(user?.name?.toLowerCase() !== selected.toLowerCase()) {
                                    setSelected(user?.name);
                                    setOpen(false);
                                    setInputValue("");
                                }
                            }}
                        >
                            { user.name }
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default Selector;
