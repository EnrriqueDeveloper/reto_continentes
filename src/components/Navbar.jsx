import { useContext, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { MdOutlineMenu } from "react-icons/md";
import { AppContext } from "../AppProvider";
const Navbar = () => {
  const { setOpenSideBar, setInputName, setContinent } = useContext(AppContext);
  const [name, setName] = useState("");
  const [continentName, setContinentName] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setContinentName("");
  };

  const handleSearch = () => {
    setIsModalOpen(false);
    setInputName(name);
    setContinent(continentName);
  };
  return (
    <div className="flex gap-3 lg:w-10/12 lg:mx-auto">
      <button onClick={() => setOpenSideBar(true)} className={"md:hidden text-3xl text-cyan-700"}>
        <MdOutlineMenu />
      </button>
      <div className="relative flex-1 text-white py-6 flex justify-between items-center">
        {isModalOpen && <Modal continentName={continentName} setContinentName={setContinentName} closeModal={closeModal} />}
        <div className="flex gap-2 justify-between  px-3 flex-1 items-center rounded-full shadow-sm shadow-gray-400  bg-gray-100 py-4 linear-gradient">
          <input
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
            type="text"
            placeholder="Buscar país"
            className="bg-transparent flex-1 focus:outline-none text-black"
            onClick={openModal}
          />
          <button onClick={handleSearch} className="cursor-pointer rounded-xl px-3 bg-blue-500 rounded-ful1 flex items-center">
            <FaSearch />
            <span className="">Buscar</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const Modal = ({ closeModal, setContinentName, continentName }) => {
  return (
    <div className="absolute top-[88px] w-11/12 md:9/12 lg:w-7/12 bg-white flex flex-col gap-5 left-[50%] translate-x-[-50%]  rounded-xl shadow-lg shadow-black p-5">
      <div className="flex justify-between">
        <p className="text-gray-600">Filtar por continentes</p>{" "}
        <button onClick={closeModal} className="text-blue-500">
          limpiar
        </button>
      </div>
      <div className="grid grid-cols-3 gap-5 rounded ">
        <button onClick={() => setContinentName("Europe")} className="flex flex-col gap-2">
          <img
            className={`w-[150px] h-[80px] object-cover ${continentName == "Europe" ? "border-4 border-blue-400" : "border-gray-400 border"}`}
            src="https://cdn.pixabay.com/photo/2013/07/12/16/58/europe-151588_1280.png"
            alt=""
          />
          <span className="text-gray-800">Europa</span>
        </button>
        <button onClick={() => setContinentName("America")} className="flex flex-col gap-2">
          <img
            className={`w-[150px] h-[80px] object-cover ${continentName == "America" ? "border-4 border-blue-400" : "border-gray-400 border"}`}
            src="https://previews.123rf.com/images/pytyczech/pytyczech1706/pytyczech170600174/80189329-mapa-pol%C3%ADtico-de-am%C3%A9rica-en-cuatro-tonos-de-azul-sobre-fondo-blanco-am%C3%A9rica-del-norte-y-del-sur-con.jpg"
            alt=""
          />
          <span className="text-gray-800">America</span>
        </button>
        <button onClick={() => setContinentName("Asia")} className="flex flex-col gap-2">
          <img
            className={` w-[150px] h-[80px] object-cover ${continentName == "Asia" ? "border-4 border-blue-400" : "border-gray-400 border"}`}
            src="https://w7.pngwing.com/pngs/607/930/png-transparent-southeast-asia-silhouette-map-international-students.png"
            alt=""
          />
          <span className="text-gray-800">Asia</span>
        </button>
        <button onClick={() => setContinentName("Oceania")} className="flex flex-col gap-2">
          <img
            className={`w-[150px] h-[80px] object-cover ${continentName == "Oceania" ? "border-4 border-blue-400" : "border-gray-400 border"}`}
            src="https://w7.pngwing.com/pngs/822/562/png-transparent-australia-world-map-blank-map-australia-blue-cloud-world-thumbnail.png"
            alt=""
          />
          <span className="text-gray-800">Oceania</span>
        </button>
        <button onClick={() => setContinentName("Africa")} className="flex flex-col gap-2">
          <img
            className={`w-[150px] h-[80px] object-cover ${continentName == "Africa" ? "border-4 border-blue-400" : "border-gray-400 border"}`}
            src="https://us.123rf.com/450wm/chrupka/chrupka1502/chrupka150200153/36634240-mapa-azul-de-%C3%A1frica.jpg"
            alt=""
          />
          <span className="text-gray-800">Africa</span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
