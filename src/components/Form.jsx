import React from 'react';
import Select from 'react-select';
import NavBar from './Navbar/NavBar';
import { useState } from 'react';
import axios from 'axios';


const FormComponent = ({locationData}) => {

    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedSector, setSelectedSector] = useState('');
    const [selectedCell, setSelectedCell] = useState('');
    const [selectedVillage, setSelectedVillage] = useState('');
    const [image, setImage] = useState()
    const [description, setDescription] = useState('')
    const [damageLevel,  setlevel] = useState('')


    const damageOptions = [
        { value: 'minor', label: 'Minor' },
        { value: 'moderate', label: 'Moderate' },
        { value: 'severe', label: 'Severe' }
    ];

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    const openCamera = () => {
        if (imageInputRef.current) {
            imageInputRef.current.click();
        }
    };

    const selectedProvinceData = locationData.provinces.find(
        (province) => province.name === selectedProvince
      );
      const selectedDistrictData = selectedProvinceData?.districts.find(
        (district) => district.name === selectedDistrict
      );


      const sectorOptions  =
        selectedDistrictData?.sectors.map((sector) => ({
          label: sector.name,
          value: sector.name,
        })) || [];
      const selectedSectorData = selectedDistrictData?.sectors.find(
        (sector) => sector.name === selectedSector
      );
      const selectedCellData = selectedSectorData?.cells.find(
        (cell) => cell.name === selectedCell
      );
      const villageOptions =
        selectedCellData?.villages.map((village) => ({
          label: village.name,
          value: village.name,
        })) || [];
    
      const cellOptions =  selectedSectorData?.cells.map((cell) => ({
          label: cell.name,
          value: cell.name,
        })) || [];
        
        const handleProvinceChange = (selectedOption) => {
            setSelectedProvince(selectedOption.value);
            setSelectedDistrict(null);
            setSelectedSector(null);
            setSelectedCell(null);
            setSelectedVillage(null);
          };
        
          const handleDistrictChange = (selectedOption) => {
            setSelectedDistrict(selectedOption.value);
            setSelectedSector(null);
            setSelectedCell(null);
            setSelectedVillage(null);
          };
          
          const handleSectorChange = (selectedOption) => {
            setSelectedSector(selectedOption.value);
            setSelectedCell(null);
            setSelectedVillage(null);
          };
          
          const handleCellChange = (selectedOption) => {
            setSelectedCell(selectedOption.value);
            setSelectedVillage(null);
          };
          const handlelevel= (selectedOption) =>{
            setlevel(selectedOption.value)
        }
        const handleVillageChange = (selectedOption) => {
          setSelectedVillage(selectedOption.value);
        };
        const priority ='er'
        const email = localStorage.getItem('email');
        const [loading , setLoading] = useState(false)
        const handleFormSubmit = async () => {
          try {
            setLoading(true)
            const formData = new FormData();
            formData.append('paragraph', description);
            formData.append('district', selectedDistrict);
                formData.append('sector', selectedSector);
                formData.append('cell', selectedCell);
                formData.append('village', selectedVillage);
                formData.append('photo', image);
                formData.append('email', email);
                formData.append('damage', damageLevel);
                formData.append('priority', priority);
        
                const response = await axios.post(
                    "https://infra-back.onrender.com/infra/articles",
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data' // Ensure proper content type for file upload
                        } 
                    }
                );
                setLoading(false)
                setSelectedProvince(null)
                console.log(response);
            } catch (err) {
              setLoading(false)
                console.log(err);
            }
        };
        
    return (
        <div className="bg-slate-100 mt-16">
            <NavBar />
            <div className="container mx-auto px-4 py-8">
                <div className="bg-white p-8 rounded-lg shadow-lg  px-20">
                    <h2 className="text-3xl font-bold text-indigo-500 mb-4 font-serif">Report Damaged Infrastructure</h2>
                    <form className="flex flex-wrap -mx-4" >
                <div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-4">
                    <label htmlFor="district" className="block text-gray-700 font-semibold mb-2 font-serif">Province:</label>
                    <Select id="province" name="province"   value={{
                          label: selectedProvince,
                          value: selectedProvince,
                        }}
                        
                        onChange={handleProvinceChange}
                        options={locationData.provinces.map((province) => ({
                          label: province.name,
                          value: province.name,
                        }))} />
                </div>
                {selectedProvince && (
                    <div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-4">
                       <label htmlFor="sector" className="block text-gray-700 font-semibold mb-2 font-serif">District:</label>
                      <Select
                    
                        value={{
                          label: selectedDistrict,
                          value: selectedDistrict,
                        }}
                        
                        onChange={handleDistrictChange}
                        options={locationData.provinces
                          .find(
                            (province) => province.name === selectedProvince
                          )
                          .districts.map((district) => ({
                            label: district.name,
                            value: district.name,
                          }))}
                      />
                    </div>
                  )}
                    {selectedDistrict && (
                     <div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-4">
                     <label htmlFor="sector" className="block text-gray-700 font-semibold mb-2 font-serif">Sector:</label>
                      <Select
                       
                        value={{
                          label: selectedSector,
                          value: selectedSector,
                        }}
                        onChange={handleSectorChange}
                        options={sectorOptions}
                        
                      />
                    </div>
                  )}
                  {selectedSector && (
                        <div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-4">
                        <label htmlFor="sector" className="block text-gray-700 font-semibold mb-2 font-serif">Cell:</label>
                      <Select
                        
                        value={{
                          label: selectedCell,
                          value: selectedCell,
                        }}
                        onChange={handleCellChange}
                        options={cellOptions}
                        
                      />
                    </div>
                  )}
                  {selectedCell && (
                      <div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-4">
                      <label htmlFor="sector" className="block text-gray-700 font-semibold mb-2 font-serif">Village:</label>
                      <Select
                       
                        value={{
                          label: selectedVillage,
                          value: selectedVillage,
                        }}
                        onChange={handleVillageChange}
                        options={villageOptions}
                        
                      />
                    </div>
                  )}
                   
               
         
                <div className="w-full px-4 mb-4">
                    <label htmlFor="damage" className="block text-gray-700 font-semibold mb-2 font-serif">Level of Damage:</label>
                    <Select id="damage" name="damage" options={damageOptions} onChange={handlelevel} />
                </div>
                <div className="w-full px-4 mb-4">
                    <label htmlFor="description" className="block text-gray-700 font-semibold mb-2 font-serif">Description:</label>
                    <textarea id="description" onChange={(e) => setDescription(e.target.value)} name="description" className="bg-white border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-indigo-500 w-full h-32 resize-none"></textarea>
                </div>
                <div className="w-full px-4 mb-4">
                    <label htmlFor="image" className="block text-gray-700 font-semibold mb-2  font-serif">Upload Image:</label>
                    <input type="file" id="image" name="image" accept="image/*" onChange={handleImageUpload} />
                </div>
                <div className="w-full px-4 mb-4">
                    <label htmlFor="camera" className="block text-gray-700 font-semibold mb-2  font-serif">Take Picture:</label>
                    <input type="file" id="camera" name="camera" accept="image/*" capture="environment" onChange={openCamera} />
                </div>
                <div className="w-full px-4 mb-4">
                    <button  className="bg-indigo-500 text-white py-2 px-6 rounded-lg hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600  font-serif"     onClick={(e) => {
              e.preventDefault();
              handleFormSubmit();
            }}> {loading ? "loading..." :"Submit"}  </button>
                </div>
            </form>
                </div>
            </div>
        </div>
    );
}

export default FormComponent;
