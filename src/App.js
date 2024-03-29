import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import StaticPart from "./components/StaticPart";
import ExerciseList from "./components/ExerciseList";

function App() {
  const [Data, setData] = useState([]);
  const [limit, setLimit] = useState(10);
  const[display,setDisplay]=useState(true);

  async function generateData() {
    try {
      const options = {
        method: 'GET',
        url: 'https://exercisedb.p.rapidapi.com/exercises/bodyPart/back',
        params: {limit: '10'},
        headers: {
          'X-RapidAPI-Key': 'de50ed1601msh540b2f25f01ca0ap1230dajsnb78c3c85fc3b',
          'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
        }
      };
      const res = await axios.request(options);
      console.log(res.data);
      setData(res.data);

    }
     catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    generateData();
  }, []);



  function searchData(name) {
    let filterData = Data.filter((item) => {
      if (item.name.toLowerCase().includes(name.trim()) ||item.bodyPart.toLowerCase().includes(name.trim()) ) {
        return true;
      }
      
      return false;
    });
    setData(filterData);
  }

  return (
    <div>
      <StaticPart />
      <div className="input" onChange={(e)=>{
        searchData(e.target.value)
      }}>
        <h1>Exercise List</h1>
        <input type="text" placeholder="Search hy target,bosy part,exercise" />
      </div>
      {
        display? <div className="excercise">
        {Data.map((ele, index, array) => {
          return (
            <ExerciseList
              data={Data}
              setData={setData}
              key={index}
              img={ele.gifUrl}
              bodyPart={ele.bodyPart}
              target={ele.target}
              name={ele.name}
              limit={limit} 
            />
          );
        })}
      </div>:""
      }
     

      <button
        className="butt"
        onClick={() => {
          setLimit((prev)=>prev+10);
          generateData()
          setDisplay(true)
        }}
      >
        Load More
      </button>
    </div>
  );
}

export default App;