import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from 'react-select';

function DashboardCard07() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:3001/infra/articles"
        );
        setArticles(response.data, "data");
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };
    fetchArticles();
  }, []);
  // const email = localStorage.getItem('email');


  
  const [priority, setPriority] = useState('')
//  console.log(priority,'priority')
  const PriorityOptions = [
    { value: 'High', label: 'High' },
    { value: 'Medium', label: 'Medium' },
    { value: 'Low', label: 'Low' }
];

const handlepriority = (selectedOption) =>{
  setPriority(selectedOption.value)
}

  const [loading , setLoading] = useState(false)


  const handleUpdate = async (id, district, email) => {
    try {
      
          const response = await axios.put(
              `http://127.0.0.1:3001/infra/articles/update/${id}`,
              {
                email:email,
                priority:priority,
                district:district
              },
              
          );
          setLoading(true)
          console.log(response);
          alert("the user is notified")
      } catch (err) {
        setLoading(false)
          console.log(err);
      }
  };
  console.log(articles, "");
  return (
    <div className="col-span-full xl:col-span-8 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">
          Reports
        </h2>
      </header>
      <div className="p-3">
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full dark:text-slate-300">
            {/* Table header */}
            <thead className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm">
              <tr>
                <th className="p-2">
                  <div className="font-semibold text-left">District</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Sector</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Village</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Cell</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Description</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Image</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Priority</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">sendMail</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
              {/* Map over articles and render rows */}
              {articles.map((article, index) => (
                <tr key={index}>
                  <td className="p-2">
                    <div className="flex items-center">
                      <div className="text-slate-800 dark:text-slate-100">
                        {article.district}
                      </div>
                    </div>
                  </td>
                  <td className="p-2">
                    <div className="text-center">{article.sector}</div>
                  </td>
                  <td className="p-2">
                    <div className="text-center text-emerald-500">
                      {article.village}
                    </div>
                  </td>
                  <td className="p-2">
                    <div className="text-center">{article.cell}</div>
                  </td>
                  <td className="p-2">
                    <div className="text-center text-sky-500">
                      {article.paragraph}
                    </div>
                  </td>
                  <td className="p-2">
                    <img className="h-36 " src={article.photo} />
                  </td>
                  <td className="px-2"> {/* Adjusted px value */}
  <Select
    className=" h-10 w-24"
    onChange={handlepriority}
    options={PriorityOptions}
  />
</td>

                  <td className="p-2">
                    <button className="bg-sky-500 p-2 px-12 text-white rounded"
                    onClick={(e)=>{
                      e.preventDefault();
                      handleUpdate(article._id, article.district, article.email)
                    }}
                    
                    >
                    {loading ? "Notified" : "Notify" }  


                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DashboardCard07;
