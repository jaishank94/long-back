//import logo from './logo.svg';
import React from 'react';
import './App.css';
import Header from './Header';
import Slider from './Slider';
import ButtonGroup from './components/buttonGroup';
import Dropdown from './components/Dropdown';
import Divider from "@material-ui/core/Divider";
import ProductTable from './components/ProductTable';
import {useMemo} from 'react'
import Table from './components/ReactTable';
import Badge from 'react-bootstrap/Badge';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { useTable,useFilters} from "react-table";

function App() {

  const [data, setData] = React.useState(null);
  const [value,setValue] = useState(null)
  const [active,setActive] = useState([]) 
  const [active1,setActive1]=useState([])
  const [testorganismactive,settestorganismactive]=useState([])
  const [sourceactive,setsourceactive] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0);


  const _handleIndexChange = (index) => {
    setCurrentIndex(index);
  };
   
  const handleChange = (event) => {
      const value = event.target.value || undefined;
      setValue(event.target.value);
  };
  
  const Dropdown = ({options})=> {
  return(
          <select value={value} onChange={handleChange}>
          {options.map((option) => (
             <option value={option.value}> 
              {option.label}
            </option>
          ))}
          </select>
  )
}

const ButtonGroup = (props)=>{

  // const [active,setActive] = useState([])   
  // const BUTTONS = [ 'oral', 'inhalation', 'topical']
  
  return props.items.map(key => {
     const isActive = active.includes(key)
  
     return (
       <button
         key={key}
         onClick={() => setActive(isActive
           ? active.filter(current => current !== key)
           : [...active, key]
         )}
         style={{
         background: isActive ? 'blue' : 'white',
         borderWidth:1,
         borderRadius:5,
         display:'inline-block',
         margin:5
         }}
       >
        {key}
       </button>
     )
   }) 
  
  }


const ButtonGroup1 = (props)=>{

    // const [active,setActive] = useState([])   
    // const BUTTONS = [ 'oral', 'inhalation', 'topical']
    
    return props.items.map(key => {
       const isActive = active1.includes(key)
    
       return (
         <button
           key={key}
           onClick={() => setActive1(isActive
             ? active1.filter(current => current !== key)
             : [...active1, key]
           )}
           style={{
           background: isActive ? 'blue' : 'white',
           borderWidth:1,
           borderRadius:5,
           display:'inline-block',
           margin:5
           }}
         >
          {key}
         </button>
       )
     }) 
    
    }

const ButtonGrouptest = (props)=>{

      // const [active,setActive] = useState([])   
      // const BUTTONS = [ 'oral', 'inhalation', 'topical']
      
      return props.items.map(key => {
         const isActive = testorganismactive.includes(key)
      
         return (
           <button
             key={key}
             onClick={() => settestorganismactive(isActive
               ? testorganismactive.filter(current => current !== key)
               : [...testorganismactive, key]
             )}
             style={{
             background: isActive ? 'blue' : 'white',
             borderWidth:1,
             borderRadius:5,
             display:'inline-block',
             margin:5
             }}
           >
            {key}
           </button>
         )
       }) 
      
      }
 const ButtonGroupsource = (props)=>{

        // const [active,setActive] = useState([])   
        // const BUTTONS = [ 'oral', 'inhalation', 'topical']
        
        return props.items.map(key => {
           const isActive = sourceactive.includes(key)
        
           return (
             <button
               key={key}
               onClick={() => setsourceactive(isActive
                 ? sourceactive.filter(current => current !== key)
                 : [...sourceactive, key]
               )}
               style={{
               background: isActive ? 'blue' : 'white',
               borderWidth:1,
               borderRadius:5,
               display:'inline-block',
               margin:5
               }}
             >
              {key}
             </button>
           )
         }) 
        
        }    
    


  React.useEffect(() => {
     fetch(process.env.REACT_APP_BACKEND_URL)
     // fetch("http://localhost:4000/")
      .then((res) => res.json())
      .then((data) => setData(data));
      console.log(data)
  }, []);




  const tabledata = useMemo(
    () => [
      {
        // first group - Users
        Header: " ",
        // group columns
        columns: [
          {
            Header: "DRUG",
            accessor: "name"
          },
          {
            Header: "OTHER NAMES",
            accessor: "othername"
          },
          {
            Header: "EVIDENCE FOR ANTI-AGEING",
            accessor: "level",
            Cell: ({ cell: { value } }) => <Levels values={value} />
            
          },
          {
            Header: "ALSO GOOD FOR",
            accessor: "alsogoodfor",
            Cell: ({ cell: { value } }) => <Genres values={value} />

          },
          {
            Header: "ADMINISTRATION",
            accessor: "administration",
            Cell: ({ cell: { value } }) => <Genres values={value} />
          },

          {
            Header: "TEST ORGANISMS",
            accessor: "testorganism",
            Cell: ({ cell: { value } }) => <Genres values={value} />
          },

          {
            Header: "COMPOUND SOURCES",
            accessor: "compoundsource",
            Cell: ({ cell: { value } }) => <Genres values={value} />
          },


          
         
         

        ]
      },
      
    ],
    []
  );

  const Genres = ({ values }) => {
    console.log(values)
    if(values!=null)
    return (
      <>
        {
        values.map((genre, idx) => {
          return (
              <Badge pill bg="primary">
              {genre}
              </Badge>
          );
        })}
      </>
    );
  };

  const Levels = ({ values }) => {
   // console.log(values)
    return (
      <>
      <Badge bg="dark">
      {values}
      </Badge>
      </>
    );
  }


  return (
    <React.Fragment>
      <Header/>
      
      
      {/* <div>{data.names}</div> */}
      <div className='center-component'>
        <div className='column'>
        <div>Level of evidence for anti-ageing property</div> 
        <div className='administration'>
          <ButtonGroup1 items = {['High','Medium','Low']} />
          </div>

        {/* <Slider/> */}
        </div>

        <div className='column'>
        <div>Administration</div>
          <div className='administration'>
          <ButtonGroup items = {['Oral','Inhalation',]} />
          </div>

          <div className='administration'>
          <ButtonGroup items = {['Topical','Rectal']} />
          </div>

          <div className='administration'>
          <ButtonGroup items = {['Subcutaneoes Implant','IV',]} />
          </div>

        </div>


        <div className='column'>
        <div>Test Organism</div> 
        <ButtonGrouptest items = {['Human','Primate','Mammal','Human Cell Line','Vertebrae','Other']} />
        </div>

      </div>
      
      <div className='center-component'>

          <div className='column'>
          <div>Also good for</div>
          <Dropdown
          options={[
            { value: '', label: '--Choose an option--', disabled: true},
            { label: 'Blood Clot', value: 'Blood Clot' },
            { label: 'Inflammation', value: 'Inflammation' },
            { label: 'Cancer', value: 'Cancer' },
           
          ]}
        //   <option disabled={true} value="">
        //   --Choose and option--
        // </option>
           
           />
          </div>

          <div className='column'>
          <div style = {{alignSelf:'center'}}>Compound Source</div>
          <div className='administration'>
          <ButtonGroupsource items = {['Natural','Synthetically produced','Synthetically designed']} />
          </div>
          </div>

          <div className='column'>
          <div></div>

          </div>

         
      </div>
      <br />
      <Divider />

      <div className='table'>
      <br /> <br /> 
      {data && <Table columns={tabledata} data={data} value = {value} active ={active} active1={active1} testorganismactive={testorganismactive} sourceactive ={sourceactive}/>
      // <ProductTable
      //   products={
      //   //   [
      //   //   { id: 1, name: 'Cheese', price: 4.9, stock: 20 },
      //   //   { id: 2, name: 'Milk', price: 1.9, stock: 32 },
      //   //   { id: 3, name: 'Yoghurt', price: 2.4, stock: 12 },
      //   //   { id: 4, name: 'Heavy Cream', price: 3.9, stock: 9 },
      //   //   { id: 5, name: 'Butter', price: 0.9, stock: 99 },
      //   //   { id: 6, name: 'Sour Cream ', price: 2.9, stock: 86 },
      //   //   { id: 7, name: 'Fancy French Cheese 🇫🇷', price: 99, stock: 12 },
      //   // ]
      //    data
      // }
      // />
     }
      </div>    
     
      
    </React.Fragment>
  
  );
}

export default App;
