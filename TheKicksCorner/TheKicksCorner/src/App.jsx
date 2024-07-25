import { useState } from "react";
import contractABI from "./abi.json";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [showBuy, setShowBuy] = useState(false);
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [itemId, setItemId] = useState(0);
  const [amount, setAmount] = useState(0);
  const [retrieved, setRetrieved] = useState([])

  const handleShowModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleBuy = () => {
    setShowBuy(true);
  };
  const handleCloseBuy = () => {
    setShowBuy(false);
  };

  const contractAddress = "0xb436e5b1a2b013bbe4e40dbacebd2a92b0769dcb";

  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

  async function handleAdd() {
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount();

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const kicksContract = new ethers.Contract(contractAddress, contractABI, signer);

      try { 
        const transaction = await kicksContract.addProduct(itemPrice, itemName);
        await transaction.wait();
        toast.success("Product added successfully!", {
          position: "top-center",
        });

        setItemPrice('');
        setItemName('')

      } catch (error) {
        toast.error(`Product addition Failed! Only owner can add Product`, {
          position: "top-center",
        });
      } 
    }
  }

  async function handleBuyProduct() {
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount();

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const kicksContract = new ethers.Contract(contractAddress, contractABI, signer);

      try { 
        const transaction = await kicksContract.buyProduct(itemId, amount);
        await transaction.wait();
        toast.success("Product bought successfully!", {
          position: "top-center",
        });

        setItemPrice('');
        setItemName('')

      } catch (error) {
        toast.error(`Product addition Failed! `, {
          position: "top-center",
        });
      } 
    }
  }
  
  async function handleAllProduct() {
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount();

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const kicksContract = new ethers.Contract(contractAddress, contractABI, signer);

      try { 
        const transaction = await kicksContract.getAllProducts();
        console.log(transaction)
        setRetrieved(transaction)

        toast.success("All Shoes Displayed!", {
          position: "top-center",
        });

      } catch (error) {
        toast.error(`Product addition Failed! Only owner can add Product`, {
          position: "top-center",
        });
      } 
    }
  }


  return (
    <div style={{ backgroundImage: 'url("https://wallpapercave.com/wp/wp2631964.jpg' }} className="bg-[#1a1000] bg-cover bg-center min-h-[100vh] w-[100%] bg-blend-overlay flex justify-center items-center text-white mx-auto">
      <div className="lg:w-[50%] md:w-[50%] w-[90%] mx-auto">
        <h1 className="font-bold lg:text-[4rem] md:text-[4rem] text-[2rem] mt-2 text-center">This is <span className="text-[#FFC0CB] drop-shadow-md">TheKicksCorner</span></h1>
        <p className="text-center lg:text-[2rem] md:text-[1.2rem] text-[.9rem] mb-8 text-center">Your No.1 Sneakers Plug</p>
        <section className="flex flex-col lg:flex-row md:flex-row lg:w-[70%] mx-auto justify-between md:w-[60%] w-[100%] flex-wrap">
          <div className="md:w-[45%] lg:w-[31%] w-[90%] mx-auto">
          <button
            data-ripple-light="true"
            data-dialog-target="dialog"
            className="w-[100%] mb-4 select-none rounded-lg bg-gradient-to-tr from-pink-300 to-gray-800 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            onClick={handleShowModal}
          >
            Add Shoes
          </button>
          {showModal && (
            <div className="fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300">
              <div className="relative m-4 w-2/5 min-w-[40%] max-w-[40%] rounded-lg bg-black font-sans text-base font-light leading-relaxed text-blue-gray-500 antialiased shadow-2xl">
                <div className="relative p-4 font-sans text-base antialiased font-light leading-relaxed border-t border-b border-t-blue-gray-100 border-b-blue-gray-100 text-black">
                  <h2 className="font-bold lg:text-[1.8rem] md:text-[1.8rem] text-[1.4rem] mt-2 text-[#FFC0CB]">Add Shoes</h2>
                  <p className="mb-4 text-xxs text-[#FFC0CB]">Only  the Admin can add products</p>
                 <input type="text" placeholder="ProductID " className="py-2 px-4 border border-gray-200 rounded-lg w-[100%]  mb-4" onChange={(e) => setItemId(e.target.value)} />
                 <input type="text" placeholder="Name of Shoe" className="py-2 px-4 border border-gray-200 rounded-lg w-[100%]  mb-4" onChange={(e) => setItemName(e.target.value)} />
                 <input type="text" placeholder="Price of Shoe" className="py-2 px-4 border border-gray-200 rounded-lg w-[100%]  mb-4" onChange={(e) => setItemPrice(e.target.value)} />
                </div>
                <div className="flex flex-wrap items-center justify-end p-4 shrink-0 text-blue-gray-500">
                  <button
                    className="px-6 py-3 mr-1 font-sans text-xs font-bold text-red-500 uppercase transition-all rounded-lg middle none center hover:bg-red-500/10 active:bg-red-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    onClick={handleCloseModal}
                  >
                    Cancel
                  </button>
                  <button onClick={handleAdd}
                    className="middle none center rounded-lg bg-gradient-to-tr from-pink-600 to-pink-300 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          )}
          </div>
          <div className="md:w-[45%] lg:w-[31%] w-[90%] mx-auto">
          <button
            data-ripple-light="true"
            data-dialog-target="dialog"
            className="w-[100%] mb-4  select-none rounded-lg bg-gradient-to-tr from-pink-300 to-gray-800 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            onClick={handleBuy}
          >
            Buy Shoes
          </button>
          {showBuy && (
            <div className="fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300">
              <div className="relative m-4 w-2/5 min-w-[40%] max-w-[40%] rounded-lg bg-black font-sans text-base font-light leading-relaxed text-blue-gray-500 antialiased shadow-2xl">
                <div className="relative p-4 font-sans text-base antialiased font-light leading-relaxed border-t border-b border-t-blue-gray-100 border-b-blue-gray-100 text-black">
                  <h2 className="font-bold lg:text-[1.8rem] md:text-[1.8rem] text-[1.4rem] mt-2 text-[#FFC0CB]">Buy Shoes</h2>
                  <p className="mb-4 text-xxs text-[#FFC0CB]">Open to everyone, select products by their ID</p>
                 <input type="text" placeholder="Product ID" className="py-2 px-4 border border-gray-200 rounded-lg w-[100%]  mb-4" onChange={(e) => setItemId(e.target.value)}/>
                 <input type="text" placeholder="Amount" className="py-2 px-4 border border-gray-200 rounded-lg w-[100%]  mb-4" onChange={(e) => setAmount(e.target.value)} />
                </div>
                <div className="flex flex-wrap items-center justify-end p-4 shrink-0 text-blue-gray-500">
                  <button
                    className="px-6 py-3 mr-1 font-sans text-xs font-bold text-red-500 uppercase transition-all rounded-lg middle none center hover:bg-red-500/10 active:bg-red-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    onClick={handleCloseBuy}
                  >
                    Cancel
                  </button>
                  <button onClick={handleBuyProduct}
                    className="middle none center rounded-lg bg-gradient-to-tr from-pink-600 to-pink-400 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          )}
          </div>
          <div className="md:w-[45%] lg:w-[31%] w-[90%] mx-auto">
          <button
            className="w-[100%] mb-4  select-none rounded-lg bg-gradient-to-tr from-pink-300 to-gray-800 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          onClick={handleAllProduct}>
           All Shoes
          </button>
          </div>
        </section>
        <section className="mt-8 flex flex-col lg:flex-row md:flex-row justify-between flex-wrap">
         {retrieved.map((info) => ( <div className="bg-[#00000096] p-4 rounded-lg w-[100%] lg:w-[31%] md:w-[48%] mb-4"> 
            <img src="data:image/jpeg;base64,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" alt="" className="rounded-lg mb-4" />
            <p>Item No.: {Number(info.id)}</p>
            <p>Item Name: {info.name}</p>
            <p>Item Price: {Number(info.amount)} USDC</p>
          </div>))}
        </section>
      </div>
    </div>
  );
};

export default App;
